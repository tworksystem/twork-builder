( function () {
	'use strict';

	function initTabs( root ) {
		root.querySelectorAll( '[data-action="tab-switch"]' ).forEach(
			( btn ) => {
				btn.addEventListener( 'click', () => {
					const tabId = btn.dataset.tab;
					root.querySelectorAll(
						'[data-action="tab-switch"]'
					).forEach( ( b ) => {
						const active = b === btn;
						b.classList.toggle( 'is-active', active );
						b.setAttribute(
							'aria-selected',
							active ? 'true' : 'false'
						);
					} );
					root.querySelectorAll( '[data-tab-panel]' ).forEach(
						( panel ) => {
							const show = panel.dataset.tabPanel === tabId;
							panel.classList.toggle( 'is-active', show );
							panel.hidden = ! show;
						}
					);
				} );
			}
		);
	}

	function init() {
		document
			.querySelectorAll( '[data-block="twork/product-detail-section"]' )
			.forEach( initTabs );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
