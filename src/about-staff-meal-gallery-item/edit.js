import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
} from '@wordpress/components';

const ROLE_OPTIONS = [
	{ label: __( 'Featured', 'twork-builder' ), value: 'featured' },
	{ label: __( 'Secondary', 'twork-builder' ), value: 'secondary' },
];

function onSelectImage( setAttributes ) {
	return ( media ) => {
		const item = Array.isArray( media ) ? media[ 0 ] : media;
		if ( ! item || ! item.url ) {
			return;
		}
		setAttributes( {
			imageUrl: item.url,
			imageId: item.id || 0,
			imageAlt: item.alt || '',
		} );
	};
}

function onRemoveImage( setAttributes ) {
	return () => {
		setAttributes( {
			imageUrl: '',
			imageId: 0,
			imageAlt: '',
		} );
	};
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		imageUrl,
		imageId,
		imageAlt,
		imageRole,
		showCaption,
		caption,
		showBadge,
		badgeText,
		badgeColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: [
				'twork-about-staff-meal-gallery-item',
				imageRole === 'featured' ? 'is-featured' : 'is-secondary',
				! imageUrl ? 'is-empty' : '',
			]
				.filter( Boolean )
				.join( ' ' ),
			'data-role': imageRole || 'secondary',
		} ),
		[ imageRole, imageUrl ]
	);

	const selectImage = onSelectImage( setAttributes );
	const removeImage = onRemoveImage( setAttributes );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Gallery image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show item', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<SelectControl
							label={ __( 'Image role', 'twork-builder' ) }
							value={ imageRole || 'secondary' }
							options={ ROLE_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { imageRole: value } )
							}
						/>
						<BaseControl
							label={ __( 'Image', 'twork-builder' ) }
							id="twork-asm-gallery-image"
						>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ selectImage }
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Select image',
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
											marginBottom: '10px',
											borderRadius: '8px',
											maxHeight: '200px',
											objectFit: 'cover',
										} }
									/>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ selectImage }
											allowedTypes={ [ 'image' ] }
											value={ imageId || undefined }
											render={ ( { open } ) => (
												<Button
													variant="secondary"
													isSmall
													onClick={ open }
													style={ {
														marginRight: '8px',
													} }
												>
													{ __(
														'Replace',
														'twork-builder'
													) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									<Button
										variant="secondary"
										isSmall
										isDestructive
										onClick={ removeImage }
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( value ) =>
								setAttributes( { imageAlt: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Caption', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show caption', 'twork-builder' ) }
							checked={ showCaption === true }
							onChange={ ( value ) =>
								setAttributes( { showCaption: value } )
							}
						/>
						{ showCaption && (
							<TextControl
								label={ __( 'Caption text', 'twork-builder' ) }
								value={ caption }
								onChange={ ( value ) =>
									setAttributes( { caption: value } )
								}
							/>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Badge', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show badge', 'twork-builder' ) }
							checked={ showBadge === true }
							onChange={ ( value ) =>
								setAttributes( { showBadge: value } )
							}
						/>
						{ showBadge && (
							<TextControl
								label={ __( 'Badge text', 'twork-builder' ) }
								value={ badgeText }
								onChange={ ( value ) =>
									setAttributes( { badgeText: value } )
								}
							/>
						) }
					</PanelBody>
					{ showBadge && (
						<PanelColorSettings
							title={ __( 'Badge color', 'twork-builder' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									value: badgeColor,
									onChange: ( value ) =>
										setAttributes( {
											badgeColor: value || '#e85d04',
										} ),
									label: __(
										'Badge background',
										'twork-builder'
									),
								},
							] }
						/>
					) }
				</InspectorControls>
			) }

			<figure { ...blockProps }>
				{ ! imageUrl ? (
					<MediaPlaceholder
						onSelect={ selectImage }
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Gallery image', 'twork-builder' ),
							instructions: __(
								'Upload or pick from Media Library',
								'twork-builder'
							),
						} }
					/>
				) : (
					<>
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							decoding="async"
						/>
						{ isSelected && (
							<div className="twork-about-staff-meal-gallery-item__toolbar">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ selectImage }
										allowedTypes={ [ 'image' ] }
										value={ imageId || undefined }
										render={ ( { open } ) => (
											<Button
												variant="primary"
												isSmall
												onClick={ open }
											>
												{ __(
													'Replace',
													'twork-builder'
												) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								<Button
									variant="secondary"
									isSmall
									isDestructive
									onClick={ removeImage }
								>
									{ __( 'Remove', 'twork-builder' ) }
								</Button>
							</div>
						) }
					</>
				) }
				{ showBadge && badgeText ? (
					<span
						className="twork-about-staff-meal-gallery-item__badge"
						style={ { backgroundColor: badgeColor } }
					>
						{ badgeText }
					</span>
				) : null }
				{ showCaption ? (
					<RichText
						tagName="figcaption"
						className="twork-about-staff-meal-gallery-item__caption"
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
						placeholder={ __( 'Caption…', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				) : null }
			</figure>
		</>
	);
}
