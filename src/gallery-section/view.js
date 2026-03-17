/**
 * Gallery Section – Tab filtering + Lightbox (vanilla JS, no external dependencies)
 *
 * @package TworkBuilder
 */

(function () {
    'use strict';

    /**
     * Lightbox – open image in overlay, close on backdrop/button/Escape
     */
    const Lightbox = {
        overlay: null,

        create() {
            if (this.overlay) return this.overlay;
            const div = document.createElement('div');
            div.className = 'twork-gallery-lightbox';
            div.setAttribute('role', 'dialog');
            div.setAttribute('aria-modal', 'true');
            div.setAttribute('aria-label', 'View image');
            div.innerHTML = `
                <div class="twork-gallery-lightbox-backdrop" aria-hidden="true"></div>
                <div class="twork-gallery-lightbox-content">
                    <button type="button" class="twork-gallery-lightbox-close" aria-label="Close">&times;</button>
                    <img src="" alt="" class="twork-gallery-lightbox-img" />
                </div>
            `;
            document.body.appendChild(div);
            this.overlay = div;

            div.querySelector('.twork-gallery-lightbox-backdrop').addEventListener('click', () => this.close());
            div.querySelector('.twork-gallery-lightbox-close').addEventListener('click', () => this.close());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && div.classList.contains('is-open')) this.close();
            });

            return div;
        },

        open(imgSrc, imgAlt) {
            const el = this.create();
            const img = el.querySelector('.twork-gallery-lightbox-img');
            img.src = imgSrc || '';
            img.alt = imgAlt || 'Gallery image';
            el.classList.add('is-open');
            document.body.style.overflow = 'hidden';

            // Focus trap: focus close button for accessibility
            el.querySelector('.twork-gallery-lightbox-close').focus();
        },

        close() {
            if (!this.overlay) return;
            this.overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    };

    const initGallerySection = () => {
        const sections = document.querySelectorAll('.twork-gallery-section, .gallery-section');

        if (!sections.length) return;

        sections.forEach((section) => {
            const tabs = section.querySelectorAll('.tab-btn');
            const items = section.querySelectorAll('.gallery-item');

            if (!tabs.length || !items.length) return;

            // Tab filtering
            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    tabs.forEach((t) => t.classList.remove('active'));
                    tab.classList.add('active');
                    const filter = tab.getAttribute('data-filter');

                    items.forEach((item) => {
                        const category = item.getAttribute('data-category');
                        const show = filter === 'all' || filter === category;
                        item.style.display = show ? '' : 'none';
                    });
                });
            });

            // Lightbox: click on gallery item to view full image
            items.forEach((item) => {
                const img = item.querySelector('img');
                if (!img || !img.src) return;

                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    Lightbox.open(img.src, img.alt || 'Gallery image');
                });

                item.style.cursor = 'pointer';
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallerySection);
    } else {
        initGallerySection();
    }
})();
