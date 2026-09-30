"use strict";


/* =========================================================
   KEIZOKU DEV
   Projects Page Behavior
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const projects =
        document.querySelectorAll(
            "[data-project]"
        );


    if (!projects.length) {
        return;
    }


    projects.forEach((project) => {

        const toggle =
            project.querySelector(
                ".project-toggle"
            );

        const details =
            project.querySelector(
                ".project-details"
            );

        const label =
            project.querySelector(
                ".project-toggle-label"
            );


        if (!toggle || !details || !label) {
            return;
        }


        toggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    project.classList.contains(
                        "is-open"
                    );


                project.classList.toggle(
                    "is-open",
                    !isOpen
                );


                toggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                details.setAttribute(
                    "aria-hidden",
                    String(isOpen)
                );


                label.textContent =
                    isOpen
                        ? "View More"
                        : "View Less";

            }
        );

    });

});