/**
 * Testimonials scroll-snap carousel (matches shweghee design).
 */
( function () {
	'use strict';

	function scrollStep( track ) {
		const card = track.querySelector( '.testimonials__card' );
		return card ? card.offsetWidth + 24 : 320;
	}

	function syncDots( track, dotsEl ) {
		if ( ! dotsEl ) {
			return;
		}
		const cards = track.querySelectorAll( '.testimonials__card' );
		const dots = dotsEl.querySelectorAll( '.carousel-dots__dot' );
		if ( ! cards.length || ! dots.length ) {
			return;
		}
		const step = scrollStep( track );
		const index = Math.round( track.scrollLeft / step );
		dots.forEach( function ( dot, i ) {
			dot.classList.toggle( 'is-active', i === index );
		} );
	}

	function initRoot( rootEl ) {
		if ( rootEl.dataset.testimonialsInit ) {
			return;
		}
		rootEl.dataset.testimonialsInit = '1';

		const track = rootEl.querySelector( '[data-testimonials-track]' );
		if ( ! track ) {
			return;
		}

		const cards = track.querySelectorAll( '.testimonials__card' );
		const dotsEl = rootEl.querySelector( '[data-testimonials-dots]' );

		if ( dotsEl && cards.length ) {
			dotsEl.innerHTML = Array.from( cards )
				.map( function ( _, i ) {
					return (
						'<button type="button" class="carousel-dots__dot' +
						( i === 0 ? ' is-active' : '' ) +
						'" data-action="testimonials-go" data-slide-index="' +
						i +
						'" aria-label="Slide ' +
						( i + 1 ) +
						'"></button>'
					);
				} )
				.join( '' );
		}

		rootEl.addEventListener( 'click', function ( event ) {
			const next = event.target.closest(
				'[data-action="testimonials-next"]'
			);
			const prev = event.target.closest(
				'[data-action="testimonials-prev"]'
			);
			const go = event.target.closest(
				'[data-action="testimonials-go"]'
			);
			if ( next ) {
				track.scrollBy( {
					left: scrollStep( track ),
					behavior: 'smooth',
				} );
			} else if ( prev ) {
				track.scrollBy( {
					left: -scrollStep( track ),
					behavior: 'smooth',
				} );
			} else if ( go && go.dataset.slideIndex != null ) {
				const i = parseInt( go.dataset.slideIndex, 10 );
				track.scrollTo( {
					left: i * scrollStep( track ),
					behavior: 'smooth',
				} );
			}
		} );

		track.addEventListener( 'scroll', function () {
			syncDots( track, dotsEl );
		} );
	}

	function initAll() {
		document.querySelectorAll( '[data-testimonials]' ).forEach( initRoot );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
