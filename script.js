// Initialize the map and set its view to a specific location
var map = L.map('map').setView([43.4929, -112.0401], 13);

// Add an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define a marker and attach a pop-up with a "Learn More" button
var marker = L.marker([43.4929, -112.0401]).addTo(map);
var popupContent = `
    <div>
        <h3>Idaho National Laboratory</h3>
        <p>Idaho Falls</p>
        <button onclick="showInfoCard('Idaho National Laboratory', 'A detailed paragraph about the Idaho National Laboratory...')">Learn More</button>
    </div>
`;

marker.bindPopup(popupContent);

// Function to show the information card with project details
function showInfoCard(title, details) {
    // Close any open Leaflet pop-up
    map.closePopup();
    
    // Set the title and details of the project in the information card
    document.getElementById('projectTitle').innerText = title;
    document.getElementById('projectDetails').innerText = details;
    
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
    if (event.target == modal) {
        hideCard();
    }
}

// Optional: Adjust the window.onclick function to check for clicks not just on the modal but also the close button
window.addEventListener('click', function(e) {
    if (e.target.className === "close-button") {
        hideCard();
    }
});
