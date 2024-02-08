

/* ----------------------------------------------------------------------------
　Mapboxマップ描画機能
---------------------------------------------------------------------------- */
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
            'visibility': 'none'
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
            'visibility': 'none'
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
            'visibility': 'none'
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
            'visibility': 'none'
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
            'visibility': 'none'
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
            'visibility': 'none'
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
    　道路
    -------------------------------------------------------- */
    map.addSource('roads', {
        'type': 'geojson',
        'data': './geojson/infrastructure/roads/roads.geojson'
    });
    map.addLayer({
        'id': "roads",
        'type': 'line',
        'source': 'roads',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': [
                'case',
                ['==', ['get', "N12_003"], 1], '#ff0000',
                ['==', ['get', "N12_003"], 2], '#00ffff',
                ['==', ['get', "N12_003"], 3], '#0000ff',
                ['==', ['get', "N12_003"], 4], '#00ff00',
                "#000000"
            ],
            'line-width': [
                'case',
                ['==', ['get', "N12_003"], 1], 2.5,
                ['==', ['get', "N12_003"], 2], 2.5,
                ['==', ['get', "N12_003"], 3], 1.5,
                ['==', ['get', "N12_003"], 4], 1,
                0.5
            ],
        }
    });
    // ポップアップ //
    map.on('click', "roads", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N12_004"])
            .addTo(map);
    });
    map.on('mouseenter', "roads", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "roads", function () {
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
    　農業地域
    -------------------------------------------------------- */
    function add_nougyou_chiiki_MapLayer(map, sourceId, layerId, geojsonPath, fillColor, popupText) {
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

    add_nougyou_chiiki_MapLayer(map, 'nougyou_chiiki', 'nougyou_chiiki', './geojson/city_planning/nougyou_chiiki/nougyou_chiiki.geojson', '#0000ff', '農業地域');
    add_nougyou_chiiki_MapLayer(map, 'nouyouchi', 'nouyouchi', './geojson/city_planning/nougyou_chiiki/nouyouchi.geojson', '#ff0000', '農用地区域');
    
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
    　砂浜
    -------------------------------------------------------- */
    map.addSource('beaches', {
        'type': 'geojson',
        'data': './geojson/geographies/beaches_lines.geojson'
    });
    map.addLayer({
        'id': 'beaches',
        'type': 'line',
        'source': 'beaches',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': [
                'case',
                ['==', ['get', "P23b_009"], "t"], '#0000ff',
                'rgba(0,0,0,0)'
            ],
            'line-width': [
                'case',
                ['==', ['get', "P23b_009"], "t"], 5,
                0.5
            ],
        }
    });
    // ポップアップ //
    map.on('click', "beaches", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("砂浜")
            .addTo(map);
    });
    map.on('mouseenter', "beaches", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', "beaches", function () {
        map.getCanvas().style.cursor = '';
    });

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
            'visibility': 'none'
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
        `<ol>
            <li>ガイド制度の普及、観光客の入域管理</li>
            <li><strong><mark>やんばるの森</mark></strong>を活用した観光拠点の形成</li>
            <li>滞在型観光（星空ツーリズム、ダムツーリズム、グランピング、ワーケーションなど）の推進</li>
            <li><strong><mark>沖縄海洋博覧会地区</mark></strong>の拠点機能の充実、<strong><mark class="blue-marker">大規模テーマパーク事業計画</mark></strong>を含む周辺地域への周遊</li>
            <li><strong><mark>リゾート施設(西海岸地域、カヌチャ地域等)と万国津梁館及びOIST</mark></strong>、学術機関の連携によるMICE誘致・受入</li>
            <li><strong><mark>金武湾</mark></strong>の特性や自然、文化を生かした健康保養をテーマとした滞在型観光の促進</li>
            <li>エコツーリズム、アドベンチャーツーリズム、サイクルツーリズム、ヘルスツーリズムの推進</li>
            <li>ICTによる観光の質の向上によるリピーターの増加</li>
            <li>スポーツツーリズムの推進</li>
            <li>スポーツ指導者等の人材育成も含めた環境整備</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設を整備</li>
            <li>国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ol>` },
        { sourceId: 'middle', layerId: 'middle', geojsonPath: './geojson/area_policies/middle.geojson', fillColor: 'green', popupText: 
        `<ol>
            <li>地域資源を活用した観光スタイル（体験・滞在型観光など）の創出</li>
            <li>良好な景観の形成、環境保全活動と経済活動が共存するルールづくり、魅力ある風景づくりを推進し、豊かで美しい観光・都市空間の創出</li>
            <li><strong><mark>北谷町</mark></strong>を観光二次交通結節点として位置づけ、二次交通の利用促進と分散化</li>
            <li>沖縄全島エイサーまつり等の音楽・芸能を活用した観光・レクリエーション拠点の形成</li>
            <li>広域的な児童・青少年の健全育成拠点及び観光拠点として<strong><mark>沖縄こどもの国</strong></mark>を活用</li>
            <li><strong><mark>新港地区</strong></mark>において<strong><mark class="blue-marker">クルーズ船の受入拠点</mark></strong>の形成</li>
            <li><strong><mark>泡瀬地区</strong></mark>において<strong><mark class="blue-marker">東部海浜開発事業</mark></strong>を推進</li>
            <li>プロスポーツキャンプ等の受入やおきなわマラソンなど各種スポーツイベント開催をはじめとするスポーツツーリズムを推進</li>
            <li>FIBAバスケW杯等の国際大会の開催など、<strong><mark>沖縄アリーナ</strong></mark>を核とした「スポーツアイランド沖縄」の形成</li>
            <li><strong><mark>東部海浜開発地区「潮乃森」</strong></mark>など、新たなスポーツコンベンション拠点を有するビーチフロント観光地の形成</li>
            <li>CIQの常設化及び迅速化、充実した<strong><mark class="blue-marker">船舶補給施設の整備</mark></strong>などによりスーパーヨット受入の環境整備を推進</li>
            <li><strong><mark>沖縄県総合運動公園、吉の浦公園</strong></mark>等の総合スポーツ施設を生かし、プロスポーツチームの合宿や、学生・社会人のクラブ活動を誘致</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設を整備</li>
            <li>国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
            <li><strong><mark>首里城</strong></mark>を起点として<strong><mark>中城城跡、勝連城跡、座喜味城跡</strong></mark>を周遊しやすくする</li>
        </ol>` },
        { sourceId: 'south', layerId: 'south', geojsonPath: './geojson/area_policies/south.geojson', fillColor: 'blue', popupText:         
        `<ol>
            <li><strong><mark>沖縄戦跡国定公園</strong></mark>を中心とした平和発信と歴史的風景の保全を両立する地域を形成</li>
            <li><strong><mark>首里城公園</strong></mark>の魅力向上や施設管理体制の強化</li>
            <li><strong><mark>中城御殿や円覚寺</strong></mark>等の保存・復元整備、<strong><mark>第32軍司令部壕</strong></mark>の保存・公開に向けた取組</li>
            <li><strong><mark>斎場御嶽など琉球王国のグスク及び関連遺産群</strong></mark>の保全や周辺整備を促進し、琉球歴史回廊の形成を図る</li>
            <li><strong><mark>沖縄空手会館</strong></mark>を拠点に世界大会の開催や空手愛好家の受入体制の強化</li>
            <li><strong><mark>沖縄県立博物館・美術館、国立劇場おきなわ</strong></mark>など文化機能の充実を図る</li>
            <li><strong><mark>おきなわ工芸の杜</strong></mark>を活用した商品開発、マーケティング、ブランド力向上の推進</li>
            <li>良好な景観の形成、環境保全活動と経済活動が共存するルールづくり、魅力ある風景づくり等を推進し、豊かで美しい観光・都市空間の創出を</li>
            <li><strong><mark>西海岸地域</strong></mark>では、外国や県内外との交流拠点の形成を目指し、施設の充実及び受入体制の強化</li>
            <li><strong><mark>那覇港</strong></mark>では、国際クルーズ拠点の形成に向け、フライ・アンド・クルーズ等の高付加価値を促す多様なクルーズの誘致</li>
            <li><strong><mark>那覇港</strong></mark>の歴史・文化、自然環境や周辺離島との連携等を活かしたウォーターフロント空間の創出</li>
            <li><strong><mark>マリンタウンMICEエリア</strong></mark>では、<strong><mark class="blue-marker">大型MICE施設の整備</mark></strong>に向けた取組を推進し、宿泊施設や商業施設の立地促進や施設利用者の交通利便性の確保、オープンスペースの賑わいやスマートシティの形成など、MICEを中心とした魅力あるまちづくりに取り組む</li>
            <li><strong><mark>中城湾港</strong></mark>では、<strong><mark>西原与那原地区</strong></mark>において<strong><mark class="blue-marker">スーパーヨットの受入拠点</mark></strong>や大型MICE施設と連動したウォーターフロント空間の形成</li>
            <li>DMOとの連携による<strong><mark>東海岸地域</strong></mark>の観光周遊の広域化、自然環境やソフトパワーを活用したワーケーションの展開</li>
            <li>NAHAマラソンなど南部各地で開催されるスポーツ大会、大綱ひき、ハーリー等の各種イベントの充実</li>
            <li><strong><mark>奥武山公園</strong></mark>に<strong><mark class="blue-marker">J1規格スタジアムを整備</mark></strong>し、地域・観光交流拠点となるスポーツ施設の充実</li>
            <li><strong><mark>東海岸地域</strong></mark>の歴史文化資源や観光資源といった地域の魅力をつなげるサイクルツーリズムの推進</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設を整備</li>
            <li>国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
            <li><strong><mark>慶良間諸島</strong></mark>でのエコツーリズム(ダイビングやホエールウォッチングなど)、<strong><mark>久米島</strong></mark>の海洋深層水を活用した保養・療養型観光など、特有の自然・景観、伝統・文化等の魅力を生かした交流人口及び関係人口の拡大並びに農林水産業等の地場産業との連携など、離島ならではの体験・滞在型観光を促進</li>
            <li>慢性的な交通渋滞の対策として、玄関口の主要拠点と拠点都市間の移動の円滑化、利便性の向上を図り、交通料金と観光施設入場券のセット券を促進することで、満足度・消費額向上につなげる</li>
            <li>都市型MICEの開催に向けて、<strong><mark>中城湾港西原与那原地区</strong></mark>における<strong><mark class="blue-marker">大型MICE施設の整備</mark></strong>や、大型国際見本市・展示会などの誘致体制を強化し、地元事業者等によるMICE関連ビジネスの振興</li>
        </ol>` },
        { sourceId: 'miyako', layerId: 'miyako', geojsonPath: './geojson/area_policies/miyako.geojson', fillColor: 'yellow', popupText:         
        `<ol>
            <li>自然資源の利用ルールの策定や周知の徹底、環境に配慮した良質な観光メニューの普及等により、持続可能な観光地づくりを推進</li>
            <li>世界規模の全日本トライアスロン宮古島大会等のスポーツイベントなど島々の特性に応じた各種イベントの充実を図り、「スポーツアイランド沖縄」の形成に向けた取組を促進</li>
            <li>エコツーリズム、アドベンチャーツーリズム、サイクルツーリズムなど体験・滞在型観光を推進</li>
            <li><strong><mark>砂山ビーチ</strong></mark>等の有数のダイビングスポット、地下ダムや自然エネルギー施設など産業観光施設、歴史・文化資源、熱帯果樹等の農林水産物、地域のホスピタリティなど、様々な資源を活用した独自の観光スタイルの創出</li>
            <li><strong><mark>多良間島</strong></mark>では、海洋レジャー、自然観察など豊かな観光資源を活用した多様な取組を促進</li>
            <li><strong><mark>伊良部島</strong></mark>では、国際線やプライベートジェットも受入可能な下地島空港旅客ターミナル施設の開業や伊良部大橋の架橋を生かし、<strong><mark class="blue-marker">ラグジュアリーな宿泊施設</mark></strong>の立地促進など、富裕層をターゲットとした観光地の形成</li>
            <li><strong><mark class="blue-marker">新規航空会社の誘致や定期航空路線開設</mark></strong>に向けた働きかけによる航空路の充実</li>
            <li><strong><mark class="blue-marker">クルーズ船やスーパーヨットの誘致</mark></strong>など近隣諸国等からの観光誘客活動</li>
            <li>自然、文化など多様な魅力ある離島を含む広域周遊ルートの形成や受入環境の整備に関係機関と連携して取り組む</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ol>` },
        { sourceId: 'yaeyama', layerId: 'yaeyama', geojsonPath: './geojson/area_policies/yaeyama.geojson', fillColor: 'purple', popupText:         
        `<ol>
            <li>自然資源の利用ルールの策定や周知の徹底、環境に配慮した良質な観光メニューの普及等により、持続可能な観光地づくりを推進</li>
            <li>世界自然遺産に登録された<strong><mark>西表島</strong></mark>では、ガイド制度の普及や観光客の入域管理など、持続可能な観光受入体制の構築に取り組む。</li>
            <li><strong><mark>石西礁湖</strong></mark>をはじめ世界有数のサンゴ礁域や<strong><mark>西表島</strong></mark>の広大な原生林・マングローブ林などの自然環境を生かした体験・滞在型観光（エコツーリズムやグリーン・ツーリズム）を推進</li>
            <li>アストロツーリズム（星空ツーリズム）の推進、スポーツキャンプの誘致活動を実施するとともに、受入環境の充実を図り、サイクルツーリズムの推進、大規模スポーツイベントの実施によりスポーツによる地域活性化</li>
            <li><strong><mark>石垣市</strong></mark>のトゥバラーマ大会等の民俗芸能イベントや石垣島トライアスロンなど島々の特性に応じた各種イベントの充実</li>
            <li><strong><mark>竹富町</strong></mark>の美しい集落景観など、島々の特性や豊かな自然、伝統文化等を生かした周遊ルートの多様化</li>
            <li><strong><mark>与那国町</strong></mark>等では、豊かな自然や歴史文化資源を活用し、釣りやダイビング、歴史探訪等の多様な取組を促進</li>
            <li><strong><mark class="blue-marker">新規航空会社の誘致や定期航空路線開設</mark></strong>に向けた働きかけによる航空路の充実</li>
            <li><strong><mark class="blue-marker">クルーズ船やスーパーヨットの誘致</mark></strong>など近隣諸国等からの観光誘客活動</li>
            <li>自然、文化など多様な魅力ある離島を含む広域周遊ルートの形成や受入環境の整備に関係機関と連携して取り組む</li>
            <li>観光地形成促進地域制度を活用し、魅力ある民間施設の整備を促進し、国内外からの観光客の増大や観光の高付加価値化等による滞在日数の延長、観光消費額の向上</li>
        </ol>` },
    ];

    // Add layers
    area_policies.forEach(elem => add_area_policies_Layer(map, elem.sourceId, elem.layerId, elem.geojsonPath, elem.fillColor, elem.popupText));

    /* --------------------------------------------------------
    　映像
    -------------------------------------------------------- */
    map.loadImage(
        '././img/marker-video.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('videoicon', image);

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
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "宮古島",
                                'description':
                                    '<strong>宮古島</strong><p><iframe width="200" src="././video/miyako.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [125.32694445110255, 24.767779213773867]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "海洋博公園",
                                'description':
                                    '<strong>海洋博公園</strong><p><iframe width="200" src="././video/expo.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [127.87584131121169, 26.69408656958406]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                "name": "万国津梁館",
                                'description':
                                    '<strong>万国津梁館</strong><p><iframe width="200" src="././video/shinryokan.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>',
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [127.93439388431534, 26.543187618502326]
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
                    'icon-image': 'videoicon', // reference the image
                    'icon-size': 1,
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

    /* --------------------------------------------------------
    　ラグジュアリー・ホテル
    -------------------------------------------------------- */
    map.loadImage(
        '././img/marker-hotel.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('hotelicon', image);

            // Add a data source containing several points' features.
            map.addSource('luxury_hotels', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {'type': 'Feature', 'properties': {'name': 'Soneva Fushi', 'description': '<strong>Soneva Fushi</strong><p><img src="././img/luxury_hotels/Soneva Fushi.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.0786623, 5.1118009]}},
                        {'type': 'Feature', 'properties': {'name': 'Soneva Jani', 'description': '<strong>Soneva Jani</strong><p><img src="././img/luxury_hotels/Soneva Jani.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.4150317, 5.720434]}},
                        {'type': 'Feature', 'properties': {'name': 'Four Seasons Resort Maldives at Kuda Huraa', 'description': '<strong>Four Seasons Resort Maldives at Kuda Huraa</strong><p><img src="././img/luxury_hotels/Four Seasons Resort Maldives at Kuda Huraa.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.5979972, 4.3301232]}},
                        {'type': 'Feature', 'properties': {'name': 'Four Seasons Resort Maldives Landaa Giraavaru', 'description': '<strong>Four Seasons Resort Maldives Landaa Giraavaru</strong><p><img src="././img/luxury_hotels/Four Seasons Resort Maldives Landaa Giraavaru.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.1122821, 5.2861715]}},
                        {'type': 'Feature', 'properties': {'name': 'AYADA MALDIVES', 'description': '<strong>AYADA MALDIVES</strong><p><img src="././img/luxury_hotels/AYADA MALDIVES.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.3571778, 0.2786906]}},
                        {'type': 'Feature', 'properties': {'name': 'Velaa Private Island', 'description': '<strong>Velaa Private Island</strong><p><img src="././img/luxury_hotels/Velaa Private Island.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [73.209457, 5.831371]}},
                        {'type': 'Feature', 'properties': {'name': 'The Ritz-Carlton, Millenia Singapore', 'description': '<strong>The Ritz-Carlton, Millenia Singapore</strong><p><img src="././img/luxury_hotels/The Ritz-Carlton, Millenia Singapore.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [103.8601209, 1.2909687]}},
                        {'type': 'Feature', 'properties': {'name': 'Raffles Hotel Singapore', 'description': '<strong>Raffles Hotel Singapore</strong><p><img src="././img/luxury_hotels/Raffles Hotel Singapore.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [103.854483, 1.294889]}},
                        {'type': 'Feature', 'properties': {'name': 'Six Senses Duxton', 'description': '<strong>Six Senses Duxton</strong><p><img src="././img/luxury_hotels/Six Senses Duxton.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [103.843367, 1.2787917]}},
                        {'type': 'Feature', 'properties': {'name': 'Fregate Island Private', 'description': '<strong>Fregate Island Private</strong><p><img src="././img/luxury_hotels/Fregate Island Private.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [55.9404697, -4.5818334]}},
                        {'type': 'Feature', 'properties': {'name': 'The Sanchaya', 'description': '<strong>The Sanchaya</strong><p><img src="././img/luxury_hotels/The Sanchaya.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [104.3682289, 1.1774712]}},
                        {'type': 'Feature', 'properties': {'name': 'The Mulia - Nusa Dua', 'description': '<strong>The Mulia - Nusa Dua</strong><p><img src="././img/luxury_hotels/The Mulia - Nusa Dua.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.221174, -8.8162105]}},
                        {'type': 'Feature', 'properties': {'name': 'Mulia Resort - Nusa Dua', 'description': '<strong>Mulia Resort - Nusa Dua</strong><p><img src="././img/luxury_hotels/Mulia Resort - Nusa Dua.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.221174, -8.8162105]}},
                        {'type': 'Feature', 'properties': {'name': 'Amandari', 'description': '<strong>Amandari</strong><p><img src="././img/luxury_hotels/Amandari.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.2447028, -8.487623083]}},
                        {'type': 'Feature', 'properties': {'name': 'Amankila', 'description': '<strong>Amankila</strong><p><img src="././img/luxury_hotels/Amankila.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.5280609, -8.5008658]}},
                        {'type': 'Feature', 'properties': {'name': 'Aman Villas at Nusa Dua', 'description': '<strong>Aman Villas at Nusa Dua</strong><p><img src="././img/luxury_hotels/Aman Villas at Nusa Dua.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.2111222, -8.8131724]}},
                        {'type': 'Feature', 'properties': {'name': 'Amanwana', 'description': '<strong>Amanwana</strong><p><img src="././img/luxury_hotels/Amanwana.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [117.4986933, -8.2630038]}},
                        {'type': 'Feature', 'properties': {'name': 'Viceroy Bali', 'description': '<strong>Viceroy Bali</strong><p><img src="././img/luxury_hotels/Viceroy Bali.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.2764686, -8.4936114]}},
                        {'type': 'Feature', 'properties': {'name': 'Ayana Resort and Spa BALI', 'description': '<strong>Ayana Resort and Spa BALI</strong><p><img src="././img/luxury_hotels/Ayana Resort and Spa BALI.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.1392725, -8.7862171]}},
                        {'type': 'Feature', 'properties': {'name': 'The Villas at AYANA Resort BALI', 'description': '<strong>The Villas at AYANA Resort BALI</strong><p><img src="././img/luxury_hotels/The Villas at AYANA Resort BALI.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.1366264, -8.788001]}},
                        {'type': 'Feature', 'properties': {'name': 'RIMBA Jimbarab BALI by AYANA', 'description': '<strong>RIMBA Jimbarab BALI by AYANA</strong><p><img src="././img/luxury_hotels/RIMBA Jimbarab BALI by AYANA.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.1394921, -8.7934043]}},
                        {'type': 'Feature', 'properties': {'name': 'BVLGARI Resort Bali', 'description': '<strong>BVLGARI Resort Bali</strong><p><img src="././img/luxury_hotels/BVLGARI Resort Bali.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.1216909, -8.8429187]}},
                        {'type': 'Feature', 'properties': {'name': 'NIHI SUMBA', 'description': '<strong>NIHI SUMBA</strong><p><img src="././img/luxury_hotels/NIHI SUMBA.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [119.3762222, -9.7776308]}},
                        {'type': 'Feature', 'properties': {'name': 'The Legian Seminyak Bali', 'description': '<strong>The Legian Seminyak Bali</strong><p><img src="././img/luxury_hotels/The Legian Seminyak Bali.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [115.153314, -8.6844988]}},
                        {'type': 'Feature', 'properties': {'name': 'Amanpuri', 'description': '<strong>Amanpuri</strong><p><img src="././img/luxury_hotels/Amanpuri.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [98.2767076, 7.9841249]}},
                        {'type': 'Feature', 'properties': {'name': 'Soneva Kiri', 'description': '<strong>Soneva Kiri</strong><p><img src="././img/luxury_hotels/Soneva Kiri.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [102.5311733, 11.6986214]}},
                        {'type': 'Feature', 'properties': {'name': 'The Royal Hawaiian Resort Waikiki', 'description': '<strong>The Royal Hawaiian Resort Waikiki</strong><p><img src="././img/luxury_hotels/The Royal Hawaiian Resort Waikiki.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-157.8287149, 21.2772562]}},
                        {'type': 'Feature', 'properties': {'name': 'Four Seasons Resort Maui at Wailea', 'description': '<strong>Four Seasons Resort Maui at Wailea</strong><p><img src="././img/luxury_hotels/Four Seasons Resort Maui at Wailea.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-156.4423445, 20.6801531]}},
                        {'type': 'Feature', 'properties': {'name': 'The Ritz-Carlton Residences Waikiki Beach', 'description': '<strong>The Ritz-Carlton Residences Waikiki Beach</strong><p><img src="././img/luxury_hotels/The Ritz-Carlton Residences Waikiki Beach.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-157.8303638, 21.2827356]}},
                        {'type': 'Feature', 'properties': {'name': 'Trump International Hotel Waikiki', 'description': '<strong>Trump International Hotel Waikiki</strong><p><img src="././img/luxury_hotels/Trump International Hotel Waikiki.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-157.8320619, 21.2793863]}},
                        {'type': 'Feature', 'properties': {'name': 'El Nido Resorts Pangulasian Island', 'description': '<strong>El Nido Resorts Pangulasian Island</strong><p><img src="././img/luxury_hotels/El Nido Resorts Pangulasian Island.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [119.3357447, 11.1131793]}},
                        {'type': 'Feature', 'properties': {'name': 'El Nido Resorts Miniloc Island', 'description': '<strong>El Nido Resorts Miniloc Island</strong><p><img src="././img/luxury_hotels/El Nido Resorts Miniloc Island.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [119.3202135, 11.1497047]}},
                        {'type': 'Feature', 'properties': {'name': 'El Nido Resorts Ragen Island', 'description': '<strong>El Nido Resorts Ragen Island</strong><p><img src="././img/luxury_hotels/El Nido Resorts Ragen Island.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [119.3886795, 11.0941562]}},
                        {'type': 'Feature', 'properties': {'name': 'Amanpulo', 'description': '<strong>Amanpulo</strong><p><img src="././img/luxury_hotels/Amanpulo.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [120.7270957, 11.3563099]}},
                        {'type': 'Feature', 'properties': {'name': 'Four Seasons Resort Bora bora', 'description': '<strong>Four Seasons Resort Bora bora</strong><p><img src="././img/luxury_hotels/Four Seasons Resort Bora bora.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-151.7071035, -16.4725491]}},
                        {'type': 'Feature', 'properties': {'name': 'The Brando', 'description': '<strong>The Brando</strong><p><img src="././img/luxury_hotels/The Brando.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-149.5959015, -17.0227667]}},
                        {'type': 'Feature', 'properties': {'name': 'The Upper House', 'description': '<strong>The Upper House</strong><p><img src="././img/luxury_hotels/The Upper House.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [114.1663406, 22.2775031]}},
                        {'type': 'Feature', 'properties': {'name': 'Mandarin Oriental Paris', 'description': '<strong>Mandarin Oriental Paris</strong><p><img src="././img/luxury_hotels/Mandarin Oriental Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.3272231, 48.8670551]}},
                        {'type': 'Feature', 'properties': {'name': 'La Perouse Nice', 'description': '<strong>La Perouse Nice</strong><p><img src="././img/luxury_hotels/La Perouse Nice.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [7.2792302, 43.6939621]}},
                        {'type': 'Feature', 'properties': {'name': 'Relais Christine', 'description': '<strong>Relais Christine</strong><p><img src="././img/luxury_hotels/Relais Christine.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.3401138, 48.8543896]}},
                        {'type': 'Feature', 'properties': {'name': 'Saint James Paris', 'description': '<strong>Saint James Paris</strong><p><img src="././img/luxury_hotels/Saint James Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.2796401, 48.8706168]}},
                        {'type': 'Feature', 'properties': {'name': 'Le Royal Monceau Raffles Paris', 'description': '<strong>Le Royal Monceau Raffles Paris</strong><p><img src="././img/luxury_hotels/Le Royal Monceau Raffles Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.300295, 48.8757605]}},
                        {'type': 'Feature', 'properties': {'name': 'Hotel du Palais', 'description': '<strong>Hotel du Palais</strong><p><img src="././img/luxury_hotels/Hotel du Palais.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-1.5562046, 43.4867958]}},
                        {'type': 'Feature', 'properties': {'name': 'Park Hyatt Paris Vendome', 'description': '<strong>Park Hyatt Paris Vendome</strong><p><img src="././img/luxury_hotels/Park Hyatt Paris Vendome.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.3305496, 48.8688209]}},
                        {'type': 'Feature', 'properties': {'name': 'La Reserve Paris', 'description': '<strong>La Reserve Paris</strong><p><img src="././img/luxury_hotels/La Reserve Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.3133912, 48.869721]}},
                        {'type': 'Feature', 'properties': {'name': 'Hotel Napoleon Paris', 'description': '<strong>Hotel Napoleon Paris</strong><p><img src="././img/luxury_hotels/Hotel Napoleon Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.2980315, 48.874277]}},
                        {'type': 'Feature', 'properties': {'name': 'Ritz Paris', 'description': '<strong>Ritz Paris</strong><p><img src="././img/luxury_hotels/Ritz Paris.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [2.3288932, 48.8680987]}},
                        {'type': 'Feature', 'properties': {'name': 'Browns Hotel', 'description': '<strong>Browns Hotel</strong><p><img src="././img/luxury_hotels/Browns Hotel.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-0.142200334, 51.50923073]}},
                        {'type': 'Feature', 'properties': {'name': 'The Landmark London', 'description': '<strong>The Landmark London</strong><p><img src="././img/luxury_hotels/The Landmark London.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [-0.1626027, 51.5214599]}},
                        {'type': 'Feature', 'properties': {'name': 'Six Senses Fiji', 'description': '<strong>Six Senses Fiji</strong><p><img src="././img/luxury_hotels/Six Senses Fiji.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [177.1588095, -17.7584111]}},
                        {'type': 'Feature', 'properties': {'name': 'Amanoi', 'description': '<strong>Amanoi</strong><p><img src="././img/luxury_hotels/Amanoi.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [109.197624, 11.7091034]}},
                        {'type': 'Feature', 'properties': {'name': 'Six Senses Ninh Van Bay', 'description': '<strong>Six Senses Ninh Van Bay</strong><p><img src="././img/luxury_hotels/Six Senses Ninh Van Bay.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [109.2776855, 12.3589397]}},
                        {'type': 'Feature', 'properties': {'name': 'Six Senses Con Dao', 'description': '<strong>Six Senses Con Dao</strong><p><img src="././img/luxury_hotels/Six Senses Con Dao.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [106.6338684, 8.7009522]}},
                        {'type': 'Feature', 'properties': {'name': 'Amankora', 'description': '<strong>Amankora</strong><p><img src="././img/luxury_hotels/Amankora.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [89.83522417, 27.62413995]}},
                        {'type': 'Feature', 'properties': {'name': 'The Ritz-Carlton Langkawi', 'description': '<strong>The Ritz-Carlton Langkawi</strong><p><img src="././img/luxury_hotels/The Ritz-Carlton Langkawi.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [99.6953044, 6.3589428]}},
                        {'type': 'Feature', 'properties': {'name': 'The St. Regis Langkawi', 'description': '<strong>The St. Regis Langkawi</strong><p><img src="././img/luxury_hotels/The St. Regis Langkawi.jpg"></img></p>'}, 'geometry': {'type': 'Point', 'coordinates': [99.8625737, 6.2961675]}},
                        
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'luxury_hotels',
                'type': 'symbol',
                'source': 'luxury_hotels', // reference the data source
                'layout': {
                    'icon-image': 'hotelicon', // reference the image
                    'icon-size': 1,
                    'visibility': 'none'
                },
            });
            // On click, get coordinates and a description.
            map.on('click', 'luxury_hotels', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                // Create a popup object
                new mapboxgl.Popup({className: 'popupLuxuryHotel'})
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });
            map.on('mouseenter', 'luxury_hotels', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'luxury_hotels', () => {
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
    // 道路 //
    document.getElementById('roadsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('roads', this.checked);
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
    // 農業地域 //
    document.getElementById('nougyou_chiikiCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['nougyou_chiiki', 'nouyouchi'], this.checked);
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
    // 砂浜 //
    document.getElementById('beachesCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['beaches'], this.checked);
    });
    // ハイクラスホテル //
    document.getElementById('high_class_hotelsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('high_class_hotels', this.checked);
    });  
    // ラグジュアリー・ホテル（世界） //
    document.getElementById('luxury_hotelsCheckbox').addEventListener('change', function () {
        updateLayerVisibility('luxury_hotels', this.checked);
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
    // 道路 //
    updateLayerVisibility('roads', document.getElementById('roadsCheckbox').checked);
    // 自然公園 //
    updateLayerVisibility(['shizenkoen_01', 'shizenkoen_02', 'shizenkoen_03'], document.getElementById('shizen_koenCheckbox').checked);
    // 自然保全地域 //
    updateLayerVisibility(['shizen_hozen_01', 'shizen_hozen_02', 'shizen_hozen_03'], document.getElementById('shizen_hozenCheckbox').checked);
    // 鳥獣保護区 //
    updateLayerVisibility(['chouju_hogo'], document.getElementById('chouju_hogoCheckbox').checked);
    // 農業地域 //
    updateLayerVisibility(['nougyou_chiiki', 'nouyouchi'], document.getElementById('nougyou_chiikiCheckbox').checked);
    // 市街化調整区域 //
    updateLayerVisibility(['47201_那覇市','47205_宜野湾市','47207_石垣市','47208_浦添市','47209_名護市','47210_糸満市','47211_沖縄市','47212_豊見城市','47213_うるま市','47214_宮古島市','47215_南城市','47308_国頭郡本部町','47324_中頭郡読谷村','47325_中頭郡嘉手納町','47326_中頭郡北谷町','47327_中頭郡北中城村','47329_中頭郡西原町','47348_島尻郡与那原町','47350_島尻郡南風原町','47362_島尻郡八重瀬町'], document.getElementById('chousei_kuikiCheckbox').checked);
    // 用途地域 //
    updateLayerVisibility(['A29-19_47205','A29-19_47208','A29-19_47209','A29-19_47210','A29-19_47211','A29-19_47212','A29-19_47213','A29-19_47214','A29-19_47215','A29-19_47324','A29-19_47325','A29-19_47326','A29-19_47327','A29-19_47328','A29-19_47329','A29-19_47348','A29-19_47350','A29-19_47362'], document.getElementById('youto_chiikiCheckbox').checked);
    // 世界文化遺産 //
    updateLayerVisibility(['A34a-230328'], document.getElementById('world_cultural_heritagesCheckbox').checked);
    // 世界自然遺産 //
    updateLayerVisibility(['world_natural_heritages'], document.getElementById('world_natural_heritagesCheckbox').checked);
    // 砂浜 //
    updateLayerVisibility(['beaches'], document.getElementById('beachesCheckbox').checked);
    // ハイクラスホテル //
    updateLayerVisibility('high_class_hotels', document.getElementById('high_class_hotelsCheckbox').checked);
    // ラグジュアリー・ホテル（世界） //
    updateLayerVisibility('luxury_hotels', document.getElementById('luxury_hotelsCheckbox').checked);
    // エリア方針 //
    updateLayerVisibility(['north','middle','south','miyako','yaeyama'], document.getElementById('area_policiesCheckbox').checked);
    // 映像 //
    updateLayerVisibility(['videos'], document.getElementById('videosCheckbox').checked);


    // 初期設定
    //document.getElementById('boundariesCheckbox').checked = true;


    //##### ローディング・スピナー #####//
    stopSpinner = (e) => {
        document.getElementById("loading").style.visibility = "hidden";
        map.off('idle', stopSpinner);
    }

    map.on('sourcedataloading', (e) => {
        if (!e.isSourceLoaded) {
            document.getElementById("loading").style.visibility = "visible";
            map.on('idle', stopSpinner);
        }
    })


});


map.addControl(new mapboxgl.NavigationControl());
        
