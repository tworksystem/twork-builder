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

function ConditionsControl( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Shows for conditions', 'twork-builder' ) }
			value={ value || '' }
			onChange={ onChange }
			help={ __(
				'Comma-separated keys from the selector. Leave empty to always show.',
				'twork-builder'
			) }
		/>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		name,
		role,
		bio,
		tags,
		fig1,
		fig1Label,
		fig2,
		fig2Label,
		fig3,
		fig3Label,
		moreLabel,
		imageUrl,
		imageAlt,
		conditions,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-sg-card is-editing',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Surgeon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this surgeon', 'twork-builder' ) }
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
						<TextControl
							label={ __( 'Sub-specialities', 'twork-builder' ) }
							help={ __(
								'Comma-separated. Shown as tags in the drawer.',
								'twork-builder'
							) }
							value={ tags }
							onChange={ ( value ) =>
								setAttributes( { tags: value } )
							}
						/>
						<ConditionsControl
							value={ conditions }
							onChange={ ( value ) =>
								setAttributes( { conditions: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Figures', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ fig1Label }
							help={ __(
								'Leave the dash rather than estimate a case volume.',
								'twork-builder'
							) }
							value={ fig1 }
							onChange={ ( value ) =>
								setAttributes( { fig1: value } )
							}
						/>
						<TextControl
							label={ fig2Label }
							value={ fig2 }
							onChange={ ( value ) =>
								setAttributes( { fig2: value } )
							}
						/>
						<TextControl
							label={ fig3Label }
							value={ fig3 }
							onChange={ ( value ) =>
								setAttributes( { fig3: value } )
							}
						/>
						<TextControl
							label={ __( 'Open label', 'twork-builder' ) }
							value={ moreLabel }
							onChange={ ( value ) =>
								setAttributes( { moreLabel: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ imageUrl && (
					<span className="lp-sg-photo">
						<img src={ imageUrl } alt={ imageAlt || '' } />
					</span>
				) }
				<span className="lp-sg-body">
					<RichText
						tagName="strong"
						className="lp-sg-name"
						value={ name }
						onChange={ ( value ) =>
							setAttributes( { name: value } )
						}
						placeholder={ __( 'Name', 'twork-builder' ) }
					/>
					<RichText
						tagName="span"
						className="lp-sg-role"
						value={ role }
						onChange={ ( value ) =>
							setAttributes( { role: value } )
						}
						placeholder={ __( 'Sub-speciality', 'twork-builder' ) }
					/>
					<RichText
						tagName="p"
						className="lp-sg-bio"
						value={ bio }
						onChange={ ( value ) =>
							setAttributes( { bio: value } )
						}
						placeholder={ __( 'Profile', 'twork-builder' ) }
					/>
				</span>
			</div>
		</>
	);
}
