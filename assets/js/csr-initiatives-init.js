( function () {
	'use strict';

	/**
	 * Initialize CSR Initiatives Section
	 * Handles scroll animations and hover effects for initiative cards
	 *
	 * @since 1.0.0
	 * @author Twork Builder
	 */
	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	let initialized = false;

	const initCsrInitiatives = () => {
		if ( initialized ) {
			return;
		}
		initialized = true;

		if ( prefersReducedMotion || ! ( 'IntersectionObserver' in window ) ) {
			document
				.querySelectorAll(
					'.twork-csr-initiatives-section .initiative-card'
				)
				.forEach( ( card ) => {
					card.style.opacity = '1';
					card.style.transform = 'none';
					card.classList.add( 'is-visible' );
				} );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-csr-initiatives-section'
		);
		if ( sections.length === 0 ) return;

		sections.forEach( ( section ) => {
			const animationEnabled = section.dataset.animation === 'true';
			const animationType = section.dataset.animationType || 'fadeInUp';
			const animationDelay =
				parseInt( section.dataset.animationDelay, 10 ) || 100;
			const cards = section.querySelectorAll( '.initiative-card' );

			if ( animationEnabled && cards.length > 0 ) {
				cards.forEach( ( card, index ) => {
					if ( ! card.classList.contains( 'animate-on-scroll' ) ) {
						card.classList.add( 'animate-on-scroll' );
					}
					card.style.opacity = '0';
					switch ( animationType ) {
						case 'fadeInUp':
							card.style.transform = 'translateY(30px)';
							break;
						case 'slideInLeft':
							card.style.transform = 'translateX(-50px)';
							break;
						case 'slideInRight':
							card.style.transform = 'translateX(50px)';
							break;
						case 'zoomIn':
							card.style.transform = 'scale(0.8)';
							break;
						default:
							card.style.transform = 'translateY(30px)';
					}
					card.style.transitionDelay = `${
						index * animationDelay
					}ms`;
				} );

				const observer = new IntersectionObserver(
					( entries ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								entry.target.classList.add( 'is-visible' );
								entry.target.style.opacity = '1';
								entry.target.style.transform =
									'translateY(0) translateX(0) scale(1)';
								observer.unobserve( entry.target );
							}
						} );
					},
					{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
				);

				cards.forEach( ( card ) => observer.observe( card ) );
			} else if ( ! animationEnabled && cards.length > 0 ) {
				cards.forEach( ( card ) => {
					card.style.opacity = '1';
					card.style.transform = 'none';
					card.classList.remove( 'animate-on-scroll' );
				} );
			}
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCsrInitiatives );
	} else {
		initCsrInitiatives();
	}

	window.addEventListener( 'load', initCsrInitiatives );

	window.TworkCsrInitiatives = { init: initCsrInitiatives };
} )();
