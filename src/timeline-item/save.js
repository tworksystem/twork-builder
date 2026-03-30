import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		year,
		yearColor,
		yearFontSize,
		yearFontWeight,
		heading,
		headingColor,
		headingFontSize,
		headingFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		showImage,
		image,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		imageBorderRadius,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		contentBackgroundColor,
		contentPadding,
		contentBorderRadius,
		contentBoxShadow,
		contentBoxShadowColor,
		contentBoxShadowBlur,
		contentBoxShadowSpread,
		contentBoxShadowOffsetX,
		contentBoxShadowOffsetY,
		contentBorderWidth,
		contentBorderColor,
		contentBorderStyle,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonFontSize,
		buttonFontWeight,
		buttonTextTransform,
		buttonIcon,
		buttonIconPosition,
		buttonBorderWidth,
		buttonBorderColor,
		buttonBorderStyle,
		buttonHoverBgColor,
		buttonHoverTextColor,
		buttonHoverBorderColor,
		buttonBoxShadow,
		buttonBoxShadowColor,
		buttonBoxShadowBlur,
		buttonBoxShadowSpread,
		buttonBoxShadowOffsetX,
		buttonBoxShadowOffsetY,
		buttonHoverBoxShadow,
		buttonHoverBoxShadowColor,
		buttonHoverBoxShadowBlur,
		buttonHoverBoxShadowSpread,
		buttonHoverBoxShadowOffsetX,
		buttonHoverBoxShadowOffsetY,
		buttonWidth,
		buttonWidthCustom,
		buttonAlignment,
		buttonMarginTop,
		buttonMarginBottom,
		buttonMarginLeft,
		buttonMarginRight,
		buttonLetterSpacing,
		buttonLineHeight,
		buttonTransitionDuration,
		buttonHoverScale,
		buttonHoverTranslateY,
		buttonFontSizeMobile,
		buttonPaddingVerticalMobile,
		buttonPaddingHorizontalMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'timeline-item',
	} );

	return (
		<div { ...blockProps }>
			<div className="timeline-dot" />

			{ showImage && image ? (
				<div className="timeline-image-wrapper">
					<img
						src={ image }
						alt={ heading || year || '' }
						className="timeline-image"
						style={ {
							width: '100%',
							height: `${ imageHeight }px`,
							objectFit: imageObjectFit,
							objectPosition: imageObjectPosition,
							display: 'block',
							borderRadius: `${ imageBorderRadius }px`,
						} }
					/>
					{ showImageOverlay && (
						<div
							className="image-overlay"
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: imageOverlayColor,
								opacity: imageOverlayOpacity,
								borderRadius: `${ imageBorderRadius }px`,
								pointerEvents: 'none',
							} }
						/>
					) }
				</div>
			) : null }

			<div
				className="timeline-content"
				style={ {
					padding: `${ contentPadding }px`,
					background: contentBackgroundColor,
					borderRadius: `${ contentBorderRadius }px`,
					borderWidth: `${ contentBorderWidth }px`,
					borderColor: contentBorderColor,
					borderStyle: contentBorderStyle,
					boxShadow: contentBoxShadow
						? `${ contentBoxShadowOffsetX }px ${ contentBoxShadowOffsetY }px ${ contentBoxShadowBlur }px ${ contentBoxShadowSpread }px ${ contentBoxShadowColor }`
						: '0 5px 15px rgba(0, 0, 0, 0.05)',
					// Layout (width/flex/position) must stay in CSS for responsive breakpoints.
				} }
			>
				{ year && (
					<RichText.Content
						tagName="h3"
						value={ year }
						className="timeline-year"
						style={ {
							fontSize: `${ yearFontSize }rem`,
							fontWeight: yearFontWeight,
							color: yearColor,
							marginTop: 0,
							marginBottom: '10px',
							lineHeight: 1.2,
						} }
					/>
				) }

				{ heading && (
					<RichText.Content
						tagName="h4"
						value={ heading }
						className="timeline-heading"
						style={ {
							fontSize: `${ headingFontSize }rem`,
							fontWeight: headingFontWeight,
							color: headingColor,
							marginTop: 0,
							marginBottom: '10px',
							lineHeight: 1.3,
						} }
					/>
				) }

				{ description && (
					<RichText.Content
						tagName="p"
						value={ description }
						className="timeline-description"
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							lineHeight: descriptionLineHeight,
							color: descriptionColor,
							marginBottom: showButton ? '20px' : '0',
							marginTop: 0,
						} }
					/>
				) }

				{ showButton && buttonText && (
					<div
						className="timeline-button-wrapper"
						style={ {
							marginTop: 'auto',
							width:
								buttonWidth === 'full'
									? '100%'
									: buttonWidth === 'custom'
									? `${ buttonWidthCustom }px`
									: 'auto',
							textAlign: buttonAlignment,
							marginTop: `${ buttonMarginTop }px`,
							marginBottom: `${ buttonMarginBottom }px`,
							marginLeft: `${ buttonMarginLeft }px`,
							marginRight: `${ buttonMarginRight }px`,
							'--button-font-size-mobile':
								buttonFontSizeMobile > 0
									? `${ buttonFontSizeMobile }rem`
									: `${ buttonFontSize }rem`,
							'--button-padding-vertical-mobile':
								buttonPaddingVerticalMobile > 0
									? `${ buttonPaddingVerticalMobile }px`
									: `${ buttonPaddingVertical }px`,
							'--button-padding-horizontal-mobile':
								buttonPaddingHorizontalMobile > 0
									? `${ buttonPaddingHorizontalMobile }px`
									: `${ buttonPaddingHorizontal }px`,
						} }
					>
						<a
							href={ buttonUrl || '#' }
							target={ buttonTarget ? '_blank' : '_self' }
							rel={
								buttonRel ||
								( buttonTarget
									? 'noopener noreferrer'
									: undefined )
							}
							className="timeline-button"
							style={ {
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
								backgroundColor: buttonBgColor,
								color: buttonTextColor,
								padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
								borderRadius: `${ buttonBorderRadius }px`,
								fontSize: `${ buttonFontSize }rem`,
								fontWeight: buttonFontWeight,
								textTransform: buttonTextTransform,
								letterSpacing: `${ buttonLetterSpacing }px`,
								lineHeight: buttonLineHeight,
								textDecoration: 'none',
								borderWidth: `${ buttonBorderWidth }px`,
								borderStyle: buttonBorderStyle,
								borderColor: buttonBorderColor,
								boxShadow: buttonBoxShadow
									? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
									: 'none',
								transition: `all ${ buttonTransitionDuration }s ease`,
								width:
									buttonWidth === 'full'
										? '100%'
										: buttonWidth === 'custom'
										? `${ buttonWidthCustom }px`
										: 'auto',
								justifyContent:
									buttonAlignment === 'center'
										? 'center'
										: buttonAlignment === 'right'
										? 'flex-end'
										: 'flex-start',
								'--hover-bg-color':
									buttonHoverBgColor || buttonBgColor,
								'--hover-text-color':
									buttonHoverTextColor || buttonTextColor,
								'--hover-border-color':
									buttonHoverBorderColor || buttonBorderColor,
								'--hover-scale': buttonHoverScale || 1,
								'--hover-translate-y': `${
									buttonHoverTranslateY || 0
								}px`,
								'--hover-shadow':
									buttonHoverBoxShadow &&
									( buttonHoverBoxShadowColor ||
										buttonBoxShadowColor )
										? `${
												buttonHoverBoxShadowOffsetX || 0
										  }px ${
												buttonHoverBoxShadowOffsetY || 0
										  }px ${
												buttonHoverBoxShadowBlur || 0
										  }px ${
												buttonHoverBoxShadowSpread || 0
										  }px ${
												buttonHoverBoxShadowColor ||
												buttonBoxShadowColor
										  }`
										: 'none',
							} }
						>
							{ buttonIcon && buttonIconPosition === 'left' && (
								<i
									className={ `fa ${ buttonIcon }` }
									aria-hidden="true"
								/>
							) }
							<span>{ buttonText }</span>
							{ buttonIcon && buttonIconPosition === 'right' && (
								<i
									className={ `fa ${ buttonIcon }` }
									aria-hidden="true"
								/>
							) }
						</a>
					</div>
				) }
			</div>
		</div>
	);
}
