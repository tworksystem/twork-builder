import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/cta-cards-section-card' ];
const TEMPLATE = [
	[
		'twork/cta-cards-section-card',
		{
			cardAlign: 'left',
			stat: '80%',
			label: 'Efficiency',
		},
	],

	[
		'twork/cta-cards-section-card',
		{
			cardAlign: 'center',
			stat: '98%',
			label: 'Increase in Yields',
		},
	],

	[
		'twork/cta-cards-section-card',
		{
			cardAlign: 'right',
			stat: '50%',
			label: 'Farm Growth',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		topGridGap,
		topMarginBottom,
		cardsGap,
		cardsMarginTop,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		description,
		ctaText,
		ctaUrl,
		ctaOpenInNewTab,
		showCta,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-third-section twork-third-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--twork-third-max': `${ containerMaxWidth }px`,
				'--twork-third-width-pct': `${ containerWidthPct }%`,
				'--twork-third-top-gap': `${ topGridGap }px`,
				'--twork-third-top-mb': `${ topMarginBottom }px`,
				'--twork-third-cards-gap': `${ cardsGap }px`,
				'--twork-third-cards-mt': `${ cardsMarginTop }px`,
			},
		} ),
		[
			backgroundColor,
			cardsGap,
			cardsMarginTop,
			containerMaxWidth,
			containerWidthPct,
			paddingBottom,
			paddingTop,
			topGridGap,
			topMarginBottom,
		]
	);

	const urlTrim = String( ctaUrl || '' ).trim();
	const isRealLink = urlTrim !== '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Call to action', 'twork-builder' ) }
						initialOpen={ true }
					>
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

						<RangeControl
							label={ __( 'Top row gap (px)', 'twork-builder' ) }
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
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
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
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="twork-third-section__container">
					<div className="twork-third-section__top">
						<div className="twork-third-section__intro">
							<div className="twork-third-section__tagline">
								{ tagIcon && (
									<img
										src={ tagIcon }
										alt=""
										className="twork-third-section__tag-icon"
									/>
								) }
								<RichText
									tagName="span"
									value={ tagline }
									onChange={ ( val ) =>
										setAttributes( { tagline: val } )
									}
									placeholder={ __(
										'Tagline',
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
								multiline="br"
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

					<div className="twork-third-section__cards twork-third-section__cards--editor">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
