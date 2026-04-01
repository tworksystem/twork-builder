export function AboutFeatureIcon( { variant = 'growth' } ) {
	const common = {
		className: 'twork-about-feature__icon',
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': true,
	};

	if ( variant === 'barn' ) {
		return (
			<svg { ...common }>
				<path d="M3 18h18M5 18V8l7-4 7 4v10" />
			</svg>
		);
	}
	if ( variant === 'soil' ) {
		return (
			<svg { ...common }>
				<path d="M4 15h16M6 15l2-4h8l2 4M9 11V7m6 4V7" />
			</svg>
		);
	}
	if ( variant === 'organic' ) {
		return (
			<svg { ...common }>
				<path d="M12 20V8M8 12c2 0 4-1.5 4-4-2 0-4 1.5-4 4Zm4-4c0 2.5 2 4 4 4 0-2.5-2-4-4-4Z" />
			</svg>
		);
	}
	return (
		<svg { ...common }>
			<path d="M12 21V9M6 15l6-6 6 6" />
		</svg>
	);
}
