import { useBlockProps } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (partners__logo + img only).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { itemId, imageUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'partners__logo',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			{ imageUrl && <img src={ imageUrl } alt="" /> }
		</div>
	);
}
