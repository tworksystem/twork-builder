/**
 * Pure JavaScript for Key Services Section Animations
 * No GSAP dependency - uses Intersection Observer API and CSS transitions
 * 
 * @since 1.0.0
 * @author Twork Builder
 * @follows WordPress Coding Standards (WPCS)
 */

(function () {
    'use strict';

    /**
     * Initialize Key Services Section Animations
     * Handles scroll animations and hover effects for key service items
     * 
     * @since 1.0.0
     */
    const initKeyServicesSection = () => {
        // Early return if IntersectionObserver is not supported
        if (!('IntersectionObserver' in window)) {
            console.warn('Twork Key Services: IntersectionObserver not supported. Animations disabled.');
            // Make all items visible immediately
            const allItems = document.querySelectorAll('.key-service-item, .twork-key-service-item');
            allItems.forEach((item) => {
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.classList.add('is-visible');
            });
            return;
        }

        // Get all key services sections
        const keyServicesSections = document.querySelectorAll('.key-services-section, .twork-key-services-section');

        if (keyServicesSections.length === 0) {
            console.log('Twork Key Services: No key services sections found.');
            return;
        }

        console.log(`Twork Key Services: Initializing ${keyServicesSections.length} section(s).`);

        keyServicesSections.forEach((section, sectionIndex) => {
            // Get attributes from data attributes
            const animationEnabled = section.dataset.animation === 'true';
            const animationType = section.dataset.animationType || 'fadeInUp';
            const animationDelay = parseInt(section.dataset.animationDelay) || 100;
            const hoverEnabled = section.dataset.hoverEffect === 'true';
            const hoverTranslateY = parseFloat(section.dataset.hoverTranslateY) || -5;
            const hoverScale = parseFloat(section.dataset.hoverScale) || 1.05;

            // Get all key service items
            const serviceItems = section.querySelectorAll('.key-service-item, .twork-key-service-item');

            console.log(`Section ${sectionIndex + 1}: Found ${serviceItems.length} item(s), Animation: ${animationEnabled}, Hover: ${hoverEnabled}`);

            // Apply hover effects if enabled
            if (hoverEnabled && serviceItems.length > 0) {
                serviceItems.forEach((item) => {
                    const originalTransform = window.getComputedStyle(item).transform;
                    
                    item.addEventListener('mouseenter', function() {
                        this.style.transform = `translateY(${hoverTranslateY}px) scale(${hoverScale})`;
                    });

                    item.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });
            }

            // Setup scroll animations if enabled
            if (animationEnabled && serviceItems.length > 0) {
                // Add animate-on-scroll class and initial styles
                serviceItems.forEach((item, index) => {
                    if (!item.classList.contains('animate-on-scroll')) {
                        item.classList.add('animate-on-scroll');
                    }
                    
                    // Apply animation type specific styles
                    // Use data attribute for animation type (CSS handles most of it)
                    item.setAttribute('data-animation-type', animationType);
                    
                    // Apply initial transform only (opacity handled by CSS)
                    switch (animationType) {
                        case 'fadeIn':
                            // CSS handles opacity
                            break;
                        case 'fadeInUp':
                            item.style.transform = 'translateY(30px)';
                            break;
                        case 'slideInLeft':
                            item.style.transform = 'translateX(-50px)';
                            break;
                        case 'slideInRight':
                            item.style.transform = 'translateX(50px)';
                            break;
                        case 'zoomIn':
                            item.style.transform = 'scale(0.8)';
                            break;
                    }
                    
                    // Set staggered delay
                    item.style.transitionDelay = `${index * animationDelay}ms`;
                });

                // Create Intersection Observer with optimized options
                const observerOptions = {
                    threshold: 0.15,
                    rootMargin: '0px 0px -10% 0px' // Trigger when 10% from bottom
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                            // Add is-visible class immediately (CSS handles the transition)
                            entry.target.classList.add('is-visible');
                            
                            // Reset transform to final state using requestAnimationFrame for smooth animation
                            requestAnimationFrame(() => {
                                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                            });
                            
                            // Unobserve after animation completes to improve performance
                            const transitionDuration = 800; // Match CSS transition duration
                            const delay = parseInt(entry.target.style.transitionDelay) || 0;
                            setTimeout(() => {
                                observer.unobserve(entry.target);
                            }, transitionDuration + delay);
                        }
                    });
                }, observerOptions);

                // Observe all service items
                serviceItems.forEach((item) => {
                    observer.observe(item);
                });
            } else if (!animationEnabled && serviceItems.length > 0) {
                // Ensure items are visible when animation is disabled
                serviceItems.forEach((item) => {
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                    item.classList.remove('animate-on-scroll');
                    item.classList.add('is-visible');
                });
            }
        });
    };

    /**
     * Debounce function to limit how often a function can run
     * Improves performance for resize and scroll events
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
        document.addEventListener('DOMContentLoaded', initKeyServicesSection);
    } else {
        // DOM is already ready, initialize immediately
        initKeyServicesSection();
    }

    /**
     * Re-initialize on window load (for dynamic content and images)
     * This ensures animations work with lazy-loaded content
     */
    window.addEventListener('load', () => {
        console.log('Twork Key Services: Window loaded, re-initializing...');
        initKeyServicesSection();
    });

    /**
     * Re-initialize on resize (debounced to improve performance)
     * This helps with responsive issues and ensures visibility is correct
     */
    window.addEventListener('resize', debounce(() => {
        console.log('Twork Key Services: Window resized, checking visibility...');
        // Only check visibility, don't re-initialize everything
        const allItems = document.querySelectorAll('.key-service-item, .twork-key-service-item');
        allItems.forEach((item) => {
            const section = item.closest('.key-services-section, .twork-key-services-section');
            if (section && section.dataset.animation !== 'true') {
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.classList.add('is-visible');
            }
        });
    }, 250));

    /**
     * Expose initialization function globally for manual re-initialization
     * Useful for AJAX-loaded content or dynamic page builders
     */
    window.TworkKeyServices = {
        init: initKeyServicesSection,
        version: '1.0.0'
    };

    console.log('Twork Key Services: Script loaded successfully.');

})();
