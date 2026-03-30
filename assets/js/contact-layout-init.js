/**
 * Contact Layout Section – Hotline accordion behaviour.
 * Toggles .active on .acc-item and animates .acc-body maxHeight.
 */
( function () {
	'use strict';

	function initAccordions() {
		var section = document.querySelector( '.twork-contact-layout-section' );
		if ( ! section ) return;

		var accordion = section.querySelector( '.hotline-accordion' );
		if ( ! accordion ) return;

		var heads = accordion.querySelectorAll( '.acc-head' );
		heads.forEach( function ( head ) {
			if ( head.dataset.contactLayoutBound ) return;
			head.dataset.contactLayoutBound = '1';

			head.addEventListener( 'click', function () {
				var item = head.parentElement;
				var body = head.nextElementSibling;

				// Close others
				accordion
					.querySelectorAll( '.acc-item' )
					.forEach( function ( other ) {
						if ( other !== item ) {
							other.classList.remove( 'active' );
							var otherBody = other.querySelector( '.acc-body' );
							if ( otherBody ) otherBody.style.maxHeight = '0';
						}
					} );

				item.classList.toggle( 'active' );
				if ( item.classList.contains( 'active' ) ) {
					body.style.maxHeight = body.scrollHeight + 'px';
				} else {
					body.style.maxHeight = '0';
				}
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAccordions );
	} else {
		initAccordions();
	}
} )();
