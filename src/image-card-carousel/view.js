/**
 * Image Card Carousel – dot navigation and autoplay.
 *
 * @package twork-builder
 */

( function () {
	'use strict';

	const SECTION_SELECTOR =
		'.twork-image-card-carousel, .wp-block-twork-image-card-carousel';
	const SLIDE_SELECTOR =
		'.image-card-carousel__card, .wp-block-twork-image-card-slide';
	const DOTS_SELECTOR = '[data-carousel-dots]';

	function getVisibleCount() {
		if ( window.matchMedia( '(max-width: 640px)' ).matches ) {
			return 1;
		}
		if ( window.matchMedia( '(max-width: 1024px)' ).matches ) {
			return 2;
		}
		return 3;
	}

	function qsa( root, sel ) {
		return Array.prototype.slice.call( root.querySelectorAll( sel ) );
	}

	function buildDots( dotsEl, total ) {
		dotsEl.innerHTML = '';
		for ( let i = 0; i < total; i += 1 ) {
			const btn = document.createElement( 'button' );
			btn.type = 'button';
			btn.className = 'carousel-dots__dot';
			btn.setAttribute( 'data-action', 'carousel-go' );
			btn.setAttribute( 'data-slide-index', String( i ) );
			btn.setAttribute( 'aria-label', 'Service ' + ( i + 1 ) );
			dotsEl.appendChild( btn );
		}
	}

	function updateView( section, slides, dots, index ) {
		const visible = getVisibleCount();
		const maxIndex = Math.max( 0, slides.length - visible );
		const activeIndex = Math.min( index, maxIndex );

		slides.forEach( function ( slide, i ) {
			const inView =
				i >= activeIndex && i < activeIndex + visible;
			slide.classList.toggle( 'is-visible', inView );
			slide.setAttribute(
				'aria-hidden',
				inView ? 'false' : 'true'
			);
		} );

		dots.forEach( function ( dot, i ) {
			const isActive = i === activeIndex;
			dot.classList.toggle( 'is-active', isActive );
			dot.setAttribute(
				'aria-selected',
				isActive ? 'true' : 'false'
			);
		} );

		section.dataset.activeIndex = String( activeIndex );
		return activeIndex;
	}

	function initSection( section ) {
		if ( section.getAttribute( 'data-carousel-init' ) === '1' ) {
			return;
		}

		const track = section.querySelector(
			'.image-card-carousel__track'
		);
		if ( ! track ) {
			return;
		}

		const slides = qsa( track, SLIDE_SELECTOR );
		if ( slides.length === 0 ) {
			return;
		}

		const dotsEl = section.querySelector( DOTS_SELECTOR );
		if ( ! dotsEl ) {
			return;
		}

		buildDots( dotsEl, slides.length );
		const dots = qsa( dotsEl, '[data-action="carousel-go"]' );

		const autoplayMs =
			parseInt( section.getAttribute( 'data-autoplay-ms' ), 10 ) ||
			6000;
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		let index = 0;
		let timerId = 0;

		const go = function ( nextIndex ) {
			index = updateView( section, slides, dots, nextIndex );
		};

		const next = function () {
			const visible = getVisibleCount();
			const maxIndex = Math.max( 0, slides.length - visible );
			go( index >= maxIndex ? 0 : index + 1 );
		};

		const stop = function () {
			window.clearInterval( timerId );
			timerId = 0;
		};

		const start = function () {
			stop();
			if ( reducedMotion || autoplayMs <= 0 || slides.length < 2 ) {
				return;
			}
			timerId = window.setInterval( next, autoplayMs );
		};

		dots.forEach( function ( dot ) {
			dot.addEventListener( 'click', function () {
				stop();
				go( Number( dot.getAttribute( 'data-slide-index' ) ) || 0 );
				start();
			} );
		} );

		section.addEventListener( 'mouseenter', stop );
		section.addEventListener( 'mouseleave', start );

		document.addEventListener( 'visibilitychange', function () {
			if ( document.hidden ) {
				stop();
			} else {
				start();
			}
		} );

		let resizeTimer = 0;
		window.addEventListener( 'resize', function () {
			window.clearTimeout( resizeTimer );
			resizeTimer = window.setTimeout( function () {
				go( index );
			}, 150 );
		} );

		section.setAttribute( 'data-carousel-init', '1' );
		go( 0 );
		start();
	}

	function init() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( initSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	window.addEventListener( 'load', init );

	if ( typeof window.TworkImageCardCarousel === 'undefined' ) {
		window.TworkImageCardCarousel = { init: init, version: '1.0.0' };
	}
} )();
