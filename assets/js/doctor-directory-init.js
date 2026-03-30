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

( function () {
	'use strict';

	function getFilterElements() {
		var filterSection =
			document.querySelector( '.twork-doctor-search-filter-section' ) ||
			document;
		return {
			searchInput: filterSection.querySelector( '#searchInput' ),
			deptFilter: filterSection.querySelector( '#deptFilter' ),
			genderFilter: filterSection.querySelector( '#genderFilter' ),
			resetBtn: filterSection.querySelector( '#resetBtn' ),
		};
	}

	function filterDoctorsInSection( section, state ) {
		var grid = section.querySelector( '#doctorsGrid, .doctors-grid' );
		var noResults = section.querySelector( '#noResults, .no-results' );
		var cards = section ? section.querySelectorAll( '.doctor-card' ) : [];

		if ( ! grid || ! noResults || ! cards.length ) return;

		var visibleCount = 0;
		var i, name, dept, gender, matchesSearch, matchesDept, matchesGender;

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
				cards[ i ].style.display = '';
				cards[ i ].removeAttribute( 'hidden' );
				visibleCount++;
			} else {
				cards[ i ].style.display = 'none';
				cards[ i ].setAttribute( 'hidden', '' );
			}
		}

		if ( visibleCount === 0 ) {
			noResults.style.display = 'block';
		} else {
			noResults.style.display = 'none';
		}
	}

	function resetSection( section ) {
		var noResults = section.querySelector( '#noResults, .no-results' );
		var cards = section ? section.querySelectorAll( '.doctor-card' ) : [];
		var i;
		for ( i = 0; i < cards.length; i++ ) {
			cards[ i ].style.display = '';
			cards[ i ].removeAttribute( 'hidden' );
		}
		if ( noResults ) noResults.style.display = 'none';
	}

	function debounce( fn, wait ) {
		var timeout;
		return function () {
			var args = arguments;
			clearTimeout( timeout );
			timeout = setTimeout( function () {
				fn.apply( null, args );
			}, wait );
		};
	}

	function initDoctorDirectorySections() {
		var sections = document.querySelectorAll(
			'.doctor-directory.twork-doctor-directory-section, .twork-doctor-directory-section'
		);
		if ( ! sections.length ) return;

		var els = getFilterElements();
		var j;

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
			var state = getState();
			for ( j = 0; j < sections.length; j++ ) {
				filterDoctorsInSection( sections[ j ], state );
			}
		}

		var debouncedRunFilter = debounce( runFilter, 120 );

		if ( els.searchInput ) {
			els.searchInput.addEventListener( 'input', debouncedRunFilter );
		}
		if ( els.deptFilter )
			els.deptFilter.addEventListener( 'change', runFilter );
		if ( els.genderFilter )
			els.genderFilter.addEventListener( 'change', runFilter );

		if ( els.resetBtn ) {
			els.resetBtn.addEventListener( 'click', function () {
				if ( els.searchInput ) els.searchInput.value = '';
				if ( els.deptFilter ) els.deptFilter.value = 'all';
				if ( els.genderFilter ) els.genderFilter.value = 'all';
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
		version: '1.0.1',
	};
} )();
