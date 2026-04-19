import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor = '#f4f4f0',
		paddingTop = 110,
		paddingBottom = 120,
		titleColor = '#131313',
		titleFontSize = 48,
		subtitleColor = '#f48b2a',
		subtitleFontSize = 16,
		descriptionColor = '#4c4c4c',
		descriptionFontSize = 17,
		ctaBgColor = '#d7e84f',
		ctaTextColor = '#1a1a1a',
		overlayOpacity = 0,
		containerMaxWidth,
		containerWidthPct,
		topGridGap,
		topMarginBottom,
		cardsGap,
		cardsMarginTop,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		description,
		ctaText,
		ctaUrl,
		ctaOpenInNewTab,
		showCta,
	} = attributes;

	const overlayRaw = Number( overlayOpacity );
	const overlayAlpha = Number.isFinite( overlayRaw )
		? Math.min( 1, Math.max( 0, overlayRaw / 100 ) )
		: 0;

	const blockProps = useBlockProps.save( {
		className: 'twork-third-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-third-max': `${ containerMaxWidth }px`,
			'--twork-third-width-pct': `${ containerWidthPct }%`,
			'--twork-third-top-gap': `${ topGridGap }px`,
			'--twork-third-top-mb': `${ topMarginBottom }px`,
			'--twork-third-cards-gap': `${ cardsGap }px`,
			'--twork-third-cards-mt': `${ cardsMarginTop }px`,
			'--tw-third-title-color': titleColor,
			'--tw-third-title-size': `${ titleFontSize }px`,
			'--tw-third-sub-color': subtitleColor,
			'--tw-third-sub-size': `${ subtitleFontSize }px`,
			'--tw-third-desc-color': descriptionColor,
			'--tw-third-desc-size': `${ descriptionFontSize }px`,
			'--tw-third-cta-bg': ctaBgColor,
			'--tw-third-cta-color': ctaTextColor,
			'--tw-third-overlay': overlayAlpha,
		},
	} );

	const url = String( ctaUrl || '' ).trim();
	const hasLink = url !== '';
	const ctaInner = (
		<>
			<span>{ ctaText }</span>
			<span aria-hidden="true">↗</span>
		</>
	);

	return (
		<section { ...blockProps }>
			<div className="twork-third-section__container">
				<div className="twork-third-section__top">
					<div className="twork-third-section__intro">
						{ ( tagline || tagIcon ) && (
							<div className="twork-third-section__tagline">
								{ tagIcon && (
									<img
										src={ tagIcon }
										alt={ tagIconAlt || '' }
										className="twork-third-section__tag-icon"
										width="20"
										height="20"
										loading="lazy"
										decoding="async"
									/>
								) }
								{ tagline && (
									<RichText.Content
										tagName="span"
										className="twork-third-section__subtitle"
										value={ tagline }
									/>
								) }
							</div>
						) }
						{ title && (
							<RichText.Content
								tagName="h2"
								className="twork-third-section__title"
								value={ title }
							/>
						) }
					</div>

					<div className="twork-third-section__side">
						{ description && (
							<RichText.Content
								tagName="p"
								className="twork-third-section__desc"
								value={ description }
							/>
						) }
						{ showCta && ctaText && (
							<>
								{ hasLink ? (
									<a
										href={ url }
										className="twork-third-section__cta"
										{ ...( ctaOpenInNewTab
											? {
													target: '_blank',
													rel: 'noopener noreferrer',
											  }
											: {} ) }
									>
										{ ctaInner }
									</a>
								) : (
									<span className="twork-third-section__cta twork-third-section__cta--static">
										{ ctaInner }
									</span>
								) }
							</>
						) }
					</div>
				</div>

				<div className="twork-third-section__cards">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
