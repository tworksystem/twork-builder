/**
 * Endoscopy testimonials — marquee duplicate row + reduced-motion guard.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-testimonials-section';
	const ROW_SELECTOR = '.endo-testimonials-row';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function duplicateRow( row ) {
		const children = row.children;
		if ( ! children.length ) {
			return;
		}

		Array.from( children ).forEach( function ( child ) {
			const clone = child.cloneNode( true );
			clone.setAttribute( 'aria-hidden', 'true' );
			row.appendChild( clone );
		} );
	}

	function initTestimonialsSection( section ) {
		if ( section.dataset.endoTestimonialsBound === '1' ) {
			return;
		}
		section.dataset.endoTestimonialsBound = '1';

		const row = section.querySelector( ROW_SELECTOR );
		if ( ! row ) {
			return;
		}

		const marqueeEnabled = section.getAttribute( 'data-marquee' ) === '1';
		const duplicateLoop =
			section.getAttribute( 'data-duplicate-loop' ) === '1';

		if ( ! marqueeEnabled || reduced ) {
			row.classList.add( 'is-static' );
			return;
		}

		if ( duplicateLoop && ! row.dataset.endoDuplicated ) {
			row.dataset.endoDuplicated = '1';
			duplicateRow( row );
		}
	}

	function initEndoTestimonials() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( initTestimonialsSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoTestimonials );
	} else {
		initEndoTestimonials();
	}
} )();
