/**
 * Timeline Progress Animation - Pure JavaScript Implementation
 * No external dependencies - uses Intersection Observer API and requestAnimationFrame
 * Professional implementation with performance optimizations
 */

(function() {
    'use strict';

    /**
     * requestAnimationFrame throttle for scroll/resize
     * @param {Function} fn
     * @returns {Function}
     */
    function rafThrottle(fn) {
        let scheduled = false;
        let lastArgs = null;
        return function throttled(...args) {
            lastArgs = args;
            if (scheduled) return;
            scheduled = true;
            window.requestAnimationFrame(() => {
                scheduled = false;
                fn(...(lastArgs || []));
            });
        };
    }

    /**
     * Calculate scroll progress for timeline (matches about.html behavior)
     * Start: trigger top hits 60% viewport
     * End:   trigger bottom hits 80% viewport
     *
     * @param {HTMLElement} timeline
     * @returns {number} Progress percentage (0-100)
     */
    function calculateProgress(timeline) {
        if (!timeline) return 0;

        const rect = timeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        const top = rect.top + scrollY;
        const bottom = rect.bottom + scrollY;

        const startScroll = top - viewportHeight * 0.6;
        const endScroll = bottom - viewportHeight * 0.8;

        const range = endScroll - startScroll;
        if (range <= 0) {
            return scrollY >= startScroll ? 100 : 0;
        }

        const raw = ((scrollY - startScroll) / range) * 100;
        return Math.min(100, Math.max(0, raw));
    }

    /**
     * Update progress line height
     * @param {HTMLElement} timeline - Timeline wrapper element
     * @param {HTMLElement} progressLine - Progress line element
     */
    function updateProgressLine(timeline, progressLine) {
        const progress = calculateProgress(timeline);
        progressLine.style.height = `${progress}%`;
    }

    /**
     * Initialize timeline progress animation
     * @param {HTMLElement} timeline - Timeline wrapper element
     */
    function initProgressAnimation(timeline) {
        if (!timeline) return;
        
        const progressLine = timeline.querySelector('.timeline-progress');
        if (!progressLine) return;

        let isAnimating = false;
        let scrollHandler = null;
        let resizeHandler = null;

        // Use Intersection Observer for performance
        if (typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start animation when timeline enters viewport
                        if (!isAnimating) {
                            isAnimating = true;
                            
                            // Create scroll handler
                            scrollHandler = rafThrottle(() => {
                                updateProgressLine(timeline, progressLine);
                            });

                            resizeHandler = rafThrottle(() => {
                                updateProgressLine(timeline, progressLine);
                            });

                            window.addEventListener('scroll', scrollHandler, { passive: true });
                            window.addEventListener('resize', resizeHandler, { passive: true });
                        }
                        
                        // Initial update
                        updateProgressLine(timeline, progressLine);
                    } else {
                        // Stop animation when timeline leaves viewport
                        if (isAnimating && scrollHandler) {
                            window.removeEventListener('scroll', scrollHandler);
                            scrollHandler = null;
                            if (resizeHandler) {
                                window.removeEventListener('resize', resizeHandler);
                                resizeHandler = null;
                            }
                            isAnimating = false;
                        }
                    }
                });
            }, {
                threshold: [0, 0.1, 0.5, 1],
                rootMargin: '0px'
            });

            observer.observe(timeline);
        } else {
            // Fallback for browsers without Intersection Observer
            scrollHandler = rafThrottle(() => {
                const rect = timeline.getBoundingClientRect();
                if (rect.top < window.innerHeight * 1.5 && rect.bottom > 0) {
                    updateProgressLine(timeline, progressLine);
                }
            });

            window.addEventListener('scroll', scrollHandler, { passive: true });
            window.addEventListener('resize', scrollHandler, { passive: true });
        }

        // Initial update
        updateProgressLine(timeline, progressLine);
    }

    /**
     * Initialize timeline item animations
     * @param {HTMLElement} timeline - Timeline wrapper element
     */
    function initItemAnimations(timeline) {
        const wrapper = timeline.closest('.twork-timeline-wrapper-section');
        if (!wrapper) {
            // If no wrapper found, ensure items are visible anyway
            const items = timeline.querySelectorAll('.timeline-item');
            items.forEach(item => {
                item.classList.add('is-visible');
                item.style.opacity = '1';
                item.style.transform = 'none';
            });
            return;
        }

        const items = timeline.querySelectorAll('.timeline-item');
        if (items.length === 0) return;

        // Check if animation is enabled
        const animationEnabled = wrapper.getAttribute('data-animation') === 'true';
        
        // IMPORTANT: If animation is not enabled, ensure all items are visible immediately
        if (!animationEnabled) {
            items.forEach(item => {
                item.classList.add('is-visible');
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.style.visibility = 'visible';
            });
            return;
        }

        // Get animation type from wrapper
        const animationType = wrapper.getAttribute('data-animation-type') || 'fadeInUp';
        const animationDelay = parseInt(wrapper.getAttribute('data-animation-delay')) || 100;

        // Check if Intersection Observer is available
        if (typeof IntersectionObserver === 'undefined') {
            // Fallback: Show all items immediately if Intersection Observer is not available
            items.forEach(item => {
                item.classList.add('is-visible');
                item.setAttribute('data-animation-type', animationType);
            });
            return;
        }

        // Create Intersection Observer for items
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add visible class with staggered delay
                    setTimeout(() => {
                        if (entry.target) {
                            entry.target.classList.add('is-visible');
                            // Set animation type attribute
                            entry.target.setAttribute('data-animation-type', animationType);
                        }
                    }, index * animationDelay);

                    // Unobserve after animation starts
                    itemObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of item is visible
            rootMargin: '0px 0px -15% 0px' // Trigger slightly before item enters viewport
        });

        // Observe all timeline items
        items.forEach((item, index) => {
            // Set initial animation type
            item.setAttribute('data-animation-type', animationType);
            
            // Ensure item is initially visible if already in viewport (for immediate display)
            const rect = item.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInViewport) {
                // Item is already visible, trigger animation immediately
                setTimeout(() => {
                    if (item) {
                        item.classList.add('is-visible');
                    }
                }, index * animationDelay);
            } else {
                // Item is not in viewport, observe it
                itemObserver.observe(item);
            }
        });
    }

    /**
     * Initialize all timeline wrappers
     */
    function initTimelines() {
        // Try multiple selectors to find timeline wrappers
        const timelineSections = document.querySelectorAll('.twork-timeline-wrapper-section');
        const timelineWrappers = document.querySelectorAll(
            '.twork-timeline-wrapper-section .twork-timeline-wrapper, .twork-timeline-wrapper-section .timeline-wrapper'
        );
        
        // If no wrappers found, try alternative selectors
        if (timelineWrappers.length === 0 && timelineSections.length > 0) {
            // Look for timeline-wrapper directly in sections
            timelineSections.forEach(section => {
                const wrapper = section.querySelector('.twork-timeline-wrapper') || section.querySelector('.timeline-wrapper');
                if (wrapper) {
                    processTimeline(wrapper);
                }
            });
            return;
        }
        
        if (timelineWrappers.length === 0) {
            // Retry after a short delay in case content loads dynamically
            setTimeout(initTimelines, 100);
            return;
        }

        // Avoid processing duplicates (when element has both classes)
        const seen = new Set();
        timelineWrappers.forEach(timeline => {
            if (!timeline || seen.has(timeline)) return;
            seen.add(timeline);
            processTimeline(timeline);
        });
    }
    
    /**
     * Process a single timeline wrapper
     * @param {HTMLElement} timeline - Timeline wrapper element
     */
    function processTimeline(timeline) {
        if (!timeline) return;

        const wrapper = timeline.closest('.twork-timeline-wrapper-section');
        const animationEnabled = wrapper && wrapper.getAttribute('data-animation') === 'true';
        const animationType = wrapper ? (wrapper.getAttribute('data-animation-type') || 'fadeInUp') : 'fadeInUp';
        
        // Ensure timeline items are in a clean, predictable state (theme/WP safe)
        const items = timeline.querySelectorAll('.timeline-item');
        
        items.forEach((item) => {
            // Remove any editor classes that might have leaked
            item.classList.remove('twork-timeline-item-editor', 'wp-block-twork-timeline-item');
            
            // CRITICAL: Remove any inline border styles that WordPress might have added
            // Check all possible border properties
            const borderProps = [
                'border', 'borderWidth', 'borderColor', 'borderStyle',
                'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
                'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
                'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
                'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'
            ];
            
            borderProps.forEach(prop => {
                if (item.style[prop]) {
                    item.style[prop] = '';
                }
            });
            
            // Also check computed styles and remove if needed
            const computedStyle = window.getComputedStyle(item);
            if (computedStyle.borderWidth !== '0px' && computedStyle.borderWidth !== '0') {
                item.style.setProperty('border', 'none', 'important');
                item.style.setProperty('border-width', '0', 'important');
                item.style.setProperty('border-style', 'none', 'important');
                item.style.setProperty('border-color', 'transparent', 'important');
            }
            
            // CRITICAL: Remove any inline margin styles that might override responsive CSS spacing
            // This ensures responsive margin-bottom rules can apply properly
            if (item.style.marginBottom) {
                item.style.marginBottom = '';
            }
            if (item.style.margin) {
                // Only remove if margin is set to 0 (which would break spacing)
                const marginValue = item.style.margin;
                if (marginValue === '0' || marginValue === '0px' || marginValue.includes('0 0')) {
                    item.style.margin = '';
                }
            }

            // Progressive enhancement for animations:
            // - Items render visible by default
            // - When animation is enabled, ensure in-viewport items are marked visible before enabling animation styles
            if (animationEnabled) {
                item.setAttribute('data-animation-type', animationType);
                const rect = item.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInViewport) {
                    item.classList.add('is-visible');
                }
            } else {
                item.classList.add('is-visible');
            }
        });

        // Enable animation CSS only after we've marked in-viewport items visible (avoids flicker)
        if (wrapper) {
            if (animationEnabled) {
                wrapper.classList.add('twork-animation-ready');
            } else {
                wrapper.classList.remove('twork-animation-ready');
            }
        }

        // Initialize progress + item animations
        initProgressAnimation(timeline);
        initItemAnimations(timeline);
        
        // If no items found, try to find them with alternative selectors
        if (items.length === 0) {
            const altItems = timeline.querySelectorAll('[class*="timeline-item"], [data-type="twork/timeline-item"]');
            altItems.forEach(item => {
                item.classList.add('timeline-item');
                if (animationEnabled) {
                    item.setAttribute('data-animation-type', animationType);
                    const rect = item.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                    if (isInViewport) item.classList.add('is-visible');
                } else {
                    item.classList.add('is-visible');
                }
            });
        }
    }

    /**
     * Cleanup function for performance
     */
    function cleanup() {
        // placeholder for future cleanup hooks
    }

    // Initialize on DOM ready
    function initializeTimelines() {
        initTimelines();
        
        // Also try after a short delay to catch any late-loading content
        setTimeout(initTimelines, 500);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTimelines);
    } else {
        // DOM already loaded
        initializeTimelines();
    }
    
    // Also initialize when window loads (for any content loaded after DOMContentLoaded)
    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(initTimelines, 100);
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    // Re-initialize for dynamically loaded content (AJAX, etc.)
    if (typeof MutationObserver !== 'undefined') {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            // Check if new timeline was added
                            if (
                                node.classList &&
                                (node.classList.contains('twork-timeline-wrapper') || node.classList.contains('timeline-wrapper'))
                            ) {
                                processTimeline(node);
                            }
                            // Check if timeline section was added
                            if (node.classList && node.classList.contains('twork-timeline-wrapper-section')) {
                                const timelines = node.querySelectorAll('.twork-timeline-wrapper, .timeline-wrapper');
                                timelines.forEach(timeline => {
                                    processTimeline(timeline);
                                });
                            }
                            // Check if timeline is inside added node
                            const timelines = node.querySelectorAll && node.querySelectorAll('.twork-timeline-wrapper, .timeline-wrapper');
                            if (timelines && timelines.length > 0) {
                                timelines.forEach(timeline => {
                                    processTimeline(timeline);
                                });
                            }
                        }
                    });
                }
            });
        });

        // Observe document body for changes
        if (document.body) {
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Expose cleanup function for manual cleanup if needed
    if (typeof window !== 'undefined') {
        window.tworkTimelineCleanup = cleanup;
    }
})();
