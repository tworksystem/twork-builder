( function () {
	'use strict';

	const RATE_MS = 30000;
	let lastSubmit = 0;

	function cfg() {
		return window.tworkContactForm || {};
	}

	function i18n( key, fallback ) {
		const map = cfg().i18n || {};
		return map[ key ] || fallback;
	}

	function setFeedback( el, text, state ) {
		if ( ! el ) {
			return;
		}
		el.classList.remove( 'u-hidden', 'is-error', 'is-success' );
		if ( state ) {
			el.classList.add( state );
		}
		el.textContent = text;
	}

	function initForm( rootEl ) {
		const form = rootEl.querySelector( '[data-action="contact-submit"]' );
		if ( ! form || form.dataset.formInit ) {
			return;
		}
		form.dataset.formInit = '1';

		form.addEventListener( 'submit', function ( e ) {
			e.preventDefault();

			const hp = form.querySelector( '.contact-form__hp' );
			if ( hp && hp.value ) {
				return;
			}

			const feedback = rootEl.querySelector( '[data-field="feedback"]' );
			const submitBtn = form.querySelector( '[type="submit"]' );
			let name = ( form.querySelector( '[name="name"]' ) || {} ).value;
			let phone = ( form.querySelector( '[name="phone"]' ) || {} ).value;
			let message = ( form.querySelector( '[name="message"]' ) || {} )
				.value;
			name = name ? String( name ).trim() : '';
			phone = phone ? String( phone ).trim() : '';
			message = message ? String( message ).trim() : '';

			if ( ! name || ! phone || ! message ) {
				setFeedback(
					feedback,
					i18n(
						'required',
						'ကျေးဇူးပြု၍ လိုအပ်သော အကွက်များ ဖြည့်ပါ။'
					),
					'is-error'
				);
				return;
			}

			const now = Date.now();
			if ( now - lastSubmit < RATE_MS ) {
				setFeedback(
					feedback,
					i18n( 'rateLimit', 'ခဏစောင့်ပြီးမှ ထပ်ပို့ပါ။' ),
					'is-error'
				);
				return;
			}

			const ajaxUrl = cfg().ajaxUrl;
			const nonce = cfg().nonce;
			if ( ! ajaxUrl || ! nonce ) {
				setFeedback(
					feedback,
					i18n( 'error', 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။' ),
					'is-error'
				);
				return;
			}

			lastSubmit = now;
			if ( submitBtn ) {
				submitBtn.disabled = true;
			}
			setFeedback( feedback, i18n( 'sending', 'ပို့နေပါသည်…' ), null );

			const body = new FormData( form );
			body.set( 'action', 'twork_contact_submit' );
			body.set( 'nonce', nonce );

			fetch( ajaxUrl, {
				method: 'POST',
				credentials: 'same-origin',
				body,
			} )
				.then( function ( res ) {
					return res.json().then( function ( data ) {
						return { ok: res.ok, data };
					} );
				} )
				.then( function ( result ) {
					const data = result.data || {};
					if ( data.success ) {
						setFeedback(
							feedback,
							( data.data && data.data.message ) ||
								i18n(
									'success',
									'ပို့ပြီးပါပြီ။ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။'
								),
							'is-success'
						);
						form.reset();
					} else {
						setFeedback(
							feedback,
							( data.data && data.data.message ) ||
								i18n(
									'error',
									'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။'
								),
							'is-error'
						);
					}
				} )
				.catch( function () {
					setFeedback(
						feedback,
						i18n( 'error', 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။' ),
						'is-error'
					);
				} )
				.finally( function () {
					window.setTimeout( function () {
						if ( submitBtn ) {
							submitBtn.disabled = false;
						}
					}, RATE_MS );
				} );
		} );
	}

	function initAll() {
		document
			.querySelectorAll(
				'.contact-form[data-block="twork/contact-form-section"]'
			)
			.forEach( initForm );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
