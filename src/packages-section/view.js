/**
 * Packages Section - Frontend behavior
 * Handles filter tabs (show/hide by category) and scroll animations.
 * No external dependencies (no GSAP); uses IntersectionObserver.
 */
(function () {
    'use strict';

    const initPackagesSection = () => {
        const sections = document.querySelectorAll('.twork-packages-section');
        if (!sections.length) return;

        sections.forEach((section) => {
            const grid = section.querySelector('.packages-grid');
            const filterBtns = section.querySelectorAll('.filter-btn');
            const cards = section ? section.querySelectorAll('.package-card') : [];

            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay, 10) || 100;
            const animationType = section.dataset.animationType || 'fadeInUp';
            const hoverEnabled = section.dataset.hoverEffect === 'true';
            const hoverTranslateY = parseFloat(section.dataset.hoverTranslateY) || -10;

            // --- Filter logic ---
            if (filterBtns.length && cards.length) {
                filterBtns.forEach((btn) => {
                    btn.addEventListener('click', () => {
                        filterBtns.forEach((b) => {
                            b.classList.remove('active');
                            b.setAttribute('aria-pressed', 'false');
                        });
                        btn.classList.add('active');
                        btn.setAttribute('aria-pressed', 'true');

                        const filter = btn.getAttribute('data-filter');

                        cards.forEach((card) => {
                            const category = card.getAttribute('data-category');
                            const match = filter === 'all' || category === filter;

                            card.style.display = match ? 'flex' : 'none';
                            if (match) {
                                card.style.opacity = '1';
                                card.style.transform = '';
                            }
                        });
                    });
                });
            }

            // --- Hover effects ---
            if (hoverEnabled && cards.length) {
                cards.forEach((card) => {
                    card.addEventListener('mouseenter', function () {
                        this.style.transform = `translateY(${hoverTranslateY}px)`;
                    });
                    card.addEventListener('mouseleave', function () {
                        const recommended = this.classList.contains('recommended');
                        this.style.transform = recommended ? 'scale(1.02)' : 'translateY(0)';
                    });
                });
            }

            // --- Scroll animation (IntersectionObserver) ---
            if (animationEnabled && cards.length && 'IntersectionObserver' in window) {
                cards.forEach((card, index) => {
                    card.classList.add('animate-on-scroll');
                    card.style.transitionDelay = `${index * animationDelay}ms`;

                    switch (animationType) {
                        case 'fadeIn':
                            card.style.opacity = '0';
                            break;
                        case 'fadeInUp':
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(50px)';
                            break;
                        case 'slideInLeft':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(-40px)';
                            break;
                        case 'slideInRight':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(40px)';
                            break;
                        case 'zoomIn':
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            break;
                        default:
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(50px)';
                    }
                });

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('is-visible');
                                entry.target.style.opacity = '1';
                                const recommended = entry.target.classList.contains('recommended');
                                entry.target.style.transform = recommended ? 'scale(1.02)' : 'translateY(0)';
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
                );

                cards.forEach((card) => observer.observe(card));
            } else if (!animationEnabled && cards.length) {
                cards.forEach((card) => {
                    card.style.opacity = '1';
                    card.style.transform = '';
                    card.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPackagesSection);
    } else {
        initPackagesSection();
    }

    window.addEventListener('load', initPackagesSection);
})();
