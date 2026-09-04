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
	Button,
	TextControl,
	TextareaControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		itemId,
		title,
		excerpt,
		author,
		category,
		date,
		dateIso,
		href,
		imageUrl,
		imageAlt,
	} = attributes;
	const blockProps = useStableBlockProps( {
		className: 'blog-news__card',
	} );
	const link = href || '#';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Item ID', 'twork-builder' ) }
						value={ itemId }
						onChange={ ( v ) => setAttributes( { itemId: v } ) }
					/>
					<TextControl
						label={ __( 'Author', 'twork-builder' ) }
						value={ author }
						onChange={ ( v ) => setAttributes( { author: v } ) }
					/>
					<TextControl
						label={ __( 'Category', 'twork-builder' ) }
						value={ category }
						onChange={ ( v ) => setAttributes( { category: v } ) }
					/>
					<TextControl
						label={ __( 'Date', 'twork-builder' ) }
						value={ date }
						onChange={ ( v ) => setAttributes( { date: v } ) }
					/>
					<TextControl
						label={ __( 'Date ISO', 'twork-builder' ) }
						value={ dateIso }
						onChange={ ( v ) => setAttributes( { dateIso: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'twork-builder' ) }
						value={ href }
						onChange={ ( v ) => setAttributes( { href: v } ) }
					/>
					<TextControl
						label={ __( 'Image alt', 'twork-builder' ) }
						value={ imageAlt }
						onChange={ ( v ) => setAttributes( { imageAlt: v } ) }
					/>
					<TextareaControl
						label={ __( 'Excerpt', 'twork-builder' ) }
						value={ excerpt }
						onChange={ ( v ) => setAttributes( { excerpt: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media.url,
									imageAlt:
										media.alt ||
										imageAlt ||
										media.title ||
										'',
								} )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ imageUrl
										? __( 'Change image', 'twork-builder' )
										: __(
												'Select image',
												'twork-builder'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<article { ...blockProps } data-item-id={ itemId || 'post_1' }>
				<a
					className="blog-news__media"
					href={ link }
					onClick={ ( e ) => e.preventDefault() }
				>
					{ imageUrl ? (
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							width="380"
							height="240"
						/>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageAlt:
											media.alt ||
											imageAlt ||
											media.title ||
											'',
									} )
								}
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										onClick={ ( e ) => {
											e.preventDefault();
											open();
										} }
										variant="secondary"
										style={ {
											display: 'flex',
											width: '100%',
											aspectRatio: '16 / 10',
											alignItems: 'center',
											justifyContent: 'center',
										} }
									>
										{ __(
											'Select image',
											'twork-builder'
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }
				</a>
				<p className="blog-news__meta">
					{ 'By ' }
					<span className="blog-news__author">
						{ author || __( 'Author', 'twork-builder' ) }
					</span>
					{ ' in ' }
					<strong>
						{ category || __( 'Category', 'twork-builder' ) }
					</strong>
					{ ' on ' }
					<time dateTime={ dateIso || undefined }>
						{ date || __( 'Date', 'twork-builder' ) }
					</time>
				</p>
				<h3 className="blog-news__title">
					<a href={ link } onClick={ ( e ) => e.preventDefault() }>
						<RichText
							tagName="span"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
							placeholder={ __( 'Title', 'twork-builder' ) }
						/>
					</a>
				</h3>
				<RichText
					tagName="p"
					className="blog-news__excerpt"
					value={ excerpt }
					onChange={ ( v ) => setAttributes( { excerpt: v } ) }
					placeholder={ __( 'Excerpt…', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
