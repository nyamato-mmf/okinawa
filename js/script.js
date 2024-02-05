
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
    　空港ネットワーク
    -------------------------------------------------------- */
    map.addSource('flight_network', {
        'type': 'geojson',
        'data': './geojson/infrastructure/flight_network/flight_network.geojson'
    });
    map.addLayer({
        'id': "flight_network",
        'type': 'line',
        'source': 'flight_network',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': [
                'case',
                ['==', ['get', "S10b_004"], "那覇"], '#ff0000',
                ['==', ['get', "S10b_004"], "久米島"], '#00ff00',
                ['==', ['get', "S10b_004"], "石垣"], '#0000ff',
                ['==', ['get', "S10b_004"], "宮古"], '#f00000',
                ['==', ['get', "S10b_004"], "多良間"], '#0f0000',
                ['==', ['get', "S10b_004"], "与那国"], '#0000ff',
                ['==', ['get', "S10b_004"], "下地島"], '#0000ff',
                ['==', ['get', "S10b_004"], "北大東"], '#0000ff',
                ['==', ['get', "S10b_004"], "慶良間"], '#0000ff',
                ['==', ['get', "S10b_004"], "粟国"], '#0000ff',
                ['==', ['get', "S10b_004"], "南大東"], '#0000ff',
                ['==', ['get', "S10b_004"], "波照間"], '#0000ff',
                "#ffff00"
            ],
            'line-width': 0.5,
        }
    });
    // ポップアップ //
    map.on('click', "flight_network", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["C28_005"])
            .addTo(map);
    });
    map.on('mouseenter', "flight_network", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "flight_network", function () {
        map.getCanvas().style.cursor = '';
    });

    /* --------------------------------------------------------
    　港湾
    -------------------------------------------------------- */
    map.addSource('ports', {
        'type': 'geojson',
        'data': './geojson/infrastructure/ports/ports.geojson'
    });
    map.addLayer({
        'id': "ports",
        'type': 'circle',
        'source': 'ports',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 2,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'blue'
        }
    });
    // ポップアップ //
    map.on('click', "ports", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["C02_005"])
            .addTo(map);
    });
    map.on('mouseenter', "ports", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "ports", function () {
        map.getCanvas().style.cursor = '';
    });

    /* --------------------------------------------------------
    　港湾ネットワーク
    -------------------------------------------------------- */
    map.addSource('ports_network', {
        'type': 'geojson',
        'data': './geojson/infrastructure/ports_network/ports_network.geojson'
    });
    map.addLayer({
        'id': "ports_network",
        'type': 'line',
        'source': 'ports_network',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': [
                'case',
                ['==', ['get', "N09_013"], "那覇"], '#ff0000',
                ['==', ['get', "N09_013"], "泊"], '#ff0000',
                ['==', ['get', "N09_013"], "那覇（泊）"], '#ff0000',
                ['==', ['get', "N09_016"], "那覇"], '#ff0000',
                "#0000ff"
            ],
            'line-width': 0.5,
        }
    });
    // ポップアップ //
    map.on('click', "ports_network", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N09_006"])
            .addTo(map);
    });
    map.on('mouseenter', "ports_network", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "ports_network", function () {
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
        // ポップアップ
        map.on('click', layerId, function (e) {
            console.log(e.features[0].properties);
            new mapboxgl.Popup({className: 'popupCustom'})
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
        { sourceId: 'north', layerId: 'north', geojsonPath: './geojson/area_policies/north.geojson', fillColor: 'red', popupText: 
        `<ul>
            <li>ガイド制度の普及や観光客の入域管理</li>
            <li>やんばるの森を活用した観光拠点の形成</li>
            <li>星空ツーリズム、ダムツーリズム、グランピング、ワーケーションなど滞在型観光の推進</li>
            <li>沖縄海洋博覧会地区の拠点機能の充実と、大規模テーマパーク事業計画を含む新たな周辺地域への周遊や特産品の販売促進</li>
            <li>リゾート施設(西海岸地域、カヌチャ地域等)と万国津梁館及びOISTをはじめ、北部圏域に拠点を持つ県内学術機関の連携によるMICE誘致・受入</li>
            <li>環金武湾地域における金武湾の特性や自然、文化を生かした健康保養をテーマとした滞在型観光等の取組の促進</li>
            <li>自然・文化・体験等を軸としたエコツーリズム、アドベンチャーツーリズム、サイクルツーリズム、ヘルスツーリズム等の推進</li>
            <li>ICTによる観光の質の向上により、リピーター等が持続的につながる観光展開を推進</li>
            <li>プロスポーツチームや実業団チーム等がキャンプやトレーニングを行う受入地域としての知名度や各種スポーツイベント等を活用したスポーツツーリズムを推進</li>
            <li>スポーツ指導者等の人材育成も含めた環境整備を促進</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ul>` },
        { sourceId: 'middle', layerId: 'middle', geojsonPath: './geojson/area_policies/middle.geojson', fillColor: 'green', popupText: 
        `<ul>
            <li>体験・滞在型観光など地域資源を活用した本圏域特有の観光スタイルを創出</li>
            <li>良好な景観の形成、環境保全活動と経済活動が共存するルールづくり、魅力ある風景づくり等を推進し、豊かで美しい観光・都市空間の創出</li>
            <li>北谷町を観光二次交通結節点として位置づけ、二次交通の利用促進と分散化</li>
            <li>沖縄全島エイサーまつり等の音楽・芸能を活用した観光・レクリエーション拠点の形成</li>
            <li>広域的な児童・青少年の健全育成拠点及び観光拠点として「沖縄こどもの国」を活用</li>
            <li>新港地区においてクルーズ船の受入拠点の形成</li>
            <li>泡瀬地区において東部海浜開発事業を推進</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
            <li>プロスポーツキャンプ等の受入やおきなわマラソンなど各種スポーツイベント開催をはじめとするスポーツツーリズムを推進</li>
            <li>FIBAバスケットボールワールドカップ2023等の国際大会の開催など、沖縄アリーナを核とした「スポーツアイランド沖縄」の形成に向けた取組を推進</li>
            <li>東部海浜開発地区「潮乃森」など、新たなスポーツコンベンション拠点を有するビーチフロント観光地の形成</li>
            <li>CIQの常設化及び迅速化、充実した船舶補給施設の整備などによりスーパーヨット受入の環境整備を推進</li>
            <li>沖縄県総合運動公園、吉の浦公園等の総合スポーツ施設等を生かし、プロスポーツチームの合宿や、学生及び社会人におけるクラブ活動の誘致</li>
            <li>首里城を起点として中城城跡、勝連城跡、座喜味城跡を周遊しやすくするための取組を推進</li>
        </ul>` },
        { sourceId: 'south', layerId: 'south', geojsonPath: './geojson/area_policies/south.geojson', fillColor: 'blue', popupText:         
        `<ul>
            <li>沖縄戦跡国定公園を中心とした戦跡の保存・活用など平和発信地域を形成</li>
            <li>当該国定公園の特別地域の範囲の見直しを図るなど、平和の発信と歴史的風景の保全を両立する地域を形成</li>
            <li>首里城を中心とした歴史・文化の復興に向けて、首里城正殿の早期復元や復元過程の公開、首里城公園の魅力向上や施設管理体制の強化、</li>
            <li>戦災により焼失した中城御殿や円覚寺等の文化財の保存・復元整備、第32軍司令部壕の保存・公開に向けた取組を推進</li>
            <li>斎場御嶽など琉球王国のグスク及び関連遺産群の保全や周辺整備を促進し、琉球歴史回廊の形成を図るとともに、各地域に残る文化財の保全や周辺整備を促進</li>
            <li>沖縄空手会館を拠点に世界大会の開催や空手愛好家の受入体制強化を進め、「空手発祥の地・沖縄」の強力な発信に取り組む</li>
            <li>沖縄県立博物館・美術館、浦添市における国立劇場おきなわなど文化機能の充実を図る</li>
            <li>おきなわ工芸の杜を活用した商品開発、マーケティング、ブランド力向上等の推進に取り組み、地域の伝統工芸の魅力や価値の向上と伝統工芸の技術・技法の継承</li>
            <li>良好な景観の形成、環境保全活動と経済活動が共存するルールづくり、魅力ある風景づくり等を推進し、豊かで美しい観光・都市空間の創出を</li>
            <li>西海岸地域では、アジアをはじめとする諸外国や県内外との交流拠点の形成を目指し、施設の充実及び受入体制の強化を促進</li>
            <li>那覇港では、国際クルーズ拠点の形成に向け、フライ・アンド・クルーズ等の高付加価値を促す多様なクルーズの誘致等に取り組む</li>
            <li>那覇港の歴史・文化、自然環境や周辺離島との連携等を活かしたウォーターフロント空間の創出等を図る</li>
            <li>マリンタウンMICEエリアでは、大型MICE 施設の整備に向けた取組を推進し、宿泊施設や商業施設の立地促進や施設利用者の交通利便性の確保、オープンスペースの賑わいやスマートシティの形成など、MICE を中心とした魅力あるまちづくりに取り組む</li>
            <li>中城湾港では、西原与那原地区においてスーパーヨットの受入拠点や大型MICE施設と連動したウォーターフロント空間の形成を図る</li>
            <li>観光地域づくり法人(DMO)等との連携による東海岸地域の観光周遊の広域化、自然環境やソフトパワーを活用したワーケーションの展開</li>
            <li>NAHA マラソンなど南部各地で開催されるスポーツ大会、大綱ひき、ハーリー等の各種イベントの充実</li>
            <li>奥武山公園に、Ｊ１規格スタジアムを整備し、地域・観光交流拠点となるスポーツ施設の充実</li>
            <li>東海岸地域の歴史文化資源や観光資源といった地域の魅力をつなげるサイクルツーリズムの推進など、スポーツによる地域活性化</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
            <li>慶良間諸島でのエコツーリズム(ダイビングやホエールウォッチングなど)、久米島の海洋深層水を活用した保養・療養型観光など、特有の自然・景観、伝統・文化等の魅力を生かした交流人口及び関係人口の拡大並びに農林水産業等の地場産業との連携など、離島ならではの体験・滞在型観光を促進</li>
            <li>本圏域では、慢性的な交通渋滞が発生しているため、玄関口の主要拠点と拠点都市間の移動の円滑化、利便性の向上を図り、交通料金と観光施設入場券がセットとなったお得な周遊券を促進することで、国内外からの観光客の満足度、観光消費額向上につなげる</li>
            <li>た都市型MICEの開催に向けて、中城湾港西原与那原地区における大型MICE施設の整備や、大型国際見本市・展示会を始めとする各種MICEの地元自治体と連携した誘致体制を強化し、地元事業者等によるMICE関連ビジネスの振興</li>
        </ul>` },
        { sourceId: 'miyako', layerId: 'miyako', geojsonPath: './geojson/area_policies/miyako.geojson', fillColor: 'yellow', popupText:         
        `<ul>
            <li>自然資源の利用ルールの策定や周知の徹底、環境に配慮した良質な観光メニューの普及等により、持続可能な観光地づくりを推進</li>
            <li>世界規模の全日本トライアスロン宮古島大会等のスポーツイベントなど島々の特性に応じた各種イベントの充実を図り、「スポーツアイランド沖縄」の形成に向けた取組を促進</li>
            <li>エコツーリズム、アドベンチャーツーリズム、サイクルツーリズムなど体験・滞在型観光を推進</li>
            <li>砂山ビーチ等の美しい砂浜や通り池など有数のダイビングスポット、地下ダムや自然エネルギー施設など産業観光施設、地域内の歴史・文化資源、マンゴーに代表される熱帯果樹等の農林水産物、地域のホスピタリティなど、様々な資源を活用した独自の観光スタイルの創出を促進</li>
            <li>多良間島では、海洋レジャー、自然観察など豊かな観光資源を活用した多様な取組を促進</li>
            <li>伊良部島では、ワンランク上のリゾートライフをコンセプトとして、国際線やプライベートジェットも受入可能な下地島空港旅客ターミナル施設の開業や伊良部大橋の架橋を生かし、ラグジュアリーな宿泊施設の立地促進など、富裕層をターゲットとした観光地の形成を推進</li>
            <li>新規航空会社の誘致や定期航空路線開設に向けた働きかけによる航空路の充実</li>
            <li>クルーズ船やスーパーヨットの誘致など近隣諸国等からの観光誘客活動を地域との連携</li>
            <li>自然、文化など多様な魅力ある離島を含む広域周遊ルートの形成や受入環境の整備に関係機関と連携して取り組む</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ul>` },
        { sourceId: 'yaeyama', layerId: 'yaeyama', geojsonPath: './geojson/area_policies/yaeyama.geojson', fillColor: 'purple', popupText:         
        `<ul>
            <li>自然資源の利用ルールの策定や周知の徹底、環境に配慮した良質な観光メニューの普及等により、持続可能な観光地づくりを推進</li>
            <li>世界自然遺産に登録された西表島では、ガイド制度の普及や観光客の入域管理など、持続可能な観光受入体制の構築に取り組む。</li>
            <li>石西礁湖をはじめ世界有数といわれるサンゴ礁域や西表島の広大な原生林・マングローブ林など、多様性に富んだ自然環境を生かしたエコツーリズムやグリーン・ツーリズム等の体験・滞在型観光を推進</li>
            <li>アストロツーリズム（星空ツーリズム）の推進、スポーツキャンプの誘致活動を実施するとともに、受入環境の充実を図り、サイクルツーリズムの推進、大規模スポーツイベントの実施によりスポーツによる地域活性化</li>
            <li>石垣市のトゥバラーマ大会等の民俗芸能イベントや石垣島トライアスロンなど島々の特性に応じた各種イベントの充実</li>
            <li>竹富町における昔ながらの美しい集落景観など、島々の特性や豊かな自然、伝統文化等を生かした周遊ルートの多様化を促進</li>
            <li>与那国町等では、交流人口の拡大による自立的発展に向けた地域の活性化を推進するため、豊かな自然や歴史文化資源を活用し、釣りやダイビング、歴史探訪等の多様な取組を促進</li>
            <li>新規航空会社の誘致や定期航空路線開設に向けた働きかけによる航空路の充実</li>
            <li>クルーズ船やスーパーヨットの誘致など近隣諸国等からの観光誘客活動を地域との連携</li>
            <li>自然、文化など多様な魅力ある離島を含む広域周遊ルートの形成や受入環境の整備に関係機関と連携して取り組む</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ul>` },
    ];

    // Add layers
    area_policies.forEach(elem => add_area_policies_Layer(map, elem.sourceId, elem.layerId, elem.geojsonPath, elem.fillColor, elem.popupText));

    /* --------------------------------------------------------
    　映像
    -------------------------------------------------------- */
    map.loadImage(
        '././img/marker-blue.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('myicon', image);

            // Add a data source containing several points' features.
            map.addSource('videos', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "伊江島空港",
                                'description':
                                    '<strong>伊江島空港</strong><p><iframe width="200" src="././video/iejima.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [127.78535213862155, 26.724520684040552]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "慶良間空港",
                                'description':
                                    '<strong>慶良間空港</strong><p><iframe width="200" src="././video/kerama.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [127.29368255441145, 26.169305833296576]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "下地島空港",
                                'description':
                                    '<strong>下地島空港</strong><p><iframe width="200" src="././video/shimojishima.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [125.14706025938706, 24.82727017832808]
                            }
                        },
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'videos',
                'type': 'symbol',
                'source': 'videos', // reference the data source
                'layout': {
                    'icon-image': 'myicon', // reference the image
                    'icon-size': 1.5,
                    'visibility': 'none'
                },
            });
            // On click, get coordinates and a description.
            map.on('click', 'videos', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Create a popup object
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);

            });
            map.on('mouseenter', 'videos', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'videos', () => {
                map.getCanvas().style.cursor = '';
            });


        }
    );


    /* ----------------------------------------------------------------------------
    　レイヤー表示/非表示
    ---------------------------------------------------------------------------- */
    // 表示/非表示の関数を定義
    function updateLayerVisibility(layerIds, visibility) {
        if (Array.isArray(layerIds)) {
            layerIds.forEach(layerId => {
                map.setLayoutProperty(layerId, 'visibility', visibility ? 'visible' : 'none');
            });
        } else {
            map.setLayoutProperty(layerIds, 'visibility', visibility ? 'visible' : 'none');
        }
    }

    // イベント・リスナー（チェックボックス）
    // 行政区域 //
    document.getElementById('boundariesCheckbox').addEventListener('change', function () {
        updateLayerVisibility('boundaries', this.checked);
    });
    // 空港 //
    document.getElementById('airportsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('airports', this.checked);
    });
    // 空港ネットワーク //
    document.getElementById('flight_networkCheckbox').addEventListener('change', function () {
        updateLayerVisibility('flight_network', this.checked);
    });
    // 港湾 //
    document.getElementById('portsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('ports', this.checked);
    });
    // 港湾ネットワーク //
    document.getElementById('ports_networkCheckbox').addEventListener('change', function () {
        updateLayerVisibility('ports_network', this.checked);
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
    // エリア方針 //
    document.getElementById('area_policiesCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['north','middle','south','miyako','yaeyama'], this.checked);
    });
    // 映像 //
    document.getElementById('videosCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['videos'], this.checked);
    });
    
    
    // チェックボックスの状態に応じて表示/非表示
    // 行政区域 //
    updateLayerVisibility('boundaries', document.getElementById('boundariesCheckbox').checked);
    // 空港 //
    updateLayerVisibility('airports', document.getElementById('airportsCheckbox').checked);
    // 空港ネットワーク //
    updateLayerVisibility('flight_network', document.getElementById('flight_networkCheckbox').checked);
    // 港湾 //
    updateLayerVisibility('ports', document.getElementById('portsCheckbox').checked);
    // 港湾ネットワーク //
    updateLayerVisibility('ports_network', document.getElementById('ports_networkCheckbox').checked);
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
    // エリア方針 //
    updateLayerVisibility(['north','middle','south','miyako','yaeyama'], document.getElementById('area_policiesCheckbox').checked);
    // 映像 //
    updateLayerVisibility(['videos'], document.getElementById('videosCheckbox').checked);


    // 初期設定
    document.getElementById('boundariesCheckbox').checked = true;

});


map.addControl(new mapboxgl.NavigationControl());
        

