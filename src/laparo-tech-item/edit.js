import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		stageIndex,
		hudLabel,
		showImage,
		imageUrl,
		imageId,
		imageAlt,
		showNumber,
		itemNumber,
		showTitle,
		title,
		showDescription,
		description,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `tech-item mk-laparo-tech-item${
				stageIndex === 0 ? ' is-active' : ''
			}`,
			'data-stage': stageIndex,
			'data-label': hudLabel || '',
			'data-image-url': imageUrl || '',
			'data-image-alt': imageAlt || '',
		} ),
		[ stageIndex, hudLabel, imageUrl, imageAlt ]
	);

	if ( showItem === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Technology Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Item', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<RangeControl
							label={ __( 'Stage Index', 'twork-builder' ) }
							value={ stageIndex }
							onChange={ ( value ) =>
								setAttributes( { stageIndex: value } )
							}
							min={ 0 }
							max={ 12 }
						/>
						<TextControl
							label={ __( 'HUD Label', 'twork-builder' ) }
							value={ hudLabel }
							onChange={ ( value ) =>
								setAttributes( { hudLabel: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Stage Image', 'twork-builder' ) }
							checked={ showImage !== false }
							onChange={ ( value ) =>
								setAttributes( { showImage: value } )
							}
						/>
						{ showImage !== false && (
							<>
								<TextControl
									label={ __( 'Image Alt', 'twork-builder' ) }
									value={ imageAlt }
									onChange={ ( value ) =>
										setAttributes( { imageAlt: value } )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												imageUrl: media.url,
												imageId: media.id,
												imageAlt: media.alt || imageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ imageId }
										render={ ( { open } ) => (
											<div style={ { marginTop: 8 } }>
												{ imageUrl ? (
													<img
														src={ imageUrl }
														alt=""
														style={ {
															width: '100%',
															maxHeight: 120,
															objectFit: 'cover',
															marginBottom: 8,
															borderRadius: 8,
														} }
													/>
												) : null }
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ imageUrl
														? __(
																'Replace Image',
																'twork-builder'
														  )
														: __(
																'Upload Image',
																'twork-builder'
														  ) }
												</Button>
											</div>
										) }
									/>
								</MediaUploadCheck>
							</>
						) }
						<ToggleControl
							label={ __( 'Show Number', 'twork-builder' ) }
							checked={ showNumber !== false }
							onChange={ ( value ) =>
								setAttributes( { showNumber: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Description', 'twork-builder' ) }
							checked={ showDescription !== false }
							onChange={ ( value ) =>
								setAttributes( { showDescription: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="tech-item-head">
					{ showNumber !== false && (
						<RichText
							tagName="span"
							className="tech-num"
							value={ itemNumber }
							onChange={ ( value ) =>
								setAttributes( { itemNumber: value } )
							}
							placeholder={ __( '01', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
					) }
					{ showTitle !== false && (
						<RichText
							tagName="h3"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder={ __( 'Title', 'twork-builder' ) }
						/>
					) }
				</div>
				{ showDescription !== false && (
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __( 'Description', 'twork-builder' ) }
					/>
				) }
			</div>
		</>
	);
}
