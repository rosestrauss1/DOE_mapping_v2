var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close-button")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Placeholder function to show the modal - update as needed
// This function should be called based on specific interactions you define
function showModal() {
    modal.style.display = "block";
}
