( function () {
	'use strict';

	/**
	 * Neuro Centre Section – Scroll Animations
	 * Handles fade-up for content sections and stagger for treatment cards / doctor cards.
	 * Pure JavaScript (Intersection Observer) – no GSAP dependency.
	 * Matches neuro-centre.html design: .fade-up, .stagger-card, .stagger-doc
	 *
	 * @since 1.0.0
	 * @author Twork Builder
	 */
	const initNeuroCentre = () => {
		const section = document.querySelector( '.twork-neuro-centre-section' );
		if ( ! section ) return;

		if ( ! ( 'IntersectionObserver' in window ) ) {
			section
				.querySelectorAll( '.fade-up, .stagger-card, .stagger-doc' )
				.forEach( ( el ) => {
					el.style.opacity = '1';
					el.style.visibility = 'visible';
					el.style.transform = 'none';
				} );
			return;
		}

		const FADE_DURATION = '0.8s';
		const STAGGER_DELAY = 150;

		// 1. Content sections with .fade-up
		section
			.querySelectorAll( '.content-section.fade-up, .neuro-cta.fade-up' )
			.forEach( ( el ) => {
				el.style.opacity = '0';
				el.style.visibility = 'hidden';
				el.style.transform = 'translateY(50px)';
				el.style.transition = `opacity ${ FADE_DURATION } ease-out, transform ${ FADE_DURATION } ease-out, visibility ${ FADE_DURATION }`;
			} );

		// 2. Treatment cards and doctor cards – initial hidden state (stagger delay set on reveal)
		section
			.querySelectorAll(
				'.treatment-card.stagger-card, .doctor-card-mini.stagger-doc'
			)
			.forEach( ( el ) => {
				el.style.opacity = '0';
				el.style.visibility = 'hidden';
				el.style.transform = 'translateY(40px)';
				el.style.transition =
					'opacity 0.6s ease-out, transform 0.6s ease-out, visibility 0.6s';
			} );

		// Observe fade-up sections
		section
			.querySelectorAll( '.content-section.fade-up, .neuro-cta.fade-up' )
			.forEach( ( el ) => {
				const observer = new IntersectionObserver(
					( entries ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								const target = entry.target;
								requestAnimationFrame( () => {
									target.style.opacity = '1';
									target.style.visibility = 'visible';
									target.style.transform = 'translate(0, 0)';
								} );
								observer.unobserve( target );
							}
						} );
					},
					{ threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
				);
				observer.observe( el );
			} );

		// Observe treatment-grid – when visible, reveal stagger-cards
		const treatmentGrid = section.querySelector( '.treatment-grid' );
		if (
			treatmentGrid &&
			treatmentGrid.querySelectorAll( '.stagger-card' ).length
		) {
			const observer = new IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							const cards = entry.target.querySelectorAll(
								'.treatment-card.stagger-card'
							);
							cards.forEach( ( card, i ) => {
								card.style.transitionDelay = `${
									i * STAGGER_DELAY
								}ms`;
								requestAnimationFrame( () => {
									card.style.opacity = '1';
									card.style.visibility = 'visible';
									card.style.transform = 'translate(0, 0)';
								} );
							} );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
			);
			observer.observe( treatmentGrid );
		}

		// Observe dept-doctors – when visible, reveal stagger-doc
		const deptDoctors = section.querySelector( '.dept-doctors' );
		if (
			deptDoctors &&
			deptDoctors.querySelectorAll( '.stagger-doc' ).length
		) {
			const observer = new IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							const cards = entry.target.querySelectorAll(
								'.doctor-card-mini.stagger-doc'
							);
							cards.forEach( ( card, i ) => {
								card.style.transitionDelay = `${
									i * STAGGER_DELAY
								}ms`;
								requestAnimationFrame( () => {
									card.style.opacity = '1';
									card.style.visibility = 'visible';
									card.style.transform = 'translate(0, 0)';
								} );
							} );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
			);
			observer.observe( deptDoctors );
		}
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initNeuroCentre );
	} else {
		initNeuroCentre();
	}
	window.addEventListener( 'load', initNeuroCentre );
} )();
