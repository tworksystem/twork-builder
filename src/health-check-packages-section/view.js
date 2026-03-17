/**
 * Health Check Packages Section – tab switching by data-category.
 * Single grid; cards have data-category; we show/hide by active tab.
 */
(function () {
    function init(block) {
        if (!block) return;
        const grid = block.querySelector('.chk-pkg-grid');
        const buttons = block.querySelectorAll('.chk-tab-btn');
        if (!grid || !buttons.length) return;

        function setActiveTab(value) {
            grid.setAttribute('data-active', value);
            buttons.forEach(function (btn) {
                const isActive = btn.getAttribute('data-tab') === value;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive);
            });
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const tab = btn.getAttribute('data-tab');
                if (tab) setActiveTab(tab);
            });
        });
    }

    function run() {
        document.querySelectorAll('.twork-health-check-packages-section').forEach(init);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    // Re-run when blocks are added dynamically (e.g. in editor or SPA)
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(run);
    }
})();
