import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (flat blockquote + name + img).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, text, name, avatarUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'testimonials__card',
		'data-carousel-slide': true,
		'data-item-id': itemId,
		'aria-hidden': 'true',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="blockquote" value={ text } />
			<RichText.Content tagName="p" className="name" value={ name } />
			{ avatarUrl && <img src={ avatarUrl } alt="" /> }
		</div>
	);
}
