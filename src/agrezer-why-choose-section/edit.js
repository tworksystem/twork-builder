import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/benefit-point' ];

const POINT_TEMPLATE = [
	[
		'twork/benefit-point',
		{
			slot: 1,
			badgeText: '01',
			pointText: 'Health From of the Earth',
		},
	],
	[
		'twork/benefit-point',
		{
			slot: 2,
			badgeText: '02',
			pointText: 'Rooted in Sustainable Growth',
		},
	],
	[
		'twork/benefit-point',
		{
			slot: 3,
			badgeText: '03',
			pointText: 'Technology Meets the Soil Flow',
		},
	],
	[
		'twork/benefit-point',
		{
			slot: 4,
			badgeText: '04',
			pointText: 'Fields of Shared Prosperity',
		},
	],
	[
		'twork/benefit-point',
		{
			slot: 5,
			badgeText: '05',
			pointText: 'Seeds Sprouting Sustainable',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		taglineLetterSpacing,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleLineHeight,
		bgGradientStartColor,
		bgGradientEndColor,
		centerMediaUrl,
		centerMediaId,
		centerMediaType,
		centerMediaAlt,
		videoAutoplay,
		videoLoop,
		videoMuted,
		mediaBorderRadius,
		mediaDropShadow,
		filterBrightness,
		filterContrast,
		filterGrayscale,
		mediaMaxWidthDesktop,
		mediaMaxWidthMobile,
		imageAnimationType,
		hoverEffectType,
		imageAnimationDuration,
		imageAnimationDelay,
		imageVerticalOffset,
		backgroundOverlayOpacity,
		enableParallax,
		stageMinHeight,
		waveDecorationUrl,
		waveHeightDesktop,
		waveHeightMobile,
		waveOpacity,
		waveFlipHorizontal,
		waveFlipVertical,
	} = attributes;

	const detectMediaType = ( media = {} ) => {
		const url = media?.url || '';
		const mime = media?.mime || '';
		if ( mime.indexOf( 'video' ) === 0 || /\.(mp4|webm)$/i.test( url ) ) {
			return 'video';
		}
		return 'image';
	};

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps( {
		className: `twork-why-choose twork-why-choose-section-editor ${
			waveDecorationUrl ? 'has-wave-decoration' : ''
		}`,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-padding-top-mobile': `${ paddingTopMobile }px`,
			'--twork-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--twork-anim-duration': `${ imageAnimationDuration }s`,
			'--twork-anim-delay': `${ imageAnimationDelay }s`,
			'--twork-image-bottom': `${ imageVerticalOffset }px`,
			'--twork-bg-overlay-opacity': backgroundOverlayOpacity,
			'--twork-parallax-shift': enableParallax ? '-12px' : '0px',
			'--twork-media-radius': `${ mediaBorderRadius }px`,
			'--twork-filter-brightness': `${ filterBrightness }%`,
			'--twork-filter-contrast': `${ filterContrast }%`,
			'--twork-filter-grayscale': `${ filterGrayscale }%`,
			'--twork-media-max-width-desk': `${ mediaMaxWidthDesktop }px`,
			'--twork-media-max-width-mob': `${ mediaMaxWidthMobile }px`,
			'--twork-bg-start': bgGradientStartColor,
			'--twork-bg-end': bgGradientEndColor,
			'--twork-wave-h-desk': `${ waveHeightDesktop }px`,
			'--twork-wave-h-mob': `${ waveHeightMobile }px`,
			'--twork-wave-opacity': waveOpacity,
			'--twork-wave-flip-x': waveFlipHorizontal ? -1 : 1,
			'--twork-wave-flip-y': waveFlipVertical ? -1 : 1,
			'--twork-media-drop-shadow': mediaDropShadow
				? 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.28))'
				: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
			...( shapeVar ? { '--twork-why-choose-shape': shapeVar } : {} ),
		},
	} );

	const containerStyle = {
		width: `min(100% - ${ containerGutter * 2 }px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	const stageProps = {
		className: 'twork-why-choose__stage twork-why-choose__stage-editor',
		style: stageStyle,
	};
	const innerBlocksProps = useInnerBlocksProps( stageProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: POINT_TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Header', 'twork-builder' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Tagline icon (emoji)', 'twork-builder' ) }
							value={ taglineIcon }
							onChange={ ( val ) => setAttributes( { taglineIcon: val } ) }
						/>
						<PanelColorSettings
							title={ __( 'Tagline', 'twork-builder' ) }
							colorSettings={ [
								{ value: taglineColor, onChange: ( val ) => setAttributes( { taglineColor: val } ), label: __( 'Text', 'twork-builder' ) },
								{ value: taglineIconColor, onChange: ( val ) => setAttributes( { taglineIconColor: val } ), label: __( 'Icon tint', 'twork-builder' ) },
							] }
						/>
						<TextControl
							label={ __( 'Tagline letter spacing', 'twork-builder' ) }
							value={ taglineLetterSpacing }
							onChange={ ( val ) =>
								setAttributes( { taglineLetterSpacing: val || 'normal' } )
							}
							help={ __( 'Example: normal, 0.04em, 1px', 'twork-builder' ) }
						/>
						<Divider />
						<PanelColorSettings
							title={ __( 'Title', 'twork-builder' ) }
							colorSettings={ [ { value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Color', 'twork-builder' ) } ] }
						/>
						<RangeControl label={ __( 'Title size (rem)', 'twork-builder' ) } value={ titleFontSize } onChange={ ( val ) => setAttributes( { titleFontSize: val } ) } min={ 1.5 } max={ 4 } step={ 0.05 } />
						<RangeControl label={ __( 'Title weight', 'twork-builder' ) } value={ titleFontWeight } onChange={ ( val ) => setAttributes( { titleFontWeight: val } ) } min={ 400 } max={ 900 } step={ 100 } />
						<RangeControl
							label={ __( 'Title line height', 'twork-builder' ) }
							value={ titleLineHeight }
							onChange={ ( val ) => setAttributes( { titleLineHeight: val } ) }
							min={ 0.8 }
							max={ 2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Background settings', 'twork-builder' ) } initialOpen={ false }>
						<PanelColorSettings
							title={ __( 'Gradient colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: bgGradientStartColor,
									onChange: ( val ) => setAttributes( { bgGradientStartColor: val } ),
									label: __( 'Gradient start', 'twork-builder' ),
								},
								{
									value: bgGradientEndColor,
									onChange: ( val ) => setAttributes( { bgGradientEndColor: val } ),
									label: __( 'Gradient end', 'twork-builder' ),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Background overlay opacity', 'twork-builder' ) }
							value={ backgroundOverlayOpacity }
							onChange={ ( val ) => setAttributes( { backgroundOverlayOpacity: val } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Animations', 'twork-builder' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Image animation type', 'twork-builder' ) }
							value={ imageAnimationType }
							options={ [
								{ label: __( 'None', 'twork-builder' ), value: 'none' },
								{ label: __( 'Spin', 'twork-builder' ), value: 'spin' },
								{ label: __( 'Bounce', 'twork-builder' ), value: 'bounce' },
								{ label: __( 'Float', 'twork-builder' ), value: 'float' },
								{ label: __( 'Pulse', 'twork-builder' ), value: 'pulse' },
								{ label: __( 'Fade Up', 'twork-builder' ), value: 'fade-up' },
								{ label: __( 'Zoom In', 'twork-builder' ), value: 'zoom-in' },
							] }
							onChange={ ( val ) => setAttributes( { imageAnimationType: val } ) }
						/>
						<SelectControl
							label={ __( 'Hover effect', 'twork-builder' ) }
							value={ hoverEffectType }
							options={ [
								{ label: __( 'None', 'twork-builder' ), value: 'none' },
								{ label: __( 'Lift', 'twork-builder' ), value: 'lift' },
								{ label: __( 'Scale Up', 'twork-builder' ), value: 'scale-up' },
								{ label: __( 'Glow', 'twork-builder' ), value: 'glow' },
							] }
							onChange={ ( val ) => setAttributes( { hoverEffectType: val } ) }
						/>
						<RangeControl
							label={ __( 'Animation duration (s)', 'twork-builder' ) }
							value={ imageAnimationDuration }
							onChange={ ( val ) => setAttributes( { imageAnimationDuration: val } ) }
							min={ 0.2 }
							max={ 10 }
							step={ 0.1 }
						/>
						<RangeControl
							label={ __( 'Animation delay (s)', 'twork-builder' ) }
							value={ imageAnimationDelay }
							onChange={ ( val ) => setAttributes( { imageAnimationDelay: val } ) }
							min={ 0 }
							max={ 6 }
							step={ 0.1 }
						/>
						<ToggleControl
							label={ __( 'Enable subtle parallax shift', 'twork-builder' ) }
							checked={ !! enableParallax }
							onChange={ ( val ) => setAttributes( { enableParallax: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Media source', 'twork-builder' ) } initialOpen={ false }>
						<BaseControl label={ __( 'Center media', 'twork-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											centerMediaUrl: media.url,
											centerMediaId: media.id,
											centerMediaType: detectMediaType( media ),
											centerMediaAlt: media.alt || centerMediaAlt,
										} )
									}
									allowedTypes={ [ 'image', 'video' ] }
									value={ centerMediaId }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ centerMediaUrl
												? __( 'Replace media', 'twork-builder' )
												: __( 'Select media', 'twork-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ centerMediaUrl && (
								<Button
									isDestructive
									onClick={ () =>
										setAttributes( {
											centerMediaUrl: '',
											centerMediaId: null,
											centerMediaType: 'image',
										} )
									}
								>
									{ __( 'Remove media', 'twork-builder' ) }
								</Button>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ centerMediaAlt }
							onChange={ ( val ) => setAttributes( { centerMediaAlt: val } ) }
						/>
					</PanelBody>

					{ centerMediaType === 'video' && (
						<PanelBody title={ __( 'Video settings', 'twork-builder' ) } initialOpen={ false }>
							<ToggleControl
								label={ __( 'Autoplay', 'twork-builder' ) }
								checked={ !! videoAutoplay }
								onChange={ ( val ) => setAttributes( { videoAutoplay: val } ) }
							/>
							<ToggleControl
								label={ __( 'Loop', 'twork-builder' ) }
								checked={ !! videoLoop }
								onChange={ ( val ) => setAttributes( { videoLoop: val } ) }
							/>
							<ToggleControl
								label={ __( 'Muted', 'twork-builder' ) }
								checked={ !! videoMuted }
								onChange={ ( val ) => setAttributes( { videoMuted: val } ) }
							/>
						</PanelBody>
					) }

					<PanelBody title={ __( 'Media sizing', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Desktop max width (px)', 'twork-builder' ) }
							value={ mediaMaxWidthDesktop }
							onChange={ ( val ) => setAttributes( { mediaMaxWidthDesktop: val } ) }
							min={ 200 }
							max={ 900 }
							step={ 10 }
						/>
						<RangeControl
							label={ __( 'Mobile max width (px)', 'twork-builder' ) }
							value={ mediaMaxWidthMobile }
							onChange={ ( val ) => setAttributes( { mediaMaxWidthMobile: val } ) }
							min={ 160 }
							max={ 700 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Media styling & filters', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Border radius (px)', 'twork-builder' ) }
							value={ mediaBorderRadius }
							onChange={ ( val ) => setAttributes( { mediaBorderRadius: val } ) }
							min={ 0 }
							max={ 80 }
							step={ 1 }
						/>
						<ToggleControl
							label={ __( 'Enable drop shadow', 'twork-builder' ) }
							checked={ !! mediaDropShadow }
							onChange={ ( val ) => setAttributes( { mediaDropShadow: val } ) }
						/>
						<RangeControl
							label={ __( 'Brightness (%)', 'twork-builder' ) }
							value={ filterBrightness }
							onChange={ ( val ) => setAttributes( { filterBrightness: val } ) }
							min={ 1 }
							max={ 200 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Contrast (%)', 'twork-builder' ) }
							value={ filterContrast }
							onChange={ ( val ) => setAttributes( { filterContrast: val } ) }
							min={ 1 }
							max={ 200 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Grayscale (%)', 'twork-builder' ) }
							value={ filterGrayscale }
							onChange={ ( val ) => setAttributes( { filterGrayscale: val } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Advanced design', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Image vertical offset (px)', 'twork-builder' ) }
							value={ imageVerticalOffset }
							onChange={ ( val ) => setAttributes( { imageVerticalOffset: val } ) }
							min={ -120 }
							max={ 200 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Spacing & layout', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl label={ __( 'Min height (px)', 'twork-builder' ) } value={ stageMinHeight } onChange={ ( val ) => setAttributes( { stageMinHeight: val } ) } min={ 400 } max={ 900 } step={ 10 } />
						<RangeControl label={ __( 'Padding top (px)', 'twork-builder' ) } value={ paddingTop } onChange={ ( val ) => setAttributes( { paddingTop: val } ) } min={ 0 } max={ 160 } step={ 4 } />
						<RangeControl label={ __( 'Padding bottom (px)', 'twork-builder' ) } value={ paddingBottom } onChange={ ( val ) => setAttributes( { paddingBottom: val } ) } min={ 0 } max={ 120 } step={ 4 } />
						<RangeControl
							label={ __( 'Padding top mobile (px)', 'twork-builder' ) }
							value={ paddingTopMobile }
							onChange={ ( val ) => setAttributes( { paddingTopMobile: val } ) }
							min={ 0 }
							max={ 160 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Padding bottom mobile (px)', 'twork-builder' ) }
							value={ paddingBottomMobile }
							onChange={ ( val ) => setAttributes( { paddingBottomMobile: val } ) }
							min={ 0 }
							max={ 160 }
							step={ 2 }
						/>
						<RangeControl label={ __( 'Content max width (px)', 'twork-builder' ) } value={ containerMaxWidth } onChange={ ( val ) => setAttributes( { containerMaxWidth: val } ) } min={ 960 } max={ 1440 } step={ 10 } />
						<RangeControl label={ __( 'Side gutter (px)', 'twork-builder' ) } value={ containerGutter } onChange={ ( val ) => setAttributes( { containerGutter: val } ) } min={ 12 } max={ 48 } step={ 2 } />
					</PanelBody>
					<PanelBody title={ __( 'Shape divider settings', 'twork-builder' ) } initialOpen={ false }>
						<BaseControl label={ __( 'Wave / shape image (optional)', 'twork-builder' ) } help={ __( 'Uses theme asset e.g. shape-12.webp, or upload any wide strip.', 'twork-builder' ) }>
							{ ! waveDecorationUrl ? (
								<MediaPlaceholder onSelect={ ( media ) => setAttributes( { waveDecorationUrl: media.url, waveDecorationId: media.id } ) } allowedTypes={ [ 'image' ] } multiple={ false } labels={ { title: __( 'Decoration image', 'twork-builder' ) } } />
							) : (
								<div>
									<img src={ waveDecorationUrl } alt="" style={ { width: '100%', maxHeight: 80, objectFit: 'contain' } } />
									<Button isSecondary isSmall onClick={ () => setAttributes( { waveDecorationUrl: '', waveDecorationId: null } ) }>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
						<RangeControl
							label={ __( 'Wave height desktop (px)', 'twork-builder' ) }
							value={ waveHeightDesktop }
							onChange={ ( val ) => setAttributes( { waveHeightDesktop: val } ) }
							min={ 20 }
							max={ 280 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Wave height mobile (px)', 'twork-builder' ) }
							value={ waveHeightMobile }
							onChange={ ( val ) => setAttributes( { waveHeightMobile: val } ) }
							min={ 20 }
							max={ 220 }
							step={ 2 }
						/>
						<RangeControl
							label={ __( 'Wave opacity', 'twork-builder' ) }
							value={ waveOpacity }
							onChange={ ( val ) => setAttributes( { waveOpacity: val } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
						/>
						<ToggleControl
							label={ __( 'Flip wave horizontally', 'twork-builder' ) }
							checked={ !! waveFlipHorizontal }
							onChange={ ( val ) => setAttributes( { waveFlipHorizontal: val } ) }
						/>
						<ToggleControl
							label={ __( 'Flip wave vertically', 'twork-builder' ) }
							checked={ !! waveFlipVertical }
							onChange={ ( val ) => setAttributes( { waveFlipVertical: val } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } aria-labelledby="twork-why-choose-title">
				<div className="twork-why-choose__container" style={ containerStyle }>
					<div className="twork-why-choose__header">
						<p
							className="twork-why-choose__tagline"
							style={ { color: taglineColor, letterSpacing: taglineLetterSpacing } }
						>
							<span className="twork-why-choose__tagline-icon" style={ { color: taglineIconColor } } aria-hidden="true">{ taglineIcon }</span>
							<RichText tagName="span" value={ taglineText } onChange={ ( val ) => setAttributes( { taglineText: val } ) } placeholder={ __( 'Why Choose Our Farm', 'twork-builder' ) } allowedFormats={ [] } />
						</p>
						<RichText
							tagName="h2"
							id="twork-why-choose-title"
							className="twork-why-choose__title"
							value={ sectionTitle }
							onChange={ ( val ) => setAttributes( { sectionTitle: val } ) }
							placeholder={ __( 'Title…', 'twork-builder' ) }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
								lineHeight: titleLineHeight,
							} }
						/>
					</div>
					<div { ...innerBlocksProps }>
						<div
							className={ `twork-why-choose__center-media-wrapper has-animation-${ imageAnimationType }${
								enableParallax ? ' has-parallax' : ''
							}` }
							data-anim-type={ imageAnimationType || 'none' }
							data-hover-type={ hoverEffectType || 'none' }
						>
							{ ! centerMediaUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											centerMediaUrl: media.url,
											centerMediaId: media.id,
											centerMediaType: detectMediaType( media ),
											centerMediaAlt: media.alt || centerMediaAlt,
										} )
									}
									allowedTypes={ [ 'image', 'video' ] }
									multiple={ false }
									labels={ { title: __( 'Center media', 'twork-builder' ) } }
								/>
							) : (
								centerMediaType === 'video' ? (
									<video
										src={ centerMediaUrl }
										className="twork-why-choose__center-media"
										autoPlay={ !! videoAutoplay }
										loop={ !! videoLoop }
										muted={ !! videoMuted }
										playsInline
									/>
								) : (
									<img
										src={ centerMediaUrl }
										className="twork-why-choose__center-media"
										alt={ centerMediaAlt || '' }
									/>
								)
							) }
						</div>
						{ innerBlocksProps.children }
					</div>
				</div>
				<div
					className="twork-why-choose__shape-divider"
					aria-hidden="true"
				></div>
			</section>
		</>
	);
}
