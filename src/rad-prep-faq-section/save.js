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
		className: 'rad-section twork-rad-prep-faq-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
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
				<div className="rad-faq-grid">
					<div className="fade-up">
						{ ( showSectionTitle || showSectionSubtitle ) && (
							<>
								{ showSectionTitle && (
									<RichText.Content
										tagName="h2"
										value={ sectionTitle }
										style={ {
											marginBottom: '20px',
											fontSize: `${ sectionTitleFontSize }rem`,
											color: sectionTitleColor,
										} }
									/>
								) }
								{ showSectionSubtitle && (
									<RichText.Content
										tagName="p"
										value={ sectionSubtitle }
										style={ {
											color: sectionSubtitleColor,
											marginBottom: '30px',
											fontSize: `${ sectionSubtitleFontSize }rem`,
										} }
									/>
								) }
							</>
						) }

						{ imageUrl && (
							<img
								src={ imageUrl }
								alt={ imageAlt }
								style={ {
									borderRadius: 'var(--rad-radius)',
									width: '100%',
									height: '300px',
									objectFit: 'cover',
								} }
							/>
						) }
					</div>

					<div className="fade-up">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
