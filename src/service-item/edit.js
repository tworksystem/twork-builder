import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useEffect } from '@wordpress/element';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	URLInput,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	BaseControl,
	Button,
	ButtonGroup,
	__experimentalDivider as Divider,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

const DEFAULT_INFO_BLOCK = {
	icon: 'fas fa-phone',
	title: '',
	content: '',
	subtitle: '',
	mediaType: 'icon',
	mediaUrl: '',
	mediaId: null,
	mediaAlt: '',
	mediaWidth: 40,
};

function normalizeInfoBlock( block = {} ) {
	const mediaType = [ 'icon', 'image', 'video' ].includes( block.mediaType )
		? block.mediaType
		: 'icon';
	const mediaWidth = Number.isFinite( Number( block.mediaWidth ) )
		? Number( block.mediaWidth )
		: 40;

	return {
		...DEFAULT_INFO_BLOCK,
		...block,
		mediaType,
		mediaWidth,
	};
}

function normalizeInfoBlocks( blocks ) {
	if ( ! Array.isArray( blocks ) ) {
		return [];
	}
	return blocks.map( normalizeInfoBlock );
}

export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const {
		itemType,
		cardStyle,
		customBgColor,
		customTextColor,
		gradientStart,
		gradientEnd,
		gradientAngle,
		image,
		imageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		metaText,
		metaColor,
		metaFontSize,
		metaTextTransform,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonStyle,
		buttonBgColor,
		buttonTextColor,
		buttonBorderRadius,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonFontSize,
		buttonFontWeight,
		buttonTextTransform,
		buttonIcon,
		buttonIconPosition,
		buttonBorderWidth,
		buttonBorderColor,
		buttonBorderStyle,
		buttonHoverBgColor,
		buttonHoverTextColor,
		buttonHoverBorderColor,
		buttonBoxShadow,
		buttonBoxShadowColor,
		buttonBoxShadowBlur,
		buttonBoxShadowSpread,
		buttonBoxShadowOffsetX,
		buttonBoxShadowOffsetY,
		buttonHoverBoxShadow,
		buttonHoverBoxShadowColor,
		buttonHoverBoxShadowBlur,
		buttonHoverBoxShadowSpread,
		buttonHoverBoxShadowOffsetX,
		buttonHoverBoxShadowOffsetY,
		buttonWidth,
		buttonWidthCustom,
		buttonAlignment,
		buttonMarginTop,
		buttonMarginBottom,
		buttonMarginLeft,
		buttonMarginRight,
		buttonLetterSpacing,
		buttonLineHeight,
		buttonTransitionDuration,
		buttonHoverScale,
		buttonHoverTranslateY,
		buttonFontSizeMobile,
		buttonPaddingVerticalMobile,
		buttonPaddingHorizontalMobile,
		contentPadding,
		infoBlocks,
		showOverlay,
		overlayColor,
		overlayOpacity,
		borderWidth,
		borderColor,
		borderStyle,
	} = attributes;

	const itemTypeOptions = [
		{ label: __( 'Service Card', 'twork-builder' ), value: 'card' },
		{ label: __( 'Info Block', 'twork-builder' ), value: 'info' },
	];

	const cardStyleOptions = [
		{
			label: __( 'Primary (Orange Gradient)', 'twork-builder' ),
			value: 'primary',
		},
		{ label: __( 'Dark (Grey Gradient)', 'twork-builder' ), value: 'dark' },
		{ label: __( 'Custom Gradient', 'twork-builder' ), value: 'custom' },
		{ label: __( 'Solid Color', 'twork-builder' ), value: 'solid' },
	];

	const objectFitOptions = [
		{ label: __( 'Cover', 'twork-builder' ), value: 'cover' },
		{ label: __( 'Contain', 'twork-builder' ), value: 'contain' },
		{ label: __( 'Fill', 'twork-builder' ), value: 'fill' },
		{ label: __( 'None', 'twork-builder' ), value: 'none' },
	];

	const objectPositionOptions = [
		{ label: __( 'Center', 'twork-builder' ), value: 'center' },
		{ label: __( 'Top', 'twork-builder' ), value: 'top' },
		{ label: __( 'Bottom', 'twork-builder' ), value: 'bottom' },
		{ label: __( 'Left', 'twork-builder' ), value: 'left' },
		{ label: __( 'Right', 'twork-builder' ), value: 'right' },
	];

	const textTransformOptions = [
		{ label: __( 'None', 'twork-builder' ), value: 'none' },
		{ label: __( 'Uppercase', 'twork-builder' ), value: 'uppercase' },
		{ label: __( 'Lowercase', 'twork-builder' ), value: 'lowercase' },
		{ label: __( 'Capitalize', 'twork-builder' ), value: 'capitalize' },
	];

	const borderStyleOptions = [
		{ label: __( 'Solid', 'twork-builder' ), value: 'solid' },
		{ label: __( 'Dashed', 'twork-builder' ), value: 'dashed' },
		{ label: __( 'Dotted', 'twork-builder' ), value: 'dotted' },
		{ label: __( 'Double', 'twork-builder' ), value: 'double' },
	];

	const relOptions = [
		{ label: __( 'None', 'twork-builder' ), value: '' },
		{ label: __( 'nofollow', 'twork-builder' ), value: 'nofollow' },
		{ label: __( 'noopener', 'twork-builder' ), value: 'noopener' },
		{ label: __( 'noreferrer', 'twork-builder' ), value: 'noreferrer' },
		{
			label: __( 'noopener noreferrer', 'twork-builder' ),
			value: 'noopener noreferrer',
		},
		{
			label: __( 'nofollow noopener noreferrer', 'twork-builder' ),
			value: 'nofollow noopener noreferrer',
		},
	];

	const iconPositionOptions = [
		{ label: __( 'Left', 'twork-builder' ), value: 'left' },
		{ label: __( 'Right', 'twork-builder' ), value: 'right' },
	];

	const buttonWidthOptions = [
		{ label: __( 'Auto', 'twork-builder' ), value: 'auto' },
		{ label: __( 'Full Width', 'twork-builder' ), value: 'full' },
		{ label: __( 'Custom', 'twork-builder' ), value: 'custom' },
	];

	const buttonAlignmentOptions = [
		{ label: __( 'Left', 'twork-builder' ), value: 'left' },
		{ label: __( 'Center', 'twork-builder' ), value: 'center' },
		{ label: __( 'Right', 'twork-builder' ), value: 'right' },
	];

	const mediaTypeOptions = [
		{ label: __( 'Icon class', 'twork-builder' ), value: 'icon' },
		{ label: __( 'Image / GIF', 'twork-builder' ), value: 'image' },
		{ label: __( 'Video', 'twork-builder' ), value: 'video' },
	];

	// Get background style based on card style
	const getBackgroundStyle = () => {
		if ( cardStyle === 'primary' ) {
			return {
				background: `linear-gradient(${ gradientAngle }deg, #f48b2a 0%, #e67a22 100%)`,
				color: '#ffffff',
			};
		} else if ( cardStyle === 'dark' ) {
			return {
				background: `linear-gradient(${ gradientAngle }deg, #212121 0%, #1a1a1a 100%)`,
				color: '#e0e0e0',
			};
		} else if ( cardStyle === 'custom' ) {
			return {
				background: `linear-gradient(${ gradientAngle }deg, ${ gradientStart } 0%, ${ gradientEnd } 100%)`,
				color: customTextColor || '#ffffff',
			};
		} else {
			return {
				backgroundColor: customBgColor || '#f9f9f9',
				color: customTextColor || '#212121',
			};
		}
	};

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-service-item twork-service-item-${ itemType }`,
			style: {
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				borderWidth: `${ borderWidth }px`,
				borderColor,
				borderStyle,
			},
		} ),
		[ borderColor, borderStyle, borderWidth, itemType ]
	);

	const addInfoBlock = () => {
		const newInfoBlocks = [
			...infoBlocks,
			{
				icon: 'fas fa-phone',
				mediaType: 'icon',
				mediaUrl: '',
				mediaId: null,
				mediaAlt: '',
				mediaWidth: 40,
				title: __( 'New Info Block', 'twork-builder' ),
				content: __( 'Info content...', 'twork-builder' ),
				subtitle: '',
			},
		];

		setAttributes( { infoBlocks: newInfoBlocks } );
	};

	const updateInfoBlock = ( index, field, value ) => {
		const newInfoBlocks = [ ...infoBlocks ];
		newInfoBlocks[ index ] = {
			...newInfoBlocks[ index ],
			[ field ]: value,
		};
		setAttributes( { infoBlocks: newInfoBlocks } );
	};

	const removeInfoBlock = ( index ) => {
		const newInfoBlocks = infoBlocks.filter( ( _, i ) => i !== index );
		setAttributes( { infoBlocks: newInfoBlocks } );
	};

	// Backward compatibility: normalize legacy infoBlocks missing media fields.
	useEffect( () => {
		if ( ! Array.isArray( infoBlocks ) ) {
			setAttributes( { infoBlocks: [] } );
			return;
		}

		const normalized = normalizeInfoBlocks( infoBlocks );
		const hasChanges =
			normalized.length !== infoBlocks.length ||
			normalized.some(
				( block, index ) =>
					JSON.stringify( block ) !== JSON.stringify( infoBlocks[ index ] )
			);

		if ( hasChanges ) {
			setAttributes( { infoBlocks: normalized } );
		}
	}, [ infoBlocks, setAttributes ] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Item Type', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Type', 'twork-builder' ) }
							value={ itemType }
							options={ itemTypeOptions }
							onChange={ ( val ) =>
								setAttributes( { itemType: val } )
							}
							help={ __(
								'Choose between service card or info block',
								'twork-builder'
							) }
						/>
					</PanelBody>

					{ itemType === 'card' && (
						<>
							<PanelBody
								title={ __( 'Card Style', 'twork-builder' ) }
								initialOpen={ true }
							>
								<SelectControl
									label={ __(
										'Style Preset',
										'twork-builder'
									) }
									value={ cardStyle }
									options={ cardStyleOptions }
									onChange={ ( val ) =>
										setAttributes( { cardStyle: val } )
									}
								/>

								{ cardStyle === 'custom' && (
									<>
										<Divider />
										<PanelColorSettings
											title={ __(
												'Gradient Colors',
												'twork-builder'
											) }
											colorSettings={ [
												{
													value: gradientStart,
													onChange: ( val ) =>
														setAttributes( {
															gradientStart: val,
														} ),
													label: __(
														'Gradient Start',
														'twork-builder'
													),
												},
												{
													value: gradientEnd,
													onChange: ( val ) =>
														setAttributes( {
															gradientEnd: val,
														} ),
													label: __(
														'Gradient End',
														'twork-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Gradient Angle (deg)',
												'twork-builder'
											) }
											value={ gradientAngle }
											onChange={ ( val ) =>
												setAttributes( {
													gradientAngle: val,
												} )
											}
											min={ 0 }
											max={ 360 }
											step={ 1 }
										/>
									</>
								) }

								{ cardStyle === 'solid' && (
									<PanelColorSettings
										title={ __(
											'Colors',
											'twork-builder'
										) }
										colorSettings={ [
											{
												value: customBgColor,
												onChange: ( val ) =>
													setAttributes( {
														customBgColor: val,
													} ),
												label: __(
													'Background Color',
													'twork-builder'
												),
											},
											{
												value: customTextColor,
												onChange: ( val ) =>
													setAttributes( {
														customTextColor: val,
													} ),
												label: __(
													'Text Color',
													'twork-builder'
												),
											},
										] }
									/>
								) }

								{ ( cardStyle === 'custom' ||
									cardStyle === 'solid' ) && (
									<PanelColorSettings
										title={ __(
											'Text Color',
											'twork-builder'
										) }
										colorSettings={ [
											{
												value: customTextColor,
												onChange: ( val ) =>
													setAttributes( {
														customTextColor: val,
													} ),
												label: __(
													'Text Color',
													'twork-builder'
												),
											},
										] }
									/>
								) }
							</PanelBody>

							<PanelBody
								title={ __(
									'Image Settings',
									'twork-builder'
								) }
								initialOpen={ false }
							>
								<RangeControl
									label={ __(
										'Image Height (px)',
										'twork-builder'
									) }
									value={ imageHeight }
									onChange={ ( val ) =>
										setAttributes( { imageHeight: val } )
									}
									min={ 100 }
									max={ 600 }
									step={ 10 }
								/>

								<SelectControl
									label={ __(
										'Object Fit',
										'twork-builder'
									) }
									value={ imageObjectFit }
									options={ objectFitOptions }
									onChange={ ( val ) =>
										setAttributes( { imageObjectFit: val } )
									}
									help={ __(
										'How the image should fit within its container',
										'twork-builder'
									) }
								/>

								<SelectControl
									label={ __(
										'Object Position',
										'twork-builder'
									) }
									value={ imageObjectPosition }
									options={ objectPositionOptions }
									onChange={ ( val ) =>
										setAttributes( {
											imageObjectPosition: val,
										} )
									}
								/>

								<Divider />

								<ToggleControl
									label={ __(
										'Show Overlay',
										'twork-builder'
									) }
									checked={ showOverlay }
									onChange={ ( val ) =>
										setAttributes( { showOverlay: val } )
									}
								/>

								{ showOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'twork-builder'
											) }
											colorSettings={ [
												{
													value: overlayColor,
													onChange: ( val ) =>
														setAttributes( {
															overlayColor: val,
														} ),
													label: __(
														'Overlay Color',
														'twork-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Overlay Opacity',
												'twork-builder'
											) }
											value={ overlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													overlayOpacity: val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }
							</PanelBody>

							<PanelBody
								title={ __(
									'Typography Settings',
									'twork-builder'
								) }
								initialOpen={ false }
							>
								<BaseControl
									label={ __( 'Meta Text', 'twork-builder' ) }
								>
									<RangeControl
										label={ __(
											'Font Size (rem)',
											'twork-builder'
										) }
										value={ metaFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												metaFontSize: val,
											} )
										}
										min={ 0.5 }
										max={ 2 }
										step={ 0.05 }
									/>

									<SelectControl
										label={ __(
											'Text Transform',
											'twork-builder'
										) }
										value={ metaTextTransform }
										options={ textTransformOptions }
										onChange={ ( val ) =>
											setAttributes( {
												metaTextTransform: val,
											} )
										}
									/>

									<PanelColorSettings
										colorSettings={ [
											{
												value: metaColor,
												onChange: ( val ) =>
													setAttributes( {
														metaColor: val,
													} ),
												label: __(
													'Color',
													'twork-builder'
												),
											},
										] }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __( 'Title', 'twork-builder' ) }
								>
									<RangeControl
										label={ __(
											'Font Size (rem)',
											'twork-builder'
										) }
										value={ titleFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												titleFontSize: val,
											} )
										}
										min={ 0.8 }
										max={ 4 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Font Weight',
											'twork-builder'
										) }
										value={ titleFontWeight }
										onChange={ ( val ) =>
											setAttributes( {
												titleFontWeight: val,
											} )
										}
										min={ 300 }
										max={ 900 }
										step={ 100 }
									/>

									<PanelColorSettings
										colorSettings={ [
											{
												value: titleColor,
												onChange: ( val ) =>
													setAttributes( {
														titleColor: val,
													} ),
												label: __(
													'Color',
													'twork-builder'
												),
											},
										] }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Description',
										'twork-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Font Size (rem)',
											'twork-builder'
										) }
										value={ descriptionFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionFontSize: val,
											} )
										}
										min={ 0.7 }
										max={ 2 }
										step={ 0.05 }
									/>

									<PanelColorSettings
										colorSettings={ [
											{
												value: descriptionColor,
												onChange: ( val ) =>
													setAttributes( {
														descriptionColor: val,
													} ),
												label: __(
													'Color',
													'twork-builder'
												),
											},
										] }
									/>
								</BaseControl>
							</PanelBody>

							<PanelBody
								title={ __(
									'Button Settings',
									'twork-builder'
								) }
								initialOpen={ false }
							>
								<ToggleControl
									label={ __(
										'Show Button',
										'twork-builder'
									) }
									checked={ showButton }
									onChange={ ( val ) =>
										setAttributes( { showButton: val } )
									}
								/>

								{ showButton && (
									<>
										<TextControl
											label={ __(
												'Button Text',
												'twork-builder'
											) }
											value={ buttonText }
											onChange={ ( val ) =>
												setAttributes( {
													buttonText: val,
												} )
											}
										/>

										<BaseControl
											label={ __(
												'Button URL',
												'twork-builder'
											) }
										>
											<URLInput
												value={ buttonUrl }
												onChange={ ( val ) =>
													setAttributes( {
														buttonUrl: val,
													} )
												}
											/>
										</BaseControl>

										<ToggleControl
											label={ __(
												'Open in New Tab',
												'twork-builder'
											) }
											checked={ buttonTarget }
											onChange={ ( val ) =>
												setAttributes( {
													buttonTarget: val,
												} )
											}
										/>

										<SelectControl
											label={ __(
												'Link Rel Attribute',
												'twork-builder'
											) }
											value={ buttonRel }
											options={ relOptions }
											onChange={ ( val ) =>
												setAttributes( {
													buttonRel: val,
												} )
											}
										/>

										<Divider />

										<PanelColorSettings
											title={ __(
												'Button Colors',
												'twork-builder'
											) }
											colorSettings={ [
												{
													value: buttonBgColor,
													onChange: ( val ) =>
														setAttributes( {
															buttonBgColor: val,
														} ),
													label: __(
														'Background Color',
														'twork-builder'
													),
												},
												{
													value: buttonTextColor,
													onChange: ( val ) =>
														setAttributes( {
															buttonTextColor:
																val,
														} ),
													label: __(
														'Text Color',
														'twork-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Border Radius (px)',
												'twork-builder'
											) }
											value={ buttonBorderRadius }
											onChange={ ( val ) =>
												setAttributes( {
													buttonBorderRadius: val,
												} )
											}
											min={ 0 }
											max={ 50 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Padding Vertical (px)',
												'twork-builder'
											) }
											value={ buttonPaddingVertical }
											onChange={ ( val ) =>
												setAttributes( {
													buttonPaddingVertical: val,
												} )
											}
											min={ 0 }
											max={ 30 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Padding Horizontal (px)',
												'twork-builder'
											) }
											value={ buttonPaddingHorizontal }
											onChange={ ( val ) =>
												setAttributes( {
													buttonPaddingHorizontal:
														val,
												} )
											}
											min={ 0 }
											max={ 60 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Font Size (rem)',
												'twork-builder'
											) }
											value={ buttonFontSize }
											onChange={ ( val ) =>
												setAttributes( {
													buttonFontSize: val,
												} )
											}
											min={ 0.6 }
											max={ 2 }
											step={ 0.05 }
										/>

										<RangeControl
											label={ __(
												'Font Weight',
												'twork-builder'
											) }
											value={ buttonFontWeight }
											onChange={ ( val ) =>
												setAttributes( {
													buttonFontWeight: val,
												} )
											}
											min={ 300 }
											max={ 900 }
											step={ 100 }
										/>

										<SelectControl
											label={ __(
												'Text Transform',
												'twork-builder'
											) }
											value={ buttonTextTransform }
											options={ textTransformOptions }
											onChange={ ( val ) =>
												setAttributes( {
													buttonTextTransform: val,
												} )
											}
										/>

										<Divider />

										<TextControl
											label={ __(
												'Icon Class (Optional)',
												'twork-builder'
											) }
											value={ buttonIcon }
											onChange={ ( val ) =>
												setAttributes( {
													buttonIcon: val,
												} )
											}
											help={ __(
												'e.g., fas fa-arrow-right or dashicons-arrow-right-alt2',
												'twork-builder'
											) }
										/>

										{ buttonIcon && (
											<BaseControl
												label={ __(
													'Icon Position',
													'twork-builder'
												) }
											>
												<ButtonGroup>
													{ iconPositionOptions.map(
														( option ) => (
															<Button
																key={
																	option.value
																}
																isPressed={
																	buttonIconPosition ===
																	option.value
																}
																onClick={ () =>
																	setAttributes(
																		{
																			buttonIconPosition:
																				option.value,
																		}
																	)
																}
															>
																{ option.label }
															</Button>
														)
													) }
												</ButtonGroup>
											</BaseControl>
										) }

										<Divider />

										<BaseControl
											label={ __(
												'Button Layout',
												'twork-builder'
											) }
										>
											<SelectControl
												label={ __(
													'Button Width',
													'twork-builder'
												) }
												value={ buttonWidth }
												options={ buttonWidthOptions }
												onChange={ ( val ) =>
													setAttributes( {
														buttonWidth: val,
													} )
												}
											/>

											{ buttonWidth === 'custom' && (
												<RangeControl
													label={ __(
														'Custom Width (px)',
														'twork-builder'
													) }
													value={ buttonWidthCustom }
													onChange={ ( val ) =>
														setAttributes( {
															buttonWidthCustom:
																val,
														} )
													}
													min={ 100 }
													max={ 500 }
													step={ 10 }
													help={ __(
														'Custom button width in pixels',
														'twork-builder'
													) }
												/>
											) }

											<SelectControl
												label={ __(
													'Button Alignment',
													'twork-builder'
												) }
												value={ buttonAlignment }
												options={
													buttonAlignmentOptions
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonAlignment: val,
													} )
												}
											/>
										</BaseControl>

										<Divider />

										<BaseControl
											label={ __(
												'Button Border',
												'twork-builder'
											) }
										>
											<RangeControl
												label={ __(
													'Border Width (px)',
													'twork-builder'
												) }
												value={ buttonBorderWidth }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBorderWidth: val,
													} )
												}
												min={ 0 }
												max={ 10 }
												step={ 1 }
											/>

											{ buttonBorderWidth > 0 && (
												<>
													<SelectControl
														label={ __(
															'Border Style',
															'twork-builder'
														) }
														value={
															buttonBorderStyle
														}
														options={
															borderStyleOptions
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonBorderStyle:
																	val,
															} )
														}
													/>

													<PanelColorSettings
														title={ __(
															'Border Color',
															'twork-builder'
														) }
														colorSettings={ [
															{
																value: buttonBorderColor,
																onChange: (
																	val
																) =>
																	setAttributes(
																		{
																			buttonBorderColor:
																				val,
																		}
																	),
																label: __(
																	'Border Color',
																	'twork-builder'
																),
															},
														] }
													/>
												</>
											) }
										</BaseControl>

										<Divider />

										<BaseControl
											label={ __(
												'Button Spacing',
												'twork-builder'
											) }
										>
											<RangeControl
												label={ __(
													'Margin Top (px)',
													'twork-builder'
												) }
												value={ buttonMarginTop }
												onChange={ ( val ) =>
													setAttributes( {
														buttonMarginTop: val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Margin Bottom (px)',
													'twork-builder'
												) }
												value={ buttonMarginBottom }
												onChange={ ( val ) =>
													setAttributes( {
														buttonMarginBottom: val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Margin Left (px)',
													'twork-builder'
												) }
												value={ buttonMarginLeft }
												onChange={ ( val ) =>
													setAttributes( {
														buttonMarginLeft: val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>

											<RangeControl
												label={ __(
													'Margin Right (px)',
													'twork-builder'
												) }
												value={ buttonMarginRight }
												onChange={ ( val ) =>
													setAttributes( {
														buttonMarginRight: val,
													} )
												}
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>
										</BaseControl>

										<Divider />

										<BaseControl
											label={ __(
												'Button Typography',
												'twork-builder'
											) }
										>
											<RangeControl
												label={ __(
													'Letter Spacing (px)',
													'twork-builder'
												) }
												value={ buttonLetterSpacing }
												onChange={ ( val ) =>
													setAttributes( {
														buttonLetterSpacing:
															val,
													} )
												}
												min={ 0 }
												max={ 3 }
												step={ 0.1 }
											/>

											<RangeControl
												label={ __(
													'Line Height',
													'twork-builder'
												) }
												value={ buttonLineHeight }
												onChange={ ( val ) =>
													setAttributes( {
														buttonLineHeight: val,
													} )
												}
												min={ 1 }
												max={ 3 }
												step={ 0.1 }
											/>
										</BaseControl>

										<Divider />

										<PanelBody
											title={ __(
												'Button Shadow',
												'twork-builder'
											) }
											initialOpen={ false }
										>
											<ToggleControl
												label={ __(
													'Enable Box Shadow',
													'twork-builder'
												) }
												checked={ buttonBoxShadow }
												onChange={ ( val ) =>
													setAttributes( {
														buttonBoxShadow: val,
													} )
												}
											/>

											{ buttonBoxShadow && (
												<>
													<PanelColorSettings
														title={ __(
															'Shadow Color',
															'twork-builder'
														) }
														colorSettings={ [
															{
																value: buttonBoxShadowColor,
																onChange: (
																	val
																) =>
																	setAttributes(
																		{
																			buttonBoxShadowColor:
																				val,
																		}
																	),
																label: __(
																	'Shadow Color',
																	'twork-builder'
																),
															},
														] }
													/>

													<RangeControl
														label={ __(
															'Blur (px)',
															'twork-builder'
														) }
														value={
															buttonBoxShadowBlur
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonBoxShadowBlur:
																	val,
															} )
														}
														min={ 0 }
														max={ 50 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Spread (px)',
															'twork-builder'
														) }
														value={
															buttonBoxShadowSpread
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonBoxShadowSpread:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Offset X (px)',
															'twork-builder'
														) }
														value={
															buttonBoxShadowOffsetX
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonBoxShadowOffsetX:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Offset Y (px)',
															'twork-builder'
														) }
														value={
															buttonBoxShadowOffsetY
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonBoxShadowOffsetY:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>
												</>
											) }
										</PanelBody>

										<Divider />

										<PanelBody
											title={ __(
												'Button Hover Effects',
												'twork-builder'
											) }
											initialOpen={ false }
										>
											<PanelColorSettings
												title={ __(
													'Hover Colors',
													'twork-builder'
												) }
												colorSettings={ [
													{
														value: buttonHoverBgColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonHoverBgColor:
																	val,
															} ),
														label: __(
															'Hover Background Color',
															'twork-builder'
														),
													},
													{
														value: buttonHoverTextColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonHoverTextColor:
																	val,
															} ),
														label: __(
															'Hover Text Color',
															'twork-builder'
														),
													},
													{
														value: buttonHoverBorderColor,
														onChange: ( val ) =>
															setAttributes( {
																buttonHoverBorderColor:
																	val,
															} ),
														label: __(
															'Hover Border Color',
															'twork-builder'
														),
													},
												] }
											/>

											<Divider />

											<RangeControl
												label={ __(
													'Hover Scale',
													'twork-builder'
												) }
												value={ buttonHoverScale }
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverScale: val,
													} )
												}
												min={ 0.9 }
												max={ 1.2 }
												step={ 0.01 }
												help={ __(
													'Scale transformation on hover',
													'twork-builder'
												) }
											/>

											<RangeControl
												label={ __(
													'Hover Translate Y (px)',
													'twork-builder'
												) }
												value={ buttonHoverTranslateY }
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverTranslateY:
															val,
													} )
												}
												min={ -10 }
												max={ 10 }
												step={ 1 }
												help={ __(
													'Vertical movement on hover (negative = up)',
													'twork-builder'
												) }
											/>

											<Divider />

											<ToggleControl
												label={ __(
													'Enable Hover Shadow',
													'twork-builder'
												) }
												checked={ buttonHoverBoxShadow }
												onChange={ ( val ) =>
													setAttributes( {
														buttonHoverBoxShadow:
															val,
													} )
												}
											/>

											{ buttonHoverBoxShadow && (
												<>
													<PanelColorSettings
														title={ __(
															'Hover Shadow Color',
															'twork-builder'
														) }
														colorSettings={ [
															{
																value: buttonHoverBoxShadowColor,
																onChange: (
																	val
																) =>
																	setAttributes(
																		{
																			buttonHoverBoxShadowColor:
																				val,
																		}
																	),
																label: __(
																	'Hover Shadow Color',
																	'twork-builder'
																),
															},
														] }
													/>

													<RangeControl
														label={ __(
															'Hover Shadow Blur (px)',
															'twork-builder'
														) }
														value={
															buttonHoverBoxShadowBlur
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonHoverBoxShadowBlur:
																	val,
															} )
														}
														min={ 0 }
														max={ 50 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Hover Shadow Spread (px)',
															'twork-builder'
														) }
														value={
															buttonHoverBoxShadowSpread
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonHoverBoxShadowSpread:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Hover Shadow Offset X (px)',
															'twork-builder'
														) }
														value={
															buttonHoverBoxShadowOffsetX
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonHoverBoxShadowOffsetX:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>

													<RangeControl
														label={ __(
															'Hover Shadow Offset Y (px)',
															'twork-builder'
														) }
														value={
															buttonHoverBoxShadowOffsetY
														}
														onChange={ ( val ) =>
															setAttributes( {
																buttonHoverBoxShadowOffsetY:
																	val,
															} )
														}
														min={ -20 }
														max={ 20 }
														step={ 1 }
													/>
												</>
											) }

											<Divider />

											<RangeControl
												label={ __(
													'Transition Duration (s)',
													'twork-builder'
												) }
												value={
													buttonTransitionDuration
												}
												onChange={ ( val ) =>
													setAttributes( {
														buttonTransitionDuration:
															val,
													} )
												}
												min={ 0.1 }
												max={ 1 }
												step={ 0.1 }
												help={ __(
													'Animation speed for hover effects',
													'twork-builder'
												) }
											/>
										</PanelBody>

										<Divider />

										<PanelBody
											title={ __(
												'Button Responsive Settings',
												'twork-builder'
											) }
											initialOpen={ false }
										>
											<BaseControl
												label={ __(
													'Mobile Settings',
													'twork-builder'
												) }
											>
												<RangeControl
													label={ __(
														'Font Size Mobile (rem)',
														'twork-builder'
													) }
													value={
														buttonFontSizeMobile ||
														buttonFontSize
													}
													onChange={ ( val ) =>
														setAttributes( {
															buttonFontSizeMobile:
																val,
														} )
													}
													min={ 0.6 }
													max={ 2 }
													step={ 0.05 }
													help={ __(
														'Font size on mobile devices. Set to 0 to use desktop size.',
														'twork-builder'
													) }
												/>

												<RangeControl
													label={ __(
														'Padding Vertical Mobile (px)',
														'twork-builder'
													) }
													value={
														buttonPaddingVerticalMobile ||
														buttonPaddingVertical
													}
													onChange={ ( val ) =>
														setAttributes( {
															buttonPaddingVerticalMobile:
																val,
														} )
													}
													min={ 0 }
													max={ 30 }
													step={ 1 }
													help={ __(
														'Vertical padding on mobile. Set to 0 to use desktop value.',
														'twork-builder'
													) }
												/>

												<RangeControl
													label={ __(
														'Padding Horizontal Mobile (px)',
														'twork-builder'
													) }
													value={
														buttonPaddingHorizontalMobile ||
														buttonPaddingHorizontal
													}
													onChange={ ( val ) =>
														setAttributes( {
															buttonPaddingHorizontalMobile:
																val,
														} )
													}
													min={ 0 }
													max={ 60 }
													step={ 1 }
													help={ __(
														'Horizontal padding on mobile. Set to 0 to use desktop value.',
														'twork-builder'
													) }
												/>
											</BaseControl>
										</PanelBody>
									</>
								) }
							</PanelBody>

							<PanelBody
								title={ __( 'Spacing', 'twork-builder' ) }
								initialOpen={ false }
							>
								<RangeControl
									label={ __(
										'Content Padding (px)',
										'twork-builder'
									) }
									value={ contentPadding }
									onChange={ ( val ) =>
										setAttributes( { contentPadding: val } )
									}
									min={ 0 }
									max={ 80 }
									step={ 4 }
								/>
							</PanelBody>
						</>
					) }

					{ itemType === 'info' && (
						<PanelBody
							title={ __( 'Info Blocks', 'twork-builder' ) }
							initialOpen={ true }
						>
							<p>
								{ __(
									'Add information blocks with icons',
									'twork-builder'
								) }
							</p>

							{ infoBlocks.map( ( block, index ) => (
								<div
									key={ index }
									style={ {
										border: '1px solid #ddd',
										padding: '15px',
										marginBottom: '15px',
										borderRadius: '4px',
									} }
								>
									<BaseControl
										label={ __(
											`Info Block ${ index + 1 }`,
											'twork-builder'
										) }
									>
										<SelectControl
											label={ __( 'Media Type', 'twork-builder' ) }
											value={ block.mediaType || 'icon' }
											options={ mediaTypeOptions }
											onChange={ ( val ) =>
												updateInfoBlock( index, 'mediaType', val )
											}
										/>
										{ ( block.mediaType || 'icon' ) === 'icon' && (
											<TextControl
												label={ __( 'Icon Class', 'twork-builder' ) }
												value={ block.icon || '' }
												onChange={ ( val ) =>
													updateInfoBlock( index, 'icon', val )
												}
												help={ __( 'e.g., fas fa-phone', 'twork-builder' ) }
											/>
										) }
										{ [ 'image', 'video' ].includes( block.mediaType || '' ) && (
											<>
												<MediaUploadCheck>
													<MediaUpload
														onSelect={ ( media ) => {
															updateInfoBlock( index, 'mediaUrl', media.url || '' );
															updateInfoBlock( index, 'mediaId', media.id || null );
															updateInfoBlock( index, 'mediaAlt', media.alt || '' );
														} }
														allowedTypes={
															( block.mediaType || 'image' ) === 'video'
																? [ 'video' ]
																: [ 'image' ]
														}
														value={ block.mediaId }
														render={ ( { open } ) => (
															<Button isSecondary onClick={ open }>
																{ block.mediaUrl
																	? __( 'Replace Media', 'twork-builder' )
																	: __( 'Select Media', 'twork-builder' ) }
															</Button>
														) }
													/>
												</MediaUploadCheck>
												{ block.mediaUrl && (
													<Button
														isDestructive
														onClick={ () => {
															updateInfoBlock( index, 'mediaUrl', '' );
															updateInfoBlock( index, 'mediaId', null );
														} }
													>
														{ __( 'Remove Media', 'twork-builder' ) }
													</Button>
												) }
												{ ( block.mediaType || 'image' ) === 'image' && (
													<TextControl
														label={ __( 'Image alt text', 'twork-builder' ) }
														value={ block.mediaAlt || '' }
														onChange={ ( val ) =>
															updateInfoBlock( index, 'mediaAlt', val )
														}
													/>
												) }
												<RangeControl
													label={ __( 'Media width (px)', 'twork-builder' ) }
													value={ block.mediaWidth || 40 }
													onChange={ ( val ) =>
														updateInfoBlock( index, 'mediaWidth', val || 40 )
													}
													min={ 20 }
													max={ 120 }
													step={ 1 }
												/>
											</>
										) }

										<TextControl
											label={ __(
												'Title',
												'twork-builder'
											) }
											value={ block.title }
											onChange={ ( val ) =>
												updateInfoBlock(
													index,
													'title',
													val
												)
											}
										/>

										<TextControl
											label={ __(
												'Content',
												'twork-builder'
											) }
											value={ block.content }
											onChange={ ( val ) =>
												updateInfoBlock(
													index,
													'content',
													val
												)
											}
										/>

										<TextControl
											label={ __(
												'Subtitle (Optional)',
												'twork-builder'
											) }
											value={ block.subtitle || '' }
											onChange={ ( val ) =>
												updateInfoBlock(
													index,
													'subtitle',
													val
												)
											}
										/>

										<Button
											isDestructive
											onClick={ () =>
												removeInfoBlock( index )
											}
											style={ { marginTop: '10px' } }
										>
											{ __(
												'Remove Block',
												'twork-builder'
											) }
										</Button>
									</BaseControl>
								</div>
							) ) }

							<Button isPrimary onClick={ addInfoBlock }>
								{ __( 'Add Info Block', 'twork-builder' ) }
							</Button>
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Border Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Border Width (px)', 'twork-builder' ) }
							value={ borderWidth }
							onChange={ ( val ) =>
								setAttributes( { borderWidth: val } )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
						/>

						{ borderWidth > 0 && (
							<>
								<SelectControl
									label={ __(
										'Border Style',
										'twork-builder'
									) }
									value={ borderStyle }
									options={ borderStyleOptions }
									onChange={ ( val ) =>
										setAttributes( { borderStyle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Border Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: borderColor,
											onChange: ( val ) =>
												setAttributes( {
													borderColor: val,
												} ),
											label: __(
												'Border Color',
												'twork-builder'
											),
										},
									] }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ itemType === 'card' ? (
					<>
						{ ! image ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										image: media.url,
										imageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Select Service Image',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div style={ { position: 'relative' } }>
								<img
									src={ image }
									alt=""
									style={ {
										width: '100%',
										height: `${ imageHeight }px`,
										objectFit: imageObjectFit,
										objectPosition: imageObjectPosition,
										display: 'block',
									} }
								/>

								{ showOverlay && (
									<div
										style={ {
											position: 'absolute',
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											backgroundColor: overlayColor,
											opacity: overlayOpacity,
										} }
									/>
								) }
								<Button
									isSecondary
									isSmall
									style={ {
										position: 'absolute',
										top: '10px',
										right: '10px',
										zIndex: 10,
									} }
									onClick={ () =>
										setAttributes( {
											image: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Change Image', 'twork-builder' ) }
								</Button>
							</div>
						) }
						<div
							className="service-content"
							style={ {
								...getBackgroundStyle(),
								padding: `${ contentPadding }px`,
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
							} }
						>
							<RichText
								tagName="p"
								className="meta"
								value={ metaText }
								onChange={ ( val ) =>
									setAttributes( { metaText: val } )
								}
								placeholder={ __(
									'Meta text...',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ metaFontSize }rem`,
									textTransform: metaTextTransform,
									color: metaColor || 'inherit',
									fontWeight: 600,
									marginBottom: '8px',
								} }
							/>

							<RichText
								tagName="h3"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Service title...',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ titleFontSize }rem`,
									fontWeight: titleFontWeight,
									color: titleColor || 'inherit',
									marginTop: 0,
									marginBottom: '16px',
								} }
							/>

							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									'Service description...',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ descriptionFontSize }rem`,
									color: descriptionColor || 'inherit',
									marginBottom: '28px',
									flexGrow: 1,
								} }
							/>

							{ showButton && (
								<div
									className="service-button-wrapper"
									style={ {
										marginTop: 'auto',
										width:
											buttonWidth === 'full'
												? '100%'
												: buttonWidth === 'custom'
												? `${ buttonWidthCustom }px`
												: 'auto',
										textAlign: buttonAlignment,
										marginTop: `${ buttonMarginTop }px`,
										marginBottom: `${ buttonMarginBottom }px`,
										marginLeft: `${ buttonMarginLeft }px`,
										marginRight: `${ buttonMarginRight }px`,
										'--button-font-size-mobile':
											buttonFontSizeMobile > 0
												? `${ buttonFontSizeMobile }rem`
												: `${ buttonFontSize }rem`,
										'--button-padding-vertical-mobile':
											buttonPaddingVerticalMobile > 0
												? `${ buttonPaddingVerticalMobile }px`
												: `${ buttonPaddingVertical }px`,
										'--button-padding-horizontal-mobile':
											buttonPaddingHorizontalMobile > 0
												? `${ buttonPaddingHorizontalMobile }px`
												: `${ buttonPaddingHorizontal }px`,
									} }
								>
									<a
										className="jivaka-btn service-button"
										onClick={ ( e ) => e.preventDefault() }
										style={ {
											backgroundColor: buttonBgColor,
											color: buttonTextColor,
											borderRadius: `${ buttonBorderRadius }px`,
											padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
											fontSize: `${ buttonFontSize }rem`,
											fontWeight: buttonFontWeight,
											textTransform: buttonTextTransform,
											letterSpacing: `${ buttonLetterSpacing }px`,
											lineHeight: buttonLineHeight,
											display: 'inline-flex',
											alignItems: 'center',
											gap: '8px',
											textDecoration: 'none',
											cursor: 'pointer',
											borderWidth: `${ buttonBorderWidth }px`,
											borderStyle: buttonBorderStyle,
											borderColor: buttonBorderColor,
											boxShadow: buttonBoxShadow
												? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
												: 'none',
											transition: `all ${ buttonTransitionDuration }s ease`,
											width:
												buttonWidth === 'full'
													? '100%'
													: buttonWidth === 'custom'
													? `${ buttonWidthCustom }px`
													: 'auto',
											justifyContent:
												buttonAlignment === 'center'
													? 'center'
													: buttonAlignment ===
													  'right'
													? 'flex-end'
													: 'flex-start',
										} }
										onMouseEnter={ ( e ) => {
											if ( buttonHoverBgColor )
												e.target.style.backgroundColor =
													buttonHoverBgColor;
											if ( buttonHoverTextColor )
												e.target.style.color =
													buttonHoverTextColor;
											if (
												buttonHoverBorderColor &&
												buttonBorderWidth > 0
											)
												e.target.style.borderColor =
													buttonHoverBorderColor;
											if ( buttonHoverBoxShadow ) {
												e.target.style.boxShadow = `${ buttonHoverBoxShadowOffsetX }px ${ buttonHoverBoxShadowOffsetY }px ${ buttonHoverBoxShadowBlur }px ${ buttonHoverBoxShadowSpread }px ${
													buttonHoverBoxShadowColor ||
													buttonBoxShadowColor
												}`;
											}
											e.target.style.transform = `translateY(${ buttonHoverTranslateY }px) scale(${ buttonHoverScale })`;
										} }
										onMouseLeave={ ( e ) => {
											e.target.style.backgroundColor =
												buttonBgColor;
											e.target.style.color =
												buttonTextColor;
											if ( buttonBorderWidth > 0 )
												e.target.style.borderColor =
													buttonBorderColor;
											e.target.style.boxShadow =
												buttonBoxShadow
													? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
													: 'none';
											e.target.style.transform =
												'translateY(0) scale(1)';
										} }
									>
										{ buttonIcon &&
											buttonIconPosition === 'left' && (
												<span
													className={ buttonIcon }
													aria-hidden="true"
												></span>
											) }
										{ buttonText }
										{ buttonIcon &&
											buttonIconPosition === 'right' && (
												<span
													className={ buttonIcon }
													aria-hidden="true"
												></span>
											) }
									</a>
								</div>
							) }
						</div>
					</>
				) : (
					<div
						className="service-content service-card-dark"
						style={ {
							...getBackgroundStyle(),
							padding: `${ contentPadding }px`,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							minHeight: '320px',
							flex: 1,
							gap: '32px',
						} }
					>
						{ infoBlocks.length === 0 ? (
							<p style={ { textAlign: 'center', opacity: 0.7 } }>
								{ __(
									'Add info blocks using the sidebar settings',
									'twork-builder'
								) }
							</p>
						) : (
							infoBlocks.map( ( block, index ) => (
								<div
									key={ index }
									className="info-block"
									style={ {
										display: 'flex',
										alignItems: 'flex-start',
										gap: '18px',
									} }
								>
									<div
										className={ `info-icon ${
											( block.mediaType || 'icon' ) === 'icon'
												? 'info-icon--icon'
												: 'info-icon--media'
										}` }
									>
										{ ( block.mediaType || 'icon' ) === 'icon' ? (
											<i
												className={ block.icon }
												aria-hidden="true"
												style={ {
													fontSize: '1.5rem',
													color: '#f48b2a',
													width: '24px',
													textAlign: 'center',
													flexShrink: 0,
													marginTop: '2px',
												} }
											/>
										) : ( block.mediaType || '' ) === 'image' && block.mediaUrl ? (
											<img
												src={ block.mediaUrl }
												alt={ block.mediaAlt || '' }
												style={ {
													width: `${ block.mediaWidth || 40 }px`,
													height: 'auto',
													objectFit: 'contain',
												} }
											/>
										) : ( block.mediaType || '' ) === 'video' && block.mediaUrl ? (
											<video
												src={ block.mediaUrl }
												autoPlay
												loop
												muted
												playsInline
												style={ {
													width: `${ block.mediaWidth || 40 }px`,
													height: 'auto',
													objectFit: 'contain',
												} }
											/>
										) : (
											<i
												className={ block.icon }
												aria-hidden="true"
												style={ {
													fontSize: '1.5rem',
													color: '#f48b2a',
													width: '24px',
													textAlign: 'center',
													flexShrink: 0,
													marginTop: '2px',
												} }
											/>
										) }
									</div>

									<div style={ { flex: 1 } }>
										<h4
											style={ {
												textTransform: 'uppercase',
												fontSize: '0.8rem',
												fontWeight: 700,
												margin: '0 0 6px 0',
												letterSpacing: '0.8px',
												color: '#ffffff',
											} }
										>
											{ block.title }
										</h4>
										<p
											style={ {
												margin: 0,
												fontSize: '0.95rem',
												color: '#ffffff',
												lineHeight: 1.5,
												opacity: 0.9,
											} }
										>
											{ block.content }
											{ block.subtitle && (
												<>
													<br />
													<span
														style={ {
															display: 'block',
															fontSize: '0.8rem',
															opacity: 0.75,
															marginTop: '4px',
														} }
													>
														{ block.subtitle }
													</span>
												</>
											) }
										</p>
									</div>
								</div>
							) )
						) }
					</div>
				) }
			</div>
		</>
	);
}
