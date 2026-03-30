( function () {
	'use strict';

	/**
	 * Initialize Ambulance Map / Coverage Section scroll animation (fade-up).
	 */
	const initAmbMapSection = () => {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			document
				.querySelectorAll( '.twork-amb-map-section .amb-map-box' )
				.forEach( ( el ) => {
					el.style.opacity = '1';
					el.style.transform = 'none';
					el.classList.add( 'is-visible' );
				} );
			return;
		}

		const sections = document.querySelectorAll(
			'.twork-amb-map-section[data-animation="true"]'
		);
		if ( ! sections.length ) return;

		sections.forEach( ( section ) => {
			const box = section.querySelector(
				'.amb-map-box.twork-amb-map-box'
			);
			if ( ! box ) return;

			box.style.transform = 'translateY(24px)';

			const observer = new IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
							requestAnimationFrame( () => {
								entry.target.style.transform = 'translateY(0)';
							} );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
			);

			observer.observe( box );
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAmbMapSection );
	} else {
		initAmbMapSection();
	}

	window.addEventListener( 'load', initAmbMapSection );
} )();
