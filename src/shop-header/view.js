( function () {
	'use strict';
	function init( root ) {
		if ( root.dataset.shopHeaderInit ) {
			return;
		}
		root.dataset.shopHeaderInit = '1';
		const toggle = root.querySelector( '[data-action="shop-menu-toggle"]' );
		if ( toggle ) {
			toggle.addEventListener( 'click', function () {
				const open = document.body.classList.toggle( 'shop-nav-open' );
				toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
			} );
		}
		root.querySelector( '.shop-header__search' )?.addEventListener(
			'submit',
			function ( e ) {
				/* allow native GET search when action is set */
			}
		);
	}
	function initAll() {
		document
			.querySelectorAll( '.shop-header[data-block="twork/shop-header"]' )
			.forEach( init );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
