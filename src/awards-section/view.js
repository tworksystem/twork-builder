/**
 * Pure JavaScript for Awards Section Scroll Animations
 * Uses Intersection Observer API - no GSAP dependency.
 *
 * @since 1.0.0
 * @author Twork Builder
 */

( function () {
	'use strict';

	function initAwardsSection() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			const sections = document.querySelectorAll(
				'.twork-awards-section'
			);
			sections.forEach( ( section ) => {
				section.classList.add( 'is-visible' );
				const introText = section.querySelector(
					'.intro-text.fade-up'
				);
				if ( introText ) introText.classList.add( 'is-visible' );
				const items = section.querySelectorAll(
					'.award-item.stagger-up'
				);
				items.forEach( ( el ) => el.classList.add( 'is-visible' ) );
			} );
			return;
		}

		const sections = document.querySelectorAll( '.twork-awards-section' );
		if ( ! sections.length ) return;

		const observerOptions = {
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px',
		};

		sections.forEach( ( section ) => {
			const animationEnabled = section.dataset.animation === 'true';
			const animationDelay =
				parseInt( section.dataset.animationDelay, 10 ) || 100;

			const introText = section.querySelector( '.intro-text.fade-up' );
			if ( introText ) {
				const introObserver = new IntersectionObserver( ( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
							introObserver.unobserve( entry.target );
						}
					} );
				}, observerOptions );
				introObserver.observe( introText );
			}

			const items = section.querySelectorAll( '.award-item.stagger-up' );
			if ( ! animationEnabled || ! items.length ) {
				items.forEach( ( el ) => el.classList.add( 'is-visible' ) );
				return;
			}

			items.forEach( ( item, index ) => {
				item.style.transitionDelay = `${ index * animationDelay }ms`;
			} );

			const itemObserver = new IntersectionObserver( ( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
						itemObserver.unobserve( entry.target );
					}
				} );
			}, observerOptions );

			items.forEach( ( item ) => itemObserver.observe( item ) );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAwardsSection );
	} else {
		initAwardsSection();
	}

	window.addEventListener( 'load', initAwardsSection );
	window.TworkAwardsSection = { init: initAwardsSection, version: '1.0.0' };
} )();
