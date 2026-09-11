/**
 * Laparoscopy technology — sticky stage that follows the item list.
 *
 * Each item block ships its own image. Blocks cannot read their siblings at
 * save time, so the images live inside the items in the markup and this script
 * lifts them into the shared stage on load. Without JS the section still reads
 * as a plain list, which is why the images are hidden by CSS rather than
 * positioned over anything.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-laparo-technology';
	const ITEM_SELECTOR = '.lp-tech-item';
	const SHOT_SELECTOR = '.lp-tech-shot';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches;

	function pad( n ) {
		return ( n < 10 ? '0' : '' ) + n;
	}

	function bindSection( section ) {
		if ( section.dataset.laparoTechBound === '1' ) {
			return;
		}
		section.dataset.laparoTechBound = '1';

		const stage = section.querySelector( '[data-laparo-stage]' );
		const items = Array.prototype.slice.call(
			section.querySelectorAll( ITEM_SELECTOR )
		);
		if ( ! stage || ! items.length ) {
			return;
		}

		const hudLabel = section.querySelector( '[data-laparo-hud-label]' );
		const hudIndex = section.querySelector( '[data-laparo-hud-index]' );

		// Lift each item's image into the stage, keeping list order.
		const shots = [];
		items.forEach( function ( item ) {
			const shot = item.querySelector( SHOT_SELECTOR );
			if ( shot ) {
				stage.insertBefore( shot, stage.firstChild );
				shots.push( shot );
			} else {
				shots.push( null );
			}
		} );

		function setActive( index ) {
			items.forEach( function ( item, n ) {
				item.classList.toggle( 'is-active', n === index );
			} );
			shots.forEach( function ( shot, n ) {
				if ( shot ) {
					shot.classList.toggle( 'is-active', n === index );
				}
			} );
			if ( hudLabel ) {
				hudLabel.textContent =
					items[ index ].getAttribute( 'data-label' ) || '';
			}
			if ( hudIndex ) {
				hudIndex.textContent =
					pad( index + 1 ) + ' / ' + pad( items.length );
			}
		}

		items.forEach( function ( item, index ) {
			item.addEventListener( 'mouseenter', function () {
				setActive( index );
			} );
			item.addEventListener( 'click', function () {
				setActive( index );
			} );
		} );

		setActive( 0 );

		const IO = window.IntersectionObserver;
		if ( reduced || ! IO ) {
			return;
		}

		const observer = new IO(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( ! entry.isIntersecting ) {
						return;
					}
					setActive( items.indexOf( entry.target ) );
				} );
			},
			{ rootMargin: '-38% 0px -40% 0px', threshold: 0 }
		);

		items.forEach( function ( item ) {
			observer.observe( item );
		} );
	}

	function init() {
		document.querySelectorAll( SECTION_SELECTOR ).forEach( bindSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
