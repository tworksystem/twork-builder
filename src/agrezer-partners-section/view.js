/**
 * Agrezer Partners: clone logo row for seamless CSS marquee (no deps).
 *
 * @package twork-builder
 */

( function () {
	'use strict';

	function shouldReduceMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function cloneTrackItems( section ) {
		if ( section.getAttribute( 'data-marquee' ) === 'false' ) {
			return;
		}
		if ( shouldReduceMotion() ) {
			section.classList.add( 'twork-partners--reduced-motion' );
			return;
		}

		var track = section.querySelector( '.twork-partners__track' );
		if ( ! track || track.getAttribute( 'data-partners-cloned' ) === '1' ) {
			return;
		}

		var items = track.querySelectorAll(
			':scope > .wp-block-twork-partners-item, :scope > .twork-partners__item'
		);
		if ( ! items.length ) {
			return;
		}

		items.forEach( function ( node ) {
			track.appendChild( node.cloneNode( true ) );
		} );
		track.setAttribute( 'data-partners-cloned', '1' );
	}

	function init() {
		document
			.querySelectorAll(
				'.twork-partners-section.twork-partners'
			)
			.forEach( cloneTrackItems );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
