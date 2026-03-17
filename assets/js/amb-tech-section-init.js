(function () {
    'use strict';

    /**
     * Initialize Ambulance Tech Section (ICU on Wheels) scroll animations.
     */
    const initAmbTechSection = () => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.twork-amb-tech-section .amb-tech-item').forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-amb-tech-section[data-animation="true"]');
        if (!sections.length) return;

        sections.forEach((section) => {
            const items = section.querySelectorAll('.amb-tech-item.twork-amb-tech-item');
            const delay = parseInt(section.dataset.animationDelay, 10) || 80;

            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * delay}ms`;
                item.style.transform = 'translateY(20px)';
            });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            requestAnimationFrame(() => {
                                entry.target.style.transform = 'translateY(0)';
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
            );

            items.forEach((item) => observer.observe(item));
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAmbTechSection);
    } else {
        initAmbTechSection();
    }

    window.addEventListener('load', initAmbTechSection);
})();
