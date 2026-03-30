import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		memberImage,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showImageOverlay,
		imageOverlayColor,
		imageOverlayOpacity,
		memberName,
		memberNameColor,
		memberNameFontSize,
		memberNameFontWeight,
		memberPosition,
		memberPositionColor,
		memberPositionFontSize,
		memberPositionFontWeight,
		memberPositionTextTransform,
		showBio,
		memberBio,
		memberBioColor,
		memberBioFontSize,
		memberBioLineHeight,
		showSpecializations,
		specializations,
		specializationBgColor,
		specializationTextColor,
		specializationFontSize,
		specializationBorderRadius,
		showContactInfo,
		memberEmail,
		memberPhone,
		contactIconColor,
		contactTextColor,
		contactFontSize,
		showSocialLinks,
		socialFacebook,
		socialTwitter,
		socialLinkedin,
		socialInstagram,
		socialIconSize,
		socialIconColor,
		socialIconBgColor,
		socialIconBorderRadius,
		cardStyle,
		cardBackgroundColor,
		cardBackgroundGradientStart,
		cardBackgroundGradientEnd,
		cardBackgroundGradientAngle,
		cardPadding,
		cardBorderWidth,
		cardBorderColor,
		cardBorderStyle,
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
		className: 'team-member-card',
	} );

	const getCardBackground = () => {
		if ( cardStyle === 'gradient' ) {
			return `linear-gradient(${ cardBackgroundGradientAngle }deg, ${ cardBackgroundGradientStart }, ${ cardBackgroundGradientEnd })`;
		}
		return cardBackgroundColor;
	};

	return (
		<div { ...blockProps }>
			{ memberImage && (
				<div
					className="member-image-wrapper"
					style={ { position: 'relative' } }
				>
					<img
						src={ memberImage }
						alt={ memberName }
						className="member-image"
						style={ {
							width: '100%',
							height: `${ imageHeight }px`,
							objectFit: imageObjectFit,
							objectPosition: imageObjectPosition,
							display: 'block',
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
							} }
						/>
					) }
				</div>
			) }

			<div
				className="member-content"
				style={ {
					padding: `${ cardPadding }px`,
					background: getCardBackground(),
					borderWidth: `${ cardBorderWidth }px`,
					borderColor: cardBorderColor,
					borderStyle: cardBorderStyle,
				} }
			>
				<RichText.Content
					tagName="h3"
					value={ memberName }
					className="member-name"
					style={ {
						fontSize: `${ memberNameFontSize }rem`,
						fontWeight: memberNameFontWeight,
						color: memberNameColor,
						marginTop: 0,
						marginBottom: '8px',
					} }
				/>

				<RichText.Content
					tagName="p"
					value={ memberPosition }
					className="member-position"
					style={ {
						fontSize: `${ memberPositionFontSize }rem`,
						fontWeight: memberPositionFontWeight,
						color: memberPositionColor,
						textTransform: memberPositionTextTransform,
						marginTop: 0,
						marginBottom: '15px',
					} }
				/>

				{ showBio && memberBio && (
					<RichText.Content
						tagName="p"
						value={ memberBio }
						className="member-bio"
						style={ {
							fontSize: `${ memberBioFontSize }rem`,
							lineHeight: memberBioLineHeight,
							color: memberBioColor,
							marginBottom: '15px',
						} }
					/>
				) }

				{ showSpecializations &&
					specializations &&
					specializations.length > 0 && (
						<div
							className="member-specializations"
							style={ {
								display: 'flex',
								flexWrap: 'wrap',
								gap: '8px',
								marginBottom: '15px',
							} }
						>
							{ specializations.map( ( spec ) => (
								<span
									key={ spec.id }
									className="specialization-tag"
									style={ {
										backgroundColor: specializationBgColor,
										color: specializationTextColor,
										fontSize: `${ specializationFontSize }rem`,
										padding: '4px 12px',
										borderRadius: `${ specializationBorderRadius }px`,
										display: 'inline-block',
									} }
								>
									{ spec.text }
								</span>
							) ) }
						</div>
					) }

				{ showContactInfo && ( memberEmail || memberPhone ) && (
					<div
						className="member-contact"
						style={ { marginBottom: '15px' } }
					>
						{ memberEmail && (
							<div
								className="contact-item"
								style={ {
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									marginBottom: '5px',
									fontSize: `${ contactFontSize }rem`,
									color: contactTextColor,
								} }
							>
								<i
									className="fa fa-envelope"
									style={ { color: contactIconColor } }
									aria-hidden="true"
								/>
								<a
									href={ `mailto:${ memberEmail }` }
									style={ {
										color: 'inherit',
										textDecoration: 'none',
									} }
								>
									{ memberEmail }
								</a>
							</div>
						) }
						{ memberPhone && (
							<div
								className="contact-item"
								style={ {
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									fontSize: `${ contactFontSize }rem`,
									color: contactTextColor,
								} }
							>
								<i
									className="fa fa-phone"
									style={ { color: contactIconColor } }
									aria-hidden="true"
								/>
								<a
									href={ `tel:${ memberPhone }` }
									style={ {
										color: 'inherit',
										textDecoration: 'none',
									} }
								>
									{ memberPhone }
								</a>
							</div>
						) }
					</div>
				) }

				{ showSocialLinks &&
					( socialFacebook ||
						socialTwitter ||
						socialLinkedin ||
						socialInstagram ) && (
						<div
							className="member-social"
							style={ {
								display: 'flex',
								gap: '10px',
								marginBottom: showButton ? '15px' : '0',
							} }
						>
							{ socialFacebook && (
								<a
									href={ socialFacebook }
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
									aria-label="Facebook"
									style={ {
										fontSize: `${ socialIconSize }rem`,
										color: socialIconColor,
										backgroundColor: socialIconBgColor,
										width: '36px',
										height: '36px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: `${ socialIconBorderRadius }%`,
										textDecoration: 'none',
										transition: 'all 0.3s ease',
									} }
								>
									<i
										className="fab fa-facebook-f"
										aria-hidden="true"
									/>
								</a>
							) }
							{ socialTwitter && (
								<a
									href={ socialTwitter }
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
									aria-label="Twitter"
									style={ {
										fontSize: `${ socialIconSize }rem`,
										color: socialIconColor,
										backgroundColor: socialIconBgColor,
										width: '36px',
										height: '36px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: `${ socialIconBorderRadius }%`,
										textDecoration: 'none',
										transition: 'all 0.3s ease',
									} }
								>
									<i
										className="fab fa-twitter"
										aria-hidden="true"
									/>
								</a>
							) }
							{ socialLinkedin && (
								<a
									href={ socialLinkedin }
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
									aria-label="LinkedIn"
									style={ {
										fontSize: `${ socialIconSize }rem`,
										color: socialIconColor,
										backgroundColor: socialIconBgColor,
										width: '36px',
										height: '36px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: `${ socialIconBorderRadius }%`,
										textDecoration: 'none',
										transition: 'all 0.3s ease',
									} }
								>
									<i
										className="fab fa-linkedin-in"
										aria-hidden="true"
									/>
								</a>
							) }
							{ socialInstagram && (
								<a
									href={ socialInstagram }
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
									aria-label="Instagram"
									style={ {
										fontSize: `${ socialIconSize }rem`,
										color: socialIconColor,
										backgroundColor: socialIconBgColor,
										width: '36px',
										height: '36px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: `${ socialIconBorderRadius }%`,
										textDecoration: 'none',
										transition: 'all 0.3s ease',
									} }
								>
									<i
										className="fab fa-instagram"
										aria-hidden="true"
									/>
								</a>
							) }
						</div>
					) }

				{ showButton && buttonText && (
					<div
						className="member-button-wrapper"
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
							href={ buttonUrl }
							target={ buttonTarget ? '_blank' : '_self' }
							rel={ buttonRel }
							className="member-button"
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
