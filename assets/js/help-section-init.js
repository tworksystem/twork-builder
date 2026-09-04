( function () {
	'use strict';

	function resolveBookUrl( bookUrl, value, selectName ) {
		if ( ! value ) {
			return '#';
		}

		const paramKey = selectName || 'doctors';
		const encodedValue = encodeURIComponent( value );

		if ( bookUrl && bookUrl.indexOf( '{value}' ) !== -1 ) {
			return bookUrl.replace( /\{value\}/g, encodedValue );
		}

		if ( bookUrl ) {
			const separator = bookUrl.indexOf( '?' ) !== -1 ? '&' : '?';
			return (
				bookUrl +
				separator +
				encodeURIComponent( paramKey ) +
				'=' +
				encodedValue
			);
		}

		return '#?' + encodeURIComponent( paramKey ) + '=' + encodedValue;
	}

	function initHelpBookingForms() {
		const cards = document.querySelectorAll(
			'.wp-block-twork-help-section .help-booking-card, .help-section.jivaka-section .help-booking-card'
		);

		cards.forEach( function ( card ) {
			if ( card.getAttribute( 'data-help-book-init' ) === 'true' ) {
				return;
			}
			card.setAttribute( 'data-help-book-init', 'true' );

			const select = card.querySelector( '.help-dept-select' );
			const btn = card.querySelector( '[data-help-book-btn]' );

			if ( ! btn || ! select ) {
				return;
			}

			function syncBookButton() {
				const opt = select.options[ select.selectedIndex ];
				const value = opt ? opt.value : '';
				const bookUrl = opt
					? opt.getAttribute( 'data-book-url' ) || ''
					: '';
				const selectName = select.getAttribute( 'name' ) || 'doctors';
				const href = resolveBookUrl( bookUrl, value, selectName );
				const disabled = ! value;

				btn.setAttribute( 'href', href );
				btn.classList.toggle( 'is-disabled', disabled );

				if ( disabled ) {
					btn.setAttribute( 'aria-disabled', 'true' );
					btn.setAttribute( 'tabindex', '-1' );
				} else {
					btn.removeAttribute( 'aria-disabled' );
					btn.removeAttribute( 'tabindex' );
				}
			}

			select.addEventListener( 'change', syncBookButton );
			syncBookButton();
		} );
	}

	function initHelpSectionSlideshows() {
		const blocks = document.querySelectorAll(
			'.wp-block-twork-help-section .help-media-slideshow'
		);

		blocks.forEach( function ( slideshow ) {
			if (
				slideshow.getAttribute( 'data-help-slideshow-init' ) === 'true'
			) {
				return;
			}
			slideshow.setAttribute( 'data-help-slideshow-init', 'true' );

			const slides = Array.prototype.slice.call(
				slideshow.querySelectorAll( '.help-media-slide' )
			);
			if ( ! slides.length ) {
				return;
			}

			const intervalMs = Math.max(
				2000,
				parseInt(
					slideshow.getAttribute( 'data-slideshow-interval' ),
					10
				) || 5000
			);

			function setActiveIndex( index ) {
				for ( let i = 0; i < slides.length; i++ ) {
					slides[ i ].classList.toggle( 'is-active', i === index );
				}
			}

			setActiveIndex( 0 );

			if ( slides.length > 1 ) {
				let currentIndex = 0;
				setInterval( function () {
					currentIndex = ( currentIndex + 1 ) % slides.length;
					setActiveIndex( currentIndex );
				}, intervalMs );
			}
		} );
	}

	function initHelpSection() {
		initHelpSectionSlideshows();
		initHelpBookingForms();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initHelpSection );
	} else {
		initHelpSection();
	}
} )();
