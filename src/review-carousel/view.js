/**
 * Review carousel: horizontal scroll + prev/next + dots.
 * Ports shweghee testimonials view behavior.
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

	function scrollStep( track ) {
		var card = track.querySelector( '.testimonials__card' );
		return card ? card.offsetWidth + 24 : 320;
	}

	function updateDots( dots, cards, activeIndex ) {
		if ( ! dots ) {
			return;
		}
		qsa( dots, '.carousel-dots__dot' ).forEach( function ( dot, i ) {
			dot.classList.toggle( 'is-active', i === activeIndex );
		} );
	}

	function nearestIndex( track, cards ) {
		if ( ! cards.length ) {
			return 0;
		}
		var scrollLeft = track.scrollLeft;
		var closest = 0;
		var minDist = Infinity;
		cards.forEach( function ( card, i ) {
			var dist = Math.abs( card.offsetLeft - scrollLeft );
			if ( dist < minDist ) {
				minDist = dist;
				closest = i;
			}
		} );
		return closest;
	}

	function initCarousel( section ) {
		if ( section.getAttribute( 'data-review-init' ) === '1' ) {
			return;
		}

		var track = section.querySelector( '[data-review-track]' );
		if ( ! track ) {
			return;
		}

		var cards = qsa( track, '.testimonials__card' );
		if ( cards.length === 0 ) {
			return;
		}

		var dotsEl = section.querySelector( '[data-review-dots]' );
		var reduced = prefersReducedMotion();

		if ( dotsEl ) {
			dotsEl.innerHTML = cards
				.map( function ( _, i ) {
					return (
						'<button type="button" class="carousel-dots__dot' +
						( i === 0 ? ' is-active' : '' ) +
						'" aria-label="Slide ' +
						( i + 1 ) +
						'"></button>'
					);
				} )
				.join( '' );
		}

		function goTo( index ) {
			var i = Math.max( 0, Math.min( index, cards.length - 1 ) );
			var card = cards[ i ];
			if ( ! card ) {
				return;
			}
			track.scrollTo( {
				left: card.offsetLeft,
				behavior: reduced ? 'auto' : 'smooth',
			} );
			updateDots( dotsEl, cards, i );
		}

		section.addEventListener( 'click', function ( e ) {
			var target = e.target.closest( '[data-action]' );
			if ( ! target || ! section.contains( target ) ) {
				return;
			}
			var action = target.getAttribute( 'data-action' );
			var current = nearestIndex( track, cards );
			if ( action === 'review-next' ) {
				goTo( current + 1 );
			} else if ( action === 'review-prev' ) {
				goTo( current - 1 );
			}
		} );

		if ( dotsEl ) {
			dotsEl.addEventListener( 'click', function ( e ) {
				var dot = e.target.closest( '.carousel-dots__dot' );
				if ( ! dot ) {
					return;
				}
				var dots = qsa( dotsEl, '.carousel-dots__dot' );
				var index = dots.indexOf( dot );
				if ( index >= 0 ) {
					goTo( index );
				}
			} );
		}

		var scrollTimer;
		track.addEventListener( 'scroll', function () {
			window.clearTimeout( scrollTimer );
			scrollTimer = window.setTimeout( function () {
				updateDots( dotsEl, cards, nearestIndex( track, cards ) );
			}, 80 );
		} );

		section.setAttribute( 'data-review-init', '1' );
		section.classList.add( 'is-initialized' );
		updateDots( dotsEl, cards, 0 );
	}

	function init() {
		document
			.querySelectorAll( '.twork-review-carousel.testimonials' )
			.forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
