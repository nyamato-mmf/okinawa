
$(document).ready(function(){
    $('#open_nav').on('click', function(){
        $('#sidebar').toggleClass('hide');
    });
});







mapboxgl.accessToken = 'pk.eyJ1IjoibnlhbWF0byIsImEiOiJja2Y4dzNkOW8wY3MwMnFvM29iNnJzNzVzIn0.GHlHwu3r5YjKBU3qAKvccQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/nyamato/cl71sppai002314qsnu3kya1g",
    zoom: 5,
    center: [136.33549197330444, 38.49148243962729],
});

map.setMaxZoom(13);
map.setMaxPitch(60)

// Tokyo facilities map
map.on('load', function () {

    //##### 市域 #####//
    // Add a source for the city polygons.
    map.addSource('boundaries', {
        'type': 'geojson',
        'data': './geojson/boundaries/boundaries.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': "行政区域/ Administrative boundaries",
        'type': 'line',
        'source': 'boundaries',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': 'rgba(255,0,0,1)',
            'line-width': 2,
        }
    });

    //##### 市域（都市名のポップアップ） #####//
    // Popup when click
    map.on('click', "行政区域/ Administrative boundaries", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["都道府"] + e.features[0].properties.name1)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the cities layer.
    map.on('mouseenter', "行政区域/ Administrative boundaries", function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', "行政区域/ Administrative boundaries", function () {
        map.getCanvas().style.cursor = '';
    });

    //##### 市役所 #####//
    // Load an image.
    map.loadImage(
        './img/mapbox-marker-icon-blue.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('blue', image);

            // Add a data source containing several points' features.
            map.addSource('blue-points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': { "name": "札幌市 / Sapporo" },
                            'geometry': {'type': 'Point', 'coordinates': [141.3543859,43.0620312] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "仙台市 / Sendai" },
                            'geometry': { 'type': 'Point', 'coordinates': [140.8697429,38.268221] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "広島市 / Hiroshima" },
                            'geometry': { 'type': 'Point', 'coordinates': [132.4540803,34.3845857] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "福岡市 / Fukuoka" },
                            'geometry': { 'type': 'Point', 'coordinates': [130.4016810490743, 33.59041686334856] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "ピッツバーグ / Pittsburgh" },
                            'geometry': { 'type': 'Point', 'coordinates': [-79.99731284399193, 40.43851418892951] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "バーミンガム / Birmingham" },
                            'geometry': { 'type': 'Point', 'coordinates': [-1.9036710725574915, 52.47974584076859] }
                        },
                        {
                            'type': 'Feature',
                            'properties': { "name": "ドルトムント / Dortmund" },
                            'geometry': { 'type': 'Point', 'coordinates': [7.465542483238827, 51.51150210913444] }
                        }
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'blue-point',
                'type': 'symbol',
                'source': 'blue-points', // reference the data source
                'layout': {
                    'icon-image': 'blue', // reference the image
                    'icon-size': 0.8
                }
            });

            // On click, get coordinates and a name.
            map.on('click', 'blue-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
        
                // Create a popup object
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(name)
                    .addTo(map);
            
            });

        }
    );


    //##### 鉄道 / Railways #####//
    // Add a source for the city polygons.
    map.addSource('railways', {
        'type': 'geojson',
        'data': './geojson/railways/railways_japan.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '鉄道 / Railways',
        'type': 'line',
        'source': 'railways',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': 'rgba(255,255,255,1)',
            'line-width': 2,
        }
    });

    //##### 高速道路 / Highways #####//
    // Add a source for the city polygons.
    map.addSource('highways', {
        'type': 'geojson',
        'data': './geojson/highways/highways_japan.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '高速道路 / Highways',
        'type': 'line',
        'source': 'highways',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': 'rgba(255, 51, 0,1)',
            'line-width': 2,
        }
    });

    //##### バス / Buses #####//
    // Add a source for the city polygons.
    map.addSource('buses', {
        'type': 'geojson',
        'data': './geojson/bus/bus routes.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': 'バス / Buses',
        'type': 'line',
        'source': 'buses',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': 'rgba(255, 255, 0,1)',
            'line-width': 2,
        }
    });

    //##### 空港 / Airports #####//
    // Add a source for the city polygons.
    map.addSource('airports', {
        'type': 'geojson',
        'data': './geojson/airports/airports.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '空港 / Airports',
        'type': 'fill',
        'source': 'airports',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(255,0,0,.8)'
        }
    });

    //##### 緑地 / Green coverage #####//
    // Add a source for the city polygons.
    map.addSource('greenareas', {
        'type': 'raster',
        'url': 'mapbox://nyamato.70zk208p'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '緑地 / Green areas',
        'type': 'raster',
        'source': 'greenareas',
        'layout': {
            'visibility': 'none'
        },
    });

    //##### 大学 / Universities #####//
    // Add a source for the city polygons.
    map.addSource('universities', {
        'type': 'geojson',
        'data': './geojson/universities/universities.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '大学 / Universities',
        'type': 'circle',
        'source': 'universities',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': 'rgba(0,0,255,.8)',
            'circle-radius': 4
        }
    });

    //##### 大学 / Universities（大学名のポップアップ） #####//
    // Popup when click
    map.on('click', "大学 / Universities", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["P29_005"])
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the cities layer.
    map.on('mouseenter', "大学 / Universities", function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', "大学 / Universities", function () {
        map.getCanvas().style.cursor = '';
    });

    //##### Fly to 機能 #####//
    document.getElementById("fly").select.onchange = function() {
        var target = document.getElementById("fly").select.value;
        console.log(target)

        if ( target === "fly-sapporo" ) {
            map.flyTo({
            center: [141.3543859,43.0620312],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-sendai" ) {
            map.flyTo({
            center: [140.8697429,38.268221],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-hiroshima" ) {
            map.flyTo({
            center: [132.4540803,34.3845857],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-fukuoka" ) {
            map.flyTo({
            center: [130.4016810490743, 33.59041686334856],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-japan" ) {
            map.flyTo({
            center: [136.33549197330444, 38.49148243962729],
            zoom: 5,
            essential: true
            });
        } else if ( target === "fly-world" ) {
            map.flyTo({
            center: [130.29512947990742, 38.821536580824926],
            zoom: 2,
            essential: true
            });
        } else if ( target === "fly-pittsburgh" ) {
            map.flyTo({
            center: [-79.99731284399193, 40.43851418892951],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-birmingham") {
            map.flyTo({
            center: [-1.9036710725574915, 52.47974584076859],
            zoom: 9,
            essential: true
            });
        } else if ( target === "fly-dortmund") {
            map.flyTo({
            center: [7.465542483238827, 51.51150210913444],
            zoom: 9,
            essential: true
            });
        }
    };
    
});


// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
    // If these layers were not added to the map, abort
    if (!map.getLayer("行政区域/ Administrative boundaries") || !map.getLayer('鉄道 / Railways') || !map.getLayer('高速道路 / Highways') || !map.getLayer('バス / Buses')  || !map.getLayer('空港 / Airports') || !map.getLayer('緑地 / Green areas') ||  !map.getLayer('大学 / Universities')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleLayer = ["行政区域/ Administrative boundaries", '鉄道 / Railways', '高速道路 / Highways', 'バス / Buses', '空港 / Airports', '緑地 / Green areas', '大学 / Universities'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleLayer) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        };

        // Create a link.
        const link = document.createElement('a');

        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = '';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {

            const clickedLayer = this.textContent;

            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            };
        };

        const layers = document.getElementById('hideshow');
        layers.appendChild(link);

    };
    
});

map.addControl(new mapboxgl.NavigationControl());
    
