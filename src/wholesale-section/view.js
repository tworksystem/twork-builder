( function () {
	'use strict';
	function initForm( rootEl, selector ) {
		const form = rootEl.querySelector( selector );
		if ( ! form || form.dataset.formInit ) {
			return;
		}
		form.dataset.formInit = '1';
		form.addEventListener( 'submit', function ( e ) {
			e.preventDefault();
			const hp = form.querySelector( '[class*="__hp"]' );
			if ( hp && hp.value ) {
				return;
			}
			const feedback = rootEl.querySelector( '[data-field="feedback"]' );
			if ( feedback ) {
				feedback.classList.remove( 'u-hidden' );
				feedback.textContent =
					'Thank you! Connect a form plugin to store submissions.';
			}
			form.reset();
		} );
	}
	function initAll() {
		document
			.querySelectorAll(
				'.contact-form[data-block="twork/contact-form-section"]'
			)
			.forEach( function ( el ) {
				initForm( el, '[data-action="contact-submit"]' );
			} );
		document
			.querySelectorAll(
				'.wholesale-section[data-block="twork/wholesale-section"]'
			)
			.forEach( function ( el ) {
				initForm( el, '[data-action="wholesale-submit"]' );
			} );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
