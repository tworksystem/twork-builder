import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		columns,
		gap,
		gridMarginTop,
		showIntroTitle,
		introTitle,
		introTitleColor,
		introTitleFontSize,
		introTitleFontWeight,
		introTitleAlignment,
		showIntroContent,
		introContent,
		introContentColor,
		introContentFontSize,
		introContentAlignment,
		introMaxWidth,
		introMarginBottom,
		containerMaxWidth,
		containerPadding,
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-accreditation-section section-padding',
		style: {
			backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			'--hover-translate-y': `${ hoverTranslateY }px`,
		},
		'data-hover-effect': hoverEffect,
		'data-hover-translate-y': hoverTranslateY,
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
	} );

	return (
		<section { ...blockProps }>
			{ backgroundImage && backgroundOverlay && (
				<div
					className="background-overlay"
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: backgroundOverlayColor,
						opacity: backgroundOverlayOpacity,
						zIndex: 1,
					} }
				/>
			) }

			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				{ ( showIntroTitle || showIntroContent ) && (
					<div
						className="intro-text fade-up"
						style={ {
							maxWidth: `${ introMaxWidth }px`,
							margin: `0 auto ${ introMarginBottom }px`,
							textAlign: introTitleAlignment,
						} }
					>
						{ showIntroTitle && (
							<RichText.Content
								tagName="h2"
								value={ introTitle }
								style={ {
									fontSize: `${ introTitleFontSize }rem`,
									fontWeight: introTitleFontWeight,
									color: introTitleColor,
									marginBottom: showIntroContent
										? '20px'
										: '0',
								} }
							/>
						) }
						{ showIntroContent && (
							<RichText.Content
								tagName="p"
								value={ introContent }
								style={ {
									fontSize: `${ introContentFontSize }rem`,
									color: introContentColor,
									textAlign: introContentAlignment,
									margin: 0,
								} }
							/>
						) }
					</div>
				) }

				<div
					className="accreditation-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						gap: `${ gap }px`,
						marginTop: `${ gridMarginTop }px`,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
