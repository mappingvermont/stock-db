    var LAYERS_AND_LEGENDS = [
            {
                'title': "USA",
                layers: [
                    {
                        'title': "NEFSC",
                        'layer': L.geoJson.ajax('data/geojson/NEFSC-POLL5YZ-1960-2009-CHING.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },
                    {
                        'title': "PFMC",
                        'layer': L.geoJson.ajax('data/geojson/PFMC-BOCACCSPCOAST-1930-2009-CHING.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "Lobsters",
                        'layer': L.geoJson.ajax('data/geojson/ASMFC-LOBSTERGB-1981-2007-STANTON.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "SEFSC",
                        'layer': L.geoJson.ajax('data/geojson/SEFSC-BTIPSHARATL-1981-2004-FAUCONNET.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "NWFSC",
                        'layer': L.geoJson.ajax('data/geojson/NWFSC-LINGCODNPCOAST-1928-2009-STACHURA.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "CRAB1",
                        'layer': L.geoJson.ajax('data/geojson/AFSC-BKINGCRABPI-1960-2008-JENSEN.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "CODGB",
                        'layer': L.geoJson.ajax('data/geojson/NEFSC-CODGB-1976-2011-CHING.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "SNOWCRAB",
                        'layer': L.geoJson.ajax('data/geojson/AFSC-SNOWCRABBS-1978-2013-HIVELY.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },{
                        'title': "ADFG",
                        'layer': L.geoJson.ajax('data/geojson/ADFG-HERRPWS-1980-2006-COLLIE.geojson', {
                            onEachFeature: onEachFeature}),
                        'legend': [],
                    },
                ]
            },{
                'title': "OSM Base Maps",
                layers: [
                    {
                        'title': "OSM Basemap",
                        'layer': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { zIndex:50, opacity:0.5 }),
                        'legend': [],
                    },
                ]
            },
        ];

        function init() {
            var map = L.map('map').setView([40, -100], 3);

            new L.Control.AccordionLegend({
                position: 'topright',
                title: 'Legend',
                content: LAYERS_AND_LEGENDS,
            }).addTo(map).expandUI('Base Maps').toggleLayer('OSM Basemap', true);
        }


    function onEachFeature(feature, layer) {

        var popup = "<div class=popup_box" + "id=" + feature.properties.assessid + ">";
        popup += "<div class='popup_box_header'><strong>" + feature.properties.assessid + "</strong></div>";
        popup += "<hr />";

        for (var [key, value] of Object.entries(feature.properties)) {
            popup += "<strong>" + key + ": </strong>" + value + "<br />";
            //console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
        }
        popup += "</div>";
        layer.bindPopup(popup)
    }