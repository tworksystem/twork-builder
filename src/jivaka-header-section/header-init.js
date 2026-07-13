/**
 * Jivaka header interactions via document-level delegation.
 */
const GLOBAL_FLAG = '__JIVAKA_HEADER_EVENTS_BOUND__';

function isGlobalBound() {
	return (
		typeof window !== 'undefined' && window[ GLOBAL_FLAG ] === true
	);
}

function markGlobalBound() {
	if ( typeof window !== 'undefined' ) {
		window[ GLOBAL_FLAG ] = true;
	}
}

function getHeaderFromNode( node ) {
	return node?.closest?.( '.jivaka-header-container .header' ) || null;
}

function setHeaderOpen( headerEl, isOpen ) {
	if ( ! headerEl ) {
		return;
	}

	const navToggle = headerEl.querySelector( '.nav-toggle' );

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
			.querySelectorAll( '.nav-item.has-mobile-dropdown.dropdown-active' )
			.forEach( ( item ) => item.classList.remove( 'dropdown-active' ) );
		headerEl
			.querySelectorAll( '.mobile-dropdown-head[aria-expanded="true"]' )
			.forEach( ( head ) => head.setAttribute( 'aria-expanded', 'false' ) );
	}
}

function toggleMobileDropdown( head ) {
	const headerEl = getHeaderFromNode( head );
	const parentItem = head?.closest?.( '.nav-item.has-mobile-dropdown' );

	if ( ! headerEl || ! parentItem ) {
		return;
	}

	headerEl
		.querySelectorAll( '.nav-item.has-mobile-dropdown' )
		.forEach( ( item ) => {
			if ( item !== parentItem ) {
				item.classList.remove( 'dropdown-active' );
			}
		} );

	const isOpen = parentItem.classList.toggle( 'dropdown-active' );
	head.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
}

function stopEvent( event ) {
	event.preventDefault();
	event.stopPropagation();
	if ( typeof event.stopImmediatePropagation === 'function' ) {
		event.stopImmediatePropagation();
	}
}

export function bindJivakaHeaderGlobalEvents() {
	if ( isGlobalBound() || typeof document === 'undefined' ) {
		return;
	}

	markGlobalBound();

	document.addEventListener(
		'click',
		( event ) => {
			const toggle = event.target.closest(
				'.jivaka-header-container .header .nav-toggle'
			);

			if ( toggle ) {
				stopEvent( event );

				const headerEl = getHeaderFromNode( toggle );
				if ( ! headerEl ) {
					return;
				}

				setHeaderOpen(
					headerEl,
					! headerEl.classList.contains( 'nav-active' )
				);
				return;
			}

			const head = event.target.closest(
				'.jivaka-header-container .header .mobile-dropdown-head'
			);

			if ( head ) {
				stopEvent( event );
				toggleMobileDropdown( head );
				return;
			}

			const overlay = event.target.closest(
				'.jivaka-header-container .header .mobile-nav-overlay'
			);

			if ( overlay && event.target === overlay ) {
				stopEvent( event );
				setHeaderOpen( getHeaderFromNode( overlay ), false );
			}
		},
		true
	);

	document.addEventListener( 'keydown', ( event ) => {
		if ( event.key === 'Escape' ) {
			document
				.querySelectorAll( '.jivaka-header-container .header.nav-active' )
				.forEach( ( headerEl ) => setHeaderOpen( headerEl, false ) );
			return;
		}

		const head = event.target.closest?.(
			'.jivaka-header-container .header .mobile-dropdown-head'
		);

		if ( ! head ) {
			return;
		}

		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			toggleMobileDropdown( head );
		}
	} );
}

export function initJivakaHeader( headerEl ) {
	if ( ! headerEl ) {
		return;
	}

	const navToggle = headerEl.querySelector( '.nav-toggle' );
	const overlay = headerEl.querySelector( '.mobile-nav-overlay' );

	if ( ! navToggle || ! overlay ) {
		return;
	}

	navToggle.setAttribute( 'type', 'button' );
	navToggle.setAttribute( 'aria-expanded', 'false' );
	navToggle.setAttribute( 'aria-label', 'Open Navigation' );

	headerEl
		.querySelectorAll( '.mobile-dropdown-head' )
		.forEach( ( head ) => {
			head.setAttribute( 'role', 'button' );
			head.setAttribute( 'tabindex', '0' );
			if ( ! head.getAttribute( 'aria-expanded' ) ) {
				head.setAttribute( 'aria-expanded', 'false' );
			}
		} );
}

export function bootJivakaHeaders( root = document ) {
	bindJivakaHeaderGlobalEvents();

	const scope = root && root.querySelectorAll ? root : document;
	scope
		.querySelectorAll( '.jivaka-header-container .header' )
		.forEach( initJivakaHeader );
}
