document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([43.4929, -112.0401], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markers = L.markerClusterGroup();
    var overlay = document.getElementById('overlay'); // Define overlay here

    // Assuming your GeoJSON-like structure is an array under a specific key, or directly accessible.
    fetch('projects.geojson')
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                var coords = project.centroid.replace('POINT (', '').replace(')', '').split(' ');
                var marker = L.marker([parseFloat(coords[1]), parseFloat(coords[0])]);
                
                var popupContent = `
                    <div>
                        <h3>${project['Project Name']}</h3>
                        <p>${project.City}, ${project.State}</p>
                        <p>Funding Amount: $${parseInt(project['Funding Amount'], 10).toLocaleString()}</p>
                        <button onclick="showInfoCard(event, '${project['Project Name']}', '${project.City}', '${project.State}', '${project['Funding Amount']}')">Learn More</button>
                    </div>
                `;

                marker.bindPopup(popupContent);
                markers.addLayer(marker);
            });

            map.addLayer(markers);
        })
        .catch(error => console.error('Error loading GeoJSON data:', error));

    // Add the previously discussed showInfoCard and hideCard functions here

    // Preventing clicks on the info card from hiding it (stops event propagation)
    document.getElementById('infoCard').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    overlay.addEventListener('click', function() {
        hideCard();
    });

    // Autocomplete and other functions unchanged, just ensure they match your data structure
});

