/**
 * Endoscopy technology — stage image sync from tech-item data attributes.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR = '.twork-endo-technology-section';
	const ITEM_SELECTOR = '.tech-item';
	const reduced =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function padIndex( n ) {
		return n < 10 ? '0' + n : String( n );
	}

	function getStageIndex( el, fallback ) {
		const raw = el.getAttribute( 'data-stage' );
		const parsed = parseInt( raw, 10 );
		return Number.isNaN( parsed ) ? fallback : parsed;
	}

	function buildStageImages( items, imageHost ) {
		imageHost.innerHTML = '';
		let firstStage = null;

		items.forEach( function ( item, loopIndex ) {
			const url = item.getAttribute( 'data-image-url' );
			if ( ! url ) {
				return;
			}
			const stageIdx = getStageIndex( item, loopIndex );
			if ( firstStage === null ) {
				firstStage = stageIdx;
			}
			const img = document.createElement( 'img' );
			img.setAttribute( 'data-stage', String( stageIdx ) );
			img.src = url;
			img.alt =
				item.getAttribute( 'data-image-alt' ) ||
				item.getAttribute( 'data-label' ) ||
				'';
			imageHost.appendChild( img );
		} );

		const stages = imageHost.querySelectorAll( 'img' );
		if ( stages.length && firstStage !== null ) {
			stages.forEach( function ( stage ) {
				stage.classList.toggle(
					'is-active',
					getStageIndex( stage, 0 ) === firstStage
				);
			} );
		}
	}

	function setStage( section, items, stages, activeIndex, label ) {
		items.forEach( function ( item, loopIndex ) {
			const idx = getStageIndex( item, loopIndex );
			item.classList.toggle( 'is-active', idx === activeIndex );
		} );
		stages.forEach( function ( stage ) {
			const idx = getStageIndex( stage, 0 );
			stage.classList.toggle( 'is-active', idx === activeIndex );
		} );

		const hudLabel = section.querySelector( '.endo-tech-hud-label' );
		const hudIndex = section.querySelector( '.endo-tech-hud-index' );
		if ( hudLabel && label ) {
			hudLabel.textContent = label;
		}
		if ( hudIndex && items.length ) {
			hudIndex.textContent =
				padIndex( activeIndex + 1 ) + ' / ' + padIndex( items.length );
		}
	}

	function bindScrollSync( items, stages, setStageFn ) {
		if ( reduced ) {
			return;
		}

		items.forEach( function ( item, loopIndex ) {
			const stageIdx = getStageIndex( item, loopIndex );
			const label = item.getAttribute( 'data-label' ) || '';
			const observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							setStageFn( stageIdx, label );
						}
					} );
				},
				{
					root: null,
					rootMargin: '-38% 0px -40% 0px',
					threshold: 0,
				}
			);
			observer.observe( item );
		} );
	}

	function initTechnologySection( section ) {
		if ( section.dataset.endoTechnologyBound === '1' ) {
			return;
		}
		section.dataset.endoTechnologyBound = '1';

		if ( section.getAttribute( 'data-stage-sync' ) !== '1' ) {
			return;
		}

		const items = section.querySelectorAll( ITEM_SELECTOR );
		if ( ! items.length ) {
			return;
		}

		const imageHost = section.querySelector( '.endo-tech-stage-images' );
		if ( imageHost ) {
			buildStageImages( items, imageHost );
		}

		const stages = imageHost ? imageHost.querySelectorAll( 'img' ) : [];

		const setStageLocal = function ( index, label ) {
			setStage( section, items, stages, index, label );
		};

		items.forEach( function ( item, loopIndex ) {
			const stageIdx = getStageIndex( item, loopIndex );
			const label = item.getAttribute( 'data-label' ) || '';
			item.addEventListener( 'mouseenter', function () {
				setStageLocal( stageIdx, label );
			} );
			item.addEventListener( 'focus', function () {
				setStageLocal( stageIdx, label );
			} );
		} );

		bindScrollSync( items, stages, setStageLocal );

		const firstIdx = getStageIndex( items[ 0 ], 0 );
		const firstLabel = items[ 0 ].getAttribute( 'data-label' ) || '';
		setStageLocal( firstIdx, firstLabel );
	}

	function initEndoTechnology() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( initTechnologySection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initEndoTechnology );
	} else {
		initEndoTechnology();
	}
} )();
