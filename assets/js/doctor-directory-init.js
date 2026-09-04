/**
 * Doctor Directory Section – front-end filter (search, department, gender).
 * Enqueued globally so filtering works regardless of block viewScript build.
 * Cards must have .doctor-card and data-dept, data-gender, data-name.
 * Filter bar must have #searchInput, #deptFilter, #genderFilter, #resetBtn
 * (from twork/doctor-search-filter-section).
 *
 * @since 1.0.0
 * @package
 */

( function () {
	'use strict';

	function getFilterElements() {
		const filterSection =
			document.querySelector(
				'.mk-doctor-search-filter-section, .wp-block-twork-doctor-search-filter-section, .twork-doctor-search-filter-section'
			) || document;
		return {
			searchInput: filterSection.querySelector( '#searchInput' ),
			deptFilter: filterSection.querySelector( '#deptFilter' ),
			genderFilter: filterSection.querySelector( '#genderFilter' ),
			resetBtn: filterSection.querySelector( '#resetBtn' ),
		};
	}

	function filterDoctorsInSection( section, state ) {
		const grid = section.querySelector( '#doctorsGrid, .doctors-grid' );
		const noResults = section.querySelector( '#noResults, .no-results' );
		const cards = section ? section.querySelectorAll( '.doctor-card' ) : [];

		if ( ! grid || ! noResults || ! cards.length ) {
			return;
		}

		let visibleCount = 0;
		let i, name, dept, gender, matchesSearch, matchesDept, matchesGender;

		for ( i = 0; i < cards.length; i++ ) {
			name = (
				cards[ i ].getAttribute( 'data-name' ) || ''
			).toLowerCase();
			dept = cards[ i ].getAttribute( 'data-dept' ) || '';
			gender = cards[ i ].getAttribute( 'data-gender' ) || '';

			matchesSearch =
				! state.searchText || name.indexOf( state.searchText ) !== -1;
			matchesDept = state.deptValue === 'all' || dept === state.deptValue;
			matchesGender =
				state.genderValue === 'all' || gender === state.genderValue;

			if ( matchesSearch && matchesDept && matchesGender ) {
				cards[ i ].style.removeProperty( 'display' );
				cards[ i ].removeAttribute( 'hidden' );
				cards[ i ].hidden = false;
				visibleCount++;
			} else {
				cards[ i ].style.setProperty( 'display', 'none', 'important' );
				cards[ i ].setAttribute( 'hidden', '' );
				cards[ i ].hidden = true;
			}
		}

		if ( visibleCount === 0 ) {
			noResults.style.display = 'block';
		} else {
			noResults.style.display = 'none';
		}
	}

	function resetSection( section ) {
		const noResults = section.querySelector( '#noResults, .no-results' );
		const cards = section ? section.querySelectorAll( '.doctor-card' ) : [];
		let i;
		for ( i = 0; i < cards.length; i++ ) {
			cards[ i ].style.removeProperty( 'display' );
			cards[ i ].removeAttribute( 'hidden' );
			cards[ i ].hidden = false;
		}
		if ( noResults ) {
			noResults.style.display = 'none';
		}
	}

	function debounce( fn, wait ) {
		let timeout;
		return function () {
			const args = arguments;
			clearTimeout( timeout );
			timeout = setTimeout( function () {
				fn.apply( null, args );
			}, wait );
		};
	}

	function initDoctorDirectorySections() {
		const sections = document.querySelectorAll(
			'.doctor-directory.mk-doctor-directory-section, .mk-doctor-directory-section, .doctor-directory.wp-block-twork-doctor-directory-section, .wp-block-twork-doctor-directory-section, .doctor-directory.twork-doctor-directory-section, .twork-doctor-directory-section'
		);
		if ( ! sections.length ) {
			return;
		}

		const els = getFilterElements();
		let j;

		function getState() {
			return {
				searchText:
					els.searchInput && els.searchInput.value
						? els.searchInput.value.toLowerCase().trim()
						: '',
				deptValue:
					els.deptFilter && els.deptFilter.value
						? els.deptFilter.value
						: 'all',
				genderValue:
					els.genderFilter && els.genderFilter.value
						? els.genderFilter.value
						: 'all',
			};
		}

		function runFilter() {
			const state = getState();
			for ( j = 0; j < sections.length; j++ ) {
				filterDoctorsInSection( sections[ j ], state );
			}
		}

		const debouncedRunFilter = debounce( runFilter, 120 );

		if ( els.searchInput ) {
			els.searchInput.addEventListener( 'input', debouncedRunFilter );
		}
		if ( els.deptFilter ) {
			els.deptFilter.addEventListener( 'change', runFilter );
		}
		if ( els.genderFilter ) {
			els.genderFilter.addEventListener( 'change', runFilter );
		}

		if ( els.resetBtn ) {
			els.resetBtn.addEventListener( 'click', function () {
				if ( els.searchInput ) {
					els.searchInput.value = '';
				}
				if ( els.deptFilter ) {
					els.deptFilter.value = 'all';
				}
				if ( els.genderFilter ) {
					els.genderFilter.value = 'all';
				}
				for ( j = 0; j < sections.length; j++ ) {
					resetSection( sections[ j ] );
				}
			} );
		}

		runFilter();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener(
			'DOMContentLoaded',
			initDoctorDirectorySections
		);
	} else {
		initDoctorDirectorySections();
	}

	window.TworkDoctorDirectorySection = {
		init: initDoctorDirectorySections,
		version: '1.0.3',
	};
} )();
