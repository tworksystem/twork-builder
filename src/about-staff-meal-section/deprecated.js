/**
 * Pre–slider/slideshow save: section wrapper without autoplay data attrs.
 * Existing posts validate against this, then migrate to current save.
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function save( { attributes } ) {
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

export default [
	{
		attributes: {
			showSection: { type: 'boolean', default: true },
			sectionId: { type: 'string', default: 'staff-meal' },
			backgroundColor: { type: 'string', default: '#ffffff' },
			paddingTop: { type: 'number', default: 80 },
			paddingBottom: { type: 'number', default: 80 },
			paddingTopMobile: { type: 'number', default: 48 },
			paddingBottomMobile: { type: 'number', default: 48 },
			containerMaxWidth: { type: 'number', default: 1100 },
			containerPadding: { type: 'number', default: 24 },
			accentColor: { type: 'string', default: '#e85d04' },
			showEyebrow: { type: 'boolean', default: false },
			eyebrowText: { type: 'string', default: 'Staff benefits' },
			showTitle: { type: 'boolean', default: true },
			title: {
				type: 'string',
				default: 'MEAL TREAT FOR DUTY TIME',
			},
			headingLevel: { type: 'number', default: 2 },
			showTitleUnderline: { type: 'boolean', default: true },
			titleColor: { type: 'string', default: '#e85d04' },
			titleFontSize: { type: 'number', default: 28 },
			showGallery: { type: 'boolean', default: true },
			galleryLayout: { type: 'string', default: 'featured-trio' },
			galleryColumns: { type: 'number', default: 2 },
			galleryGap: { type: 'number', default: 12 },
			showCaptions: { type: 'boolean', default: false },
			showFeedback: { type: 'boolean', default: true },
			feedbackColumns: { type: 'number', default: 3 },
			feedbackGap: { type: 'number', default: 24 },
			showAuthor: { type: 'boolean', default: true },
			allowEmoji: { type: 'boolean', default: true },
			showQuote: { type: 'boolean', default: true },
			quoteText: { type: 'string', default: '' },
			showQuoteMarks: { type: 'boolean', default: true },
			quoteMarkColor: { type: 'string', default: '#e85d04' },
			quoteTextColor: { type: 'string', default: '#e85d04' },
			quoteFontSize: { type: 'number', default: 22 },
			quoteMaxWidth: { type: 'number', default: 900 },
			showFooter: { type: 'boolean', default: false },
			footerText: { type: 'string', default: '2nd AGM (2025-2026)' },
			showFooterLines: { type: 'boolean', default: true },
			footerLineColor: { type: 'string', default: '#e85d04' },
			animationOnScroll: { type: 'boolean', default: true },
			animationType: { type: 'string', default: 'fade-up' },
			animationDelay: { type: 'number', default: 0 },
			respectReducedMotion: { type: 'boolean', default: true },
		},
		save,
		migrate( attributes ) {
			return {
				...attributes,
				galleryAutoplay:
					attributes.galleryAutoplay !== undefined
						? attributes.galleryAutoplay
						: true,
				galleryAutoplayMs:
					attributes.galleryAutoplayMs !== undefined
						? attributes.galleryAutoplayMs
						: 4500,
			};
		},
	},
];
