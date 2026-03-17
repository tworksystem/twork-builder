/**
 * Doctor Directory Section – filter logic (search, department, gender).
 * Pure JavaScript; no GSAP dependency. Follows team-members-grid / services-grid standards.
 * Cards must have data-dept, data-gender, data-name for filtering.
 *
 * @since 1.0.0
 * @package TworkBuilder
 */

(function () {
    'use strict';

    /**
     * Locate filter controls, scoped to the doctor-search-filter block if present.
     * Falls back to document-level lookup for backward compatibility.
     */
    function getFilterElements() {
        const filterSection = document.querySelector('.twork-doctor-search-filter-section') || document;
        return {
            searchInput: filterSection.querySelector('#searchInput'),
            deptFilter: filterSection.querySelector('#deptFilter'),
            genderFilter: filterSection.querySelector('#genderFilter'),
            resetBtn: filterSection.querySelector('#resetBtn')
        };
    }

    /**
     * Run filter logic for a single section.
     * @param {HTMLElement} section - .doctor-directory or .twork-doctor-directory-section
     */
    function filterDoctorsInSection(section) {
        const grid = section.querySelector('#doctorsGrid, .doctors-grid');
        const noResults = section.querySelector('#noResults, .no-results');
        const cards = section ? section.querySelectorAll('.doctor-card') : [];

        if (!grid || !noResults || !cards.length) return;

        const { searchInput, deptFilter, genderFilter } = getFilterElements();

        const searchText = (searchInput && searchInput.value) ? searchInput.value.toLowerCase().trim() : '';
        const deptValue = (deptFilter && deptFilter.value) ? deptFilter.value : 'all';
        const genderValue = (genderFilter && genderFilter.value) ? genderFilter.value : 'all';

        let visibleCount = 0;

        cards.forEach(function (card) {
            const name = (card.getAttribute('data-name') || '').toLowerCase();
            const dept = card.getAttribute('data-dept') || '';
            const gender = card.getAttribute('data-gender') || '';

            const matchesSearch = !searchText || name.indexOf(searchText) !== -1;
            const matchesDept = deptValue === 'all' || dept === deptValue;
            const matchesGender = genderValue === 'all' || gender === genderValue;

            if (matchesSearch && matchesDept && matchesGender) {
                card.style.display = '';
                card.removeAttribute('hidden');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.setAttribute('hidden', '');
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    /**
     * Reset filters and show all cards in a section.
     * @param {HTMLElement} section
     */
    function resetSection(section) {
        const noResults = section.querySelector('#noResults, .no-results');
        const cards = section ? section.querySelectorAll('.doctor-card') : [];
        cards.forEach(function (card) {
            card.style.display = '';
            card.removeAttribute('hidden');
        });
        if (noResults) noResults.style.display = 'none';
    }

    /**
     * Bind filter UI to all doctor directory sections on the page.
     */
    function initDoctorDirectorySections() {
        const sections = document.querySelectorAll('.doctor-directory.twork-doctor-directory-section, .twork-doctor-directory-section');
        if (!sections.length) return;

        const { searchInput, deptFilter, genderFilter, resetBtn } = getFilterElements();

        function runFilter() {
            sections.forEach(filterDoctorsInSection);
        }

        if (searchInput) {
            searchInput.addEventListener('input', runFilter);
            searchInput.addEventListener('keyup', runFilter);
        }
        if (deptFilter) deptFilter.addEventListener('change', runFilter);
        if (genderFilter) genderFilter.addEventListener('change', runFilter);

        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                if (searchInput) searchInput.value = '';
                if (deptFilter) deptFilter.value = 'all';
                if (genderFilter) genderFilter.value = 'all';
                sections.forEach(resetSection);
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
