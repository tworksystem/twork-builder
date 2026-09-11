/**
 * Laparoscopy voices — one quote at a time with dots and optional autoplay.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-voices';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function bindSection( section ) {
		if ( section.dataset.laparoVoicesBound === '1' ) {
			return;
		}
		section.dataset.laparoVoicesBound = '1';

		const quotes = Array.prototype.slice.call(
			section.querySelectorAll( '.lp-vc-quote' )
		);
		if ( ! quotes.length ) {
			return;
		}

		const dotBox = section.querySelector( '[data-laparo-dots]' );
		const prev = section.querySelector( '[data-laparo-prev]' );
		const next = section.querySelector( '[data-laparo-next]' );
		const seconds = parseFloat( section.getAttribute( 'data-autoplay' ) );

		let at = 0;
		let timer = null;

		function show( index ) {
			at = ( index + quotes.length ) % quotes.length;
			quotes.forEach( function ( quote, n ) {
				quote.classList.toggle( 'is-on', n === at );
			} );
			if ( dotBox ) {
				Array.prototype.forEach.call(
					dotBox.children,
					function ( dot, n ) {
						dot.classList.toggle( 'is-on', n === at );
						dot.setAttribute(
							'aria-current',
							n === at ? 'true' : 'false'
						);
					}
				);
			}
		}

		function restart() {
			if ( timer ) {
				clearInterval( timer );
				timer = null;
			}
			if ( reduced || ! seconds || seconds <= 0 ) {
				return;
			}
			timer = setInterval( function () {
				show( at + 1 );
			}, seconds * 1000 );
		}

		if ( dotBox ) {
			quotes.forEach( function ( quote, n ) {
				const dot = document.createElement( 'button' );
				dot.type = 'button';
				dot.className = 'lp-vc-dot';
				dot.setAttribute( 'aria-label', String( n + 1 ) );
				dot.addEventListener( 'click', function () {
					show( n );
					restart();
				} );
				dotBox.appendChild( dot );
			} );
		}

		if ( prev ) {
			prev.addEventListener( 'click', function () {
				show( at - 1 );
				restart();
			} );
		}
		if ( next ) {
			next.addEventListener( 'click', function () {
				show( at + 1 );
				restart();
			} );
		}

		show( 0 );
		restart();
	}

	function init() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( bindSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
