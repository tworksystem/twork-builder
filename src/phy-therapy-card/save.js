import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { imageUrl, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'phy-service-card stagger-up',
		style: {
			backgroundImage: imageUrl ? `url(${ imageUrl })` : undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="phy-svc-content">
				<RichText.Content
					tagName="h3"
					value={ title || 'Manual Therapy' }
				/>
				<RichText.Content tagName="p" value={ description || '' } />
			</div>
		</div>
	);
}
