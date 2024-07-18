document.addEventListener("DOMContentLoaded", function() {
    includeAllHTML().then(setActive);
    addDots();
});

function includeAllHTML(){
    const includes = [
        includeHTML("left-nav-desktop-placeholder", "html-elements/left-nav-desktop.html"),
        includeHTML("right-nav-desktop-placeholder", "html-elements/right-nav-desktop.html"),
        includeHTML("home-placeholder", "html-elements/home.html"),
        includeHTML("intro-placeholder", "html-elements/intro.html"),
        includeHTML("skills-placeholder", "html-elements/skills.html"),
        includeHTML("experience-placeholder", "html-elements/experience.html"),
        includeHTML("projects-placeholder", "html-elements/projects.html"),
        includeHTML("footer-placeholder", "html-elements/footer.html")
    ];

    return Promise.all(includes);
}

function includeHTML(placeholderId, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
            if(placeholderId === "projects-placeholder"){
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

// For animating the element of the nav-bar corresponding to the current section
function setActive() {
    const sections = document.querySelectorAll('main > section, .placeholder-section > section');
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => console.log(link.getAttribute('href')));


    const observer = new IntersectionObserver(navCheck, { threshold: 0.3});

    function navCheck(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry);
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }

    sections.forEach(section => observer.observe(section));
}


function addDots(){
    const dotContainer = document.querySelector('.dot-container');

    // Create dots
    const numDots = 50; // Adjust the number of dots as needed
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${Math.random() * 100}vw`; // Randomize initial horizontal position
        dot.style.top = `${Math.random() * 100}vh`; // Randomize initial vertical position
        dot.style.animation = `drift ${Math.random() * 10 + 300}s infinite linear`; // Randomize animation duration

        // Randomize animation direction
        const direction = Math.random() > 0.5 ? '100vw' : '-100vw'; // Randomly choose left or right direction
        const translateY = Math.random() * 100 + 'vh'; // Randomize vertical distance

        dot.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse'; 
        dotContainer.appendChild(dot);
    }
};

