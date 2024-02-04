
/* ----------------------------------------------------------------------------
　List of years
---------------------------------------------------------------------------- */
let years = [
    "2022",
    "2021",
    "2020",
    "2019"
];

let p = 0;
while (p < years.length) {
    var yr = years[p];
    const year = `<option id="${yr}" value="${yr}">${yr}</option>`
    document.getElementById("year").insertAdjacentHTML("beforeend", year);
    document.getElementById("year-sp").insertAdjacentHTML("beforeend", year);
    p += 1;
};

/* ----------------------------------------------------------------------------
　PC & SP modes: List of indicators
---------------------------------------------------------------------------- */
let items = [
    { value: "forbesglobal", text: "フォーブスグローバル" },
    { value: "fortuneglobal", text: "フォーチュングローバル" },
    { value: "startups", text: "スタートアップ企業" },
    { value: "coworking", text: "コワーキング施設" },
    { value: "touristspots", text: "観光地" },
    { value: "culturalassets", text: "文化財" },
    { value: "temples", text: "神社･寺院･教会" },
    { value: "museums", text: "美術館･博物館" },
    { value: "galleries", text: "ギャラリー" },
    { value: "theaters", text: "ホール・劇場" },
    { value: "stadiums", text: "スタジアム" },
    { value: "conventions", text: "コンベンション施設" },
    { value: "intlmeetings", text: "国際会議" },
    { value: "hotels", text: "ホテル" },
    { value: "restaurants", text: "レストラン" },
    { value: "michelin", text: "ミシュラン掲載レストラン" },
    { value: "tabelog", text: "食べログ受賞レストラン" },
    { value: "nightlife", text: "ナイトライフ施設" },
    { value: "universities", text: "大学キャンパス" },
    { value: "schools", text: "幼稚園~高校" },
    { value: "nurseries", text: "保育園" },
    { value: "intlschools", text: "インターナショナルスクール" },
    { value: "sportsvenues", text: "スポーツ施設" },
    { value: "conveniencestores", text: "コンビニ" },
    { value: "supermarkets", text: "スーパー" },
    { value: "drugstores", text: "薬局" },
    { value: "hospitals", text: "病院･診療所･クリニック" },
    { value: "banks", text: "銀行･ATM" },
    { value: "embassies", text: "大使館･領事館" },
    { value: "stations", text: "駅" },
    { value: "busstops", text: "バス停" },
    { value: "sharecycles", text: "シェアサイクルポート" },
];

let i = 0;
while (i < items.length) {
    var elem1 = items[i].value;
    var elem2 = items[i].text;

    const li =
    `<div class="col pb-2">
        <div class="form-check">
            <input class="form-check-input" type="radio" id="${elem1}" name="cat" value="${elem1}">
            <label class="form-check-label fs-6 fw-normal" for="${elem1}">${elem2}</label>
        </div>
    </div>`

    const li_sp = `<option id="${elem1}" value="${elem1}">${elem2}</option>`

    document.getElementById("list").insertAdjacentHTML("beforeend", li);
    document.getElementById("list-sp").insertAdjacentHTML("beforeend", li_sp);

    i += 1;
};

/* ----------------------------------------------------------------------------
　List of data sources
---------------------------------------------------------------------------- */
var sourcelayer = [
    /* 2022 */
    ['forbesglobal2022', './geojson/2022/forbesglobal2022.geojson'],
    ['fortuneglobal2022', './geojson/2022/fortuneglobal2022.geojson'],
    ['startups2022', './geojson/2022/startups2022.geojson'],
    ['coworking2022', './geojson/2022/coworking2022.geojson'],
    ['touristspots2022', './geojson/2022/touristspots2022.geojson'],
    ['culturalassets2022', './geojson/2022/culturalassets2022.geojson'],
    ['temples2022', './geojson/2022/temples2022.geojson'],
    ['museums2022', './geojson/2022/museums2022.geojson'],
    ['galleries2022', './geojson/2022/galleries2022.geojson'],
    ['theaters2022', './geojson/2022/theaters2022.geojson'],
    ['stadiums2022', './geojson/2022/stadiums2022.geojson'],
    ['conventions2022', './geojson/2022/conventions2022.geojson'],
    ['intlmeetings2022', './geojson/2022/intlmeetings2022.geojson'],
    ['hotels2022', './geojson/2022/hotels2022.geojson'],
    ['restaurants2022', './geojson/2022/restaurants2022.geojson'],
    ['michelin2022', './geojson/2022/michelin2022.geojson'],
    ['tabelog2022', './geojson/2022/tabelog2022.geojson'],
    ['nightlife2022', './geojson/2022/nightlife2022.geojson'],
    ['universities2022', './geojson/2022/universities2022.geojson'],
    ['schools2022', './geojson/2022/schools2022.geojson'],
    ['nurseries2022', './geojson/2022/nurseries2022.geojson'],
    ['intlschools2022', './geojson/2022/intlschools2022.geojson'],
    ['sportsvenues2022', './geojson/2022/sportsvenues2022.geojson'],
    ['conveniencestores2022', './geojson/2022/conveniencestores2022.geojson'],
    ['supermarkets2022', './geojson/2022/supermarkets2022.geojson'],
    ['drugstores2022', './geojson/2022/drugstores2022.geojson'],
    ['hospitals2022', './geojson/2022/hospitals2022.geojson'],
    ['banks2022', './geojson/2022/banks2022.geojson'],
    ['embassies2022', './geojson/2022/embassies2022.geojson'],
    ['stations2022', './geojson/2022/stations2022.geojson'],
    ['busstops2022', './geojson/2022/busstops2022.geojson'],
    ['sharecycles2022', './geojson/2022/sharecycles2022.geojson'],
    /* 2021 */
    ['forbesglobal2021', './geojson/2021/forbesglobal2021.geojson'],
    ['fortuneglobal2021', './geojson/2021/fortuneglobal2021.geojson'],
    ['startups2021', './geojson/2021/startups2021.geojson'],
    ['coworking2021', './geojson/2021/coworking2021.geojson'],
    ['touristspots2021', './geojson/2021/touristspots2021.geojson'],
    ['culturalassets2021', './geojson/2021/culturalassets2021.geojson'],
    ['temples2021', './geojson/2021/temples2021.geojson'],
    ['museums2021', './geojson/2021/museums2021.geojson'],
    ['galleries2021', './geojson/2021/galleries2021.geojson'],
    ['theaters2021', './geojson/2021/theaters2021.geojson'],
    ['stadiums2021', './geojson/2021/stadiums2021.geojson'],
    ['conventions2021', './geojson/2021/conventions2021.geojson'],
    ['intlmeetings2021', './geojson/2021/intlmeetings2021.geojson'],
    ['hotels2021', './geojson/2021/hotels2021.geojson'],
    ['restaurants2021', './geojson/2021/restaurants2021.geojson'],
    ['michelin2021', './geojson/2021/michelin2021.geojson'],
    ['tabelog2021', './geojson/2021/tabelog2021.geojson'],
    ['nightlife2021', './geojson/2021/nightlife2021.geojson'],
    ['universities2021', './geojson/2021/universities2021.geojson'],
    ['schools2021', './geojson/2021/schools2021.geojson'],
    ['nurseries2021', './geojson/2021/nurseries2021.geojson'],
    ['intlschools2021', './geojson/2021/intlschools2021.geojson'],
    ['sportsvenues2021', './geojson/2021/sportsvenues2021.geojson'],
    ['conveniencestores2021', './geojson/2021/conveniencestores2021.geojson'],
    ['supermarkets2021', './geojson/2021/supermarkets2021.geojson'],
    ['drugstores2021', './geojson/2021/drugstores2021.geojson'],
    ['hospitals2021', './geojson/2021/hospitals2021.geojson'],
    ['banks2021', './geojson/2021/banks2021.geojson'],
    ['embassies2021', './geojson/2021/embassies2021.geojson'],
    ['stations2021', './geojson/2021/stations2021.geojson'],
    ['busstops2021', './geojson/2021/busstops2021.geojson'],
    ['sharecycles2021', './geojson/2021/sharecycles2021.geojson'],
    /* 2020 */
    ['forbesglobal2020', './geojson/2020/forbesglobal2020.geojson'],
    ['fortuneglobal2020', './geojson/2020/fortuneglobal2020.geojson'],
    ['startups2020', './geojson/2020/startups2020.geojson'],
    ['coworking2020', './geojson/2020/coworking2020.geojson'],
    ['touristspots2020', './geojson/2020/touristspots2020.geojson'],
    ['culturalassets2020', './geojson/2020/culturalassets2020.geojson'],
    ['temples2020', './geojson/2020/temples2020.geojson'],
    ['museums2020', './geojson/2020/museums2020.geojson'],
    ['galleries2020', './geojson/2020/galleries2020.geojson'],
    ['theaters2020', './geojson/2020/theaters2020.geojson'],
    ['stadiums2020', './geojson/2020/stadiums2020.geojson'],
    ['conventions2020', './geojson/2020/conventions2020.geojson'],
    ['intlmeetings2020', './geojson/2020/intlmeetings2020.geojson'],
    ['hotels2020', './geojson/2020/hotels2020.geojson'],
    ['restaurants2020', './geojson/2020/restaurants2020.geojson'],
    ['michelin2020', './geojson/2020/michelin2020.geojson'],
    ['tabelog2020', './geojson/2020/tabelog2020.geojson'],
    ['nightlife2020', './geojson/2020/nightlife2020.geojson'],
    ['universities2020', './geojson/2020/universities2020.geojson'],
    ['schools2020', './geojson/2020/schools2020.geojson'],
    ['nurseries2020', './geojson/2020/nurseries2020.geojson'],
    ['intlschools2020', './geojson/2020/intlschools2020.geojson'],
    ['sportsvenues2020', './geojson/2020/sportsvenues2020.geojson'],
    ['conveniencestores2020', './geojson/2020/conveniencestores2020.geojson'],
    ['supermarkets2020', './geojson/2020/supermarkets2020.geojson'],
    ['drugstores2020', './geojson/2020/drugstores2020.geojson'],
    ['hospitals2020', './geojson/2020/hospitals2020.geojson'],
    ['banks2020', './geojson/2020/banks2020.geojson'],
    ['embassies2020', './geojson/2020/embassies2020.geojson'],
    ['stations2020', './geojson/2020/stations2020.geojson'],
    ['busstops2020', './geojson/2020/busstops2020.geojson'],
    ['sharecycles2020', './geojson/2020/sharecycles2020.geojson'],
    /* 2019 */
    ['forbesglobal2019', './geojson/2019/forbesglobal2019.geojson'],
    ['fortuneglobal2019', './geojson/2019/fortuneglobal2019.geojson'],
    ['startups2019', './geojson/2019/startups2019.geojson'],
    ['coworking2019', './geojson/2019/coworking2019.geojson'],
    ['touristspots2019', './geojson/2019/touristspots2019.geojson'],
    ['culturalassets2019', './geojson/2019/culturalassets2019.geojson'],
    ['temples2019', './geojson/2019/temples2019.geojson'],
    ['museums2019', './geojson/2019/museums2019.geojson'],
    ['galleries2019', './geojson/2019/galleries2019.geojson'],
    ['theaters2019', './geojson/2019/theaters2019.geojson'],
    ['stadiums2019', './geojson/2019/stadiums2019.geojson'],
    ['conventions2019', './geojson/2019/conventions2019.geojson'],
    ['intlmeetings2019', './geojson/2019/intlmeetings2019.geojson'],
    ['hotels2019', './geojson/2019/hotels2019.geojson'],
    ['restaurants2019', './geojson/2019/restaurants2019.geojson'],
    ['michelin2019', './geojson/2019/michelin2019.geojson'],
    ['tabelog2019', './geojson/2019/tabelog2019.geojson'],
    ['nightlife2019', './geojson/2019/nightlife2019.geojson'],
    ['universities2019', './geojson/2019/universities2019.geojson'],
    ['schools2019', './geojson/2019/schools2019.geojson'],
    ['nurseries2019', './geojson/2019/nurseries2019.geojson'],
    ['intlschools2019', './geojson/2019/intlschools2019.geojson'],
    ['sportsvenues2019', './geojson/2019/sportsvenues2019.geojson'],
    ['conveniencestores2019', './geojson/2019/conveniencestores2019.geojson'],
    ['supermarkets2019', './geojson/2019/supermarkets2019.geojson'],
    ['drugstores2019', './geojson/2019/drugstores2019.geojson'],
    ['hospitals2019', './geojson/2019/hospitals2019.geojson'],
    ['banks2019', './geojson/2019/banks2019.geojson'],
    ['embassies2019', './geojson/2019/embassies2019.geojson'],
    ['stations2019', './geojson/2019/stations2019.geojson'],
    ['busstops2019', './geojson/2019/busstops2019.geojson'],
    ['sharecycles2019', './geojson/2019/sharecycles2019.geojson'],
];

/* ----------------------------------------------------------------------------
　List of data layers
---------------------------------------------------------------------------- */
var layers = [
    /* 2022 */
    "forbesglobal2022",
    "fortuneglobal2022",
    "startups2022",
    "coworking2022",
    "touristspots2022",
    "culturalassets2022",
    "temples2022",
    "museums2022",
    "galleries2022",
    "theaters2022",
    "stadiums2022",
    "conventions2022",
    "intlmeetings2022",
    "hotels2022",
    "restaurants2022",
    "michelin2022",
    "tabelog2022",
    "nightlife2022",
    "universities2022",
    "schools2022",
    "nurseries2022",
    "intlschools2022",
    "sportsvenues2022",
    "conveniencestores2022",
    "supermarkets2022",
    "drugstores2022",
    "hospitals2022",
    "banks2022",
    "embassies2022",
    "stations2022",
    "busstops2022",
    "sharecycles2022",    
    /* 2021 */
    "forbesglobal2021",
    "fortuneglobal2021",
    "startups2021",
    "coworking2021",
    "touristspots2021",
    "culturalassets2021",
    "temples2021",
    "museums2021",
    "galleries2021",
    "theaters2021",
    "stadiums2021",
    "conventions2021",
    "intlmeetings2021",
    "hotels2021",
    "restaurants2021",
    "michelin2021",
    "tabelog2021",
    "nightlife2021",
    "universities2021",
    "schools2021",
    "nurseries2021",
    "intlschools2021",
    "sportsvenues2021",
    "conveniencestores2021",
    "supermarkets2021",
    "drugstores2021",
    "hospitals2021",
    "banks2021",
    "embassies2021",
    "stations2021",
    "busstops2021",
    "sharecycles2021",
    /* 2020 */
    "forbesglobal2020",
    "fortuneglobal2020",
    "startups2020",
    "coworking2020",
    "touristspots2020",
    "culturalassets2020",
    "temples2020",
    "museums2020",
    "galleries2020",
    "theaters2020",
    "stadiums2020",
    "conventions2020",
    "intlmeetings2020",
    "hotels2020",
    "restaurants2020",
    "michelin2020",
    "tabelog2020",
    "nightlife2020",
    "universities2020",
    "schools2020",
    "nurseries2020",
    "intlschools2020",
    "sportsvenues2020",
    "conveniencestores2020",
    "supermarkets2020",
    "drugstores2020",
    "hospitals2020",
    "banks2020",
    "embassies2020",
    "stations2020",
    "busstops2020",
    "sharecycles2020",
    /* 2019 */
    "forbesglobal2019",
    "fortuneglobal2019",
    "startups2019",
    "coworking2019",
    "touristspots2019",
    "culturalassets2019",
    "temples2019",
    "museums2019",
    "galleries2019",
    "theaters2019",
    "stadiums2019",
    "conventions2019",
    "intlmeetings2019",
    "hotels2019",
    "restaurants2019",
    "michelin2019",
    "tabelog2019",
    "nightlife2019",
    "universities2019",
    "schools2019",
    "nurseries2019",
    "intlschools2019",
    "sportsvenues2019",
    "conveniencestores2019",
    "supermarkets2019",
    "drugstores2019",
    "hospitals2019",
    "banks2019",
    "embassies2019",
    "stations2019",
    "busstops2019",
    "sharecycles2019",
];


/* ----------------------------------------------------------------------------
　Mapbox
---------------------------------------------------------------------------- */
mapboxgl.accessToken = 'pk.eyJ1IjoibnlhbWF0byIsImEiOiJja2Y4dzNkOW8wY3MwMnFvM29iNnJzNzVzIn0.GHlHwu3r5YjKBU3qAKvccQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/nyamato/ckt5grlhv20td17o5ijrf84wz",
    zoom: 10,
    minZoom: 11,
    center: [139.72942873681262, 35.660181644624785],
});


// Tokyo facilities map
map.on('load', function () {

    // Add a source for the city polygons.
    map.addSource('chiyodaward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/chiyoda.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '千代田区',
        'type': 'fill',
        'source': 'chiyodaward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(255,0,0,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('chuoward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/chuo.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '中央区',
        'type': 'fill',
        'source': 'chuoward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,0,255,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('minatoward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/minato.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '港区',
        'type': 'fill',
        'source': 'minatoward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,128,0,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('shibuyaward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/shibuya.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '渋谷区',
        'type': 'fill',
        'source': 'shibuyaward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(255,255,0,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('shinjukuward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/shinjuku.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '新宿区',
        'type': 'fill',
        'source': 'shinjukuward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(128,0,128,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('shinagawaward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/shinagawa.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '品川区',
        'type': 'fill',
        'source': 'shinagawaward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(255,140,0,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('kotoward', {
        'type': 'geojson',
        'data': './geojson/tokyo7/koto.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '江東区',
        'type': 'fill',
        'source': 'kotoward',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(25,25,112,.3)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('daimaruyu', {
        'type': 'geojson',
        'data': './geojson/areas/daimaruyu.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '大丸有',
        'type': 'fill',
        'source': 'daimaruyu',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(255,0,0,.5)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('nippachikyo', {
        'type': 'geojson',
        'data': './geojson/areas/nippachikyo.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '日八京',
        'type': 'fill',
        'source': 'nippachikyo',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,0,255,.5)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('roppongi', {
        'type': 'geojson',
        'data': './geojson/areas/roppongi.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '六本木',
        'type': 'fill',
        'source': 'roppongi',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,128,0,.5)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('toranomon', {
        'type': 'geojson',
        'data': './geojson/areas/toranomon.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '虎ノ門',
        'type': 'fill',
        'source': 'toranomon',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,128,0,.5)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('akasaka', {
        'type': 'geojson',
        'data': './geojson/areas/akasaka.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '赤坂',
        'type': 'fill',
        'source': 'akasaka',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,128,0,.5)'
        }
    });

    // Add a source for the city polygons.
    map.addSource('wider_toranomon', {
        'type': 'geojson',
        'data': './geojson/areas/wider_toranomon.geojson'
    });

    // Add a layer showing the city polygons.
    map.addLayer({
        'id': '広域虎ノ門',
        'type': 'fill',
        'source': 'wider_toranomon',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': 'rgba(0,128,0,.5)'
        }
    });

    // After the last frame rendered before the map enters an "idle" state.
    map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('千代田区') || !map.getLayer('中央区') || !map.getLayer('港区') || !map.getLayer('渋谷区') || !map.getLayer('新宿区') || !map.getLayer('品川区') || !map.getLayer('江東区') || !map.getLayer('大丸有') || !map.getLayer('日八京') || !map.getLayer('六本木') || !map.getLayer('虎ノ門') || !map.getLayer('赤坂') || !map.getLayer('広域虎ノ門')) {
            return;
        }

        // Enumerate ids of the layers.
        const toggleLayer_01 = ['千代田区', '中央区', '港区', '渋谷区', '新宿区', '品川区', '江東区'];

        // Enumerate ids of the layers.
        const toggleLayer_02 = ['大丸有', '日八京', '六本木', '虎ノ門', '赤坂', '広域虎ノ門'];

        // Set up the corresponding toggle button for each layer.
        for (const id of toggleLayer_01) {

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

            const layers = document.getElementById('hideshow_01');
            layers.appendChild(link);

        };

        // Set up the corresponding toggle button for each layer.
        for (const id of toggleLayer_02) {
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

            const layers = document.getElementById('hideshow_02');
            layers.appendChild(link);
        };
    });

    function addsourcelayer(d) {
        for (var i = 0; i < d.length; i++) {
            map.addSource(d[i][0], {
                type: 'geojson',
                data: d[i][1],
            });

            map.addLayer({
                id: d[i][0],
                type: 'circle',
                source: d[i][0],
                paint: {
                    'circle-radius': 1.5,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'red'
                },
                layout: {
                    visibility: 'none',
                }
            });

            /* -------------------------------------
        　    Popup 
            -------------------------------------- */
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', d[i][0], (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.name;

                // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, 
                // the popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                };

                // Populate the popup and set its coordinates based on the feature found.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            map.on('mouseleave', d[i][0], () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        };
    };

    addsourcelayer(sourcelayer)

   /* -------------------------------------
　    Switch based on a device (PC or SP)
      Loads map based on selected date 
    -------------------------------------- */
    switch (!navigator.userAgent.match(/iPhone|Android.+Mobile/)){
        // PC mode
        case true:
            document.getElementById('target').addEventListener('change', function (e) {

                var cat = document.querySelector('input[name="cat"]:checked').value;
                var year = document.getElementById("year").value;
                var clicked = cat + year
                
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i]
                    if (clicked === layer) {
                        map.setLayoutProperty(layer, 'visibility', 'visible')
                        var inactiveLayers = layers.filter(el => el !== layer)
                        for (var i = 0; i < inactiveLayers.length; i++) {
                            inactiveLayer = inactiveLayers[i]
                            map.setLayoutProperty(inactiveLayer, 'visibility', 'none')
                        }
                    } else {
                        map.setLayoutProperty(layer, 'visibility', 'none')
                    };
                };
        
                /* -------------------------------------
            　    Download button 
                -------------------------------------- */
                function Replace(year) {
                    let link = document.getElementById('csv');
                    let url = './csv/' + year + '/' + cat + year + '.csv';
        
                    // Change the href
                    link.setAttribute('href', url);
                    let excel = document.getElementById("csv")
                    let newexcel = cat + year + ".csv"
                    excel.download = newexcel
                };    
                Replace(year)
            });
        
            // Call the functions with default arguments
            document.getElementById("list").firstChild.querySelector('input[name="cat"]').click();
            break;

        // SP mode
        case false:
            document.getElementById('target-sp').addEventListener('change', function (e) {

                var cat = document.getElementById("list-sp").value;
                var year = document.getElementById("year-sp").value;
                var clicked = cat + year
                
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i]
                    if (clicked === layer) {
                        map.setLayoutProperty(layer, 'visibility', 'visible')
                        var inactiveLayers = layers.filter(el => el !== layer)
                        for (var i = 0; i < inactiveLayers.length; i++) {
                            inactiveLayer = inactiveLayers[i]
                            map.setLayoutProperty(inactiveLayer, 'visibility', 'none')
                        }
                    } else {
                        map.setLayoutProperty(layer, 'visibility', 'none')
                    };
                };
            });
            break;
    }

});

