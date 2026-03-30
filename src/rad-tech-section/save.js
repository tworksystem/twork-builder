import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		imageUrl,
		imageAlt,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'rad-section rad-tech-section twork-rad-tech-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			color: '#ffffff',
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="rad-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div className="rad-tech-grid">
					<div className="rad-tech-content fade-up">
						{ ( showSectionTitle || showSectionSubtitle ) && (
							<>
								{ showSectionTitle && (
									<RichText.Content
										tagName="h2"
										value={ sectionTitle }
										style={ {
											fontSize: `${ sectionTitleFontSize }rem`,
											marginBottom: '20px',
											color: sectionTitleColor,
										} }
									/>
								) }
								{ showSectionSubtitle && (
									<RichText.Content
										tagName="p"
										value={ sectionSubtitle }
										style={ {
											opacity: 0.8,
											fontSize: `${ sectionSubtitleFontSize }rem`,
											color: sectionSubtitleColor,
										} }
									/>
								) }
							</>
						) }

						<div className="rad-tech-list">
							<InnerBlocks.Content />
						</div>
					</div>

					<div className="rad-tech-image fade-up">
						{ imageUrl && (
							<img
								src={ imageUrl }
								alt={ imageAlt }
								style={ {
									borderRadius: 'var(--rad-radius)',
									opacity: 0.8,
								} }
							/>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
