/**
 * Physio FAQ Section – accordion behaviour.
 * Mirrors the interaction from physiotherapy-rehab.html:
 * - Click on .phy-faq-q toggles the parent .phy-faq-item "active" state.
 * - Expands/collapses .phy-faq-a with a smooth height transition.
 * - Swaps the icon between fa-plus / fa-minus.
 *
 * Works for any number of twork/phy-faq-section blocks on the page.
 */
( function () {
	'use strict';

	var SECTION_SELECTOR = '.twork-phy-faq-section';
	var ITEM_SELECTOR = '.phy-faq-item';
	var QUESTION_SELECTOR = '.phy-faq-q';
	var ANSWER_SELECTOR = '.phy-faq-a';

	function bindItem( item ) {
		if ( ! item ) return;

		var question = item.querySelector( QUESTION_SELECTOR );
		var answer = item.querySelector( ANSWER_SELECTOR );
		if ( ! question || ! answer ) return;

		// Avoid double-binding when content is re-rendered (AJAX / block updates).
		if ( question.dataset.phyFaqBound === '1' ) return;
		question.dataset.phyFaqBound = '1';

		question.addEventListener( 'click', function () {
			var isActive = item.classList.contains( 'active' );
			var icon =
				question.querySelector( 'i' ) || item.querySelector( 'i' );

			if ( isActive ) {
				// Collapse
				item.classList.remove( 'active' );
				answer.style.maxHeight = '0px';
				answer.style.marginTop = '0';
				if ( icon && icon.classList ) {
					icon.classList.remove( 'fa-minus' );
					icon.classList.add( 'fa-plus' );
				}
			} else {
				// Expand
				item.classList.add( 'active' );
				answer.style.maxHeight = answer.scrollHeight + 'px';
				answer.style.marginTop = '15px';
				if ( icon && icon.classList ) {
					icon.classList.remove( 'fa-plus' );
					icon.classList.add( 'fa-minus' );
				}
			}
		} );
	}

	function initPhyFaqAccordions() {
		var sections = document.querySelectorAll( SECTION_SELECTOR );
		if ( ! sections.length ) return;

		sections.forEach( function ( section ) {
			var items = section.querySelectorAll( ITEM_SELECTOR );
			if ( ! items.length ) return;
			items.forEach( bindItem );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initPhyFaqAccordions );
	} else {
		initPhyFaqAccordions();
	}

	// Observe for dynamically added blocks (e.g. patterns or AJAX render).
	function startObserver() {
		if ( typeof MutationObserver === 'undefined' || ! document.body )
			return;

		var observer = new MutationObserver( function ( mutations ) {
			for ( var i = 0; i < mutations.length; i++ ) {
				if (
					mutations[ i ].addedNodes &&
					mutations[ i ].addedNodes.length
				) {
					initPhyFaqAccordions();
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
