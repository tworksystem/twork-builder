import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		title,
		description,
		ctaPaddingTop,
		ctaPaddingBottom,
		ctaPaddingHorizontal,
		ctaBorderRadius,
		gradientStart,
		gradientEnd,
		gradientAngle,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descriptionColor,
		descriptionFontSize,
		descriptionMarginBottom,
		storeBtnsGap,
		useFadeUp,
		sectionAnchor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-tele-download-section section-padding',
		id: sectionAnchor || undefined,
		style: {
			paddingTop: `${ sectionPaddingTop }px`,
			paddingBottom: `${ sectionPaddingBottom }px`,
		},
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const ctaStyle = {
		background: `linear-gradient(${ gradientAngle }deg, ${ gradientStart }, ${ gradientEnd })`,
		color: '#fff',
		padding: `${ ctaPaddingTop }px ${ ctaPaddingHorizontal }px ${ ctaPaddingBottom }px`,
		borderRadius: `${ ctaBorderRadius }px`,
		textAlign: 'center',
		position: 'relative',
		overflow: 'hidden',
		boxShadow: '0 20px 60px rgba(244, 139, 42, 0.25)',
	};

	const storeBtnsStyle = {
		display: 'flex',
		gap: `${ storeBtnsGap }px`,
		justifyContent: 'center',
		flexWrap: 'wrap',
		position: 'relative',
		zIndex: 1,
	};

	return (
		<section { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				<div
					className={ `tele-cta ${ useFadeUp ? 'fade-up' : '' }` }
					style={ ctaStyle }
				>
					<RichText.Content
						tagName="h2"
						value={ title }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: titleColor,
							marginBottom: '15px',
							position: 'relative',
							zIndex: 1,
						} }
					/>
					<RichText.Content
						tagName="p"
						value={ description }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							maxWidth: '600px',
							margin: `0 auto ${ descriptionMarginBottom }px`,
							position: 'relative',
							zIndex: 1,
						} }
					/>
					<div className="store-btns" style={ storeBtnsStyle }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
