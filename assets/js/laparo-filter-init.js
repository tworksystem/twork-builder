/**
 * Laparoscopy condition filter — the page's spine.
 *
 * The selector writes the chosen condition to the document element; every
 * element on the page carrying data-conditions then shows or hides itself.
 * An element with an empty data-conditions always shows, so a page with no
 * keys set behaves exactly as if there were no filter at all.
 *
 * Filterable elements must declare `&[hidden] { display: none; }` in their own
 * stylesheet — an explicit `display` in CSS beats the `hidden` attribute.
 */
( function () {
	'use strict';

	const SELECTOR_SECTION = '[data-laparo-selector]';
	const OPTION_SELECTOR = '.lp-opt';
	const FILTERABLE = '[data-conditions]';
	const LABEL_SELECTOR = '[data-laparo-label]';
	const RESET_SELECTOR = '[data-laparo-reset]';
	const EMPTY_SELECTOR = '[data-laparo-empty]';

	function keysOf( el ) {
		const raw = el.getAttribute( 'data-conditions' ) || '';
		// Tolerate commas, whitespace or both.
		return raw
			.split( /[,\s]+/ )
			.map( function ( k ) {
				return k.trim().toLowerCase();
			} )
			.filter( Boolean );
	}

	function apply( condition, section ) {
		const root = document.documentElement;

		if ( condition ) {
			root.dataset.laparoCondition = condition;
		} else {
			delete root.dataset.laparoCondition;
		}

		document.querySelectorAll( FILTERABLE ).forEach( function ( el ) {
			const keys = keysOf( el );
			const show =
				! condition ||
				! keys.length ||
				keys.indexOf( condition ) !== -1;
			el.hidden = ! show;
		} );

		// A table whose rows are all filtered out says so instead of
		// collapsing to a bare header.
		document
			.querySelectorAll( EMPTY_SELECTOR )
			.forEach( function ( notice ) {
				const scope = notice.parentElement;
				if ( ! scope ) {
					return;
				}
				const rows = scope.querySelectorAll( FILTERABLE );
				const visible = Array.prototype.filter.call(
					rows,
					function ( row ) {
						return ! row.hidden;
					}
				).length;
				notice.hidden = ! rows.length || visible > 0;
			} );

		if ( ! section ) {
			return;
		}

		const active = section.querySelector(
			'.lp-opt[data-condition="' + condition + '"]'
		);
		const label = section.querySelector( LABEL_SELECTOR );
		if ( label ) {
			label.textContent = active
				? active.textContent.trim().replace( /\s+/g, ' ' )
				: label.getAttribute( 'data-laparo-label' ) || '';
		}

		const reset = section.querySelector( RESET_SELECTOR );
		if ( reset ) {
			reset.hidden = ! condition;
		}
	}

	function bindSelector( section ) {
		if ( section.dataset.laparoFilterBound === '1' ) {
			return;
		}
		section.dataset.laparoFilterBound = '1';

		const options = Array.prototype.slice.call(
			section.querySelectorAll( OPTION_SELECTOR )
		);

		function select( condition ) {
			options.forEach( function ( other ) {
				const active =
					condition &&
					(
						other.getAttribute( 'data-condition' ) || ''
					).toLowerCase() === condition;
				other.classList.toggle( 'is-active', !! active );
				other.setAttribute( 'aria-pressed', active ? 'true' : 'false' );
			} );

			apply( condition, section );
		}

		options.forEach( function ( option ) {
			option.addEventListener( 'click', function () {
				const condition = (
					option.getAttribute( 'data-condition' ) || ''
				).toLowerCase();

				// Clicking the active option clears the filter.
				select(
					option.classList.contains( 'is-active' ) ? '' : condition
				);
			} );
		} );

		const reset = section.querySelector( RESET_SELECTOR );
		if ( reset ) {
			reset.addEventListener( 'click', function () {
				select( '' );
			} );
		}

		select( '' );
	}

	function initLaparoFilter() {
		const sections = document.querySelectorAll( SELECTOR_SECTION );
		if ( ! sections.length ) {
			return;
		}
		sections.forEach( bindSelector );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initLaparoFilter );
	} else {
		initLaparoFilter();
	}
} )();
