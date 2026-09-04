import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { itemId, title, ctaLabel, href, imageUrl, imageAlt } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'services-carousel__card',
	} );

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
						label={ __( 'CTA Label', 'twork-builder' ) }
						value={ ctaLabel }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
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
			<article { ...blockProps } data-item-id={ itemId || 'svc_1' }>
				<div className="services-carousel__media">
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
							render={ ( { open } ) =>
								imageUrl ? (
									<button
										type="button"
										onClick={ open }
										style={ {
											display: 'block',
											width: '100%',
											padding: 0,
											border: 0,
											background: 'transparent',
											cursor: 'pointer',
										} }
									>
										<img
											src={ imageUrl }
											alt={ imageAlt || '' }
											width="380"
											height="280"
										/>
									</button>
								) : (
									<Button
										onClick={ open }
										variant="secondary"
										style={ {
											display: 'flex',
											width: '100%',
											aspectRatio: '4 / 3',
											alignItems: 'center',
											justifyContent: 'center',
										} }
									>
										{ __(
											'Select image',
											'twork-builder'
										) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>
				<div className="services-carousel__box">
					<RichText
						tagName="h3"
						className="services-carousel__card-title"
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
						placeholder={ __( 'Title', 'twork-builder' ) }
					/>
					{ ctaLabel ? (
						<a
							className="services-carousel__link"
							href={ href || '#' }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ ctaLabel }
						</a>
					) : null }
				</div>
			</article>
		</>
	);
}
