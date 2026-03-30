import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaPlaceholder,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	BaseControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageId, linkUrl, linkTarget, linkRel, alt } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'jivaka-badge-item twork-jivaka-badge-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Badge Link', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Link URL', 'twork-builder' ) }
						>
							<URLInput
								value={ linkUrl }
								onChange={ ( url ) =>
									setAttributes( { linkUrl: url || '#' } )
								}
								placeholder={ __(
									'https://...',
									'twork-builder'
								) }
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Open in new tab', 'twork-builder' ) }
							checked={ linkTarget === '_blank' }
							onChange={ ( checked ) =>
								setAttributes( {
									linkTarget: checked ? '_blank' : '_self',
								} )
							}
						/>

						<TextControl
							label={ __( 'Link rel', 'twork-builder' ) }
							value={ linkRel }
							onChange={ ( val ) =>
								setAttributes( {
									linkRel: val || 'noopener noreferrer',
								} )
							}
							help={ __(
								'e.g. noopener noreferrer',
								'twork-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ alt }
							onChange={ ( val ) =>
								setAttributes( { alt: val } )
							}
							help={ __(
								'Accessibility description for the badge image',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								alt: alt || media.alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'App store badge', 'twork-builder' ),
							instructions: __(
								'Upload or select a badge image (e.g. Google Play, App Store)',
								'twork-builder'
							),
						} }
					/>
				) : (
					<a
						href={ linkUrl || '#' }
						target={ linkTarget }
						rel={ linkRel }
						className="jivaka-badge-link"
						style={ { display: 'block', pointerEvents: 'none' } }
					>
						<img
							src={ image }
							alt={ alt || '' }
							className="jivaka-badge-image"
							style={ {
								height: 'var(--jivaka-badge-height, 45px)',
								width: 'auto',
								display: 'block',
							} }
						/>
					</a>
				) }
			</div>
		</>
	);
}
