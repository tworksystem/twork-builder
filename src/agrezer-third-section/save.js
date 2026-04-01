import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
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

	const blockProps = useBlockProps.save( {
		className: 'twork-third-section twork-third-section',
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
