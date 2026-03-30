import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

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

const COMMON_ICONS = [
	{ label: __( 'Ambulance', 'twork-builder' ), value: 'fas fa-ambulance' },
	{ label: __( 'Heart', 'twork-builder' ), value: 'fas fa-heart' },
	{
		label: __( 'Hand Holding Heart', 'twork-builder' ),
		value: 'fas fa-hand-holding-heart',
	},
	{ label: __( 'Hospital', 'twork-builder' ), value: 'fas fa-hospital' },
	{
		label: __( 'Stethoscope', 'twork-builder' ),
		value: 'fas fa-stethoscope',
	},
	{ label: __( 'Pills', 'twork-builder' ), value: 'fas fa-pills' },
	{ label: __( 'Users', 'twork-builder' ), value: 'fas fa-users' },
	{
		label: __( 'Hands Helping', 'twork-builder' ),
		value: 'fas fa-hands-helping',
	},
	{ label: __( 'Globe', 'twork-builder' ), value: 'fas fa-globe' },
];

const iconSelectOptions = [
	...COMMON_ICONS,
	{ label: __( 'Custom...', 'twork-builder' ), value: '__custom__' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageId,
		imageAlt,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		iconClass,
		iconColor,
		iconBgColor,
		iconSize,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		contentPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-csr-initiative-item-editor',
			style: {
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '12px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! image ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										image: media.url,
										imageId: media.id,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Select Initiative Image',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ image }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: '10px',
										display: 'block',
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											image: '',
											imageId: null,
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove Image', 'twork-builder' ) }
								</Button>
							</div>
						) }

						{ image && (
							<>
								<Divider />
								<TextControl
									label={ __(
										'Image Alt Text',
										'twork-builder'
									) }
									value={ imageAlt }
									onChange={ ( val ) =>
										setAttributes( { imageAlt: val } )
									}
									help={ __(
										'Accessibility and SEO',
										'twork-builder'
									) }
								/>

								<RangeControl
									label={ __(
										'Image Height (px)',
										'twork-builder'
									) }
									value={ imageHeight }
									onChange={ ( val ) =>
										setAttributes( { imageHeight: val } )
									}
									min={ 120 }
									max={ 400 }
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
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Icon Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Quick Select Icon', 'twork-builder' ) }
							value={
								COMMON_ICONS.find(
									( i ) => i.value === iconClass
								)
									? iconClass
									: '__custom__'
							}
							options={ iconSelectOptions }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass:
										val === '__custom__'
											? iconClass || 'fas fa-heart'
											: val,
								} )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-heart',
								} )
							}
							help={ __(
								'e.g., fas fa-ambulance',
								'twork-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Icon Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'twork-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon Background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'twork-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Typography', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl label={ __( 'Title', 'twork-builder' ) }>
							<RangeControl
								label={ __(
									'Font Size (rem)',
									'twork-builder'
								) }
								value={ titleFontSize }
								onChange={ ( val ) =>
									setAttributes( { titleFontSize: val } )
								}
								min={ 0.9 }
								max={ 2.5 }
								step={ 0.1 }
							/>

							<RangeControl
								label={ __( 'Font Weight', 'twork-builder' ) }
								value={ titleFontWeight }
								onChange={ ( val ) =>
									setAttributes( { titleFontWeight: val } )
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
											'Title Color',
											'twork-builder'
										),
									},
								] }
							/>
						</BaseControl>
						<Divider />
						<BaseControl
							label={ __( 'Description', 'twork-builder' ) }
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
								min={ 0.75 }
								max={ 1.5 }
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
											'Description Color',
											'twork-builder'
										),
									},
								] }
							/>
						</BaseControl>
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
							min={ 15 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! image ? (
					<div
						className="init-img-wrap"
						style={ {
							height: `${ imageHeight }px`,
							background: '#e8e8e8',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#999',
							fontSize: '0.9rem',
						} }
					>
						{ __( 'Add image in sidebar', 'twork-builder' ) }
					</div>
				) : (
					<div
						className="init-img-wrap"
						style={ {
							height: `${ imageHeight }px`,
							overflow: 'hidden',
						} }
					>
						<img
							src={ image }
							alt={ imageAlt || title || '' }
							decoding="async"
							style={ {
								width: '100%',
								height: '100%',
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
							} }
						/>
					</div>
				) }

				<div
					className="init-content"
					style={ {
						padding: `${ contentPadding }px`,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					} }
				>
					<div
						className="init-icon"
						style={ {
							color: iconColor,
							backgroundColor: iconBgColor,
							fontSize: `${ iconSize }rem`,
							width: '50px',
							height: '50px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
							marginBottom: '15px',
							flexShrink: 0,
						} }
					>
						<i
							className={ iconClass || 'fas fa-heart' }
							aria-hidden="true"
						/>
					</div>
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Initiative title...',
							'twork-builder'
						) }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: titleColor,
							margin: '0 0 10px 0',
							lineHeight: 1.3,
						} }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Initiative description...',
							'twork-builder'
						) }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							margin: 0,
							lineHeight: 1.6,
						} }
					/>
				</div>
			</div>
		</>
	);
}
