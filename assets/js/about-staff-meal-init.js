/**
 * About Staff Meal — scroll reveal + gallery slider/slideshow.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-about-staff-meal';
	const GALLERY_SELECTOR = '.twork-about-staff-meal-gallery';

	function prefersReducedMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function getSlides( gallery ) {
		return Array.prototype.slice
			.call( gallery.children )
			.filter( function ( el ) {
				return (
					el.classList.contains(
						'twork-about-staff-meal-gallery-item'
					) ||
					el.classList.contains(
						'wp-block-twork-about-staff-meal-gallery-item'
					)
				);
			} );
	}

	function setActive( slides, index, dots ) {
		slides.forEach( function ( slide, i ) {
			const on = i === index;
			slide.classList.toggle( 'is-active', on );
			slide.setAttribute( 'aria-hidden', on ? 'false' : 'true' );
		} );
		if ( dots ) {
			dots.forEach( function ( dot, i ) {
				dot.classList.toggle( 'is-active', i === index );
				dot.setAttribute(
					'aria-current',
					i === index ? 'true' : 'false'
				);
			} );
		}
	}

	function initGallery( section ) {
		const layout = section.getAttribute( 'data-gallery-layout' );
		if ( layout !== 'slider' && layout !== 'slideshow' ) {
			return;
		}

		const gallery = section.querySelector( GALLERY_SELECTOR );
		if ( ! gallery || gallery.dataset.asmGalleryBound === '1' ) {
			return;
		}
		gallery.dataset.asmGalleryBound = '1';

		const slides = getSlides( gallery );
		if ( ! slides.length ) {
			return;
		}

		section.classList.add( 'is-asm-gallery-ready' );

		if ( slides.length === 1 ) {
			slides[ 0 ].classList.add( 'is-active' );
			slides[ 0 ].setAttribute( 'aria-hidden', 'false' );
			return;
		}

		let index = 0;
		const controls = document.createElement( 'div' );
		controls.className = 'twork-about-staff-meal-gallery__controls';

		const prev = document.createElement( 'button' );
		prev.type = 'button';
		prev.className = 'twork-about-staff-meal-gallery__btn';
		prev.setAttribute( 'aria-label', 'Previous slide' );
		prev.textContent = '\u2039';

		const next = document.createElement( 'button' );
		next.type = 'button';
		next.className = 'twork-about-staff-meal-gallery__btn';
		next.setAttribute( 'aria-label', 'Next slide' );
		next.textContent = '\u203A';

		const dotsWrap = document.createElement( 'div' );
		dotsWrap.className = 'twork-about-staff-meal-gallery__dots';
		dotsWrap.setAttribute( 'role', 'tablist' );

		var dots = slides.map( function ( _slide, i ) {
			const dot = document.createElement( 'button' );
			dot.type = 'button';
			dot.className = 'twork-about-staff-meal-gallery__dot';
			dot.setAttribute( 'aria-label', 'Go to slide ' + ( i + 1 ) );
			dot.addEventListener( 'click', function () {
				index = i;
				setActive( slides, index, dots );
				restartTimer();
			} );
			dotsWrap.appendChild( dot );
			return dot;
		} );

		function go( delta ) {
			index = ( index + delta + slides.length ) % slides.length;
			setActive( slides, index, dots );
		}

		prev.addEventListener( 'click', function () {
			go( -1 );
			restartTimer();
		} );
		next.addEventListener( 'click', function () {
			go( 1 );
			restartTimer();
		} );

		controls.appendChild( prev );
		controls.appendChild( dotsWrap );
		controls.appendChild( next );
		gallery.appendChild( controls );

		setActive( slides, 0, dots );

		gallery.setAttribute( 'tabindex', '0' );
		gallery.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'ArrowLeft' ) {
				e.preventDefault();
				go( -1 );
				restartTimer();
			} else if ( e.key === 'ArrowRight' ) {
				e.preventDefault();
				go( 1 );
				restartTimer();
			}
		} );

		let timer = null;
		const ms =
			parseInt(
				section.getAttribute( 'data-gallery-autoplay-ms' ),
				10
			) || 4500;
		const autoplay =
			layout === 'slideshow' &&
			section.getAttribute( 'data-gallery-autoplay' ) === '1';
		const respectReduced =
			section.getAttribute( 'data-reduced-motion' ) !== '0';

		function clearTimer() {
			if ( timer ) {
				window.clearInterval( timer );
				timer = null;
			}
		}

		function startTimer() {
			clearTimer();
			if ( ! autoplay ) {
				return;
			}
			if ( respectReduced && prefersReducedMotion() ) {
				return;
			}
			timer = window.setInterval( function () {
				go( 1 );
			}, ms );
		}

		function restartTimer() {
			startTimer();
		}

		gallery.addEventListener( 'mouseenter', clearTimer );
		gallery.addEventListener( 'mouseleave', startTimer );
		gallery.addEventListener( 'focusin', clearTimer );
		gallery.addEventListener( 'focusout', startTimer );

		startTimer();
	}

	function initReveal( section ) {
		if ( section.getAttribute( 'data-animation' ) !== '1' ) {
			return;
		}
		if (
			section.getAttribute( 'data-reduced-motion' ) !== '0' &&
			prefersReducedMotion()
		) {
			return;
		}
		const targets = section.querySelectorAll(
			'.twork-about-staff-meal-gallery, .twork-about-staff-meal-feedback, .twork-about-staff-meal__quote'
		);
		if ( ! targets.length || ! ( 'IntersectionObserver' in window ) ) {
			return;
		}
		const delay =
			parseInt( section.getAttribute( 'data-animation-delay' ), 10 ) || 0;
		targets.forEach( function ( el, i ) {
			el.classList.add( 'asm-reveal' );
			el.style.transitionDelay = delay + i * 80 + 'ms';
		} );
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15 }
		);
		targets.forEach( function ( el ) {
			observer.observe( el );
		} );
	}

	function initSection( section ) {
		if ( section.dataset.asmBound === '1' ) {
			return;
		}
		section.dataset.asmBound = '1';
		initGallery( section );
		initReveal( section );
	}

	function initAll() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( initSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
