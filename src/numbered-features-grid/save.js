import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionEyebrow,
		sectionTitle,
		columns,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'why-choose-us twork-numbered-features-grid',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingTop: `${ padding }px`,
			paddingBottom: `${ padding }px`,
			'--why-choose-columns': columns,
		},
		'data-block': 'twork/numbered-features-grid',
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${ columns || 3 }, 1fr)`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="why-choose-us__inner l-section"
				style={ containerStyle }
			>
				{ ( sectionEyebrow || sectionTitle ) && (
					<header className="section-head">
						{ sectionEyebrow && (
							<RichText.Content
								tagName="p"
								className="section-head__eyebrow"
								value={ sectionEyebrow }
							/>
						) }
						{ sectionTitle && (
							<RichText.Content
								tagName="h2"
								className="section-head__title"
								value={ sectionTitle }
							/>
						) }
					</header>
				) }

				<div
					className="why-choose-us__grid"
					data-list="items"
					style={ gridStyle }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
