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
		logoMaxHeight = 80,
		logoOpacity,
		logoGrayscale,
		logoHoverOpacity,
		logoHoverScale,
		animationOnScroll,
		animationType,
		layoutMode = 'grid',
		sliderAutoplay = true,
		sliderSpeed = 4000,
		sliderShowArrows = true,
		sliderShowDots = true,
		sliderSlidesToShow = 4,
		sliderSlidesToShowTablet = 3,
		sliderSlidesToShowMobile = 2,
		sliderGap = 24,
	} = attributes;

	const isSlider = layoutMode === 'slider';

	const blockProps = useBlockProps.save( {
		className: `twork-affiliations-section affiliations-section section-padding${
			isSlider ? ' has-slider' : ''
		}`,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-layout': layoutMode,
		'data-logo-max-width': logoMaxWidth,
		'data-logo-max-height': logoMaxHeight,
		'data-logo-opacity': logoOpacity,
		'data-logo-grayscale': logoGrayscale,
		'data-logo-hover-opacity': logoHoverOpacity,
		'data-logo-hover-scale': logoHoverScale,
		...( isSlider && {
			'data-slider-autoplay': sliderAutoplay,
			'data-slider-speed': sliderSpeed,
			'data-slider-arrows': sliderShowArrows,
			'data-slider-dots': sliderShowDots,
			'data-slider-slides': sliderSlidesToShow,
			'data-slider-slides-tablet': sliderSlidesToShowTablet,
			'data-slider-slides-mobile': sliderSlidesToShowMobile,
			'data-slider-gap': sliderGap,
		} ),
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const titleMarginTop =
		showSectionTitle && sectionTitle ? 0 : titleMarginBottom;

	return (
		<section { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				{ showSectionTitle && sectionTitle && (
					<RichText.Content
						tagName="h3"
						value={ sectionTitle }
						className="affiliations-title"
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
				{ isSlider ? (
					<div
						className="affiliations-slider"
						style={ {
							marginTop: titleMarginTop,
							'--logo-max-width': `${ logoMaxWidth }px`,
							'--logo-max-height': `${ logoMaxHeight }px`,
							'--logo-opacity': logoOpacity,
							'--logo-grayscale': logoGrayscale ? '100%' : '0%',
							'--logo-hover-opacity': logoHoverOpacity,
							'--logo-hover-scale': logoHoverScale,
							'--slider-gap': `${ sliderGap }px`,
						} }
						data-slider-autoplay={ sliderAutoplay }
						data-slider-speed={ sliderSpeed }
						data-slider-arrows={ sliderShowArrows }
						data-slider-dots={ sliderShowDots }
						data-slider-slides={ sliderSlidesToShow }
						data-slider-slides-tablet={ sliderSlidesToShowTablet }
						data-slider-slides-mobile={ sliderSlidesToShowMobile }
					>
						<div className="logo-slider-track">
							<InnerBlocks.Content />
						</div>
						{ sliderShowArrows && (
							<>
								<button
									type="button"
									className="logo-slider-prev"
									aria-label="Previous"
								/>
								<button
									type="button"
									className="logo-slider-next"
									aria-label="Next"
								/>
							</>
						) }
						{ sliderShowDots && (
							<div
								className="logo-slider-dots"
								aria-hidden="true"
							/>
						) }
					</div>
				) : (
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
							marginTop: titleMarginTop,
							'--logo-max-width': `${ logoMaxWidth }px`,
							'--logo-max-height': `${ logoMaxHeight }px`,
							'--logo-opacity': logoOpacity,
							'--logo-grayscale': logoGrayscale ? '100%' : '0%',
							'--logo-hover-opacity': logoHoverOpacity,
							'--logo-hover-scale': logoHoverScale,
						} }
					>
						<InnerBlocks.Content />
					</div>
				) }
			</div>
		</section>
	);
}
