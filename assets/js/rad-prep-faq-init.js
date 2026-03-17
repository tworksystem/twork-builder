/**
 * Radiology Prep FAQ Section – accordion behaviour.
 * Toggles open/close on .rad-faq-a when .rad-faq-q is clicked.
 * Mirrors the structure used by twork/rad-faq-item.
 */
(function () {
    'use strict';

    var SECTION_SELECTOR = '.twork-rad-prep-faq-section';
    var ITEM_SELECTOR = '.rad-faq-item';
    var QUESTION_SELECTOR = '.rad-faq-q';
    var ANSWER_SELECTOR = '.rad-faq-a';

    function initRadPrepFaqAccordions() {
        document.querySelectorAll(SECTION_SELECTOR).forEach(function (section) {
            var items = section.querySelectorAll(ITEM_SELECTOR);
            if (!items.length) return;

            items.forEach(function (item) {
                var btn = item.querySelector(QUESTION_SELECTOR);
                var answer = item.querySelector(ANSWER_SELECTOR);
                if (!btn || !answer) return;

                if (btn.dataset.radPrepFaqBound === '1') return;
                btn.dataset.radPrepFaqBound = '1';

                btn.addEventListener('click', function () {
                    var isActive = btn.classList.contains('active');

                    // Close all in this section
                    items.forEach(function (other) {
                        var otherBtn = other.querySelector(QUESTION_SELECTOR);
                        var otherAnswer = other.querySelector(ANSWER_SELECTOR);
                        if (otherBtn) otherBtn.classList.remove('active');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                            otherAnswer.style.paddingBottom = null;
                        }
                    });

                    // Toggle current
                    if (!isActive) {
                        btn.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.paddingBottom = '20px';
                    }
                });
            });

            // Open first FAQ by default if none active
            var anyActive = false;
            items.forEach(function (item) {
                var btn = item.querySelector(QUESTION_SELECTOR);
                if (btn && btn.classList.contains('active')) {
                    anyActive = true;
                }
            });
            if (!anyActive && items[0]) {
                var firstBtn = items[0].querySelector(QUESTION_SELECTOR);
                var firstAnswer = items[0].querySelector(ANSWER_SELECTOR);
                if (firstBtn && firstAnswer) {
                    firstBtn.classList.add('active');
                    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
                    firstAnswer.style.paddingBottom = '20px';
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRadPrepFaqAccordions);
    } else {
        initRadPrepFaqAccordions();
    }

    // Re-run when new content is injected (AJAX / block render, etc.)
    function startObserver() {
        if (typeof MutationObserver === 'undefined' || !document.body) return;
        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes && mutations[i].addedNodes.length) {
                    initRadPrepFaqAccordions();
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

