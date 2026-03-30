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
		className: 'agrezer-testimonials twork-agrezer-testimonials-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-testimonials-max': `${ containerMaxWidth }px`,
			'--agrezer-testimonials-width-pct': `${ widthPercent }%`,
			'--agrezer-testimonials-gap': `${ columnGap }px`,
		},
		'data-carousel-loop': loopCarousel ? 'true' : 'false',
		tabIndex: 0,
		role: 'region',
		'aria-roledescription': 'carousel',
	} );

	return (
		<section { ...blockProps }>
			<div className="agrezer-testimonials__container">
				<div className="agrezer-testimonials__left">
					<div className="agrezer-testimonials__img-box">
						{ mainImage && (
							<img
								src={ mainImage }
								className="agrezer-testimonials__img"
								alt={ mainImageAlt || '' }
								loading="lazy"
								decoding="async"
							/>
						) }
						{ showBadge && (
							<div className="agrezer-testimonials__badge">
								{ badgeNum && (
									<span className="agrezer-testimonials__badge-num">
										{ badgeNum }
									</span>
								) }
								{ badgeText && (
									<RichText.Content
										tagName="span"
										className="agrezer-testimonials__badge-text"
										value={ badgeText }
									/>
								) }
							</div>
						) }
					</div>
				</div>

				<div className="agrezer-testimonials__right">
					<div className="agrezer-testimonials__tagline">
						{ tagIcon && (
							<img
								src={ tagIcon }
								alt={ tagIconAlt || '' }
								className="agrezer-testimonials__tag-icon"
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
							className="agrezer-testimonials__title"
							value={ title }
						/>
					) }

					<div className="agrezer-testimonials__quote-region">
						<div className="agrezer-testimonials__slides">
							<InnerBlocks.Content />
						</div>
					</div>

					<div className="agrezer-testimonials__bottom">
						<div
							className="agrezer-testimonials__author-mount"
							aria-live="polite"
						/>
						<div className="agrezer-testimonials__controls">
							<button
								type="button"
								className="agrezer-testimonials__control-btn agrezer-testimonials__control-btn--prev"
								aria-label={ prevLabel || 'Previous' }
							>
								←
							</button>
							<button
								type="button"
								className="agrezer-testimonials__control-btn agrezer-testimonials__control-btn--next"
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
