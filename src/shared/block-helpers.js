/**
 * Shared render helpers for recovered Gutenberg blocks.
 */
import { createElement } from '@wordpress/element';

export const DOS_GREEN = '#27ae60';
export const DONTS_RED = '#c0392b';

export const DEPARTMENT_LABELS = {
	heart: 'Heart Centre',
	neuro: 'Neuro Centre',
	cancer: 'Cancer Centre',
	peds: 'Paediatrics',
	general: 'General Medicine',
	ent: 'ENT',
	dental: 'Dental',
};

export function getDepartmentLabel( slug ) {
	return DEPARTMENT_LABELS[ slug ] || slug || '';
}

export function FlexibleIcon( {
	iconType = 'fontawesome',
	faClass = '',
	iconClass = '',
	dashicon = '',
	imageUrl = '',
	videoUrl = '',
	className = '',
} ) {
	const fa = faClass || iconClass;
	const type = iconType || 'fontawesome';

	if ( type === 'image' && imageUrl ) {
		return createElement( 'img', { src: imageUrl, alt: '', className } );
	}
	if ( type === 'video' && videoUrl ) {
		return createElement( 'video', {
			src: videoUrl,
			className,
			muted: true,
			playsInline: true,
			autoPlay: true,
			loop: true,
		} );
	}
	if ( type === 'dashicon' && dashicon ) {
		return createElement( 'span', {
			className: `dashicons ${ dashicon } ${ className }`.trim(),
			'aria-hidden': 'true',
		} );
	}
	if ( fa ) {
		return createElement( 'i', {
			className: `${ fa } ${ className }`.trim(),
			'aria-hidden': 'true',
		} );
	}
	return null;
}

export function InfoCardIcon( { iconType, iconClass, dashicon, iconImageUrl } ) {
	if ( iconType === 'image' && iconImageUrl ) {
		return createElement( 'img', { src: iconImageUrl, alt: '' } );
	}
	if ( iconType === 'dashicon' && dashicon ) {
		return createElement( 'span', {
			className: `dashicons ${ dashicon }`,
			'aria-hidden': 'true',
		} );
	}
	if ( iconClass ) {
		return createElement( 'i', {
			className: iconClass,
			'aria-hidden': 'true',
		} );
	}
	return null;
}

export function TechnologyMedia( {
	mediaType = 'image',
	imageUrl,
	imageAlt = '',
	videoUrl,
	iconClass,
	dashicon,
	caption,
} ) {
	if ( mediaType === 'video' && videoUrl ) {
		return createElement( 'video', {
			src: videoUrl,
			muted: true,
			playsInline: true,
			autoPlay: true,
			loop: true,
		} );
	}
	if ( mediaType === 'image' && imageUrl ) {
		return createElement( 'img', { src: imageUrl, alt: imageAlt || '' } );
	}
	if ( mediaType === 'dashicon' && dashicon ) {
		return createElement( 'span', {
			className: `dashicons ${ dashicon }`,
			'aria-hidden': 'true',
		} );
	}
	if ( iconClass ) {
		return createElement( 'i', {
			className: iconClass,
			'aria-hidden': 'true',
		} );
	}
	if ( caption ) {
		return createElement( 'span', null, caption );
	}
	return null;
}

export function SpecialistPhoto( {
	photoType = 'image',
	imageUrl,
	videoUrl,
	faClass,
	dashicon,
} ) {
	if ( photoType === 'video' && videoUrl ) {
		return createElement( 'video', {
			src: videoUrl,
			className: 'doc-photo',
			muted: true,
			playsInline: true,
			autoPlay: true,
			loop: true,
		} );
	}
	if ( photoType === 'image' && imageUrl ) {
		return createElement( 'img', {
			src: imageUrl,
			alt: '',
			className: 'doc-photo',
		} );
	}
	if ( photoType === 'dashicon' && dashicon ) {
		return createElement( 'span', {
			className: `dashicons ${ dashicon } doc-photo`,
			'aria-hidden': 'true',
		} );
	}
	if ( faClass ) {
		return createElement( 'i', {
			className: `${ faClass } doc-photo`,
			'aria-hidden': 'true',
		} );
	}
	return null;
}

export function StarRating( { rating = 5 } ) {
	const value = Math.min( 5, Math.max( 0, Number( rating ) || 5 ) );
	const full = Math.floor( value );
	const half = value % 1 >= 0.5;
	const stars = [];

	for ( let i = 0; i < full; i++ ) {
		stars.push(
			createElement( 'i', {
				key: `full-${ i }`,
				className: 'fas fa-star',
				'aria-hidden': 'true',
			} )
		);
	}
	if ( half ) {
		stars.push(
			createElement( 'i', {
				key: 'half',
				className: 'fas fa-star-half-alt',
				'aria-hidden': 'true',
			} )
		);
	}
	while ( stars.length < 5 ) {
		stars.push(
			createElement( 'i', {
				key: `empty-${ stars.length }`,
				className: 'far fa-star',
				'aria-hidden': 'true',
			} )
		);
	}

	return createElement(
		'div',
		{ className: 'hc-stars', 'aria-label': `${ value } stars` },
		stars
	);
}

export function EmAmbFeatureIcon( { item = {}, iconColor, iconBgColor, iconSizePx } ) {
	const style = {
		color: iconColor || undefined,
		backgroundColor: iconBgColor || undefined,
		width: iconSizePx ? `${ iconSizePx }px` : undefined,
		height: iconSizePx ? `${ iconSizePx }px` : undefined,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '50%',
		flexShrink: 0,
	};
	return createElement(
		'span',
		{ className: 'em-feature-icon', style },
		createElement( FeatureListIcon, {
			iconType: item.iconType,
			iconValue: item.iconValue,
			iconImageUrl: item.iconImageUrl,
		} )
	);
}

export function FeatureListIcon( { iconType, iconValue, iconImageUrl } ) {
	if ( iconType === 'image' && iconImageUrl ) {
		return createElement( 'img', { src: iconImageUrl, alt: '' } );
	}
	if ( iconType === 'dashicon' && iconValue ) {
		return createElement( 'span', {
			className: `dashicons ${ iconValue }`,
			'aria-hidden': 'true',
		} );
	}
	if ( iconValue ) {
		return createElement( 'i', {
			className: iconValue,
			'aria-hidden': 'true',
		} );
	}
	return null;
}
