document.addEventListener("DOMContentLoaded", function() {
    includeHTML("left-nav-desktop-placeholder", "html-elements/left-nav-desktop.html");
    includeHTML("right-nav-desktop-placeholder", "html-elements/right-nav-desktop.html");
    includeHTML("home-placeholder", "html-elements/home.html");
    includeHTML("about-placeholder", "html-elements/about.html");

});

function includeHTML(placeholderId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}