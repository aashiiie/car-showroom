/* =========================================
   AUREX MOTORS - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. PAGE LOADING ANIMATION
    ===================================== */

    const body = document.body;
    const loader = document.querySelector(".loader");

    body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("done");
            }

            body.classList.remove("loading");

        }, 450);

    });


    /* =====================================
       2. STICKY HEADER ON SCROLL
    ===================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================
       3. MOBILE NAVIGATION MENU
    ===================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    function closeMenu() {

        if (!nav || !menuButton) return;

        nav.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

    }

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Open navigation" : "Close navigation"
            );

            nav.classList.toggle("open", !isOpen);

        });


        // Close menu after clicking a navigation link

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

    }


    /* =====================================
       4. CLOSE MENU WITH ESCAPE KEY
    ===================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================
       5. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealTargets = document.querySelectorAll(

        ".section-index, " +
        ".intro-grid, " +
        ".about-image, " +
        ".section-heading, " +
        ".featured-car, " +
        ".car-card, " +
        ".manifesto-image, " +
        ".manifesto-copy, " +
        ".detail-image, " +
        ".detail-quote, " +
        ".gallery-image, " +
        ".contact-grid"

    );


    revealTargets.forEach(element => {

        element.classList.add("scroll-reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealTargets.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealTargets.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================
       6. AUTOMATIC COPYRIGHT YEAR
    ===================================== */

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    /* =====================================
       7. HERO BACKGROUND VIDEO
    ===================================== */

    const heroVideo = document.querySelector(".hero-video");

    if (heroVideo) {

        heroVideo.muted = true;

        heroVideo.playsInline = true;

        const playAttempt = heroVideo.play();

        if (
            playAttempt &&
            typeof playAttempt.catch === "function"
        ) {

            playAttempt.catch(() => {

                // Poster image will remain visible
                // if browser blocks automatic playback.

            });

        }

    }


    /* =====================================
       8. SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });


    /* =====================================
       9. PAGE INITIALIZATION
    ===================================== */

    console.log("AUREX MOTORS website loaded successfully.");

});