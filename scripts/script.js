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
        includeHTML("publications-placeholder", "html-elements/publications.html"),
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

// Ensure that project button links open in a new tab to override swiper.js default behavior
document.querySelectorAll('.link-box a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// For animating the element of the nav-bar corresponding to the current section
function setActive() {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => console.log(link.getAttribute('href')));

    const observer = new IntersectionObserver(navCheck, { threshold: 0.2});

    function navCheck(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }

    sections.forEach(section => observer.observe(section));
}

function copyEmail(event) {
    event.preventDefault();
    const email = "chartier.trevor@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email address copied to clipboard: " + email);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

function addDots() {
    const dotContainer = document.querySelector('.dot-container');
    const numDots = 35; 

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${Math.random() * 100}vw`; 
        dot.style.top = `${Math.random() * 100}vh`; 

        const random = Math.random(); 
        if (random < 0.3) {
            dot.style.backgroundColor = 'rgba(156, 188, 177, 0.6)'; 
        } else if (random < 0.6) {
            dot.style.backgroundColor = 'rgba(176, 185, 192, 0.6)'; 
        } else if(random <0.85) {
            dot.style.backgroundColor = 'rgba(233, 230, 178, 0.4)'; 
        }
        else {
            dot.style.backgroundColor = 'rgba(45, 112, 85, 0.4)';
        }


        const animationName = `drift${i}`;
        const randomDuration = Math.random() * 200 + 50;
        const randomDirection = Math.random() > 0.5 ? '90vw' : '-90vw';
        const randomTranslateY = Math.random() * 95 + 'vh';

        // Create the keyframes for the animation
        const keyframes = `
            @keyframes ${animationName} {
                0% { transform: translate(0, 0); }
                50% { transform: translate(${randomDirection}, ${randomTranslateY}); }
                100% { transform: translate(0, 0); }
            }
        `;
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        dot.style.animation = `${animationName} ${randomDuration}s infinite linear`;
        dot.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';

        dotContainer.appendChild(dot);
    }
}
