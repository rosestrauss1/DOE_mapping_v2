var map = L.map('map').setView([43.4929, -112.0401], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example marker
var marker = L.marker([43.4929, -112.0401]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

// Function to show the information card
function showCard(title, details) {
    document.getElementById('infoCard').style.display = 'block';
    document.getElementById('projectTitle').innerText = title;
    document.getElementById('projectDetails').innerText = details;
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

// Example of attaching a click event to a marker
marker.on('click', function() {
    showCard("DOE Project", "This is an example of how details might be shown.");
});
