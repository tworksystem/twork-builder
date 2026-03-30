( function () {
	'use strict';

	/**
	 * Initialize Testimonial Section Animations
	 * Handles scroll animations for testimonial cards
	 *
	 * @since 1.0.0
	 * @author Twork Builder
	 * @follows WordPress Coding Standards (WPCS)
	 */
	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	let initialized = false;

	const initTestimonials = () => {
		if ( initialized ) {
			return;
		}
		initialized = true;

		if ( prefersReducedMotion || ! ( 'IntersectionObserver' in window ) ) {
			const allCards = document.querySelectorAll(
				'.twork-testimonial-section .testimonial-card'
			);
			allCards.forEach( ( card ) => {
				card.style.opacity = '1';
				card.style.transform = 'none';
				card.classList.add( 'is-visible' );
			} );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-testimonial-section'
		);

		if ( sections.length === 0 ) {
			return;
		}

		sections.forEach( ( section ) => {
			const animationEnabled = section.dataset.animation === 'true';
			const animationDelay =
				parseInt( section.dataset.animationDelay, 10 ) || 100;
			const animationType = section.dataset.animationType || 'fadeInUp';
			const testimonialCards =
				section.querySelectorAll( '.testimonial-card' );

			if ( animationEnabled && testimonialCards.length > 0 ) {
				testimonialCards.forEach( ( card, index ) => {
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
								entry.target.style.transform = 'none';
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

				testimonialCards.forEach( ( card ) => {
					observer.observe( card );
				} );
			} else if ( ! animationEnabled && testimonialCards.length > 0 ) {
				testimonialCards.forEach( ( card ) => {
					card.style.opacity = '1';
					card.style.transform = 'none';
					card.classList.remove( 'animate-on-scroll' );
				} );
			}
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTestimonials );
	} else {
		initTestimonials();
	}

	window.addEventListener( 'load', initTestimonials );

	window.TworkTestimonials = {
		init: initTestimonials,
		version: '1.0.1',
	};
} )();
