/**
 * Twork Updates Section – Scroll Animation
 * Pure JavaScript – no GSAP. Follows awards-section pattern.
 */
(function () {
    'use strict';

    function initUpdatesSection() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.twork-updates-section .update-post.stagger-up').forEach((el) => {
                el.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-updates-section');
        if (!sections.length) return;

        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -10% 0px' };

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const items = section.querySelectorAll('.update-post.stagger-up');

            if (!animationEnabled || !items.length) {
                items.forEach((el) => el.classList.add('is-visible'));
                return;
            }

            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        itemObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            items.forEach((item) => itemObserver.observe(item));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUpdatesSection);
    } else {
        initUpdatesSection();
    }

    window.addEventListener('load', initUpdatesSection);
})();
