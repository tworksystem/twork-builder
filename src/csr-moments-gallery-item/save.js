import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { imageUrl, imageAlt, spanTwoColumns } = attributes;

	const blockProps = useBlockProps.save( {
		className: `gallery-item stagger-img animate-on-scroll ${
			spanTwoColumns ? 'span-two' : ''
		}`,
		'data-span-two': spanTwoColumns,
	} );

	if ( ! imageUrl ) return null;

	return (
		<div { ...blockProps }>
			<img src={ imageUrl } alt={ imageAlt || '' } decoding="async" />
		</div>
	);
}
