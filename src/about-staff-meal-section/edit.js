import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'twork/about-staff-meal-gallery',
	'twork/about-staff-meal-feedback',
];

const TEMPLATE = [
	[ 'twork/about-staff-meal-gallery', {}, [] ],
	[ 'twork/about-staff-meal-feedback', {}, [] ],
];

const GALLERY_LAYOUT_OPTIONS = [
	{ label: __( 'Featured trio', 'twork-builder' ), value: 'featured-trio' },
	{ label: __( 'Equal grid', 'twork-builder' ), value: 'equal-grid' },
	{ label: __( 'Stacked', 'twork-builder' ), value: 'stacked' },
	{ label: __( 'Slider', 'twork-builder' ), value: 'slider' },
	{ label: __( 'Slideshow', 'twork-builder' ), value: 'slideshow' },
];

const ANIMATION_TYPE_OPTIONS = [
	{ label: __( 'Fade up', 'twork-builder' ), value: 'fade-up' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
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
		allowEmoji,
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

	const TitleTag = 'h' + Math.min( 4, Math.max( 2, headingLevel || 2 ) );

	const blockProps = useStableBlockProps(
		() => ( {
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
		} ),
		[
			sectionId,
			backgroundColor,
			paddingTop,
			paddingBottom,
			paddingTopMobile,
			paddingBottomMobile,
			accentColor,
			containerMaxWidth,
			galleryGap,
			galleryColumns,
			feedbackGap,
			feedbackColumns,
			galleryLayout,
			galleryAutoplay,
			galleryAutoplayMs,
			showGallery,
			showFeedback,
			showCaptions,
			showAuthor,
			animationOnScroll,
			animationType,
			animationDelay,
			respectReducedMotion,
		]
	);

	if ( showSection === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Section', 'twork-builder' ) }
							checked={ showSection !== false }
							onChange={ ( value ) =>
								setAttributes( { showSection: value } )
							}
						/>
						<TextControl
							label={ __( 'Section ID', 'twork-builder' ) }
							value={ sectionId }
							onChange={ ( value ) =>
								setAttributes( { sectionId: value } )
							}
						/>
						<PanelColorSettings
							title={ __( 'Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( value ) =>
										setAttributes( {
											backgroundColor: value,
										} ),
									label: __(
										'Background color',
										'twork-builder'
									),
								},
								{
									value: accentColor,
									onChange: ( value ) =>
										setAttributes( { accentColor: value } ),
									label: __(
										'Accent color',
										'twork-builder'
									),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( value ) =>
								setAttributes( { paddingTop: value } )
							}
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( value ) =>
								setAttributes( { paddingBottom: value } )
							}
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( value ) =>
								setAttributes( { paddingTopMobile: value } )
							}
							min={ 0 }
							max={ 120 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( value ) =>
								setAttributes( { paddingBottomMobile: value } )
							}
							min={ 0 }
							max={ 120 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { containerMaxWidth: value } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>
						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( value ) =>
								setAttributes( { containerPadding: value } )
							}
							min={ 0 }
							max={ 64 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Header', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Eyebrow', 'twork-builder' ) }
							checked={ showEyebrow === true }
							onChange={ ( value ) =>
								setAttributes( { showEyebrow: value } )
							}
						/>
						<TextControl
							label={ __( 'Eyebrow Text', 'twork-builder' ) }
							value={ eyebrowText }
							onChange={ ( value ) =>
								setAttributes( { eyebrowText: value } )
							}
							disabled={ ! showEyebrow }
						/>
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<RangeControl
							label={ __( 'Heading Level', 'twork-builder' ) }
							value={ headingLevel }
							onChange={ ( value ) =>
								setAttributes( { headingLevel: value } )
							}
							min={ 2 }
							max={ 4 }
						/>
						<ToggleControl
							label={ __(
								'Show Title Underline',
								'twork-builder'
							) }
							checked={ showTitleUnderline !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitleUnderline: value } )
							}
						/>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( value ) =>
										setAttributes( { titleColor: value } ),
									label: __( 'Title color', 'twork-builder' ),
								},
							] }
						/>
						<RangeControl
							label={ __(
								'Title Font Size (px)',
								'twork-builder'
							) }
							value={ titleFontSize }
							onChange={ ( value ) =>
								setAttributes( { titleFontSize: value } )
							}
							min={ 18 }
							max={ 48 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Gallery Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Gallery', 'twork-builder' ) }
							checked={ showGallery !== false }
							onChange={ ( value ) =>
								setAttributes( { showGallery: value } )
							}
						/>
						<SelectControl
							label={ __( 'Layout', 'twork-builder' ) }
							value={ galleryLayout }
							options={ GALLERY_LAYOUT_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { galleryLayout: value } )
							}
							disabled={ showGallery === false }
						/>
						<RangeControl
							label={ __( 'Columns', 'twork-builder' ) }
							value={ galleryColumns }
							onChange={ ( value ) =>
								setAttributes( { galleryColumns: value } )
							}
							min={ 2 }
							max={ 3 }
							disabled={ showGallery === false }
						/>
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ galleryGap }
							onChange={ ( value ) =>
								setAttributes( { galleryGap: value } )
							}
							min={ 0 }
							max={ 48 }
							disabled={ showGallery === false }
						/>
						<ToggleControl
							label={ __( 'Show Captions', 'twork-builder' ) }
							checked={ showCaptions === true }
							onChange={ ( value ) =>
								setAttributes( { showCaptions: value } )
							}
							disabled={ showGallery === false }
						/>
						{ galleryLayout === 'slideshow' && (
							<>
								<ToggleControl
									label={ __( 'Autoplay', 'twork-builder' ) }
									checked={ galleryAutoplay !== false }
									onChange={ ( value ) =>
										setAttributes( {
											galleryAutoplay: value,
										} )
									}
									disabled={ showGallery === false }
								/>
								<RangeControl
									label={ __(
										'Autoplay interval (ms)',
										'twork-builder'
									) }
									value={ galleryAutoplayMs }
									onChange={ ( value ) =>
										setAttributes( {
											galleryAutoplayMs: value,
										} )
									}
									min={ 2000 }
									max={ 12000 }
									step={ 500 }
									disabled={
										showGallery === false ||
										galleryAutoplay === false
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Feedback Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Feedback', 'twork-builder' ) }
							checked={ showFeedback !== false }
							onChange={ ( value ) =>
								setAttributes( { showFeedback: value } )
							}
						/>
						<RangeControl
							label={ __( 'Columns', 'twork-builder' ) }
							value={ feedbackColumns }
							onChange={ ( value ) =>
								setAttributes( { feedbackColumns: value } )
							}
							min={ 1 }
							max={ 3 }
							disabled={ showFeedback === false }
						/>
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ feedbackGap }
							onChange={ ( value ) =>
								setAttributes( { feedbackGap: value } )
							}
							min={ 0 }
							max={ 64 }
							disabled={ showFeedback === false }
						/>
						<ToggleControl
							label={ __( 'Show Author', 'twork-builder' ) }
							checked={ showAuthor !== false }
							onChange={ ( value ) =>
								setAttributes( { showAuthor: value } )
							}
							disabled={ showFeedback === false }
						/>
						<ToggleControl
							label={ __( 'Allow Emoji', 'twork-builder' ) }
							checked={ allowEmoji !== false }
							onChange={ ( value ) =>
								setAttributes( { allowEmoji: value } )
							}
							disabled={ showFeedback === false }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Quote', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Quote', 'twork-builder' ) }
							checked={ showQuote !== false }
							onChange={ ( value ) =>
								setAttributes( { showQuote: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Quote Marks', 'twork-builder' ) }
							checked={ showQuoteMarks !== false }
							onChange={ ( value ) =>
								setAttributes( { showQuoteMarks: value } )
							}
							disabled={ showQuote === false }
						/>
						<PanelColorSettings
							title={ __( 'Quote Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: quoteMarkColor,
									onChange: ( value ) =>
										setAttributes( {
											quoteMarkColor: value,
										} ),
									label: __(
										'Quote mark color',
										'twork-builder'
									),
								},
								{
									value: quoteTextColor,
									onChange: ( value ) =>
										setAttributes( {
											quoteTextColor: value,
										} ),
									label: __(
										'Quote text color',
										'twork-builder'
									),
								},
							] }
						/>
						<RangeControl
							label={ __(
								'Quote Font Size (px)',
								'twork-builder'
							) }
							value={ quoteFontSize }
							onChange={ ( value ) =>
								setAttributes( { quoteFontSize: value } )
							}
							min={ 14 }
							max={ 36 }
							disabled={ showQuote === false }
						/>
						<RangeControl
							label={ __(
								'Quote Max Width (px)',
								'twork-builder'
							) }
							value={ quoteMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { quoteMaxWidth: value } )
							}
							min={ 400 }
							max={ 1200 }
							step={ 20 }
							disabled={ showQuote === false }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Footer', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Footer', 'twork-builder' ) }
							checked={ showFooter === true }
							onChange={ ( value ) =>
								setAttributes( { showFooter: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Footer Lines', 'twork-builder' ) }
							checked={ showFooterLines !== false }
							onChange={ ( value ) =>
								setAttributes( { showFooterLines: value } )
							}
							disabled={ ! showFooter }
						/>
						<PanelColorSettings
							title={ __( 'Footer Line Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: footerLineColor,
									onChange: ( value ) =>
										setAttributes( {
											footerLineColor: value,
										} ),
									label: __( 'Line color', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Motion', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Animation on Scroll',
								'twork-builder'
							) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
						<SelectControl
							label={ __( 'Animation Type', 'twork-builder' ) }
							value={ animationType }
							options={ ANIMATION_TYPE_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { animationType: value } )
							}
							disabled={ animationOnScroll === false }
						/>
						<RangeControl
							label={ __(
								'Animation Delay (ms)',
								'twork-builder'
							) }
							value={ animationDelay }
							onChange={ ( value ) =>
								setAttributes( { animationDelay: value } )
							}
							min={ 0 }
							max={ 1000 }
							step={ 50 }
							disabled={ animationOnScroll === false }
						/>
						<ToggleControl
							label={ __(
								'Respect Reduced Motion',
								'twork-builder'
							) }
							checked={ respectReducedMotion !== false }
							onChange={ ( value ) =>
								setAttributes( { respectReducedMotion: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="twork-about-staff-meal__container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<header className="twork-about-staff-meal__header">
						{ showEyebrow && eyebrowText && (
							<p className="twork-about-staff-meal__eyebrow">
								{ eyebrowText }
							</p>
						) }
						{ showTitle !== false && (
							<RichText
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
								onChange={ ( value ) =>
									setAttributes( { title: value } )
								}
								style={ {
									color: titleColor,
									fontSize: `${ titleFontSize }px`,
								} }
								placeholder={ __(
									'Section title',
									'twork-builder'
								) }
								withoutInteractiveFormatting
							/>
						) }
					</header>

					<div className="twork-about-staff-meal__regions">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock="all"
						/>
					</div>

					{ showQuote !== false && quoteText && (
						<blockquote
							className={ [
								'twork-about-staff-meal__quote',
								showQuoteMarks !== false
									? 'has-quote-marks'
									: '',
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
							<RichText
								tagName="p"
								value={ quoteText }
								onChange={ ( value ) =>
									setAttributes( { quoteText: value } )
								}
								placeholder={ __(
									'Quote text',
									'twork-builder'
								) }
								withoutInteractiveFormatting
							/>
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
							<RichText
								tagName="p"
								value={ footerText }
								onChange={ ( value ) =>
									setAttributes( { footerText: value } )
								}
								placeholder={ __(
									'Footer text',
									'twork-builder'
								) }
								withoutInteractiveFormatting
							/>
						</footer>
					) }
				</div>
			</section>
		</>
	);
}
