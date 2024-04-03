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

                    // Constructing popup content dynamically
                    var popupContent = `
                        <div>
                            <h3>${projectName}</h3>
                            <p>${city}, ${state}</p>
                            <p>Funding Amount: $${fundingAmount.toLocaleString()}</p>
                            <button onclick="showInfoCard(event, '${projectName.replace(/'/g, "\\'")}', '${city.replace(/'/g, "\\'")}', '${state.replace(/'/g, "\\'")}', '${fundingAmount}')">Learn More</button>
                        </div>
                    `;
                    layer.bindPopup(popupContent);

                    // Adding the feature and layer to projectMarkers for search functionality
                    projectMarkers.push({
                        projectName,
                        city,
                        state,
                        fundingAmount, // Assuming you want to search by funding amount as well
                        layer
                    });
                }
            }).addTo(map);
        });
}

    function searchProject() {
        const nameInput = document.getElementById('search-name').value.trim().toLowerCase();
        const cityInput = document.getElementById('search-city').value.trim().toLowerCase();
        const stateInput = document.getElementById('search-state').value.trim().toLowerCase();

        let found = false;

        projectMarkers.forEach(({ projectName, city, state, layer }) => {
            if ((nameInput === "" || projectName.toLowerCase().includes(nameInput)) &&
                (cityInput === "" || city.toLowerCase().includes(cityInput)) &&
                (stateInput === "" || state.toLowerCase().includes(stateInput))) {
                map.setView(layer.getLatLng(), 14); // Adjust zoom level as needed
                layer.openPopup();
                found = true;
            }
        });

        if (!found) {
            alert('No matching projects found.');
        }
    }

    loadProjectLocations();
});
