import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		layout,
		showLabel,
		label,
		labelColor,
		labelFontSize,
		labelFontWeight,
		labelTextTransform,
		heading,
		headingColor,
		headingFontSize,
		headingFontWeight,
		headingLineHeight,
		showDescription,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		showStats,
		stats,
		statsBarGap,
		statsBarMarginTop,
		statsBarPaddingTop,
		statsBarBorderColor,
		statValueColor,
		statValueFontSize,
		statValueFontWeight,
		statLabelColor,
		statLabelFontSize,
		statLabelFontWeight,
		statLabelTextTransform,
		image,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		imageBorderRadius,
		imageBoxShadow,
		imageBoxShadowColor,
		imageBoxShadowBlur,
		imageBoxShadowSpread,
		imageBoxShadowOffsetX,
		imageBoxShadowOffsetY,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		imageHoverEffect,
		imageHoverScale,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `story-item layout-${ layout }`,
		'data-hover-effect': imageHoverEffect ? 'true' : 'false',
		style:
			imageHoverEffect && imageHoverScale
				? {
						'--hover-scale': imageHoverScale,
				  }
				: {},
	} );

	return (
		<div { ...blockProps }>
			<div className="story-content">
				{ showLabel && (
					<span
						className="story-label"
						style={ {
							color: labelColor,
							fontSize: `${ labelFontSize }rem`,
							fontWeight: labelFontWeight,
							textTransform: labelTextTransform,
							display: 'block',
							marginBottom: '10px',
						} }
					>
						{ label }
					</span>
				) }

				<RichText.Content
					tagName="h2"
					value={ heading }
					className="story-heading"
					style={ {
						fontSize: `${ headingFontSize }rem`,
						fontWeight: headingFontWeight,
						color: headingColor,
						lineHeight: headingLineHeight,
						marginBottom: '20px',
						marginTop: 0,
					} }
				/>

				{ showDescription && (
					<RichText.Content
						tagName="div"
						value={ description }
						className="story-description"
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							lineHeight: descriptionLineHeight,
							marginBottom: showStats
								? `${ statsBarMarginTop }px`
								: '0',
						} }
					/>
				) }

				{ showStats && stats && stats.length > 0 && (
					<div
						className="stats-bar"
						style={ {
							display: 'flex',
							gap: `${ statsBarGap }px`,
							marginTop: `${ statsBarMarginTop }px`,
							paddingTop: `${ statsBarPaddingTop }px`,
							borderTop: `1px solid ${ statsBarBorderColor }`,
						} }
					>
						{ stats.map( ( stat, index ) => (
							<div key={ index } className="stat-item">
								<h3
									style={ {
										fontSize: `${ statValueFontSize }rem`,
										color: statValueColor,
										fontWeight: statValueFontWeight,
										margin: 0,
									} }
								>
									<span
										className="counter"
										data-target={ stat.value }
									>
										{ stat.value }
									</span>
									{ stat.suffix }
								</h3>
								<p
									style={ {
										fontSize: `${ statLabelFontSize }rem`,
										color: statLabelColor,
										fontWeight: statLabelFontWeight,
										textTransform: statLabelTextTransform,
										margin: '5px 0 0',
										lineHeight: 1.4,
									} }
								>
									{ stat.label }
								</p>
							</div>
						) ) }
					</div>
				) }
			</div>

			<div className="story-img-wrapper">
				{ image && (
					<div
						style={ {
							position: 'relative',
							borderRadius: `${ imageBorderRadius }px`,
							overflow: 'hidden',
						} }
					>
						<img
							src={ image }
							alt={ heading || '' }
							className="story-image"
							style={ {
								width: '100%',
								height: `${ imageHeight }px`,
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
								borderRadius: `${ imageBorderRadius }px`,
								boxShadow: imageBoxShadow
									? `${ imageBoxShadowOffsetX }px ${ imageBoxShadowOffsetY }px ${ imageBoxShadowBlur }px ${ imageBoxShadowSpread }px ${ imageBoxShadowColor }`
									: 'none',
							} }
						/>
						{ showImageOverlay && (
							<div
								className="image-overlay"
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: imageOverlayColor,
									opacity: imageOverlayOpacity,
									borderRadius: `${ imageBorderRadius }px`,
									pointerEvents: 'none',
								} }
							/>
						) }
					</div>
				) }
			</div>
		</div>
	);
}
