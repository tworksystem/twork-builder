/**
 * Endoscopy stats strip — count-up animation (vanilla, no GSAP).
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-stats-section';
	const NUM_SELECTOR = '.num[data-count]';

	function prefersReducedMotion() {
		return window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	}

	function formatSuffix( el ) {
		return el.getAttribute( 'data-suffix' ) || '';
	}

	function setFinalValue( el, target, suffix ) {
		el.innerHTML = Math.round( target ).toLocaleString() + suffix;
	}

	function animateCount( el ) {
		if ( el.dataset.endoCountDone === '1' ) {
			return;
		}
		el.dataset.endoCountDone = '1';

		const target = parseFloat( el.getAttribute( 'data-count' ) );
		if ( Number.isNaN( target ) ) {
			return;
		}

		const suffix = formatSuffix( el );
		const section = el.closest( SECTION_SELECTOR );
		const respectReduced =
			section &&
			section.getAttribute( 'data-reduced-motion' ) === '1' &&
			prefersReducedMotion();
		const enabled =
			section && section.getAttribute( 'data-counter-animation' ) === '1';

		if ( ! enabled || respectReduced ) {
			setFinalValue( el, target, suffix );
			return;
		}

		// Saved markup shows the final number; reset before count-up.
		el.innerHTML = '0' + suffix;

		const start = 0;
		const duration = 2000;
		let startTime = null;

		function step( timestamp ) {
			if ( ! startTime ) {
				startTime = timestamp;
			}
			const progress = Math.min(
				( timestamp - startTime ) / duration,
				1
			);
			const eased = 1 - Math.pow( 1 - progress, 3 );
			const current = start + ( target - start ) * eased;
			el.innerHTML = Math.round( current ).toLocaleString() + suffix;
			if ( progress < 1 ) {
				window.requestAnimationFrame( step );
			}
		}

		window.requestAnimationFrame( step );
	}

	function bindCounters( section ) {
		const nums = section.querySelectorAll( NUM_SELECTOR );
		if ( ! nums.length ) {
			return;
		}

		if ( ! window.IntersectionObserver ) {
			nums.forEach( animateCount );
			return;
		}

		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						animateCount( entry.target );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ root: null, threshold: 0.2 }
		);

		nums.forEach( function ( el ) {
			observer.observe( el );
		} );
	}

	function initEndoStats() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( function ( section ) {
				if ( section.dataset.endoStatsBound === '1' ) {
					return;
				}
				section.dataset.endoStatsBound = '1';
				bindCounters( section );
			} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoStats );
	} else {
		initEndoStats();
	}
} )();
