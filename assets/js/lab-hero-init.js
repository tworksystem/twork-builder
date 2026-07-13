(function () {
    'use strict';

    /**
     * Lab Hero Section – Front-end reveal animation
     * When data-animation="true", applies fade-up reveal to .fade-up elements
     * using IntersectionObserver (no GSAP dependency).
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initLabHero = () => {
        const sections = document.querySelectorAll('.twork-lab-hero-section[data-animation="true"]');
        if (!sections.length) return;

        sections.forEach((section) => {
            const fadeEls = section.querySelectorAll('.fade-up');
            if (!fadeEls.length) return;

            const reveal = (el) => {
                el.style.opacity = '1';
                el.style.transform = '';
                el.classList.add('is-visible');
            };

            if (!('IntersectionObserver' in window)) {
                fadeEls.forEach(reveal);
                return;
            }

            fadeEls.forEach((el) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
            );

            fadeEls.forEach((el) => observer.observe(el));
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLabHero);
    } else {
        initLabHero();
    }
    window.addEventListener('load', initLabHero);
})();
