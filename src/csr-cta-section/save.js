import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundType,
		backgroundColor,
		backgroundImage,
		backgroundImageSize,
		backgroundImagePosition,
		backgroundVideoUrl,
		videoPosterUrl,
		videoLoop,
		videoMuted,
		videoAutoplay,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		textColor,
		paddingTop,
		paddingBottom,
		showTitle,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		showParagraph,
		paragraph,
		paragraphColor,
		paragraphFontSize,
		paragraphMaxWidth,
		paragraphMarginBottom,
		buttonText,
		buttonUrl,
		buttonOpensInNewTab,
		containerMaxWidth,
		containerPadding,
		textAlignment,
		animationOnScroll,
	} = attributes;

	const hasMedia =
		( backgroundType === 'image' && backgroundImage ) ||
		( backgroundType === 'video' && backgroundVideoUrl );

	const blockProps = useBlockProps.save( {
		className: 'twork-csr-cta-section csr-cta-section',
		style: {
			backgroundColor:
				backgroundType === 'color' || ! hasMedia
					? backgroundColor
					: 'transparent',
			backgroundImage:
				backgroundType === 'image' && backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
			backgroundSize:
				backgroundType === 'image' && backgroundImage
					? backgroundImageSize
					: undefined,
			backgroundPosition:
				backgroundType === 'image' && backgroundImage
					? backgroundImagePosition
					: undefined,
			color: textColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			textAlign: textAlignment,
			position: 'relative',
			overflow: hasMedia ? 'hidden' : undefined,
		},
		'data-animation': animationOnScroll,
	} );

	return (
		<div { ...blockProps }>
			{ backgroundType === 'video' && backgroundVideoUrl && (
				<div className="csr-cta-bg-video-wrap">
					<video
						src={ backgroundVideoUrl }
						poster={ videoPosterUrl || undefined }
						autoPlay={ videoAutoplay }
						muted={ videoMuted }
						loop={ videoLoop }
						playsInline
						className="csr-cta-bg-video"
					/>
				</div>
			) }
			{ hasMedia && backgroundOverlay && (
				<div
					className="csr-cta-overlay"
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: backgroundOverlayColor,
						opacity: backgroundOverlayOpacity,
						zIndex: 2,
					} }
				/>
			) }
			<div
				className={ `jivaka-container ${
					animationOnScroll ? 'fade-up' : ''
				}` }
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 3,
				} }
			>
				{ showTitle && title && (
					<RichText.Content
						tagName="h2"
						value={ title }
						style={ {
							marginTop: 0,
							marginBottom: `${ titleMarginBottom }px`,
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
						} }
					/>
				) }
				{ showParagraph && paragraph && (
					<RichText.Content
						tagName="p"
						value={ paragraph }
						style={ {
							marginBottom: `${ paragraphMarginBottom }px`,
							maxWidth: `${ paragraphMaxWidth }px`,
							marginLeft: 'auto',
							marginRight: 'auto',
							color: paragraphColor,
							fontSize: `${ paragraphFontSize }rem`,
							lineHeight: 1.6,
						} }
					/>
				) }
				{ buttonText && (
					<a
						href={ buttonUrl || '#' }
						className="jivaka-btn btn-primary"
						target={ buttonOpensInNewTab ? '_blank' : '_self' }
						rel={
							buttonOpensInNewTab
								? 'noopener noreferrer'
								: undefined
						}
						style={ { fontSize: '0.9rem', padding: '12px 28px' } }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</div>
	);
}
