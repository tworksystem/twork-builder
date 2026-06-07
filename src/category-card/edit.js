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
	const { title, count, href, imageUrl, imageId, imageAlt } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'product-categories__card twork-category-card-editor',
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
											width: 100,
											height: 100,
											objectFit: 'contain',
											marginBottom: 8,
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

			<a
				{ ...blockProps }
				href={ href || '#' }
				onClick={ ( e ) => e.preventDefault() }
			>
				<div className="product-categories__text">
					<RichText
						tagName="h3"
						className="product-categories__name"
						value={ title }
						onChange={ ( val ) =>
							setAttributes( { title: val } )
						}
						placeholder={ __( 'Category name…', 'twork-builder' ) }
					/>
					<RichText
						tagName="p"
						className="product-categories__count"
						value={ count }
						onChange={ ( val ) =>
							setAttributes( { count: val } )
						}
						placeholder={ __( 'Item count…', 'twork-builder' ) }
					/>
					<span
						className="product-categories__arrow"
						aria-hidden="true"
					>
						→
					</span>
				</div>
				{ imageUrl ? (
					<img
						className="product-categories__img"
						src={ imageUrl }
						alt={ imageAlt || '' }
					/>
				) : (
					<div className="product-categories__img-placeholder" />
				) }
			</a>
		</>
	);
}
