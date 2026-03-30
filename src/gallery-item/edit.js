import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	BaseControl,
	Button,
} from '@wordpress/components';

const CATEGORY_OPTIONS = [
	{ label: __( 'Patient Rooms', 'twork-builder' ), value: 'rooms' },
	{ label: __( 'Technology', 'twork-builder' ), value: 'tech' },
	{ label: __( 'Amenities', 'twork-builder' ), value: 'amenity' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { imageUrl, imageId, imageAlt, category, overlayIcon } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-gallery-item-editor gallery-item fade-up',
			style: {
				position: 'relative',
				borderRadius: '8px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#f0f0f0',
				minHeight: '180px',
			},
			'data-category': category,
		} ),
		[ category ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Image', 'twork-builder' ) }>
							{ ! imageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media.url,
											imageId: media.id,
											imageAlt: media.alt || 'Gallery',
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Gallery Image',
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

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												imageUrl: '',
												imageId: null,
												imageAlt: 'Gallery',
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
						<TextControl
							label={ __( 'Alt Text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Filter Category', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Category', 'twork-builder' ) }
							value={ category }
							options={ CATEGORY_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { category: val } )
							}
							help={ __(
								'Must match a tab’s “Filter value” (e.g. rooms, tech, amenity).',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Overlay Icon Class',
								'twork-builder'
							) }
							value={ overlayIcon }
							onChange={ ( val ) =>
								setAttributes( { overlayIcon: val } )
							}
							help={ __(
								'Font Awesome class, e.g. fas fa-search-plus',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ imageUrl ? (
					<>
						<img
							src={ imageUrl }
							alt={ imageAlt }
							style={ {
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								display: 'block',
							} }
							decoding="async"
						/>

						<div
							className="gallery-overlay"
							style={ {
								position: 'absolute',
								inset: 0,
								background: 'rgba(0,0,0,0.4)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#fff',
								fontSize: '2rem',
							} }
						>
							{ overlayIcon && (
								<i
									className={ overlayIcon }
									aria-hidden="true"
								/>
							) }
						</div>
					</>
				) : (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								imageUrl: media.url,
								imageId: media.id,
								imageAlt: media.alt || 'Gallery',
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Gallery Image', 'twork-builder' ),
						} }
						className="gallery-item-placeholder"
					/>
				) }
			</div>
		</>
	);
}
