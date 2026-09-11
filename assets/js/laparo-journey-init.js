/**
 * Laparoscopy journey — vertical rail progress and the sticky step counter.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-journey';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function pad( n ) {
		return ( n < 10 ? '0' : '' ) + n;
	}

	function bindSection( section ) {
		if ( section.dataset.laparoJourneyBound === '1' ) {
			return;
		}
		section.dataset.laparoJourneyBound = '1';

		const track = section.querySelector( '[data-laparo-steps]' );
		const steps = Array.prototype.slice.call(
			section.querySelectorAll( '.lp-jr-step' )
		);

		if ( ! track || ! steps.length ) {
			return;
		}

		function visibleSteps() {
			return steps.filter( function ( step ) {
				return ! step.hidden;
			} );
		}

		function setTotal() {
			const el = section.querySelector( '[data-laparo-step-total]' );
			if ( el ) {
				el.textContent = ' / ' + pad( visibleSteps().length );
			}
		}

		setTotal();

		if ( reduced ) {
			const railFill = section.querySelector( '.lp-jr-progress' );
			if ( railFill ) {
				railFill.style.transform = 'scaleY(1)';
			}
			steps.forEach( function ( step ) {
				step.classList.add( 'is-on' );
			} );
			return;
		}

		const progress = section.querySelector( '.lp-jr-progress' );
		const now = section.querySelector( '[data-laparo-step-now]' );

		let ticking = false;

		function update() {
			ticking = false;

			const rect = track.getBoundingClientRect();
			const viewHeight = window.innerHeight || 1;
			const start = viewHeight * 0.7;
			const end = viewHeight * 0.3;
			let ratio = ( start - rect.top ) / ( rect.height + start - end );
			ratio = Math.max( 0, Math.min( 1, ratio ) );

			if ( progress ) {
				progress.style.transform = 'scaleY(' + ratio + ')';
			}

			const shown = visibleSteps();
			let current = 0;

			shown.forEach( function ( step, index ) {
				if ( step.getBoundingClientRect().top < viewHeight * 0.72 ) {
					step.classList.add( 'is-on' );
					current = index;
				}
			} );

			if ( now && shown.length ) {
				now.textContent = pad( current + 1 );
			}
			setTotal();
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
