import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	if ( showItem === false || ! imageUrl ) {
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
			<img
				src={ imageUrl }
				alt={ imageAlt || '' }
				loading="lazy"
				decoding="async"
			/>
			{ showBadge && badgeText ? (
				<span
					className="twork-about-staff-meal-gallery-item__badge"
					style={ { backgroundColor: badgeColor } }
				>
					{ badgeText }
				</span>
			) : null }
			{ showCaption ? (
				<RichText.Content
					tagName="figcaption"
					className="twork-about-staff-meal-gallery-item__caption"
					value={ caption }
				/>
			) : null }
		</figure>
	);
}
