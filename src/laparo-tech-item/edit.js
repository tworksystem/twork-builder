import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, label, title, body, imageUrl, imageAlt } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-tech-item is-editing',
			'data-label': label || '',
		} ),
		[ label ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this item', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<TextControl
							label={ __( 'Stage label', 'twork-builder' ) }
							help={ __(
								'Shown on the stage readout while this item is active.',
								'twork-builder'
							) }
							value={ label }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Stage image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ attributes.imageId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ imageUrl
											? __(
													'Replace image',
													'twork-builder'
											  )
											: __(
													'Select image',
													'twork-builder'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( value ) =>
								setAttributes( { imageAlt: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<article { ...blockProps }>
				{ imageUrl && (
					<img
						className="lp-tech-shot"
						src={ imageUrl }
						alt={ imageAlt || '' }
					/>
				) }
				<h3>
					<RichText
						tagName="span"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Equipment', 'twork-builder' ) }
					/>
				</h3>
				<RichText
					tagName="p"
					value={ body }
					onChange={ ( value ) => setAttributes( { body: value } ) }
					placeholder={ __( 'What it does', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
