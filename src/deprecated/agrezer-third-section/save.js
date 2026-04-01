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
		className: 'agrezer-third-section twork-agrezer-third-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-third-max': `${ containerMaxWidth }px`,
			'--agrezer-third-width-pct': `${ containerWidthPct }%`,
			'--agrezer-third-top-gap': `${ topGridGap }px`,
			'--agrezer-third-top-mb': `${ topMarginBottom }px`,
			'--agrezer-third-cards-gap': `${ cardsGap }px`,
			'--agrezer-third-cards-mt': `${ cardsMarginTop }px`,
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
			<div className="agrezer-third-section__container">
				<div className="agrezer-third-section__top">
					<div className="agrezer-third-section__intro">
						{ ( tagline || tagIcon ) && (
							<div className="agrezer-third-section__tagline">
								{ tagIcon && (
									<img
										src={ tagIcon }
										alt={ tagIconAlt || '' }
										className="agrezer-third-section__tag-icon"
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
								className="agrezer-third-section__title"
								value={ title }
							/>
						) }
					</div>

					<div className="agrezer-third-section__side">
						{ description && (
							<RichText.Content
								tagName="p"
								className="agrezer-third-section__desc"
								value={ description }
							/>
						) }
						{ showCta && ctaText && (
							<>
								{ hasLink ? (
									<a
										href={ url }
										className="agrezer-third-section__cta"
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
									<span className="agrezer-third-section__cta agrezer-third-section__cta--static">
										{ ctaInner }
									</span>
								) }
							</>
						) }
					</div>
				</div>

				<div className="agrezer-third-section__cards">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
