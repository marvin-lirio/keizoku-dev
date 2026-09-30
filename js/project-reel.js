"use strict";


/* =========================================================
   KEIZOKU DEV
   Project Highlight Reel
   ========================================================= */


/* =========================================================
   PROJECT DATA
   ========================================================= */

const projects = [

    {
        name: "Horizonte Website Refresh",
        category: "Web Development",
        status: "In Development",
        url: "projects.html"
    },

    {
        name: "Keizoku Dev Website",
        category: "Web Development",
        status: "Continuous Development",
        url: "projects.html"
    },

    {
        name: "Fukutsu Fitness App",
        category: "Product Concept",
        status: "Pre-Development",
        url: "projects.html"
    }

];


/* =========================================================
   REEL ELEMENTS
   ========================================================= */

const projectReel =
    document.querySelector(
        "#project-reel"
    );

const reelViewport =
    document.querySelector(
        "#project-reel-viewport"
    );


/* =========================================================
   REEL STATE
   ========================================================= */

let reelPosition = 0;

let previousTime = null;

let isPaused = false;

let reelWidth = 0;

const reelSpeed = 22;


/* =========================================================
   CREATE PROJECT CARD
   ========================================================= */

function createProjectCard(project) {

    const card =
        document.createElement("a");


    card.className =
        "project-card";

    card.href =
        project.url;

    card.setAttribute(
        "aria-label",
        `View ${project.name}`
    );


    card.innerHTML = `
        <div class="project-bottom">

            <h2>
                ${project.name}
            </h2>

            <div class="project-meta">

                <span>
                    ${project.category}
                </span>

                <span aria-hidden="true">
                    •
                </span>

                <span>
                    ${project.status}
                </span>

            </div>

        </div>

        <span
            class="project-arrow"
            aria-hidden="true"
        >
            ↗
        </span>
    `;


    return card;
}


/* =========================================================
   RENDER PROJECTS
   ========================================================= */

function renderProjects() {

    if (!projectReel) {
        return;
    }


    projectReel.innerHTML = "";


    /*
        Render the primary project cards.
    */

    projects.forEach((project) => {

        projectReel.appendChild(
            createProjectCard(project)
        );

    });


    /*
        Duplicate the project cards so the
        reel can loop continuously.
    */

    projects.forEach((project) => {

        const duplicate =
            createProjectCard(project);


        duplicate.setAttribute(
            "aria-hidden",
            "true"
        );

        duplicate.tabIndex = -1;


        projectReel.appendChild(
            duplicate
        );

    });


    calculateReelWidth();
}


/* =========================================================
   MEASURE REEL
   ========================================================= */

function calculateReelWidth() {

    if (!projectReel) {
        return;
    }


    const cards =
        projectReel.querySelectorAll(
            ".project-card"
        );


    if (!cards.length) {
        return;
    }


    const styles =
        window.getComputedStyle(
            projectReel
        );


    const gap =
        parseFloat(
            styles.gap
        ) || 0;


    reelWidth = 0;


    for (
        let index = 0;
        index < projects.length;
        index += 1
    ) {

        reelWidth +=
            cards[index].offsetWidth;


        if (
            index <
            projects.length - 1
        ) {

            reelWidth += gap;

        }

    }


    /*
        Include the gap between the final
        primary card and first duplicate.
    */

    reelWidth += gap;
}


/* =========================================================
   ANIMATE REEL
   ========================================================= */

function animateReel(timestamp) {

    if (previousTime === null) {
        previousTime = timestamp;
    }


    const elapsed =
        (timestamp - previousTime) /
        1000;


    previousTime = timestamp;


    if (
        !isPaused &&
        reelWidth > 0 &&
        projectReel
    ) {

        reelPosition +=
            reelSpeed * elapsed;


        if (
            reelPosition >=
            reelWidth
        ) {

            reelPosition -=
                reelWidth;

        }


        projectReel.style.transform =
            `translateX(-${reelPosition}px)`;

    }


    window.requestAnimationFrame(
        animateReel
    );

}


/* =========================================================
   PAUSE / RESUME
   ========================================================= */

function pauseReel() {

    isPaused = true;

}


function resumeReel() {

    isPaused = false;

}


/* =========================================================
   REEL EVENTS
   ========================================================= */

if (
    reelViewport &&
    projectReel
) {

    reelViewport.addEventListener(
        "mouseenter",
        pauseReel
    );


    reelViewport.addEventListener(
        "mouseleave",
        resumeReel
    );


    reelViewport.addEventListener(
        "focusin",
        pauseReel
    );


    reelViewport.addEventListener(
        "focusout",
        resumeReel
    );


    window.addEventListener(
        "resize",
        calculateReelWidth
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                pauseReel();

            } else {

                previousTime = null;

                resumeReel();

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

if (
    projectReel &&
    reelViewport
) {

    renderProjects();


    window.requestAnimationFrame(
        animateReel
    );

}