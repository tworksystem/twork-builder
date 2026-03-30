import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function TaglineIcon() {
	return (
		<svg
			className="agrezer-hero__tagline-icon"
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
		buttonUrl,
		buttonLinkTarget,
		backgroundImage,
		overlayColor,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		featuresGap,
	} = attributes;

	const href =
		buttonUrl && String( buttonUrl ).trim() !== ''
			? buttonUrl
			: '#';

	const blockProps = useBlockProps.save( {
		className: 'agrezer-hero agrezer-hero--bg twork-agrezer-hero-section',
		style: {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-container-max-width': `${ containerMaxWidth }px`,
			'--agrezer-container-padding': `${ containerPadding }px`,
			'--agrezer-features-gap': `${ featuresGap }px`,
		},
	} );

	return (
		<section { ...blockProps } aria-labelledby="agrezer-hero-title">
			<div
				className="agrezer-hero__overlay"
				style={ { backgroundColor: overlayColor } }
			/>
			<div className="agrezer-hero__container">
				<div className="agrezer-hero__content">
					<div className="agrezer-hero__tagline">
						<TaglineIcon />
						<RichText.Content
							tagName="span"
							className="agrezer-hero__tagline-text"
							value={ taglineText }
						/>
					</div>
					<RichText.Content
						tagName="h1"
						id="agrezer-hero-title"
						className="agrezer-hero__title"
						value={ title }
					/>
					<RichText.Content
						tagName="p"
						className="agrezer-hero__desc"
						value={ description }
					/>
					<a
						href={ href }
						className="agrezer-hero__btn"
						target={ buttonLinkTarget ? '_blank' : undefined }
						rel={
							buttonLinkTarget
								? 'noopener noreferrer'
								: undefined
						}
					>
						<RichText.Content tagName="span" value={ buttonText } />
						<span aria-hidden="true">&#x2197;</span>
					</a>
				</div>

				<div className="agrezer-hero__features-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
