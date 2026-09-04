/**
 * CSR Stats Section — scramble / flicker count-up on scroll.
 */
( function () {
	'use strict';

	const SECTION_SELECTOR =
		'.mk-csr-stats-section, .wp-block-twork-csr-stats-section';
	const DURATION_MS = 1600;

	function prefersReducedMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function stripHtml( html ) {
		const tmp = document.createElement( 'span' );
		tmp.innerHTML = html;
		return ( tmp.textContent || tmp.innerText || '' ).trim();
	}

	/**
	 * Parse values like "50+", "10k+", "1.5k", "200+".
	 * Returns null when no leading number is found.
	 * @param raw
	 */
	function parseStatValue( raw ) {
		const text = stripHtml( String( raw || '' ) );
		if ( ! text ) {
			return null;
		}
		const match = text.match( /^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/ );
		if ( ! match ) {
			return null;
		}
		const numStr = match[ 2 ].replace( /,/g, '' );
		const value = parseFloat( numStr );
		if ( Number.isNaN( value ) ) {
			return null;
		}
		const decimals = ( numStr.split( '.' )[ 1 ] || '' ).length;
		return {
			prefix: match[ 1 ],
			value,
			suffix: match[ 3 ],
			decimals,
			original: text,
		};
	}

	function formatNumber( value, decimals ) {
		if ( decimals > 0 ) {
			return value.toFixed( decimals );
		}
		return String( Math.floor( value ) );
	}

	function randomScramble( parsed ) {
		const intDigits = String( Math.floor( parsed.value ) ).length;
		const max = Math.pow( 10, intDigits ) - 1;
		const min = intDigits > 1 ? Math.pow( 10, intDigits - 1 ) : 0;
		const n = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		if ( parsed.decimals > 0 ) {
			const frac = Math.floor(
				Math.random() * Math.pow( 10, parsed.decimals )
			);
			const fracStr = String( frac ).padStart( parsed.decimals, '0' );
			return n + '.' + fracStr;
		}
		return String( n );
	}

	function animateScramble( el, parsed ) {
		const start = performance.now();
		el.classList.add( 'is-scrambling' );
		el.setAttribute( 'data-stat-target', parsed.original );

		function tick( now ) {
			const t = Math.min( ( now - start ) / DURATION_MS, 1 );
			const ease = 1 - Math.pow( 1 - t, 3 );

			if ( t < 0.82 ) {
				const noise = Math.pow( 1 - t / 0.82, 1.4 );
				let display;
				if ( Math.random() < 0.35 + noise * 0.55 ) {
					display = randomScramble( parsed );
				} else {
					display = formatNumber(
						parsed.value * ease,
						parsed.decimals
					);
				}
				el.textContent = parsed.prefix + display + parsed.suffix;
			} else {
				el.classList.remove( 'is-scrambling' );
				const settle = ( t - 0.82 ) / 0.18;
				const settleEase = 1 - Math.pow( 1 - settle, 2 );
				const from = parsed.value * 0.82;
				const current = from + ( parsed.value - from ) * settleEase;
				el.textContent =
					parsed.prefix +
					formatNumber( current, parsed.decimals ) +
					parsed.suffix;
			}

			if ( t < 1 ) {
				requestAnimationFrame( tick );
			} else {
				el.classList.remove( 'is-scrambling' );
				el.textContent = parsed.original;
				el.classList.add( 'is-counted' );
			}
		}

		requestAnimationFrame( tick );
	}

	function initStatCounters() {
		const sections = document.querySelectorAll( SECTION_SELECTOR );
		if ( ! sections.length ) {
			return;
		}

		const reduced = prefersReducedMotion();

		sections.forEach( function ( section ) {
			const animationOn =
				section.getAttribute( 'data-animation' ) !== 'false' &&
				( section.querySelector( '.stats-section' )
					? section
							.querySelector( '.stats-section' )
							.getAttribute( 'data-animation' ) !== 'false'
					: true );

			const numbers = section.querySelectorAll( '.stat-item h3' );
			if ( ! numbers.length ) {
				return;
			}

			if (
				reduced ||
				! animationOn ||
				! ( 'IntersectionObserver' in window )
			) {
				numbers.forEach( function ( el ) {
					el.classList.add( 'is-counted' );
				} );
				return;
			}

			var observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( ! entry.isIntersecting ) {
							return;
						}
						const el = entry.target;
						if ( el.classList.contains( 'is-counted' ) ) {
							observer.unobserve( el );
							return;
						}
						const parsed = parseStatValue(
							el.getAttribute( 'data-stat-target' ) ||
								el.innerHTML
						);
						if ( ! parsed ) {
							el.classList.add( 'is-counted' );
							observer.unobserve( el );
							return;
						}
						animateScramble( el, parsed );
						observer.unobserve( el );
					} );
				},
				{ threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
			);

			numbers.forEach( function ( el ) {
				if ( ! el.classList.contains( 'is-counted' ) ) {
					observer.observe( el );
				}
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initStatCounters );
	} else {
		initStatCounters();
	}
} )();
