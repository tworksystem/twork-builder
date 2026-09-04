/**
 * Laparoscopy procedures — pointer spotlight on procedure cards.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-procedures-section';
	const CARD_SELECTOR = '.p-card';

	function bindSpotlight( section ) {
		if ( section.getAttribute( 'data-card-spotlight' ) !== '1' ) {
			return;
		}

		section.querySelectorAll( CARD_SELECTOR ).forEach( function ( card ) {
			if ( card.dataset.laparoSpotlightBound === '1' ) {
				return;
			}
			card.dataset.laparoSpotlightBound = '1';

			card.addEventListener( 'mousemove', function ( e ) {
				const rect = card.getBoundingClientRect();
				card.style.setProperty(
					'--mx',
					String( e.clientX - rect.left ) + 'px'
				);
				card.style.setProperty(
					'--my',
					String( e.clientY - rect.top ) + 'px'
				);
			} );
		} );
	}

	function initLaparoProcedures() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( function ( section ) {
				if ( section.dataset.laparoProceduresBound === '1' ) {
					return;
				}
				section.dataset.laparoProceduresBound = '1';
				bindSpotlight( section );
			} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initLaparoProcedures );
	} else {
		initLaparoProcedures();
	}
} )();
