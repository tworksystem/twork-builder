( function () {
	'use strict';

	function debounce( fn, wait ) {
		let timeout;
		return function debounced() {
			const context = this;
			const args = arguments;
			window.clearTimeout( timeout );
			timeout = window.setTimeout( function () {
				fn.apply( context, args );
			}, wait );
		};
	}

	function layoutFooterBlocks( footer ) {
		const source = footer.querySelector( '.brand-footer__blocks' );
		const infoGrid = footer.querySelector(
			'[data-list="infoCards"]'
		);
		const columns = footer.querySelector( '[data-list="columns"]' );

		if ( ! source || ! infoGrid || ! columns ) {
			return;
		}

		const infoCards = source.querySelectorAll(
			'.wp-block-twork-brand-footer-info-card, .footer__info-card'
		);
		const columnBlocks = source.querySelectorAll(
			'.wp-block-twork-brand-footer-column, .footer__column'
		);

		infoCards.forEach( function ( card ) {
			infoGrid.appendChild( card );
		} );

		columnBlocks.forEach( function ( column ) {
			columns.appendChild( column );
		} );

		if ( source.childElementCount === 0 ) {
			source.remove();
		} else {
			source.hidden = true;
		}

		footer.classList.add( 'is-layout-ready' );
	}

	function bindBackToTop( footer ) {
		if ( footer.dataset.showBackToTop === 'false' ) {
			return;
		}

		let btn = document.querySelector( "[data-action='back-to-top']" );
		if ( ! btn ) {
			btn = document.createElement( 'button' );
			btn.type = 'button';
			btn.className = 'back-to-top';
			btn.dataset.action = 'back-to-top';
			btn.setAttribute( 'aria-label', 'Back to top' );
			btn.innerHTML = '↑';
			document.body.appendChild( btn );
		}

		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		const onScroll = debounce( function () {
			btn.classList.toggle( 'is-visible', window.scrollY > 400 );
		}, 100 );

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();

		btn.addEventListener( 'click', function () {
			window.scrollTo( {
				top: 0,
				behavior: reducedMotion ? 'auto' : 'smooth',
			} );
		} );
	}

	function initBrandFooter( footer ) {
		if ( ! footer || footer.dataset.footerInit === 'true' ) {
			return;
		}
		footer.dataset.footerInit = 'true';
		layoutFooterBlocks( footer );
		bindBackToTop( footer );
	}

	document
		.querySelectorAll( '.twork-brand-footer' )
		.forEach( initBrandFooter );
} )();
