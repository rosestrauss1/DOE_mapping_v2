// Initialize the map and set its view
var map = L.map('map').setView([43.4929, -112.0401], 5); // Adjust the center and zoom level to your preference

// Add an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to load and display GeoJSON data
function loadProjectLocations() {
    fetch('projects.geojson') // Adjust the file path if your GeoJSON file is located elsewhere
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Add GeoJSON layer to the map with custom pop-ups
            L.geoJson(data, {
                onEachFeature: function(feature, layer) {
                    // Customize this part based on your GeoJSON properties
                    var popupContent = `
                        <div>
                            <h3>${feature.properties['Project Name']}</h3>
                            <p>${feature.properties.City}, ${feature.properties.State}</p>
                            <p>Funding Amount: $${feature.properties['Funding Amount'].toLocaleString()}</p>
                            <button onclick="showInfoCard('${feature.properties['Project Name']}', '${feature.properties.City}', '${feature.properties.State}', '${feature.properties['Funding Amount']}')">Learn More</button>
                        </div>
                    `;
                    layer.bindPopup(popupContent);
                }
            }).addTo(map);
        });
}

// Function to show the information card
function showInfoCard(projectName, city, state, fundingAmount) {
    // Update the content of the information card
    document.getElementById('projectTitle').innerText = projectName;
    document.getElementById('projectDetails').innerHTML = `Location: ${city}, ${state}<br>Funding Amount: $${Number(fundingAmount).toLocaleString()}`;
    
    // Display the information card
    document.getElementById('infoCard').style.display = 'block';
}

// Function to hide the information card
function hideCard() {
    document.getElementById('infoCard').style.display = 'none';
}

// Close the card when clicking outside
window.onclick = function(event) {
    var modal = document.getElementById('infoCard');
    if (event.target === modal) {
        hideCard();
    }
}

// Call the function to load and display the project locations
loadProjectLocations();
