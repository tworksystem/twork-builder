( function () {
	'use strict';
	document
		.querySelectorAll(
			'.twork-dept-layout-section .faq-question, .dept-layout .faq-question'
		)
		.forEach( function ( btn ) {
			btn.addEventListener( 'click', function () {
				var answer = this.nextElementSibling;
				var isActive = this.classList.contains( 'active' );
				document
					.querySelectorAll( '.dept-layout .faq-question' )
					.forEach( function ( other ) {
						if (
							other !== btn &&
							other.classList.contains( 'active' )
						) {
							other.classList.remove( 'active' );
							other.nextElementSibling.style.maxHeight = '0';
						}
					} );
				this.classList.toggle( 'active' );
				answer.style.maxHeight = isActive
					? '0'
					: answer.scrollHeight + 'px';
			} );
		} );
} )();
