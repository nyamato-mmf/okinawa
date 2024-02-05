
mapboxgl.accessToken = 'pk.eyJ1IjoibnlhbWF0byIsImEiOiJja2Y4dzNkOW8wY3MwMnFvM29iNnJzNzVzIn0.GHlHwu3r5YjKBU3qAKvccQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/light-v11",
    zoom: 9,
    center: [127.93383619628926, 26.504074468870304],
});

map.setMaxZoom(13);
map.setMaxPitch(60)

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
            'fill-outline-color': 'rgba(0,0,0,1)',
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

    add_shizen_koen_MapLayer(map, 'shizenkoen_01', 'shizenkoen_01', './geojson/city_planning/shizen_koen/shizenkoen_01.geojson', '#0000ff', '自然公園区域');
    add_shizen_koen_MapLayer(map, 'shizenkoen_02', 'shizenkoen_02', './geojson/city_planning/shizen_koen/shizenkoen_02.geojson', '#ff0000', '特別区域');
    add_shizen_koen_MapLayer(map, 'shizenkoen_03', 'shizenkoen_03', './geojson/city_planning/shizen_koen/shizenkoen_03.geojson', '#00ff00', '特別保護地区');

    /* --------------------------------------------------------
    　自然保全地域
    -------------------------------------------------------- */
    function add_shizen_hozen_MapLayer(map, sourceId, layerId, geojsonPath, fillColor, popupText) {
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

    add_shizen_hozen_MapLayer(map, 'shizen_hozen_01', 'shizen_hozen_01', './geojson/city_planning/shizen_hozen/shizen_hozen_01.geojson', '#0000ff', '特別地区');
    add_shizen_hozen_MapLayer(map, 'shizen_hozen_02', 'shizen_hozen_02', './geojson/city_planning/shizen_hozen/shizen_hozen_02.geojson', '#ff0000', '原生自然環境保全地域');
    add_shizen_hozen_MapLayer(map, 'shizen_hozen_03', 'shizen_hozen_03', './geojson/city_planning/shizen_hozen/shizen_hozen_03.geojson', '#00ff00', '自然保全地域');
    
    /* --------------------------------------------------------
    　鳥獣保護区
    -------------------------------------------------------- */
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

    add_chouju_hogo_MapLayer(map, 'chouju_hogo', 'chouju_hogo', './geojson/city_planning/chouju_hogo/chouju_hogo.geojson', '#00ff00', '鳥獣保護区');
    
    /* --------------------------------------------------------
    　市街化調整区域
    -------------------------------------------------------- */
    function add_chosei_kuikiLayer(map, cityCode, cityName) {
        // Add a source for the city polygons.
        map.addSource(cityCode, {
            'type': 'geojson',
            'data': `./geojson/city_planning/chousei_kuiki/${cityCode}.geojson`
        });

        // Add a layer showing the city polygons.
        map.addLayer({
            'id': cityCode,
            'type': 'fill',
            'source': cityCode,
            'paint': {
                'fill-color': [
                    'case',
                    ['==', ['get', 'layer_no'], 2], '#ff00ff',
                    'rgba(255,255,255,0)'
                ],
                'fill-opacity': 0.7
            }
        });
        // ポップアップ
        map.on('click', cityCode, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(cityName)
                .addTo(map);
        });
        map.on('mouseenter', cityCode, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', cityCode, function () {
            map.getCanvas().style.cursor = '';
        });
    }

    const cities = [
        { code: '47201_那覇市', name: '那覇市' },
        { code: '47205_宜野湾市', name: '宜野湾市' },
        { code: '47207_石垣市', name: '石垣市' },
        { code: '47208_浦添市', name: '浦添市' },
        { code: '47209_名護市', name: '名護市' },
        { code: '47210_糸満市', name: '糸満市' },
        { code: '47211_沖縄市', name: '沖縄市' },
        { code: '47212_豊見城市', name: '豊見城市' },
        { code: '47213_うるま市', name: 'うるま市' },
        { code: '47214_宮古島市', name: '宮古島市' },
        { code: '47215_南城市', name: '南城市' },
        { code: '47308_国頭郡本部町', name: '国頭郡本部町' },
        { code: '47324_中頭郡読谷村', name: '中頭郡読谷村' },
        { code: '47325_中頭郡嘉手納町', name: '中頭郡嘉手納町' },
        { code: '47326_中頭郡北谷町', name: '中頭郡北谷町' },
        { code: '47327_中頭郡北中城村', name: '中頭郡北中城村' },
        { code: '47329_中頭郡西原町', name: '中頭郡西原町' },
        { code: '47348_島尻郡与那原町', name: '島尻郡与那原町' },
        { code: '47350_島尻郡南風原町', name: '島尻郡南風原町' },
        { code: '47362_島尻郡八重瀬町', name: '島尻郡八重瀬町' },
    ];

    // Iterate through cities and add layers
    cities.forEach(city => {
        add_chosei_kuikiLayer(map, city.code, city.name);
    });

    /* --------------------------------------------------------
    　用途地域
    -------------------------------------------------------- */
    function addCityLayer(map, sourceId, layerId, geojsonPath) {
        // Add a source for the city polygons.
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });

        // Add a layer showing the city polygons.
        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-color': [
                    'case',
                    ['==', ['get', "A29_005"], "第一種低層住居専用地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "第二種低層住居専用地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "第一種中高層住居専用地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "第二種中高層住居専用地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "第二種住居地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "田園住居地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "準住居地域"], '#6ab547',
                    ['==', ['get', "A29_005"], "近隣商業地域"], '#da81b2',
                    ['==', ['get', "A29_005"], "商業地域"], '#da81b2',
                    ['==', ['get', "A29_005"], "準工業地域"], '#4c6cb3',
                    ['==', ['get', "A29_005"], "工業地域"], '#4c6cb3',
                    ['==', ['get', "A29_005"], "工業専用地域"], '#4c6cb3',
                    "#000000"
                ],
                'fill-opacity': 0.7
            }
        });

        // Popup when click
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties["A29_005"])
                .addTo(map);
        });

        map.on('mouseenter', layerId, function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', layerId, function () {
            map.getCanvas().style.cursor = '';
        });
    }

        const youto_chiiki_areas = [
            { sourceId: 'A29-19_47205', layerId: 'A29-19_47205', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47205.geojson' },
            { sourceId: 'A29-19_47208', layerId: 'A29-19_47208', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47208.geojson' },
            { sourceId: 'A29-19_47209', layerId: 'A29-19_47209', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47209.geojson' },
            { sourceId: 'A29-19_47210', layerId: 'A29-19_47210', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47210.geojson' },
            { sourceId: 'A29-19_47211', layerId: 'A29-19_47211', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47211.geojson' },
            { sourceId: 'A29-19_47212', layerId: 'A29-19_47212', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47212.geojson' },
            { sourceId: 'A29-19_47213', layerId: 'A29-19_47213', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47213.geojson' },
            { sourceId: 'A29-19_47214', layerId: 'A29-19_47214', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47214.geojson' },
            { sourceId: 'A29-19_47215', layerId: 'A29-19_47215', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47215.geojson' },
            { sourceId: 'A29-19_47324', layerId: 'A29-19_47324', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47324.geojson' },
            { sourceId: 'A29-19_47325', layerId: 'A29-19_47325', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47325.geojson' },
            { sourceId: 'A29-19_47326', layerId: 'A29-19_47326', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47326.geojson' },
            { sourceId: 'A29-19_47327', layerId: 'A29-19_47327', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47327.geojson' },
            { sourceId: 'A29-19_47328', layerId: 'A29-19_47328', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47328.geojson' },
            { sourceId: 'A29-19_47329', layerId: 'A29-19_47329', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47329.geojson' },
            { sourceId: 'A29-19_47348', layerId: 'A29-19_47348', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47348.geojson' },
            { sourceId: 'A29-19_47350', layerId: 'A29-19_47350', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47350.geojson' },
            { sourceId: 'A29-19_47362', layerId: 'A29-19_47362', geojsonPath: './geojson/city_planning/youto_chiiki/A29-19_47362.geojson' },
        ];

        // Add city layers
        youto_chiiki_areas.forEach(city => addCityLayer(map, city.sourceId, city.layerId, city.geojsonPath));


    /* --------------------------------------------------------
    　世界文化遺産
    -------------------------------------------------------- */
    function add_World_Cultural_Heritages_Layer(map, sourceId, layerId, geojsonPath) {
        // Add a source for the city polygons.
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });

        // Add a layer showing the city polygons.
        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-outline-color': 'rgba(255,0,0,1)',
                'fill-color': 'rgba(255,0,0,.5)'
            }
        });
        // ポップアップ
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties["A34a_003"])
                .addTo(map);
        });
        map.on('mouseenter', layerId, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, function () {
            map.getCanvas().style.cursor = '';
        });
    }

        const world_cultural_heritages = [
            { sourceId: 'A34a-230328', layerId: 'A34a-230328', geojsonPath: './geojson/facilities/world_cultural_heritages/A34a-230328.geojson' },
        ];

        // Add city layers
        world_cultural_heritages.forEach(world_cultural_heritage => add_World_Cultural_Heritages_Layer(map, world_cultural_heritage.sourceId, world_cultural_heritage.layerId, world_cultural_heritage.geojsonPath));

    /* --------------------------------------------------------
    　世界自然遺産
    -------------------------------------------------------- */
    function add_World_Natural_Heritages_Layer(map, sourceId, layerId, geojsonPath) {
        // Add a source for the city polygons.
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });

        // Add a layer showing the city polygons.
        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-outline-color': 'rgba(0,255,0,1)',
                'fill-color': 'rgba(0,255,0,.5)'
            }
        });
        // ポップアップ
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties["A34a_003"])
                .addTo(map);
        });
        map.on('mouseenter', layerId, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, function () {
            map.getCanvas().style.cursor = '';
        });
    }

        const world_natural_heritages = [
            { sourceId: 'world_natural_heritages', layerId: 'world_natural_heritages', geojsonPath: './geojson/facilities/world_natural_heritages/world_natural_heritages.geojson' },
        ];

        // Add city layers
        world_natural_heritages.forEach(world_natural_heritage => add_World_Natural_Heritages_Layer(map, world_natural_heritage.sourceId, world_natural_heritage.layerId, world_natural_heritage.geojsonPath));


    /* --------------------------------------------------------
    　ハイクラスホテル
    -------------------------------------------------------- */
    map.addSource('high_class_hotels', {
        'type': 'geojson',
        'data': './geojson/facilities/high_class_hotels/high_class_hotels.geojson'
    });
    map.addLayer({
        'id': "high_class_hotels",
        'type': 'circle',
        'source': 'high_class_hotels',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 1.5,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'red'
        }
    });
    // ポップアップ //
    map.on('click', "high_class_hotels", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["名前"])
            .addTo(map);
    });
    map.on('mouseenter', "high_class_hotels", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "high_class_hotels", function () {
        map.getCanvas().style.cursor = '';
    });

    /* --------------------------------------------------------
    　エリア方針
    -------------------------------------------------------- */
    function add_area_policies_Layer(map, sourceId, layerId, geojsonPath, fillColor, popupText) {
        // Add a source for the city polygons.
        map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojsonPath
        });

        // Add a layer showing the city polygons.
        map.addLayer({
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-color': fillColor,
                'fill-opacity': 0.7
            }
        });

        // Popup when click
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

    const area_policies = [
        { sourceId: 'north', layerId: 'north', geojsonPath: './geojson/area_policies/north.geojson', fillColor: 'red', popupText: "test" },
        { sourceId: 'middle', layerId: 'middle', geojsonPath: './geojson/area_policies/middle.geojson', fillColor: 'green', popupText: "test"},
        { sourceId: 'south', layerId: 'south', geojsonPath: './geojson/area_policies/south.geojson', fillColor: 'blue', popupText: "test"},
        { sourceId: 'miyako', layerId: 'miyako', geojsonPath: './geojson/area_policies/miyako.geojson', fillColor: 'yellow', popupText: "test"},
        { sourceId: 'yaeyama', layerId: 'yaeyama', geojsonPath: './geojson/area_policies/yaeyama.geojson', fillColor: 'purple', popupText: "test"},
    ];

    // Add layers
    area_policies.forEach(elem => add_area_policies_Layer(map, elem.sourceId, elem.layerId, elem.geojsonPath, elem.fillColor, elem.popupText));


    /* ----------------------------------------------------------------------------
    　レイヤー表示/非表示
    ---------------------------------------------------------------------------- */
    // #####　表示/非表示の関数を定義
    function updateLayerVisibility(layerIds, visibility) {
        if (Array.isArray(layerIds)) {
            layerIds.forEach(layerId => {
                map.setLayoutProperty(layerId, 'visibility', visibility ? 'visible' : 'none');
            });
        } else {
            map.setLayoutProperty(layerIds, 'visibility', visibility ? 'visible' : 'none');
        }
    }

    // ##### イベント・リスナー（チェックボックス）
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
    // 自然保全地域 //
    document.getElementById('shizen_hozenCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['shizen_hozen_01', 'shizen_hozen_02', 'shizen_hozen_03'], this.checked);
    });
    // 鳥獣保護区 //
    document.getElementById('chouju_hogoCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['chouju_hogo'], this.checked);
    });
    // 市街化調整区域 //
    document.getElementById('chousei_kuikiCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['47201_那覇市','47205_宜野湾市','47207_石垣市','47208_浦添市','47209_名護市','47210_糸満市','47211_沖縄市','47212_豊見城市','47213_うるま市','47214_宮古島市','47215_南城市','47308_国頭郡本部町','47324_中頭郡読谷村','47325_中頭郡嘉手納町','47326_中頭郡北谷町','47327_中頭郡北中城村','47329_中頭郡西原町','47348_島尻郡与那原町','47350_島尻郡南風原町','47362_島尻郡八重瀬町'], this.checked);
    });
    // 用途地域 //
    document.getElementById('youto_chiikiCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['A29-19_47205','A29-19_47208','A29-19_47209','A29-19_47210','A29-19_47211','A29-19_47212','A29-19_47213','A29-19_47214','A29-19_47215','A29-19_47324','A29-19_47325','A29-19_47326','A29-19_47327','A29-19_47328','A29-19_47329','A29-19_47348','A29-19_47350','A29-19_47362'], this.checked);
    });
    // 世界文化遺産 //
    document.getElementById('world_cultural_heritagesCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['A34a-230328'], this.checked);
    });
    // 世界自然遺産 //
    document.getElementById('world_natural_heritagesCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['world_natural_heritages'], this.checked);
    });
    // ハイクラスホテル //
    document.getElementById('high_class_hotelsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('high_class_hotels', this.checked);
    });
    
    // ##### チェックボックスの状態に応じて表示/非表示
    // 行政区域 //
    updateLayerVisibility('boundaries', document.getElementById('boundariesCheckbox').checked);
    // 空港 //
    updateLayerVisibility('airports', document.getElementById('airportsCheckbox').checked);
    // 鉄道 //
    updateLayerVisibility('railways', document.getElementById('railwaysCheckbox').checked);
    // 高速道路 //
    updateLayerVisibility('highways', document.getElementById('highwaysCheckbox').checked);
    // 自然公園 //
    updateLayerVisibility(['shizenkoen_01', 'shizenkoen_02', 'shizenkoen_03'], document.getElementById('shizen_koenCheckbox').checked);
    // 自然保全地域 //
    updateLayerVisibility(['shizen_hozen_01', 'shizen_hozen_02', 'shizen_hozen_03'], document.getElementById('shizen_hozenCheckbox').checked);
    // 鳥獣保護区 //
    updateLayerVisibility(['chouju_hogo'], document.getElementById('chouju_hogoCheckbox').checked);
    // 市街化調整区域 //
    updateLayerVisibility(['47201_那覇市','47205_宜野湾市','47207_石垣市','47208_浦添市','47209_名護市','47210_糸満市','47211_沖縄市','47212_豊見城市','47213_うるま市','47214_宮古島市','47215_南城市','47308_国頭郡本部町','47324_中頭郡読谷村','47325_中頭郡嘉手納町','47326_中頭郡北谷町','47327_中頭郡北中城村','47329_中頭郡西原町','47348_島尻郡与那原町','47350_島尻郡南風原町','47362_島尻郡八重瀬町'], document.getElementById('chousei_kuikiCheckbox').checked);
    // 用途地域 //
    updateLayerVisibility(['A29-19_47205','A29-19_47208','A29-19_47209','A29-19_47210','A29-19_47211','A29-19_47212','A29-19_47213','A29-19_47214','A29-19_47215','A29-19_47324','A29-19_47325','A29-19_47326','A29-19_47327','A29-19_47328','A29-19_47329','A29-19_47348','A29-19_47350','A29-19_47362'], document.getElementById('youto_chiikiCheckbox').checked);
    // 世界文化遺産 //
    updateLayerVisibility(['A34a-230328'], document.getElementById('world_cultural_heritagesCheckbox').checked);
    // 世界自然遺産 //
    updateLayerVisibility(['world_natural_heritages'], document.getElementById('world_natural_heritagesCheckbox').checked);
    // ハイクラスホテル //
    updateLayerVisibility('high_class_hotels', document.getElementById('high_class_hotelsCheckbox').checked);

    // ##### 初期設定
    document.getElementById('boundariesCheckbox').checked = true;

});


map.addControl(new mapboxgl.NavigationControl());
        

