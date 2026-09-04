import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerPadding,
		accentColor,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		headingLevel,
		showTitleUnderline,
		titleColor,
		titleFontSize,
		showGallery,
		galleryLayout,
		galleryColumns,
		galleryGap,
		showCaptions,
		galleryAutoplay,
		galleryAutoplayMs,
		showFeedback,
		feedbackColumns,
		feedbackGap,
		showAuthor,
		showQuote,
		quoteText,
		showQuoteMarks,
		quoteMarkColor,
		quoteTextColor,
		quoteFontSize,
		quoteMaxWidth,
		showFooter,
		footerText,
		showFooterLines,
		footerLineColor,
		animationOnScroll,
		animationType,
		animationDelay,
		respectReducedMotion,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const TitleTag = 'h' + Math.min( 4, Math.max( 2, headingLevel || 2 ) );

	const blockProps = useBlockProps.save( {
		className: 'twork-about-staff-meal',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--asm-accent': accentColor,
			'--asm-container': `${ containerMaxWidth }px`,
			'--asm-gallery-gap': `${ galleryGap }px`,
			'--asm-gallery-cols': String( galleryColumns ),
			'--asm-feedback-gap': `${ feedbackGap }px`,
			'--asm-feedback-cols': String( feedbackColumns ),
			'--asm-pad-top-m': `${ paddingTopMobile }px`,
			'--asm-pad-bottom-m': `${ paddingBottomMobile }px`,
		},
		'data-gallery-layout': galleryLayout,
		'data-gallery-columns': String( galleryColumns ),
		'data-gallery-autoplay':
			galleryLayout === 'slideshow' && galleryAutoplay !== false
				? '1'
				: '0',
		'data-gallery-autoplay-ms': String( galleryAutoplayMs || 4500 ),
		'data-feedback-columns': String( feedbackColumns ),
		'data-show-gallery': showGallery !== false ? '1' : '0',
		'data-show-feedback': showFeedback !== false ? '1' : '0',
		'data-show-captions': showCaptions !== false ? '1' : '0',
		'data-show-author': showAuthor !== false ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
		'data-animation-type': animationType,
		'data-animation-delay': String( animationDelay ),
		'data-reduced-motion': respectReducedMotion ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="twork-about-staff-meal__container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				<header className="twork-about-staff-meal__header">
					{ showEyebrow && eyebrowText && (
						<p className="twork-about-staff-meal__eyebrow">
							{ eyebrowText }
						</p>
					) }
					{ showTitle !== false && title && (
						<RichText.Content
							tagName={ TitleTag }
							className={ [
								'twork-about-staff-meal__title',
								showTitleUnderline !== false
									? 'has-underline'
									: '',
							]
								.filter( Boolean )
								.join( ' ' ) }
							value={ title }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }px`,
							} }
						/>
					) }
				</header>

				<div className="twork-about-staff-meal__regions">
					<InnerBlocks.Content />
				</div>

				{ showQuote !== false && quoteText && (
					<blockquote
						className={ [
							'twork-about-staff-meal__quote',
							showQuoteMarks !== false ? 'has-quote-marks' : '',
						]
							.filter( Boolean )
							.join( ' ' ) }
						style={ {
							color: quoteTextColor,
							fontSize: `${ quoteFontSize }px`,
							maxWidth: `${ quoteMaxWidth }px`,
							'--asm-quote-mark-color': quoteMarkColor,
						} }
					>
						<RichText.Content tagName="p" value={ quoteText } />
					</blockquote>
				) }

				{ showFooter && footerText && (
					<footer
						className={ [
							'twork-about-staff-meal__footer',
							showFooterLines !== false ? 'has-lines' : '',
						]
							.filter( Boolean )
							.join( ' ' ) }
						style={ {
							'--asm-footer-line-color': footerLineColor,
						} }
					>
						<RichText.Content tagName="p" value={ footerText } />
					</footer>
				) }
			</div>
		</section>
	);
}
