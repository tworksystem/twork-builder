/**
 * Shared helpers for Help Section right-column media.
 */

export function normalizeMediaSlides( slideshowImages ) {
	if ( ! Array.isArray( slideshowImages ) ) {
		return [];
	}

	return slideshowImages
		.map( ( item ) => {
			if ( ! item ) {
				return null;
			}
			const url =
				typeof item === 'string'
					? item
					: item.url || item.src || '';
			const alt = typeof item === 'string' ? '' : item.alt || '';
			return url ? { url, alt } : null;
		} )
		.filter( Boolean );
}

export function getMediaColumnStyle( mediaBorderRadius ) {
	const radius =
		mediaBorderRadius != null && mediaBorderRadius >= 0
			? mediaBorderRadius
			: 8;

	return {
		borderRadius: `${ radius }px`,
		overflow: 'hidden',
	};
}
