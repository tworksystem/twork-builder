(function () {
    'use strict';

    /**
     * Initialize CSR Moments Gallery Section
     * Handles scroll animations for gallery items
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initCsrMomentsGallery = () => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.twork-csr-moments-gallery-section .gallery-item').forEach((item) => {
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-csr-moments-gallery-section');
        if (sections.length === 0) return;

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay, 10) || 80;
            const items = section.querySelectorAll('.gallery-item.animate-on-scroll');

            if (animationEnabled && items.length > 0) {
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.style.transitionDelay = `${index * animationDelay}ms`;
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

                items.forEach((item) => observer.observe(item));
            } else if (!animationEnabled) {
                section.querySelectorAll('.gallery-item').forEach((item) => {
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                    item.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCsrMomentsGallery);
    } else {
        initCsrMomentsGallery();
    }

    window.addEventListener('load', initCsrMomentsGallery);

    window.TworkCsrMomentsGallery = { init: initCsrMomentsGallery };
})();
