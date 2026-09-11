/**
 * Laparoscopy stats — count each figure up when its band scrolls in.
 *
 * Vanilla port of the GSAP tween in laparoscopy.html: requestAnimationFrame
 * drives the value, IntersectionObserver decides when to start.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-stats';
	const FIGURE_SELECTOR = '.lp-figure[data-count]';
	const DURATION = 1800;
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function print( el, value, suffix ) {
		el.textContent = Math.round( value ).toLocaleString() + suffix;
	}

	function run( el ) {
		if ( el.dataset.laparoCounted === '1' ) {
			return;
		}
		el.dataset.laparoCounted = '1';

		const target = parseFloat( el.getAttribute( 'data-count' ) );
		const suffix = el.getAttribute( 'data-suffix' ) || '';

		if ( isNaN( target ) ) {
			return;
		}

		const raf = window.requestAnimationFrame;
		if ( reduced || ! raf ) {
			print( el, target, suffix );
			return;
		}

		const started = window.performance
			? window.performance.now()
			: Date.now();

		function step( now ) {
			const elapsed = now - started;
			const progress = Math.min( 1, elapsed / DURATION );
			// easeOutQuad, matching the GSAP power2.out feel.
			const eased = 1 - ( 1 - progress ) * ( 1 - progress );
			print( el, target * eased, suffix );

			if ( progress < 1 ) {
				raf( step );
			}
		}

		raf( step );
	}

	function bindSection( section ) {
		if ( section.dataset.laparoStatsBound === '1' ) {
			return;
		}
		section.dataset.laparoStatsBound = '1';

		const figures = section.querySelectorAll( FIGURE_SELECTOR );
		if ( ! figures.length ) {
			return;
		}

		const IO = window.IntersectionObserver;
		if ( reduced || ! IO ) {
			figures.forEach( run );
			return;
		}

		const observer = new IO(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( ! entry.isIntersecting ) {
						return;
					}
					run( entry.target );
					observer.unobserve( entry.target );
				} );
			},
			{ threshold: 0.35 }
		);

		figures.forEach( function ( figure ) {
			observer.observe( figure );
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
