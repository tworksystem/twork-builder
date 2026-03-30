import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		layoutDirection,
		contentWidth,
		imageWidth,
		contentWidthTablet,
		imageWidthTablet,
		contentWidthMobile,
		imageWidthMobile,
		backgroundImage,
		backgroundImageId,
		backgroundImageTablet,
		backgroundImageTabletId,
		backgroundImageMobile,
		backgroundImageMobileId,
		useResponsiveImages,
		backgroundImagePosition,
		backgroundImageSize,
		backgroundImageSizeTablet,
		backgroundImageSizeMobile,
		backgroundImagePositionTablet,
		backgroundImagePositionMobile,
		backgroundImageCustomSize,
		backgroundImageCustomSizeTablet,
		backgroundImageCustomSizeMobile,
		showBackgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		contentBackgroundColor,
		contentPadding,
		contentPaddingTablet,
		contentPaddingMobile,
		contentMaxWidth,
		contentMarginRight,
		contentMarginRightTablet,
		contentMarginRightMobile,
		contentAlignment,
		contentAlignmentTablet,
		contentAlignmentMobile,
		imageMinHeight,
		imageMinHeightTablet,
		imageMinHeightMobile,
		imageObjectFit,
		imageObjectPosition,
		imageMaxWidth,
		imageMaxWidthTablet,
		imageMaxWidthMobile,
		imageMaxHeight,
		imageMaxHeightTablet,
		imageMaxHeightMobile,
		imageAspectRatio,
		imageOverflow,
		imageMarginTop,
		imageMarginTopTablet,
		imageMarginTopMobile,
		imageMarginRight,
		imageMarginRightTablet,
		imageMarginRightMobile,
		imageMarginBottom,
		imageMarginBottomTablet,
		imageMarginBottomMobile,
		imageMarginLeft,
		imageMarginLeftTablet,
		imageMarginLeftMobile,
		imagePaddingTop,
		imagePaddingTopTablet,
		imagePaddingTopMobile,
		imagePaddingRight,
		imagePaddingRightTablet,
		imagePaddingRightMobile,
		imagePaddingBottom,
		imagePaddingBottomTablet,
		imagePaddingBottomMobile,
		imagePaddingLeft,
		imagePaddingLeftTablet,
		imagePaddingLeftMobile,
		paddingTopTablet,
		paddingTopMobile,
		paddingBottomTablet,
		paddingBottomMobile,
		showMetaTitle,
		metaTitle,
		metaTitleColor,
		metaTitleColorTablet,
		metaTitleColorMobile,
		metaTitleFontSize,
		metaTitleFontSizeTablet,
		metaTitleFontSizeMobile,
		metaTitleFontWeight,
		metaTitleFontWeightTablet,
		metaTitleFontWeightMobile,
		metaTitleTextTransform,
		metaTitleTextTransformTablet,
		metaTitleTextTransformMobile,
		metaTitleLetterSpacing,
		metaTitleLetterSpacingTablet,
		metaTitleLetterSpacingMobile,
		metaTitleMarginTop,
		metaTitleMarginTopTablet,
		metaTitleMarginTopMobile,
		metaTitleMarginBottom,
		metaTitleMarginBottomTablet,
		metaTitleMarginBottomMobile,
		metaTitleMarginLeft,
		metaTitleMarginLeftTablet,
		metaTitleMarginLeftMobile,
		metaTitleMarginRight,
		metaTitleMarginRightTablet,
		metaTitleMarginRightMobile,
		metaTitlePaddingTop,
		metaTitlePaddingTopTablet,
		metaTitlePaddingTopMobile,
		metaTitlePaddingBottom,
		metaTitlePaddingBottomTablet,
		metaTitlePaddingBottomMobile,
		metaTitlePaddingLeft,
		metaTitlePaddingLeftTablet,
		metaTitlePaddingLeftMobile,
		metaTitlePaddingRight,
		metaTitlePaddingRightTablet,
		metaTitlePaddingRightMobile,
		metaTitleAlignment,
		metaTitleAlignmentTablet,
		metaTitleAlignmentMobile,
		showHeading,
		heading,
		headingColor,
		headingColorTablet,
		headingColorMobile,
		headingFontSize,
		headingFontSizeTablet,
		headingFontSizeMobile,
		headingFontWeight,
		headingFontWeightTablet,
		headingFontWeightMobile,
		headingLineHeight,
		headingLineHeightTablet,
		headingLineHeightMobile,
		headingLetterSpacing,
		headingLetterSpacingTablet,
		headingLetterSpacingMobile,
		headingMarginTop,
		headingMarginTopTablet,
		headingMarginTopMobile,
		headingMarginBottom,
		headingMarginBottomTablet,
		headingMarginBottomMobile,
		headingMarginLeft,
		headingMarginLeftTablet,
		headingMarginLeftMobile,
		headingMarginRight,
		headingMarginRightTablet,
		headingMarginRightMobile,
		headingPaddingTop,
		headingPaddingTopTablet,
		headingPaddingTopMobile,
		headingPaddingBottom,
		headingPaddingBottomTablet,
		headingPaddingBottomMobile,
		headingPaddingLeft,
		headingPaddingLeftTablet,
		headingPaddingLeftMobile,
		headingPaddingRight,
		headingPaddingRightTablet,
		headingPaddingRightMobile,
		headingAlignment,
		headingAlignmentTablet,
		headingAlignmentMobile,
		showHighlight,
		highlightText,
		highlightColor,
		highlightColorTablet,
		highlightColorMobile,
		highlightFontWeight,
		highlightFontWeightTablet,
		highlightFontWeightMobile,
		highlightFontSize,
		highlightFontSizeTablet,
		highlightFontSizeMobile,
		showDescription,
		description,
		descriptionColor,
		descriptionColorTablet,
		descriptionColorMobile,
		descriptionFontSize,
		descriptionFontSizeTablet,
		descriptionFontSizeMobile,
		descriptionLineHeight,
		descriptionLineHeightTablet,
		descriptionLineHeightMobile,
		descriptionMarginTop,
		descriptionMarginTopTablet,
		descriptionMarginTopMobile,
		descriptionMarginBottom,
		descriptionMarginBottomTablet,
		descriptionMarginBottomMobile,
		descriptionMarginLeft,
		descriptionMarginLeftTablet,
		descriptionMarginLeftMobile,
		descriptionMarginRight,
		descriptionMarginRightTablet,
		descriptionMarginRightMobile,
		descriptionPaddingTop,
		descriptionPaddingTopTablet,
		descriptionPaddingTopMobile,
		descriptionPaddingBottom,
		descriptionPaddingBottomTablet,
		descriptionPaddingBottomMobile,
		descriptionPaddingLeft,
		descriptionPaddingLeftTablet,
		descriptionPaddingLeftMobile,
		descriptionPaddingRight,
		descriptionPaddingRightTablet,
		descriptionPaddingRightMobile,
		descriptionAlignment,
		descriptionAlignmentTablet,
		descriptionAlignmentMobile,
		showNewsletterForm,
		formMarginTop,
		formMarginTopTablet,
		formMarginTopMobile,
		formMarginBottom,
		formMarginBottomTablet,
		formMarginBottomMobile,
		formMarginLeft,
		formMarginLeftTablet,
		formMarginLeftMobile,
		formMarginRight,
		formMarginRightTablet,
		formMarginRightMobile,
		formPaddingTop,
		formPaddingTopTablet,
		formPaddingTopMobile,
		formPaddingBottom,
		formPaddingBottomTablet,
		formPaddingBottomMobile,
		formPaddingLeft,
		formPaddingLeftTablet,
		formPaddingLeftMobile,
		formPaddingRight,
		formPaddingRightTablet,
		formPaddingRightMobile,
		formMaxWidth,
		formMaxWidthTablet,
		formMaxWidthMobile,
		formBorderRadius,
		formBorderRadiusTablet,
		formBorderRadiusMobile,
		formAlignment,
		formAlignmentTablet,
		formAlignmentMobile,
		formBoxShadow,
		formBoxShadowColor,
		formBoxShadowBlur,
		formBoxShadowSpread,
		formBoxShadowOffsetX,
		formBoxShadowOffsetY,
		formFocusShadowColor,
		formFocusShadowBlur,
		emailPlaceholder,
		emailBgColor,
		emailBgColorTablet,
		emailBgColorMobile,
		emailBorderColor,
		emailBorderColorTablet,
		emailBorderColorMobile,
		emailFocusBgColor,
		emailFocusBgColorTablet,
		emailFocusBgColorMobile,
		emailFocusBorderColor,
		emailFocusBorderColorTablet,
		emailFocusBorderColorMobile,
		emailTextColor,
		emailTextColorTablet,
		emailTextColorMobile,
		emailPlaceholderColor,
		emailPlaceholderColorTablet,
		emailPlaceholderColorMobile,
		emailFontSize,
		emailFontSizeTablet,
		emailFontSizeMobile,
		emailPaddingVertical,
		emailPaddingVerticalTablet,
		emailPaddingVerticalMobile,
		emailPaddingHorizontal,
		emailPaddingHorizontalTablet,
		emailPaddingHorizontalMobile,
		buttonText,
		buttonBgColor,
		buttonBgColorTablet,
		buttonBgColorMobile,
		buttonHoverBgColor,
		buttonHoverBgColorTablet,
		buttonHoverBgColorMobile,
		buttonTextColor,
		buttonTextColorTablet,
		buttonTextColorMobile,
		buttonFontSize,
		buttonFontSizeTablet,
		buttonFontSizeMobile,
		buttonFontWeight,
		buttonFontWeightTablet,
		buttonFontWeightMobile,
		buttonTextTransform,
		buttonTextTransformTablet,
		buttonTextTransformMobile,
		buttonLetterSpacing,
		buttonLetterSpacingTablet,
		buttonLetterSpacingMobile,
		buttonPaddingVertical,
		buttonPaddingVerticalTablet,
		buttonPaddingVerticalMobile,
		buttonPaddingHorizontal,
		buttonPaddingHorizontalTablet,
		buttonPaddingHorizontalMobile,
		buttonBoxShadow,
		buttonBoxShadowColor,
		buttonBoxShadowBlur,
		buttonBoxShadowSpread,
		buttonBoxShadowOffsetX,
		buttonBoxShadowOffsetY,
		buttonHoverShadowBlur,
		buttonHoverShadowOffsetY,
		buttonHoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'good-news-section jivaka-section twork-good-news-section',
		style: {
			backgroundColor: backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			overflow: 'hidden',
			'--padding-top': `${ paddingTop }px`,
			'--padding-bottom': `${ paddingBottom }px`,
			'--padding-top-tablet': `${ paddingTopTablet }px`,
			'--padding-top-mobile': `${ paddingTopMobile }px`,
			'--padding-bottom-tablet': `${ paddingBottomTablet }px`,
			'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
	} );

	// Parse heading to find highlight text and create proper HTML structure
	// Professional implementation with case-insensitive matching and multiple occurrences support
	const parseHeadingHTML = ( text ) => {
		if ( ! text ) return '';

		// If no highlight text or highlight disabled, just escape HTML and preserve line breaks
		if ( ! highlightText || ! showHighlight ) {
			return text
				.replace( /&/g, '&amp;' )
				.replace( /</g, '&lt;' )
				.replace( />/g, '&gt;' )
				.replace( /\n/g, '<br />' );
		}

		// Trim highlight text to handle whitespace issues
		const trimmedHighlight = highlightText.trim();
		if ( ! trimmedHighlight ) {
			return text
				.replace( /&/g, '&amp;' )
				.replace( /</g, '&lt;' )
				.replace( />/g, '&gt;' )
				.replace( /\n/g, '<br />' );
		}

		// Escape HTML special characters in highlight text for regex
		const escapedHighlight = trimmedHighlight.replace(
			/[.*+?^${}()|[\]\\]/g,
			'\\$&'
		);

		// Split by lines to preserve line breaks
		const lines = text.split( '\n' );
		let html = '';

		lines.forEach( ( line, lineIndex ) => {
			if ( ! line ) {
				// Empty line, just add line break if not last
				if ( lineIndex < lines.length - 1 ) {
					html += '<br />';
				}
				return;
			}

			// Create regex for case-insensitive matching (global flag for multiple matches)
			const regex = new RegExp( escapedHighlight, 'gi' );

			// Check if line contains highlight text
			if ( regex.test( line ) ) {
				// Reset regex lastIndex
				regex.lastIndex = 0;

				// Find all matches with original case
				const matches = [];
				let match;
				while ( ( match = regex.exec( line ) ) !== null ) {
					matches.push( {
						text: match[ 0 ],
						index: match.index,
					} );
				}

				// Build HTML with highlights
				let highlightedLine = '';
				let lastIndex = 0;

				matches.forEach( ( m ) => {
					// Add text before match
					if ( m.index > lastIndex ) {
						const beforeText = line.substring( lastIndex, m.index );
						highlightedLine += beforeText
							.replace( /&/g, '&amp;' )
							.replace( /</g, '&lt;' )
							.replace( />/g, '&gt;' );
					}

					// Add highlighted text with responsive CSS variables
					// Escape the matched text for HTML
					const escapedMatch = m.text
						.replace( /&/g, '&amp;' )
						.replace( /</g, '&lt;' )
						.replace( />/g, '&gt;' );
					highlightedLine += `<span class="highlight-red" style="font-weight: ${ highlightFontWeight }; color: ${ highlightColor }; font-size: ${ highlightFontSize }em; display: block; line-height: 1; --highlight-font-weight-tablet: ${ highlightFontWeightTablet }; --highlight-font-weight-mobile: ${ highlightFontWeightMobile }; --highlight-font-size-tablet: ${ highlightFontSizeTablet }em; --highlight-font-size-mobile: ${ highlightFontSizeMobile }em; --highlight-color-tablet: ${
						highlightColorTablet || highlightColor
					}; --highlight-color-mobile: ${
						highlightColorMobile || highlightColor
					};">${ escapedMatch }</span>`;

					lastIndex = m.index + m.text.length;
				} );

				// Add remaining text after last match
				if ( lastIndex < line.length ) {
					const afterText = line.substring( lastIndex );
					highlightedLine += afterText
						.replace( /&/g, '&amp;' )
						.replace( /</g, '&lt;' )
						.replace( />/g, '&gt;' );
				}

				html += highlightedLine;
			} else {
				// No highlight in this line, just escape HTML
				html += line
					.replace( /&/g, '&amp;' )
					.replace( /</g, '&lt;' )
					.replace( />/g, '&gt;' );
			}

			// Add line break if not last line
			if ( lineIndex < lines.length - 1 ) {
				html += '<br />';
			}
		} );

		return html;
	};

	const gridStyle = {
		display: 'flex',
		alignItems: 'stretch',
		minHeight: `${ imageMinHeight }px`,
		flexDirection:
			layoutDirection === 'content-right' ? 'row-reverse' : 'row',
		flexWrap: 'nowrap',
		width: '100%',
		'--content-width': `${ contentWidth }%`,
		'--image-width': `${ imageWidth }%`,
		'--content-width-tablet': `${ contentWidthTablet }%`,
		'--image-width-tablet': `${ imageWidthTablet }%`,
		'--content-width-mobile': `${ contentWidthMobile }%`,
		'--image-width-mobile': `${ imageWidthMobile }%`,
		'--grid-flex-direction-desktop':
			layoutDirection === 'content-right' ? 'row-reverse' : 'row',
		'--grid-flex-direction-tablet': 'column-reverse',
		'--grid-flex-direction-mobile': 'column',
	};

	const contentWrapperStyle = {
		flexBasis: `${ contentWidth }%`,
		backgroundColor: contentBackgroundColor,
		display: 'flex',
		alignItems: 'center',
		justifyContent:
			contentAlignment === 'center'
				? 'center'
				: contentAlignment === 'right'
				? 'flex-end'
				: 'flex-start',
		position: 'relative',
		zIndex: 10,
		padding: `${ contentPadding }px 0`,
		width: '100%',
		minHeight: `${ imageMinHeight }px`,
		visibility: 'visible',
		opacity: 1,
		overflow: 'visible',
		'--content-width': `${ contentWidth }%`,
		'--content-width-tablet': `${ contentWidthTablet }%`,
		'--content-width-mobile': `${ contentWidthMobile }%`,
		'--content-padding-tablet': `${ contentPaddingTablet }px`,
		'--content-padding-mobile': `${ contentPaddingMobile }px`,
		'--content-alignment': contentAlignment,
		'--content-alignment-tablet': contentAlignmentTablet,
		'--content-alignment-mobile': contentAlignmentMobile,
	};

	const contentStyle = {
		maxWidth: `${ contentMaxWidth }px`,
		width: '100%',
		marginRight:
			contentAlignment === 'left' ? `${ contentMarginRight }%` : '0',
		marginLeft:
			contentAlignment === 'right' ? `${ contentMarginRight }%` : '0',
		textAlign: contentAlignment,
		position: 'relative',
		zIndex: 11,
		padding: '0 20px',
		boxSizing: 'border-box',
		visibility: 'visible',
		opacity: 1,
		display: 'block',
		'--content-margin-right-tablet': `${ contentMarginRightTablet }%`,
		'--content-margin-right-mobile': `${ contentMarginRightMobile }%`,
	};

	// Calculate background size based on selection
	const getBackgroundSize = ( size, customSize ) => {
		if ( size === 'custom' && customSize ) {
			return customSize;
		}
		return size;
	};

	// Helper function to get responsive background image
	const getResponsiveBackgroundImage = ( device ) => {
		if ( ! useResponsiveImages ) {
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		if ( device === 'tablet' ) {
			if ( backgroundImageTablet ) {
				return `url(${ backgroundImageTablet })`;
			}
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		if ( device === 'mobile' ) {
			if ( backgroundImageMobile ) {
				return `url(${ backgroundImageMobile })`;
			}
			if ( backgroundImageTablet ) {
				return `url(${ backgroundImageTablet })`;
			}
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		return backgroundImage ? `url(${ backgroundImage })` : 'none';
	};

	// Get the current background image for frontend
	const getCurrentBackgroundImage = () => {
		// Frontend will use CSS variables for responsive switching
		// This is a fallback for browsers that don't support CSS variables
		return backgroundImage ? `url(${ backgroundImage })` : 'none';
	};

	const imageBgStyle = {
		flexBasis: `${ imageWidth }%`,
		backgroundImage: getCurrentBackgroundImage(),
		backgroundSize: getBackgroundSize(
			backgroundImageSize,
			backgroundImageCustomSize
		),
		backgroundPosition: backgroundImagePosition,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'scroll',
		minHeight: `${ imageMinHeight }px`,
		height: `${ imageMinHeight }px`,
		position: 'relative',
		width: '100%',
		zIndex: 1,
		overflow: imageOverflow || 'hidden',
		maxWidth: imageMaxWidth > 0 ? `${ imageMaxWidth }px` : 'none',
		maxHeight: imageMaxHeight > 0 ? `${ imageMaxHeight }px` : 'none',
		aspectRatio: imageAspectRatio || 'auto',
		'--image-width': `${ imageWidth }%`,
		'--image-width-tablet': `${ imageWidthTablet }%`,
		'--image-width-mobile': `${ imageWidthMobile }%`,
		'--image-min-height-tablet': `${ imageMinHeightTablet }px`,
		'--image-min-height-mobile': `${ imageMinHeightMobile }px`,
		'--image-max-width':
			imageMaxWidth > 0 ? `${ imageMaxWidth }px` : 'none',
		'--image-max-width-tablet':
			imageMaxWidthTablet > 0 ? `${ imageMaxWidthTablet }px` : 'none',
		'--image-max-width-mobile':
			imageMaxWidthMobile > 0 ? `${ imageMaxWidthMobile }px` : 'none',
		'--image-max-height':
			imageMaxHeight > 0 ? `${ imageMaxHeight }px` : 'none',
		'--image-max-height-tablet':
			imageMaxHeightTablet > 0 ? `${ imageMaxHeightTablet }px` : 'none',
		'--image-max-height-mobile':
			imageMaxHeightMobile > 0 ? `${ imageMaxHeightMobile }px` : 'none',
		'--image-aspect-ratio': imageAspectRatio || 'auto',
		'--image-overflow': imageOverflow || 'hidden',
		'--background-image': backgroundImage
			? `url(${ backgroundImage })`
			: 'none',
		'--background-image-tablet': getResponsiveBackgroundImage( 'tablet' ),
		'--background-image-mobile': getResponsiveBackgroundImage( 'mobile' ),
		'--background-size': getBackgroundSize(
			backgroundImageSize,
			backgroundImageCustomSize
		),
		'--background-size-tablet':
			getBackgroundSize(
				backgroundImageSizeTablet,
				backgroundImageCustomSizeTablet
			) ||
			getBackgroundSize( backgroundImageSize, backgroundImageCustomSize ),
		'--background-size-mobile':
			getBackgroundSize(
				backgroundImageSizeMobile,
				backgroundImageCustomSizeMobile
			) ||
			getBackgroundSize(
				backgroundImageSizeTablet,
				backgroundImageCustomSizeTablet
			) ||
			getBackgroundSize( backgroundImageSize, backgroundImageCustomSize ),
		'--background-position': backgroundImagePosition,
		'--background-position-tablet':
			backgroundImagePositionTablet || backgroundImagePosition,
		'--background-position-mobile':
			backgroundImagePositionMobile ||
			backgroundImagePositionTablet ||
			backgroundImagePosition,
		// Margin CSS custom properties
		'--image-margin-top': `${ imageMarginTop }px`,
		'--image-margin-top-tablet': `${ imageMarginTopTablet }px`,
		'--image-margin-top-mobile': `${ imageMarginTopMobile }px`,
		'--image-margin-right': `${ imageMarginRight }px`,
		'--image-margin-right-tablet': `${ imageMarginRightTablet }px`,
		'--image-margin-right-mobile': `${ imageMarginRightMobile }px`,
		'--image-margin-bottom': `${ imageMarginBottom }px`,
		'--image-margin-bottom-tablet': `${ imageMarginBottomTablet }px`,
		'--image-margin-bottom-mobile': `${ imageMarginBottomMobile }px`,
		'--image-margin-left': `${ imageMarginLeft }px`,
		'--image-margin-left-tablet': `${ imageMarginLeftTablet }px`,
		'--image-margin-left-mobile': `${ imageMarginLeftMobile }px`,
		// Padding CSS custom properties
		'--image-padding-top': `${ imagePaddingTop }px`,
		'--image-padding-top-tablet': `${ imagePaddingTopTablet }px`,
		'--image-padding-top-mobile': `${ imagePaddingTopMobile }px`,
		'--image-padding-right': `${ imagePaddingRight }px`,
		'--image-padding-right-tablet': `${ imagePaddingRightTablet }px`,
		'--image-padding-right-mobile': `${ imagePaddingRightMobile }px`,
		'--image-padding-bottom': `${ imagePaddingBottom }px`,
		'--image-padding-bottom-tablet': `${ imagePaddingBottomTablet }px`,
		'--image-padding-bottom-mobile': `${ imagePaddingBottomMobile }px`,
		'--image-padding-left': `${ imagePaddingLeft }px`,
		'--image-padding-left-tablet': `${ imagePaddingLeftTablet }px`,
		'--image-padding-left-mobile': `${ imagePaddingLeftMobile }px`,
		// Apply margin and padding directly
		marginTop: `${ imageMarginTop }px`,
		marginRight: `${ imageMarginRight }px`,
		marginBottom: `${ imageMarginBottom }px`,
		marginLeft: `${ imageMarginLeft }px`,
		paddingTop: `${ imagePaddingTop }px`,
		paddingRight: `${ imagePaddingRight }px`,
		paddingBottom: `${ imagePaddingBottom }px`,
		paddingLeft: `${ imagePaddingLeft }px`,
	};

	// Calculate form-group margin based on alignment
	const getFormGroupMargin = ( alignment ) => {
		const align = alignment || contentAlignment || 'left';
		if ( align === 'center' ) {
			return { marginLeft: 'auto', marginRight: 'auto' };
		} else if ( align === 'right' ) {
			return { marginLeft: 'auto', marginRight: '0' };
		} else {
			return { marginLeft: '0', marginRight: 'auto' };
		}
	};

	const formGroupMargin = getFormGroupMargin( formAlignment );
	const formGroupMarginTablet = getFormGroupMargin(
		formAlignmentTablet ||
			formAlignment ||
			contentAlignmentTablet ||
			contentAlignment
	);
	const formGroupMarginMobile = getFormGroupMargin(
		formAlignmentMobile ||
			formAlignment ||
			contentAlignmentMobile ||
			contentAlignment
	);

	const formGroupStyle = {
		display: 'flex',
		borderRadius: `${ formBorderRadius }px`,
		overflow: 'hidden',
		maxWidth: `${ formMaxWidth }px`,
		width: '100%',
		boxShadow: formBoxShadow
			? `${ formBoxShadowOffsetX }px ${ formBoxShadowOffsetY }px ${ formBoxShadowBlur }px ${ formBoxShadowSpread }px ${ formBoxShadowColor }`
			: 'none',
		transition: 'box-shadow 0.3s ease',
		backgroundColor: '#ffffff',
		...formGroupMargin,
		'--form-focus-shadow': formBoxShadow
			? `0 0 ${ formFocusShadowBlur }px ${ formFocusShadowColor }`
			: 'none',
		'--form-max-width-tablet': `${ formMaxWidthTablet }px`,
		'--form-max-width-mobile': `${ formMaxWidthMobile }px`,
		'--form-border-radius-tablet': `${ formBorderRadiusTablet }px`,
		'--form-border-radius-mobile': `${ formBorderRadiusMobile }px`,
		'--form-group-margin-left': formGroupMarginTablet.marginLeft,
		'--form-group-margin-right': formGroupMarginTablet.marginRight,
		'--form-group-margin-left-mobile': formGroupMarginMobile.marginLeft,
		'--form-group-margin-right-mobile': formGroupMarginMobile.marginRight,
	};

	const emailInputStyle = {
		flexGrow: 1,
		border: `2px solid ${ emailBorderColor }`,
		padding: `${ emailPaddingVertical }px ${ emailPaddingHorizontal }px`,
		fontSize: `${ emailFontSize }rem`,
		backgroundColor: emailBgColor,
		color: emailTextColor,
		borderRadius: `${ formBorderRadius }px 0 0 ${ formBorderRadius }px`,
		fontFamily: 'inherit',
		minWidth: 0,
		boxSizing: 'border-box',
		width: '100%',
		'--email-font-size-tablet': `${ emailFontSizeTablet }rem`,
		'--email-font-size-mobile': `${ emailFontSizeMobile }rem`,
		'--email-padding-vertical-tablet': `${ emailPaddingVerticalTablet }px`,
		'--email-padding-vertical-mobile': `${ emailPaddingVerticalMobile }px`,
		'--email-padding-horizontal-tablet': `${ emailPaddingHorizontalTablet }px`,
		'--email-padding-horizontal-mobile': `${ emailPaddingHorizontalMobile }px`,
		'--email-bg-color': emailBgColor,
		'--email-bg-color-tablet': emailBgColorTablet || emailBgColor,
		'--email-bg-color-mobile': emailBgColorMobile || emailBgColor,
		'--email-text-color': emailTextColor,
		'--email-text-color-tablet': emailTextColorTablet || emailTextColor,
		'--email-text-color-mobile': emailTextColorMobile || emailTextColor,
		'--email-placeholder-color': emailPlaceholderColor,
		'--email-placeholder-color-tablet':
			emailPlaceholderColorTablet || emailPlaceholderColor,
		'--email-placeholder-color-mobile':
			emailPlaceholderColorMobile || emailPlaceholderColor,
		'--email-border-color': emailBorderColor,
		'--email-border-color-tablet':
			emailBorderColorTablet || emailBorderColor,
		'--email-border-color-mobile':
			emailBorderColorMobile || emailBorderColor,
		'--email-focus-bg': emailFocusBgColor,
		'--email-focus-bg-tablet': emailFocusBgColorTablet || emailFocusBgColor,
		'--email-focus-bg-mobile': emailFocusBgColorMobile || emailFocusBgColor,
		'--email-focus-border': emailFocusBorderColor,
		'--email-focus-border-tablet':
			emailFocusBorderColorTablet || emailFocusBorderColor,
		'--email-focus-border-mobile':
			emailFocusBorderColorMobile || emailFocusBorderColor,
	};

	const buttonStyle = {
		border: 'none',
		backgroundColor: buttonBgColor,
		color: buttonTextColor,
		padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
		fontWeight: buttonFontWeight,
		fontSize: `${ buttonFontSize }rem`,
		cursor: 'pointer',
		whiteSpace: 'nowrap',
		borderRadius: `0 ${ formBorderRadius }px ${ formBorderRadius }px 0`,
		textTransform: buttonTextTransform,
		letterSpacing: `${ buttonLetterSpacing }px`,
		flexShrink: 0,
		boxShadow: buttonBoxShadow
			? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
			: 'none',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		'--button-font-size-tablet': `${ buttonFontSizeTablet }rem`,
		'--button-font-size-mobile': `${ buttonFontSizeMobile }rem`,
		'--button-padding-vertical-tablet': `${ buttonPaddingVerticalTablet }px`,
		'--button-padding-vertical-mobile': `${ buttonPaddingVerticalMobile }px`,
		'--button-padding-horizontal-tablet': `${ buttonPaddingHorizontalTablet }px`,
		'--button-padding-horizontal-mobile': `${ buttonPaddingHorizontalMobile }px`,
		'--button-bg-color': buttonBgColor,
		'--button-bg-color-tablet': buttonBgColorTablet || buttonBgColor,
		'--button-bg-color-mobile': buttonBgColorMobile || buttonBgColor,
		'--button-text-color': buttonTextColor,
		'--button-text-color-tablet': buttonTextColorTablet || buttonTextColor,
		'--button-text-color-mobile': buttonTextColorMobile || buttonTextColor,
		'--button-font-weight-tablet': buttonFontWeightTablet,
		'--button-font-weight-mobile': buttonFontWeightMobile,
		'--button-text-transform-tablet':
			buttonTextTransformTablet || buttonTextTransform,
		'--button-text-transform-mobile':
			buttonTextTransformMobile || buttonTextTransform,
		'--button-letter-spacing-tablet': `${ buttonLetterSpacingTablet }px`,
		'--button-letter-spacing-mobile': `${ buttonLetterSpacingMobile }px`,
		'--button-hover-bg': buttonHoverBgColor,
		'--button-hover-bg-tablet':
			buttonHoverBgColorTablet || buttonHoverBgColor,
		'--button-hover-bg-mobile':
			buttonHoverBgColorMobile || buttonHoverBgColor,
		'--button-hover-shadow-blur': `${ buttonHoverShadowBlur }px`,
		'--button-hover-shadow-offset-y': `${ buttonHoverShadowOffsetY }px`,
		'--button-hover-translate-y': `${ buttonHoverTranslateY }px`,
	};

	return (
		<section { ...blockProps }>
			{ backgroundImage && showBackgroundOverlay && (
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
						pointerEvents: 'none',
					} }
				/>
			) }
			<div className="good-news-grid" style={ gridStyle }>
				<div
					className="good-news-content-wrapper"
					style={ contentWrapperStyle }
					data-animation-type={
						animationOnScroll ? animationType : undefined
					}
					data-animation-delay={
						animationOnScroll ? animationDelay : undefined
					}
				>
					<div className="good-news-content" style={ contentStyle }>
						{ showMetaTitle && (
							<p
								className="meta-title"
								style={ {
									'--meta-font-size': `${
										metaTitleFontSize ?? 0.8
									}rem`,
									'--meta-font-weight':
										metaTitleFontWeight ?? 700,
									'--meta-color': metaTitleColor || '#212121',
									'--meta-text-transform':
										metaTitleTextTransform || 'uppercase',
									'--meta-letter-spacing': `${
										metaTitleLetterSpacing ?? 1.5
									}px`,
									'--meta-margin-top': `${
										metaTitleMarginTop ?? 0
									}px`,
									'--meta-margin-right': `${
										metaTitleMarginRight ?? 0
									}px`,
									'--meta-margin-bottom': `${
										metaTitleMarginBottom ?? 15
									}px`,
									'--meta-margin-left': `${
										metaTitleMarginLeft ?? 0
									}px`,
									'--meta-padding-top': `${
										metaTitlePaddingTop ?? 0
									}px`,
									'--meta-padding-right': `${
										metaTitlePaddingRight ?? 0
									}px`,
									'--meta-padding-bottom': `${
										metaTitlePaddingBottom ?? 0
									}px`,
									'--meta-padding-left': `${
										metaTitlePaddingLeft ?? 0
									}px`,
									'--meta-font-size-tablet': `${
										metaTitleFontSizeTablet ??
										metaTitleFontSize ??
										0.75
									}rem`,
									'--meta-font-size-mobile': `${
										metaTitleFontSizeMobile ??
										metaTitleFontSizeTablet ??
										metaTitleFontSize ??
										0.7
									}rem`,
									'--meta-font-weight-tablet':
										metaTitleFontWeightTablet ??
										metaTitleFontWeight ??
										700,
									'--meta-font-weight-mobile':
										metaTitleFontWeightMobile ??
										metaTitleFontWeightTablet ??
										metaTitleFontWeight ??
										700,
									'--meta-color-tablet':
										metaTitleColorTablet ||
										metaTitleColor ||
										'#212121',
									'--meta-color-mobile':
										metaTitleColorMobile ||
										metaTitleColorTablet ||
										metaTitleColor ||
										'#212121',
									'--meta-text-transform-tablet':
										metaTitleTextTransformTablet ||
										metaTitleTextTransform ||
										'uppercase',
									'--meta-text-transform-mobile':
										metaTitleTextTransformMobile ||
										metaTitleTextTransformTablet ||
										metaTitleTextTransform ||
										'uppercase',
									'--meta-letter-spacing-tablet': `${
										metaTitleLetterSpacingTablet ??
										metaTitleLetterSpacing ??
										1.5
									}px`,
									'--meta-letter-spacing-mobile': `${
										metaTitleLetterSpacingMobile ??
										metaTitleLetterSpacingTablet ??
										metaTitleLetterSpacing ??
										1.5
									}px`,
									'--meta-margin-top-tablet': `${
										metaTitleMarginTopTablet ??
										metaTitleMarginTop ??
										0
									}px`,
									'--meta-margin-right-tablet': `${
										metaTitleMarginRightTablet ??
										metaTitleMarginRight ??
										0
									}px`,
									'--meta-margin-bottom-tablet': `${
										metaTitleMarginBottomTablet ??
										metaTitleMarginBottom ??
										15
									}px`,
									'--meta-margin-left-tablet': `${
										metaTitleMarginLeftTablet ??
										metaTitleMarginLeft ??
										0
									}px`,
									'--meta-margin-top-mobile': `${
										metaTitleMarginTopMobile ??
										metaTitleMarginTopTablet ??
										metaTitleMarginTop ??
										0
									}px`,
									'--meta-margin-right-mobile': `${
										metaTitleMarginRightMobile ??
										metaTitleMarginRightTablet ??
										metaTitleMarginRight ??
										0
									}px`,
									'--meta-margin-bottom-mobile': `${
										metaTitleMarginBottomMobile ??
										metaTitleMarginBottomTablet ??
										metaTitleMarginBottom ??
										15
									}px`,
									'--meta-margin-left-mobile': `${
										metaTitleMarginLeftMobile ??
										metaTitleMarginLeftTablet ??
										metaTitleMarginLeft ??
										0
									}px`,
									'--meta-padding-top-tablet': `${
										metaTitlePaddingTopTablet ??
										metaTitlePaddingTop ??
										0
									}px`,
									'--meta-padding-right-tablet': `${
										metaTitlePaddingRightTablet ??
										metaTitlePaddingRight ??
										0
									}px`,
									'--meta-padding-bottom-tablet': `${
										metaTitlePaddingBottomTablet ??
										metaTitlePaddingBottom ??
										0
									}px`,
									'--meta-padding-left-tablet': `${
										metaTitlePaddingLeftTablet ??
										metaTitlePaddingLeft ??
										0
									}px`,
									'--meta-padding-top-mobile': `${
										metaTitlePaddingTopMobile ??
										metaTitlePaddingTopTablet ??
										metaTitlePaddingTop ??
										0
									}px`,
									'--meta-padding-right-mobile': `${
										metaTitlePaddingRightMobile ??
										metaTitlePaddingRightTablet ??
										metaTitlePaddingRight ??
										0
									}px`,
									'--meta-padding-bottom-mobile': `${
										metaTitlePaddingBottomMobile ??
										metaTitlePaddingBottomTablet ??
										metaTitlePaddingBottom ??
										0
									}px`,
									'--meta-padding-left-mobile': `${
										metaTitlePaddingLeftMobile ??
										metaTitlePaddingLeftTablet ??
										metaTitlePaddingLeft ??
										0
									}px`,
									'--meta-alignment':
										metaTitleAlignment || contentAlignment,
									'--meta-alignment-tablet':
										metaTitleAlignmentTablet ||
										metaTitleAlignment ||
										contentAlignmentTablet ||
										contentAlignment,
									'--meta-alignment-mobile':
										metaTitleAlignmentMobile ||
										metaTitleAlignment ||
										contentAlignmentMobile ||
										contentAlignment,
								} }
							>
								{ metaTitle }
							</p>
						) }

						{ showHeading && (
							<h2
								className="good-news-heading"
								style={ {
									'--heading-font-size': `${ headingFontSize }rem`,
									'--heading-font-weight': headingFontWeight,
									'--heading-color': headingColor,
									'--heading-line-height': headingLineHeight,
									'--heading-letter-spacing': `${ headingLetterSpacing }em`,
									'--heading-margin-top': `${ headingMarginTop }px`,
									'--heading-margin-right': `${ headingMarginRight }px`,
									'--heading-margin-bottom': `${ headingMarginBottom }px`,
									'--heading-margin-left': `${ headingMarginLeft }px`,
									'--heading-padding-top': `${ headingPaddingTop }px`,
									'--heading-padding-right': `${ headingPaddingRight }px`,
									'--heading-padding-bottom': `${ headingPaddingBottom }px`,
									'--heading-padding-left': `${ headingPaddingLeft }px`,
									'--heading-font-size-tablet': `${ headingFontSizeTablet }rem`,
									'--heading-font-size-mobile': `${ headingFontSizeMobile }rem`,
									'--heading-font-weight-tablet':
										headingFontWeightTablet,
									'--heading-font-weight-mobile':
										headingFontWeightMobile,
									'--heading-color-tablet':
										headingColorTablet || headingColor,
									'--heading-color-mobile':
										headingColorMobile || headingColor,
									'--heading-line-height-tablet':
										headingLineHeightTablet,
									'--heading-line-height-mobile':
										headingLineHeightMobile,
									'--heading-letter-spacing-tablet': `${ headingLetterSpacingTablet }em`,
									'--heading-letter-spacing-mobile': `${ headingLetterSpacingMobile }em`,
									'--heading-margin-top-tablet': `${ headingMarginTopTablet }px`,
									'--heading-margin-right-tablet': `${ headingMarginRightTablet }px`,
									'--heading-margin-bottom-tablet': `${ headingMarginBottomTablet }px`,
									'--heading-margin-left-tablet': `${ headingMarginLeftTablet }px`,
									'--heading-margin-top-mobile': `${ headingMarginTopMobile }px`,
									'--heading-margin-right-mobile': `${ headingMarginRightMobile }px`,
									'--heading-margin-bottom-mobile': `${ headingMarginBottomMobile }px`,
									'--heading-margin-left-mobile': `${ headingMarginLeftMobile }px`,
									'--heading-padding-top-tablet': `${ headingPaddingTopTablet }px`,
									'--heading-padding-right-tablet': `${ headingPaddingRightTablet }px`,
									'--heading-padding-bottom-tablet': `${ headingPaddingBottomTablet }px`,
									'--heading-padding-left-tablet': `${ headingPaddingLeftTablet }px`,
									'--heading-padding-top-mobile': `${ headingPaddingTopMobile }px`,
									'--heading-padding-right-mobile': `${ headingPaddingRightMobile }px`,
									'--heading-padding-bottom-mobile': `${ headingPaddingBottomMobile }px`,
									'--heading-padding-left-mobile': `${ headingPaddingLeftMobile }px`,
									'--heading-alignment':
										headingAlignment || contentAlignment,
									'--heading-alignment-tablet':
										headingAlignmentTablet ||
										headingAlignment ||
										contentAlignmentTablet ||
										contentAlignment,
									'--heading-alignment-mobile':
										headingAlignmentMobile ||
										headingAlignment ||
										contentAlignmentMobile ||
										contentAlignment,
									'--highlight-color': highlightColor,
									'--highlight-color-tablet':
										highlightColorTablet || highlightColor,
									'--highlight-color-mobile':
										highlightColorMobile || highlightColor,
									'--highlight-font-weight':
										highlightFontWeight,
									'--highlight-font-weight-tablet':
										highlightFontWeightTablet,
									'--highlight-font-weight-mobile':
										highlightFontWeightMobile,
									'--highlight-font-size': `${ highlightFontSize }em`,
									'--highlight-font-size-tablet': `${ highlightFontSizeTablet }em`,
									'--highlight-font-size-mobile': `${ highlightFontSizeMobile }em`,
								} }
								dangerouslySetInnerHTML={ {
									__html: parseHeadingHTML( heading ),
								} }
							/>
						) }

						{ showDescription && (
							<p
								className="good-news-description"
								style={ {
									'--description-font-size': `${ descriptionFontSize }rem`,
									'--description-line-height':
										descriptionLineHeight,
									'--description-color': descriptionColor,
									'--description-margin-top': `${ descriptionMarginTop }px`,
									'--description-margin-right': `${ descriptionMarginRight }px`,
									'--description-margin-bottom': `${ descriptionMarginBottom }px`,
									'--description-margin-left': `${ descriptionMarginLeft }px`,
									'--description-padding-top': `${ descriptionPaddingTop }px`,
									'--description-padding-right': `${ descriptionPaddingRight }px`,
									'--description-padding-bottom': `${ descriptionPaddingBottom }px`,
									'--description-padding-left': `${ descriptionPaddingLeft }px`,
									'--description-margin-right': `${ descriptionMarginRight }px`,
									'--description-margin-bottom': `${ descriptionMarginBottom }px`,
									'--description-margin-left': `${ descriptionMarginLeft }px`,
									'--description-padding-top': `${ descriptionPaddingTop }px`,
									'--description-padding-right': `${ descriptionPaddingRight }px`,
									'--description-padding-bottom': `${ descriptionPaddingBottom }px`,
									'--description-padding-left': `${ descriptionPaddingLeft }px`,
									'--description-font-size-tablet': `${ descriptionFontSizeTablet }rem`,
									'--description-font-size-mobile': `${ descriptionFontSizeMobile }rem`,
									'--description-color-tablet':
										descriptionColorTablet ||
										descriptionColor,
									'--description-color-mobile':
										descriptionColorMobile ||
										descriptionColor,
									'--description-line-height-tablet':
										descriptionLineHeightTablet,
									'--description-line-height-mobile':
										descriptionLineHeightMobile,
									'--description-margin-top-tablet': `${ descriptionMarginTopTablet }px`,
									'--description-margin-right-tablet': `${ descriptionMarginRightTablet }px`,
									'--description-margin-bottom-tablet': `${ descriptionMarginBottomTablet }px`,
									'--description-margin-left-tablet': `${ descriptionMarginLeftTablet }px`,
									'--description-margin-top-mobile': `${ descriptionMarginTopMobile }px`,
									'--description-margin-right-mobile': `${ descriptionMarginRightMobile }px`,
									'--description-margin-bottom-mobile': `${ descriptionMarginBottomMobile }px`,
									'--description-margin-left-mobile': `${ descriptionMarginLeftMobile }px`,
									'--description-padding-top-tablet': `${ descriptionPaddingTopTablet }px`,
									'--description-padding-right-tablet': `${ descriptionPaddingRightTablet }px`,
									'--description-padding-bottom-tablet': `${ descriptionPaddingBottomTablet }px`,
									'--description-padding-left-tablet': `${ descriptionPaddingLeftTablet }px`,
									'--description-padding-top-mobile': `${ descriptionPaddingTopMobile }px`,
									'--description-padding-right-mobile': `${ descriptionPaddingRightMobile }px`,
									'--description-padding-bottom-mobile': `${ descriptionPaddingBottomMobile }px`,
									'--description-padding-left-mobile': `${ descriptionPaddingLeftMobile }px`,
									'--description-alignment':
										descriptionAlignment ||
										contentAlignment,
									'--description-alignment-tablet':
										descriptionAlignmentTablet ||
										descriptionAlignment ||
										contentAlignmentTablet ||
										contentAlignment,
									'--description-alignment-mobile':
										descriptionAlignmentMobile ||
										descriptionAlignment ||
										contentAlignmentMobile ||
										contentAlignment,
								} }
							>
								<RichText.Content value={ description } />
							</p>
						) }

						{ showNewsletterForm && (
							<form
								className="newsletter-form"
								style={ {
									marginTop: `${ formMarginTop }px`,
									marginRight: `${ formMarginRight }px`,
									marginBottom: `${ formMarginBottom }px`,
									marginLeft: `${ formMarginLeft }px`,
									paddingTop: `${ formPaddingTop }px`,
									paddingRight: `${ formPaddingRight }px`,
									paddingBottom: `${ formPaddingBottom }px`,
									paddingLeft: `${ formPaddingLeft }px`,
									width: '100%',
									textAlign:
										formAlignment || contentAlignment,
									'--form-margin-top': `${ formMarginTop }px`,
									'--form-margin-right': `${ formMarginRight }px`,
									'--form-margin-bottom': `${ formMarginBottom }px`,
									'--form-margin-left': `${ formMarginLeft }px`,
									'--form-padding-top': `${ formPaddingTop }px`,
									'--form-padding-right': `${ formPaddingRight }px`,
									'--form-padding-bottom': `${ formPaddingBottom }px`,
									'--form-padding-left': `${ formPaddingLeft }px`,
									'--form-margin-top-tablet': `${ formMarginTopTablet }px`,
									'--form-margin-right-tablet': `${ formMarginRightTablet }px`,
									'--form-margin-bottom-tablet': `${ formMarginBottomTablet }px`,
									'--form-margin-left-tablet': `${ formMarginLeftTablet }px`,
									'--form-margin-top-mobile': `${ formMarginTopMobile }px`,
									'--form-margin-right-mobile': `${ formMarginRightMobile }px`,
									'--form-margin-bottom-mobile': `${ formMarginBottomMobile }px`,
									'--form-margin-left-mobile': `${ formMarginLeftMobile }px`,
									'--form-padding-top-tablet': `${ formPaddingTopTablet }px`,
									'--form-padding-right-tablet': `${ formPaddingRightTablet }px`,
									'--form-padding-bottom-tablet': `${ formPaddingBottomTablet }px`,
									'--form-padding-left-tablet': `${ formPaddingLeftTablet }px`,
									'--form-padding-top-mobile': `${ formPaddingTopMobile }px`,
									'--form-padding-right-mobile': `${ formPaddingRightMobile }px`,
									'--form-padding-bottom-mobile': `${ formPaddingBottomMobile }px`,
									'--form-padding-left-mobile': `${ formPaddingLeftMobile }px`,
									'--form-alignment':
										formAlignment || contentAlignment,
									'--form-alignment-tablet':
										formAlignmentTablet ||
										formAlignment ||
										contentAlignmentTablet ||
										contentAlignment,
									'--form-alignment-mobile':
										formAlignmentMobile ||
										formAlignment ||
										contentAlignmentMobile ||
										contentAlignment,
								} }
							>
								<div
									className="form-group"
									style={ formGroupStyle }
								>
									<label
										htmlFor="newsletter-email"
										className="visually-hidden"
									>
										{ __(
											'Email Address',
											'twork-builder'
										) }
									</label>
									<input
										id="newsletter-email"
										type="email"
										name="email"
										placeholder={ emailPlaceholder }
										required
										style={ emailInputStyle }
									/>
									<button type="submit" style={ buttonStyle }>
										{ buttonText }
									</button>
								</div>
							</form>
						) }
					</div>
				</div>

				<div
					className="good-news-image-bg"
					style={ imageBgStyle }
					data-animation-type={
						animationOnScroll ? animationType : undefined
					}
					data-animation-delay={
						animationOnScroll ? animationDelay : undefined
					}
				>
					{ showBackgroundOverlay && backgroundImage && (
						<div
							className="image-overlay"
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: backgroundOverlayColor,
								opacity: backgroundOverlayOpacity,
								pointerEvents: 'none',
								zIndex: 1,
							} }
						/>
					) }
				</div>
			</div>
		</section>
	);
}
