import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleTextTransform,
		sectionTitleLetterSpacing,
		sectionTitleAlignment,
		titleMarginBottom,
		containerMaxWidth,
		containerPadding,
		gridMinWidth,
		gap,
		logoMaxWidth,
		logoOpacity,
		logoGrayscale,
		logoHoverOpacity,
		logoHoverScale,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'twork-csr-partners-section section-padding csr-partners-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			textAlign: 'center',
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-logo-max-width': logoMaxWidth,
		'data-logo-opacity': logoOpacity,
		'data-logo-grayscale': logoGrayscale,
		'data-logo-hover-opacity': logoHoverOpacity,
		'data-logo-hover-scale': logoHoverScale,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				{ showSectionTitle && sectionTitle && (
					<RichText.Content
						tagName="h3"
						value={ sectionTitle }
						className="csr-partners-title"
						style={ {
							textAlign: sectionTitleAlignment,
							color: sectionTitleColor,
							fontWeight: sectionTitleFontWeight,
							fontSize: `${ sectionTitleFontSize }rem`,
							textTransform: sectionTitleTextTransform,
							letterSpacing: `${ sectionTitleLetterSpacing }px`,
							margin: `0 0 ${ titleMarginBottom }px 0`,
						} }
					/>
				) }
				<div
					className={ `logo-grid${
						animationOnScroll ? ' fade-up' : ''
					}` }
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(auto-fit, minmax(${ gridMinWidth }px, 1fr))`,
						gap: `${ gap }px`,
						alignItems: 'center',
						justifyItems: 'center',
						marginTop:
							showSectionTitle && sectionTitle
								? 0
								: `${ titleMarginBottom }px`,
						'--logo-max-width': `${ logoMaxWidth }px`,
						'--logo-opacity': logoOpacity,
						'--logo-grayscale': logoGrayscale ? '100%' : '0%',
						'--logo-hover-opacity': logoHoverOpacity,
						'--logo-hover-scale': logoHoverScale,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
