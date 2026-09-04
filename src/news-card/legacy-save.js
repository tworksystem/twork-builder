import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (flat h3 + p + img).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, title, excerpt, imageUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blog-news__card',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content tagName="p" value={ excerpt } />
			{ imageUrl && <img src={ imageUrl } alt="" /> }
		</div>
	);
}
