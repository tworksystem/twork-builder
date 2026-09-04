import '../shared/brand-carousel.js';

( function () {
	'use strict';

	function ensureDots( wrap ) {
		const track = wrap.querySelector( '.hero__track' );
		const dotsWrap = wrap.querySelector( '.hero__dots' );
		if ( ! track || ! dotsWrap ) {
			return;
		}
		const slides = track.querySelectorAll( '[data-carousel-slide]' );
		if ( dotsWrap.children.length === slides.length ) {
			return;
		}
		dotsWrap.innerHTML = '';
		slides.forEach( function ( _slide, i ) {
			const dot = document.createElement( 'button' );
			dot.type = 'button';
			dot.className =
				'carousel-dots__dot' + ( i === 0 ? ' is-active' : '' );
			dot.setAttribute( 'data-action', 'carousel-go' );
			dot.setAttribute( 'data-slide-index', String( i ) );
			dot.setAttribute( 'aria-label', 'Slide ' + ( i + 1 ) );
			dotsWrap.appendChild( dot );
		} );
	}

	function initHeroCarousels() {
		document
			.querySelectorAll(
				'.hero[data-block="twork/hero-banner-carousel"] .hero__wrap'
			)
			.forEach( function ( wrap ) {
				if ( wrap.dataset.heroDotsInit ) {
					return;
				}
				wrap.dataset.heroDotsInit = '1';
				ensureDots( wrap );
			} );
		if ( window.TworkBrandCarousel ) {
			window.TworkBrandCarousel.init();
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initHeroCarousels );
	} else {
		initHeroCarousels();
	}
} )();
