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
	TextareaControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		bannerHeading,
		bannerDescription,
		backgroundImage,
		backgroundImageId,
		backgroundPositionX,
		backgroundPositionY,
		backgroundSize,
		minHeight,
		minHeightMobile,
		showOverlay,
		overlayColor,
		overlayOpacity,
		overlayGradient,
		headingColor,
		headingFontSize,
		headingFontSizeMobile,
		headingFontWeight,
		headingTextShadow,
		descriptionColor,
		descriptionFontSize,
		descriptionFontSizeMobile,
		descriptionLineHeight,
		contentPadding,
		contentPaddingMobile,
		contentMaxWidth,
		contentAlignment,
		showShape,
		shapeImage,
		shapeImageId,
		shapeHeight,
		shapeHeightMobile,
		shapePosition,
		shapeBackgroundSize,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-banner-shape-editor',
			style: {
				position: 'relative',
				minHeight: `${ minHeight }px`,
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundPosition: `${ backgroundPositionX }% ${ backgroundPositionY }%`,
				backgroundSize: backgroundSize,
				backgroundRepeat: 'no-repeat',
			},
		} ),
		[
			backgroundImage,
			backgroundPositionX,
			backgroundPositionY,
			backgroundSize,
			minHeight,
		]
	);

	const containerStyle = {
		maxWidth: `${ contentMaxWidth }px`,
		margin: '0 auto',
		padding: `${ contentPadding }px ${ contentPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
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

								<SelectControl
									label={ __(
										'Background Size',
										'twork-builder'
									) }
									value={ backgroundSize }
									options={ [
										{
											label: __(
												'Cover',
												'twork-builder'
											),
											value: 'cover',
										},
										{
											label: __(
												'Contain',
												'twork-builder'
											),
											value: 'contain',
										},
										{
											label: __(
												'Auto',
												'twork-builder'
											),
											value: 'auto',
										},
										{
											label: __(
												'100%',
												'twork-builder'
											),
											value: '100%',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { backgroundSize: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Background Position X (%)',
										'twork-builder'
									) }
									value={ backgroundPositionX }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundPositionX: val,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ 1 }
									help={ __(
										'Horizontal position of the background image',
										'twork-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Background Position Y (%)',
										'twork-builder'
									) }
									value={ backgroundPositionY }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundPositionY: val,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ 1 }
									help={ __(
										'Vertical position of the background image',
										'twork-builder'
									) }
								/>
							</>
						) }

						<Divider />

						<RangeControl
							label={ __(
								'Min Height - Desktop (px)',
								'twork-builder'
							) }
							value={ minHeight }
							onChange={ ( val ) =>
								setAttributes( { minHeight: val } )
							}
							min={ 300 }
							max={ 800 }
							step={ 10 }
							help={ __(
								'Minimum height on desktop screens',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Min Height - Mobile (px)',
								'twork-builder'
							) }
							value={ minHeightMobile }
							onChange={ ( val ) =>
								setAttributes( { minHeightMobile: val } )
							}
							min={ 200 }
							max={ 600 }
							step={ 10 }
							help={ __(
								'Minimum height on mobile screens',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Overlay Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
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
										setAttributes( { overlayOpacity: val } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>

								<ToggleControl
									label={ __(
										'Gradient Overlay',
										'twork-builder'
									) }
									checked={ overlayGradient }
									onChange={ ( val ) =>
										setAttributes( {
											overlayGradient: val,
										} )
									}
									help={ __(
										'Apply gradient effect to overlay',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Heading Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Heading Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: headingColor,
									onChange: ( val ) =>
										setAttributes( { headingColor: val } ),
									label: __(
										'Heading Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Font Size - Desktop (rem)',
								'twork-builder'
							) }
							value={ headingFontSize }
							onChange={ ( val ) =>
								setAttributes( { headingFontSize: val } )
							}
							min={ 1.5 }
							max={ 5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Font Size - Mobile (rem)',
								'twork-builder'
							) }
							value={ headingFontSizeMobile }
							onChange={ ( val ) =>
								setAttributes( { headingFontSizeMobile: val } )
							}
							min={ 1.2 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ headingFontWeight }
							onChange={ ( val ) =>
								setAttributes( { headingFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>

						<ToggleControl
							label={ __( 'Text Shadow', 'twork-builder' ) }
							checked={ headingTextShadow }
							onChange={ ( val ) =>
								setAttributes( { headingTextShadow: val } )
							}
							help={ __(
								'Add shadow effect to heading text',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Font Size - Desktop (rem)',
								'twork-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Font Size - Mobile (rem)',
								'twork-builder'
							) }
							value={ descriptionFontSizeMobile }
							onChange={ ( val ) =>
								setAttributes( {
									descriptionFontSizeMobile: val,
								} )
							}
							min={ 0.7 }
							max={ 1.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'twork-builder' ) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1.2 }
							max={ 2.5 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Content Max Width (px)',
								'twork-builder'
							) }
							value={ contentMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { contentMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 50 }
							help={ __(
								'Maximum width of the content container',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Content Padding - Desktop (px)',
								'twork-builder'
							) }
							value={ contentPadding }
							onChange={ ( val ) =>
								setAttributes( { contentPadding: val } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Content Padding - Mobile (px)',
								'twork-builder'
							) }
							value={ contentPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { contentPaddingMobile: val } )
							}
							min={ 15 }
							max={ 80 }
							step={ 5 }
						/>

						<SelectControl
							label={ __( 'Text Alignment', 'twork-builder' ) }
							value={ contentAlignment }
							options={ [
								{
									label: __( 'Center', 'twork-builder' ),
									value: 'center',
								},
								{
									label: __( 'Left', 'twork-builder' ),
									value: 'left',
								},
								{
									label: __( 'Right', 'twork-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { contentAlignment: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Shape Decoration', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Shape', 'twork-builder' ) }
							checked={ showShape }
							onChange={ ( val ) =>
								setAttributes( { showShape: val } )
							}
						/>

						{ showShape && (
							<>
								<BaseControl
									label={ __(
										'Shape Image',
										'twork-builder'
									) }
								>
									{ ! shapeImage ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													shapeImage: media.url,
													shapeImageId: media.id,
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Shape Image',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<img
												src={ shapeImage }
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
														shapeImage: '',
														shapeImageId: null,
													} )
												}
											>
												{ __(
													'Remove Shape',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</BaseControl>

								<Divider />

								<SelectControl
									label={ __(
										'Shape Position',
										'twork-builder'
									) }
									value={ shapePosition }
									options={ [
										{
											label: __(
												'Bottom',
												'twork-builder'
											),
											value: 'bottom',
										},
										{
											label: __( 'Top', 'twork-builder' ),
											value: 'top',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { shapePosition: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Shape Background Size',
										'twork-builder'
									) }
									value={ shapeBackgroundSize }
									options={ [
										{
											label: __(
												'Cover',
												'twork-builder'
											),
											value: 'cover',
										},
										{
											label: __(
												'Contain',
												'twork-builder'
											),
											value: 'contain',
										},
										{
											label: __(
												'100%',
												'twork-builder'
											),
											value: '100%',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											shapeBackgroundSize: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Shape Height - Desktop (px)',
										'twork-builder'
									) }
									value={ shapeHeight }
									onChange={ ( val ) =>
										setAttributes( { shapeHeight: val } )
									}
									min={ 50 }
									max={ 300 }
									step={ 10 }
								/>

								<RangeControl
									label={ __(
										'Shape Height - Mobile (px)',
										'twork-builder'
									) }
									value={ shapeHeightMobile }
									onChange={ ( val ) =>
										setAttributes( {
											shapeHeightMobile: val,
										} )
									}
									min={ 30 }
									max={ 200 }
									step={ 10 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showOverlay && (
					<div
						className="banner-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: overlayGradient
								? `linear-gradient(180deg, ${ overlayColor } 0%, rgba(0, 0, 0, 0.2) 50%, ${ overlayColor } 100%)`
								: overlayColor,
							opacity: overlayOpacity,
							zIndex: 1,
						} }
					/>
				) }

				<div style={ containerStyle }>
					<div
						className="banner-content"
						style={ {
							textAlign: contentAlignment,
						} }
					>
						<RichText
							tagName="h1"
							className="banner-title"
							value={ bannerHeading }
							onChange={ ( value ) =>
								setAttributes( { bannerHeading: value } )
							}
							placeholder={ __(
								'Enter banner heading...',
								'twork-builder'
							) }
							style={ {
								color: headingColor,
								fontSize: `${ headingFontSize }rem`,
								fontWeight: headingFontWeight,
								textShadow: headingTextShadow
									? '2px 2px 4px rgba(0, 0, 0, 0.3)'
									: 'none',
							} }
							data-font-size-mobile={ headingFontSizeMobile }
						/>

						{ bannerDescription && (
							<RichText
								tagName="div"
								className="banner-desc"
								value={ bannerDescription }
								onChange={ ( value ) =>
									setAttributes( {
										bannerDescription: value,
									} )
								}
								placeholder={ __(
									'Enter banner description...',
									'twork-builder'
								) }
								style={ {
									color: descriptionColor,
									fontSize: `${ descriptionFontSize }rem`,
									lineHeight: descriptionLineHeight,
								} }
								data-font-size-mobile={
									descriptionFontSizeMobile
								}
							/>
						) }
					</div>
				</div>

				{ showShape && shapeImage && (
					<div
						className="banner-shape"
						style={ {
							position: 'absolute',
							left: 0,
							right: 0,
							width: '100%',
							backgroundImage: `url(${ shapeImage })`,
							backgroundSize: shapeBackgroundSize,
							backgroundRepeat: 'no-repeat',
							backgroundPosition:
								shapePosition === 'bottom' ? 'bottom' : 'top',
							height: `${ shapeHeight }px`,
							[ shapePosition ]: 0,
							zIndex: 3,
							pointerEvents: 'none',
						} }
						data-height-mobile={ shapeHeightMobile }
					/>
				) }
			</div>
		</>
	);
}
