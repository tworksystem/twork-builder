import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { getMediaColumnStyle, normalizeMediaSlides } from './media-helpers';

const DEFAULT_OPTION = {
	value: '',
	label: __( 'Select Department', 'twork-builder' ),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		metaTitle,
		mainTitleLine1,
		mainTitleHighlight,
		mainTitleLine2,
		mainDescription,
		subText,
		iconClass,
		bookingMetaTitle,
		bookingTitle,
		bookingDescription,
		selectOptions,
		selectName,
		selectAriaLabel,
		showBookButton = true,
		bookButtonText,
		bookButtonOpenInNewTab,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		highlightColor,
		cardBgColor,
		cardBorderColor,
		cardPadding,
		bookingTitleColor,
		rightColumnMode = 'booking',
		showDepartmentDropdown = true,
		mediaType = 'image',
		mediaImage,
		mediaImageId,
		mediaImageAlt,
		slideshowImages = [],
		slideshowInterval,
		mediaVideoUrl,
		mediaVideoId,
		videoPosterUrl,
		videoLoop,
		videoMuted,
		videoAutoplay,
		mediaBorderRadius,
	} = attributes;

	const isBookingMode = ! rightColumnMode || rightColumnMode === 'booking';
	const isMediaMode = rightColumnMode === 'media';
	const isImageMedia = ! mediaType || mediaType === 'image';
	const isSlideshowMedia = mediaType === 'slideshow';
	const isVideoMedia = mediaType === 'video';
	const mediaSlides = normalizeMediaSlides( slideshowImages );
	const mediaColumnStyle = getMediaColumnStyle( mediaBorderRadius );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-help-section-editor help-section jivaka-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				width: '100%',
				boxSizing: 'border-box',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		width: '100%',
		boxSizing: 'border-box',
		'--help-container-max': `${ containerMaxWidth }px`,
		'--help-container-padding': `${ containerPadding }px`,
	};

	const gridStyle = {
		gap: `${ gridGap }px`,
		'--help-grid-gap': `${ gridGap }px`,
	};

	const leftColumnStyle = {
		flex: '0 1 55%',
		minWidth: 0,
		boxSizing: 'border-box',
	};

	const rightColumnStyle = {
		flex: '0 1 45%',
		minWidth: 0,
		boxSizing: 'border-box',
	};

	const cardStyle = {
		backgroundColor: cardBgColor,
		border: `1px solid ${ cardBorderColor }`,
		padding: `${ cardPadding }px`,
		borderRadius: '5px',
	};

	const addSelectOption = () => {
		const next = [ ...( selectOptions || [] ) ];
		next.push( {
			value: `opt-${ Date.now() }`,
			label: __( 'New option', 'twork-builder' ),
			bookUrl: '',
		} );
		setAttributes( { selectOptions: next } );
	};

	const updateSelectOption = ( index, field, value ) => {
		const next = [ ...( selectOptions || [] ) ];
		if ( ! next[ index ] ) {
			next[ index ] = { value: '', label: '' };
		}
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes( { selectOptions: next } );
	};

	const removeSelectOption = ( index ) => {
		const next = ( selectOptions || [] ).filter( ( _, i ) => i !== index );
		setAttributes( {
			selectOptions: next.length ? next : [ DEFAULT_OPTION ],
		} );
	};

	const options =
		Array.isArray( selectOptions ) && selectOptions.length
			? selectOptions
			: [ DEFAULT_OPTION ];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Left column (Intro)', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Meta title', 'twork-builder' ) }
							value={ metaTitle }
							onChange={ ( v ) =>
								setAttributes( { metaTitle: v } )
							}
						/>

						<TextControl
							label={ __( 'Title line 1', 'twork-builder' ) }
							value={ mainTitleLine1 }
							onChange={ ( v ) =>
								setAttributes( { mainTitleLine1: v } )
							}
						/>

						<TextControl
							label={ __(
								'Title highlight word',
								'twork-builder'
							) }
							value={ mainTitleHighlight }
							onChange={ ( v ) =>
								setAttributes( { mainTitleHighlight: v } )
							}
						/>

						<TextControl
							label={ __( 'Title line 2', 'twork-builder' ) }
							value={ mainTitleLine2 }
							onChange={ ( v ) =>
								setAttributes( { mainTitleLine2: v } )
							}
						/>

						<TextControl
							label={ __( 'Main description', 'twork-builder' ) }
							value={ mainDescription }
							onChange={ ( v ) =>
								setAttributes( { mainDescription: v } )
							}
							multiline
							rows={ 4 }
						/>

						<TextControl
							label={ __(
								'Sub text (with icon)',
								'twork-builder'
							) }
							value={ subText }
							onChange={ ( v ) =>
								setAttributes( { subText: v } )
							}
						/>

						<TextControl
							label={ __(
								'Icon class (e.g. fas fa-mobile-alt)',
								'twork-builder'
							) }
							value={ iconClass }
							onChange={ ( v ) =>
								setAttributes( { iconClass: v } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Right column', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column content', 'twork-builder' ) }
							value={ rightColumnMode || 'booking' }
							options={ [
								{
									label: __(
										'Easy Access (Booking card)',
										'twork-builder'
									),
									value: 'booking',
								},
								{
									label: __(
										'Media (Image / GIF / Slider / Video)',
										'twork-builder'
									),
									value: 'media',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									rightColumnMode: val || 'booking',
								} )
							}
						/>

						{ isMediaMode && (
							<>
								<SelectControl
									label={ __(
										'Media type',
										'twork-builder'
									) }
									value={ mediaType || 'image' }
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
											label: __(
												'Video',
												'twork-builder'
											),
											value: 'video',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											mediaType: val || 'image',
										} )
									}
								/>

								{ isImageMedia && (
									<BaseControl
										label={ __(
											'Image / GIF',
											'twork-builder'
										) }
									>
										{ ! mediaImage ? (
											<MediaPlaceholder
												onSelect={ ( media ) =>
													setAttributes( {
														mediaImage: media.url,
														mediaImageId: media.id,
														mediaImageAlt:
															media.alt || '',
													} )
												}
												allowedTypes={ [ 'image' ] }
												multiple={ false }
												labels={ {
													title: __(
														'Upload image or GIF',
														'twork-builder'
													),
												} }
											/>
										) : (
											<div>
												<img
													src={ mediaImage }
													alt=""
													style={ {
														width: '100%',
														height: 'auto',
														marginBottom: 10,
														borderRadius: 8,
													} }
												/>
												<TextControl
													label={ __(
														'Alt text',
														'twork-builder'
													) }
													value={ mediaImageAlt }
													onChange={ ( val ) =>
														setAttributes( {
															mediaImageAlt: val,
														} )
													}
												/>
												<Button
													isSecondary
													isSmall
													onClick={ () =>
														setAttributes( {
															mediaImage: '',
															mediaImageId: null,
															mediaImageAlt: '',
														} )
													}
												>
													{ __(
														'Remove image',
														'twork-builder'
													) }
												</Button>
											</div>
										) }
									</BaseControl>
								) }

								{ isSlideshowMedia && (
									<BaseControl
										label={ __(
											'Slideshow images / GIFs',
											'twork-builder'
										) }
									>
										{ ! slideshowImages?.length ? (
											<MediaPlaceholder
												onSelect={ ( media ) => {
													const items = Array.isArray(
														media
													)
														? media
														: [ media ];
													setAttributes( {
														slideshowImages:
															items.map(
																( m ) => ( {
																	url: m.url,
																	id: m.id,
																	alt:
																		m.alt ||
																		'',
																} )
															),
													} );
												} }
												allowedTypes={ [ 'image' ] }
												multiple
												labels={ {
													title: __(
														'Select slideshow images',
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
																	img.alt ||
																	''
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
														'Clear slideshow',
														'twork-builder'
													) }
												</Button>
											</div>
										) }
									</BaseControl>
								) }

								{ isSlideshowMedia &&
									slideshowImages?.length > 0 && (
										<RangeControl
											label={ __(
												'Slide duration (ms)',
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
										/>
									) }

								{ isVideoMedia && (
									<BaseControl
										label={ __( 'Video', 'twork-builder' ) }
									>
										{ ! mediaVideoUrl ? (
											<MediaPlaceholder
												onSelect={ ( media ) =>
													setAttributes( {
														mediaVideoUrl:
															media.url,
														mediaVideoId: media.id,
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
														'Upload video',
														'twork-builder'
													),
												} }
											/>
										) : (
											<div>
												<video
													src={ mediaVideoUrl }
													muted
													playsInline
													style={ {
														width: '100%',
														maxHeight: 180,
														objectFit: 'cover',
														borderRadius: 8,
														marginBottom: 10,
													} }
												/>
												<Button
													isSecondary
													isSmall
													onClick={ () =>
														setAttributes( {
															mediaVideoUrl: '',
															mediaVideoId: null,
															videoPosterUrl: '',
														} )
													}
												>
													{ __(
														'Remove video',
														'twork-builder'
													) }
												</Button>
											</div>
										) }
									</BaseControl>
								) }

								{ isVideoMedia && mediaVideoUrl && (
									<>
										<ToggleControl
											label={ __(
												'Loop',
												'twork-builder'
											) }
											checked={ videoLoop }
											onChange={ ( val ) =>
												setAttributes( {
													videoLoop: val,
												} )
											}
										/>
										<ToggleControl
											label={ __(
												'Muted',
												'twork-builder'
											) }
											checked={ videoMuted }
											onChange={ ( val ) =>
												setAttributes( {
													videoMuted: val,
												} )
											}
										/>
										<ToggleControl
											label={ __(
												'Autoplay',
												'twork-builder'
											) }
											checked={ videoAutoplay }
											onChange={ ( val ) =>
												setAttributes( {
													videoAutoplay: val,
												} )
											}
										/>
									</>
								) }

								<RangeControl
									label={ __(
										'Media border radius (px)',
										'twork-builder'
									) }
									value={ mediaBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											mediaBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 1 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Booking card', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ isBookingMode && (
							<ToggleControl
								label={ __(
									'Show department dropdown',
									'twork-builder'
								) }
								checked={ showDepartmentDropdown }
								onChange={ ( val ) =>
									setAttributes( {
										showDepartmentDropdown: val,
									} )
								}
								help={ __(
									'Toggle the department select on/off in the booking card.',
									'twork-builder'
								) }
							/>
						) }

						{ ! isBookingMode && (
							<p style={ { marginTop: 0, color: '#757575' } }>
								{ __(
									'Switch column content to “Easy Access (Booking card)” to edit booking fields.',
									'twork-builder'
								) }
							</p>
						) }

						{ isBookingMode && (
							<>
								<TextControl
									label={ __(
										'Card meta title',
										'twork-builder'
									) }
									value={ bookingMetaTitle }
									onChange={ ( v ) =>
										setAttributes( { bookingMetaTitle: v } )
									}
								/>

								<TextControl
									label={ __(
										'Card title',
										'twork-builder'
									) }
									value={ bookingTitle }
									onChange={ ( v ) =>
										setAttributes( { bookingTitle: v } )
									}
								/>

								<TextControl
									label={ __(
										'Card description',
										'twork-builder'
									) }
									value={ bookingDescription }
									onChange={ ( v ) =>
										setAttributes( {
											bookingDescription: v,
										} )
									}
									multiline
									rows={ 3 }
								/>

								<Divider />
								<BaseControl
									label={ __(
										'Select dropdown options',
										'twork-builder'
									) }
									help={ __(
										'First option is placeholder. Set Value, Label, and Book link per department.',
										'twork-builder'
									) }
								>
									{ ( options || [] ).map( ( opt, i ) => (
										<div
											key={ i }
											style={ {
												marginBottom: 12,
												paddingBottom: 12,
												borderBottom: '1px solid #ddd',
												display: 'flex',
												flexDirection: 'column',
												gap: 8,
											} }
										>
											<div
												style={ {
													display: 'flex',
													gap: 8,
													alignItems: 'center',
												} }
											>
												<TextControl
													label={ __(
														'Value',
														'twork-builder'
													) }
													value={ opt?.value ?? '' }
													onChange={ ( v ) =>
														updateSelectOption(
															i,
															'value',
															v
														)
													}
													style={ { flex: 1 } }
												/>

												<Button
													isDestructive
													isSmall
													onClick={ () =>
														removeSelectOption( i )
													}
													disabled={
														options.length <= 1
													}
													icon="no-alt"
													label={ __(
														'Remove option',
														'twork-builder'
													) }
												/>
											</div>
											<TextControl
												label={ __(
													'Label',
													'twork-builder'
												) }
												value={ opt?.label ?? '' }
												onChange={ ( v ) =>
													updateSelectOption(
														i,
														'label',
														v
													)
												}
											/>
											{ ( opt?.value ?? '' ) !== '' && (
												<TextControl
													label={ __(
														'Book link URL',
														'twork-builder'
													) }
													value={ opt?.bookUrl ?? '' }
													onChange={ ( v ) =>
														updateSelectOption(
															i,
															'bookUrl',
															v
														)
													}
													help={ __(
														'Use {value} for department value. Empty = auto ?name=value.',
														'twork-builder'
													) }
												/>
											) }
										</div>
									) ) }
									<Button
										isSecondary
										isSmall
										onClick={ addSelectOption }
										style={ { marginTop: 8 } }
									>
										{ __( 'Add option', 'twork-builder' ) }
									</Button>
								</BaseControl>
								<Divider />
								<TextControl
									label={ __(
										'Select name attribute',
										'twork-builder'
									) }
									value={ selectName }
									onChange={ ( v ) =>
										setAttributes( { selectName: v } )
									}
								/>

								<TextControl
									label={ __(
										'Select aria-label',
										'twork-builder'
									) }
									value={ selectAriaLabel }
									onChange={ ( v ) =>
										setAttributes( { selectAriaLabel: v } )
									}
								/>

								<Divider />
								<ToggleControl
									label={ __(
										'Show book button',
										'twork-builder'
									) }
									checked={ showBookButton }
									onChange={ ( val ) =>
										setAttributes( { showBookButton: val } )
									}
								/>

								{ showBookButton && (
									<>
										<TextControl
											label={ __(
												'Book button text',
												'twork-builder'
											) }
											value={ bookButtonText }
											onChange={ ( val ) =>
												setAttributes( {
													bookButtonText: val,
												} )
											}
										/>
										<ToggleControl
											label={ __(
												'Open book link in new tab',
												'twork-builder'
											) }
											checked={ bookButtonOpenInNewTab }
											onChange={ ( val ) =>
												setAttributes( {
													bookButtonOpenInNewTab: val,
												} )
											}
										/>
									</>
								) }

								<PanelColorSettings
									title={ __(
										'Card title color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: bookingTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													bookingTitleColor: val,
												} ),
											label: __(
												'Booking card title',
												'twork-builder'
											),
										},
									] }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Section layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Section background',
								'twork-builder'
							) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Gap between columns (px)',
								'twork-builder'
							) }
							value={ gridGap }
							onChange={ ( v ) =>
								setAttributes( { gridGap: v } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Card & highlight', 'twork-builder' ) }
							colorSettings={ [
								{
									value: highlightColor,
									onChange: ( val ) =>
										setAttributes( {
											highlightColor: val,
										} ),
									label: __(
										'Highlight word color',
										'twork-builder'
									),
								},
								{
									value: cardBgColor,
									onChange: ( val ) =>
										setAttributes( { cardBgColor: val } ),
									label: __(
										'Card background',
										'twork-builder'
									),
								},
								{
									value: cardBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBorderColor: val,
										} ),
									label: __( 'Card border', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Card padding (px)', 'twork-builder' ) }
							value={ cardPadding }
							onChange={ ( v ) =>
								setAttributes( { cardPadding: v } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					<div className="help-content-grid" style={ gridStyle }>
						<div
							className="help-text-content"
							style={ leftColumnStyle }
						>
							<RichText
								tagName="p"
								className="meta-title"
								value={ metaTitle }
								onChange={ ( v ) =>
									setAttributes( { metaTitle: v } )
								}
								placeholder={ __(
									'Meta title…',
									'twork-builder'
								) }
							/>

							<h2
								style={ {
									marginTop: 0,
									marginBottom: 25,
									fontSize: '3.5rem',
									fontWeight: 300,
									lineHeight: 1.1,
								} }
							>
								<RichText
									tagName="span"
									value={ mainTitleLine1 }
									onChange={ ( v ) =>
										setAttributes( { mainTitleLine1: v } )
									}
									placeholder={ __(
										'Line 1',
										'twork-builder'
									) }
								/>
								<br />
								<RichText
									tagName="span"
									className="highlight-red"
									value={ mainTitleHighlight }
									onChange={ ( v ) =>
										setAttributes( {
											mainTitleHighlight: v,
										} )
									}
									placeholder={ __(
										'Highlight',
										'twork-builder'
									) }
									style={ {
										color: highlightColor,
										fontWeight: 900,
									} }
								/>{ ' ' }
								<RichText
									tagName="span"
									value={ mainTitleLine2 }
									onChange={ ( v ) =>
										setAttributes( { mainTitleLine2: v } )
									}
									placeholder={ __(
										'Line 2',
										'twork-builder'
									) }
								/>
							</h2>
							<RichText
								tagName="p"
								value={ mainDescription }
								onChange={ ( v ) =>
									setAttributes( { mainDescription: v } )
								}
								placeholder={ __(
									'Main description…',
									'twork-builder'
								) }
							/>

							<p style={ { fontSize: '0.9rem', marginTop: 10 } }>
								<i
									className={ iconClass }
									style={ { color: highlightColor } }
									aria-hidden
								/>{ ' ' }
								<RichText
									tagName="span"
									value={ subText }
									onChange={ ( v ) =>
										setAttributes( { subText: v } )
									}
									placeholder={ __(
										'Sub text…',
										'twork-builder'
									) }
								/>
							</p>
						</div>

						{ isMediaMode ? (
							<div
								className="help-media-column"
								style={ {
									...mediaColumnStyle,
									...rightColumnStyle,
								} }
								data-media-type={ mediaType || 'image' }
							>
								{ isImageMedia && mediaImage && (
									<img
										src={ mediaImage }
										alt={ mediaImageAlt || '' }
										className="help-media-image"
										style={ {
											width: '100%',
											height: 'auto',
											display: 'block',
										} }
									/>
								) }

								{ isImageMedia && ! mediaImage && (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												mediaImage: media.url,
												mediaImageId: media.id,
												mediaImageAlt: media.alt || '',
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Upload image or GIF',
												'twork-builder'
											),
										} }
									/>
								) }

								{ isSlideshowMedia &&
									mediaSlides.length > 0 && (
										<div className="help-media-slideshow">
											<img
												src={ mediaSlides[ 0 ].url }
												alt={
													mediaSlides[ 0 ].alt || ''
												}
												className="help-media-slide is-active"
												style={ {
													width: '100%',
													height: 'auto',
													display: 'block',
												} }
											/>
										</div>
									) }

								{ isSlideshowMedia && ! mediaSlides.length && (
									<MediaPlaceholder
										onSelect={ ( media ) => {
											const items = Array.isArray( media )
												? media
												: [ media ];
											setAttributes( {
												slideshowImages: items.map(
													( m ) => ( {
														url: m.url,
														id: m.id,
														alt: m.alt || '',
													} )
												),
											} );
										} }
										allowedTypes={ [ 'image' ] }
										multiple
										labels={ {
											title: __(
												'Select slideshow images',
												'twork-builder'
											),
										} }
									/>
								) }

								{ isVideoMedia && mediaVideoUrl && (
									<video
										className="help-media-video"
										src={ mediaVideoUrl }
										poster={ videoPosterUrl || undefined }
										muted={ videoMuted }
										playsInline
										autoPlay={ videoAutoplay }
										loop={ videoLoop }
										style={ {
											width: '100%',
											height: 'auto',
											display: 'block',
										} }
									/>
								) }

								{ isVideoMedia && ! mediaVideoUrl && (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												mediaVideoUrl: media.url,
												mediaVideoId: media.id,
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
												'Upload video',
												'twork-builder'
											),
										} }
									/>
								) }
							</div>
						) : (
							<div
								className="help-booking-card"
								style={ { ...cardStyle, ...rightColumnStyle } }
							>
								<RichText
									tagName="p"
									className="meta-title"
									value={ bookingMetaTitle }
									onChange={ ( v ) =>
										setAttributes( { bookingMetaTitle: v } )
									}
									placeholder={ __(
										'Card meta title…',
										'twork-builder'
									) }
								/>

								<RichText
									tagName="h3"
									value={ bookingTitle }
									onChange={ ( v ) =>
										setAttributes( { bookingTitle: v } )
									}
									placeholder={ __(
										'Book an Appointment',
										'twork-builder'
									) }
									style={ {
										color: bookingTitleColor,
										marginTop: 0,
										marginBottom: 15,
									} }
								/>

								<RichText
									tagName="p"
									value={ bookingDescription }
									onChange={ ( v ) =>
										setAttributes( {
											bookingDescription: v,
										} )
									}
									placeholder={ __(
										'Card description…',
										'twork-builder'
									) }
									style={ {
										marginBottom: showDepartmentDropdown
											? 30
											: 0,
									} }
								/>

								{ showDepartmentDropdown && (
									<div className="custom-select-wrapper">
										<select
											className="help-dept-select"
											name={ selectName }
											aria-label={ selectAriaLabel }
											disabled
											style={ {
												width: '100%',
												padding: '15px 20px',
												borderRadius: 30,
											} }
										>
											{ ( options || [] ).map(
												( opt, i ) => (
													<option
														key={ i }
														value={
															opt?.value ?? ''
														}
														data-book-url={
															opt?.bookUrl || ''
														}
													>
														{ opt?.label ?? '' }
													</option>
												)
											) }
										</select>
									</div>
								) }

								{ showBookButton && (
									<a
										href="#"
										className="jivaka-btn help-book-btn is-disabled"
										style={ {
											pointerEvents: 'none',
											marginTop:
												showDepartmentDropdown ||
												! showDepartmentDropdown
													? 20
													: 0,
										} }
										target={
											bookButtonOpenInNewTab
												? '_blank'
												: undefined
										}
										rel={
											bookButtonOpenInNewTab
												? 'noopener noreferrer'
												: undefined
										}
										aria-disabled="true"
									>
										{ bookButtonText || 'BOOK NOW' }
									</a>
								) }
							</div>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
