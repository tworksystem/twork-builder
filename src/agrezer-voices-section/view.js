/**
 * Agrezer voices: testimonial slide rotation (matches about.html behavior).
 *
 * @package twork-builder
 */

( function () {
	'use strict';

	function qsa( root, sel ) {
		return Array.prototype.slice.call( root.querySelectorAll( sel ) );
	}

	function prefersReducedMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function initSlider( slider ) {
		if ( slider.getAttribute( 'data-voices-init' ) === '1' ) {
			return;
		}

		var section = slider.closest( '.twork-voices-section' );
		if ( ! section ) {
			return;
		}

		var slides = qsa( slider, '.twork-voices-section__slide' );
		if ( slides.length === 0 ) {
			return;
		}

		var intervalMs = parseInt(
			section.getAttribute( 'data-autoplay-ms' ) || '4500',
			10
		);
		if ( isNaN( intervalMs ) || intervalMs < 2000 ) {
			intervalMs = 4500;
		}
		var autoplayOn = section.getAttribute( 'data-autoplay' ) !== 'false';
		var reduced = prefersReducedMotion();

		var activeIndex = 0;
		var intervalId = null;

		function update() {
			slides.forEach( function ( slide, index ) {
				var on = index === activeIndex;
				slide.classList.toggle( 'is-active', on );
				slide.setAttribute( 'aria-hidden', on ? 'false' : 'true' );
			} );
		}

		function goTo( index ) {
			var n = slides.length;
			activeIndex = ( ( index % n ) + n ) % n;
			update();
		}

		function step() {
			goTo( activeIndex - 1 );
		}

		function startAutoplay() {
			stopAutoplay();
			if ( ! autoplayOn || reduced || slides.length < 2 ) {
				return;
			}
			intervalId = window.setInterval( step, intervalMs );
		}

		function stopAutoplay() {
			if ( intervalId ) {
				window.clearInterval( intervalId );
				intervalId = null;
			}
		}

		slider.setAttribute( 'data-voices-init', '1' );
		section.classList.add( 'is-initialized' );

		if ( reduced ) {
			activeIndex = 0;
			update();
			return;
		}

		update();
		startAutoplay();

		slider.addEventListener( 'mouseenter', stopAutoplay );
		slider.addEventListener( 'mouseleave', startAutoplay );
		slider.addEventListener( 'focusin', stopAutoplay );
		slider.addEventListener( 'focusout', startAutoplay );
	}

	function init() {
		document
			.querySelectorAll(
				'.twork-voices-section .twork-voices-section__testimonial[data-voices-slider]'
			)
			.forEach( initSlider );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
