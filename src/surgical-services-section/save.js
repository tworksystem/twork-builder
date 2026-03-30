import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionId,
		sectionClass,
		label,
		title,
		description,
		gridMinItemWidth,
		gap,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: sectionClass || 'section-padding',
		id: sectionId || undefined,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div
					className="text-center fade-up"
					style={ {
						marginBottom: '60px',
						maxWidth: '700px',
						marginLeft: 'auto',
						marginRight: 'auto',
					} }
				>
					<RichText.Content
						tagName="h4"
						value={ label }
						className="surgical-section-label"
					/>
					<RichText.Content
						tagName="h2"
						value={ title }
						className="surgical-section-title"
					/>
					<RichText.Content
						tagName="p"
						value={ description }
						className="surgical-section-description"
					/>
				</div>
				<div
					className="doc-grid twork-surgical-doc-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(auto-fit, minmax(${ gridMinItemWidth }px, 1fr))`,
						gap: `${ gap }px`,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
