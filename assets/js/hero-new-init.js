(function () {
    'use strict';

    /**
     * Hero New Section – Reveal animation & fallback
     * Uses IntersectionObserver (no GSAP). When animation disabled, content is always visible.
     * When enabled: elements start hidden, reveal on scroll. Fallback: reveal after 500ms if above fold.
     *
     * @since 1.0.0
     * @author Twork Builder
     */
    const initHeroNewSection = () => {
        const blocks = document.querySelectorAll('.wp-block-twork-hero-new-section');

        if (!blocks.length) {
            return;
        }

        const reveal = (block) => {
            if (block.classList.contains('is-revealed')) {
                return;
            }
            block.classList.add('is-revealed');
        };

        // Scroll reveal (only for blocks with data-animation=\"true\")
        const animatedBlocks = Array.prototype.filter.call(
            blocks,
            (b) => b.getAttribute('data-animation') === 'true'
        );

        animatedBlocks.forEach((block) => {
            const hasRevealElements = block.querySelectorAll('.gsap-reveal').length > 0;

            if (!hasRevealElements) {
                return;
            }

            // Fallback: reveal after 500ms (handles above-fold, IO not firing, or script load delay)
            const fallbackTimer = setTimeout(() => {
                reveal(block);
            }, 500);

            if (!('IntersectionObserver' in window)) {
                reveal(block);
                clearTimeout(fallbackTimer);
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal(entry.target);
                            observer.unobserve(entry.target);
                            clearTimeout(fallbackTimer);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -20px 0px',
                }
            );

            observer.observe(block);
        });

        // Background slideshows (image/GIF slides) – same pattern as team-members / services init
        blocks.forEach((block) => {
            const slideshow = block.querySelector('.hero-bg-slideshow');
            if (!slideshow) return;

            const slides = Array.prototype.slice.call(slideshow.querySelectorAll('.hero-bg-slide'));
            if (!slides.length) return;

            const intervalMs = Math.max(2000, parseInt(slideshow.getAttribute('data-slideshow-interval'), 10) || 5000);

            function setActiveIndex(index) {
                var i;
                for (i = 0; i < slides.length; i++) {
                    slides[i].classList.toggle('is-active', i === index);
                }
            }

            setActiveIndex(0);

            if (slides.length > 1) {
                var currentIndex = 0;
                setInterval(function () {
                    currentIndex = (currentIndex + 1) % slides.length;
                    setActiveIndex(currentIndex);
                }, intervalMs);
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroNewSection);
    } else {
        initHeroNewSection();
    }

    // Re-run when new hero blocks are added (e.g. AJAX / dynamic content)
    function startObserver() {
        if (typeof MutationObserver === 'undefined' || !document.body) return;
        var observer = new MutationObserver(function (mutations) {
            var i, j, hasNew;
            for (i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes && mutations[i].addedNodes.length) {
                    hasNew = false;
                    for (j = 0; j < mutations[i].addedNodes.length; j++) {
                        if (mutations[i].addedNodes[j].nodeType === 1) {
                            if (mutations[i].addedNodes[j].querySelector && mutations[i].addedNodes[j].querySelector('.hero-bg-slideshow')) hasNew = true;
                            if (mutations[i].addedNodes[j].classList && mutations[i].addedNodes[j].classList.contains('wp-block-twork-hero-new-section')) hasNew = true;
                        }
                    }
                    if (hasNew) {
                        initHeroNewSection();
                        break;
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) startObserver();
    else document.addEventListener('DOMContentLoaded', startObserver);
})();
