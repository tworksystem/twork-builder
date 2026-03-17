(function () {
    'use strict';

    /**
     * Initialize Profile Tabs Section
     * Handles tab switching for OPD Schedule / Experience tabs.
     * Uses event delegation so re-running (e.g. after AJAX) does not duplicate listeners.
     */
    function initProfileTabs() {
        const sections = document.querySelectorAll('.profile-tabs-section');

        sections.forEach((section) => {
            if (section.dataset.profileTabsInit === '1') return;
            section.dataset.profileTabsInit = '1';

            const tabButtons = section.querySelectorAll('.tab-btn');
            const tabPanels = section.querySelectorAll('.tab-content');
            if (tabButtons.length === 0 || tabPanels.length === 0) return;

            // Single delegated click handler on section (no duplicate listeners on re-init)
            section.addEventListener('click', function (e) {
                const btn = e.target.closest('.tab-btn');
                if (!btn || !section.contains(btn)) return;

                e.preventDefault();
                const targetId = btn.getAttribute('data-tab');
                if (!targetId) return;

                tabButtons.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                tabPanels.forEach(function (panel) {
                    panel.classList.remove('active');
                    panel.hidden = true;
                });

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                const escapedId = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(targetId) : targetId.replace(/([^\w-])/g, '\\$1');
                const targetPanel = section.querySelector('#' + escapedId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.hidden = false;
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProfileTabs);
    } else {
        initProfileTabs();
    }

    // Re-run when new content is injected (e.g. AJAX-loaded blocks)
    function startObserver() {
        if (typeof MutationObserver === 'undefined' || !document.body) return;
        const observer = new MutationObserver(function (mutations) {
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length) {
                    initProfileTabs();
                    break;
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) {
        startObserver();
    } else {
        document.addEventListener('DOMContentLoaded', startObserver);
    }
})();
