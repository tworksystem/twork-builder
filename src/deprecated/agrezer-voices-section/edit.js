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

const ALLOWED_BLOCKS = [ 'twork/agrezer-voices-slide' ];
const TEMPLATE = [
	[
		'twork/agrezer-voices-slide',
		{
			quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown..",
			authorName: 'Jesonal Jelins',
			authorRole: 'Customer',
		},
	],

	[
		'twork/agrezer-voices-slide',
		{
			quote: 'Working with Agrezer has improved our seasonal planning and crop quality. Their team communicates clearly and always delivers dependable support.',
			authorName: 'Marry Olson',
			authorRole: 'Shop Keeper',
		},
	],

	[
		'twork/agrezer-voices-slide',
		{
			quote: 'The product consistency is excellent, and the service team responds quickly. We trust them as a long-term partner for our farming business.',
			authorName: 'Arun Patel',
			authorRole: 'Chief Agronomist',
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
		gridColumnGap,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
		wheatImage,
		wheatImageAlt,
		ratingHeading,
		ratingDesc,
		supportHeading,
		supportIcon,
		supportIconAlt,
		supportBadgeValue,
		supportBadgeLabel,
		autoplayInterval,
		enableAutoplay,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-voices-section twork-agrezer-voices-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-voices-max': `${ containerMaxWidth }px`,
				'--agrezer-voices-width-pct': `${ containerWidthPct }%`,
				'--agrezer-voices-col-gap': `${ gridColumnGap }px`,
			},
		} ),
		[
			backgroundColor,
			containerMaxWidth,
			containerWidthPct,
			gridColumnGap,
			paddingBottom,
			paddingTop,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Slider', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Autoplay testimonials',
								'twork-builder'
							) }
							checked={ enableAutoplay }
							onChange={ ( val ) =>
								setAttributes( { enableAutoplay: val } )
							}
							help={ __(
								'Paused on hover; disabled when “reduce motion” is on.',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Autoplay interval (ms)',
								'twork-builder'
							) }
							value={ autoplayInterval }
							onChange={ ( val ) =>
								setAttributes( { autoplayInterval: val } )
							}
							min={ 2500 }
							max={ 12000 }
							step={ 500 }
							disabled={ ! enableAutoplay }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Left column', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Wheat / decorative image alt',
								'twork-builder'
							) }
							value={ wheatImageAlt }
							onChange={ ( val ) =>
								setAttributes( { wheatImageAlt: val } )
							}
						/>

						{ ! wheatImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										wheatImage: media.url,
										wheatImageId: media.id,
										wheatImageAlt:
											media.alt || wheatImageAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Wheat / decorative image',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ wheatImage }
									alt=""
									className="agrezer-voices-section__wheat"
									style={ { maxWidth: 280 } }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											wheatImage: '',
											wheatImageId: null,
										} )
									}
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline icon', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt', 'twork-builder' ) }
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
									className="agrezer-voices-section__tag-icon"
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
									{ __( 'Remove', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Support card icon', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt', 'twork-builder' ) }
							value={ supportIconAlt }
							onChange={ ( val ) =>
								setAttributes( { supportIconAlt: val } )
							}
						/>

						{ ! supportIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										supportIcon: media.url,
										supportIconId: media.id,
										supportIconAlt:
											media.alt || supportIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Large support icon',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ supportIcon }
									alt=""
									className="agrezer-voices-card__support-icon"
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											supportIcon: '',
											supportIconId: null,
										} )
									}
								>
									{ __( 'Remove', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Support badge', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Main value (e.g. 100%)',
								'twork-builder'
							) }
							value={ supportBadgeValue }
							onChange={ ( val ) =>
								setAttributes( { supportBadgeValue: val } )
							}
						/>

						<TextControl
							label={ __(
								'Sub label (second line)',
								'twork-builder'
							) }
							value={ supportBadgeLabel }
							onChange={ ( val ) =>
								setAttributes( { supportBadgeLabel: val } )
							}
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

						<RangeControl
							label={ __( 'Column gap (px)', 'twork-builder' ) }
							value={ gridColumnGap }
							onChange={ ( val ) =>
								setAttributes( { gridColumnGap: val } )
							}
							min={ 16 }
							max={ 60 }
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
				<div className="agrezer-voices-section__container">
					<div className="agrezer-voices-section__left">
						<div className="agrezer-voices-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt=""
									className="agrezer-voices-section__tag-icon"
								/>
							) }
							<RichText
								tagName="span"
								value={ tagline }
								onChange={ ( val ) =>
									setAttributes( { tagline: val } )
								}
								placeholder={ __( 'Tagline', 'twork-builder' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
							/>
						</div>
						<RichText
							tagName="h2"
							className="agrezer-voices-section__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __( 'Title', 'twork-builder' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							multiline="br"
						/>

						{ wheatImage ? (
							<img
								src={ wheatImage }
								alt=""
								className="agrezer-voices-section__wheat"
							/>
						) : null }
					</div>

					<div className="agrezer-voices-section__right">
						<div className="agrezer-voices-section__top-cards">
							<article className="agrezer-voices-card agrezer-voices-card--rating">
								<RichText
									tagName="h3"
									className="agrezer-voices-card__heading"
									value={ ratingHeading }
									onChange={ ( val ) =>
										setAttributes( { ratingHeading: val } )
									}
									placeholder={ __(
										'Rating title',
										'twork-builder'
									) }
								/>

								<RichText
									tagName="p"
									className="agrezer-voices-card__desc"
									value={ ratingDesc }
									onChange={ ( val ) =>
										setAttributes( { ratingDesc: val } )
									}
									placeholder={ __(
										'Description…',
										'twork-builder'
									) }
								/>
							</article>

							<article className="agrezer-voices-card agrezer-voices-card--support">
								<RichText
									tagName="h3"
									className="agrezer-voices-card__heading"
									value={ supportHeading }
									onChange={ ( val ) =>
										setAttributes( { supportHeading: val } )
									}
									placeholder={ __(
										'Support title',
										'twork-builder'
									) }
								/>

								{ supportIcon && (
									<img
										src={ supportIcon }
										alt=""
										className="agrezer-voices-card__support-icon"
									/>
								) }
								<div className="agrezer-voices-card__support-badge">
									{ supportBadgeValue }
									{ supportBadgeLabel && (
										<span>{ supportBadgeLabel }</span>
									) }
								</div>
							</article>
						</div>

						<div
							className="agrezer-voices-section__testimonial"
							data-voices-slider=""
						>
							<p
								className="components-base-control__help"
								style={ { marginBottom: 8 } }
							>
								{ __(
									'Slides rotate on the front. Edit each slide below.',
									'twork-builder'
								) }
							</p>
							<div className="agrezer-voices-section__slides">
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									templateLock={ false }
									renderAppender={
										InnerBlocks.ButtonBlockAppender
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
