import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gapMobile,
		showBorder,
		borderPosition,
		borderColor,
		borderColorHover,
		borderWidth,
		borderWidthMobile,
		borderStyle,
		borderOpacity,
		showBorderDesktop,
		showBorderTablet,
		showBorderMobile,
		disableAllBorders,
		sectionBorderWidth,
		sectionBorderColor,
		sectionBorderStyle,
		sectionBorderRadius,
		sectionBoxShadow,
		sectionBoxShadowColor,
		sectionBoxShadowBlur,
		sectionBoxShadowSpread,
		sectionBoxShadowX,
		sectionBoxShadowY,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleFontSizeMobile,
		sectionSubtitleFontWeight,
		sectionSubtitleMarginBottom,
		animationOnScroll,
		animationDelay,
		animationType,
		hoverEffect,
		hoverScale,
		hoverTranslateY,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/key-service-item' ];
	const TEMPLATE = [
		[ 'twork/key-service-item', {} ],
		[ 'twork/key-service-item', {} ],
		[ 'twork/key-service-item', {} ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-key-services-section-editor',
			style: {
				backgroundColor: backgroundImage
					? 'transparent'
					: backgroundColor,
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, backgroundImage, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	// CSS custom properties for dynamic values
	const gridStyle = {
		'--grid-columns': columns,
		'--grid-columns-tablet': columnsTablet,
		'--grid-columns-mobile': columnsMobile,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Section Title & Subtitle',
							'twork-builder'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'twork-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Title Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title Font Size - Desktop (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Size - Mobile (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSizeMobile: val,
										} )
									}
									min={ 1.2 }
									max={ 3 }
									step={ 0.1 }
									help={ __(
										'Font size for mobile devices (<768px)',
										'twork-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
										'twork-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Title Alignment',
										'twork-builder'
									) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'twork-builder'
											),
											value: 'left',
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
												'Right',
												'twork-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Title Margin Bottom (px)',
										'twork-builder'
									) }
									value={ sectionTitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 5 }
								/>
							</>
						) }

						<Divider />

						<ToggleControl
							label={ __(
								'Show Section Subtitle',
								'twork-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionSubtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionSubtitleColor: val,
												} ),
											label: __(
												'Subtitle Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Size - Desktop (rem)',
										'twork-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Size - Mobile (rem)',
										'twork-builder'
									) }
									value={ sectionSubtitleFontSizeMobile }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSizeMobile: val,
										} )
									}
									min={ 0.7 }
									max={ 1.5 }
									step={ 0.05 }
									help={ __(
										'Font size for mobile devices (<768px)',
										'twork-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Subtitle Font Weight',
										'twork-builder'
									) }
									value={ sectionSubtitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Margin Bottom (px)',
										'twork-builder'
									) }
									value={ sectionSubtitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 100 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Background Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Background Type', 'twork-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											backgroundImage: media.url,
											backgroundImageId: media.id,
										} )
									}
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
										onClick={ () =>
											setAttributes( {
												backgroundImage: '',
												backgroundImageId: null,
											} )
										}
									>
										{ __(
											'Remove Image',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>

						{ ! backgroundImage && (
							<PanelColorSettings
								title={ __(
									'Background Color',
									'twork-builder'
								) }
								colorSettings={ [
									{
										value: backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'twork-builder'
										),
									},
								] }
							/>
						) }

						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Enable Overlay',
										'twork-builder'
									) }
									checked={ backgroundOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundOverlay: val,
										} )
									}
								/>

								{ backgroundOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'twork-builder'
											) }
											colorSettings={ [
												{
													value: backgroundOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															backgroundOverlayColor:
																val,
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
											value={ backgroundOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													backgroundOverlayOpacity:
														val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
							help={ __(
								'Number of columns on desktop screens (≥992px)',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
							help={ __(
								'Number of columns on tablet screens (768px - 991px)',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'twork-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
							help={ __(
								'Number of columns on mobile screens (<768px)',
								'twork-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Gap Between Items - Desktop (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Gap Between Items - Mobile (px)',
								'twork-builder'
							) }
							value={ gapMobile }
							onChange={ ( val ) =>
								setAttributes( { gapMobile: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 1 }
							help={ __(
								'Gap between items on mobile devices',
								'twork-builder'
							) }
						/>

						<Divider />
					</PanelBody>

					<PanelBody
						title={ __( 'Border Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Item Borders Control',
								'twork-builder'
							) }
						>
							<ToggleControl
								label={ __(
									'Disable All Borders',
									'twork-builder'
								) }
								checked={ disableAllBorders }
								onChange={ ( val ) => {
									setAttributes( {
										disableAllBorders: val,
										showBorder: ! val,
										showBorderDesktop: ! val
											? showBorderDesktop
											: false,
										showBorderTablet: ! val
											? showBorderTablet
											: false,
										showBorderMobile: ! val
											? showBorderMobile
											: false,
									} );
								} }
								help={ __(
									'Completely disable all borders between items. When enabled, all border settings are ignored.',
									'twork-builder'
								) }
							/>
						</BaseControl>

						{ ! disableAllBorders && (
							<>
								<Divider />

								<ToggleControl
									label={ __(
										'Enable Borders Between Items',
										'twork-builder'
									) }
									checked={ showBorder }
									onChange={ ( val ) =>
										setAttributes( { showBorder: val } )
									}
									help={ __(
										'Show borders between service items',
										'twork-builder'
									) }
								/>
							</>
						) }

						{ ! disableAllBorders && showBorder && (
							<>
								<Divider />

								<BaseControl
									label={ __(
										'Border Visibility by Device',
										'twork-builder'
									) }
								>
									<ToggleControl
										label={ __(
											'Show on Desktop',
											'twork-builder'
										) }
										checked={ showBorderDesktop }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderDesktop: val,
											} )
										}
										help={ __(
											'Display borders on desktop screens (≥992px)',
											'twork-builder'
										) }
									/>

									<ToggleControl
										label={ __(
											'Show on Tablet',
											'twork-builder'
										) }
										checked={ showBorderTablet }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderTablet: val,
											} )
										}
										help={ __(
											'Display borders on tablet screens (768px - 991px)',
											'twork-builder'
										) }
									/>

									<ToggleControl
										label={ __(
											'Show on Mobile',
											'twork-builder'
										) }
										checked={ showBorderMobile }
										onChange={ ( val ) =>
											setAttributes( {
												showBorderMobile: val,
											} )
										}
										help={ __(
											'Display borders on mobile screens (<768px)',
											'twork-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<SelectControl
									label={ __(
										'Border Position',
										'twork-builder'
									) }
									value={ borderPosition }
									options={ [
										{
											label: __(
												'Vertical (Between Columns)',
												'twork-builder'
											),
											value: 'vertical',
										},
										{
											label: __(
												'Horizontal (Between Rows)',
												'twork-builder'
											),
											value: 'horizontal',
										},
										{
											label: __(
												'Both (Grid Style)',
												'twork-builder'
											),
											value: 'both',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { borderPosition: val } )
									}
									help={ __(
										'Where to display borders between items',
										'twork-builder'
									) }
								/>

								<Divider />

								<PanelColorSettings
									title={ __(
										'Border Colors',
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
										{
											value: borderColorHover,
											onChange: ( val ) =>
												setAttributes( {
													borderColorHover: val,
												} ),
											label: __(
												'Border Hover Color (Optional)',
												'twork-builder'
											),
										},
									] }
								/>

								<Divider />

								<BaseControl
									label={ __(
										'Border Width',
										'twork-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Border Width - Desktop (px)',
											'twork-builder'
										) }
										value={ borderWidth }
										onChange={ ( val ) =>
											setAttributes( {
												borderWidth: val,
											} )
										}
										min={ 0 }
										max={ 10 }
										step={ 0.5 }
										help={ __(
											'Border thickness on desktop screens',
											'twork-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Border Width - Mobile (px)',
											'twork-builder'
										) }
										value={ borderWidthMobile }
										onChange={ ( val ) =>
											setAttributes( {
												borderWidthMobile: val,
											} )
										}
										min={ 0 }
										max={ 10 }
										step={ 0.5 }
										help={ __(
											'Border thickness on mobile devices',
											'twork-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<SelectControl
									label={ __(
										'Border Style',
										'twork-builder'
									) }
									value={ borderStyle }
									options={ [
										{
											label: __(
												'Solid',
												'twork-builder'
											),
											value: 'solid',
										},
										{
											label: __(
												'Dashed',
												'twork-builder'
											),
											value: 'dashed',
										},
										{
											label: __(
												'Dotted',
												'twork-builder'
											),
											value: 'dotted',
										},
										{
											label: __(
												'Double',
												'twork-builder'
											),
											value: 'double',
										},
										{
											label: __(
												'Groove',
												'twork-builder'
											),
											value: 'groove',
										},
										{
											label: __(
												'Ridge',
												'twork-builder'
											),
											value: 'ridge',
										},
										{
											label: __(
												'Inset',
												'twork-builder'
											),
											value: 'inset',
										},
										{
											label: __(
												'Outset',
												'twork-builder'
											),
											value: 'outset',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { borderStyle: val } )
									}
									help={ __(
										'Visual style of the border',
										'twork-builder'
									) }
								/>

								<Divider />

								<RangeControl
									label={ __(
										'Border Opacity',
										'twork-builder'
									) }
									value={ borderOpacity }
									onChange={ ( val ) =>
										setAttributes( { borderOpacity: val } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
									help={ __(
										'Transparency of the border (0 = transparent, 1 = opaque)',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Section Border & Shadow',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Section Border', 'twork-builder' ) }
						>
							<RangeControl
								label={ __(
									'Border Width (px)',
									'twork-builder'
								) }
								value={ sectionBorderWidth }
								onChange={ ( val ) =>
									setAttributes( { sectionBorderWidth: val } )
								}
								min={ 0 }
								max={ 20 }
								step={ 1 }
								help={ __(
									'Border width around the entire section',
									'twork-builder'
								) }
							/>

							{ sectionBorderWidth > 0 && (
								<>
									<PanelColorSettings
										title={ __(
											'Border Color',
											'twork-builder'
										) }
										colorSettings={ [
											{
												value: sectionBorderColor,
												onChange: ( val ) =>
													setAttributes( {
														sectionBorderColor: val,
													} ),
												label: __(
													'Border Color',
													'twork-builder'
												),
											},
										] }
									/>

									<SelectControl
										label={ __(
											'Border Style',
											'twork-builder'
										) }
										value={ sectionBorderStyle }
										options={ [
											{
												label: __(
													'Solid',
													'twork-builder'
												),
												value: 'solid',
											},
											{
												label: __(
													'Dashed',
													'twork-builder'
												),
												value: 'dashed',
											},
											{
												label: __(
													'Dotted',
													'twork-builder'
												),
												value: 'dotted',
											},
											{
												label: __(
													'Double',
													'twork-builder'
												),
												value: 'double',
											},
											{
												label: __(
													'Groove',
													'twork-builder'
												),
												value: 'groove',
											},
											{
												label: __(
													'Ridge',
													'twork-builder'
												),
												value: 'ridge',
											},
											{
												label: __(
													'Inset',
													'twork-builder'
												),
												value: 'inset',
											},
											{
												label: __(
													'Outset',
													'twork-builder'
												),
												value: 'outset',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBorderStyle: val,
											} )
										}
									/>

									<RangeControl
										label={ __(
											'Border Radius (px)',
											'twork-builder'
										) }
										value={ sectionBorderRadius }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBorderRadius: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Rounded corners for the section',
											'twork-builder'
										) }
									/>
								</>
							) }
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Box Shadow', 'twork-builder' ) }
						>
							<ToggleControl
								label={ __(
									'Enable Box Shadow',
									'twork-builder'
								) }
								checked={ sectionBoxShadow }
								onChange={ ( val ) =>
									setAttributes( { sectionBoxShadow: val } )
								}
								help={ __(
									'Add shadow effect to the section',
									'twork-builder'
								) }
							/>

							{ sectionBoxShadow && (
								<>
									<PanelColorSettings
										title={ __(
											'Shadow Color',
											'twork-builder'
										) }
										colorSettings={ [
											{
												value: sectionBoxShadowColor,
												onChange: ( val ) =>
													setAttributes( {
														sectionBoxShadowColor:
															val,
													} ),
												label: __(
													'Shadow Color',
													'twork-builder'
												),
											},
										] }
									/>

									<RangeControl
										label={ __(
											'Horizontal Offset (px)',
											'twork-builder'
										) }
										value={ sectionBoxShadowX }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowX: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Horizontal shadow position',
											'twork-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Vertical Offset (px)',
											'twork-builder'
										) }
										value={ sectionBoxShadowY }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowY: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Vertical shadow position',
											'twork-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Blur Radius (px)',
											'twork-builder'
										) }
										value={ sectionBoxShadowBlur }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowBlur: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 1 }
										help={ __(
											'Shadow blur amount',
											'twork-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Spread Radius (px)',
											'twork-builder'
										) }
										value={ sectionBoxShadowSpread }
										onChange={ ( val ) =>
											setAttributes( {
												sectionBoxShadowSpread: val,
											} )
										}
										min={ -50 }
										max={ 50 }
										step={ 1 }
										help={ __(
											'Shadow spread amount',
											'twork-builder'
										) }
									/>
								</>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'twork-builder' ) }
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
							help={ __(
								'Maximum width of the container',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Container Padding - Desktop (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
							help={ __(
								'Horizontal padding for the container on desktop',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Container Padding - Mobile (px)',
								'twork-builder'
							) }
							value={ containerPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingMobile: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
							help={ __(
								'Horizontal padding for the container on mobile',
								'twork-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Padding Top - Desktop (px)',
								'twork-builder'
							) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom - Desktop (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Padding Top - Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
							help={ __(
								'Top padding for mobile devices',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom - Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
							help={ __(
								'Bottom padding for mobile devices',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Hover Effects', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Hover Effects',
								'twork-builder'
							) }
							checked={ hoverEffect }
							onChange={ ( val ) =>
								setAttributes( { hoverEffect: val } )
							}
							help={ __(
								'Enable hover animations for service items',
								'twork-builder'
							) }
						/>

						{ hoverEffect && (
							<>
								<RangeControl
									label={ __(
										'Translate Y (px)',
										'twork-builder'
									) }
									value={ hoverTranslateY }
									onChange={ ( val ) =>
										setAttributes( {
											hoverTranslateY: val,
										} )
									}
									min={ -20 }
									max={ 20 }
									step={ 1 }
									help={ __(
										'Vertical movement on hover (negative = up)',
										'twork-builder'
									) }
								/>

								<RangeControl
									label={ __( 'Scale', 'twork-builder' ) }
									value={ hoverScale }
									onChange={ ( val ) =>
										setAttributes( { hoverScale: val } )
									}
									min={ 0.8 }
									max={ 1.2 }
									step={ 0.01 }
									help={ __(
										'Scale transformation on hover',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Animation Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
							help={ __(
								'Animate items when they scroll into view',
								'twork-builder'
							) }
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation Type',
										'twork-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade In',
												'twork-builder'
											),
											value: 'fadeIn',
										},
										{
											label: __(
												'Fade In Up',
												'twork-builder'
											),
											value: 'fadeInUp',
										},
										{
											label: __(
												'Slide In Left',
												'twork-builder'
											),
											value: 'slideInLeft',
										},
										{
											label: __(
												'Slide In Right',
												'twork-builder'
											),
											value: 'slideInRight',
										},
										{
											label: __(
												'Zoom In',
												'twork-builder'
											),
											value: 'zoomIn',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation Delay (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 50 }
									help={ __(
										'Delay between each item animation',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ backgroundImage && backgroundOverlay && (
					<div
						className="background-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 1,
						} }
					/>
				) }

				<div style={ containerStyle }>
					<div
						className="editor-label"
						style={ {
							textAlign: 'center',
							padding: '10px',
							background: '#2271b1',
							color: '#fff',
							fontWeight: '600',
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: '20px',
							borderRadius: '4px',
						} }
					>
						{ __(
							'Key Services Section (Editor View)',
							'twork-builder'
						) }
					</div>

					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="section-header"
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: `${ sectionSubtitleMarginBottom }px`,
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section Title...',
										'twork-builder'
									) }
									className="section-title"
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? `${ sectionTitleMarginBottom }px`
											: '0',
										marginTop: 0,
									} }
								/>
							) }
							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Section Subtitle...',
										'twork-builder'
									) }
									className="section-subtitle"
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										fontWeight: sectionSubtitleFontWeight,
										color: sectionSubtitleColor,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }

					<div
						className="twork-key-services-grid-container"
						style={ gridStyle }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
						data-gap={ gap }
						data-gap-mobile={ gapMobile }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
