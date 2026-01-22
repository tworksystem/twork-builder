(function () {
    'use strict';

    /**
     * Initialize Services Grid Animations
     * Handles scroll animations and hover effects for service items
     * 
     * @since 1.0.0
     * @author Twork Builder
     * @follows WordPress Coding Standards (WPCS)
     */
    const initServicesGrid = () => {
        // Early return if IntersectionObserver is not supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported. Animations disabled.');
            // Make all cards visible immediately
            const allCards = document.querySelectorAll('.service-card');
            allCards.forEach((card) => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('is-visible');
            });
            return;
        }
        // Get all services grid sections
        const servicesGrids = document.querySelectorAll('.twork-services-section');

        if (servicesGrids.length === 0) {
            console.log('Twork Services Grid: No services sections found.');
            return;
        }

        console.log(`Twork Services Grid: Initializing ${servicesGrids.length} section(s).`);

        servicesGrids.forEach((section, sectionIndex) => {
            // Get attributes from data attributes
            const animationEnabled = section.dataset.animation === 'true';
            const animationDelay = parseInt(section.dataset.animationDelay) || 100;
            const hoverEnabled = section.dataset.hoverEffect === 'true';
            const hoverTranslateY = parseFloat(section.dataset.hoverTranslateY) || -4;
            const hoverScale = parseFloat(section.dataset.hoverScale) || 1;

            // Get all service cards
            const serviceCards = section.querySelectorAll('.service-card');

            console.log(`Section ${sectionIndex + 1}: Found ${serviceCards.length} card(s), Animation: ${animationEnabled}, Hover: ${hoverEnabled}`);

            // Apply hover effects if enabled
            if (hoverEnabled && serviceCards.length > 0) {
                serviceCards.forEach((card) => {
                    const originalTransform = window.getComputedStyle(card).transform;
                    
                    card.addEventListener('mouseenter', function() {
                        this.style.transform = `translateY(${hoverTranslateY}px) scale(${hoverScale})`;
                    });

                    card.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });
            }

            // Setup scroll animations if enabled
            if (animationEnabled && serviceCards.length > 0) {
                const animationType = section.dataset.animationType || 'fadeInUp';
                
                // Add animate-on-scroll class and initial styles
                serviceCards.forEach((card, index) => {
                    if (!card.classList.contains('animate-on-scroll')) {
                        card.classList.add('animate-on-scroll');
                    }
                    
                    // Apply animation type specific styles using CSS classes instead of inline styles
                    // This prevents opacity: 0 from persisting if JS fails
                    card.setAttribute('data-animation-type', animationType);
                    
                    // Apply initial transform only (opacity handled by CSS)
                    switch (animationType) {
                        case 'fadeIn':
                            // CSS handles opacity
                            break;
                        case 'fadeInUp':
                            card.style.transform = 'translateY(30px)';
                            break;
                        case 'slideInLeft':
                            card.style.transform = 'translateX(-50px)';
                            break;
                        case 'slideInRight':
                            card.style.transform = 'translateX(50px)';
                            break;
                        case 'zoomIn':
                            card.style.transform = 'scale(0.8)';
                            break;
                    }
                    
                    // Set staggered delay
                    card.style.transitionDelay = `${index * animationDelay}ms`;
                });

                // Create Intersection Observer with better options
                const observerOptions = {
                    threshold: 0.15,
                    rootMargin: '0px 0px -10% 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Add is-visible class immediately
                            entry.target.classList.add('is-visible');
                            
                            // Reset transform to final state
                            // Use requestAnimationFrame for better performance
                            requestAnimationFrame(() => {
                                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                            });
                            
                            // Unobserve after animation completes
                            const transitionDuration = 800; // Match CSS transition duration
                            const delay = parseInt(entry.target.style.transitionDelay) || 0;
                            setTimeout(() => {
                                observer.unobserve(entry.target);
                            }, transitionDuration + delay);
                        }
                    });
                }, observerOptions);

                // Observe all service cards
                serviceCards.forEach((card) => {
                    observer.observe(card);
                });
            } else if (!animationEnabled && serviceCards.length > 0) {
                // Ensure cards are visible when animation is disabled
                serviceCards.forEach((card) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.classList.remove('animate-on-scroll');
                });
            }
        });
    };

    /**
     * Debounce function to limit how often a function can run
     * 
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @return {Function} Debounced function
     */
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Initialize on DOM ready
     * Using multiple event listeners to ensure initialization happens
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicesGrid);
    } else {
        // DOM is already ready, initialize immediately
        initServicesGrid();
    }

    /**
     * Re-initialize on window load (for dynamic content and images)
     */
    window.addEventListener('load', () => {
        console.log('Twork Services Grid: Window loaded, re-initializing...');
        initServicesGrid();
    });

    /**
     * Re-initialize on resize (debounced to improve performance)
     * This helps with responsive issues
     */
    window.addEventListener('resize', debounce(() => {
        console.log('Twork Services Grid: Window resized, checking visibility...');
        // Only check visibility, don't re-initialize everything
        const allCards = document.querySelectorAll('.service-card');
        allCards.forEach((card) => {
            const section = card.closest('.twork-services-section');
            if (section && section.dataset.animation !== 'true') {
                card.style.opacity = '1';
                card.style.transform = 'none';
            }
        });
    }, 250));

    /**
     * Expose initialization function globally for manual re-initialization
     * Useful for AJAX-loaded content or dynamic page builders
     */
    window.TworkServicesGrid = {
        init: initServicesGrid,
        version: '1.0.0'
    };

    console.log('Twork Services Grid: Script loaded successfully.');

})();

