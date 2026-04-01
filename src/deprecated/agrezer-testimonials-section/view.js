/**
 * Agrezer testimonials carousel (vanilla JS).
 *
 * @package twork-builder
 */

( function () {
	'use strict';

	function qsa( el, sel ) {
		return Array.prototype.slice.call( el.querySelectorAll( sel ) );
	}

	function clearMount( mount ) {
		while ( mount.firstChild ) {
			mount.removeChild( mount.firstChild );
		}
	}

	function activate( section, slides, index, mount, loop ) {
		var total = slides.length;
		if ( total === 0 ) {
			return;
		}
		var i = ( ( index % total ) + total ) % total;

		slides.forEach( function ( slide, idx ) {
			var isOn = idx === i;
			slide.classList.toggle( 'is-active', isOn );
			slide.setAttribute( 'aria-hidden', isOn ? 'false' : 'true' );
		} );

		if ( mount ) {
			clearMount( mount );
			var tmpl = slides[ i ].querySelector(
				'template.agrezer-testimonials__author-template'
			);
			if ( tmpl && tmpl.content ) {
				mount.appendChild( tmpl.content.cloneNode( true ) );
			}
		}

		var prev = section.querySelector(
			'.agrezer-testimonials__control-btn--prev'
		);
		var next = section.querySelector(
			'.agrezer-testimonials__control-btn--next'
		);
		if ( prev && next && ! loop ) {
			prev.disabled = i === 0;
			next.disabled = i === total - 1;
		} else if ( prev && next ) {
			prev.disabled = false;
			next.disabled = false;
		}
	}

	function initSection( section ) {
		if ( section.getAttribute( 'data-carousel-init' ) === '1' ) {
			return;
		}
		var track = section.querySelector( '.agrezer-testimonials__slides' );
		if ( ! track ) {
			return;
		}

		var slides = qsa(
			track,
			'.wp-block-twork-agrezer-testimonial-slide, .agrezer-testimonials__slide'
		);
		if ( slides.length === 0 ) {
			return;
		}

		var mount = section.querySelector(
			'.agrezer-testimonials__author-mount'
		);
		var loop = section.getAttribute( 'data-carousel-loop' ) !== 'false';
		var index = 0;

		section.setAttribute( 'data-carousel-init', '1' );
		section.classList.add( 'is-initialized' );

		activate( section, slides, index, mount, loop );

		var prevBtn = section.querySelector(
			'.agrezer-testimonials__control-btn--prev'
		);
		var nextBtn = section.querySelector(
			'.agrezer-testimonials__control-btn--next'
		);

		function go( delta ) {
			var total = slides.length;
			var nextIndex = index + delta;
			if ( ! loop ) {
				if ( nextIndex < 0 || nextIndex >= total ) {
					return;
				}
				index = nextIndex;
			} else {
				index = ( ( nextIndex % total ) + total ) % total;
			}
			activate( section, slides, index, mount, loop );
		}

		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', function () {
				go( -1 );
			} );
		}
		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', function () {
				go( 1 );
			} );
		}

		section.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'ArrowLeft' ) {
				e.preventDefault();
				go( -1 );
			} else if ( e.key === 'ArrowRight' ) {
				e.preventDefault();
				go( 1 );
			}
		} );
	}

	function init() {
		document
			.querySelectorAll(
				'.twork-agrezer-testimonials-section.agrezer-testimonials'
			)
			.forEach( initSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
