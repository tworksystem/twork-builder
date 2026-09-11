/**
 * Laparoscopy surgeons — inline detail drawer under the portrait row.
 *
 * Each card ships its own detail markup hidden inside itself, because a block
 * cannot read its siblings at save time. Clicking a card moves that detail
 * into the shared drawer below the row.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-surgeons';
	const CARD_SELECTOR = '.lp-sg-card';

	function bindSection( section ) {
		if ( section.dataset.laparoSurgeonsBound === '1' ) {
			return;
		}
		section.dataset.laparoSurgeonsBound = '1';

		const drawer = section.querySelector( '[data-laparo-drawer]' );
		const cards = Array.prototype.slice.call(
			section.querySelectorAll( CARD_SELECTOR )
		);

		if ( ! drawer || ! cards.length ) {
			return;
		}

		const inner = drawer.querySelector( '.lp-sg-drawer-in' );
		let openIndex = -1;

		function close() {
			cards.forEach( function ( card ) {
				card.classList.remove( 'is-on' );
				const button = card.querySelector( '.lp-sg-open' );
				if ( button ) {
					button.setAttribute( 'aria-expanded', 'false' );
				}
				// Put the detail back where it came from.
				const detail = card.dataset.laparoDetailOut === '1';
				if ( detail && inner.firstChild ) {
					card.appendChild( inner.firstChild );
					card.dataset.laparoDetailOut = '0';
				}
			} );
			drawer.hidden = true;
			openIndex = -1;
		}

		cards.forEach( function ( card, index ) {
			const button = card.querySelector( '.lp-sg-open' );
			const detail = card.querySelector( '.lp-sg-detail' );
			if ( ! button || ! detail ) {
				return;
			}

			button.addEventListener( 'click', function () {
				if ( openIndex === index ) {
					close();
					return;
				}

				close();

				card.classList.add( 'is-on' );
				button.setAttribute( 'aria-expanded', 'true' );
				detail.hidden = false;
				inner.appendChild( detail );
				card.dataset.laparoDetailOut = '1';
				drawer.hidden = false;
				openIndex = index;
			} );
		} );
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
