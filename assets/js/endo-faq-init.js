/**
 * Endoscopy FAQ — accordion open/close (vanilla).
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-faq-section';
	const ITEM_SELECTOR = '.faq';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function closeItem( item ) {
		item.classList.remove( 'is-open' );
		const body = item.querySelector( '.faq-a' );
		if ( body ) {
			body.style.height = '0px';
		}
	}

	function openItem( item ) {
		const body = item.querySelector( '.faq-a' );
		const inner = item.querySelector( '.faq-a-inner' );
		if ( ! body || ! inner ) {
			return;
		}
		item.classList.add( 'is-open' );
		if ( reduced ) {
			body.style.height = 'auto';
		} else {
			body.style.height = inner.offsetHeight + 'px';
		}
	}

	function bindFaqSection( section ) {
		if ( section.dataset.endoFaqBound === '1' ) {
			return;
		}
		section.dataset.endoFaqBound = '1';

		if ( section.getAttribute( 'data-accordion' ) !== '1' ) {
			return;
		}

		const items = section.querySelectorAll( ITEM_SELECTOR );
		items.forEach( function ( item ) {
			const btn = item.querySelector( '.faq-q' );
			if ( ! btn || btn.dataset.endoFaqBtnBound === '1' ) {
				return;
			}
			btn.dataset.endoFaqBtnBound = '1';

			btn.addEventListener( 'click', function () {
				const isOpen = item.classList.contains( 'is-open' );

				items.forEach( function ( other ) {
					if ( other !== item ) {
						closeItem( other );
					}
				} );

				if ( isOpen ) {
					closeItem( item );
				} else {
					openItem( item );
				}
			} );
		} );
	}

	function initEndoFaq() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( bindFaqSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoFaq );
	} else {
		initEndoFaq();
	}
} )();
