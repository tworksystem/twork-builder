/**
 * Shared carousel init for brand page blocks (hero, image-card, review).
 */
( function () {
	'use strict';

	function initCarousel( rootEl, options ) {
		const opts = Object.assign(
			{
				slideSelector: '[data-carousel-slide]',
				controlPrev: '[data-action="carousel-prev"]',
				controlNext: '[data-action="carousel-next"]',
				dotSelector: '[data-action="carousel-go"]',
				activeSlideClass: 'is-active',
				activeDotClass: 'is-active',
				autoplayMs: 6000,
			},
			options || {}
		);

		const slides = Array.from(
			rootEl.querySelectorAll( opts.slideSelector )
		);
		const dots = Array.from( rootEl.querySelectorAll( opts.dotSelector ) );
		const prevBtn = rootEl.querySelector( opts.controlPrev );
		const nextBtn = rootEl.querySelector( opts.controlNext );

		if ( ! slides.length ) {
			return;
		}

		if ( slides.length < 2 ) {
			slides[ 0 ].classList.add( opts.activeSlideClass );
			slides[ 0 ].setAttribute( 'aria-hidden', 'false' );
			return;
		}

		let index = slides.findIndex( ( s ) =>
			s.classList.contains( opts.activeSlideClass )
		);
		if ( index < 0 ) {
			index = 0;
		}

		let timerId = 0;
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		function go( nextIndex ) {
			index = ( nextIndex + slides.length ) % slides.length;
			slides.forEach( function ( slide, i ) {
				const active = i === index;
				slide.classList.toggle( opts.activeSlideClass, active );
				slide.setAttribute( 'aria-hidden', active ? 'false' : 'true' );
			} );
			dots.forEach( function ( dot, i ) {
				dot.classList.toggle( opts.activeDotClass, i === index );
				dot.setAttribute(
					'aria-selected',
					i === index ? 'true' : 'false'
				);
			} );
		}

		function startAutoplay() {
			stopAutoplay();
			if ( reducedMotion || opts.autoplayMs <= 0 ) {
				return;
			}
			timerId = window.setInterval( function () {
				go( index + 1 );
			}, opts.autoplayMs );
		}

		function stopAutoplay() {
			if ( timerId ) {
				window.clearInterval( timerId );
				timerId = 0;
			}
		}

		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', function () {
				go( index - 1 );
				startAutoplay();
			} );
		}
		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', function () {
				go( index + 1 );
				startAutoplay();
			} );
		}
		dots.forEach( function ( dot, i ) {
			dot.addEventListener( 'click', function () {
				go( i );
				startAutoplay();
			} );
		} );

		rootEl.addEventListener( 'mouseenter', stopAutoplay );
		rootEl.addEventListener( 'mouseleave', startAutoplay );
		go( index );
		startAutoplay();
	}

	function initAll() {
		document
			.querySelectorAll( '[data-brand-carousel]' )
			.forEach( function ( el ) {
				if ( el.dataset.brandCarouselInit ) {
					return;
				}
				// Mark ready before go() so progressive CSS yields to .is-active only.
				el.dataset.brandCarouselInit = '1';
				const parsed = parseInt( el.dataset.autoplayMs, 10 );
				initCarousel( el, {
					autoplayMs: Number.isFinite( parsed ) ? parsed : 6000,
				} );
			} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}

	window.TworkBrandCarousel = { init: initAll };
} )();
