


mapboxgl.accessToken = 'pk.eyJ1IjoibnlhbWF0byIsImEiOiJja2Y4dzNkOW8wY3MwMnFvM29iNnJzNzVzIn0.GHlHwu3r5YjKBU3qAKvccQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/light-v11",
    zoom: 4,
    center: [136.33549197330444, 38.49148243962729],
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


    //##### 市域 #####//
    // Add a source for the city polygons.
    map.addSource('boundaries', {
        'type': 'geojson',
        'data': './geojson/boundaries/boundaries.geojson'
    });

    // Add a layer showing the city polygons.
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

    //##### 市域（都市名のポップアップ） #####//
    // Popup when click
    map.on('click', "boundaries", function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties["N03_004"])
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the cities layer.
    map.on('mouseenter', "boundaries", function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', "boundaries", function () {
        map.getCanvas().style.cursor = '';
    });


    //##### 鉄道 / Railways #####//
    // Add a source for the city polygons.
    map.addSource('railways', {
        'type': 'geojson',
        'data': './geojson/railways/railways.geojson'
    });

    // Add a layer showing the city polygons.
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



    // Function to update layer visibility based on checkbox state
    function updateLayerVisibility(layerId, visibility) {
        if (visibility) {
            map.setLayoutProperty(layerId, 'visibility', 'visible');
        } else {
            map.setLayoutProperty(layerId, 'visibility', 'none');
        }
    }

    // Event listeners for checkbox changes
    document.getElementById('boundariesCheckbox').addEventListener('change', function () {
        updateLayerVisibility('boundaries', this.checked);
    });

    document.getElementById('railwaysCheckbox').addEventListener('change', function () {
        updateLayerVisibility('railways', this.checked);
    });


    // You can also set the initial layer visibility based on the checkbox states
    updateLayerVisibility('boundaries', document.getElementById('boundariesCheckbox').checked);
    updateLayerVisibility('railways', document.getElementById('railwaysCheckbox').checked);
    
    // Set initial visibility for additional layers as needed
    document.getElementById('boundariesCheckbox').checked = true;




});


map.addControl(new mapboxgl.NavigationControl());
        
