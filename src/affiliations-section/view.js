/**
 * Affiliations Section: scroll animations + slider (pure JS, no deps).
 * - Grid with data-animation: IntersectionObserver fade-up.
 * - Slider with data-layout="slider": prev/next, dots, autoplay, responsive.
 *
 * @since 1.0.0
 */

( function () {
	'use strict';

	// --- Scroll animation (existing) ---
	function initScrollAnimation() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			document
				.querySelectorAll(
					'.twork-affiliations-section .logo-grid.fade-up'
				)
				.forEach( function ( el ) {
					el.classList.add( 'is-visible' );
				} );
			return;
		}
		var sections = document.querySelectorAll(
			'.twork-affiliations-section[data-animation="true"]'
		);
		if ( ! sections.length ) return;
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
		);
		sections.forEach( function ( section ) {
			var grid = section.querySelector( '.logo-grid.fade-up' );
			if ( grid ) observer.observe( grid );
		} );
	}

	// --- Slider (pure JS) ---
	function getSlidesToShow( container ) {
		var section = container.closest( '.twork-affiliations-section' );
		if ( ! section ) return 4;
		var w = window.innerWidth;
		var tablet = section.getAttribute( 'data-slider-slides-tablet' );
		var mobile = section.getAttribute( 'data-slider-slides-mobile' );
		var desktop = section.getAttribute( 'data-slider-slides' ) || '4';
		tablet = tablet ? parseInt( tablet, 10 ) : 3;
		mobile = mobile ? parseInt( mobile, 10 ) : 2;
		desktop = parseInt( desktop, 10 ) || 4;
		if ( w <= 768 ) return mobile;
		if ( w <= 992 ) return tablet;
		return desktop;
	}

	function initOneSlider( sliderEl ) {
		var track = sliderEl.querySelector( '.logo-slider-track' );
		if ( ! track ) return;
		var slides = Array.prototype.filter.call(
			track.children,
			function ( node ) {
				return (
					node.nodeType === 1 &&
					! node.classList.contains( 'block-list-appender' )
				);
			}
		);
		var total = slides.length;
		if ( total === 0 ) return;

		var section = sliderEl.closest( '.twork-affiliations-section' );
		var gapPx =
			parseInt(
				section
					? section.getAttribute( 'data-slider-gap' ) || ''
					: '24',
				10
			) || 24;
		var container = sliderEl;
		var containerWidth = container.offsetWidth;
		var slidesToShow = getSlidesToShow( container );
		var slideWidth =
			( containerWidth - gapPx * ( slidesToShow - 1 ) ) / slidesToShow;
		// Prevent extreme gap values from breaking layout (negative or tiny widths)
		if ( ! isFinite( slideWidth ) || slideWidth < 40 ) {
			slideWidth = Math.max(
				40,
				containerWidth / Math.max( 1, slidesToShow )
			);
		}
		var trackWidth = slideWidth * total + gapPx * ( total - 1 );
		var maxIndex = Math.max( 0, total - slidesToShow );

		track.style.width = trackWidth + 'px';
		track.style.gap = gapPx + 'px';
		slides.forEach( function ( slide ) {
			slide.style.flex = '0 0 ' + slideWidth + 'px';
			slide.style.minWidth = slideWidth + 'px';
		} );

		var currentIndex = 0;
		var autoplayTimer = null;
		var speed =
			parseInt(
				sliderEl.getAttribute( 'data-slider-speed' ) || 4000,
				10
			) || 4000;
		var autoplay =
			sliderEl.getAttribute( 'data-slider-autoplay' ) !== 'false';

		function goTo( index ) {
			currentIndex = Math.max( 0, Math.min( index, maxIndex ) );
			var tx = -( currentIndex * ( slideWidth + gapPx ) );
			track.style.transform = 'translate3d(' + tx + 'px, 0, 0)';
			updateDots();
		}

		function updateDots() {
			var dotsWrap = sliderEl.querySelector( '.logo-slider-dots' );
			if ( ! dotsWrap ) return;
			var dots = dotsWrap.querySelectorAll( '.logo-slider-dot' );
			dots.forEach( function ( dot, i ) {
				dot.classList.toggle( 'is-active', i === currentIndex );
				dot.setAttribute(
					'aria-current',
					i === currentIndex ? 'true' : 'false'
				);
			} );
		}

		function buildDots() {
			var dotsWrap = sliderEl.querySelector( '.logo-slider-dots' );
			if ( ! dotsWrap || maxIndex <= 0 ) return;
			dotsWrap.innerHTML = '';
			for ( var i = 0; i <= maxIndex; i++ ) {
				var btn = document.createElement( 'button' );
				btn.type = 'button';
				btn.className =
					'logo-slider-dot' + ( i === 0 ? ' is-active' : '' );
				btn.setAttribute( 'aria-label', 'Go to slide ' + ( i + 1 ) );
				btn.setAttribute( 'aria-current', i === 0 ? 'true' : 'false' );
				( function ( idx ) {
					btn.addEventListener( 'click', function () {
						goTo( idx );
						resetAutoplay();
					} );
				} )( i );
				dotsWrap.appendChild( btn );
			}
		}

		function resetAutoplay() {
			if ( autoplayTimer ) clearInterval( autoplayTimer );
			if (
				autoplay &&
				sliderEl.getAttribute( 'data-slider-autoplay' ) !== 'false'
			) {
				autoplayTimer = setInterval( function () {
					var next = currentIndex >= maxIndex ? 0 : currentIndex + 1;
					goTo( next );
				}, speed );
			}
		}

		var prevBtn = sliderEl.querySelector( '.logo-slider-prev' );
		var nextBtn = sliderEl.querySelector( '.logo-slider-next' );
		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', function () {
				goTo( currentIndex - 1 );
				resetAutoplay();
			} );
		}
		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', function () {
				goTo( currentIndex + 1 );
				resetAutoplay();
			} );
		}

		buildDots();
		resetAutoplay();
		if ( maxIndex <= 0 ) sliderEl.classList.add( 'logo-slider-no-nav' );

		// Responsive: recompute on resize
		var resizeObserver = null;
		if ( typeof ResizeObserver !== 'undefined' ) {
			resizeObserver = new ResizeObserver( function () {
				containerWidth = container.offsetWidth;
				slidesToShow = getSlidesToShow( container );
				slideWidth =
					( containerWidth - gapPx * ( slidesToShow - 1 ) ) /
					slidesToShow;
				if ( ! isFinite( slideWidth ) || slideWidth < 40 ) {
					slideWidth = Math.max(
						40,
						containerWidth / Math.max( 1, slidesToShow )
					);
				}
				trackWidth = slideWidth * total + gapPx * ( total - 1 );
				var newMax = Math.max( 0, total - slidesToShow );
				track.style.width = trackWidth + 'px';
				slides.forEach( function ( slide ) {
					slide.style.flex = '0 0 ' + slideWidth + 'px';
					slide.style.minWidth = slideWidth + 'px';
				} );
				maxIndex = newMax;
				if ( currentIndex > maxIndex ) currentIndex = maxIndex;
				if ( maxIndex <= 0 )
					sliderEl.classList.add( 'logo-slider-no-nav' );
				else sliderEl.classList.remove( 'logo-slider-no-nav' );
				goTo( currentIndex );
				var dotsWrapEl = sliderEl.querySelector( '.logo-slider-dots' );
				if ( dotsWrapEl ) {
					dotsWrapEl.innerHTML = '';
					buildDots();
				}
			} );
			resizeObserver.observe( container );
		}
	}

	function initSliders() {
		var sections = document.querySelectorAll(
			'.twork-affiliations-section[data-layout="slider"]'
		);
		sections.forEach( function ( section ) {
			var slider = section.querySelector( '.affiliations-slider' );
			if ( slider && ! slider.dataset.sliderInit ) {
				slider.dataset.sliderInit = '1';
				initOneSlider( slider );
			}
		} );
	}

	function init() {
		initScrollAnimation();
		initSliders();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
	window.addEventListener( 'load', init );

	window.TworkAffiliationsSection = {
		init: init,
		initSliders: initSliders,
		version: '1.1.0',
	};
} )();
