import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundImage,
		imageOpacity,
		heightDesktop,
		heightMobile,
		marginBottom,
		marginBottomMobile,
		titleText,
		titleColor,
		subtitleText,
		subtitleColor,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-booking-hero-section page-hero',
		style: {
			'--booking-hero-height': `${ heightDesktop }px`,
			'--booking-hero-height-mobile': `${ heightMobile }px`,
			'--booking-hero-margin-bottom': `${ marginBottom }px`,
			'--booking-hero-margin-bottom-mobile': `${ marginBottomMobile }px`,
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
	} );

	return (
		<section { ...blockProps }>
			{ backgroundImage && (
				<div className="hero-bg-wrapper">
					<img
						src={ backgroundImage }
						alt=""
						className="hero-bg-img"
						style={ { opacity: imageOpacity } }
					/>
				</div>
			) }
			<div
				className="hero-container animate-hero"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					padding: `0 ${ containerPadding }px`,
				} }
			>
				{ titleText && (
					<RichText.Content
						tagName="h1"
						className="hero-title"
						value={ titleText }
						style={ { color: titleColor } }
					/>
				) }
				{ subtitleText && (
					<RichText.Content
						tagName="p"
						className="hero-subtitle"
						value={ subtitleText }
						style={ { color: subtitleColor } }
					/>
				) }
			</div>
		</section>
	);
}
