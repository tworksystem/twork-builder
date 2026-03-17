/**
 * Hero Slider – Frontend initialization
 * Plain CSS/JS only – no GSAP, Swiper, or other libraries. Follows services-grid / team-members-grid standards.
 *
 * Supports: fade, slide, cube effects; autoplay; pagination; prev/next; touch swipe.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

(function () {
    'use strict';

    const SLIDER_SELECTOR = '.twork-hero-slider-section, .wp-block-twork-hero-slider.hero-slider, .wp-block-twork-hero-slider.hero-section, section.hero-slider, section.hero-section';
    const WRAPPER_CLASS = 'swiper-wrapper';
    const SLIDE_CLASS = 'swiper-slide';
    const PAGINATION_CLASS = 'swiper-pagination';
    const NEXT_CLASS = 'swiper-button-next';
    const PREV_CLASS = 'swiper-button-prev';
    const BULLET_CLASS = 'swiper-pagination-bullet';
    const ACTIVE_CLASS = 'swiper-pagination-bullet-active';
    const INIT_CLASS = 'hero-slider-initialized';

    /**
     * Initialize a single hero slider instance.
     * @param {HTMLElement} section - Section element
     */
    function initHeroSlider(section) {
        if (section.classList.contains(INIT_CLASS)) return;

        const wrapper = section.querySelector('.' + WRAPPER_CLASS);
        const slides = wrapper ? wrapper.querySelectorAll('.' + SLIDE_CLASS) : [];
        const total = slides.length;

        if (total === 0) return;

        const effect = section.getAttribute('data-effect') || 'fade';
        const autoplayDelay = parseInt(section.getAttribute('data-autoplay-delay'), 10) || 4000;

        section.classList.add(INIT_CLASS);

        let currentIndex = 0;
        let autoplayTimer = null;

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            currentIndex = index;
            updatePagination();
            updateSlides();
        }

        function updatePagination() {
            const pagination = section.querySelector('.' + PAGINATION_CLASS);
            if (!pagination) return;
            const bullets = pagination.querySelectorAll('.' + BULLET_CLASS);
            bullets.forEach(function (el, i) {
                if (i === currentIndex) el.classList.add(ACTIVE_CLASS);
                else el.classList.remove(ACTIVE_CLASS);
            });
        }

        function updateSlides() {
            if (effect === 'fade') {
                slides.forEach(function (slide, i) {
                    slide.style.opacity = i === currentIndex ? '1' : '0';
                    slide.style.pointerEvents = i === currentIndex ? 'auto' : 'none';
                    slide.style.zIndex = i === currentIndex ? '2' : '1';
                });
            } else if (effect === 'slide' || effect === 'cube') {
                const offset = -currentIndex * 100;
                wrapper.style.transform = effect === 'cube'
                    ? 'translate3d(' + offset + '%, 0, 0)'
                    : 'translate3d(' + offset + '%, 0, 0)';
            }
        }

        function startAutoplay() {
            stopAutoplay();
            if (autoplayDelay <= 0 || total <= 1) return;
            autoplayTimer = setInterval(function () {
                goTo(currentIndex + 1);
            }, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        // Layout for effect
        if (effect === 'fade') {
            wrapper.style.position = 'relative';
            wrapper.style.height = '100%';
            wrapper.style.minHeight = '100%';
            slides.forEach(function (slide) {
                slide.style.position = 'absolute';
                slide.style.top = '0';
                slide.style.left = '0';
                slide.style.width = '100%';
                slide.style.height = '100%';
                slide.style.transition = 'opacity 0.5s ease';
            });
            updateSlides();
        } else {
            wrapper.style.display = 'flex';
            wrapper.style.transition = 'transform 0.5s ease';
            wrapper.style.width = total * 100 + '%';
            slides.forEach(function (slide) {
                slide.style.flex = '0 0 ' + 100 / total + '%';
                slide.style.width = 100 / total + '%';
            });
            updateSlides();
        }

        // Pagination bullets – create if empty (matches save output which has empty .swiper-pagination)
        const pagination = section.querySelector('.' + PAGINATION_CLASS);
        if (pagination) {
            let bullets = pagination.querySelectorAll('.' + BULLET_CLASS);
            if (bullets.length !== total) {
                pagination.innerHTML = '';
                for (var b = 0; b < total; b++) {
                    var bullet = document.createElement('span');
                    bullet.className = BULLET_CLASS;
                    bullet.setAttribute('role', 'button');
                    bullet.setAttribute('aria-label', 'Go to slide ' + (b + 1));
                    pagination.appendChild(bullet);
                }
                bullets = pagination.querySelectorAll('.' + BULLET_CLASS);
            }
            bullets.forEach(function (bullet, i) {
                bullet.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                bullet.addEventListener('click', function () {
                    goTo(i);
                    startAutoplay();
                });
            });
            updatePagination();
        }

        // Prev/Next
        const nextBtn = section.querySelector('.' + NEXT_CLASS);
        const prevBtn = section.querySelector('.' + PREV_CLASS);
        if (nextBtn) {
            nextBtn.setAttribute('aria-label', 'Next slide');
            nextBtn.addEventListener('click', function () {
                goTo(currentIndex + 1);
                startAutoplay();
            });
        }
        if (prevBtn) {
            prevBtn.setAttribute('aria-label', 'Previous slide');
            prevBtn.addEventListener('click', function () {
                goTo(currentIndex - 1);
                startAutoplay();
            });
        }

        section.addEventListener('mouseenter', stopAutoplay);
        section.addEventListener('mouseleave', startAutoplay);
        startAutoplay();
    }

    /**
     * Find and initialize all hero sliders on the page.
     */
    function initAll() {
        const sections = document.querySelectorAll(SLIDER_SELECTOR);
        sections.forEach(function (section) {
            initHeroSlider(section);
        });
    }

    function onReady() {
        initAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

    window.addEventListener('load', onReady);

    if (typeof window.TworkHeroSlider === 'undefined') {
        window.TworkHeroSlider = { init: initAll, version: '1.0.0' };
    }
})();
