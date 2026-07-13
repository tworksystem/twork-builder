( function () {
	function initIpdConsentTabs( root ) {
		const section = root || document;
		const blocks = section.querySelectorAll(
			'.mk-ipd-consent-content-section'
		);

		blocks.forEach( ( block ) => {
			if ( block.dataset.ipdConsentInit === 'true' ) {
				return;
			}
			block.dataset.ipdConsentInit = 'true';

			const tabs = block.querySelectorAll( '[data-view-tab]' );
			const panels = block.querySelectorAll( '.ipd-consent-panel' );
			const defaultView = block.dataset.defaultView || 'digital';

			if ( ! tabs.length || ! panels.length ) {
				return;
			}

			const activate = ( view ) => {
				tabs.forEach( ( tab ) => {
					const isActive = tab.dataset.viewTab === view;
					tab.classList.toggle( 'is-active', isActive );
					tab.setAttribute( 'aria-selected', isActive ? 'true' : 'false' );
				} );

				panels.forEach( ( panel ) => {
					const isDigital = panel.classList.contains(
						'ipd-consent-panel--digital'
					);
					const shouldShow =
						( view === 'digital' && isDigital ) ||
						( view === 'original' && ! isDigital );
					panel.classList.toggle( 'is-active', shouldShow );
				} );
			};

			tabs.forEach( ( tab ) => {
				tab.addEventListener( 'click', () => {
					activate( tab.dataset.viewTab );
				} );
			} );

			activate( defaultView );
		} );
	}

	function boot() {
		initIpdConsentTabs( document );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
