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
	const { showItem, quote, name, context, imageUrl, imageAlt } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-vc-quote is-editing',
		} ),
		[]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Quote', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this quote', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
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
													'Replace portrait',
													'twork-builder'
											  )
											: __(
													'Select portrait',
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
			<div { ...blockProps }>
				<RichText
					tagName="blockquote"
					value={ quote }
					onChange={ ( value ) => setAttributes( { quote: value } ) }
					placeholder={ __( 'What they said', 'twork-builder' ) }
				/>
				<div className="lp-vc-who">
					{ imageUrl && (
						<img src={ imageUrl } alt={ imageAlt || '' } />
					) }
					<div>
						<RichText
							tagName="strong"
							value={ name }
							onChange={ ( value ) =>
								setAttributes( { name: value } )
							}
							placeholder={ __( 'Name', 'twork-builder' ) }
						/>
						<RichText
							tagName="span"
							value={ context }
							onChange={ ( value ) =>
								setAttributes( { context: value } )
							}
							placeholder={ __(
								'Procedure and stay',
								'twork-builder'
							) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
