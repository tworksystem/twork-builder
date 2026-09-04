( function () {
	'use strict';

	function getGrid() {
		return document.querySelector(
			'.product-grid-section[data-block="twork/product-grid-section"] .product-grid__grid, .product-grid-section[data-block="twork/product-grid-section"] .product-grid__list'
		);
	}

	function initToolbar( toolbar ) {
		if ( toolbar.dataset.toolbarInit ) {
			return;
		}
		toolbar.dataset.toolbarInit = '1';

		const sortEl = toolbar.querySelector( '[data-action="toolbar-sort"]' );
		const perPageEl = toolbar.querySelector(
			'[data-action="toolbar-per-page"]'
		);
		const layoutBtns = toolbar.querySelectorAll(
			'[data-action="toolbar-layout"]'
		);

		function applyLayout( layout ) {
			const grid = getGrid();
			if ( ! grid ) {
				return;
			}
			grid.className =
				layout === 'list'
					? 'product-grid__list'
					: 'product-grid__grid product-grid__grid--4';
			layoutBtns.forEach( function ( btn ) {
				btn.setAttribute(
					'aria-pressed',
					btn.dataset.layout === layout ? 'true' : 'false'
				);
			} );
		}

		layoutBtns.forEach( function ( btn ) {
			btn.addEventListener( 'click', function () {
				applyLayout( btn.dataset.layout || 'grid-4' );
			} );
		} );

		if ( sortEl ) {
			sortEl.addEventListener( 'change', function () {
				const url = new URL( window.location.href );
				url.searchParams.set( 'orderby', sortEl.value );
				if ( sortEl.value === 'default' ) {
					url.searchParams.delete( 'orderby' );
				}
				window.location.href = url.toString();
			} );
		}

		if ( perPageEl ) {
			perPageEl.addEventListener( 'change', function () {
				const url = new URL( window.location.href );
				url.searchParams.set( 'per_page', perPageEl.value );
				window.location.href = url.toString();
			} );
		}
	}

	function initAll() {
		document
			.querySelectorAll(
				'.shop-toolbar[data-block="twork/shop-toolbar"]'
			)
			.forEach( initToolbar );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
