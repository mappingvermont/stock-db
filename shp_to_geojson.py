import pandas as pd
import geopandas as gpd
import os
import subprocess


current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, 'data')
src_shp_dir = os.path.join(data_dir, 'boundaries_final')

def main():

	shp_lkp = os.path.join(data_dir, 'ramldb_v3.8_stock_boundary_table_v2_formatted.csv')
	df = pd.read_csv(shp_lkp)

	unprojected_dir = os.path.join(data_dir, 'unprojected')
	simp_dir = os.path.join(data_dir, 'simplified')

	count = 0

	for index, row in df.iterrows():

		count += 1
		if count % 10 == 0:
			print 'starting to process #{}'.format(count)

		in_shp = os.path.join(src_shp_dir, row['assessid'] + '.shp')
		unproj_shp = os.path.join(unprojected_dir, row['assessid'] + '.shp')

		join_and_unproject(in_shp, row['assessid'], df, unproj_shp)

		simp_geojson = os.path.join(simp_dir, row['assessid'] + '.geojson')
		simplify_geojson(unproj_shp, simp_geojson, '0.001')

def join_and_unproject(input_shp, assessid, attribute_df, output_shp):

	# print 'processing {}, crs is {}'.format(assessid, src_shp.crs['init'])
	src_shp = gpd.read_file(input_shp)

	# check if it's projected, and that it's 4326
	try:
		proj = src_shp.crs['init']

		if proj != 'epsg:4326':
			src_shp = src_shp.to_crs({'init': 'epsg:4326'})

	except KeyError:
		print 'no crs found for {}, setting 4236 as default'.format(assessid)
		src_shp.crs = {'init': 'epsg:4326', 'no_defs': True}
	
	# remove any other columns
	src_shp = src_shp[['geometry']]
	src_shp['assessid'] = assessid

	if src_shp.shape != (1,2):
		print 'More rows than expected in src shp {}'.format(assessid)

	# add data from lkp
	src_shp = src_shp.merge(attribute_df, on='assessid')

	src_shp.to_file(output_shp)

def simplify_geojson(input_geojson, output_geojson, tolerance):

	cmd = ['ogr2ogr', '-f', 'GeoJSON', output_geojson, input_geojson]
	cmd += ['-simplify', tolerance]

	# print 'Converting to geojson + simplifying to {}'.format(tolerance)
	subprocess.check_call(cmd)


if __name__ == '__main__':
	main()

	

