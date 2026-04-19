import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

// Must match the actual child block name (see src/agrezer-third-section-card/block.json).
const ALLOWED_BLOCKS = [ 'twork/stat-image-card' ];
const TEMPLATE = [
	[
		'twork/stat-image-card',
		{
			cardAlign: 'left',
			stat: '80%',
			label: 'Efficiency',
		},
	],

	[
		'twork/stat-image-card',
		{
			cardAlign: 'center',
			stat: '98%',
			label: 'Increase in Yields',
		},
	],

	[
		'twork/stat-image-card',
		{
			cardAlign: 'right',
			stat: '50%',
			label: 'Farm Growth',
		},
	],
];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		backgroundColor = '#f4f4f0',
		paddingTop = 110,
		paddingBottom = 120,
		titleColor = '#131313',
		titleFontSize = 48,
		subtitleColor = '#f48b2a',
		subtitleFontSize = 16,
		descriptionColor = '#4c4c4c',
		descriptionFontSize = 17,
		ctaBgColor = '#d7e84f',
		ctaTextColor = '#1a1a1a',
		overlayOpacity = 0,
		containerMaxWidth,
		containerWidthPct,
		topGridGap,
		topMarginBottom,
		cardsGap,
		cardsMarginTop,
		tagIcon,
		tagIconId,
		tagIconAlt,
		tagline,
		title,
		description,
		ctaText,
		ctaUrl,
		ctaOpenInNewTab,
		showCta,
	} = attributes;

	const overlayRaw = Number( overlayOpacity );
	const overlayAlpha = Number.isFinite( overlayRaw )
		? Math.min( 1, Math.max( 0, overlayRaw / 100 ) )
		: 0;
	const uniqueClass = `twork-third-${ clientId }`;

	const dynamicStyles = `
    .${ uniqueClass } {
        background-color: ${ backgroundColor } !important;
        padding-top: ${ paddingTop }px !important;
        padding-bottom: ${ paddingBottom }px !important;
        --twork-third-max: ${ containerMaxWidth }px;
        --twork-third-width-pct: ${ containerWidthPct }%;
        --twork-third-top-gap: ${ topGridGap }px;
        --twork-third-top-mb: ${ topMarginBottom }px;
        --twork-third-cards-gap: ${ cardsGap }px;
        --twork-third-cards-mt: ${ cardsMarginTop }px;
        --tw-third-title-color: ${ titleColor };
        --tw-third-title-size: ${ titleFontSize }px;
        --tw-third-sub-color: ${ subtitleColor };
        --tw-third-sub-size: ${ subtitleFontSize }px;
        --tw-third-desc-color: ${ descriptionColor };
        --tw-third-desc-size: ${ descriptionFontSize }px;
        --tw-third-cta-bg: ${ ctaBgColor };
        --tw-third-cta-color: ${ ctaTextColor };
        --tw-third-overlay: ${ overlayAlpha };
    }
`;

	const blockProps = useBlockProps( {
		className: `twork-third-section twork-third-section-editor ${ uniqueClass }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'twork-third-section__cards',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const urlTrim = String( ctaUrl || '' ).trim();
	const isRealLink = urlTrim !== '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Typography', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Title font size (px)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 24 }
							max={ 96 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Subtitle font size (px)',
								'twork-builder'
							) }
							value={ subtitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { subtitleFontSize: val } )
							}
							min={ 10 }
							max={ 32 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Description font size (px)',
								'twork-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionFontSize: val,
								} )
							}
							min={ 12 }
							max={ 32 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
							{
								value: titleColor,
								onChange: ( val ) =>
									setAttributes( { titleColor: val } ),
								label: __( 'Title', 'twork-builder' ),
							},
							{
								value: subtitleColor,
								onChange: ( val ) =>
									setAttributes( { subtitleColor: val } ),
								label: __( 'Subtitle', 'twork-builder' ),
							},
							{
								value: descriptionColor,
								onChange: ( val ) =>
									setAttributes( {
										descriptionColor: val,
									} ),
								label: __( 'Description', 'twork-builder' ),
							},
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'twork-builder'
								),
							},
						] }
					/>

					<PanelBody
						title={ __( 'Overlay', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Dark overlay opacity (%)',
								'twork-builder'
							) }
							value={ overlayOpacity }
							onChange={ ( val ) =>
								setAttributes( { overlayOpacity: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
							help={ __(
								'Adds a subtle dark layer over the section background.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>
						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>
						<RangeControl
							label={ __(
								'Top row column gap (px)',
								'twork-builder'
							) }
							value={ topGridGap }
							onChange={ ( val ) =>
								setAttributes( { topGridGap: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
						<RangeControl
							label={ __(
								'Space below top row (px)',
								'twork-builder'
							) }
							value={ topMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { topMarginBottom: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
						<RangeControl
							label={ __( 'Cards gap (px)', 'twork-builder' ) }
							value={ cardsGap }
							onChange={ ( val ) =>
								setAttributes( { cardsGap: val } )
							}
							min={ 8 }
							max={ 40 }
						/>
						<RangeControl
							label={ __(
								'Cards top margin (px)',
								'twork-builder'
							) }
							value={ cardsMarginTop }
							onChange={ ( val ) =>
								setAttributes( { cardsMarginTop: val } )
							}
							min={ 0 }
							max={ 120 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Container width (%)',
								'twork-builder'
							) }
							value={ containerWidthPct }
							onChange={ ( val ) =>
								setAttributes( { containerWidthPct: val } )
							}
							min={ 70 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Call to action', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Button colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: ctaBgColor,
									onChange: ( val ) =>
										setAttributes( {
											ctaBgColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: ctaTextColor,
									onChange: ( val ) =>
										setAttributes( {
											ctaTextColor: val,
										} ),
									label: __( 'Text', 'twork-builder' ),
								},
							] }
						/>

						<ToggleControl
							label={ __( 'Show CTA', 'twork-builder' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						{ showCta && (
							<>
								<TextControl
									label={ __(
										'Button text',
										'twork-builder'
									) }
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
								/>

								<TextControl
									label={ __( 'URL', 'twork-builder' ) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
									help={ __(
										'Leave empty for a non-clickable button. Any URL (including #) becomes a link.',
										'twork-builder'
									) }
								/>

								<ToggleControl
									label={ __(
										'Open in new tab',
										'twork-builder'
									) }
									checked={ ctaOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											ctaOpenInNewTab: val,
										} )
									}
									disabled={ ! isRealLink }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline icon', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						{ ! tagIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										tagIcon: media.url,
										tagIconId: media.id,
										tagIconAlt: media.alt || tagIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Tagline icon',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									className="twork-third-section__tag-icon"
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											tagIcon: '',
											tagIconId: null,
										} )
									}
								>
									{ __( 'Remove icon', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

				</InspectorControls>
			) }

			<style
				dangerouslySetInnerHTML={ { __html: dynamicStyles } }
			/>
			<section { ...blockProps }>
				<div className="twork-third-section__container">
					<div className="twork-third-section__top">
						<div className="twork-third-section__intro">
							<div className="twork-third-section__tagline">
								{ tagIcon && (
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												tagIcon: media.url,
												tagIconId: media.id,
												tagIconAlt:
													media.alt || tagIconAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ tagIconId }
										render={ ( { open } ) => (
											<img
												src={ tagIcon }
												alt={ tagIconAlt || '' }
												className="twork-third-section__tag-icon"
												onClick={ open }
												role="button"
												tabIndex={ 0 }
												onKeyDown={ ( event ) => {
													if (
														event.key ===
															'Enter' ||
														event.key === ' '
													) {
														event.preventDefault();
														open();
													}
												} }
											/>
										) }
									/>
								) }
								<RichText
									tagName="span"
									className="twork-third-section__subtitle"
									value={ tagline }
									onChange={ ( val ) =>
										setAttributes( { tagline: val } )
									}
									placeholder={ __(
										'Subtitle',
										'twork-builder'
									) }
									allowedFormats={ [
										'core/bold',
										'core/italic',
									] }
								/>
							</div>
							<RichText
								tagName="h2"
								className="twork-third-section__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Heading', 'twork-builder' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/underline',
								] }
							/>
						</div>

						<div className="twork-third-section__side">
							<RichText
								tagName="p"
								className="twork-third-section__desc"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									'Description…',
									'twork-builder'
								) }
							/>

							{ showCta && (
								<>
									{ isRealLink ? (
										<a
											href={ urlTrim }
											className="twork-third-section__cta"
											onClick={ ( e ) =>
												e.preventDefault()
											}
										>
											<span>{ ctaText }</span>
											<span aria-hidden="true">↗</span>
										</a>
									) : (
										<span className="twork-third-section__cta twork-third-section__cta--static">
											<span>{ ctaText }</span>
											<span aria-hidden="true">↗</span>
										</span>
									) }
								</>
							) }
						</div>
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
