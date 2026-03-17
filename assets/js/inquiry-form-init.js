(function () {
    'use strict';

    /**
     * Initialize Inquiry Form Section Animations
     * Handles scroll animation for inquiry-wrapper (fade-up)
     *
     * @since 1.0.0
     * @author Twork Builder
     * @follows WordPress Coding Standards (WPCS)
     */
    const initInquiryForm = () => {
        if (!('IntersectionObserver' in window)) {
            const wrappers = document.querySelectorAll('.twork-inquiry-form-section .inquiry-wrapper.fade-up');
            wrappers.forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.classList.add('is-visible');
            });
            return;
        }

        const sections = document.querySelectorAll('.twork-inquiry-form-section');

        if (sections.length === 0) {
            return;
        }

        sections.forEach((section) => {
            const animationEnabled = section.dataset.animation === 'true';
            const wrappers = section.querySelectorAll('.inquiry-wrapper.fade-up');

            if (animationEnabled && wrappers.length > 0) {
                wrappers.forEach((wrapper) => {
                    if (!wrapper.classList.contains('animate-on-scroll')) {
                        wrapper.classList.add('animate-on-scroll');
                    }
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(30px)';
                    wrapper.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
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
                            setTimeout(() => observer.unobserve(entry.target), 1000);
                        }
                    });
                }, observerOptions);

                wrappers.forEach((wrapper) => observer.observe(wrapper));
            } else if (!animationEnabled && wrappers.length > 0) {
                wrappers.forEach((wrapper) => {
                    wrapper.style.opacity = '1';
                    wrapper.style.transform = 'none';
                    wrapper.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInquiryForm);
    } else {
        initInquiryForm();
    }

    window.addEventListener('load', initInquiryForm);

    window.TworkInquiryForm = {
        init: initInquiryForm,
        version: '1.0.0'
    };

})();
