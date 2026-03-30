( function () {
	'use strict';

	/**
	 * Dept Layout – Sidebar scroll spy (active nav on scroll)
	 */
	var initDeptLayout = function () {
		var sections = document.querySelectorAll(
			'.twork-dept-layout-section .content-section'
		);
		var navLinks = document.querySelectorAll(
			'.twork-dept-layout-section .sidebar-nav a'
		);

		if ( sections.length === 0 || navLinks.length === 0 ) return;

		var ticking = false;

		var updateActiveInternal = function () {
			var scrollY =
				window.pageYOffset || document.documentElement.scrollTop;
			var current = '';

			sections.forEach( function ( section ) {
				var top = section.offsetTop;
				if ( scrollY >= top - 200 ) {
					current = section.getAttribute( 'id' ) || '';
				}
			} );

			navLinks.forEach( function ( link ) {
				var href = link.getAttribute( 'href' ) || '';
				var id = '';

				// Support both pure hash links (#overview) and full URLs with hash
				// e.g. https://example.com/heart-centre/#overview
				if ( href.indexOf( '#' ) === 0 ) {
					id = href.slice( 1 );
				} else if ( href.indexOf( '#' ) > -1 ) {
					id = href.split( '#' )[ 1 ] || '';
				}

				link.classList.toggle( 'active', id && id === current );
			} );

			ticking = false;
		};

		var onScroll = function () {
			if ( ! ticking ) {
				ticking = true;
				if ( window.requestAnimationFrame ) {
					window.requestAnimationFrame( updateActiveInternal );
				} else {
					// Fallback for very old browsers
					setTimeout( updateActiveInternal, 16 );
				}
			}
		};

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		updateActiveInternal();
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initDeptLayout );
	} else {
		initDeptLayout();
	}
} )();
