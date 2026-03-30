import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		subtitle,
		buttonText,
		buttonUrl,
		openInNewTab,
		backgroundColor,
		backgroundImage,
		padding,
		borderRadius,
		textAlign,
		titleColor,
		subtitleColor,
		subtitleOpacity,
		buttonBackgroundColor,
		buttonTextColor,
		marginBottom,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-health-check-cta-section',
		style: {
			marginBottom: `${ marginBottom }px`,
		},
		'data-animation': animationOnScroll,
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const ctaBoxStyle = {
		background: backgroundColor || '#005f73',
		backgroundImage: backgroundImage ? `url(${ backgroundImage })` : 'none',
		backgroundSize: 'auto',
		backgroundPosition: 'center',
		backgroundRepeat: 'repeat',
		color: subtitleColor || '#fff',
		padding: `${ padding }px`,
		borderRadius: `${ borderRadius }px`,
		textAlign: textAlign || 'center',
	};

	return (
		<div { ...blockProps }>
			<div className="chk-container" style={ containerStyle }>
				<div className="chk-cta-box fade-up" style={ ctaBoxStyle }>
					{ title && (
						<RichText.Content
							tagName="h2"
							value={ title }
							style={ {
								color: titleColor || '#fff',
								marginTop: 0,
								marginBottom: 15,
							} }
						/>
					) }
					{ subtitle && (
						<RichText.Content
							tagName="p"
							value={ subtitle }
							style={ {
								color: subtitleColor || '#fff',
								opacity: subtitleOpacity,
								marginBottom: 30,
							} }
						/>
					) }
					{ buttonText && (
						<a
							href={ buttonUrl || '#' }
							className="chk-btn chk-cta-btn"
							style={ {
								background: buttonBackgroundColor || '#fff',
								color: buttonTextColor || '#005f73',
							} }
							rel={
								openInNewTab ? 'noopener noreferrer' : undefined
							}
							target={ openInNewTab ? '_blank' : undefined }
						>
							{ buttonText }
						</a>
					) }
				</div>
			</div>
		</div>
	);
}
