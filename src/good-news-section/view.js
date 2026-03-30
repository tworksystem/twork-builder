/**
 * Pure JavaScript for Good News Section Scroll Animations
 * No GSAP dependency - uses Intersection Observer API and CSS transitions.
 * Follows team-members-grid / services-grid standards.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

( function () {
	'use strict';

	/**
	 * Initialize Good News Section scroll animations.
	 * Adds is-visible to section when in viewport; CSS handles transitions.
	 */
	function initGoodNewsSection() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			const sections = document.querySelectorAll(
				'.good-news-section[data-animation="true"], .twork-good-news-section[data-animation="true"]'
			);
			sections.forEach( ( el ) => {
				el.classList.add( 'is-visible' );
			} );
			return;
		}

		const sections = document.querySelectorAll(
			'.good-news-section[data-animation="true"], .twork-good-news-section[data-animation="true"]'
		);
		if ( ! sections.length ) return;

		const observerOptions = {
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px',
		};

		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if (
					entry.isIntersecting &&
					! entry.target.classList.contains( 'is-visible' )
				) {
					entry.target.classList.add( 'is-visible' );
					observer.unobserve( entry.target );
				}
			} );
		}, observerOptions );

		sections.forEach( ( section ) => observer.observe( section ) );
	}

	function debounce( fn, wait ) {
		let t;
		return function ( ...args ) {
			clearTimeout( t );
			t = setTimeout( () => fn.apply( this, args ), wait );
		};
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initGoodNewsSection );
	} else {
		initGoodNewsSection();
	}

	window.addEventListener( 'load', initGoodNewsSection );
	window.addEventListener( 'resize', debounce( initGoodNewsSection, 250 ) );

	window.TworkGoodNewsSection = {
		init: initGoodNewsSection,
		version: '1.0.0',
	};
} )();
