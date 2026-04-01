import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		columnGap,
		mainImage,
		mainImageAlt,
		subImage,
		subImageAlt,
		badgeImage,
		badgeImageAlt,
		showShape,
		shapeColor,
		showBadge,
		enableBadgeSpin,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		description,
		authorImage,
		authorImageAlt,
		authorName,
		authorRole,
		signatureText,
		signatureColor,
		signatureFontSize,
		signatureFontFamily,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-about-intro twork-agrezer-about-intro-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-about-intro-max': `${ containerMaxWidth }px`,
			'--agrezer-about-intro-width-pct': `${ containerWidthPct }%`,
			'--agrezer-about-intro-gap': `${ columnGap }px`,
		},
		'data-badge-spin': enableBadgeSpin ? 'true' : 'false',
	} );

	return (
		<section { ...blockProps }>
			<div className="agrezer-about-intro__container">
				<div className="agrezer-about-intro__left">
					<div className="agrezer-about-intro__images-wrapper">
						{ showShape && (
							<div
								className="agrezer-about-intro__shape"
								style={ { backgroundColor: shapeColor } }
								aria-hidden="true"
							/>
						) }
						{ mainImage && (
							<img
								src={ mainImage }
								alt={ mainImageAlt || '' }
								className="agrezer-about-intro__img-main"
								loading="lazy"
								decoding="async"
							/>
						) }
						{ subImage && (
							<img
								src={ subImage }
								alt={ subImageAlt || '' }
								className="agrezer-about-intro__img-sub"
								loading="lazy"
								decoding="async"
							/>
						) }
						{ showBadge && badgeImage && (
							<div className="agrezer-about-intro__badge">
								<img
									src={ badgeImage }
									alt={ badgeImageAlt || '' }
									className="agrezer-about-intro__badge-img"
									loading="lazy"
									decoding="async"
								/>
							</div>
						) }
					</div>
				</div>

				<div className="agrezer-about-intro__right">
					{ ( tagline || tagIcon ) && (
						<div className="agrezer-about-intro__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="agrezer-about-intro__tag-icon"
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
							className="agrezer-about-intro__title"
							value={ title }
						/>
					) }
					{ description && (
						<RichText.Content
							tagName="p"
							className="agrezer-about-intro__desc"
							value={ description }
						/>
					) }

					<div className="agrezer-about-intro__features">
						<InnerBlocks.Content />
					</div>

					<div className="agrezer-about-intro__author-row">
						<div className="agrezer-about-intro__author-info">
							{ authorImage && (
								<img
									src={ authorImage }
									alt={ authorImageAlt || '' }
									className="agrezer-about-intro__author-img"
									loading="lazy"
									decoding="async"
								/>
							) }
							<div className="agrezer-about-intro__author-text">
								{ authorName && (
									<RichText.Content
										tagName="h4"
										className="agrezer-about-intro__author-name"
										value={ authorName }
									/>
								) }
								{ authorRole && (
									<RichText.Content
										tagName="span"
										className="agrezer-about-intro__author-role"
										value={ authorRole }
									/>
								) }
							</div>
						</div>

						{ signatureText && (
							<div
								className="agrezer-about-intro__signature"
								style={ {
									fontFamily: signatureFontFamily,
									fontSize: `${ signatureFontSize }rem`,
									color: signatureColor,
								} }
							>
								<RichText.Content
									tagName="span"
									value={ signatureText }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
