import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { name, imageUrl, imageId, imageAlt } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'partners__logo-cell twork-logo-showcase-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Logo image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ imageAlt || '' }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
						<MediaUploadCheck>
							{ ! imageUrl ? (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											imageId: media.id,
											imageUrl: media.url || '',
											imageAlt:
												media.alt ||
												imageAlt ||
												name,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ imageId }
									render={ ( { open } ) => (
										<Button
											variant="secondary"
											onClick={ open }
											style={ {
												width: '100%',
												marginTop: 8,
											} }
										>
											{ __(
												'Choose image',
												'twork-builder'
											) }
										</Button>
									) }
								/>
							) : (
								<div style={ { marginTop: 8 } }>
									<img
										src={ imageUrl }
										alt=""
										style={ {
											maxWidth: 120,
											height: 'auto',
											display: 'block',
											marginBottom: 8,
										} }
									/>
									<div
										style={ {
											display: 'flex',
											gap: 8,
											flexWrap: 'wrap',
										} }
									>
										<MediaUpload
											onSelect={ ( media ) =>
												setAttributes( {
													imageId: media.id,
													imageUrl: media.url || '',
													imageAlt:
														media.alt || imageAlt,
												} )
											}
											allowedTypes={ [ 'image' ] }
											value={ imageId }
											render={ ( { open } ) => (
												<Button
													variant="secondary"
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
										<Button
											variant="secondary"
											isDestructive
											isSmall
											onClick={ () =>
												setAttributes( {
													imageId: 0,
													imageUrl: '',
													imageAlt: '',
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								</div>
							) }
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ imageUrl ? (
					<img
						className="partners__logo-img"
						src={ imageUrl }
						alt={ imageAlt || name || '' }
						width="120"
						height="48"
					/>
				) : (
					<span className="partners__logo-text">
						<RichText
							tagName="span"
							value={ name }
							onChange={ ( val ) =>
								setAttributes( { name: val } )
							}
							placeholder={ __( 'Region name', 'twork-builder' ) }
							allowedFormats={ [] }
						/>
					</span>
				) }
				{ imageUrl && (
					<RichText
						tagName="span"
						className="partners__logo-name"
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
						placeholder={ __( 'Region name', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				) }
			</div>
		</>
	);
}
