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
                                <button onclick="showInfoCard(event, '${projectName.replace(/'/g, "\\'")}', '${city.replace(/'/g, "\\'")}', '${state.replace(/'/g, "\\'")}', '${fundingAmount}')">Learn More</button>
                            </div>
                        `;
                        layer.bindPopup(popupContent);

                        projectMarkers.push({ projectName, city, state, layer });
                    }
                }).addTo(map);
            });
    }

    function suggestProjects() {
        const nameInput = document.getElementById('search-name').value.trim().toLowerCase();
        const cityInput = document.getElementById('search-city').value.trim().toLowerCase();
        const stateInput = document.getElementById('search-state').value.trim().toLowerCase();
        const resultsContainer = document.getElementById('search-results');

        let suggestions = '';

        projectMarkers.forEach(({ projectName, city, state }) => {
            if ((nameInput === "" || projectName.toLowerCase().includes(nameInput)) &&
                (cityInput === "" || city.toLowerCase().includes(cityInput)) &&
                (stateInput === "" || state.toLowerCase().includes(stateInput))) {
                suggestions += `<div onclick="focusOnProject('${projectName}')">${projectName} - ${city}, ${state}</div>`;
            }
        });

        resultsContainer.innerHTML = suggestions;
        if (nameInput === "" && cityInput === "" && stateInput === "") {
            resultsContainer.innerHTML = ''; // Clear suggestions if all inputs are empty
        }
    }

    function focusOnProject(projectName) {
        const project = projectMarkers.find(p => p.projectName === projectName);
        if (project) {
            map.setView(project.layer.getLatLng(), 14);
            project.layer.openPopup();
        }
    }

    function searchProject() {
        // Perform the search and then clear the input fields and suggestions
        suggestProjects();
        document.getElementById('search-name').value = '';
        document.getElementById('search-city').value = '';
        document.getElementById('search-state').value = '';
        document.getElementById('search-results').innerHTML = ''; // Clear suggestions
    }

    loadProjectLocations();
});
