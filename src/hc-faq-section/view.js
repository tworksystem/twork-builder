( function () {
	'use strict';
	var section = document.querySelector( '.twork-hc-faq-section' );
	if ( ! section ) return;
	section.querySelectorAll( '.hc-faq-q' ).forEach( function ( btn ) {
		btn.addEventListener( 'click', function () {
			var content = this.nextElementSibling;
			var icon = this.querySelector( 'i' );
			var isActive = this.classList.contains( 'active' );
			this.classList.toggle( 'active' );
			content.style.maxHeight = isActive
				? '0'
				: content.scrollHeight + 'px';
			if ( icon ) {
				if ( this.classList.contains( 'active' ) ) {
					icon.classList.remove( 'fa-plus' );
					icon.classList.add( 'fa-minus' );
				} else {
					icon.classList.remove( 'fa-minus' );
					icon.classList.add( 'fa-plus' );
				}
			}
			this.setAttribute(
				'aria-expanded',
				this.classList.contains( 'active' )
			);
		} );
	} );
} )();
