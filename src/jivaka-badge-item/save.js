import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, imageId, linkUrl, linkTarget, linkRel, alt } = attributes;

	if ( ! image ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'jivaka-badge-item twork-jivaka-badge-item',
	} );

	return (
		<div { ...blockProps }>
			<a
				href={ linkUrl || '#' }
				target={ linkTarget }
				rel={ linkRel }
				className="jivaka-badge-link"
			>
				<img
					src={ image }
					alt={ alt || '' }
					className="jivaka-badge-image"
				/>
			</a>
		</div>
	);
}
