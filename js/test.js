
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
    　映像
    -------------------------------------------------------- */
    map.loadImage(
        '././img/marker-blue.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('myicon', image);

            // Add a data source containing several points' features.
            map.addSource('mypoints', {
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
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'myvideos',
                'type': 'symbol',
                'source': 'mypoints', // reference the data source
                'layout': {
                    'icon-image': 'myicon', // reference the image
                    'icon-size': 1.5
                }
            });
            // On click, get coordinates and a description.
            map.on('click', 'myvideos', (e) => {
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
            map.on('mouseenter', 'myvideos', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'myvideos', () => {
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
    // 映像 //
    document.getElementById('videosCheckbox').addEventListener('change', function () {
        updateLayerVisibility(['myvideos'], this.checked);
    });
    
    
    // チェックボックスの状態に応じて表示/非表示
    // 行政区域 //
    updateLayerVisibility('boundaries', document.getElementById('boundariesCheckbox').checked);













    // 初期設定
    document.getElementById('boundariesCheckbox').checked = true;

});


map.addControl(new mapboxgl.NavigationControl());
        

