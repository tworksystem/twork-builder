import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (flat h3 + img).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, title, imageUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'services-carousel__card',
		'data-carousel-slide': true,
		'data-item-id': itemId,
		'aria-hidden': 'true',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h3" value={ title } />
			{ imageUrl && <img src={ imageUrl } alt="" /> }
		</div>
	);
}
