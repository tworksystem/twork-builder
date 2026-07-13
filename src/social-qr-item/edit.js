import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import {
	getPlatformPreset,
	PLATFORM_OPTIONS,
} from './platform-presets';
import {
	FOCAL_PRESET_COORDS,
	getQrImageStyle,
} from './qr-image-utils';

const OBJECT_FIT_OPTIONS = [
	{
		label: __( 'Contain (full QR)', 'twork-builder' ),
		value: 'contain',
	},
	{
		label: __( 'Cover (crop fill)', 'twork-builder' ),
		value: 'cover',
	},
];

const FOCAL_PRESET_OPTIONS = [
	{ label: __( 'Center', 'twork-builder' ), value: 'center' },
	{ label: __( 'Top', 'twork-builder' ), value: 'top' },
	{ label: __( 'Bottom', 'twork-builder' ), value: 'bottom' },
	{ label: __( 'Left', 'twork-builder' ), value: 'left' },
	{ label: __( 'Right', 'twork-builder' ), value: 'right' },
	{ label: __( 'Top Left', 'twork-builder' ), value: 'top-left' },
	{ label: __( 'Top Right', 'twork-builder' ), value: 'top-right' },
	{ label: __( 'Bottom Left', 'twork-builder' ), value: 'bottom-left' },
	{ label: __( 'Bottom Right', 'twork-builder' ), value: 'bottom-right' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		platform,
		platformLabel,
		showPlatformBadge,
		qrImage,
		qrImageId,
		qrImageAlt,
		qrImageObjectFit,
		qrImageFocalPreset,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
		footerLabel,
		showFooterLabel,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonFontSize,
		buttonFontWeight,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonBorderRadius,
		buttonMarginTop,
	} = attributes;

	const preset = getPlatformPreset( platform );
	const displayLabel = platformLabel || preset.label;
	const qrImageStyle = getQrImageStyle( {
		qrImageObjectFit,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
	} );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-social-qr-item-editor social-qr-item-wrapper',
			'data-platform': platform,
		} ),
		[ platform ]
	);

	const handlePlatformChange = ( nextPlatform ) => {
		const nextPreset = getPlatformPreset( nextPlatform );
		setAttributes( {
			platform: nextPlatform,
			footerLabel: nextPreset.defaultFooter,
			buttonText: nextPreset.defaultButtonText,
			buttonUrl: nextPreset.defaultButtonUrl,
		} );
	};

	const handleMediaSelect = ( media ) => {
		setAttributes( {
			qrImage: media.url,
			qrImageId: media.id,
			qrImageAlt: media.alt || `${ displayLabel } QR Code`,
		} );
	};

	const handleFocalPresetChange = ( nextPreset ) => {
		const coords = FOCAL_PRESET_COORDS[ nextPreset ] || FOCAL_PRESET_COORDS.center;
		setAttributes( {
			qrImageFocalPreset: nextPreset,
			qrImagePositionX: coords.x,
			qrImagePositionY: coords.y,
		} );
	};

	const clearQrImage = () => {
		setAttributes( {
			qrImage: '',
			qrImageId: undefined,
			qrImageAlt: '',
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Platform', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Platform', 'twork-builder' ) }
							value={ platform }
							options={ PLATFORM_OPTIONS }
							onChange={ handlePlatformChange }
						/>

						<TextControl
							label={ __(
								'Platform Label (optional)',
								'twork-builder'
							) }
							value={ platformLabel }
							onChange={ ( val ) =>
								setAttributes( { platformLabel: val } )
							}
							help={ __(
								'Leave empty to use the default platform name.',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Show Header', 'twork-builder' ) }
							checked={ showPlatformBadge }
							onChange={ ( val ) =>
								setAttributes( { showPlatformBadge: val } )
							}
							help={ __(
								'Toggle On to display the platform badge at the top of the card.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'QR Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'QR Code', 'twork-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ handleMediaSelect }
									allowedTypes={ [ 'image' ] }
									value={ qrImageId }
									render={ ( { open } ) => (
										<div>
											{ qrImage ? (
												<>
													<img
														src={ qrImage }
														alt=""
														style={ {
															width: '100%',
															maxWidth: '180px',
															height: 'auto',
															marginBottom: '10px',
															borderRadius: '4px',
														} }
													/>

													<div
														style={ {
															display: 'flex',
															gap: '8px',
															flexWrap: 'wrap',
														} }
													>
														<Button
															variant="primary"
															onClick={ open }
														>
															{ __(
																'Replace / Crop',
																'twork-builder'
															) }
														</Button>
														<Button
															variant="secondary"
															isDestructive
															onClick={
																clearQrImage
															}
														>
															{ __(
																'Remove',
																'twork-builder'
															) }
														</Button>
													</div>
												</>
											) : (
												<Button
													variant="primary"
													onClick={ open }
												>
													{ __(
														'Upload QR Image',
														'twork-builder'
													) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						</BaseControl>

						<TextControl
							label={ __( 'Image Alt Text', 'twork-builder' ) }
							value={ qrImageAlt }
							onChange={ ( val ) =>
								setAttributes( { qrImageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Image Crop & Focus', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Object Fit', 'twork-builder' ) }
							value={ qrImageObjectFit }
							options={ OBJECT_FIT_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { qrImageObjectFit: val } )
							}
							help={ __(
								'Use Contain for scannable QR codes. Cover crops to fill the square.',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Focal Preset', 'twork-builder' ) }
							value={ qrImageFocalPreset }
							options={ FOCAL_PRESET_OPTIONS }
							onChange={ handleFocalPresetChange }
						/>

						<RangeControl
							label={ __( 'Focus X (%)', 'twork-builder' ) }
							value={ qrImagePositionX }
							onChange={ ( val ) =>
								setAttributes( { qrImagePositionX: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Focus Y (%)', 'twork-builder' ) }
							value={ qrImagePositionY }
							onChange={ ( val ) =>
								setAttributes( { qrImagePositionY: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Zoom Scale', 'twork-builder' ) }
							value={ qrImageScale }
							onChange={ ( val ) =>
								setAttributes( { qrImageScale: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 0.05 }
							help={ __(
								'Zoom into a specific part of the image. Keep near 1.0 for QR scanning.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Description', 'twork-builder' ) }
							checked={ showFooterLabel }
							onChange={ ( val ) =>
								setAttributes( { showFooterLabel: val } )
							}
							help={ __(
								'Toggle On to display the footer URL or text below the QR code.',
								'twork-builder'
							) }
						/>

						{ showFooterLabel && (
							<TextControl
								label={ __( 'Description Text / URL', 'twork-builder' ) }
								value={ footerLabel }
								onChange={ ( val ) =>
									setAttributes( { footerLabel: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Action Button', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Button', 'twork-builder' ) }
							checked={ showButton }
							onChange={ ( val ) =>
								setAttributes( { showButton: val } )
							}
							help={ __(
								'Toggle On to display the button below the QR card.',
								'twork-builder'
							) }
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
										setAttributes( { buttonText: val } )
									}
								/>

								<TextControl
									label={ __( 'Button URL', 'twork-builder' ) }
									value={ buttonUrl }
									onChange={ ( val ) =>
										setAttributes( { buttonUrl: val } )
									}
								/>

								<ToggleControl
									label={ __(
										'Open in New Tab',
										'twork-builder'
									) }
									checked={ buttonTarget }
									onChange={ ( val ) =>
										setAttributes( { buttonTarget: val } )
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
												'Background',
												'twork-builder'
											),
										},
										{
											value: buttonTextColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonTextColor: val,
												} ),
											label: __(
												'Text',
												'twork-builder'
											),
										},
										{
											value: buttonHoverBgColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonHoverBgColor: val,
												} ),
											label: __(
												'Hover Background',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Button Margin Top (px)',
										'twork-builder'
									) }
									value={ buttonMarginTop }
									onChange={ ( val ) =>
										setAttributes( { buttonMarginTop: val } )
									}
									min={ 0 }
									max={ 40 }
									step={ 2 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="social-qr-card"
					data-platform={ platform }
					style={ {
						'--button-margin-top': `${ buttonMarginTop }px`,
						'--button-bg': buttonBgColor,
						'--button-color': buttonTextColor,
						'--button-hover-bg': buttonHoverBgColor,
					} }
				>
					{ showPlatformBadge && (
						<div
							className={ `social-qr-badge ${ preset.badgeClass }` }
						>
							<i
								className={ preset.icon }
								aria-hidden="true"
							/>
							<span>{ displayLabel }</span>
						</div>
					) }

					<div className="social-qr-code-wrap">
						{ qrImage ? (
							<img
								src={ qrImage }
								alt={ qrImageAlt || `${ displayLabel } QR` }
								style={ qrImageStyle }
							/>
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ handleMediaSelect }
									allowedTypes={ [ 'image' ] }
									value={ qrImageId }
									render={ ( { open } ) => (
										<button
											type="button"
											className="social-qr-code-placeholder"
											onClick={ open }
										>
											{ __(
												'Upload QR Image',
												'twork-builder'
											) }
										</button>
									) }
								/>
							</MediaUploadCheck>
						) }
					</div>

					{ showFooterLabel && footerLabel && (
						<p className="social-qr-footer">{ footerLabel }</p>
					) }
				</div>

				{ showButton && buttonText && (
					<a
						href={ buttonUrl || '#' }
						className="jivaka-btn social-qr-btn"
						style={ {
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: `${ buttonMarginTop }px`,
							padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
							borderRadius: `${ buttonBorderRadius }px`,
							fontWeight: buttonFontWeight,
							fontSize: `${ buttonFontSize }rem`,
							backgroundColor: buttonBgColor,
							color: buttonTextColor,
							textDecoration: 'none',
							width: '100%',
							textAlign: 'center',
							boxSizing: 'border-box',
						} }
						onClick={ ( event ) => event.preventDefault() }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</>
	);
}
