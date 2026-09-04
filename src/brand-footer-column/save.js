import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, columnTitle, linksJson } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'footer__column',
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h4" value={ columnTitle } />
		</div>
	);
}
