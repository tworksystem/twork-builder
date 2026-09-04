( function () {
	'use strict';
	function init() {
		let btn = document.querySelector( '[data-block="twork/back-to-top"]' );
		if ( ! btn ) {
			btn = document.createElement( 'button' );
			btn.type = 'button';
			btn.className = 'back-to-top';
			btn.dataset.block = 'twork/back-to-top';
			btn.setAttribute( 'aria-label', 'Back to top' );
			btn.textContent = '↑';
			document.body.appendChild( btn );
		}
		const rm = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		function onScroll() {
			btn.classList.toggle( 'is-visible', window.scrollY > 400 );
		}
		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();
		btn.addEventListener( 'click', function () {
			window.scrollTo( { top: 0, behavior: rm ? 'auto' : 'smooth' } );
		} );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
