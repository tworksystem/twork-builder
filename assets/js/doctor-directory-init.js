/**
 * Doctor Directory Section – front-end filter (search, department, gender).
 * Enqueued globally so filtering works regardless of block viewScript build.
 * Cards must have .doctor-card and data-dept, data-gender, data-name.
 * Filter bar must have #searchInput, #deptFilter, #genderFilter, #resetBtn
 * (from twork/doctor-search-filter-section).
 *
 * @since 1.0.0
 * @package TworkBuilder
 */

(function () {
    'use strict';

    function getFilterElements() {
        var filterSection = document.querySelector('.twork-doctor-search-filter-section') || document;
        return {
            searchInput: filterSection.querySelector('#searchInput'),
            deptFilter: filterSection.querySelector('#deptFilter'),
            genderFilter: filterSection.querySelector('#genderFilter'),
            resetBtn: filterSection.querySelector('#resetBtn')
        };
    }

    function filterDoctorsInSection(section) {
        var grid = section.querySelector('#doctorsGrid, .doctors-grid');
        var noResults = section.querySelector('#noResults, .no-results');
        var cards = section ? section.querySelectorAll('.doctor-card') : [];

        if (!grid || !noResults || !cards.length) return;

        var els = getFilterElements();
        var searchText = (els.searchInput && els.searchInput.value) ? els.searchInput.value.toLowerCase().trim() : '';
        var deptValue = (els.deptFilter && els.deptFilter.value) ? els.deptFilter.value : 'all';
        var genderValue = (els.genderFilter && els.genderFilter.value) ? els.genderFilter.value : 'all';

        var visibleCount = 0;
        var i, name, dept, gender, matchesSearch, matchesDept, matchesGender;

        for (i = 0; i < cards.length; i++) {
            name = (cards[i].getAttribute('data-name') || '').toLowerCase();
            dept = cards[i].getAttribute('data-dept') || '';
            gender = cards[i].getAttribute('data-gender') || '';

            matchesSearch = !searchText || name.indexOf(searchText) !== -1;
            matchesDept = deptValue === 'all' || dept === deptValue;
            matchesGender = genderValue === 'all' || gender === genderValue;

            if (matchesSearch && matchesDept && matchesGender) {
                cards[i].style.display = '';
                cards[i].removeAttribute('hidden');
                visibleCount++;
            } else {
                cards[i].style.display = 'none';
                cards[i].setAttribute('hidden', '');
            }
        }

        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    function resetSection(section) {
        var noResults = section.querySelector('#noResults, .no-results');
        var cards = section ? section.querySelectorAll('.doctor-card') : [];
        var i;
        for (i = 0; i < cards.length; i++) {
            cards[i].style.display = '';
            cards[i].removeAttribute('hidden');
        }
        if (noResults) noResults.style.display = 'none';
    }

    function initDoctorDirectorySections() {
        var sections = document.querySelectorAll('.doctor-directory.twork-doctor-directory-section, .twork-doctor-directory-section');
        if (!sections.length) return;

        var els = getFilterElements();
        var j;

        function runFilter() {
            for (j = 0; j < sections.length; j++) {
                filterDoctorsInSection(sections[j]);
            }
        }

        if (els.searchInput) {
            els.searchInput.addEventListener('input', runFilter);
            els.searchInput.addEventListener('keyup', runFilter);
        }
        if (els.deptFilter) els.deptFilter.addEventListener('change', runFilter);
        if (els.genderFilter) els.genderFilter.addEventListener('change', runFilter);

        if (els.resetBtn) {
            els.resetBtn.addEventListener('click', function () {
                if (els.searchInput) els.searchInput.value = '';
                if (els.deptFilter) els.deptFilter.value = 'all';
                if (els.genderFilter) els.genderFilter.value = 'all';
                for (j = 0; j < sections.length; j++) {
                    resetSection(sections[j]);
                }
            });
        }

        runFilter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDoctorDirectorySections);
    } else {
        initDoctorDirectorySections();
    }

    window.TworkDoctorDirectorySection = { init: initDoctorDirectorySections, version: '1.0.0' };
})();
