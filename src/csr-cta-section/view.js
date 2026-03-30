/**
 * Pure JavaScript for CSR CTA Section Scroll Animations
 * Uses Intersection Observer API.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

( function () {
	'use strict';

	function initCsrCtaSection() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			const containers = document.querySelectorAll(
				'.twork-csr-cta-section .jivaka-container.fade-up'
			);
			containers.forEach( ( el ) => el.classList.add( 'is-visible' ) );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-csr-cta-section[data-animation="true"]'
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
			const container = section.querySelector(
				'.jivaka-container.fade-up'
			);
			if ( container ) observer.observe( container );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCsrCtaSection );
	} else {
		initCsrCtaSection();
	}

	window.addEventListener( 'load', initCsrCtaSection );
	window.TworkCsrCtaSection = { init: initCsrCtaSection, version: '1.0.0' };
} )();
