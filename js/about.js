"use strict";


/* =========================================================
   KEIZOKU DEVOPS
   About Page Behavior
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PROCESS REVEAL + ACTIVE HIGHLIGHT
       ===================================================== */

    const processSteps =
        Array.from(
            document.querySelectorAll(
                "[data-process-step]"
            )
        );


    if (processSteps.length) {

        const firstStep =
            processSteps[0];


        firstStep.classList.add(
            "is-visible",
            "is-active"
        );


        const setActiveStep = (activeStep) => {

            processSteps.forEach((step) => {

                step.classList.toggle(
                    "is-active",
                    step === activeStep
                );

            });

        };


        const processObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        setActiveStep(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.2,

                    rootMargin:
                        "0px 0px -15% 0px"
                }
            );


        processSteps
            .slice(1)
            .forEach((step) => {

                processObserver.observe(
                    step
                );

            });

    }


    /* =====================================================
       STACK REEL
       ===================================================== */

    const stackReel =
        document.querySelector(
            "[data-stack-reel]"
        );

    const stackTrack =
        document.querySelector(
            "[data-stack-track]"
        );

    const stackPrev =
        document.querySelector(
            ".stack-prev"
        );

    const stackNext =
        document.querySelector(
            ".stack-next"
        );


    if (
        !stackReel ||
        !stackTrack ||
        !stackPrev ||
        !stackNext
    ) {
        return;
    }


    const cards =
        Array.from(
            stackTrack.children
        );


    let currentIndex = 0;


    /* =====================================================
       VISIBLE CARD COUNT
       ===================================================== */

    const getVisibleCount = () => {

        if (window.innerWidth <= 700) {
            return 1;
        }


        if (window.innerWidth <= 1000) {
            return 2;
        }


        return 3;

    };


    /* =====================================================
       SIZE CARDS
       ===================================================== */

    const sizeCards = () => {

        const visible =
            getVisibleCount();


        const gap =
            parseFloat(
                window.getComputedStyle(
                    stackTrack
                ).gap
            ) || 0;


        const reelWidth =
            stackReel.clientWidth;


        const cardWidth =
            (
                reelWidth -
                gap * (visible - 1)
            ) / visible;


        cards.forEach((card) => {

            card.style.flexBasis =
                `${cardWidth}px`;

        });

    };


    /* =====================================================
       REEL STEP
       ===================================================== */

    const getStep = () => {

        const firstCard =
            cards[0];


        if (!firstCard) {
            return 0;
        }


        const gap =
            parseFloat(
                window.getComputedStyle(
                    stackTrack
                ).gap
            ) || 0;


        return (
            firstCard
                .getBoundingClientRect()
                .width +
            gap
        );

    };


    /* =====================================================
       UPDATE REEL
       ===================================================== */

    const updateStack = () => {

        const visible =
            getVisibleCount();


        const maxIndex =
            Math.max(
                0,
                cards.length - visible
            );


        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }


        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }


        stackTrack.style.transform =
            `translate3d(-${currentIndex * getStep()}px, 0, 0)`;

    };


    /* =====================================================
       REFRESH REEL
       ===================================================== */

    const refreshStack = () => {

        sizeCards();

        updateStack();

    };


    /* =====================================================
       REEL CONTROLS
       ===================================================== */

    stackNext.addEventListener(
        "click",
        () => {

            currentIndex += 1;

            updateStack();

        }
    );


    stackPrev.addEventListener(
        "click",
        () => {

            currentIndex -= 1;

            updateStack();

        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        refreshStack
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    refreshStack();

});