/**
 * Laparoscopy compare — draw the relative scale bars on scroll (vanilla).
 *
 * Mirrors the GSAP `scaleX` tween in laparoscopy.html without the dependency:
 * the CSS transition does the easing, this only flips the transform once the
 * row enters the viewport.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-compare';
	const BAR_SELECTOR = '.lp-cmp-bar i';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function drawBar( bar ) {
		const scale = parseFloat( bar.getAttribute( 'data-scale' ) );
		bar.style.transform = 'scaleX(' + ( isNaN( scale ) ? 1 : scale ) + ')';
	}

	function bindSection( section ) {
		if ( section.dataset.laparoCompareBound === '1' ) {
			return;
		}
		section.dataset.laparoCompareBound = '1';

		const bars = section.querySelectorAll( BAR_SELECTOR );
		if ( ! bars.length ) {
			return;
		}

		const IO = window.IntersectionObserver;
		if ( reduced || ! IO ) {
			bars.forEach( drawBar );
			return;
		}

		const observer = new IO(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( ! entry.isIntersecting ) {
						return;
					}
					drawBar( entry.target );
					observer.unobserve( entry.target );
				} );
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
		);

		bars.forEach( function ( bar ) {
			observer.observe( bar );
		} );
	}

	function init() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( bindSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
