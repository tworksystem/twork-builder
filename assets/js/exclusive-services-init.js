(function () {
    'use strict';

    /**
     * Initialize Exclusive Services Section Animations
     * Handles scroll animations and hover effects for svc-cards
     *
     * @since 1.0.0
     * @author Twork Builder
     * @follows WordPress Coding Standards (WPCS)
     */
    const initExclusiveServices = () => {
        if (!('IntersectionObserver' in window)) {
            const allCards = document.querySelectorAll('.twork-exclusive-services-section .svc-card');
            allCards.forEach((card) => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-exclusive-services-section');

        if (sections.length === 0) {
            return;
        }

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay, 10) || 100;
            const animationType = section.dataset.animationType || 'fadeInUp';
            const svcCards = section.querySelectorAll('.svc-card');

            if (animationEnabled && svcCards.length > 0) {
                svcCards.forEach((card, index) => {
                    if (!card.classList.contains('animate-on-scroll')) {
                        card.classList.add('animate-on-scroll');
                    }
                    card.setAttribute('data-animation-type', animationType);

                    switch (animationType) {
                        case 'fadeIn':
                            card.style.opacity = '0';
                            break;
                        case 'fadeInUp':
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            break;
                        case 'slideInLeft':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(-50px)';
                            break;
                        case 'slideInRight':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(50px)';
                            break;
                        case 'zoomIn':
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            break;
                        default:
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                    }

                    card.style.transitionDelay = `${index * animationDelay}ms`;
                });

                const observerOptions = {
                    threshold: 0.15,
                    rootMargin: '0px 0px -10% 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            requestAnimationFrame(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'none';
                            });
                            const delay = parseInt(entry.target.style.transitionDelay, 10) || 0;
                            setTimeout(() => {
                                observer.unobserve(entry.target);
                            }, 800 + delay);
                        }
                    });
                }, observerOptions);

                svcCards.forEach((card) => {
                    observer.observe(card);
                });
            } else if (!animationEnabled && svcCards.length > 0) {
                svcCards.forEach((card) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExclusiveServices);
    } else {
        initExclusiveServices();
    }

    window.addEventListener('load', initExclusiveServices);

    window.TworkExclusiveServices = {
        init: initExclusiveServices,
        version: '1.0.0'
    };

})();
