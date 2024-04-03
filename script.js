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
                        const projectName = feature.properties['Project Name'];
                        const city = feature.properties['City'];
                        const state = feature.properties['State'];
                        const fundingAmount = feature.properties['Funding Amount'];

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

    window.showInfoCard = function(projectName, city, state, fundingAmount) {
        var infoContent = `
            <div>
                <h3>${projectName}</h3>
                <p>Location: ${city}, ${state}</p>
                <p>Funding Amount: $${fundingAmount.toLocaleString()}</p>
                <p>More details about the project...</p>
            </div>
        `;

        L.popup()
            .setLatLng(map.getCenter())
            .setContent(infoContent)
            .openOn(map);
    };

    function searchProject() {
        var nameInput = document.getElementById('search-name').value.trim().toLowerCase();
        var cityInput = document.getElementById('search-city').value.trim().toLowerCase();
        var stateInput = document.getElementById('search-state').value.trim().toLowerCase();

        projectMarkers.forEach(({ projectName, city, state, fundingAmount, layer }) => {
            var projectNameLower = projectName.toLowerCase();
            var cityLower = city.toLowerCase();
            var stateLower = state.toLowerCase();

            if (projectNameLower.includes(nameInput) && cityLower.includes(cityInput) && stateLower.includes(stateInput)) {
                map.setView(layer.getLatLng(), 14);
                layer.openPopup();
            }
        });
    }

    loadProjectLocations();

    document.getElementById('search-button').addEventListener('click', searchProject);
});
