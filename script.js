var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close-button")[0];
var infoCard = document.getElementById("infoCard"); // Get the information card

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showModal() {
    modal.style.display = "block";
}

// Function to show the information card
function showCard() {
    infoCard.style.display = "block";
}

// Function to hide the information card
function hideCard() {
    infoCard.style.display = "none";
}

// Add event listener to hide the card when clicking outside of it
window.addEventListener('click', function(e) {
    if (!document.getElementById('infoCard').contains(e.target)) {
        hideCard();
    }
});
