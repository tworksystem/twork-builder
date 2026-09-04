import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, label, href } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'header__nav-link',
		'data-item-id': itemId,
	} );

	return (
		<a { ...blockProps } href={ href || '#' }>
			<RichText.Content tagName="span" value={ label } />
		</a>
	);
}
