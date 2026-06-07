( function () {
	'use strict';

	function initFaqAccordion( section ) {
		if ( ! section || section.dataset.accordionInit === 'true' ) {
			return;
		}

		section.dataset.accordionInit = 'true';
		section.classList.add( 'is-accordion-enhanced' );

		const items = section.querySelectorAll(
			'[data-accordion-item], .faq__item'
		);

		items.forEach( function ( item, index ) {
			const trigger = item.querySelector(
				'[data-action="accordion-toggle"], summary.faq__trigger'
			);
			const panel = item.querySelector(
				'[data-accordion-panel], .faq__panel'
			);

			if ( ! trigger || ! panel ) {
				return;
			}

			if ( item.tagName === 'DETAILS' ) {
				item.addEventListener( 'toggle', function () {
					if ( item.open ) {
						items.forEach( function ( other ) {
							if ( other !== item && other.open ) {
								other.open = false;
								other.classList.remove( 'is-open' );
								const otherTrigger = other.querySelector(
									'[data-action="accordion-toggle"], summary.faq__trigger'
								);
								if ( otherTrigger ) {
									otherTrigger.setAttribute(
										'aria-expanded',
										'false'
									);
								}
							}
						} );
					}
					item.classList.toggle( 'is-open', item.open );
					trigger.setAttribute(
						'aria-expanded',
						item.open ? 'true' : 'false'
					);
				} );
			} else {
				trigger.addEventListener( 'click', function ( event ) {
					event.preventDefault();
					const isOpen = item.classList.contains( 'is-open' );

					items.forEach( function ( other ) {
						other.classList.remove( 'is-open' );
						const otherTrigger = other.querySelector(
							'[data-action="accordion-toggle"], summary.faq__trigger'
						);
						const otherPanel = other.querySelector(
							'[data-accordion-panel], .faq__panel'
						);
						if ( otherTrigger ) {
							otherTrigger.setAttribute(
								'aria-expanded',
								'false'
							);
						}
						if ( otherPanel ) {
							otherPanel.hidden = true;
						}
						if ( other.tagName === 'DETAILS' ) {
							other.open = false;
						}
					} );

					if ( ! isOpen ) {
						item.classList.add( 'is-open' );
						trigger.setAttribute( 'aria-expanded', 'true' );
						panel.hidden = false;
						if ( item.tagName === 'DETAILS' ) {
							item.open = true;
						}
					}
				} );
			}

			const openByDefault =
				item.dataset.open === 'true' ||
				item.classList.contains( 'is-open' ) ||
				( item.tagName === 'DETAILS' && item.open );

			if ( openByDefault ) {
				item.classList.add( 'is-open' );
				trigger.setAttribute( 'aria-expanded', 'true' );
				panel.hidden = false;
			} else if ( item.tagName !== 'DETAILS' ) {
				panel.hidden = true;
				trigger.setAttribute( 'aria-expanded', 'false' );
			}

			if ( ! panel.id ) {
				panel.id = 'faq-panel-' + index;
			}
			trigger.setAttribute( 'aria-controls', panel.id );
		} );
	}

	document
		.querySelectorAll( '.twork-faq-accordion-section' )
		.forEach( initFaqAccordion );
} )();
