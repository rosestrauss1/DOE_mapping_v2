var map = L.map('map').setView([43.4929, -112.0401], 13);

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

// Function to show the information card
function showInfoCard(title, details) {
    document.getElementById('projectTitle').innerText = title;
    document.getElementById('projectDetails').innerText = details;
    document.getElementById('infoCard').style.display = 'block';
}

// Function to hide the information card
function hideCard() {
    document.getElementById('infoCard').style.display = 'none';
}
