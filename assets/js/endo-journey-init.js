/**
 * Endoscopy journey — track fill progress + step activation (vanilla).
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-journey-section';
	const TRACK_SELECTOR = '.endo-journey-track';
	const FILL_SELECTOR = '.endo-journey-track-fill';
	const STEP_SELECTOR = '.step';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function bindTrackFill( section, track, fill ) {
		if ( reduced || track.getAttribute( 'data-track-animation' ) !== '1' ) {
			fill.classList.add( 'is-drawn' );
			return;
		}

		function updateFill() {
			const rect = track.getBoundingClientRect();
			const viewHeight = window.innerHeight || 1;
			const start = viewHeight * 0.72;
			const end = viewHeight * 0.35;
			let progress = ( start - rect.top ) / ( rect.height + start - end );
			progress = Math.max( 0, Math.min( 1, progress ) );
			fill.style.transform = 'scaleX(' + progress + ')';
		}

		updateFill();
		window.addEventListener( 'scroll', updateFill, { passive: true } );
		window.addEventListener( 'resize', updateFill );
	}

	function bindStepActivation( section, steps ) {
		if ( reduced ) {
			steps.forEach( function ( step ) {
				step.classList.add( 'is-on' );
			} );
			return;
		}

		steps.forEach( function ( step ) {
			const observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							step.classList.add( 'is-on' );
						}
					} );
				},
				{
					root: null,
					rootMargin: '-30% 0px -30% 0px',
					threshold: 0,
				}
			);
			observer.observe( step );
		} );
	}

	function initJourneySection( section ) {
		if ( section.dataset.endoJourneyBound === '1' ) {
			return;
		}
		section.dataset.endoJourneyBound = '1';

		const track = section.querySelector( TRACK_SELECTOR );
		if ( ! track ) {
			return;
		}

		const fill = track.querySelector( FILL_SELECTOR );
		const steps = track.querySelectorAll( STEP_SELECTOR );

		if ( fill ) {
			bindTrackFill( section, track, fill );
		}

		if ( steps.length ) {
			bindStepActivation( section, steps );
		}
	}

	function initEndoJourney() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( initJourneySection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoJourney );
	} else {
		initEndoJourney();
	}
} )();
