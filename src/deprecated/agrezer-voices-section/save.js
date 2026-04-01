import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		gridColumnGap,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		wheatImage,
		wheatImageAlt,
		ratingHeading,
		ratingDesc,
		supportHeading,
		supportIcon,
		supportIconAlt,
		supportBadgeValue,
		supportBadgeLabel,
		autoplayInterval,
		enableAutoplay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-voices-section twork-agrezer-voices-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-voices-max': `${ containerMaxWidth }px`,
			'--agrezer-voices-width-pct': `${ containerWidthPct }%`,
			'--agrezer-voices-col-gap': `${ gridColumnGap }px`,
		},
		'data-autoplay': enableAutoplay ? 'true' : 'false',
		'data-autoplay-ms': String( autoplayInterval || 4500 ),
	} );

	return (
		<section { ...blockProps }>
			<div className="agrezer-voices-section__container">
				<div className="agrezer-voices-section__left">
					{ ( tagline || tagIcon ) && (
						<div className="agrezer-voices-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="agrezer-voices-section__tag-icon"
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
					) }
					{ title && (
						<RichText.Content
							tagName="h2"
							className="agrezer-voices-section__title"
							value={ title }
						/>
					) }
					{ wheatImage && (
						<img
							src={ wheatImage }
							alt={ wheatImageAlt || '' }
							className="agrezer-voices-section__wheat"
							loading="lazy"
							decoding="async"
						/>
					) }
				</div>

				<div className="agrezer-voices-section__right">
					<div className="agrezer-voices-section__top-cards">
						<article className="agrezer-voices-card agrezer-voices-card--rating">
							{ ratingHeading && (
								<RichText.Content
									tagName="h3"
									className="agrezer-voices-card__heading"
									value={ ratingHeading }
								/>
							) }
							{ ratingDesc && (
								<RichText.Content
									tagName="p"
									className="agrezer-voices-card__desc"
									value={ ratingDesc }
								/>
							) }
						</article>

						<article className="agrezer-voices-card agrezer-voices-card--support">
							{ supportHeading && (
								<RichText.Content
									tagName="h3"
									className="agrezer-voices-card__heading"
									value={ supportHeading }
								/>
							) }
							{ supportIcon && (
								<img
									src={ supportIcon }
									alt={ supportIconAlt || '' }
									className="agrezer-voices-card__support-icon"
									loading="lazy"
									decoding="async"
								/>
							) }
							{ ( supportBadgeValue || supportBadgeLabel ) && (
								<div className="agrezer-voices-card__support-badge">
									{ supportBadgeValue }
									{ supportBadgeLabel && (
										<span>{ supportBadgeLabel }</span>
									) }
								</div>
							) }
						</article>
					</div>

					<div
						className="agrezer-voices-section__testimonial"
						data-voices-slider=""
						role="region"
						aria-roledescription="carousel"
						aria-label="Customer voices"
						tabIndex={ 0 }
					>
						<div className="agrezer-voices-section__slides">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
