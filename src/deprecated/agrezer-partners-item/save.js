import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, imageAlt, name } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-partners__item',
	} );

	return (
		<div { ...blockProps }>
			{ image && (
				<img
					src={ image }
					className="agrezer-partners__icon"
					alt={ imageAlt || '' }
				/>
			) }
			<RichText.Content
				tagName="span"
				className="agrezer-partners__name"
				value={ name }
			/>
		</div>
	);
}
