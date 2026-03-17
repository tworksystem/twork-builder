/**
 * Pure JavaScript for Accreditation Section Scroll Animations
 * Uses Intersection Observer API - no GSAP dependency.
 * Follows services-grid-init.js and good-news-section patterns.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

(function () {
    'use strict';

    function initAccreditationSection() {
        if (!('IntersectionObserver' in window)) {
            const sections = document.querySelectorAll('.twork-accreditation-section');
            sections.forEach((section) => {
                section.classList.add('is-visible');
                const introText = section.querySelector('.intro-text.fade-up');
                if (introText) introText.classList.add('is-visible');
                const cards = section.querySelectorAll('.cert-card.stagger-up');
                cards.forEach((c) => c.classList.add('is-visible'));
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-accreditation-section');
        if (!sections.length) return;

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        };

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay, 10) || 150;

            // Intro text fade-up
            const introText = section.querySelector('.intro-text.fade-up');
            if (introText) {
                const introObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            introObserver.unobserve(entry.target);
                        }
                    });
                }, observerOptions);
                introObserver.observe(introText);
            }

            // Staggered cert cards
            const cards = section.querySelectorAll('.cert-card.stagger-up');
            if (!animationEnabled || !cards.length) {
                cards.forEach((c) => c.classList.add('is-visible'));
                return;
            }

            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * animationDelay}ms`;
            });

            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            cards.forEach((card) => cardObserver.observe(card));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccreditationSection);
    } else {
        initAccreditationSection();
    }

    window.addEventListener('load', initAccreditationSection);

    window.TworkAccreditationSection = { init: initAccreditationSection, version: '1.0.0' };
})();
