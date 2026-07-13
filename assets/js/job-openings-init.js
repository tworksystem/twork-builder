(function () {
    'use strict';

    /**
     * Initialize Job Openings Section Animations
     * Handles scroll animations for section header, category titles, job cards, and CTA
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initJobOpenings = () => {
        const jobSections = document.querySelectorAll('.twork-job-openings-section');
        const ctaSections = document.querySelectorAll('.twork-career-cta-section');
        const sections = Array.from(jobSections).concat(Array.from(ctaSections));

        if (!('IntersectionObserver' in window)) {
            sections.forEach((section) => {
                const animatables = section.querySelectorAll('.fade-up, .stagger-job');
                animatables.forEach((el) => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.style.transform = 'none';
                });
            });
            return;
        }

        sections.forEach((section) => {
            const enabled = section.dataset.animation === 'true';
            const delay = parseInt(section.dataset.animationDelay, 10) || 80;

            if (!enabled) {
                const animatables = section.querySelectorAll('.fade-up, .stagger-job');
                animatables.forEach((el) => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.style.transform = 'none';
                });
                return;
            }

            const allAnimatables = section.querySelectorAll('.fade-up, .stagger-job');

            allAnimatables.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.visibility = 'hidden';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s';
                el.style.transitionDelay = `${i * delay}ms`;
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionEl = entry.target;
                        const items = sectionEl.querySelectorAll('.fade-up, .stagger-job');
                        items.forEach((item) => {
                            requestAnimationFrame(() => {
                                item.style.opacity = '1';
                                item.style.visibility = 'visible';
                                item.style.transform = 'translate(0, 0)';
                            });
                        });
                        observer.unobserve(sectionEl);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

            observer.observe(section);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initJobOpenings);
    } else {
        initJobOpenings();
    }
    window.addEventListener('load', initJobOpenings);
})();
