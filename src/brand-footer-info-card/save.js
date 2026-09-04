import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, label, lines, icon } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'footer__info-card',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<p>Item</p>
		</div>
	);
}
