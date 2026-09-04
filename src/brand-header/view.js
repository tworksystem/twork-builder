( function () {
	'use strict';

	function initHeader( rootEl ) {
		if ( rootEl.dataset.brandHeaderInit ) {
			return;
		}
		rootEl.dataset.brandHeaderInit = '1';

		const toggle = rootEl.querySelector( '[data-action="menu-toggle"]' );
		if ( toggle ) {
			toggle.addEventListener( 'click', function () {
				const expanded =
					toggle.getAttribute( 'aria-expanded' ) === 'true';
				const next = ! expanded;
				toggle.setAttribute( 'aria-expanded', String( next ) );
				rootEl.classList.toggle( 'header--open', next );
				document.body.classList.toggle( 'nav-open', next );
			} );
		}

		function onScroll() {
			rootEl.classList.toggle( 'header--scrolled', window.scrollY > 20 );
		}
		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();
	}

	function initAll() {
		document
			.querySelectorAll( '.header[data-block="twork/brand-header"]' )
			.forEach( initHeader );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
