/**
 * Endoscopy prep — tab glider + panel swap.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-prep-section';

	function moveGlider( tablist, glider, btn ) {
		if ( ! glider || ! btn ) {
			return;
		}
		glider.style.width = btn.offsetWidth + 'px';
		glider.style.transform = 'translateX(' + ( btn.offsetLeft - 6 ) + 'px)';
	}

	function activateTab( section, key, btn, tablist, glider ) {
		tablist.querySelectorAll( '.tab' ).forEach( function ( tab ) {
			tab.classList.remove( 'is-active' );
		} );
		if ( btn ) {
			btn.classList.add( 'is-active' );
			moveGlider( tablist, glider, btn );
		}

		section.querySelectorAll( '.panel' ).forEach( function ( panel ) {
			panel.classList.remove( 'is-active' );
		} );
		const panel = section.querySelector( '#panel-' + key );
		if ( panel ) {
			panel.classList.add( 'is-active' );
		}
	}

	function initPrepSection( section ) {
		if ( section.dataset.endoPrepBound === '1' ) {
			return;
		}
		section.dataset.endoPrepBound = '1';

		const tablist = section.querySelector( '.endo-prep-tablist' );
		if ( ! tablist ) {
			return;
		}

		const glider = tablist.querySelector( '.endo-prep-glider' );
		const tabBlocks = section.querySelectorAll(
			'.endo-prep-tab[data-show-tab="1"]'
		);
		let firstBtn = null;
		let firstKey = null;

		tabBlocks.forEach( function ( tabBlock ) {
			const key = tabBlock.getAttribute( 'data-tab-key' );
			const label = tabBlock.getAttribute( 'data-tab-label' ) || key;
			if ( ! key ) {
				return;
			}

			const btn = document.createElement( 'button' );
			btn.type = 'button';
			btn.className = 'tab';
			btn.setAttribute( 'data-panel', key );
			btn.textContent = label;
			tablist.appendChild( btn );

			btn.addEventListener( 'click', function () {
				activateTab( section, key, btn, tablist, glider );
			} );

			if ( ! firstBtn ) {
				firstBtn = btn;
				firstKey = key;
			}

			const panel = tabBlock.querySelector( '.panel' );
			if ( panel && panel.classList.contains( 'is-active' ) ) {
				firstBtn = btn;
				firstKey = key;
			}
		} );

		if ( firstBtn && firstKey ) {
			activateTab( section, firstKey, firstBtn, tablist, glider );
		}
	}

	function initEndoPrep() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( initPrepSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoPrep );
	} else {
		initEndoPrep();
	}
} )();
