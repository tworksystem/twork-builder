( function () {
	'use strict';

	/**
	 * Initialize Journey Steps Section Animations
	 * Handles scroll animations and hover effects for step cards
	 *
	 * @since 1.0.0
	 * @author Twork Builder
	 * @follows WordPress Coding Standards (WPCS)
	 */
	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	let initialized = false;

	const initJourneySteps = () => {
		if ( initialized ) {
			return;
		}
		initialized = true;

		if ( prefersReducedMotion || ! ( 'IntersectionObserver' in window ) ) {
			const allCards = document.querySelectorAll(
				'.twork-journey-steps-section .step-card, .twork-how-it-works-section .step-card'
			);
			allCards.forEach( ( card ) => {
				card.style.opacity = '1';
				card.style.transform = 'none';
				card.classList.add( 'is-visible' );
			} );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-journey-steps-section, .twork-how-it-works-section'
		);

		if ( sections.length === 0 ) {
			return;
		}

		sections.forEach( ( section ) => {
			const animationEnabled = section.dataset.animation === 'true';
			const animationDelay =
				parseInt( section.dataset.animationDelay, 10 ) || 100;
			const animationType = section.dataset.animationType || 'fadeInUp';
			const stepCards = section.querySelectorAll( '.step-card' );

			if ( animationEnabled && stepCards.length > 0 ) {
				stepCards.forEach( ( card, index ) => {
					if ( ! card.classList.contains( 'animate-on-scroll' ) ) {
						card.classList.add( 'animate-on-scroll' );
					}
					card.setAttribute( 'data-animation-type', animationType );

					switch ( animationType ) {
						case 'fadeIn':
							card.style.opacity = '0';
							break;
						case 'fadeInUp':
							card.style.opacity = '0';
							card.style.transform = 'translateY(30px)';
							break;
						case 'slideInLeft':
							card.style.opacity = '0';
							card.style.transform = 'translateX(-50px)';
							break;
						case 'slideInRight':
							card.style.opacity = '0';
							card.style.transform = 'translateX(50px)';
							break;
						case 'zoomIn':
							card.style.opacity = '0';
							card.style.transform = 'scale(0.8)';
							break;
						default:
							card.style.opacity = '0';
							card.style.transform = 'translateY(30px)';
					}

					card.style.transitionDelay = `${
						index * animationDelay
					}ms`;
				} );

				const observerOptions = {
					threshold: 0.15,
					rootMargin: '0px 0px -10% 0px',
				};

				const observer = new IntersectionObserver( ( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
							requestAnimationFrame( () => {
								entry.target.style.opacity = '1';
								entry.target.style.transform =
									'translateY(0) translateX(0) scale(1)';
							} );
							const delay =
								parseInt(
									entry.target.style.transitionDelay,
									10
								) || 0;
							setTimeout( () => {
								observer.unobserve( entry.target );
							}, 800 + delay );
						}
					} );
				}, observerOptions );

				stepCards.forEach( ( card ) => {
					observer.observe( card );
				} );
			} else if ( ! animationEnabled && stepCards.length > 0 ) {
				stepCards.forEach( ( card ) => {
					card.style.opacity = '1';
					card.style.transform = 'none';
					card.classList.remove( 'animate-on-scroll' );
				} );
			}
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initJourneySteps );
	} else {
		initJourneySteps();
	}

	window.addEventListener( 'load', initJourneySteps );

	window.TworkJourneySteps = {
		init: initJourneySteps,
		version: '1.0.1',
	};
} )();
