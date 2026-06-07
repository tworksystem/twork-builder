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
		author,
		category,
		date,
		dateIso,
		title,
		excerpt,
		href,
		imageUrl,
		imageId,
		imageAlt,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'blog-news__card twork-news-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Post meta', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Author', 'twork-builder' ) }
							value={ author || '' }
							onChange={ ( val ) =>
								setAttributes( { author: val } )
							}
						/>
						<TextControl
							label={ __( 'Category', 'twork-builder' ) }
							value={ category || '' }
							onChange={ ( val ) =>
								setAttributes( { category: val } )
							}
						/>
						<TextControl
							label={ __( 'Date (display)', 'twork-builder' ) }
							value={ date || '' }
							onChange={ ( val ) =>
								setAttributes( { date: val } )
							}
						/>
						<TextControl
							label={ __( 'Date (ISO)', 'twork-builder' ) }
							value={ dateIso || '' }
							onChange={ ( val ) =>
								setAttributes( { dateIso: val } )
							}
							help={ __(
								'Used for the <time datetime> attribute.',
								'twork-builder'
							) }
						/>
						<TextControl
							label={ __( 'Link URL', 'twork-builder' ) }
							value={ href || '' }
							onChange={ ( val ) =>
								setAttributes( { href: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Featured image', 'twork-builder' ) }
						initialOpen={ false }
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
											imageAlt: media.alt || imageAlt,
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
											width: '100%',
											aspectRatio: '16/10',
											objectFit: 'cover',
											borderRadius: 12,
											marginBottom: 8,
										} }
									/>
									<div style={ { display: 'flex', gap: 8 } }>
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

			<article { ...blockProps }>
				<a
					className="blog-news__media"
					href={ href || '#' }
					onClick={ ( e ) => e.preventDefault() }
				>
					{ imageUrl && (
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							width="380"
							height="240"
						/>
					) }
				</a>
				<p className="blog-news__meta">
					By{ ' ' }
					<span className="blog-news__author">{ author || '—' }</span>
					{ ' ' }
					in <strong>{ category || '—' }</strong> on{ ' ' }
					<time dateTime={ dateIso || '' }>{ date || '—' }</time>
				</p>
				<h3 className="blog-news__title">
					<a
						href={ href || '#' }
						onClick={ ( e ) => e.preventDefault() }
					>
						<RichText
							tagName="span"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __( 'Post title', 'twork-builder' ) }
							allowedFormats={ [] }
						/>
					</a>
				</h3>
				<RichText
					tagName="p"
					className="blog-news__excerpt"
					value={ excerpt }
					onChange={ ( val ) => setAttributes( { excerpt: val } ) }
					placeholder={ __( 'Excerpt…', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
