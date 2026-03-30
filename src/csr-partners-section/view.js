/**
 * Pure JavaScript for CSR Partners Section Scroll Animations
 * Uses Intersection Observer API - no GSAP dependency.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

( function () {
	'use strict';

	function initCsrPartnersSection() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			const grids = document.querySelectorAll(
				'.twork-csr-partners-section .logo-grid.fade-up'
			);
			grids.forEach( ( el ) => el.classList.add( 'is-visible' ) );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-csr-partners-section[data-animation="true"]'
		);
		if ( ! sections.length ) return;

		const observerOptions = {
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px',
		};

		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					entry.target.classList.add( 'is-visible' );
					observer.unobserve( entry.target );
				}
			} );
		}, observerOptions );

		sections.forEach( ( section ) => {
			const grid = section.querySelector( '.logo-grid.fade-up' );
			if ( grid ) observer.observe( grid );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCsrPartnersSection );
	} else {
		initCsrPartnersSection();
	}

	window.addEventListener( 'load', initCsrPartnersSection );
	window.TworkCsrPartnersSection = {
		init: initCsrPartnersSection,
		version: '1.0.0',
	};
} )();
