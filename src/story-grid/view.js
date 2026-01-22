/**
 * Pure JavaScript for Story Grid Animations
 * No GSAP dependency - uses Intersection Observer API
 */

(function() {
    'use strict';

    /**
     * Initialize scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        const storySections = document.querySelectorAll('.twork-story-section[data-animation="true"]');
        
        if (storySections.length === 0) return;

        storySections.forEach(section => {
            const animationType = section.getAttribute('data-animation-type') || 'fadeInUp';
            const baseDelay = parseInt(section.getAttribute('data-animation-delay')) || 100;
            const storyItems = section.querySelectorAll('.story-item');
            
            if (storyItems.length === 0) return;

            // Create Intersection Observer for this section
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -15% 0px', // Trigger when 15% from bottom
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                        const index = Array.from(storyItems).indexOf(entry.target);
                        const delay = baseDelay * index;
                        
                        // Apply animation type class
                        entry.target.classList.add(`animate-${animationType}`);
                        
                        // Apply delay via CSS custom property (for CSS transitions)
                        entry.target.style.setProperty('--animation-delay', `${delay}ms`);
                        
                        // Use requestAnimationFrame for smoother animation start
                        requestAnimationFrame(() => {
                            if (delay > 0) {
                                setTimeout(() => {
                                    entry.target.classList.add('is-visible');
                                }, delay);
                            } else {
                                entry.target.classList.add('is-visible');
                            }
                        });
                        
                        // Unobserve after animation to improve performance
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all story items in this section
            storyItems.forEach(item => {
                observer.observe(item);
            });
        });
    }

    /**
     * Initialize counter animations for stats
     */
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.story-item .counter[data-target]');
        
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Animate counter from 0 to target value
     */
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target')) || 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;
        const isDecimal = target % 1 !== 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (target - startValue) * easeOut;
            
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = Math.floor(currentValue);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = Math.floor(target);
                }
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Initialize all features
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initScrollAnimations();
                initCounterAnimations();
            });
        } else {
            // DOM already loaded
            initScrollAnimations();
            initCounterAnimations();
        }

        // Re-initialize for dynamically loaded content (debounced)
        if (typeof MutationObserver !== 'undefined') {
            let timeout;
            const mutationObserver = new MutationObserver(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    initScrollAnimations();
                    initCounterAnimations();
                }, 100);
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Initialize
    init();
})();
