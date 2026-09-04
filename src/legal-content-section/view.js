import '../shared/brand-accordion.js';
( function () {
	'use strict';
	function initLegal() {
		document
			.querySelectorAll(
				'.legal-content[data-block="twork/legal-content-section"]'
			)
			.forEach( function ( el ) {
				if ( el.dataset.legalInit ) {
					return;
				}
				el.dataset.legalInit = '1';
				el.querySelectorAll( '[data-accordion-item]' ).forEach(
					function ( item ) {
						const trigger = item.querySelector(
							'[data-action="accordion-toggle"]'
						);
						const panel = item.querySelector(
							'[data-accordion-panel]'
						);
						if ( ! trigger || ! panel ) {
							return;
						}
						if ( item.dataset.open === 'true' ) {
							item.classList.add( 'is-open' );
							trigger.setAttribute( 'aria-expanded', 'true' );
							panel.hidden = false;
						}
						trigger.addEventListener( 'click', function () {
							const open =
								trigger.getAttribute( 'aria-expanded' ) ===
								'true';
							trigger.setAttribute(
								'aria-expanded',
								open ? 'false' : 'true'
							);
							panel.hidden = open;
							item.classList.toggle( 'is-open', ! open );
						} );
					}
				);
			} );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initLegal );
	} else {
		initLegal();
	}
} )();
