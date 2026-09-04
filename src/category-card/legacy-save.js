import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (flat div + h3 + img).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, title, imageUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'product-categories__card',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h3" value={ title } />
			{ imageUrl && <img src={ imageUrl } alt="" /> }
		</div>
	);
}
