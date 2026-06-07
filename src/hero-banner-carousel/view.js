( function () {
	'use strict';

	const CAROUSEL_SELECTOR =
		'.wp-block-twork-hero-banner-carousel.twork-hero-banner-carousel, .twork-hero-banner-carousel';

	function on( rootEl, eventName, selector, handler ) {
		rootEl.addEventListener( eventName, ( event ) => {
			const target = event.target.closest( selector );
			if ( ! target || ! rootEl.contains( target ) ) {
				return;
			}
			handler( event, target );
		} );
	}

	function bindCarousel( rootEl, options = {} ) {
		const {
			slideSelector = '[data-carousel-slide]',
			controlPrev = "[data-action='carousel-prev']",
			controlNext = "[data-action='carousel-next']",
			dotSelector = "[data-action='carousel-go']",
			dotsContainer = '[data-carousel-dots]',
			activeSlideClass = 'is-active',
			activeDotClass = 'is-active',
			autoplayMs = 6000,
			hideControlsIfSingle = true,
		} = options;

		const slides = Array.from( rootEl.querySelectorAll( slideSelector ) );
		let dots = Array.from( rootEl.querySelectorAll( dotSelector ) );
		const prevBtn = rootEl.querySelector( controlPrev );
		const nextBtn = rootEl.querySelector( controlNext );
		const dotsWrap = rootEl.querySelector( dotsContainer );
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		if ( ! slides.length ) {
			return { destroy: () => {} };
		}

		if ( dotsWrap && ! dots.length ) {
			dotsWrap.innerHTML = '';
			slides.forEach( ( _slide, index ) => {
				const dot = document.createElement( 'button' );
				dot.type = 'button';
				dot.className = 'carousel-dots__dot';
				dot.dataset.action = 'carousel-go';
				dot.dataset.slideIndex = String( index );
				dot.setAttribute( 'aria-label', `Slide ${ index + 1 }` );
				dot.setAttribute(
					'aria-selected',
					index === 0 ? 'true' : 'false'
				);
				if ( index === 0 ) {
					dot.classList.add( activeDotClass );
				}
				dotsWrap.appendChild( dot );
			} );
			dots = Array.from( rootEl.querySelectorAll( dotSelector ) );
		}

		if ( hideControlsIfSingle && slides.length < 2 ) {
			[ prevBtn, nextBtn, dotsWrap ].forEach( ( el ) => {
				el?.classList.add( 'u-hidden' );
			} );
			slides[ 0 ]?.classList.add( activeSlideClass );
			slides[ 0 ]?.setAttribute( 'aria-hidden', 'false' );
			return { destroy: () => {} };
		}

		let index = 0;
		let timerId = 0;

		const go = ( nextIndex ) => {
			index = ( nextIndex + slides.length ) % slides.length;
			slides.forEach( ( slide, i ) => {
				slide.classList.toggle( activeSlideClass, i === index );
				slide.setAttribute(
					'aria-hidden',
					i === index ? 'false' : 'true'
				);
			} );
			dots.forEach( ( dot, i ) => {
				dot.classList.toggle( activeDotClass, i === index );
				dot.setAttribute(
					'aria-selected',
					i === index ? 'true' : 'false'
				);
			} );
			rootEl.dataset.activeIndex = String( index );
		};

		const next = () => go( index + 1 );
		const prev = () => go( index - 1 );

		const stop = () => window.clearInterval( timerId );

		const start = () => {
			stop();
			if ( reducedMotion || autoplayMs <= 0 ) {
				return;
			}
			timerId = window.setInterval( next, autoplayMs );
		};

		on( rootEl, 'click', controlNext, () => {
			stop();
			next();
			start();
		} );

		on( rootEl, 'click', controlPrev, () => {
			stop();
			prev();
			start();
		} );

		on( rootEl, 'click', dotSelector, ( _event, dot ) => {
			stop();
			go( Number( dot.dataset.slideIndex ) );
			start();
		} );

		const onVisibility = () => {
			if ( document.hidden ) {
				stop();
			} else {
				start();
			}
		};

		document.addEventListener( 'visibilitychange', onVisibility );
		rootEl.addEventListener( 'mouseenter', stop );
		rootEl.addEventListener( 'mouseleave', start );

		go( 0 );
		start();

		return {
			destroy: () => {
				stop();
				document.removeEventListener(
					'visibilitychange',
					onVisibility
				);
			},
		};
	}

	function initCarousel( section ) {
		if ( section.dataset.tworkHeroCarouselInit === 'true' ) {
			return;
		}

		const wrap = section.querySelector(
			'.twork-hero-banner-carousel__wrap'
		);
		if ( ! wrap ) {
			return;
		}

		section.dataset.tworkHeroCarouselInit = 'true';

		const autoplayMs =
			parseInt( section.getAttribute( 'data-autoplay-ms' ), 10 ) || 7000;

		bindCarousel( wrap, { autoplayMs } );
	}

	function initAllCarousels() {
		document.querySelectorAll( CAROUSEL_SELECTOR ).forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllCarousels );
	} else {
		initAllCarousels();
	}
} )();
