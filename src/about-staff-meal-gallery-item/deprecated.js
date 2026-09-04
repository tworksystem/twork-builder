/**
 * Pre-persist-fix save: empty <figure> allowed; caption only when non-empty.
 * Existing posts validate against this, then migrate to current save.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

const legacyAttributes = {
	showItem: { type: 'boolean', default: true },
	imageUrl: { type: 'string', default: '' },
	imageAlt: { type: 'string', default: '' },
	imageId: { type: 'number', default: 0 },
	imageRole: { type: 'string', default: 'secondary' },
	showCaption: { type: 'boolean', default: false },
	caption: { type: 'string', default: '' },
	showBadge: { type: 'boolean', default: false },
	badgeText: { type: 'string', default: 'Meal' },
	badgeColor: { type: 'string', default: '#e85d04' },
};

function legacySave( { attributes } ) {
	const {
		showItem,
		imageUrl,
		imageAlt,
		imageRole,
		showCaption,
		caption,
		showBadge,
		badgeText,
		badgeColor,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: [
			'twork-about-staff-meal-gallery-item',
			imageRole === 'featured' ? 'is-featured' : 'is-secondary',
		].join( ' ' ),
		'data-role': imageRole || 'secondary',
	} );

	return (
		<figure { ...blockProps }>
			{ imageUrl ? (
				<img
					src={ imageUrl }
					alt={ imageAlt || '' }
					loading="lazy"
					decoding="async"
				/>
			) : null }
			{ showBadge && badgeText ? (
				<span
					className="twork-about-staff-meal-gallery-item__badge"
					style={ { backgroundColor: badgeColor } }
				>
					{ badgeText }
				</span>
			) : null }
			{ showCaption && caption ? (
				<RichText.Content
					tagName="figcaption"
					className="twork-about-staff-meal-gallery-item__caption"
					value={ caption }
				/>
			) : null }
		</figure>
	);
}

export default [
	{
		attributes: legacyAttributes,
		save: legacySave,
		migrate( attributes ) {
			return { ...attributes };
		},
	},
];
