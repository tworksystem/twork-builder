/**
 * Twork Emergency Ambulance Section – Editor
 * Split section: image + content (title, description, feature list, CTA). Layout Left/Right, icon or image per feature.
 */
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
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

const DASHICONS_OPTIONS = [
	{ value: 'dashicons-yes', label: __( 'Check (yes)', 'twork-builder' ) },
	{ value: 'dashicons-admin-users', label: __( 'Users', 'twork-builder' ) },
	{
		value: 'dashicons-location-alt',
		label: __( 'Location', 'twork-builder' ),
	},
	{ value: 'dashicons-car', label: __( 'Car', 'twork-builder' ) },
	{ value: 'dashicons-heart', label: __( 'Heart', 'twork-builder' ) },
	{ value: 'dashicons-phone', label: __( 'Phone', 'twork-builder' ) },
	{ value: 'dashicons-clock', label: __( 'Clock', 'twork-builder' ) },
	{ value: 'dashicons-shield', label: __( 'Shield', 'twork-builder' ) },
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'twork-builder' ) },
	{
		value: 'dashicons-performance',
		label: __( 'Performance', 'twork-builder' ),
	},
	{ value: 'dashicons-chart-line', label: __( 'Chart', 'twork-builder' ) },
	{ value: 'dashicons-editor-help', label: __( 'Help', 'twork-builder' ) },
	{ value: 'dashicons-camera', label: __( 'Camera', 'twork-builder' ) },
	{
		value: 'dashicons-admin-generic',
		label: __( 'Generic', 'twork-builder' ),
	},
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		layout,
		imageUrl,
		imageId,
		imageAlt,
		title,
		titleColor,
		titleFontSize,
		description,
		descriptionColor,
		descriptionFontSize,
		features,
		iconColor,
		iconBgColor,
		iconSizePx,
		buttonText,
		buttonUrl,
		buttonStyle,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gap,
		imageBorderRadius,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-em-amb-section-editor em-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const wrapperStyle = {
		display: 'grid',
		gap: `${ gap }px`,
		alignItems: 'center',
	};

	const imageCol = layout === 'image-left' ? 0 : 1;
	const contentCol = layout === 'image-left' ? 1 : 0;

	const addFeature = () => {
		const id = Date.now();
		setAttributes( {
			features: [
				...( features || [] ),
				{
					id,
					iconType: 'fontawesome',
					iconValue: 'fas fa-check',
					iconImageUrl: '',
					iconImageId: null,
					title: __( 'New feature', 'twork-builder' ),
					description: '',
				},
			],
		} );
	};

	const updateFeature = ( id, field, value ) => {
		const next = ( features || [] ).map( ( f ) =>
			f.id === id ? { ...f, [ field ]: value } : f
		);
		setAttributes( { features: next } );
	};

	const removeFeature = ( id ) => {
		setAttributes( {
			features: ( features || [] ).filter( ( f ) => f.id !== id ),
		} );
	};

	const items = Array.isArray( features ) ? features : [];

	const renderFeatureIcon = ( item ) => {
		if ( item.iconType === 'image' && item.iconImageUrl ) {
			return (
				<img
					src={ item.iconImageUrl }
					alt=""
					style={ {
						width: iconSizePx,
						height: iconSizePx,
						objectFit: 'cover',
						borderRadius: '50%',
					} }
				/>
			);
		}
		if ( item.iconType === 'dashicons' && item.iconValue ) {
			return (
				<span
					className={ item.iconValue }
					style={ {
						fontSize: `${ iconSizePx * 0.5 }px`,
						color: iconColor,
						backgroundColor: iconBgColor,
						width: iconSizePx,
						height: iconSizePx,
						borderRadius: '50%',
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
					} }
					aria-hidden
				/>
			);
		}
		if ( item.iconValue ) {
			return (
				<i
					className={ item.iconValue }
					style={ {
						fontSize: `${ iconSizePx * 0.5 }px`,
						color: iconColor,
						backgroundColor: iconBgColor,
						width: iconSizePx,
						height: iconSizePx,
						borderRadius: '50%',
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
					} }
					aria-hidden
				/>
			);
		}
		return (
			<span
				style={ {
					width: iconSizePx,
					height: iconSizePx,
					borderRadius: '50%',
					background: iconBgColor,
					display: 'inline-block',
				} }
			/>
		);
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Image position', 'twork-builder' ) }
							value={ layout }
							options={ [
								{
									label: __(
										'Image left, content right',
										'twork-builder'
									),
									value: 'image-left',
								},
								{
									label: __(
										'Image right, content left',
										'twork-builder'
									),
									value: 'image-right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { layout: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section image', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Section image',
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
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</Button>
							</div>
						) }
						<TextControl
							label={ __( 'Image alt text', 'twork-builder' ) }
							value={ imageAlt || '' }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val || '' } )
							}
						/>

						<RangeControl
							label={ __(
								'Image border radius (px)',
								'twork-builder'
							) }
							value={ imageBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { imageBorderRadius: val } )
							}
							min={ 0 }
							max={ 32 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title & description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title font size (rem)',
								'twork-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 3.5 }
							step={ 0.1 }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Description color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __( 'Description', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description font size (rem)',
								'twork-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Feature list icons', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Icon style', 'twork-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon color', 'twork-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon size (px)', 'twork-builder' ) }
							value={ iconSizePx }
							onChange={ ( val ) =>
								setAttributes( { iconSizePx: val } )
							}
							min={ 32 }
							max={ 64 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Feature list', 'twork-builder' ) }
						initialOpen={ false }
					>
						<p
							style={ {
								margin: '0 0 10px',
								fontSize: 12,
								color: '#666',
							} }
						>
							{ __(
								'For each item choose WordPress (Dashicons), Font Awesome, or Image.',
								'twork-builder'
							) }
						</p>
						{ items.map( ( item ) => (
							<div
								key={ item.id }
								style={ {
									marginBottom: 16,
									padding: 12,
									background: '#f6f7f7',
									borderRadius: 4,
								} }
							>
								<SelectControl
									label={ __( 'Icon type', 'twork-builder' ) }
									value={ item.iconType || 'fontawesome' }
									options={ [
										{
											label: __(
												'WordPress (Dashicons)',
												'twork-builder'
											),
											value: 'dashicons',
										},
										{
											label: __(
												'Font Awesome',
												'twork-builder'
											),
											value: 'fontawesome',
										},
										{
											label: __(
												'Image',
												'twork-builder'
											),
											value: 'image',
										},
									] }
									onChange={ ( val ) =>
										updateFeature(
											item.id,
											'iconType',
											val
										)
									}
								/>

								{ ( item.iconType || 'fontawesome' ) ===
									'dashicons' && (
									<SelectControl
										label={ __(
											'Dashicon',
											'twork-builder'
										) }
										value={
											item.iconValue || 'dashicons-yes'
										}
										options={ DASHICONS_OPTIONS }
										onChange={ ( val ) =>
											updateFeature(
												item.id,
												'iconValue',
												val
											)
										}
									/>
								) }
								{ ( item.iconType || 'fontawesome' ) ===
									'fontawesome' && (
									<TextControl
										label={ __(
											'Font Awesome class',
											'twork-builder'
										) }
										value={ item.iconValue || '' }
										onChange={ ( val ) =>
											updateFeature(
												item.id,
												'iconValue',
												val
											)
										}
										placeholder="fas fa-check"
									/>
								) }
								{ item.iconType === 'image' && (
									<BaseControl
										label={ __(
											'Icon image',
											'twork-builder'
										) }
									>
										{ item.iconImageUrl ? (
											<div>
												<img
													src={ item.iconImageUrl }
													alt=""
													style={ {
														maxWidth: 48,
														height: 48,
														objectFit: 'cover',
														borderRadius: '50%',
														display: 'block',
														marginBottom: 6,
													} }
												/>

												<Button
													isSecondary
													isSmall
													onClick={ () => {
														updateFeature(
															item.id,
															'iconImageUrl',
															''
														);
														updateFeature(
															item.id,
															'iconImageId',
															null
														);
													} }
												>
													{ __(
														'Remove image',
														'twork-builder'
													) }
												</Button>
											</div>
										) : (
											<MediaPlaceholder
												onSelect={ ( media ) => {
													updateFeature(
														item.id,
														'iconImageUrl',
														media.url
													);
													updateFeature(
														item.id,
														'iconImageId',
														media.id
													);
												} }
												allowedTypes={ [ 'image' ] }
												multiple={ false }
												labels={ {
													title: __(
														'Upload icon image',
														'twork-builder'
													),
												} }
											/>
										) }
									</BaseControl>
								) }
								<TextControl
									label={ __( 'Title', 'twork-builder' ) }
									value={ item.title }
									onChange={ ( val ) =>
										updateFeature( item.id, 'title', val )
									}
								/>

								<TextControl
									label={ __(
										'Description',
										'twork-builder'
									) }
									value={ item.description }
									onChange={ ( val ) =>
										updateFeature(
											item.id,
											'description',
											val
										)
									}
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeFeature( item.id ) }
									style={ { marginTop: 8 } }
								>
									{ __( 'Remove item', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isPrimary isSmall onClick={ addFeature }>
							{ __( 'Add feature', 'twork-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ buttonText || '' }
							onChange={ ( val ) =>
								setAttributes( { buttonText: val || '' } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'twork-builder' ) }
							value={ buttonUrl || '' }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val || '' } )
							}
							placeholder="tel:199"
						/>

						<SelectControl
							label={ __( 'Button style', 'twork-builder' ) }
							value={ buttonStyle }
							options={ [
								{
									label: __( 'Primary', 'twork-builder' ),
									value: 'primary',
								},
								{
									label: __( 'Secondary', 'twork-builder' ),
									value: 'secondary',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { buttonStyle: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section & container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
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
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
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
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
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
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Gap between columns (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 24 }
							max={ 80 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<SelectControl
								label={ __(
									'Animation type',
									'twork-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __( 'Fade up', 'twork-builder' ),
										value: 'fade-up',
									},
									{
										label: __( 'Fade in', 'twork-builder' ),
										value: 'fadeIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="em-container" style={ containerStyle }>
					<div
						className="em-amb-wrapper"
						style={ wrapperStyle }
						data-layout={ layout }
					>
						<div
							className="em-amb-col em-amb-col-image"
							style={ { order: imageCol + 1 } }
						>
							{ imageUrl ? (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									className="em-amb-img"
									style={ {
										borderRadius: `${ imageBorderRadius }px`,
										width: '100%',
										height: 'auto',
										display: 'block',
									} }
								/>
							) : (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Ambulance / section image',
											'twork-builder'
										),
									} }
									className="em-amb-img-placeholder"
								/>
							) }
						</div>
						<div
							className="em-amb-col em-amb-col-content"
							style={ { order: contentCol + 1 } }
						>
							<RichText
								tagName="h2"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Mobile ICU on Wheels',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ titleFontSize }rem`,
									marginBottom: 20,
									color: titleColor,
								} }
							/>

							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									'Our ambulance fleet...',
									'twork-builder'
								) }
								style={ {
									color: descriptionColor,
									marginBottom: 30,
									fontSize: `${ descriptionFontSize }rem`,
								} }
							/>

							<ul
								className="em-feature-list"
								style={ {
									listStyle: 'none',
									padding: 0,
									margin: '0 0 24px',
								} }
							>
								{ items.map( ( item ) => (
									<li
										key={ item.id }
										style={ {
											marginBottom: 20,
											display: 'flex',
											alignItems: 'flex-start',
											gap: 15,
										} }
									>
										<span style={ { flexShrink: 0 } }>
											{ item.iconType === 'image' &&
											! item.iconImageUrl ? (
												<span
													style={ {
														width: iconSizePx,
														height: iconSizePx,
														borderRadius: '50%',
														background: iconBgColor,
														display: 'inline-flex',
														alignItems: 'center',
														justifyContent:
															'center',
														fontSize: 12,
														color: iconColor,
													} }
												>
													IMG
												</span>
											) : (
												renderFeatureIcon( item )
											) }
										</span>
										<div style={ { flex: 1, minWidth: 0 } }>
											<TextControl
												value={ item.title }
												onChange={ ( val ) =>
													updateFeature(
														item.id,
														'title',
														val
													)
												}
												placeholder={ __(
													'Title',
													'twork-builder'
												) }
												style={ { marginBottom: 4 } }
											/>

											<TextControl
												value={ item.description }
												onChange={ ( val ) =>
													updateFeature(
														item.id,
														'description',
														val
													)
												}
												placeholder={ __(
													'Description',
													'twork-builder'
												) }
												style={ { margin: 0 } }
											/>
										</div>
										<Button
											isDestructive
											isSmall
											onClick={ () =>
												removeFeature( item.id )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</li>
								) ) }
							</ul>
							<Button
								isPrimary
								isSmall
								onClick={ addFeature }
								style={ { marginBottom: 20 } }
							>
								{ __( 'Add feature', 'twork-builder' ) }
							</Button>
							<a
								href={ buttonUrl || '#' }
								className={ `em-btn em-btn-${ buttonStyle }` }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '14px 32px',
									borderRadius: 50,
									fontWeight: 700,
									textTransform: 'uppercase',
									fontSize: '0.9rem',
									background:
										buttonStyle === 'primary'
											? '#f48b2a'
											: 'transparent',
									color:
										buttonStyle === 'primary'
											? '#fff'
											: '#f48b2a',
									border: `2px solid #f48b2a`,
									textDecoration: 'none',
								} }
								onClick={ ( e ) => e.preventDefault() }
							>
								{ buttonText ||
									__(
										'Call Ambulance Now',
										'twork-builder'
									) }
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
