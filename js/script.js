
/* ----------------------------------------------------------------------------
　List of years
---------------------------------------------------------------------------- */
let years = [
    "2022",
    "2021",
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
    /* 2021 */
    ['forbesglobal2021', './geojson/2021/forbesglobal2021.geojson'],
    ['fortuneglobal2021', './geojson/2021/fortuneglobal2021.geojson'],
    ['startups2021', './geojson/2021/startups2021.geojson'],
    ['coworking2021', './geojson/2021/coworking2021.geojson'],
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
    /* 2021 */
    "forbesglobal2021",
    "fortuneglobal2021",
    "startups2021",
    "coworking2021",
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


    // After the last frame rendered before the map enters an "idle" state.
    map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('千代田区') || !map.getLayer('中央区') || !map.getLayer('港区') || !map.getLayer('渋谷区') || !map.getLayer('新宿区') || !map.getLayer('品川区') || !map.getLayer('江東区')) {
            return;
        }

        // Enumerate ids of the layers.
        const toggleLayer_01 = ['千代田区', '中央区', '港区', '渋谷区', '新宿区', '品川区', '江東区'];

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

