/**
 * Jivaka header mobile navigation (global delegation).
 */
( function () {
	var GLOBAL_FLAG = '__JIVAKA_HEADER_EVENTS_BOUND__';

	function isGlobalBound() {
		return window[ GLOBAL_FLAG ] === true;
	}

	function markGlobalBound() {
		window[ GLOBAL_FLAG ] = true;
	}

	function getHeaderFromNode( node ) {
		return node && node.closest
			? node.closest( '.jivaka-header-container .header' )
			: null;
	}

	function setHeaderOpen( headerEl, isOpen ) {
		if ( ! headerEl ) {
			return;
		}

		var navToggle = headerEl.querySelector( '.nav-toggle' );

		headerEl.classList.toggle( 'nav-active', isOpen );

		if ( navToggle ) {
			navToggle.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
			navToggle.setAttribute(
				'aria-label',
				isOpen ? 'Close Navigation' : 'Open Navigation'
			);
		}

		document.body.style.overflow = isOpen ? 'hidden' : '';

		if ( ! isOpen ) {
			headerEl
				.querySelectorAll(
					'.nav-item.has-mobile-dropdown.dropdown-active'
				)
				.forEach( function ( item ) {
					item.classList.remove( 'dropdown-active' );
				} );
			headerEl
				.querySelectorAll(
					'.mobile-dropdown-head[aria-expanded="true"]'
				)
				.forEach( function ( head ) {
					head.setAttribute( 'aria-expanded', 'false' );
				} );
		}
	}

	function toggleMobileDropdown( head ) {
		var headerEl = getHeaderFromNode( head );
		var parentItem = head
			? head.closest( '.nav-item.has-mobile-dropdown' )
			: null;

		if ( ! headerEl || ! parentItem ) {
			return;
		}

		headerEl
			.querySelectorAll( '.nav-item.has-mobile-dropdown' )
			.forEach( function ( item ) {
				if ( item !== parentItem ) {
					item.classList.remove( 'dropdown-active' );
				}
			} );

		var isOpen = parentItem.classList.toggle( 'dropdown-active' );
		head.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
	}

	function stopEvent( event ) {
		event.preventDefault();
		event.stopPropagation();
		if ( typeof event.stopImmediatePropagation === 'function' ) {
			event.stopImmediatePropagation();
		}
	}

	function bindGlobalEvents() {
		if ( isGlobalBound() ) {
			return;
		}

		markGlobalBound();

		document.addEventListener(
			'click',
			function ( event ) {
				var toggle = event.target.closest(
					'.jivaka-header-container .header .nav-toggle'
				);

				if ( toggle ) {
					stopEvent( event );

					var headerEl = getHeaderFromNode( toggle );
					if ( ! headerEl ) {
						return;
					}

					setHeaderOpen(
						headerEl,
						! headerEl.classList.contains( 'nav-active' )
					);
					return;
				}

				var head = event.target.closest(
					'.jivaka-header-container .header .mobile-dropdown-head'
				);

				if ( head ) {
					stopEvent( event );
					toggleMobileDropdown( head );
					return;
				}

				var overlay = event.target.closest(
					'.jivaka-header-container .header .mobile-nav-overlay'
				);

				if ( overlay && event.target === overlay ) {
					stopEvent( event );
					setHeaderOpen( getHeaderFromNode( overlay ), false );
				}
			},
			true
		);

		document.addEventListener( 'keydown', function ( event ) {
			if ( event.key === 'Escape' ) {
				document
					.querySelectorAll(
						'.jivaka-header-container .header.nav-active'
					)
					.forEach( function ( headerEl ) {
						setHeaderOpen( headerEl, false );
					} );
			}
		} );
	}

	function prepareHeaders() {
		document
			.querySelectorAll( '.jivaka-header-container .header' )
			.forEach( function ( headerEl ) {
				var navToggle = headerEl.querySelector( '.nav-toggle' );
				if ( navToggle ) {
					navToggle.setAttribute( 'type', 'button' );
					navToggle.setAttribute( 'aria-expanded', 'false' );
					navToggle.setAttribute( 'aria-label', 'Open Navigation' );
				}

				headerEl
					.querySelectorAll( '.mobile-dropdown-head' )
					.forEach( function ( head ) {
						head.setAttribute( 'role', 'button' );
						head.setAttribute( 'tabindex', '0' );
						if ( ! head.getAttribute( 'aria-expanded' ) ) {
							head.setAttribute( 'aria-expanded', 'false' );
						}
					} );
			} );
	}

	function boot() {
		bindGlobalEvents();
		prepareHeaders();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
