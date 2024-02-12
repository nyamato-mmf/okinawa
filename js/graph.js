
/* ----------------------------------------------------------------------------
　Chart.js グラフ描画機能
---------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the tab links
    document.querySelectorAll('.nav-link').forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            // Hide the map and show the chart when the "Graph" tab is clicked
            if (event.target.getAttribute('href') === '#mygraph') {
                document.getElementById('map').style.display = 'none';
                document.getElementById('canvas-container').style.display = 'block';
            } else {
                // Show the map and hide the chart for other tabs
                document.getElementById('map').style.display = 'block';
                document.getElementById('canvas-container').style.display = 'none';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Sample data for different graph types
    const data = {
        airport_passengers_domestic: {
            type: 'bar', // Specify 'bar' as string
            labels: ['那覇','粟国','慶良間','久米島','南大東','北大東','伊江島','宮古','下地島','多良間','石垣','波照間','与那国',],
            datasets: [{
                label: '国内線旅客者数',
                data: [11777046,646,67,151543,32011,17808,300,1233507,319228,29593,1808473,41,73614,],
                backgroundColor: 'rgba(192, 75, 192, 0.8)',
                borderColor: 'rgba(192, 75, 192, 1)',
                borderWidth: 1
            }]
        },
        airport_passengers_international: {
            type: 'bar', // Specify 'bar' as string
            labels: ['那覇','粟国','慶良間','久米島','南大東','北大東','伊江島','宮古','下地島','多良間','石垣','波照間','与那国',],
            datasets: [{
                label: '国際線旅客者数',
                data: [1236470,0,0,0,0,0,0,0,0,0,502,0,0,],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        visitors: {
            type: 'line', // Specify 'line' as string
            labels: ['Label 1', 'Label 2', 'Label 3'],
            datasets: [{
                label: '人口推移（ダミー）',
                data: [5, 10, 15],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        }
    };

    // Get the radio buttons and canvas
    const radioButtons = document.querySelectorAll('input[name="graphType"]');
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // Add event listener to radio buttons
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            const selectedGraphType = event.target.value;
            // Destroy the previous chart
            if (window.myChart) {
                window.myChart.destroy();
            }
            renderChart(selectedGraphType);
        });
    });

    // Function to render the chart based on the selected graph type
    function renderChart(graphType) {
        window.myChart = new Chart(ctx, {
            type: data[graphType].type, // Use the specified chart type
            data: data[graphType],
        });
    }

    // Initial chart render
    const initialGraphType = document.querySelector('input[name="graphType"]:checked').value;
    renderChart(initialGraphType);
});