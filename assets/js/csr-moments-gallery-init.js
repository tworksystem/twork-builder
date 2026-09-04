( function () {
	'use strict';

	if ( window.TworkCsrMomentsGallery?.initialized ) {
		return;
	}

	if (
		document.querySelector(
			'script[src*="csr-moments-gallery-section/view.js"]'
		)
	) {
		return;
	}

	const SECTION_SELECTOR =
		'.mk-csr-moments-gallery-section, .wp-block-twork-csr-moments-gallery-section';
	const ARROW_LEFT =
		'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
	const ARROW_RIGHT =
		'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';
	const CLOSE_ICON =
		'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>';

	var Lightbox = {
		overlay: null,
		items: [],
		currentIndex: 0,

		create() {
			if ( this.overlay ) {
				return this.overlay;
			}

			const div = document.createElement( 'div' );
			div.className = 'mk-csr-moments-lightbox';
			div.setAttribute( 'role', 'dialog' );
			div.setAttribute( 'aria-modal', 'true' );
			div.setAttribute( 'aria-label', 'Gallery viewer' );
			div.innerHTML =
				'' +
				'<div class="mk-csr-moments-lightbox-backdrop" aria-hidden="true"></div>' +
				'<button type="button" class="mk-csr-moments-lightbox-close" aria-label="Close">' +
				CLOSE_ICON +
				'</button>' +
				'<button type="button" class="mk-csr-moments-lightbox-prev" aria-label="Previous image">' +
				ARROW_LEFT +
				'</button>' +
				'<button type="button" class="mk-csr-moments-lightbox-next" aria-label="Next image">' +
				ARROW_RIGHT +
				'</button>' +
				'<div class="mk-csr-moments-lightbox-content"><img src="" alt="" class="mk-csr-moments-lightbox-img" /></div>' +
				'<p class="mk-csr-moments-lightbox-counter" aria-live="polite">' +
				'<span class="mk-csr-moments-lightbox-counter-current">1</span>' +
				'<span class="mk-csr-moments-lightbox-counter-sep">/</span>' +
				'<span class="mk-csr-moments-lightbox-counter-total">1</span>' +
				'</p>';
			document.body.appendChild( div );
			this.overlay = div;

			div.querySelector(
				'.mk-csr-moments-lightbox-backdrop'
			).addEventListener( 'click', function () {
				Lightbox.close();
			} );
			div.querySelector(
				'.mk-csr-moments-lightbox-close'
			).addEventListener( 'click', function () {
				Lightbox.close();
			} );
			div.querySelector(
				'.mk-csr-moments-lightbox-prev'
			).addEventListener( 'click', function ( e ) {
				e.stopPropagation();
				Lightbox.prev();
			} );
			div.querySelector(
				'.mk-csr-moments-lightbox-next'
			).addEventListener( 'click', function ( e ) {
				e.stopPropagation();
				Lightbox.next();
			} );

			document.addEventListener( 'keydown', function ( e ) {
				if ( ! div.classList.contains( 'is-open' ) ) {
					return;
				}
				if ( e.key === 'Escape' ) {
					Lightbox.close();
				} else if ( e.key === 'ArrowLeft' ) {
					e.preventDefault();
					Lightbox.prev();
				} else if ( e.key === 'ArrowRight' ) {
					e.preventDefault();
					Lightbox.next();
				}
			} );

			let touchStartX = 0;
			div.addEventListener(
				'touchstart',
				function ( e ) {
					touchStartX = e.changedTouches[ 0 ].screenX;
				},
				{ passive: true }
			);
			div.addEventListener(
				'touchend',
				function ( e ) {
					if ( ! div.classList.contains( 'is-open' ) ) {
						return;
					}
					const diff = e.changedTouches[ 0 ].screenX - touchStartX;
					if ( Math.abs( diff ) < 50 ) {
						return;
					}
					if ( diff > 0 ) {
						Lightbox.prev();
					} else {
						Lightbox.next();
					}
				},
				{ passive: true }
			);

			return div;
		},

		collectItems( section ) {
			return Array.prototype.slice
				.call( section.querySelectorAll( '.gallery-item img' ) )
				.filter( function ( img ) {
					return img && img.src;
				} )
				.map( function ( img ) {
					return {
						src: img.currentSrc || img.src,
						alt: img.alt || 'Gallery image',
					};
				} );
		},

		updateUI() {
			if ( ! this.overlay || ! this.items.length ) {
				return;
			}
			const item = this.items[ this.currentIndex ];
			const img = this.overlay.querySelector(
				'.mk-csr-moments-lightbox-img'
			);
			img.src = item.src;
			img.alt = item.alt;
			this.overlay.querySelector(
				'.mk-csr-moments-lightbox-counter-current'
			).textContent = String( this.currentIndex + 1 );
			this.overlay.querySelector(
				'.mk-csr-moments-lightbox-counter-total'
			).textContent = String( this.items.length );
			this.overlay.classList.toggle(
				'has-multiple',
				this.items.length > 1
			);
		},

		show( index ) {
			if ( ! this.items.length ) {
				return;
			}
			const total = this.items.length;
			this.currentIndex = ( ( index % total ) + total ) % total;
			this.updateUI();
		},

		prev() {
			this.show( this.currentIndex - 1 );
		},

		next() {
			this.show( this.currentIndex + 1 );
		},

		openAt( section, startIndex ) {
			this.items = this.collectItems( section );
			if ( ! this.items.length ) {
				return;
			}
			const el = this.create();
			this.currentIndex = Math.min(
				Math.max( startIndex, 0 ),
				this.items.length - 1
			);
			this.updateUI();
			el.classList.add( 'is-open' );
			document.body.style.overflow = 'hidden';
			el.querySelector( '.mk-csr-moments-lightbox-close' ).focus();
		},

		close() {
			if ( ! this.overlay ) {
				return;
			}
			this.overlay.classList.remove( 'is-open' );
			document.body.style.overflow = '';
			this.items = [];
			this.currentIndex = 0;
		},
	};

	function openGalleryItem( item ) {
		const section = item.closest( SECTION_SELECTOR );
		if ( ! section ) {
			return;
		}
		const galleryItems = section.querySelectorAll( '.gallery-item' );
		const startIndex = Array.prototype.indexOf.call( galleryItems, item );
		if ( startIndex < 0 ) {
			return;
		}
		Lightbox.openAt( section, startIndex );
	}

	function revealItem( item ) {
		item.classList.add( 'is-visible' );
		item.style.opacity = '1';
		item.style.transform = 'none';
	}

	function initScrollAnimations() {
		const prefersReducedMotion =
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		const sections = document.querySelectorAll( SECTION_SELECTOR );

		if ( ! sections.length ) {
			return;
		}

		sections.forEach( function ( section ) {
			const items = section.querySelectorAll( '.gallery-item' );
			if ( ! items.length ) {
				return;
			}

			const animationEnabled =
				section.getAttribute( 'data-animation' ) !== 'false';
			const animationDelay =
				parseInt(
					section.getAttribute( 'data-animation-delay' ),
					10
				) || 80;

			if (
				! animationEnabled ||
				prefersReducedMotion ||
				! ( 'IntersectionObserver' in window )
			) {
				items.forEach( function ( item ) {
					item.classList.remove( 'animate-on-scroll' );
					revealItem( item );
				} );
				return;
			}

			items.forEach( function ( item, index ) {
				if ( ! item.classList.contains( 'animate-on-scroll' ) ) {
					item.classList.add( 'animate-on-scroll' );
				}
				item.style.transitionDelay = index * animationDelay + 'ms';
			} );

			var observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							revealItem( entry.target );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
			);

			items.forEach( function ( item ) {
				observer.observe( item );
			} );
		} );
	}

	document.addEventListener( 'click', function ( e ) {
		const item = e.target.closest( SECTION_SELECTOR + ' .gallery-item' );
		if ( ! item ) {
			return;
		}
		e.preventDefault();
		openGalleryItem( item );
	} );

	document.addEventListener( 'keydown', function ( e ) {
		if ( e.key !== 'Enter' && e.key !== ' ' ) {
			return;
		}
		const item = e.target.closest( SECTION_SELECTOR + ' .gallery-item' );
		if ( ! item ) {
			return;
		}
		e.preventDefault();
		openGalleryItem( item );
	} );

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initScrollAnimations );
	} else {
		initScrollAnimations();
	}

	window.TworkCsrMomentsGallery = {
		initialized: true,
		init: initScrollAnimations,
	};
} )();
