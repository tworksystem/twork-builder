/**
 * Laparoscopy recovery — draw the rail and light each mark as it arrives.
 *
 * Vanilla port of the GSAP scrub in laparoscopy.html: the fill is driven by
 * the rail's position in the viewport on scroll, throttled to one read per
 * animation frame.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-recovery';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function bindSection( section ) {
		if ( section.dataset.laparoRecoveryBound === '1' ) {
			return;
		}
		section.dataset.laparoRecoveryBound = '1';

		const rail = section.querySelector( '[data-laparo-rail]' );
		const marks = section.querySelectorAll( '.lp-mark' );

		if ( ! rail || ! marks.length ) {
			return;
		}

		const fill = section.querySelector( '.lp-rec-fill' );

		if ( reduced ) {
			if ( fill ) {
				fill.style.transform = 'scaleX(1)';
			}
			marks.forEach( function ( mark ) {
				mark.classList.add( 'is-on' );
			} );
			return;
		}

		let ticking = false;

		function update() {
			ticking = false;

			const rect = rail.getBoundingClientRect();
			const viewHeight = window.innerHeight || 1;
			const start = viewHeight * 0.74;
			const end = viewHeight * 0.34;
			let progress = ( start - rect.top ) / ( rect.height + start - end );
			progress = Math.max( 0, Math.min( 1, progress ) );

			if ( fill ) {
				fill.style.transform = 'scaleX(' + progress + ')';
			}

			marks.forEach( function ( mark ) {
				const markTop = mark.getBoundingClientRect().top;
				if ( markTop < viewHeight * 0.82 ) {
					mark.classList.add( 'is-on' );
				}
			} );
		}

		function onScroll() {
			if ( ticking ) {
				return;
			}
			ticking = true;
			const raf = window.requestAnimationFrame;
			if ( raf ) {
				raf( update );
			} else {
				update();
			}
		}

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		window.addEventListener( 'resize', onScroll );
		update();
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
