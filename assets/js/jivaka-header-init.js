/**
 * Jivaka header mobile navigation interactions.
 *
 * - Toggles `.nav-active` on the nearest `.header`
 * - Toggles `.dropdown-active` on `.nav-item.has-mobile-dropdown`
 * - Adds basic a11y state via aria-expanded
 */
( function () {
	function initHeader( headerEl ) {
		const navToggle = headerEl.querySelector( '.nav-toggle' );
		const overlay = headerEl.querySelector( '.mobile-nav-overlay' );
		const body = document.body;

		if ( ! navToggle || ! overlay ) return;

		function setOpen( isOpen ) {
			headerEl.classList.toggle( 'nav-active', isOpen );
			navToggle.setAttribute(
				'aria-expanded',
				isOpen ? 'true' : 'false'
			);
			body.style.overflow = isOpen ? 'hidden' : '';

			if ( ! isOpen ) {
				headerEl
					.querySelectorAll(
						'.nav-item.has-mobile-dropdown.dropdown-active'
					)
					.forEach( ( item ) =>
						item.classList.remove( 'dropdown-active' )
					);
				headerEl
					.querySelectorAll(
						".mobile-dropdown-head[aria-expanded='true']"
					)
					.forEach( ( head ) =>
						head.setAttribute( 'aria-expanded', 'false' )
					);
			}
		}

		navToggle.setAttribute( 'aria-expanded', 'false' );

		navToggle.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			setOpen( ! headerEl.classList.contains( 'nav-active' ) );
		} );

		// Close when clicking outside menu content (overlay background)
		overlay.addEventListener( 'click', ( e ) => {
			const content = overlay.querySelector( '.mobile-nav-content' );
			if ( content && content.contains( e.target ) ) return;
			setOpen( false );
		} );

		// ESC closes menu
		document.addEventListener( 'keydown', ( e ) => {
			if (
				e.key === 'Escape' &&
				headerEl.classList.contains( 'nav-active' )
			) {
				setOpen( false );
			}
		} );

		// Mobile dropdown accordion (event delegation)
		headerEl.addEventListener( 'click', ( e ) => {
			const head = e.target.closest( '.mobile-dropdown-head' );
			if ( ! head || ! headerEl.contains( head ) ) return;

			const parentItem = head.closest( '.nav-item.has-mobile-dropdown' );
			if ( ! parentItem ) return;

			// Optional: close other open items
			headerEl
				.querySelectorAll( '.nav-item.has-mobile-dropdown' )
				.forEach( ( item ) => {
					if ( item !== parentItem )
						item.classList.remove( 'dropdown-active' );
				} );

			const isOpen = parentItem.classList.toggle( 'dropdown-active' );
			head.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
		} );
	}

	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '.jivaka-header-container .header' )
			.forEach( initHeader );
	} );
} )();
