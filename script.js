document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([43.4929, -112.0401], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var projectMarkers = []; // This will hold marker objects for searching

    // Function to load and display GeoJSON data on the map
    function loadProjectLocations() {
        // Example fetch, replace 'projects.geojson' with your GeoJSON path
        fetch('projects.geojson').then(response => response.json()).then(data => {
            L.geoJson(data, {
                onEachFeature: function(feature, layer) {
                    // Construct and assign a popup to each feature
                    const { 'Project Name': projectName, 'City': city, 'State': state, 'Funding Amount': fundingAmount } = feature.properties;
                    var popupContent = `<h3>${projectName}</h3><p>${city}, ${state}</p><p>Funding Amount: $${fundingAmount.toLocaleString()}</p>`;
                    layer.bindPopup(popupContent);

                    // Add to projectMarkers array for search functionality
                    projectMarkers.push({ projectName, city, state, layer });
                }
            }).addTo(map);
        });
    }

    // Implement searchProjects to filter projectMarkers and show results
    function searchProjects() {
        // Get search input values
        const nameVal = document.getElementById('search-name').value.toLowerCase();
        const cityVal = document.getElementById('search-city').value.toLowerCase();
        const stateVal = document.getElementById('search-state').value.toLowerCase();
        const resultsContainer = document.getElementById('search-results');

        // Clear previous results
        resultsContainer.innerHTML = '';
        let resultsFound = false;

        projectMarkers.forEach(({ projectName, city, state, layer }) => {
            // Check if the project matches the search criteria
            if (projectName.toLowerCase().includes(nameVal) &&
                city.toLowerCase().includes(cityVal) &&
                state.toLowerCase().includes(stateVal)) {
                // Display matching projects as clickable items in search-results div
                const resultItem = document.createElement('div');
                resultItem.textContent = `${projectName} - ${city}, ${state}`;
                resultItem.onclick = () => { // Clicking a result focuses the map on the project and opens its popup
                    map.setView(layer.getLatLng(), 14);
                    layer.openPopup();
                };
                resultsContainer.appendChild(resultItem);
                resultsFound = true;
            }
        });

        // Show or hide the results container
        resultsContainer.style.display = resultsFound ? '' : 'none';
    }

    // Show or hide the information card (modal)
    window.hideCard = function() {
        document.getElementById('infoCard').style.display = 'none';
    };

    loadProjectLocations();
});
