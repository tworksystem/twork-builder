import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		taglineLetterSpacing,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleLineHeight,
		bgGradientStartColor,
		bgGradientEndColor,
		centerMediaUrl,
		centerMediaType,
		centerMediaAlt,
		videoAutoplay,
		videoLoop,
		videoMuted,
		mediaBorderRadius,
		mediaDropShadow,
		filterBrightness,
		filterContrast,
		filterGrayscale,
		mediaMaxWidthDesktop,
		mediaMaxWidthMobile,
		imageAnimationType,
		hoverEffectType,
		imageAnimationDuration,
		imageAnimationDelay,
		imageVerticalOffset,
		backgroundOverlayOpacity,
		enableParallax,
		stageMinHeight,
		waveDecorationUrl,
		waveHeightDesktop,
		waveHeightMobile,
		waveOpacity,
		waveFlipHorizontal,
		waveFlipVertical,
	} = attributes;

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps.save( {
		className: `twork-why-choose twork-why-choose-section ${
			waveDecorationUrl ? 'has-wave-decoration' : ''
		}`,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-padding-top-mobile': `${ paddingTopMobile }px`,
			'--twork-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--twork-anim-duration': `${ imageAnimationDuration }s`,
			'--twork-anim-delay': `${ imageAnimationDelay }s`,
			'--twork-image-bottom': `${ imageVerticalOffset }px`,
			'--twork-bg-overlay-opacity': backgroundOverlayOpacity,
			'--twork-parallax-shift': enableParallax ? '-12px' : '0px',
			'--twork-media-radius': `${ mediaBorderRadius }px`,
			'--twork-filter-brightness': `${ filterBrightness }%`,
			'--twork-filter-contrast': `${ filterContrast }%`,
			'--twork-filter-grayscale': `${ filterGrayscale }%`,
			'--twork-media-max-width-desk': `${ mediaMaxWidthDesktop }px`,
			'--twork-media-max-width-mob': `${ mediaMaxWidthMobile }px`,
			'--twork-bg-start': bgGradientStartColor,
			'--twork-bg-end': bgGradientEndColor,
			'--twork-wave-h-desk': `${ waveHeightDesktop }px`,
			'--twork-wave-h-mob': `${ waveHeightMobile }px`,
			'--twork-wave-opacity': waveOpacity,
			'--twork-wave-flip-x': waveFlipHorizontal ? -1 : 1,
			'--twork-wave-flip-y': waveFlipVertical ? -1 : 1,
			'--twork-media-drop-shadow': mediaDropShadow
				? 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.28))'
				: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
			...( shapeVar ? { '--twork-why-choose-shape': shapeVar } : {} ),
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="twork-why-choose-title">
			<div
				className="twork-why-choose__container"
				style={ containerStyle }
			>
				<div className="twork-why-choose__header">
					<p
						className="twork-why-choose__tagline"
						style={ { color: taglineColor, letterSpacing: taglineLetterSpacing } }
					>
						<span
							className="twork-why-choose__tagline-icon"
							style={ { color: taglineIconColor } }
							aria-hidden="true"
						>
							{ taglineIcon }
						</span>
						<RichText.Content
							tagName="span"
							value={ taglineText }
						/>
					</p>
					<RichText.Content
						tagName="h2"
						id="twork-why-choose-title"
						className="twork-why-choose__title"
						value={ sectionTitle }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							lineHeight: titleLineHeight,
						} }
					/>
				</div>

				<div className="twork-why-choose__stage" style={ stageStyle }>
					<div
						className={ `twork-why-choose__center-media-wrapper has-animation-${ imageAnimationType }${
							enableParallax ? ' has-parallax' : ''
						}` }
						data-anim-type={ imageAnimationType || 'none' }
						data-hover-type={ hoverEffectType || 'none' }
					>
						{ centerMediaUrl &&
							( centerMediaType === 'video' ? (
								<video
									src={ centerMediaUrl }
									className="twork-why-choose__center-media"
									autoPlay={ !! videoAutoplay }
									loop={ !! videoLoop }
									muted={ !! videoMuted }
									playsInline
								/>
							) : (
								<img
									src={ centerMediaUrl }
									className="twork-why-choose__center-media"
									alt={ centerMediaAlt || '' }
								/>
							) ) }
					</div>
					<InnerBlocks.Content />
				</div>
			</div>
				<div
					className="twork-why-choose__shape-divider"
					aria-hidden="true"
				></div>
		</section>
	);
}
