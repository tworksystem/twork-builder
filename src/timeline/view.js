/**
 * Timeline Block - Frontend JavaScript
 * Handles accordion functionality for timeline items
 */

(function() {
    'use strict';

    function initTimelineAccordions() {
        const timelineBlocks = document.querySelectorAll('.timeline-section');

        timelineBlocks.forEach(timelineBlock => {
            const accordionHeaders = timelineBlock.querySelectorAll('.accordion-header');
            const accordionItems = timelineBlock.querySelectorAll('.accordion-item');
            
            if (accordionHeaders.length === 0) {
                return;
            }

            // Set first accordion as active by default
            const firstHeader = accordionHeaders[0];
            const firstContent = firstHeader.nextElementSibling;
            
            if (firstHeader && firstContent) {
                firstHeader.classList.add('active');
                firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
                firstContent.style.opacity = '1';
            }

            // Add click handlers to each accordion header
            accordionHeaders.forEach((header, index) => {
                // Remove any existing listeners by cloning
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                newHeader.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const content = newHeader.nextElementSibling;
                    if (!content) return;

                    // Close all other accordions in this timeline block
                    accordionItems.forEach((item, itemIndex) => {
                        if (itemIndex !== index) {
                            const otherHeader = item.querySelector('.accordion-header');
                            const otherContent = item.querySelector('.accordion-content');
                            
                            if (otherHeader && otherContent) {
                                otherHeader.classList.remove('active');
                                otherContent.style.maxHeight = null;
                                otherContent.style.opacity = '0';
                            }
                        }
                    });

                    // Toggle the clicked accordion
                    if (newHeader.classList.contains('active')) {
                        newHeader.classList.remove('active');
                        content.style.maxHeight = null;
                        content.style.opacity = '0';
                    } else {
                        newHeader.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.opacity = '1';
                    }
                });
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimelineAccordions);
    } else {
        initTimelineAccordions();
    }

    // Re-initialize for dynamically loaded content (AJAX, etc.)
    if (typeof jQuery !== 'undefined') {
        jQuery(document).on('DOMNodeInserted', function(e) {
            if (e.target.querySelector && e.target.querySelector('.timeline-section')) {
                initTimelineAccordions();
            }
        });
    }
})();
