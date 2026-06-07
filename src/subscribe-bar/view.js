( function () {
	'use strict';

	function isValidEmail( value ) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
	}

	function initSubscribeBar( root ) {
		if ( ! root || root.dataset.subscribeInit === 'true' ) {
			return;
		}
		root.dataset.subscribeInit = 'true';

		const form = root.querySelector(
			"[data-action='newsletter-submit']"
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
			const feedback = root.querySelector( "[data-field='feedback']" );
			const submitBtn = form.querySelector( "[type='submit']" );

			if ( ! input || ! feedback ) {
				return;
			}

			feedback.classList.remove( 'u-hidden' );

			if ( ! isValidEmail( input.value.trim() ) ) {
				feedback.textContent =
					'ကျေးဇူးပြု၍ မှန်ကန်သော email ထည့်ပါ။';
				return;
			}

			if ( submitBtn ) {
				submitBtn.disabled = true;
			}

			feedback.textContent =
				'Demo: စာရင်းသွင်းမှု မှတ်တမ်းတင်မည်မဟုတ်ပါ (backend မချိတ်ရသေးပါ)။';
			form.reset();

			window.setTimeout( function () {
				if ( submitBtn ) {
					submitBtn.disabled = false;
				}
			}, 2000 );
		} );
	}

	document
		.querySelectorAll( '.twork-subscribe-bar' )
		.forEach( initSubscribeBar );
} )();
