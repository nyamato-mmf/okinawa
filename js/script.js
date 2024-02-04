
mapboxgl.accessToken = 'pk.eyJ1IjoibnlhbWF0byIsImEiOiJja2Y4dzNkOW8wY3MwMnFvM29iNnJzNzVzIn0.GHlHwu3r5YjKBU3qAKvccQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/light-v11",
    zoom: 9,
    center: [127.93383619628926, 26.504074468870304],
});

map.setMaxZoom(13);
map.setMaxPitch(60)

// Tokyo facilities map
map.on('load', function () {

    // Fly to functionality
    document.getElementById("fly").select.onchange = function() {
        var target = document.getElementById("fly").select.value;
        console.log(target);

        const flyLocations = {
            "fly-japan": { center: [136.33549197330444, 38.49148243962729], zoom: 4 },
            "fly-okinawa": { center: [125.48412170741628, 25.246402621655474], zoom: 7 },
            "fly-mainland": { center: [127.93383619628926, 26.504074468870304], zoom: 9 },
            "fly-miyako": { center: [125.27760692009161, 24.804254267582774], zoom: 10 },
            "fly-yaeyama": { center: [124.00066265308841, 24.38428842615502], zoom: 10 },
            "fly-world": { center: [130.29512947990742, 38.821536580824926], zoom: 2 },
            "fly-hawaii": { center: [-157.87604057447587, 20.36384710660511], zoom: 7 },
            "fly-oahu": { center: [-157.9820394941992, 21.473956710447162], zoom: 10 }
        };

        if (flyLocations[target]) {
            map.flyTo({
                center: flyLocations[target].center,
                zoom: flyLocations[target].zoom,
                essential: true
            });
        }
    };

    /* --------------------------------------------------------
    　行政区域
    -------------------------------------------------------- */
    map.addSource('boundaries', {
        'type': 'geojson',
        'data': './geojson/boundaries/boundaries.geojson'
    });
    map.addLayer({
        'id': "boundaries",
        'type': 'fill',
        'source': 'boundaries',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-outline-color': 'rgba(255,0,0,1)',
            'fill-color': 'rgba(255,255,255,.5)'
        }
    });
    // ポップアップ //
    map.on('click', "boundaries", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N03_004"])
            .addTo(map);
    });
    map.on('mouseenter', "boundaries", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "boundaries", function () {
        map.getCanvas().style.cursor = '';
    });

    /* --------------------------------------------------------
    　空港
    -------------------------------------------------------- */
    map.addSource('airports', {
        'type': 'geojson',
        'data': './geojson/infrastructure/airports/airports.geojson'
    });
    map.addLayer({
        'id': "airports",
        'type': 'fill',
        'source': 'airports',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-outline-color': 'rgba(255,0,0,1)',
            'fill-color': 'rgba(255,0,0,.5)'
        }
    });
    // ポップアップ //
    map.on('click', "airports", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["C28_005"])
            .addTo(map);
    });
    map.on('mouseenter', "airports", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "airports", function () {
        map.getCanvas().style.cursor = '';
    });


    /* --------------------------------------------------------
    　鉄道
    -------------------------------------------------------- */
    map.addSource('railways', {
        'type': 'geojson',
        'data': './geojson/infrastructure/railways/railways.geojson'
    });
    map.addLayer({
        'id': 'railways',
        'type': 'line',
        'source': 'railways',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': 'rgba(255,0,0,1)',
            'line-width': 2,
        }
    });
    // ポップアップ //
    map.on('click', "railways", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N02_004"])
            .addTo(map);
    });
    map.on('mouseenter', "railways", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "railways", function () {
        map.getCanvas().style.cursor = '';
    });

    /* --------------------------------------------------------
    　高速道路
    -------------------------------------------------------- */
    map.addSource('highways', {
        'type': 'geojson',
        'data': './geojson/infrastructure/highways/highways.geojson'
    });
    map.addLayer({
        'id': 'highways',
        'type': 'line',
        'source': 'highways',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': 'rgba(255,0,0,1)',
            'line-width': 2,
        }
    });
    // ポップアップ //
    map.on('click', "highways", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N06_007"])
            .addTo(map);
    });
    map.on('mouseenter', "highways", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "highways", function () {
        map.getCanvas().style.cursor = '';
    });


    /* --------------------------------------------------------
    　自然公園
    -------------------------------------------------------- */
    function add_shizen_koen_MapLayer(map, sourceId, layerId, geojsonPath, fillColor, popupText) {
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });
        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-color': fillColor,
                'fill-opacity': 0.3
            }
        });
        // ポップアップ //
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(popupText)
                .addTo(map);
        });
        map.on('mouseenter', layerId, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, function () {
            map.getCanvas().style.cursor = '';
        });
    }

    // 自然公園区域
    add_shizen_koen_MapLayer(map, 'shizenkoen_01', 'shizenkoen_01', './geojson/city_planning/shizen_koen/shizenkoen_01.geojson', '#0000ff', '自然公園区域');
    // 特別区域
    add_shizen_koen_MapLayer(map, 'shizenkoen_02', 'shizenkoen_02', './geojson/city_planning/shizen_koen/shizenkoen_02.geojson', '#ff0000', '特別区域');
    // 特別区域
    add_shizen_koen_MapLayer(map, 'shizenkoen_03', 'shizenkoen_03', './geojson/city_planning/shizen_koen/shizenkoen_03.geojson', '#00ff00', '特別保護地区');

    /* --------------------------------------------------------
    　鳥獣保護区
    -------------------------------------------------------- */
    // Function to add a layer with source, styling, and event listeners
    function add_chouju_hogo_MapLayer(map, sourceId, layerId, geojsonPath, fillColor, popupText) {
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });

        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-color': fillColor,
                'fill-opacity': 0.3
            }
        });
        // ポップアップ //
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(popupText)
                .addTo(map);
        });
        map.on('mouseenter', layerId, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, function () {
            map.getCanvas().style.cursor = '';
        });
    }

    // 鳥獣保護区
    add_chouju_hogo_MapLayer(map, 'chouju_hogo', 'chouju_hogo', './geojson/city_planning/chouju_hogo/chouju_hogo.geojson', '#ff0000', '鳥獣保護区');
    

    /* ----------------------------------------------------------------------------
    　レイヤー表示/非表示
    ---------------------------------------------------------------------------- */
    // Simplified visibility update function
    function updateLayerVisibility(layerIds, visibility) {
        if (Array.isArray(layerIds)) {
            layerIds.forEach(layerId => {
                map.setLayoutProperty(layerId, 'visibility', visibility ? 'visible' : 'none');
            });
        } else {
            map.setLayoutProperty(layerIds, 'visibility', visibility ? 'visible' : 'none');
        }
    }

    // Event listeners for checkbox changes
    // 行政区域 //
    document.getElementById('boundariesCheckbox').addEventListener('change', function () {
        updateLayerVisibility('boundaries', this.checked);
    });
    // 空港 //
    document.getElementById('airportsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('airports', this.checked);
    });
    // 鉄道 //
    document.getElementById('railwaysCheckbox').addEventListener('change', function () {
        updateLayerVisibility('railways', this.checked);
    });
    // 高速道路 //
    document.getElementById('highwaysCheckbox').addEventListener('change', function () {
        updateLayerVisibility('highways', this.checked);
    });
    // 自然公園 //
    document.getElementById('shizen_koenCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['shizenkoen_01', 'shizenkoen_02', 'shizenkoen_03'], this.checked);
    });
    // 鳥獣保護区 //
    document.getElementById('chouju_hogoCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['chouju_hogo'], this.checked);
    });


    // You can also set the initial layer visibility based on the checkbox states
    updateLayerVisibility('boundaries', document.getElementById('boundariesCheckbox').checked);
    updateLayerVisibility('airports', document.getElementById('airportsCheckbox').checked);
    updateLayerVisibility('railways', document.getElementById('railwaysCheckbox').checked);
    updateLayerVisibility('highways', document.getElementById('highwaysCheckbox').checked);
    updateLayerVisibility(['shizenkoen_01', 'shizenkoen_02', 'shizenkoen_03'], document.getElementById('shizen_koenCheckbox').checked);
    updateLayerVisibility(['chouju_hogo'], document.getElementById('chouju_hogoCheckbox').checked);

    // Set initial visibility for additional layers as needed
    document.getElementById('boundariesCheckbox').checked = true;

});


map.addControl(new mapboxgl.NavigationControl());
        
