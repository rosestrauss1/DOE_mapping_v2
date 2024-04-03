document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([43.4929, -112.0401], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var projectMarkers = [];

    function loadProjectLocations() {
        fetch('projects.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJson(data, {
                    onEachFeature: function(feature, layer) {
                        var projectName = feature.properties['Project Name'];
                        var city = feature.properties['City'];
                        var state = feature.properties['State'];
                        var fundingAmount = feature.properties['Funding Amount'];

                        var popupContent = `
                            <div>
                                <h3>${projectName}</h3>
                                <p>${city}, ${state}</p>
                                <p>Funding Amount: $${fundingAmount.toLocaleString()}</p>
                                <button onclick="showInfoCard('${projectName}', '${city}', '${state}', '${fundingAmount}')">Learn More</button>
                            </div>
                        `;
                        layer.bindPopup(popupContent);

                        projectMarkers.push({ projectName, city, state, fundingAmount, layer });
                    }
                }).addTo(map);
            });
    }

    function showInfoCard(projectName, city, state, fundingAmount) {
        var modal = document.getElementById('infoCard');
        document.getElementById('projectTitle').innerText = projectName;
        document.getElementById('projectDetails').innerHTML = `City: ${city}<br>State: ${state}<br>Funding Amount: $${fundingAmount.toLocaleString()}`;
        
        modal.style.display = "block";
        document.getElementById('overlay').style.display = "block";
    }

    window.hideCard = function() {
        document.getElementById('infoCard').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    };

    document.getElementById('overlay').addEventListener('click', function() {
        hideCard();
    });

    loadProjectLocations();
});
