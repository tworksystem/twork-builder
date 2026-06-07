( function () {
	'use strict';

	const HEADER_SELECTOR =
		'.wp-block-twork-brand-header.twork-brand-header, [data-block="twork/brand-header"]';

	function debounce( fn, wait ) {
		let timerId;
		return function debounced( ...args ) {
			window.clearTimeout( timerId );
			timerId = window.setTimeout( () => fn.apply( this, args ), wait );
		};
	}

	function bindStickyHeader( rootEl ) {
		if ( rootEl.dataset.sticky === 'false' ) {
			return;
		}

		const onScroll = debounce( () => {
			rootEl.classList.toggle(
				'twork-brand-header--scrolled',
				window.scrollY > 20
			);
		}, 80 );

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();
	}

	function initHeader( rootEl ) {
		if ( rootEl.dataset.tworkBrandHeaderInit === 'true' ) {
			return;
		}

		rootEl.dataset.tworkBrandHeaderInit = 'true';

		const toggle = rootEl.querySelector( "[data-action='menu-toggle']" );

		if ( toggle ) {
			toggle.addEventListener( 'click', () => {
				const expanded = toggle.getAttribute( 'aria-expanded' ) === 'true';
				const next = ! expanded;
				toggle.setAttribute( 'aria-expanded', String( next ) );
				rootEl.classList.toggle( 'twork-brand-header--open', next );
				document.body.classList.toggle( 'nav-open', next );
			} );
		}

		document.addEventListener( 'keydown', ( event ) => {
			if (
				event.key === 'Escape' &&
				rootEl.classList.contains( 'twork-brand-header--open' )
			) {
				const btn = rootEl.querySelector( "[data-action='menu-toggle']" );
				btn?.setAttribute( 'aria-expanded', 'false' );
				rootEl.classList.remove( 'twork-brand-header--open' );
				document.body.classList.remove( 'nav-open' );
				btn?.focus();
			}
		} );

		bindStickyHeader( rootEl );
	}

	function initAllHeaders() {
		document.querySelectorAll( HEADER_SELECTOR ).forEach( initHeader );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllHeaders );
	} else {
		initAllHeaders();
	}
} )();
