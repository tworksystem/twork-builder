import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { sectionId, title, leadText, content, imageUrl, imageAlt } =
		attributes;
	const blockProps = useBlockProps.save( {
		className: 'content-section fade-up',
		id: sectionId,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="h2" value={ title } />
			<RichText.Content
				tagName="p"
				value={ leadText }
				className="lead-text"
			/>
			<RichText.Content
				tagName="p"
				value={ content }
				className="body-text"
			/>
			{ imageUrl && (
				<img
					decoding="async"
					src={ imageUrl }
					alt={ imageAlt || '' }
					className="centre-overview-img"
				/>
			) }
		</div>
	);
}
