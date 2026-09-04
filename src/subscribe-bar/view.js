( function () {
	'use strict';

	function isValidEmail( value ) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
	}

	function initSubscribeBar( rootEl ) {
		if ( rootEl.dataset.subscribeInit ) {
			return;
		}
		rootEl.dataset.subscribeInit = '1';

		const form = rootEl.querySelector(
			'[data-action="newsletter-submit"]'
		);
		if ( ! form ) {
			return;
		}

		form.addEventListener( 'submit', function ( event ) {
			event.preventDefault();
			const honeypot = form.querySelector( '.newsletter__hp' );
			if ( honeypot && honeypot.value ) {
				return;
			}

			const input = form.querySelector( "[name='email']" );
			const feedback = rootEl.querySelector( '[data-field="feedback"]' );
			const submitBtn = form.querySelector( '[type="submit"]' );

			if ( ! input || ! feedback ) {
				return;
			}

			feedback.classList.remove( 'u-hidden' );

			if ( ! isValidEmail( input.value.trim() ) ) {
				feedback.textContent = 'Please enter a valid email address.';
				return;
			}

			if ( submitBtn ) {
				submitBtn.disabled = true;
			}

			feedback.textContent =
				'Thank you! Connect a form plugin to store subscriptions.';

			form.reset();

			window.setTimeout( function () {
				if ( submitBtn ) {
					submitBtn.disabled = false;
				}
			}, 2000 );
		} );
	}

	function initAll() {
		document
			.querySelectorAll( '.newsletter[data-block="twork/subscribe-bar"]' )
			.forEach( initSubscribeBar );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
