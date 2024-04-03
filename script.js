document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([43.4929, -112.0401], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var projectMarkers = {}; // Store markers for searching

    function loadProjectLocations() {
        fetch('projects.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJson(data, {
                    onEachFeature: function(feature, layer) {
                        var projectName = feature.properties['Project Name'];
                        projectMarkers[projectName] = layer; // Store marker for search
                        
                        var popupContent = `
                            <div>
                                <h3>${projectName}</h3>
                                <p>${feature.properties.City}, ${feature.properties.State}</p>
                                <p>Funding Amount: $${feature.properties['Funding Amount'].toLocaleString()}</p>
                                <button onclick="showInfoCard(event, '${projectName}', '${feature.properties.City}', '${feature.properties.State}', '${feature.properties['Funding Amount']}')">Learn More</button>
                            </div>
                        `;
                        layer.bindPopup(popupContent);
                    }
                }).addTo(map);
            });
    }

    window.showInfoCard = function(e, projectName, city, state, fundingAmount) {
        e.preventDefault();
        map.closePopup();

        document.getElementById('projectTitle').innerText = projectName;
        document.getElementById('projectDetails').innerHTML = `Location: ${city}, ${state}<br>Funding Amount: $${Number(fundingAmount).toLocaleString()}`;
        document.getElementById('infoCard').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    };

    window.hideCard = function() {
        document.getElementById('infoCard').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    };

    function searchProject() {
        const searchValue = document.getElementById('search-input').value.trim();
        const marker = projectMarkers[searchValue];

        if (marker) {
            map.setView(marker.getLatLng(), 14);
            marker.openPopup();
        } else {
            alert('Project not found');
        }
    }

    window.searchProject = searchProject; // Make searchProject function globally accessible for the HTML button click

    loadProjectLocations();
});

