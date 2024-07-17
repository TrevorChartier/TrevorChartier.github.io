document.addEventListener("DOMContentLoaded", function() {
    includeHTML("left-nav-desktop-placeholder", "html-elements/left-nav-desktop.html");
    includeHTML("right-nav-desktop-placeholder", "html-elements/right-nav-desktop.html");
    includeHTML("home-placeholder", "html-elements/home.html");
    includeHTML("intro-placeholder", "html-elements/intro.html");
    includeHTML("skills-placeholder", "html-elements/skills.html");
    includeHTML("experience-placeholder", "html-elements/experience.html");
    includeHTML("projects-placeholder", "html-elements/projects.html");
    includeHTML("footer-placeholder", "html-elements/footer.html");

});

function includeHTML(placeholderId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
            if(placeholderId == "projects-placeholder"){
                initializeSwiper();
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

function initializeSwiper() {
    new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}

// Ensure that project button links open in a new tab
document.querySelectorAll('.link-box a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});