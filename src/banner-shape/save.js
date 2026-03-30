import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		bannerHeading,
		bannerDescription,
		backgroundImage,
		backgroundPositionX,
		backgroundPositionY,
		backgroundSize,
		minHeight,
		minHeightMobile,
		showOverlay,
		overlayColor,
		overlayOpacity,
		overlayGradient,
		headingColor,
		headingFontSize,
		headingFontSizeMobile,
		headingFontWeight,
		headingTextShadow,
		descriptionColor,
		descriptionFontSize,
		descriptionFontSizeMobile,
		descriptionLineHeight,
		contentPadding,
		contentPaddingMobile,
		contentMaxWidth,
		contentAlignment,
		showShape,
		shapeImage,
		shapeHeight,
		shapeHeightMobile,
		shapePosition,
		shapeBackgroundSize,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-banner-shape-section',
		style: {
			position: 'relative',
			minHeight: `${ minHeight }px`,
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundPosition: `${ backgroundPositionX }% ${ backgroundPositionY }%`,
			backgroundSize: backgroundSize,
			backgroundRepeat: 'no-repeat',
			'--mobile-min-height': `${ minHeightMobile }px`,
			'--mobile-padding': `${ contentPaddingMobile }px`,
			'--mobile-heading-font-size': `${ headingFontSizeMobile }rem`,
			'--mobile-desc-font-size': `${ descriptionFontSizeMobile }rem`,
			'--mobile-shape-height': `${ shapeHeightMobile }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			{ showOverlay && (
				<div
					className="banner-overlay"
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: overlayGradient
							? `linear-gradient(180deg, ${ overlayColor } 0%, rgba(0, 0, 0, 0.2) 50%, ${ overlayColor } 100%)`
							: overlayColor,
						opacity: overlayOpacity,
						zIndex: 1,
					} }
				/>
			) }

			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ contentMaxWidth }px`,
					margin: '0 auto',
					padding: `${ contentPadding }px ${ contentPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				<div
					className="banner-content"
					style={ {
						textAlign: contentAlignment,
					} }
				>
					<RichText.Content
						tagName="h1"
						className="banner-title"
						value={ bannerHeading }
						style={ {
							color: headingColor,
							fontSize: `${ headingFontSize }rem`,
							fontWeight: headingFontWeight,
							textShadow: headingTextShadow
								? '2px 2px 4px rgba(0, 0, 0, 0.3)'
								: 'none',
						} }
					/>

					{ bannerDescription && (
						<RichText.Content
							tagName="div"
							className="banner-desc"
							value={ bannerDescription }
							style={ {
								color: descriptionColor,
								fontSize: `${ descriptionFontSize }rem`,
								lineHeight: descriptionLineHeight,
							} }
						/>
					) }
				</div>
			</div>

			{ showShape && shapeImage && (
				<div
					className="banner-shape"
					style={ {
						position: 'absolute',
						left: 0,
						right: 0,
						width: '100%',
						backgroundImage: `url(${ shapeImage })`,
						backgroundSize: shapeBackgroundSize,
						backgroundRepeat: 'no-repeat',
						backgroundPosition:
							shapePosition === 'bottom' ? 'bottom' : 'top',
						height: `${ shapeHeight }px`,
						[ shapePosition ]: 0,
						zIndex: 3,
						pointerEvents: 'none',
					} }
				/>
			) }
		</section>
	);
}
