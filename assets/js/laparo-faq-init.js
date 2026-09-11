/**
 * Laparoscopy FAQ — accordion with aria-expanded and measured heights.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-faq';

	function bindSection( section ) {
		if ( section.dataset.laparoFaqBound === '1' ) {
			return;
		}
		section.dataset.laparoFaqBound = '1';

		section.querySelectorAll( '.lp-faq-item' ).forEach( function ( item ) {
			const button = item.querySelector( '.lp-faq-q' );
			const panel = item.querySelector( '.lp-faq-a' );
			if ( ! button || ! panel ) {
				return;
			}

			button.setAttribute( 'aria-expanded', 'false' );
			panel.style.maxHeight = '0px';

			button.addEventListener( 'click', function () {
				const open = item.classList.toggle( 'is-open' );
				button.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
				panel.style.maxHeight = open
					? panel.scrollHeight + 'px'
					: '0px';
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
