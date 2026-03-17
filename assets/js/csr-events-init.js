(function () {
    'use strict';

    /**
     * Initialize CSR Events Section
     * Handles scroll animations for event cards
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initCsrEvents = () => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.twork-csr-events-section .event-card').forEach((card) => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-csr-events-section');
        if (sections.length === 0) return;

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay, 10) || 100;
            const cards = section.querySelectorAll('.event-card.animate-on-scroll');

            if (animationEnabled && cards.length > 0) {
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transitionDelay = `${index * animationDelay}ms`;
                });

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

                cards.forEach((card) => observer.observe(card));
            } else if (!animationEnabled) {
                section.querySelectorAll('.event-card').forEach((card) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCsrEvents);
    } else {
        initCsrEvents();
    }

    window.addEventListener('load', initCsrEvents);

    window.TworkCsrEvents = { init: initCsrEvents };
})();
