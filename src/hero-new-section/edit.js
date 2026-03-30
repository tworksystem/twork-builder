import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
	ButtonGroup,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundType,
		backgroundImage,
		backgroundImageId,
		backgroundImageAlt,
		slideshowImages = [],
		slideshowInterval,
		slideshowStyle,
		slideshowImagePosition,
		backgroundVideoUrl,
		backgroundVideoId,
		videoPosterUrl,
		videoLoop,
		videoMuted,
		videoAutoplay,
		imageOpacity,
		imageScale,
		showOverlay,
		overlayGradientStart,
		overlayGradientMid,
		overlayGradientEnd,
		minHeight,
		minHeightTablet,
		minHeightMobile,
		taglineText,
		headingLine1,
		headingHighlight,
		headingLine2,
		headingHighlightColor,
		description,
		primaryButtonText,
		primaryButtonUrl,
		primaryButtonOpenInNewTab,
		showPrimaryButton = true,
		primaryButtonIconType = 'dashicon',
		primaryButtonIconValue = 'dashicons-arrow-right-alt2',
		primaryButtonIconImageUrl = '',
		primaryButtonIconImageId,
		primaryButtonIconPosition = 'right',
		primaryButtonBgColor = '',
		primaryButtonTextColor = '',
		primaryButtonBorderRadius = 6,
		primaryButtonPaddingV = 14,
		primaryButtonPaddingH = 32,
		primaryButtonFontSize = 0.85,
		primaryButtonHoverBgColor = '',
		primaryButtonHoverTextColor = '',
		secondaryButtonText,
		secondaryButtonUrl,
		secondaryButtonOpenInNewTab,
		showSecondaryButton = true,
		secondaryButtonIconType = 'dashicon',
		secondaryButtonIconValue = 'dashicons-admin-users',
		secondaryButtonIconImageUrl = '',
		secondaryButtonIconImageId,
		secondaryButtonIconPosition = 'right',
		secondaryButtonBgColor = '',
		secondaryButtonTextColor = '',
		secondaryButtonBorderRadius = 6,
		secondaryButtonPaddingV = 14,
		secondaryButtonPaddingH = 32,
		secondaryButtonFontSize = 0.85,
		secondaryButtonHoverBgColor = '',
		secondaryButtonHoverTextColor = '',
		showGlassCard,
		glassCardTitle,
		glassCardDescription,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
	} = attributes;

	const isImage = ! backgroundType || backgroundType === 'image';
	const isSlideshow = backgroundType === 'slideshow';
	const isVideo = backgroundType === 'video';

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-hero-new-section-editor hero-new',
			style: {
				position: 'relative',
				minHeight: `${ minHeight }px`,
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				backgroundColor: '#050505',
				color: '#fff',
			},
		} ),
		[ minHeight ]
	);

	const overlayStyle = showOverlay
		? {
				background: `linear-gradient(90deg, ${ overlayGradientStart } 0%, ${ overlayGradientMid } 40%, ${ overlayGradientEnd } 100%)`,
		  }
		: {};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Background Type', 'twork-builder' ) }
							value={ backgroundType || 'image' }
							options={ [
								{
									label: __(
										'Single Image / GIF',
										'twork-builder'
									),
									value: 'image',
								},
								{
									label: __(
										'Image Slideshow',
										'twork-builder'
									),
									value: 'slideshow',
								},
								{
									label: __( 'Video', 'twork-builder' ),
									value: 'video',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									backgroundType: val,
									// reset incompatible media fields when switching modes
									backgroundImage:
										val !== 'image'
											? backgroundImage
											: backgroundImage,
									backgroundImageId:
										val !== 'image'
											? backgroundImageId
											: backgroundImageId,
									backgroundImageAlt:
										val !== 'image'
											? backgroundImageAlt
											: backgroundImageAlt,
									backgroundVideoUrl:
										val !== 'video'
											? ''
											: backgroundVideoUrl,
									backgroundVideoId:
										val !== 'video'
											? null
											: backgroundVideoId,
								} )
							}
						/>

						{ isImage && (
							<>
								<BaseControl
									label={ __(
										'Background Image / GIF',
										'twork-builder'
									) }
								>
									{ ! backgroundImage ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													backgroundImage: media.url,
													backgroundImageId: media.id,
													backgroundImageAlt:
														media.alt || '',
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Background Image / GIF',
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
													height: 'auto',
													marginBottom: '10px',
												} }
											/>

											<TextControl
												label={ __(
													'Alt Text',
													'twork-builder'
												) }
												value={ backgroundImageAlt }
												onChange={ ( val ) =>
													setAttributes( {
														backgroundImageAlt: val,
													} )
												}
											/>

											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														backgroundImage: '',
														backgroundImageId: null,
														backgroundImageAlt: '',
													} )
												}
												style={ { marginTop: '8px' } }
											>
												{ __(
													'Remove Image',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</BaseControl>

								{ backgroundImage && (
									<>
										<Divider />
										<RangeControl
											label={ __(
												'Image Opacity',
												'twork-builder'
											) }
											value={ imageOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													imageOpacity: val,
												} )
											}
											min={ 0.1 }
											max={ 1 }
											step={ 0.05 }
										/>

										<RangeControl
											label={ __(
												'Image Scale',
												'twork-builder'
											) }
											value={ imageScale }
											onChange={ ( val ) =>
												setAttributes( {
													imageScale: val,
												} )
											}
											min={ 1 }
											max={ 1.5 }
											step={ 0.01 }
											help={ __(
												'Slight zoom for parallax feel',
												'twork-builder'
											) }
										/>
									</>
								) }
							</>
						) }

						{ isSlideshow && (
							<>
								<BaseControl
									label={ __(
										'Slideshow Images / GIFs',
										'twork-builder'
									) }
								>
									{ ! slideshowImages.length ? (
										<MediaPlaceholder
											onSelect={ ( media ) => {
												const items = Array.isArray(
													media
												)
													? media
													: [ media ];
												const mapped = items.map(
													( m ) => ( {
														url: m.url,
														id: m.id,
														alt: m.alt || '',
													} )
												);
												setAttributes( {
													slideshowImages: mapped,
												} );
											} }
											allowedTypes={ [ 'image' ] }
											multiple
											labels={ {
												title: __(
													'Select one or more images / GIFs',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<div
												style={ {
													display: 'flex',
													gap: 8,
													flexWrap: 'wrap',
													marginBottom: 8,
												} }
											>
												{ slideshowImages.map(
													( img, index ) => (
														<img
															key={ index }
															src={ img.url }
															alt={
																img.alt || ''
															}
															style={ {
																width: 72,
																height: 48,
																objectFit:
																	'cover',
																borderRadius: 4,
															} }
														/>
													)
												) }
											</div>
											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														slideshowImages: [],
													} )
												}
											>
												{ __(
													'Clear Slideshow Images',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</BaseControl>
								<RangeControl
									label={ __(
										'Slide Duration (ms)',
										'twork-builder'
									) }
									value={ slideshowInterval }
									onChange={ ( val ) =>
										setAttributes( {
											slideshowInterval: val,
										} )
									}
									min={ 2000 }
									max={ 15000 }
									step={ 500 }
									help={ __(
										'Time each slide stays visible.',
										'twork-builder'
									) }
								/>

								<SelectControl
									label={ __(
										'Slideshow style',
										'twork-builder'
									) }
									value={ slideshowStyle || 'fade' }
									options={ [
										{
											label: __(
												'Fade',
												'twork-builder'
											),
											value: 'fade',
										},
										{
											label: __(
												'Slide from left',
												'twork-builder'
											),
											value: 'slide-left',
										},
										{
											label: __(
												'Slide from right',
												'twork-builder'
											),
											value: 'slide-right',
										},
										{
											label: __(
												'Slide from top',
												'twork-builder'
											),
											value: 'slide-up',
										},
										{
											label: __(
												'Slide from bottom',
												'twork-builder'
											),
											value: 'slide-down',
										},
										{
											label: __(
												'Zoom',
												'twork-builder'
											),
											value: 'zoom',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											slideshowStyle: val || 'fade',
										} )
									}
								/>

								<SelectControl
									label={ __(
										'Image position',
										'twork-builder'
									) }
									value={ slideshowImagePosition || 'center' }
									options={ [
										{
											label: __( 'Top', 'twork-builder' ),
											value: 'top',
										},
										{
											label: __(
												'Center',
												'twork-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Bottom',
												'twork-builder'
											),
											value: 'bottom',
										},
										{
											label: __(
												'Left',
												'twork-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Right',
												'twork-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											slideshowImagePosition:
												val || 'center',
										} )
									}
									help={ __(
										'Where to anchor the image within the hero (e.g. faces at top).',
										'twork-builder'
									) }
								/>
							</>
						) }

						{ isVideo && (
							<>
								<BaseControl
									label={ __(
										'Background Video',
										'twork-builder'
									) }
								>
									{ ! backgroundVideoUrl ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													backgroundVideoUrl:
														media.url,
													backgroundVideoId: media.id,
													videoPosterUrl:
														media.image?.src ||
														videoPosterUrl ||
														'',
												} )
											}
											allowedTypes={ [ 'video' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Background Video',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<video
												src={ backgroundVideoUrl }
												muted
												playsInline
												style={ {
													width: '100%',
													maxHeight: 180,
													objectFit: 'cover',
													borderRadius: 6,
													marginBottom: 10,
												} }
											/>

											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														backgroundVideoUrl: '',
														backgroundVideoId: null,
														videoPosterUrl: '',
													} )
												}
											>
												{ __(
													'Remove Video',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</BaseControl>
								<ToggleControl
									label={ __( 'Loop', 'twork-builder' ) }
									checked={ videoLoop }
									onChange={ ( val ) =>
										setAttributes( { videoLoop: val } )
									}
								/>

								<ToggleControl
									label={ __( 'Muted', 'twork-builder' ) }
									checked={ videoMuted }
									onChange={ ( val ) =>
										setAttributes( { videoMuted: val } )
									}
									help={ __(
										'Muted is required for autoplay in most browsers.',
										'twork-builder'
									) }
								/>

								<ToggleControl
									label={ __( 'Autoplay', 'twork-builder' ) }
									checked={ videoAutoplay }
									onChange={ ( val ) =>
										setAttributes( { videoAutoplay: val } )
									}
								/>
							</>
						) }

						<Divider />
						<ToggleControl
							label={ __( 'Show Overlay', 'twork-builder' ) }
							checked={ showOverlay }
							onChange={ ( val ) =>
								setAttributes( { showOverlay: val } )
							}
						/>

						{ showOverlay && (
							<>
								<PanelColorSettings
									title={ __(
										'Overlay Start (left)',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: overlayGradientStart,
											onChange: ( val ) =>
												setAttributes( {
													overlayGradientStart: val,
												} ),
											label: __(
												'Start',
												'twork-builder'
											),
										},
									] }
								/>

								<PanelColorSettings
									title={ __(
										'Overlay Mid',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: overlayGradientMid,
											onChange: ( val ) =>
												setAttributes( {
													overlayGradientMid: val,
												} ),
											label: __( 'Mid', 'twork-builder' ),
										},
									] }
								/>

								<PanelColorSettings
									title={ __(
										'Overlay End (right)',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: overlayGradientEnd,
											onChange: ( val ) =>
												setAttributes( {
													overlayGradientEnd: val,
												} ),
											label: __( 'End', 'twork-builder' ),
										},
									] }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Height', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min Height Desktop (px)',
								'twork-builder'
							) }
							value={ minHeight }
							onChange={ ( val ) =>
								setAttributes( { minHeight: val } )
							}
							min={ 400 }
							max={ 1000 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Min Height Tablet (px)',
								'twork-builder'
							) }
							value={ minHeightTablet }
							onChange={ ( val ) =>
								setAttributes( { minHeightTablet: val } )
							}
							min={ 350 }
							max={ 800 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Min Height Mobile (px)',
								'twork-builder'
							) }
							value={ minHeightMobile }
							onChange={ ( val ) =>
								setAttributes( { minHeightMobile: val } )
							}
							min={ 300 }
							max={ 600 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline & Heading', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Tagline', 'twork-builder' ) }
							value={ taglineText }
							onChange={ ( val ) =>
								setAttributes( { taglineText: val } )
							}
							help={ __(
								'e.g. Centres of Excellence / Heart Centre',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Heading Line 1', 'twork-builder' ) }
							value={ headingLine1 }
							onChange={ ( val ) =>
								setAttributes( { headingLine1: val } )
							}
						/>

						<TextControl
							label={ __(
								'Heading Highlight (orange)',
								'twork-builder'
							) }
							value={ headingHighlight }
							onChange={ ( val ) =>
								setAttributes( { headingHighlight: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Highlight Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: headingHighlightColor,
									onChange: ( val ) =>
										setAttributes( {
											headingHighlightColor: val,
										} ),
									label: __( 'Color', 'twork-builder' ),
								},
							] }
						/>

						<TextControl
							label={ __( 'Heading Line 2', 'twork-builder' ) }
							value={ headingLine2 }
							onChange={ ( val ) =>
								setAttributes( { headingLine2: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Hero Description', 'twork-builder' ) }
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							multiline
							rows={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Primary Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show primary button',
								'twork-builder'
							) }
							checked={ showPrimaryButton }
							onChange={ ( val ) =>
								setAttributes( { showPrimaryButton: val } )
							}
							help={ __(
								'Toggle the primary CTA button on/off.',
								'twork-builder'
							) }
						/>

						{ showPrimaryButton && (
							<>
								<TextControl
									label={ __(
										'Button Text',
										'twork-builder'
									) }
									value={ primaryButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonText: val,
										} )
									}
								/>

								<BaseControl
									label={ __( 'URL', 'twork-builder' ) }
								>
									<URLInput
										value={ primaryButtonUrl }
										onChange={ ( val ) =>
											setAttributes( {
												primaryButtonUrl: val,
											} )
										}
									/>
								</BaseControl>
								<ToggleControl
									label={ __(
										'Open in new tab',
										'twork-builder'
									) }
									checked={ primaryButtonOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonOpenInNewTab: val,
										} )
									}
								/>

								<Divider />
								<SelectControl
									label={ __(
										'Button icon',
										'twork-builder'
									) }
									value={ primaryButtonIconType }
									options={ [
										{
											label: __(
												'None',
												'twork-builder'
											),
											value: 'none',
										},
										{
											label: __(
												'WordPress icon (Dashicons)',
												'twork-builder'
											),
											value: 'dashicon',
										},
										{
											label: __(
												'Image / GIF',
												'twork-builder'
											),
											value: 'image',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonIconType: val,
										} )
									}
								/>

								{ primaryButtonIconType === 'dashicon' && (
									<TextControl
										label={ __(
											'Dashicon class',
											'twork-builder'
										) }
										value={ primaryButtonIconValue }
										onChange={ ( val ) =>
											setAttributes( {
												primaryButtonIconValue: val,
											} )
										}
										help={ __(
											'e.g. dashicons-arrow-right-alt2, dashicons-admin-users',
											'twork-builder'
										) }
									/>
								) }
								{ primaryButtonIconType === 'image' && (
									<BaseControl
										label={ __(
											'Icon image / GIF',
											'twork-builder'
										) }
									>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) =>
													setAttributes( {
														primaryButtonIconImageUrl:
															media.url,
														primaryButtonIconImageId:
															media.id,
													} )
												}
												allowedTypes={ [ 'image' ] }
												value={
													primaryButtonIconImageId
												}
												render={ ( { open } ) => (
													<>
														{ primaryButtonIconImageUrl ? (
															<div
																style={ {
																	marginBottom: 8,
																} }
															>
																<img
																	src={
																		primaryButtonIconImageUrl
																	}
																	alt=""
																	style={ {
																		maxWidth:
																			'100%',
																		height: 32,
																		objectFit:
																			'contain',
																	} }
																/>

																<div
																	style={ {
																		marginTop: 8,
																		display:
																			'flex',
																		gap: 8,
																	} }
																>
																	<Button
																		variant="primary"
																		onClick={
																			open
																		}
																	>
																		{ __(
																			'Replace',
																			'twork-builder'
																		) }
																	</Button>
																	<Button
																		variant="secondary"
																		isDestructive
																		onClick={ () =>
																			setAttributes(
																				{
																					primaryButtonIconImageUrl:
																						'',
																					primaryButtonIconImageId:
																						null,
																				}
																			)
																		}
																	>
																		{ __(
																			'Remove',
																			'twork-builder'
																		) }
																	</Button>
																</div>
															</div>
														) : (
															<Button
																variant="secondary"
																onClick={ open }
																style={ {
																	width: '100%',
																} }
															>
																{ __(
																	'Choose image or GIF',
																	'twork-builder'
																) }
															</Button>
														) }
													</>
												) }
											/>
										</MediaUploadCheck>
									</BaseControl>
								) }
								{ ( primaryButtonIconType === 'dashicon' ||
									primaryButtonIconType === 'image' ) && (
									<BaseControl
										label={ __(
											'Icon position',
											'twork-builder'
										) }
									>
										<ButtonGroup>
											<Button
												isPressed={
													primaryButtonIconPosition ===
													'left'
												}
												onClick={ () =>
													setAttributes( {
														primaryButtonIconPosition:
															'left',
													} )
												}
											>
												{ __(
													'Left',
													'twork-builder'
												) }
											</Button>
											<Button
												isPressed={
													primaryButtonIconPosition ===
													'right'
												}
												onClick={ () =>
													setAttributes( {
														primaryButtonIconPosition:
															'right',
													} )
												}
											>
												{ __(
													'Right',
													'twork-builder'
												) }
											</Button>
										</ButtonGroup>
									</BaseControl>
								) }
								<Divider />
								<PanelColorSettings
									title={ __(
										'Primary button colors',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: primaryButtonBgColor,
											onChange: ( val ) =>
												setAttributes( {
													primaryButtonBgColor: val,
												} ),
											label: __(
												'Background',
												'twork-builder'
											),
										},
										{
											value: primaryButtonTextColor,
											onChange: ( val ) =>
												setAttributes( {
													primaryButtonTextColor: val,
												} ),
											label: __(
												'Text',
												'twork-builder'
											),
										},
										{
											value: primaryButtonHoverBgColor,
											onChange: ( val ) =>
												setAttributes( {
													primaryButtonHoverBgColor:
														val,
												} ),
											label: __(
												'Hover background',
												'twork-builder'
											),
										},
										{
											value: primaryButtonHoverTextColor,
											onChange: ( val ) =>
												setAttributes( {
													primaryButtonHoverTextColor:
														val,
												} ),
											label: __(
												'Hover text',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Border radius (px)',
										'twork-builder'
									) }
									value={ primaryButtonBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding vertical (px)',
										'twork-builder'
									) }
									value={ primaryButtonPaddingV }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonPaddingV: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding horizontal (px)',
										'twork-builder'
									) }
									value={ primaryButtonPaddingH }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonPaddingH: val,
										} )
									}
									min={ 8 }
									max={ 80 }
									step={ 2 }
								/>

								<RangeControl
									label={ __(
										'Font size (rem)',
										'twork-builder'
									) }
									value={ primaryButtonFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											primaryButtonFontSize: val,
										} )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Secondary Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show secondary button',
								'twork-builder'
							) }
							checked={ showSecondaryButton }
							onChange={ ( val ) =>
								setAttributes( { showSecondaryButton: val } )
							}
							help={ __(
								'Toggle the secondary CTA button on/off.',
								'twork-builder'
							) }
						/>

						{ showSecondaryButton && (
							<>
								<TextControl
									label={ __(
										'Button Text',
										'twork-builder'
									) }
									value={ secondaryButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonText: val,
										} )
									}
								/>

								<BaseControl
									label={ __( 'URL', 'twork-builder' ) }
								>
									<URLInput
										value={ secondaryButtonUrl }
										onChange={ ( val ) =>
											setAttributes( {
												secondaryButtonUrl: val,
											} )
										}
									/>
								</BaseControl>
								<ToggleControl
									label={ __(
										'Open in new tab',
										'twork-builder'
									) }
									checked={ secondaryButtonOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonOpenInNewTab: val,
										} )
									}
								/>

								<Divider />
								<SelectControl
									label={ __(
										'Button icon',
										'twork-builder'
									) }
									value={ secondaryButtonIconType }
									options={ [
										{
											label: __(
												'None',
												'twork-builder'
											),
											value: 'none',
										},
										{
											label: __(
												'WordPress icon (Dashicons)',
												'twork-builder'
											),
											value: 'dashicon',
										},
										{
											label: __(
												'Image / GIF',
												'twork-builder'
											),
											value: 'image',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonIconType: val,
										} )
									}
								/>

								{ secondaryButtonIconType === 'dashicon' && (
									<TextControl
										label={ __(
											'Dashicon class',
											'twork-builder'
										) }
										value={ secondaryButtonIconValue }
										onChange={ ( val ) =>
											setAttributes( {
												secondaryButtonIconValue: val,
											} )
										}
										help={ __(
											'e.g. dashicons-arrow-right-alt2, dashicons-admin-users',
											'twork-builder'
										) }
									/>
								) }
								{ secondaryButtonIconType === 'image' && (
									<BaseControl
										label={ __(
											'Icon image / GIF',
											'twork-builder'
										) }
									>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) =>
													setAttributes( {
														secondaryButtonIconImageUrl:
															media.url,
														secondaryButtonIconImageId:
															media.id,
													} )
												}
												allowedTypes={ [ 'image' ] }
												value={
													secondaryButtonIconImageId
												}
												render={ ( { open } ) => (
													<>
														{ secondaryButtonIconImageUrl ? (
															<div
																style={ {
																	marginBottom: 8,
																} }
															>
																<img
																	src={
																		secondaryButtonIconImageUrl
																	}
																	alt=""
																	style={ {
																		maxWidth:
																			'100%',
																		height: 32,
																		objectFit:
																			'contain',
																	} }
																/>

																<div
																	style={ {
																		marginTop: 8,
																		display:
																			'flex',
																		gap: 8,
																	} }
																>
																	<Button
																		variant="primary"
																		onClick={
																			open
																		}
																	>
																		{ __(
																			'Replace',
																			'twork-builder'
																		) }
																	</Button>
																	<Button
																		variant="secondary"
																		isDestructive
																		onClick={ () =>
																			setAttributes(
																				{
																					secondaryButtonIconImageUrl:
																						'',
																					secondaryButtonIconImageId:
																						null,
																				}
																			)
																		}
																	>
																		{ __(
																			'Remove',
																			'twork-builder'
																		) }
																	</Button>
																</div>
															</div>
														) : (
															<Button
																variant="secondary"
																onClick={ open }
																style={ {
																	width: '100%',
																} }
															>
																{ __(
																	'Choose image or GIF',
																	'twork-builder'
																) }
															</Button>
														) }
													</>
												) }
											/>
										</MediaUploadCheck>
									</BaseControl>
								) }
								{ ( secondaryButtonIconType === 'dashicon' ||
									secondaryButtonIconType === 'image' ) && (
									<BaseControl
										label={ __(
											'Icon position',
											'twork-builder'
										) }
									>
										<ButtonGroup>
											<Button
												isPressed={
													secondaryButtonIconPosition ===
													'left'
												}
												onClick={ () =>
													setAttributes( {
														secondaryButtonIconPosition:
															'left',
													} )
												}
											>
												{ __(
													'Left',
													'twork-builder'
												) }
											</Button>
											<Button
												isPressed={
													secondaryButtonIconPosition ===
													'right'
												}
												onClick={ () =>
													setAttributes( {
														secondaryButtonIconPosition:
															'right',
													} )
												}
											>
												{ __(
													'Right',
													'twork-builder'
												) }
											</Button>
										</ButtonGroup>
									</BaseControl>
								) }
								<Divider />
								<PanelColorSettings
									title={ __(
										'Secondary button colors',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: secondaryButtonBgColor,
											onChange: ( val ) =>
												setAttributes( {
													secondaryButtonBgColor: val,
												} ),
											label: __(
												'Background',
												'twork-builder'
											),
										},
										{
											value: secondaryButtonTextColor,
											onChange: ( val ) =>
												setAttributes( {
													secondaryButtonTextColor:
														val,
												} ),
											label: __(
												'Text',
												'twork-builder'
											),
										},
										{
											value: secondaryButtonHoverBgColor,
											onChange: ( val ) =>
												setAttributes( {
													secondaryButtonHoverBgColor:
														val,
												} ),
											label: __(
												'Hover background',
												'twork-builder'
											),
										},
										{
											value: secondaryButtonHoverTextColor,
											onChange: ( val ) =>
												setAttributes( {
													secondaryButtonHoverTextColor:
														val,
												} ),
											label: __(
												'Hover text',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Border radius (px)',
										'twork-builder'
									) }
									value={ secondaryButtonBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding vertical (px)',
										'twork-builder'
									) }
									value={ secondaryButtonPaddingV }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonPaddingV: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Padding horizontal (px)',
										'twork-builder'
									) }
									value={ secondaryButtonPaddingH }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonPaddingH: val,
										} )
									}
									min={ 8 }
									max={ 80 }
									step={ 2 }
								/>

								<RangeControl
									label={ __(
										'Font size (rem)',
										'twork-builder'
									) }
									value={ secondaryButtonFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											secondaryButtonFontSize: val,
										} )
									}
									min={ 0.6 }
									max={ 1.5 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Glass Card', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Glass Card', 'twork-builder' ) }
							checked={ showGlassCard }
							onChange={ ( val ) =>
								setAttributes( { showGlassCard: val } )
							}
						/>

						{ showGlassCard && (
							<>
								<TextControl
									label={ __(
										'Card Title',
										'twork-builder'
									) }
									value={ glassCardTitle }
									onChange={ ( val ) =>
										setAttributes( { glassCardTitle: val } )
									}
								/>

								<TextControl
									label={ __(
										'Card Description',
										'twork-builder'
									) }
									value={ glassCardDescription }
									onChange={ ( val ) =>
										setAttributes( {
											glassCardDescription: val,
										} )
									}
									multiline
									rows={ 2 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Padding (px)', 'twork-builder' ) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation (gsap-reveal)',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				{ /* Background preview in editor */ }
				{ isImage && backgroundImage && (
					<img
						src={ backgroundImage }
						alt={ backgroundImageAlt || '' }
						className="hero-bg-img"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'top center',
							zIndex: 0,
							opacity: imageOpacity,
							transform: `scale(${ imageScale })`,
						} }
					/>
				) }

				{ isSlideshow &&
					slideshowImages?.length > 0 &&
					( () => {
						const posMap = {
							top: 'center top',
							center: 'center center',
							bottom: 'center bottom',
							left: 'left center',
							right: 'right center',
						};
						const objectPos =
							posMap[ slideshowImagePosition ] || 'center center';
						return (
							<img
								src={ slideshowImages[ 0 ].url }
								alt={ slideshowImages[ 0 ].alt || '' }
								className="hero-bg-img"
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									objectPosition: objectPos,
									zIndex: 0,
									opacity: imageOpacity,
									transform: `scale(${ imageScale })`,
								} }
							/>
						);
					} )() }

				{ isVideo && backgroundVideoUrl && (
					<video
						src={ backgroundVideoUrl }
						className="hero-bg-video"
						muted={ videoMuted }
						playsInline
						autoPlay={ videoAutoplay }
						loop={ videoLoop }
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							zIndex: 0,
						} }
					/>
				) }

				{ showOverlay && (
					<div
						className="hero-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							zIndex: 1,
							...overlayStyle,
						} }
					/>
				) }

				<div
					className="hero-content-wrapper"
					style={ {
						position: 'relative',
						zIndex: 2,
						width: '100%',
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
						display: 'flex',
						justifyContent: 'space-between',
						alignContent: 'center',
						flexWrap: 'wrap',
					} }
				>
					<div
						className="hero-text-col gsap-reveal"
						style={ {
							flex: 1,
							maxWidth: '650px',
							color: '#fff',
							paddingRight: '40px',
							opacity: 1,
							visibility: 'visible',
						} }
					>
						<div className="top-tagline">
							<span className="dot" />
							<span
								dangerouslySetInnerHTML={ {
									__html: taglineText || '',
								} }
							/>
						</div>
						<h1
							className="main-heading"
							style={ { margin: '0 0 30px 0' } }
						>
							<RichText
								tagName="span"
								value={ headingLine1 }
								onChange={ ( val ) =>
									setAttributes( { headingLine1: val } )
								}
								placeholder={ __( 'Line 1', 'twork-builder' ) }
								multiline={ false }
							/>
							<br />
							<RichText
								tagName="span"
								value={ headingHighlight }
								onChange={ ( val ) =>
									setAttributes( { headingHighlight: val } )
								}
								placeholder={ __(
									'Highlight',
									'twork-builder'
								) }
								multiline={ false }
								style={ { color: headingHighlightColor } }
								className="text-orange"
							/>{ ' ' }
							<RichText
								tagName="span"
								value={ headingLine2 }
								onChange={ ( val ) =>
									setAttributes( { headingLine2: val } )
								}
								placeholder={ __( 'Line 2', 'twork-builder' ) }
								multiline={ false }
							/>
						</h1>
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Description...',
								'twork-builder'
							) }
							className="hero-desc"
						/>

						{ ( showPrimaryButton || showSecondaryButton ) && (
							<div className="hero-btns">
								{ showPrimaryButton && (
									<a
										href={ primaryButtonUrl }
										className="jivaka-btn btn-primary hero-btn-primary"
										style={ {
											pointerEvents: 'none',
											...( primaryButtonBgColor && {
												backgroundColor:
													primaryButtonBgColor,
											} ),
											...( primaryButtonTextColor && {
												color: primaryButtonTextColor,
											} ),
											borderRadius: `${ primaryButtonBorderRadius }px`,
											padding: `${ primaryButtonPaddingV }px ${ primaryButtonPaddingH }px`,
											fontSize: `${ primaryButtonFontSize }rem`,
										} }
										data-hover-bg={
											primaryButtonHoverBgColor ||
											undefined
										}
										data-hover-color={
											primaryButtonHoverTextColor ||
											undefined
										}
									>
										{ primaryButtonIconType ===
											'dashicon' &&
											primaryButtonIconPosition ===
												'left' &&
											primaryButtonIconValue && (
												<span
													className={ `dashicons ${ primaryButtonIconValue }` }
													aria-hidden="true"
													style={ {
														fontSize: '1.2em',
														width: '1.2em',
														height: '1.2em',
													} }
												/>
											) }
										{ primaryButtonIconType === 'image' &&
											primaryButtonIconPosition ===
												'left' &&
											primaryButtonIconImageUrl && (
												<img
													src={
														primaryButtonIconImageUrl
													}
													alt=""
													className="hero-btn-icon"
													aria-hidden="true"
												/>
											) }
										<span>{ primaryButtonText }</span>
										{ primaryButtonIconType ===
											'dashicon' &&
											primaryButtonIconPosition ===
												'right' &&
											primaryButtonIconValue && (
												<span
													className={ `dashicons ${ primaryButtonIconValue }` }
													aria-hidden="true"
													style={ {
														fontSize: '1.2em',
														width: '1.2em',
														height: '1.2em',
													} }
												/>
											) }
										{ primaryButtonIconType === 'image' &&
											primaryButtonIconPosition ===
												'right' &&
											primaryButtonIconImageUrl && (
												<img
													src={
														primaryButtonIconImageUrl
													}
													alt=""
													className="hero-btn-icon"
													aria-hidden="true"
												/>
											) }
									</a>
								) }
								{ showSecondaryButton && (
									<a
										href={ secondaryButtonUrl }
										className="jivaka-btn btn-glass hero-btn-secondary"
										style={ {
											pointerEvents: 'none',
											...( secondaryButtonBgColor && {
												backgroundColor:
													secondaryButtonBgColor,
											} ),
											...( secondaryButtonTextColor && {
												color: secondaryButtonTextColor,
											} ),
											borderRadius: `${ secondaryButtonBorderRadius }px`,
											padding: `${ secondaryButtonPaddingV }px ${ secondaryButtonPaddingH }px`,
											fontSize: `${ secondaryButtonFontSize }rem`,
										} }
										data-hover-bg={
											secondaryButtonHoverBgColor ||
											undefined
										}
										data-hover-color={
											secondaryButtonHoverTextColor ||
											undefined
										}
									>
										{ secondaryButtonIconType ===
											'dashicon' &&
											secondaryButtonIconPosition ===
												'left' &&
											secondaryButtonIconValue && (
												<span
													className={ `dashicons ${ secondaryButtonIconValue }` }
													aria-hidden="true"
													style={ {
														fontSize: '1.2em',
														width: '1.2em',
														height: '1.2em',
													} }
												/>
											) }
										{ secondaryButtonIconType === 'image' &&
											secondaryButtonIconPosition ===
												'left' &&
											secondaryButtonIconImageUrl && (
												<img
													src={
														secondaryButtonIconImageUrl
													}
													alt=""
													className="hero-btn-icon"
													aria-hidden="true"
												/>
											) }
										<span>{ secondaryButtonText }</span>
										{ secondaryButtonIconType ===
											'dashicon' &&
											secondaryButtonIconPosition ===
												'right' &&
											secondaryButtonIconValue && (
												<span
													className={ `dashicons ${ secondaryButtonIconValue }` }
													aria-hidden="true"
													style={ {
														fontSize: '1.2em',
														width: '1.2em',
														height: '1.2em',
													} }
												/>
											) }
										{ secondaryButtonIconType === 'image' &&
											secondaryButtonIconPosition ===
												'right' &&
											secondaryButtonIconImageUrl && (
												<img
													src={
														secondaryButtonIconImageUrl
													}
													alt=""
													className="hero-btn-icon"
													aria-hidden="true"
												/>
											) }
									</a>
								) }
							</div>
						) }
					</div>

					{ showGlassCard && (
						<div
							className="glass-card-col gsap-reveal"
							style={ {
								flex: '0 0 320px',
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: '30px',
								opacity: 1,
								visibility: 'visible',
							} }
						>
							<div className="glass-card">
								<RichText
									tagName="h3"
									value={ glassCardTitle }
									onChange={ ( val ) =>
										setAttributes( { glassCardTitle: val } )
									}
									placeholder={ __(
										'e.g. 24/7',
										'twork-builder'
									) }
								/>

								<RichText
									tagName="p"
									value={ glassCardDescription }
									onChange={ ( val ) =>
										setAttributes( {
											glassCardDescription: val,
										} )
									}
									placeholder={ __(
										'Card description...',
										'twork-builder'
									) }
								/>
							</div>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
