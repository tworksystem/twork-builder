/**
 * Neuro Centre Section – FAQ accordion behaviour.
 * Toggles .faq-content--open on the answer when .faq-btn is clicked.
 * Supports dynamic FAQ items (neuro-faq-item blocks) and legacy static items.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-neuro-centre-section';
	const FAQ_ITEM_SELECTOR = '.faq-item';
	const BTN_SELECTOR = '.faq-btn';
	const CONTENT_SELECTOR = '.faq-content';
	const OPEN_CLASS = 'faq-content--open';

	function initFaqAccordions() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( function ( section ) {
				const items = section.querySelectorAll( FAQ_ITEM_SELECTOR );
				items.forEach( function ( item ) {
					const btn = item.querySelector( BTN_SELECTOR );
					const content = item.querySelector( CONTENT_SELECTOR );
					if ( ! btn || ! content ) {
						return;
					}
					if ( btn.dataset.neuroFaqBound ) {
						return;
					}
					btn.dataset.neuroFaqBound = '1';

					btn.addEventListener( 'click', function () {
						const isOpen = content.classList.contains( OPEN_CLASS );
						items.forEach( function ( other ) {
							const otherContent =
								other.querySelector( CONTENT_SELECTOR );
							if ( otherContent ) {
								otherContent.classList.remove( OPEN_CLASS );
							}
						} );
						if ( ! isOpen ) {
							content.classList.add( OPEN_CLASS );
						}
					} );
				} );
				// Open first FAQ by default if none open
				if ( items.length ) {
					let anyOpen = false;
					items.forEach( function ( item ) {
						const c = item.querySelector( CONTENT_SELECTOR );
						if ( c && c.classList.contains( OPEN_CLASS ) ) {
							anyOpen = true;
						}
					} );
					if ( ! anyOpen ) {
						const firstContent =
							items[ 0 ].querySelector( CONTENT_SELECTOR );
						if ( firstContent ) {
							firstContent.classList.add( OPEN_CLASS );
						}
					}
				}
			} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initFaqAccordions );
	} else {
		initFaqAccordions();
	}
} )();
