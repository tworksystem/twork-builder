/**
 * Centre Layout Section – FAQ accordion and scroll animations.
 * Reusable for Neuro Centre, Heart Centre, Cancer Centre, etc.
 * Uses .twork-centre-layout-section as container.
 *
 * @since 1.0.0
 * @author Twork Builder
 */
( function () {
	'use strict';

	var SECTION_SELECTOR = '.twork-centre-layout-section';
	var FAQ_ITEM_SELECTOR = '.faq-item';
	var FAQ_BTN_SELECTOR = '.faq-btn';
	var FAQ_CONTENT_SELECTOR = '.faq-content';
	var OPEN_CLASS = 'faq-content--open';
	var FADE_DURATION = '0.8s';
	var STAGGER_DELAY = 150;

	function initFaqAccordions() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( function ( section ) {
				var items = section.querySelectorAll( FAQ_ITEM_SELECTOR );
				items.forEach( function ( item ) {
					var btn = item.querySelector( FAQ_BTN_SELECTOR );
					var content = item.querySelector( FAQ_CONTENT_SELECTOR );
					if ( ! btn || ! content ) return;
					if ( btn.dataset.centreFaqBound ) return;
					btn.dataset.centreFaqBound = '1';

					btn.addEventListener( 'click', function () {
						var isOpen = content.classList.contains( OPEN_CLASS );
						items.forEach( function ( other ) {
							var otherContent =
								other.querySelector( FAQ_CONTENT_SELECTOR );
							if ( otherContent ) {
								otherContent.classList.remove( OPEN_CLASS );
								otherContent.style.maxHeight = '';
							}
						} );
						if ( ! isOpen ) {
							content.classList.add( OPEN_CLASS );
							content.style.maxHeight =
								content.scrollHeight + 'px';
						} else {
							content.style.maxHeight = '';
						}
					} );
				} );
				// Open first FAQ by default if none open
				if ( items.length ) {
					var firstContent =
						items[ 0 ].querySelector( FAQ_CONTENT_SELECTOR );
					if (
						firstContent &&
						! firstContent.classList.contains( OPEN_CLASS )
					) {
						firstContent.classList.add( OPEN_CLASS );
						firstContent.style.maxHeight =
							firstContent.scrollHeight + 'px';
					}
				}
			} );
	}

	function isInViewport( el ) {
		var rect = el.getBoundingClientRect();
		var vh = window.innerHeight || document.documentElement.clientHeight;
		return rect.top < vh * 0.9 && rect.bottom > 0;
	}

	function revealEl( el ) {
		el.style.opacity = '1';
		el.style.visibility = 'visible';
		el.style.transform = 'translate(0, 0)';
	}

	function initScrollAnimations() {
		var sections = document.querySelectorAll( SECTION_SELECTOR );
		if ( ! sections.length ) return;

		if ( ! ( 'IntersectionObserver' in window ) ) {
			sections.forEach( function ( section ) {
				section
					.querySelectorAll( '.fade-up, .stagger-card, .stagger-doc' )
					.forEach( revealEl );
			} );
			return;
		}

		sections.forEach( function ( section ) {
			section.classList.add( 'centre-animations-enabled' );

			var sectionSections = section.querySelectorAll(
				'.content-section.fade-up, .centre-cta.fade-up'
			);
			sectionSections.forEach( function ( el ) {
				if ( isInViewport( el ) ) revealEl( el );
			} );

			section
				.querySelectorAll(
					'.content-section.fade-up, .centre-cta.fade-up'
				)
				.forEach( function ( el ) {
					var observer = new IntersectionObserver(
						function ( entries ) {
							entries.forEach( function ( entry ) {
								if ( entry.isIntersecting ) {
									requestAnimationFrame( function () {
										revealEl( entry.target );
									} );
									observer.unobserve( entry.target );
								}
							} );
						},
						{ threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
					);
					observer.observe( el );
				} );

			var treatmentGrid = section.querySelector( '.treatment-grid' );
			if (
				treatmentGrid &&
				treatmentGrid.querySelectorAll( '.stagger-card' ).length
			) {
				var cards = treatmentGrid.querySelectorAll(
					'.treatment-card.stagger-card'
				);
				if ( isInViewport( treatmentGrid ) ) {
					cards.forEach( function ( card, i ) {
						card.style.transitionDelay = i * STAGGER_DELAY + 'ms';
						revealEl( card );
					} );
				}
				var gridObserver = new IntersectionObserver(
					function ( entries ) {
						entries.forEach( function ( entry ) {
							if ( entry.isIntersecting ) {
								var list = entry.target.querySelectorAll(
									'.treatment-card.stagger-card'
								);
								list.forEach( function ( card, i ) {
									card.style.transitionDelay =
										i * STAGGER_DELAY + 'ms';
									requestAnimationFrame( function () {
										revealEl( card );
									} );
								} );
								gridObserver.unobserve( entry.target );
							}
						} );
					},
					{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
				);
				gridObserver.observe( treatmentGrid );
			}

			var deptDoctors = section.querySelector( '.dept-doctors' );
			if (
				deptDoctors &&
				deptDoctors.querySelectorAll( '.stagger-doc' ).length
			) {
				var docCards = deptDoctors.querySelectorAll(
					'.doctor-card-mini.stagger-doc'
				);
				if ( isInViewport( deptDoctors ) ) {
					docCards.forEach( function ( card, i ) {
						card.style.transitionDelay = i * STAGGER_DELAY + 'ms';
						revealEl( card );
					} );
				}
				var docObserver = new IntersectionObserver(
					function ( entries ) {
						entries.forEach( function ( entry ) {
							if ( entry.isIntersecting ) {
								var list = entry.target.querySelectorAll(
									'.doctor-card-mini.stagger-doc'
								);
								list.forEach( function ( card, i ) {
									card.style.transitionDelay =
										i * STAGGER_DELAY + 'ms';
									requestAnimationFrame( function () {
										revealEl( card );
									} );
								} );
								docObserver.unobserve( entry.target );
							}
						} );
					},
					{ threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
				);
				docObserver.observe( deptDoctors );
			}
		} );
	}

	function init() {
		initFaqAccordions();
		initScrollAnimations();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
	window.addEventListener( 'load', init );
} )();
