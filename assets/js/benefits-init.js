(function () {
    'use strict';

    /**
     * Initialize Benefits Section Animations
     * Handles scroll animations for benefit cards
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initBenefits = () => {
        if (!('IntersectionObserver' in window)) {
            const cards = document.querySelectorAll('.twork-benefits-section .benefit-card');
            cards.forEach((card) => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-benefits-section');

        sections.forEach((section) => {
            const enabled = section.dataset.animation === 'true';
            const delay = parseInt(section.dataset.animationDelay, 10) || 100;
            const type = section.dataset.animationType || 'fadeInUp';
            const cards = section.querySelectorAll('.benefit-card');

            if (enabled && cards.length > 0) {
                cards.forEach((card, i) => {
                    if (!card.classList.contains('animate-on-scroll')) {
                        card.classList.add('animate-on-scroll');
                    }
                    card.style.opacity = '0';
                    card.style.transitionDelay = `${i * delay}ms`;
                    if (type === 'fadeInUp') {
                        card.style.transform = 'translateY(30px)';
                    } else if (type === 'fadeIn') {
                        card.style.transform = 'none';
                    }
                });

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            requestAnimationFrame(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'none';
                            });
                            setTimeout(() => observer.unobserve(entry.target), 1000);
                        }
                    });
                }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

                cards.forEach((c) => observer.observe(c));
            } else if (!enabled) {
                cards.forEach((card) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBenefits);
    } else {
        initBenefits();
    }
    window.addEventListener('load', initBenefits);
})();
