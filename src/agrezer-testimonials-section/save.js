import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		columnGap,
		mainImage,
		mainImageAlt,
		showBadge,
		badgeNum,
		badgeText,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		loopCarousel,
		prevLabel,
		nextLabel,
	} = attributes;

	const widthPercent = Math.max(
		50,
		100 - ( Number( containerGutter ) || 0 ) * 2
	);

	const blockProps = useBlockProps.save( {
		className: 'twork-testimonials twork-testimonials-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-testimonials-max': `${ containerMaxWidth }px`,
			'--twork-testimonials-width-pct': `${ widthPercent }%`,
			'--twork-testimonials-gap': `${ columnGap }px`,
		},
		'data-carousel-loop': loopCarousel ? 'true' : 'false',
		tabIndex: 0,
		role: 'region',
		'aria-roledescription': 'carousel',
	} );

	return (
		<section { ...blockProps }>
			<div className="twork-testimonials__container">
				<div className="twork-testimonials__left">
					<div className="twork-testimonials__img-box">
						{ mainImage && (
							<img
								src={ mainImage }
								className="twork-testimonials__img"
								alt={ mainImageAlt || '' }
								loading="lazy"
								decoding="async"
							/>
						) }
						{ showBadge && (
							<div className="twork-testimonials__badge">
								{ badgeNum && (
									<span className="twork-testimonials__badge-num">
										{ badgeNum }
									</span>
								) }
								{ badgeText && (
									<RichText.Content
										tagName="span"
										className="twork-testimonials__badge-text"
										value={ badgeText }
									/>
								) }
							</div>
						) }
					</div>
				</div>

				<div className="twork-testimonials__right">
					<div className="twork-testimonials__tagline">
						{ tagIcon && (
							<img
								src={ tagIcon }
								alt={ tagIconAlt || '' }
								className="twork-testimonials__tag-icon"
								width="20"
								height="20"
								loading="lazy"
								decoding="async"
							/>
						) }
						{ tagline && (
							<RichText.Content
								tagName="span"
								value={ tagline }
							/>
						) }
					</div>

					{ title && (
						<RichText.Content
							tagName="h2"
							className="twork-testimonials__title"
							value={ title }
						/>
					) }

					<div className="twork-testimonials__quote-region">
						<div className="twork-testimonials__slides">
							<InnerBlocks.Content />
						</div>
					</div>

					<div className="twork-testimonials__bottom">
						<div
							className="twork-testimonials__author-mount"
							aria-live="polite"
						/>
						<div className="twork-testimonials__controls">
							<button
								type="button"
								className="twork-testimonials__control-btn twork-testimonials__control-btn--prev"
								aria-label={ prevLabel || 'Previous' }
							>
								←
							</button>
							<button
								type="button"
								className="twork-testimonials__control-btn twork-testimonials__control-btn--next"
								aria-label={ nextLabel || 'Next' }
							>
								→
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
