/**
 * FAQ accordion for brand page blocks.
 */
( function () {
	'use strict';

	function initAccordion( rootEl ) {
		const items = rootEl.querySelectorAll( '[data-accordion-item]' );
		items.forEach( function ( item ) {
			const trigger = item.querySelector(
				'[data-action="accordion-toggle"]'
			);
			const panel = item.querySelector( '[data-accordion-panel]' );
			if ( ! trigger || ! panel ) {
				return;
			}

			const isOpen =
				item.dataset.open === 'true' ||
				item.classList.contains( 'is-open' );
			if ( isOpen ) {
				item.classList.add( 'is-open' );
				trigger.setAttribute( 'aria-expanded', 'true' );
				panel.hidden = false;
			}

			trigger.addEventListener( 'click', function () {
				const expanded =
					trigger.getAttribute( 'aria-expanded' ) === 'true';
				items.forEach( function ( other ) {
					const otherTrigger = other.querySelector(
						'[data-action="accordion-toggle"]'
					);
					const otherPanel = other.querySelector(
						'[data-accordion-panel]'
					);
					if ( ! otherTrigger || ! otherPanel ) {
						return;
					}
					other.classList.remove( 'is-open' );
					otherTrigger.setAttribute( 'aria-expanded', 'false' );
					otherPanel.hidden = true;
				} );
				if ( ! expanded ) {
					item.classList.add( 'is-open' );
					trigger.setAttribute( 'aria-expanded', 'true' );
					panel.hidden = false;
				}
			} );
		} );
	}

	function initAll() {
		document
			.querySelectorAll( '.faq-accordion-section' )
			.forEach( function ( el ) {
				if ( el.dataset.brandAccordionInit ) {
					return;
				}
				el.dataset.brandAccordionInit = '1';
				initAccordion( el );
			} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}

	window.TworkBrandAccordion = { init: initAll };
} )();
