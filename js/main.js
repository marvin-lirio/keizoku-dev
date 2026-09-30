"use strict";


/* =========================================================
   KEIZOKU DEV
   Shared Site Behavior
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const navMenu =
        document.querySelector(".nav-menu");

    const navToggle =
        document.querySelector(".nav-menu-toggle");

    const navDropdown =
        document.querySelector(".nav-dropdown");


    if (!navMenu || !navToggle || !navDropdown) {
        return;
    }


    /* =====================================================
       NAVIGATION BACKDROP
       ===================================================== */

    const backdrop =
        document.createElement("div");

    backdrop.classList.add("nav-backdrop");

    document.body.appendChild(backdrop);


    /* =====================================================
       OPEN NAVIGATION
       ===================================================== */

    const openMenu = () => {

        navMenu.classList.add("open");

        backdrop.classList.add("visible");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    };


    /* =====================================================
       CLOSE NAVIGATION
       ===================================================== */

    const closeMenu = () => {

        navMenu.classList.remove("open");

        backdrop.classList.remove("visible");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    /* =====================================================
       TOGGLE NAVIGATION
       ===================================================== */

    navToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
       ===================================================== */

    backdrop.addEventListener(
        "click",
        closeMenu
    );


    /* =====================================================
       KEYBOARD
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("open")
            ) {

                closeMenu();

                navToggle.focus();

            }

        }
    );


    /* =====================================================
       CLOSE AFTER NAVIGATION
       ===================================================== */

    navDropdown
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

});