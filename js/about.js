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
       VIEWPORT MODE
       ===================================================== */

    const isMobile = () =>
        window.innerWidth <= 700;


    const getVisibleCount = () => {

        if (isMobile()) {
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

        /*
            Mobile card sizing is handled by CSS so the
            reel can use native horizontal scrolling.
        */

        if (isMobile()) {

            cards.forEach((card) => {

                card.style.flexBasis = "";

            });


            return;
        }


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
       CARD STEP
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
       CURRENT MOBILE CARD
       ===================================================== */

    const getMobileIndex = () => {

        const step =
            getStep();


        if (!step) {
            return 0;
        }


        return Math.round(
            stackReel.scrollLeft /
            step
        );

    };


    /* =====================================================
       UPDATE STACK
       ===================================================== */

    const updateStack = () => {

        if (!cards.length) {
            return;
        }


        if (isMobile()) {

            const maxIndex =
                cards.length - 1;


            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }


            if (currentIndex < 0) {
                currentIndex = maxIndex;
            }


            stackReel.scrollTo({
                left:
                    currentIndex *
                    getStep(),

                behavior: "smooth"
            });


            return;
        }


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
       REFRESH STACK
       ===================================================== */

    const refreshStack = () => {

        currentIndex = 0;


        sizeCards();


        if (isMobile()) {

            stackTrack.style.transform = "";

            stackReel.scrollLeft = 0;

        } else {

            stackReel.scrollLeft = 0;

            updateStack();

        }

    };


    /* =====================================================
       REEL CONTROLS
       ===================================================== */

    stackNext.addEventListener(
        "click",
        () => {

            if (isMobile()) {

                currentIndex =
                    getMobileIndex();

            }


            currentIndex += 1;

            updateStack();

        }
    );


    stackPrev.addEventListener(
        "click",
        () => {

            if (isMobile()) {

                currentIndex =
                    getMobileIndex();

            }


            currentIndex -= 1;

            updateStack();

        }
    );


    /* =====================================================
       MOBILE SWIPE POSITION
       ===================================================== */

    stackReel.addEventListener(
        "scroll",
        () => {

            if (!isMobile()) {
                return;
            }


            currentIndex =
                getMobileIndex();

        },
        {
            passive: true
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