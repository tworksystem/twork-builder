/**
 * Resolve booking button URL from department option settings.
 *
 * @param {string} bookUrl  Per-option URL from inspector (supports `{value}` placeholder).
 * @param {string} value    Selected department value.
 * @param {string} selectName Form/select name used as query param key.
 * @return {string}
 */
export function resolveBookUrl( bookUrl, value, selectName ) {
	if ( ! value ) {
		return '#';
	}

	const paramKey = selectName || 'doctors';
	const encodedValue = encodeURIComponent( value );

	if ( bookUrl && bookUrl.includes( '{value}' ) ) {
		return bookUrl.replace( /\{value\}/g, encodedValue );
	}

	if ( bookUrl ) {
		try {
			const url = new URL( bookUrl, 'https://placeholder.local' );
			if ( ! url.searchParams.has( paramKey ) ) {
				url.searchParams.set( paramKey, value );
			}
			if ( bookUrl.startsWith( 'http://' ) || bookUrl.startsWith( 'https://' ) ) {
				return url.toString();
			}
			if ( bookUrl.startsWith( '/' ) ) {
				return `${ url.pathname }${ url.search }${ url.hash }`;
			}
			return `${ url.pathname.replace( /^\//, '' ) }${ url.search }${ url.hash }`;
		} catch ( e ) {
			const separator = bookUrl.includes( '?' ) ? '&' : '?';
			return `${ bookUrl }${ separator }${ encodeURIComponent( paramKey ) }=${ encodedValue }`;
		}
	}

	return `#?${ encodeURIComponent( paramKey ) }=${ encodedValue }`;
}

/**
 * @param {Array<{value?: string, bookUrl?: string}>} options
 * @param {string} selectName
 * @return {string}
 */
export function getInitialBookHref( options, selectName ) {
	if ( ! Array.isArray( options ) ) {
		return '#';
	}

	const firstSelectable = options.find( ( opt ) => opt?.value );
	if ( ! firstSelectable ) {
		return '#';
	}

	return resolveBookUrl(
		firstSelectable.bookUrl || '',
		firstSelectable.value,
		selectName
	);
}
