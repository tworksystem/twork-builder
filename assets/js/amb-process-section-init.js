(function () {
    'use strict';

    /**
     * Initialize Ambulance Process Section (Emergency Protocol) scroll animations.
     */
    const initAmbProcessSection = () => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.twork-amb-process-section .amb-step').forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-amb-process-section[data-animation="true"]');
        if (!sections.length) return;

        sections.forEach((section) => {
            const steps = section.querySelectorAll('.amb-step.twork-amb-process-step');
            const delay = parseInt(section.dataset.animationDelay, 10) || 80;

            steps.forEach((step, index) => {
                step.style.transitionDelay = `${index * delay}ms`;
                step.style.transform = 'translateY(20px)';
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

            steps.forEach((step) => observer.observe(step));
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAmbProcessSection);
    } else {
        initAmbProcessSection();
    }

    window.addEventListener('load', initAmbProcessSection);
})();
