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
	const {
		title,
		ctaLabel,
		href,
		imageUrl,
		imageId,
		imageAlt,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'image-card-carousel__card twork-image-card-slide-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Link', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'URL', 'twork-builder' ) }
							value={ href || '' }
							onChange={ ( val ) =>
								setAttributes( { href: val } )
							}
						/>
						<TextControl
							label={ __( 'CTA label', 'twork-builder' ) }
							value={ ctaLabel || '' }
							onChange={ ( val ) =>
								setAttributes( { ctaLabel: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							{ ! imageUrl ? (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											imageId: media.id,
											imageUrl: media.url || '',
											imageAlt:
												media.alt || imageAlt || '',
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ imageId }
									render={ ( { open } ) => (
										<Button
											variant="secondary"
											onClick={ open }
											style={ { width: '100%' } }
										>
											{ __(
												'Choose image',
												'twork-builder'
											) }
										</Button>
									) }
								/>
							) : (
								<div>
									<img
										src={ imageUrl }
										alt=""
										style={ {
											width: '100%',
											marginBottom: 8,
											borderRadius: 8,
										} }
									/>
									<div
										style={ {
											display: 'flex',
											gap: 8,
											marginBottom: 8,
										} }
									>
										<MediaUpload
											onSelect={ ( media ) =>
												setAttributes( {
													imageId: media.id,
													imageUrl: media.url || '',
													imageAlt:
														media.alt ||
														imageAlt ||
														'',
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
									<TextControl
										label={ __(
											'Alt text',
											'twork-builder'
										) }
										value={ imageAlt || '' }
										onChange={ ( val ) =>
											setAttributes( { imageAlt: val } )
										}
									/>
								</div>
							) }
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="image-card-carousel__media">
					{ imageUrl ? (
						<img src={ imageUrl } alt={ imageAlt || '' } />
					) : (
						<div className="image-card-carousel__media-placeholder" />
					) }
				</div>
				<div className="image-card-carousel__box">
					<RichText
						tagName="h3"
						className="image-card-carousel__card-title"
						value={ title }
						onChange={ ( val ) =>
							setAttributes( { title: val } )
						}
						placeholder={ __( 'Card title…', 'twork-builder' ) }
					/>
					<a
						className="image-card-carousel__link"
						href={ href || '#' }
						onClick={ ( e ) => e.preventDefault() }
					>
						<RichText
							tagName="span"
							value={ ctaLabel }
							onChange={ ( val ) =>
								setAttributes( { ctaLabel: val } )
							}
							placeholder={ __( 'Learn more', 'twork-builder' ) }
							allowedFormats={ [] }
						/>
					</a>
				</div>
			</article>
		</>
	);
}
