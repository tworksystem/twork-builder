import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (flat h3 + p, no number/icon).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, title, text } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'why-choose-us__item',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content tagName="p" value={ text } />
		</div>
	);
}
