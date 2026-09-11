/**
 * Laparoscopy procedures — pointer spotlight on the bento cards.
 *
 * Fine pointers only; the effect is decorative and coarse pointers get the
 * plain card. Writes the two custom properties the stylesheet reads.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-procedures';
	const CARD_SELECTOR = '.lp-proc';

	function bindSection( section ) {
		if ( section.dataset.laparoProceduresBound === '1' ) {
			return;
		}
		section.dataset.laparoProceduresBound = '1';

		const fine =
			window.matchMedia &&
			window.matchMedia( '( pointer: fine )' ).matches;
		if ( ! fine ) {
			return;
		}

		section.querySelectorAll( CARD_SELECTOR ).forEach( function ( card ) {
			card.addEventListener( 'mousemove', function ( event ) {
				const rect = card.getBoundingClientRect();
				card.style.setProperty(
					'--lp-mx',
					event.clientX - rect.left + 'px'
				);
				card.style.setProperty(
					'--lp-my',
					event.clientY - rect.top + 'px'
				);
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
