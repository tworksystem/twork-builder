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
		className: 'twork-about-intro twork-about-intro-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-about-intro-max': `${ containerMaxWidth }px`,
			'--twork-about-intro-width-pct': `${ containerWidthPct }%`,
			'--twork-about-intro-gap': `${ columnGap }px`,
		},
		'data-badge-spin': enableBadgeSpin ? 'true' : 'false',
	} );

	return (
		<section { ...blockProps }>
			<div className="twork-about-intro__container">
				<div className="twork-about-intro__left">
					<div className="twork-about-intro__images-wrapper">
						{ showShape && (
							<div
								className="twork-about-intro__shape"
								style={ { backgroundColor: shapeColor } }
								aria-hidden="true"
							/>
						) }
						{ mainImage && (
							<img
								src={ mainImage }
								alt={ mainImageAlt || '' }
								className="twork-about-intro__img-main"
								loading="lazy"
								decoding="async"
							/>
						) }
						{ subImage && (
							<img
								src={ subImage }
								alt={ subImageAlt || '' }
								className="twork-about-intro__img-sub"
								loading="lazy"
								decoding="async"
							/>
						) }
						{ showBadge && badgeImage && (
							<div className="twork-about-intro__badge">
								<img
									src={ badgeImage }
									alt={ badgeImageAlt || '' }
									className="twork-about-intro__badge-img"
									loading="lazy"
									decoding="async"
								/>
							</div>
						) }
					</div>
				</div>

				<div className="twork-about-intro__right">
					{ ( tagline || tagIcon ) && (
						<div className="twork-about-intro__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="twork-about-intro__tag-icon"
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
							className="twork-about-intro__title"
							value={ title }
						/>
					) }
					{ description && (
						<RichText.Content
							tagName="p"
							className="twork-about-intro__desc"
							value={ description }
						/>
					) }

					<div className="twork-about-intro__features">
						<InnerBlocks.Content />
					</div>

					<div className="twork-about-intro__author-row">
						<div className="twork-about-intro__author-info">
							{ authorImage && (
								<img
									src={ authorImage }
									alt={ authorImageAlt || '' }
									className="twork-about-intro__author-img"
									loading="lazy"
									decoding="async"
								/>
							) }
							<div className="twork-about-intro__author-text">
								{ authorName && (
									<RichText.Content
										tagName="h4"
										className="twork-about-intro__author-name"
										value={ authorName }
									/>
								) }
								{ authorRole && (
									<RichText.Content
										tagName="span"
										className="twork-about-intro__author-role"
										value={ authorRole }
									/>
								) }
							</div>
						</div>

						{ signatureText && (
							<div
								className="twork-about-intro__signature"
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
