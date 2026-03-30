import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
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
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleFontWeight,
		sectionSubtitleMarginBottom,
		checklistItems,
		imageUrl,
		imageId,
		imageAlt,
		backgroundColor,
		backgroundImage,
		backgroundImageId,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		boxBorderRadius,
		boxPadding,
		checkboxAccentColor,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-health-check-checklist-editor chk-section chk-checklist-section',
			style: {
				backgroundColor: backgroundImage
					? 'transparent'
					: backgroundColor || '#f4f8fb',
				backgroundImage: backgroundImage
					? `url(${ backgroundImage })`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				'--chk-primary': checkboxAccentColor || '#f48b2a',
				'--chk-radius': `${ boxBorderRadius }px`,
			},
		} ),
		[
			backgroundColor,
			backgroundImage,
			boxBorderRadius,
			checkboxAccentColor,
			paddingBottom,
			paddingTop,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: `${ gridGap }px`,
		alignItems: 'center',
	};

	const items = Array.isArray( checklistItems ) ? checklistItems : [];
	const addItem = () =>
		setAttributes( {
			checklistItems: [
				...items,
				__( 'New checklist item', 'twork-builder' ),
			],
		} );
	const updateItem = ( index, value ) => {
		const next = [ ...items ];
		next[ index ] = value;
		setAttributes( { checklistItems: next } );
	};
	const removeItem = ( index ) =>
		setAttributes( {
			checklistItems: items.filter( ( _, i ) => i !== index ),
		} );

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
										'Title Font Size (rem)',
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
										'Subtitle Font Size (rem)',
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
									min={ 0 }
									max={ 60 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Checklist Items', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ items.map( ( item, index ) => (
							<div
								key={ index }
								style={ {
									display: 'flex',
									gap: 8,
									alignItems: 'center',
									marginBottom: 8,
								} }
							>
								<TextControl
									value={ item }
									onChange={ ( v ) => updateItem( index, v ) }
									placeholder={ __(
										'Checklist item text',
										'twork-builder'
									) }
									style={ { flex: 1 } }
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeItem( index ) }
									icon="no-alt"
									aria-label={ __(
										'Remove item',
										'twork-builder'
									) }
								/>
							</div>
						) ) }
						<Button
							isSecondary
							isSmall
							onClick={ addItem }
							icon="plus"
						>
							{ __( 'Add checklist item', 'twork-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Right Column Image', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl label={ __( 'Image', 'twork-builder' ) }>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt:
												media.alt ||
												__( 'Doctor', 'twork-builder' ),
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Right column image',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ imageUrl }
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
										value={ imageAlt || '' }
										onChange={ ( v ) =>
											setAttributes( { imageAlt: v } )
										}
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: null,
												imageAlt: '',
											} )
										}
										style={ { marginTop: 8 } }
									>
										{ __(
											'Remove image',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
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
											marginBottom: 10,
											borderRadius: 4,
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
						title={ __( 'Container & Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
							help={ __(
								'Maximum width of the content container',
								'twork-builder'
							) }
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
							label={ __( 'Grid Gap (px)', 'twork-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
							help={ __(
								'Space between checklist column and image',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Checklist Box Border Radius (px)',
								'twork-builder'
							) }
							value={ boxBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { boxBorderRadius: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Checklist Box Padding (px)',
								'twork-builder'
							) }
							value={ boxPadding }
							onChange={ ( val ) =>
								setAttributes( { boxPadding: val } )
							}
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
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
								'Section Padding Bottom (px)',
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
						title={ __( 'Checklist Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Checkbox Accent Color',
								'twork-builder'
							) }
							colorSettings={ [
								{
									value: checkboxAccentColor,
									onChange: ( val ) =>
										setAttributes( {
											checkboxAccentColor: val,
										} ),
									label: __(
										'Checkbox accent (focus/check)',
										'twork-builder'
									),
								},
							] }
						/>
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
								'Animate columns when they scroll into view',
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

			<section { ...blockProps }>
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

				<div className="chk-container" style={ containerStyle }>
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
							'Health Check Checklist Section (Editor View)',
							'twork-builder'
						) }
					</div>

					<div className="chk-checklist-grid" style={ gridStyle }>
						<div className="fade-up">
							{ ( showSectionTitle || showSectionSubtitle ) && (
								<div
									className="section-header"
									style={ {
										textAlign: sectionTitleAlignment,
										marginBottom: showSectionSubtitle
											? `${ sectionSubtitleMarginBottom }px`
											: `${ sectionTitleMarginBottom }px`,
									} }
								>
									{ showSectionTitle && (
										<RichText
											tagName="h2"
											value={ sectionTitle }
											onChange={ ( val ) =>
												setAttributes( {
													sectionTitle: val,
												} )
											}
											placeholder={ __(
												'Are You Due for a Checkup?',
												'twork-builder'
											) }
											style={ {
												fontSize: `${ sectionTitleFontSize }rem`,
												fontWeight:
													sectionTitleFontWeight,
												color: sectionTitleColor,
												marginBottom:
													showSectionSubtitle
														? `${ sectionTitleMarginBottom }px`
														: 0,
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
												"If you check more than 2 boxes, it's time to book an appointment.",
												'twork-builder'
											) }
											style={ {
												fontSize: `${ sectionSubtitleFontSize }rem`,
												fontWeight:
													sectionSubtitleFontWeight,
												color:
													sectionSubtitleColor ||
													'#666',
												margin: 0,
											} }
										/>
									) }
								</div>
							) }
							<div
								className="chk-checklist-box"
								style={ {
									background: '#fff',
									padding: `${ boxPadding }px`,
									borderRadius: `${ boxBorderRadius }px`,
									boxShadow:
										'0 15px 40px rgba(0, 95, 115, 0.1)',
								} }
							>
								{ items.length > 0 ? (
									items.map( ( item, index ) => (
										<label
											key={ index }
											className="chk-checklist-item"
										>
											<input
												type="checkbox"
												readOnly
												disabled
											/>

											{ item }
										</label>
									) )
								) : (
									<p style={ { color: '#999', margin: 0 } }>
										{ __(
											'Add checklist items in the sidebar.',
											'twork-builder'
										) }
									</p>
								) }
							</div>
						</div>
						<div className="fade-up">
							{ imageUrl ? (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									className="chk-checklist-img"
									style={ {
										width: '100%',
										borderRadius: `${ boxBorderRadius }px`,
										boxShadow:
											'0 15px 40px rgba(0, 95, 115, 0.1)',
									} }
								/>
							) : (
								<div
									className="chk-checklist-img chk-checklist-img-placeholder"
									style={ {
										width: '100%',
										minHeight: 300,
										background: '#f0f0f0',
										borderRadius: `${ boxBorderRadius }px`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#999',
									} }
								>
									{ __(
										'Add image in sidebar',
										'twork-builder'
									) }
								</div>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
