( function () {
	'use strict';

	function initRadDiagnosticTabs() {
		const sections = document.querySelectorAll(
			'.mk-rad-diagnostic-tabs.rad-section'
		);

		if ( ! sections || ! sections.length ) {
			return;
		}

		sections.forEach( function ( section ) {
			if ( section.dataset.radTabsInit === '1' ) {
				return;
			}
			section.dataset.radTabsInit = '1';

			const tabButtons = section.querySelectorAll( '.rad-tab-btn' );
			const tabPanels = section.querySelectorAll( '.rad-tab-pane' );

			if ( ! tabButtons.length || ! tabPanels.length ) {
				return;
			}

			section.addEventListener( 'click', function ( e ) {
				const btn = e.target.closest( '.rad-tab-btn' );
				if ( ! btn || ! section.contains( btn ) ) {
					return;
				}

				e.preventDefault();
				const targetId = btn.getAttribute( 'data-tab' );
				if ( ! targetId ) {
					return;
				}

				tabButtons.forEach( function ( b ) {
					b.classList.remove( 'active' );
					b.setAttribute( 'aria-selected', 'false' );
				} );

				tabPanels.forEach( function ( panel ) {
					panel.classList.remove( 'active' );
					panel.hidden = true;
				} );

				btn.classList.add( 'active' );
				btn.setAttribute( 'aria-selected', 'true' );

				const escapedId =
					typeof CSS !== 'undefined' && CSS.escape
						? CSS.escape( targetId )
						: targetId.replace( /([^\w-])/g, '\\$1' );

				const targetPanel = section.querySelector( '#' + escapedId );
				if ( targetPanel ) {
					targetPanel.classList.add( 'active' );
					targetPanel.hidden = false;
				}
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initRadDiagnosticTabs );
	} else {
		initRadDiagnosticTabs();
	}

	function startObserver() {
		if ( typeof MutationObserver === 'undefined' || ! document.body ) {
			return;
		}

		const observer = new MutationObserver( function ( mutations ) {
			for ( let i = 0; i < mutations.length; i++ ) {
				if (
					mutations[ i ].addedNodes &&
					mutations[ i ].addedNodes.length
				) {
					initRadDiagnosticTabs();
					break;
				}
			}
		} );

		observer.observe( document.body, { childList: true, subtree: true } );
	}

	if ( document.body ) {
		startObserver();
	} else {
		document.addEventListener( 'DOMContentLoaded', startObserver );
	}
} )();
