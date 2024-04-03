// Initialize the map and set its view
var map = L.map('map').setView([43.4929, -112.0401], 5);

// Add an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add an overlay div to the HTML, set its style to be hidden initially
var overlay = L.DomUtil.create('div', 'overlay', document.body);
overlay.style.display = 'none';

// Function to load and display GeoJSON data
function loadProjectLocations() {
    fetch('projects.geojson') // Adjust the file path if necessary
        .then(response => response.json())
        .then(data => {
            L.geoJson(data, {
                onEachFeature: function(feature, layer) {
                    var popupContent = `
                        <div>
                            <h3>${feature.properties['Project Name']}</h3>
                            <p>${feature.properties.City}, ${feature.properties.State}</p>
                            <p>Funding Amount: $${feature.properties['Funding Amount'].toLocaleString()}</p>
                            <button onclick="showInfoCard(event, '${feature.properties['Project Name']}', '${feature.properties.City}', '${feature.properties.State}', '${feature.properties['Funding Amount']}')">Learn More</button>
                        </div>
                    `;
                    layer.bindPopup(popupContent);
                }
            }).addTo(map);
        });
}

// Function to show the information card and overlay
function showInfoCard(e, projectName, city, state, fundingAmount) {
    e.stopPropagation(); // Prevent the map's click event
    map.closePopup(); // Close the Leaflet pop-up

    // Update the content of the information card
    document.getElementById('projectTitle').innerText = projectName;
    document.getElementById('projectDetails').innerHTML = `Location: ${city}, ${state}<br>Funding Amount: $${Number(fundingAmount).toLocaleString()}`;

    // Display the information card and overlay
    document.getElementById('infoCard').style.display = 'block';
    overlay.style.display = 'block';
}

// Function to hide the information card and overlay
function hideCard() {
    document.getElementById('infoCard').style.display = 'none';
    overlay.style.display = 'none';
}

// Enhance the window.onclick to hide the info card and overlay when clicking outside
window.onclick = function(event) {
    if (event.target === overlay) {
        hideCard();
    }
}

// Call the function to load and display the project locations
loadProjectLocations();
