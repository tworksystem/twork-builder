import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
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
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		containerMaxWidth,
		containerPadding,
		cardBorderRadius,
		cardBoxShadow,
		cardBoxShadowColor,
		cardBoxShadowBlur,
		cardBoxShadowSpread,
		cardBoxShadowOffsetX,
		cardBoxShadowOffsetY,
		hoverEffect,
		hoverTranslateY,
		hoverScale,
		hoverShadowIntensity,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/team-member-item' ];
	const TEMPLATE = [
		[ 'twork/team-member-item', {} ],
		[ 'twork/team-member-item', {} ],
		[ 'twork/team-member-item', {} ],
		[ 'twork/team-member-item', {} ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-team-members-grid-editor',
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

	const gridStyle = {
		'--grid-columns': columns,
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
						title={ __( 'Section Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'twork-builder' ) }
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

						<Divider />

						<BaseControl
							label={ __( 'Background Image', 'twork-builder' ) }
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
											height: 'auto',
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

						{ backgroundImage && (
							<>
								<Divider />
								<ToggleControl
									label={ __(
										'Show Overlay',
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
						title={ __( 'Section Title', 'twork-builder' ) }
						initialOpen={ false }
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
								<TextControl
									label={ __(
										'Title Text',
										'twork-builder'
									) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

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
										'Font Size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1 }
									max={ 5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
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
									label={ __( 'Alignment', 'twork-builder' ) }
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
								<TextControl
									label={ __(
										'Subtitle Text',
										'twork-builder'
									) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>

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
										'Font Size (rem)',
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
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'twork-builder' ) }
						initialOpen={ false }
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
								'Number of columns on desktop screens',
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
								'Number of columns on tablet screens',
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
								'Number of columns on mobile screens',
								'twork-builder'
							) }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Gap Between Items (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
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
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<Divider />

						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
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
								'Padding Bottom (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Border Radius (px)',
								'twork-builder'
							) }
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Enable Box Shadow', 'twork-builder' ) }
							checked={ cardBoxShadow }
							onChange={ ( val ) =>
								setAttributes( { cardBoxShadow: val } )
							}
						/>

						{ cardBoxShadow && (
							<>
								<PanelColorSettings
									title={ __(
										'Shadow Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: cardBoxShadowColor,
											onChange: ( val ) =>
												setAttributes( {
													cardBoxShadowColor: val,
												} ),
											label: __(
												'Shadow Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __( 'Blur (px)', 'twork-builder' ) }
									value={ cardBoxShadowBlur }
									onChange={ ( val ) =>
										setAttributes( {
											cardBoxShadowBlur: val,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Spread (px)',
										'twork-builder'
									) }
									value={ cardBoxShadowSpread }
									onChange={ ( val ) =>
										setAttributes( {
											cardBoxShadowSpread: val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset X (px)',
										'twork-builder'
									) }
									value={ cardBoxShadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( {
											cardBoxShadowOffsetX: val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset Y (px)',
										'twork-builder'
									) }
									value={ cardBoxShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											cardBoxShadowOffsetY: val,
										} )
									}
									min={ -50 }
									max={ 50 }
									step={ 1 }
								/>
							</>
						) }
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
								/>

								<RangeControl
									label={ __(
										'Shadow Intensity',
										'twork-builder'
									) }
									value={ hoverShadowIntensity }
									onChange={ ( val ) =>
										setAttributes( {
											hoverShadowIntensity: val,
										} )
									}
									min={ 1 }
									max={ 3 }
									step={ 0.1 }
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
												'Fade In Up',
												'twork-builder'
											),
											value: 'fadeInUp',
										},
										{
											label: __(
												'Fade In',
												'twork-builder'
											),
											value: 'fadeIn',
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
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ backgroundImage && backgroundOverlay && (
					<div
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
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: '50px',
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
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? '10px'
											: '0',
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
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										color: sectionSubtitleColor,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }

					<div
						className="twork-team-members-grid-container"
						style={ gridStyle }
						data-columns={ columns }
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
