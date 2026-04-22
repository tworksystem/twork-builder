import { __ } from '@wordpress/i18n';
// eslint-disable-next-line import/no-unresolved -- workspace alias via webpack
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { memo, useMemo, useCallback } from '@wordpress/element';
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	GradientPicker,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Divider as StableDivider,
} from '@wordpress/components';

const Divider =
	StableDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const HERO_OVERLAY_GRADIENT_PRESET_CUSTOM = 'custom';
const HERO_OVERLAY_GRADIENT_PRESET_NONE = 'none';

const HERO_OVERLAY_GRADIENT_PRESETS = [
	{
		slug: 'meadow-dawn',
		label: __( 'Meadow dawn (organic sage)', 'twork-builder' ),
		gradient:
			'linear-gradient(135deg, rgba(143, 189, 69, 0.24) 0%, rgba(22, 46, 22, 0.1) 100%)',
	},
	{
		slug: 'deep-canopy',
		label: __( 'Deep canopy (dark forest)', 'twork-builder' ),
		gradient:
			'linear-gradient(165deg, rgba(8, 26, 12, 0.78) 0%, rgba(4, 14, 6, 0.42) 52%, rgba(143, 189, 69, 0.06) 100%)',
	},
	{
		slug: 'golden-hour',
		label: __( 'Golden hour harvest', 'twork-builder' ),
		gradient:
			'linear-gradient(118deg, rgba(232, 196, 96, 0.26) 0%, rgba(72, 48, 18, 0.42) 100%)',
	},
	{
		slug: 'morning-mist',
		label: __( 'Morning mist over fields', 'twork-builder' ),
		gradient:
			'linear-gradient(180deg, rgba(200, 224, 232, 0.2) 0%, rgba(38, 66, 52, 0.32) 100%)',
	},
	{
		slug: 'rich-earth',
		label: __( 'Rich earth (soil tones)', 'twork-builder' ),
		gradient:
			'linear-gradient(145deg, rgba(62, 44, 28, 0.48) 0%, rgba(22, 36, 24, 0.55) 100%)',
	},
	{
		slug: HERO_OVERLAY_GRADIENT_PRESET_NONE,
		label: __( 'No gradient layer', 'twork-builder' ),
		gradient:
			'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)',
	},
];

const HERO_OVERLAY_GRADIENT_SWATCHES = HERO_OVERLAY_GRADIENT_PRESETS.filter(
	( p ) => p.slug !== HERO_OVERLAY_GRADIENT_PRESET_NONE
).map( ( p ) => ( {
	name: p.label,
	slug: p.slug,
	gradient: p.gradient,
} ) );

function getHeroOverlayPresetSlugFromGradient( gradient ) {
	const g = typeof gradient === 'string' ? gradient.trim() : '';
	if ( ! g ) {
		return HERO_OVERLAY_GRADIENT_PRESET_NONE;
	}
	const hit = HERO_OVERLAY_GRADIENT_PRESETS.find(
		( p ) => p.gradient.trim() === g
	);
	return hit ? hit.slug : HERO_OVERLAY_GRADIENT_PRESET_CUSTOM;
}

const ALLOWED_BLOCKS = [ 'twork/hero-feature' ];
const TEMPLATE = [
	[
		'twork/hero-feature',
		{ title: 'Healthy Soil<br />Solutions', iconVariant: 'leaf' },
	],
	[
		'twork/hero-feature',
		{ title: 'Pure Organic<br />Growth', iconVariant: 'drop' },
	],
	[
		'twork/hero-feature',
		{ title: 'Nature-Driven<br />Innovation', iconVariant: 'sprout' },
	],
];

const TaglineIcon = memo( function TaglineIcon() {
	return (
		<svg
			className="twork-hero__tagline-icon"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M12 22v-6.4" />
			<path d="M12 15.6c-4.8 0-8.4-2.4-9.6-6.4 3.7.2 6.5 1.1 8.4 2.8 1.2-2.4 1.3-5.1.3-8 4 1.1 6.7 3.6 8 7.4-1.7 2.7-4.1 4.1-7.1 4.2Z" />
		</svg>
	);
} );

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		taglineText,
		title,
		description,
		buttonText,
		buttonMediaUrl,
		buttonMediaId,
		buttonMediaType,
		buttonUrl,
		buttonLinkTarget,
		backgroundImage,
		overlayColor,
		overlayGradient,
		overlayGradientPreset,
		overlayOpacity,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		featuresGap,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const buttonIconSvg = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

	const overlayGradientCss = useMemo( () => {
		const g =
			typeof overlayGradient === 'string' ? overlayGradient.trim() : '';
		if ( ! g ) {
			return HERO_OVERLAY_GRADIENT_PRESETS.find(
				( p ) => p.slug === HERO_OVERLAY_GRADIENT_PRESET_NONE
			).gradient;
		}
		return overlayGradient;
	}, [ overlayGradient ] );

	const resolvedOverlayPreset = useMemo( () => {
		if ( overlayGradientPreset && overlayGradientPreset !== '' ) {
			return overlayGradientPreset;
		}
		return getHeroOverlayPresetSlugFromGradient( overlayGradient );
	}, [ overlayGradientPreset, overlayGradient ] );

	const overlayPresetSelectOptions = useMemo(
		() => [
			...HERO_OVERLAY_GRADIENT_PRESETS.map( ( p ) => ( {
				label: p.label,
				value: p.slug,
			} ) ),
			{
				label: __( 'Custom gradient…', 'twork-builder' ),
				value: HERO_OVERLAY_GRADIENT_PRESET_CUSTOM,
			},
		],
		[]
	);

	const sectionStyle = useMemo(
		() => ( {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-container-max-width': `${ containerMaxWidth }px`,
			'--twork-container-padding': `${ containerPadding }px`,
			'--twork-features-gap': `${ featuresGap }px`,
			'--twork-hero-btn-bg': buttonBgColor,
			'--twork-hero-btn-text': buttonTextColor,
			'--twork-hero-btn-radius': `${ buttonBorderRadius }px`,
			'--twork-padding-top-mobile': `${ paddingTopMobile }px`,
			'--twork-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--twork-hero-overlay-gradient': overlayGradientCss,
		} ),
		[
			backgroundImage,
			paddingTop,
			paddingBottom,
			containerMaxWidth,
			containerPadding,
			featuresGap,
			buttonBgColor,
			buttonTextColor,
			buttonBorderRadius,
			paddingTopMobile,
			paddingBottomMobile,
			overlayGradientCss,
		]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-hero twork-hero--bg twork-hero--editor',
			style: sectionStyle,
		} ),
		[ sectionStyle ]
	);

	const onTagline = useCallback(
		( val ) => setAttributes( { taglineText: val } ),
		[ setAttributes ]
	);
	const onButtonText = useCallback(
		( val ) => setAttributes( { buttonText: val } ),
		[ setAttributes ]
	);
	const onSelectButtonMedia = useCallback(
		( media ) => {
			if ( ! media?.url ) {
				return;
			}
			const isVideo =
				media?.mime?.indexOf( 'video' ) === 0 ||
				/\.(mp4|webm)$/i.test( media.url );
			setAttributes( {
				buttonMediaUrl: media.url,
				buttonMediaId: media.id,
				buttonMediaType: isVideo ? 'video' : 'image',
			} );
		},
		[ setAttributes ]
	);
	const onRemoveButtonMedia = useCallback(
		() =>
			setAttributes( {
				buttonMediaUrl: '',
				buttonMediaId: null,
				buttonMediaType: 'image',
			} ),
		[ setAttributes ]
	);
	const onTitle = useCallback(
		( val ) => setAttributes( { title: val } ),
		[ setAttributes ]
	);
	const onDescription = useCallback(
		( val ) => setAttributes( { description: val } ),
		[ setAttributes ]
	);
	const onOverlayColor = useCallback(
		( val ) => setAttributes( { overlayColor: val } ),
		[ setAttributes ]
	);
	const onSelectBg = useCallback(
		( media ) =>
			setAttributes( {
				backgroundImage: media.url,
				backgroundImageId: media.id,
			} ),
		[ setAttributes ]
	);
	const onRemoveBg = useCallback(
		() => setAttributes( { backgroundImage: '', backgroundImageId: null } ),
		[ setAttributes ]
	);
	const onMaxW = useCallback(
		( val ) => setAttributes( { containerMaxWidth: val } ),
		[ setAttributes ]
	);
	const onPad = useCallback(
		( val ) => setAttributes( { containerPadding: val } ),
		[ setAttributes ]
	);
	const onPadTop = useCallback(
		( val ) => setAttributes( { paddingTop: val } ),
		[ setAttributes ]
	);
	const onPadBottom = useCallback(
		( val ) => setAttributes( { paddingBottom: val } ),
		[ setAttributes ]
	);
	const onFeaturesGap = useCallback(
		( val ) => setAttributes( { featuresGap: val } ),
		[ setAttributes ]
	);
	const onButtonUrl = useCallback(
		( val ) => setAttributes( { buttonUrl: val || '#' } ),
		[ setAttributes ]
	);
	const onButtonTarget = useCallback(
		( val ) => setAttributes( { buttonLinkTarget: val } ),
		[ setAttributes ]
	);

	const onOverlayGradientPresetChange = useCallback(
		( slug ) => {
			if ( slug === HERO_OVERLAY_GRADIENT_PRESET_CUSTOM ) {
				setAttributes( {
					overlayGradientPreset: HERO_OVERLAY_GRADIENT_PRESET_CUSTOM,
				} );
				return;
			}
			const preset = HERO_OVERLAY_GRADIENT_PRESETS.find(
				( p ) => p.slug === slug
			);
			if ( preset ) {
				setAttributes( {
					overlayGradientPreset: slug,
					overlayGradient: preset.gradient,
				} );
			}
		},
		[ setAttributes ]
	);

	const onOverlayGradientPickerChange = useCallback(
		( newGradient ) => {
			let raw = '';
			if ( newGradient !== null && newGradient !== undefined ) {
				raw = String( newGradient ).trim();
			}
			const noneGrad = HERO_OVERLAY_GRADIENT_PRESETS.find(
				( p ) => p.slug === HERO_OVERLAY_GRADIENT_PRESET_NONE
			).gradient;
			const nextGradient = raw === '' ? noneGrad : String( newGradient );
			setAttributes( {
				overlayGradient: nextGradient,
				overlayGradientPreset: HERO_OVERLAY_GRADIENT_PRESET_CUSTOM,
			} );
		},
		[ setAttributes ]
	);

	const onOverlayGradientTextChange = useCallback(
		( val ) => {
			const trimmed = typeof val === 'string' ? val.trim() : '';
			const noneGrad = HERO_OVERLAY_GRADIENT_PRESETS.find(
				( p ) => p.slug === HERO_OVERLAY_GRADIENT_PRESET_NONE
			).gradient;
			setAttributes( {
				overlayGradient: trimmed === '' ? noneGrad : val,
				overlayGradientPreset: HERO_OVERLAY_GRADIENT_PRESET_CUSTOM,
			} );
		},
		[ setAttributes ]
	);

	const href = buttonUrl && buttonUrl.trim() !== '' ? buttonUrl : '#';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Hero Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Tagline text', 'twork-builder' ) }
							value={ taglineText }
							onChange={ onTagline }
						/>

						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ buttonText }
							onChange={ onButtonText }
						/>

						<TextControl
							label={ __( 'Button URL', 'twork-builder' ) }
							value={ buttonUrl }
							onChange={ onButtonUrl }
							help={ __(
								'Link for the primary CTA button.',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __(
								'Open button link in new tab',
								'twork-builder'
							) }
							checked={ buttonLinkTarget }
							onChange={ onButtonTarget }
						/>

						<ToggleControl
							label={ __(
								'Show button icon (when no media)',
								'twork-builder'
							) }
							checked={ showButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { showButtonIcon: val } )
							}
							help={ __(
								'Hidden when custom image or video is set on the button.',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Button icon type', 'twork-builder' ) }
							value={ buttonIconType }
							options={ [
								{
									label: __(
										'Diagonal arrow',
										'twork-builder'
									),
									value: 'diagonal-arrow',
								},
								{
									label: __( 'Arrow right', 'twork-builder' ),
									value: 'arrow-right',
								},
								{
									label: __(
										'External link',
										'twork-builder'
									),
									value: 'external',
								},
								{
									label: __( 'Plus', 'twork-builder' ),
									value: 'plus',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { buttonIconType: val } )
							}
							disabled={ ! showButtonIcon }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							id="twork-hero-background-image"
							label={ __( 'Background image', 'twork-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ onSelectBg }
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Background Image',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImage }
										alt=""
										style={ {
											width: '100%',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ onRemoveBg }
									>
										{ __(
											'Remove image',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
						<PanelColorSettings
							title={ __( 'Overlay Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: overlayColor,
									onChange: onOverlayColor,
									label: __(
										'Overlay Color',
										'twork-builder'
									),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Overlay opacity', 'twork-builder' ) }
							value={ overlayOpacity }
							onChange={ ( val ) =>
								setAttributes( { overlayOpacity: val } )
							}
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
							help={ __(
								'Fades the entire overlay (color + gradient layers) together.',
								'twork-builder'
							) }
						/>
						<SelectControl
							label={ __( 'Overlay gradient', 'twork-builder' ) }
							value={ resolvedOverlayPreset }
							options={ overlayPresetSelectOptions }
							onChange={ onOverlayGradientPresetChange }
							help={ __(
								'Adds a nature-themed wash between the photo and the solid overlay color.',
								'twork-builder'
							) }
						/>
						{ resolvedOverlayPreset ===
							HERO_OVERLAY_GRADIENT_PRESET_CUSTOM && (
							<BaseControl
								label={ __(
									'Custom gradient',
									'twork-builder'
								) }
								id="twork-hero-overlay-gradient-picker"
							>
								<GradientPicker
									__experimentalIsRenderedInSidebar
									value={ overlayGradientCss }
									onChange={ onOverlayGradientPickerChange }
									gradients={ HERO_OVERLAY_GRADIENT_SWATCHES }
								/>
							</BaseControl>
						) }
						<TextControl
							label={ __(
								'Overlay gradient (CSS, advanced)',
								'twork-builder'
							) }
							value={ overlayGradient }
							onChange={ onOverlayGradientTextChange }
							help={ __(
								'Optional: paste any valid CSS gradient. Shown when you need pixel-perfect control beyond the picker.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Button Media', 'twork-builder' ) }
						initialOpen={ false }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectButtonMedia }
								allowedTypes={ [ 'image', 'video' ] }
								value={ buttonMediaId }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ buttonMediaUrl
											? __(
													'Replace button media',
													'twork-builder'
											  )
											: __(
													'Select button media',
													'twork-builder'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ buttonMediaUrl && (
							<Button
								isDestructive
								isSmall
								onClick={ onRemoveButtonMedia }
							>
								{ __( 'Remove media', 'twork-builder' ) }
							</Button>
						) }
						<PanelColorSettings
							title={ __( 'Button Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: buttonBgColor,
									onChange: ( val ) =>
										setAttributes( { buttonBgColor: val } ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: buttonTextColor,
									onChange: ( val ) =>
										setAttributes( {
											buttonTextColor: val,
										} ),
									label: __( 'Text', 'twork-builder' ),
								},
							] }
						/>
						<RangeControl
							label={ __(
								'Button border radius (px)',
								'twork-builder'
							) }
							value={ buttonBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { buttonBorderRadius: val } )
							}
							min={ 0 }
							max={ 64 }
							step={ 1 }
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
							onChange={ onMaxW }
							min={ 900 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ onPad }
							min={ 0 }
							max={ 80 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Top padding (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ onPadTop }
							min={ 0 }
							max={ 240 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Bottom padding (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ onPadBottom }
							min={ 0 }
							max={ 240 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Top padding mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 180 }
							step={ 2 }
						/>
						<RangeControl
							label={ __(
								'Bottom padding mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 180 }
							step={ 2 }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Features gap (px)', 'twork-builder' ) }
							value={ featuresGap }
							onChange={ onFeaturesGap }
							min={ 0 }
							max={ 40 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="twork-hero__overlay"
					style={ {
						'--twork-hero-overlay-color': overlayColor,
						'--twork-hero-overlay-opacity': overlayOpacity,
						'--twork-hero-overlay-gradient': overlayGradientCss,
					} }
				/>

				<div className="twork-hero__container">
					<div className="twork-hero__content">
						<div className="twork-hero__tagline">
							<TaglineIcon />
							<RichText
								tagName="span"
								className="twork-hero__tagline-text"
								value={ taglineText }
								onChange={ onTagline }
								placeholder={ __(
									'Agriculture & Organic Farms',
									'twork-builder'
								) }
							/>
						</div>
						<RichText
							tagName="h1"
							className="twork-hero__title twork-hero__title"
							value={ title }
							onChange={ onTitle }
							placeholder={ __(
								'Rooted in Nature, Growing the Future',
								'twork-builder'
							) }
						/>

						<RichText
							tagName="p"
							className="twork-hero__desc"
							value={ description }
							onChange={ onDescription }
							placeholder={ __(
								'Hero description…',
								'twork-builder'
							) }
						/>

						<a
							href={ href }
							className="twork-hero__btn"
							target={ buttonLinkTarget ? '_blank' : undefined }
							rel={
								buttonLinkTarget
									? 'noopener noreferrer'
									: undefined
							}
							onClick={ ( e ) => e.preventDefault() }
						>
							<RichText
								tagName="span"
								value={ buttonText }
								onChange={ onButtonText }
								placeholder={ __(
									'Explore More',
									'twork-builder'
								) }
							/>
							{ ! buttonMediaUrl && showButtonIcon && (
								<span
									className="twork-hero__btn-icon"
									aria-hidden="true"
								>
									{ buttonIconSvg }
								</span>
							) }
							{ buttonMediaUrl && buttonMediaType === 'video' && (
								<video
									className="twork-hero__btn-media"
									src={ buttonMediaUrl }
									autoPlay
									muted
									loop
									playsInline
									aria-hidden="true"
								/>
							) }
							{ buttonMediaUrl && buttonMediaType !== 'video' && (
								<img
									className="twork-hero__btn-media"
									src={ buttonMediaUrl }
									alt=""
									aria-hidden="true"
								/>
							) }
						</a>
					</div>

					<div className="twork-hero__features-wrapper">
						<div className="twork-hero__features-track">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
