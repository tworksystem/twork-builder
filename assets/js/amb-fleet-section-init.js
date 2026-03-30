( function () {
	'use strict';

	/**
	 * Initialize Ambulance Fleet Section scroll animations.
	 * Follows services-grid-init.js pattern.
	 */
	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	let initialized = false;

	const initAmbFleetSection = () => {
		if ( initialized ) {
			return;
		}
		initialized = true;

		if ( prefersReducedMotion || ! ( 'IntersectionObserver' in window ) ) {
			document
				.querySelectorAll( '.twork-amb-fleet-section .amb-fleet-card' )
				.forEach( ( card ) => {
					card.style.opacity = '1';
					card.style.transform = 'none';
					card.classList.add( 'is-visible' );
				} );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-amb-fleet-section[data-animation="true"]'
		);
		if ( ! sections.length ) return;

		sections.forEach( ( section ) => {
			const cards = section.querySelectorAll(
				'.amb-fleet-card.twork-amb-fleet-card'
			);
			const delay = parseInt( section.dataset.animationDelay, 10 ) || 100;
			const type = section.dataset.animationType || 'fadeInUp';

			cards.forEach( ( card, index ) => {
				card.classList.add( 'animate-on-scroll' );
				card.style.transitionDelay = `${ index * delay }ms`;
				switch ( type ) {
					case 'fadeInUp':
						card.style.transform = 'translateY(24px)';
						break;
					case 'slideInLeft':
						card.style.transform = 'translateX(-40px)';
						break;
					case 'slideInRight':
						card.style.transform = 'translateX(40px)';
						break;
					case 'zoomIn':
						card.style.transform = 'scale(0.9)';
						break;
					default:
						break;
				}
			} );

			const observer = new IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
							requestAnimationFrame( () => {
								entry.target.style.transform =
									'translateY(0) translateX(0) scale(1)';
							} );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
			);

			cards.forEach( ( card ) => observer.observe( card ) );
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAmbFleetSection );
	} else {
		initAmbFleetSection();
	}

	window.addEventListener( 'load', initAmbFleetSection );
} )();
