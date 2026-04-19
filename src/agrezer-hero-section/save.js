import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const HERO_OVERLAY_TRANSPARENT_GRADIENT =
	'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)';

function TaglineIcon() {
	return (
		<svg
			className="twork-hero__tagline-icon"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M12 22v-6.4" />
			<path d="M12 15.6c-4.8 0-8.4-2.4-9.6-6.4 3.7.2 6.5 1.1 8.4 2.8 1.2-2.4 1.3-5.1.3-8 4 1.1 6.7 3.6 8 7.4-1.7 2.7-4.1 4.1-7.1 4.2Z" />
		</svg>
	);
}

export default function save( { attributes } ) {
	const {
		taglineText,
		title,
		description,
		buttonText,
		buttonMediaUrl,
		buttonMediaType,
		buttonUrl,
		buttonLinkTarget,
		backgroundImage,
		overlayColor,
		overlayGradient,
		overlayOpacity,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		featuresGap,
	} = attributes;

	const href =
		buttonUrl && String( buttonUrl ).trim() !== '' ? buttonUrl : '#';

	const overlayGradientCss =
		overlayGradient && String( overlayGradient ).trim() !== ''
			? overlayGradient
			: HERO_OVERLAY_TRANSPARENT_GRADIENT;

	const blockProps = useBlockProps.save( {
		className: 'twork-hero twork-hero--bg',
		style: {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-container-max-width': `${ containerMaxWidth }px`,
			'--twork-container-padding': `${ containerPadding }px`,
			'--twork-features-gap': `${ featuresGap }px`,
			'--twork-hero-btn-bg': buttonBgColor,
			'--twork-hero-btn-text': buttonTextColor,
			'--twork-hero-btn-radius': `${ buttonBorderRadius }px`,
			'--twork-padding-top-mobile': `${ paddingTopMobile }px`,
			'--twork-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--twork-hero-overlay-gradient': overlayGradientCss,
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="twork-hero__overlay"
				style={ {
					'--twork-hero-overlay-color': overlayColor,
					'--twork-hero-overlay-opacity': overlayOpacity,
					'--twork-hero-overlay-gradient': overlayGradientCss,
				} }
			/>
			<div className="twork-hero__container">
				<div className="twork-hero__content">
					<div className="twork-hero__tagline">
						<TaglineIcon />
						<RichText.Content
							tagName="span"
							className="twork-hero__tagline-text"
							value={ taglineText }
						/>
					</div>
					<RichText.Content
						tagName="h1"
						className="twork-hero__title twork-hero__title"
						value={ title }
					/>
					<RichText.Content
						tagName="p"
						className="twork-hero__desc"
						value={ description }
					/>
					<a
						href={ href }
						className="twork-hero__btn"
						target={ buttonLinkTarget ? '_blank' : undefined }
						rel={
							buttonLinkTarget ? 'noopener noreferrer' : undefined
						}
					>
						<RichText.Content tagName="span" value={ buttonText } />
						{ ! buttonMediaUrl && (
							<span aria-hidden="true">&#x2197;</span>
						) }
						{ buttonMediaUrl && buttonMediaType === 'video' && (
							<video
								className="twork-hero__btn-media"
								src={ buttonMediaUrl }
								autoPlay
								muted
								loop
								playsInline
								aria-hidden="true"
							/>
						) }
						{ buttonMediaUrl && buttonMediaType !== 'video' && (
							<img
								className="twork-hero__btn-media"
								src={ buttonMediaUrl }
								alt=""
								aria-hidden="true"
							/>
						) }
					</a>
				</div>

				<div className="twork-hero__features-wrapper">
					<div className="twork-hero__features-track">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
