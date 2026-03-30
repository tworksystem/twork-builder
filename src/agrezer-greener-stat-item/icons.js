export function GreenerStatIcon( { variant = 'growth' } ) {
	const common = {
		className: 'agrezer-greener-stat__icon',
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': true,
	};

	if ( variant === 'organic' ) {
		return (
			<svg { ...common }>
				<path d="M12 20V8m0 0c-2.5 0-4.5 2-4.5 4.4S9.5 16.8 12 16.8s4.5-2 4.5-4.4S14.5 8 12 8Z" />
				<path d="M5 11.2C5 7.1 8.1 4 12 4s7 3.1 7 7.2c0 3.4-2.1 6.4-5.3 8.8M5.3 20c3.2-2.4 5.3-5.4 5.3-8.8" />
			</svg>
		);
	}

	return (
		<svg { ...common }>
			<path d="M12 20v-8m0 0c-4.1 0-7.5-2-8.6-5.4 3.3.2 5.8 1 7.2 2.4m1.4 3c4.1 0 7.5-2 8.6-5.4-3.3.2-5.8 1-7.2 2.4" />
			<path d="M7.8 15.5c1.5-.9 2.8-1.3 4.2-1.3s2.7.4 4.2 1.3" />
		</svg>
	);
}
