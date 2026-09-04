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
	const { itemId, title, count, href, imageUrl, imageAlt } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'product-categories__card',
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
						label={ __( 'Count', 'twork-builder' ) }
						value={ count }
						onChange={ ( v ) => setAttributes( { count: v } ) }
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
			<div { ...blockProps } data-item-id={ itemId || 'cat_1' }>
				<div className="product-categories__text">
					<RichText
						tagName="h3"
						className="product-categories__name"
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
						placeholder={ __( 'Title', 'twork-builder' ) }
					/>
					{ count ? (
						<p className="product-categories__count">{ count }</p>
					) : (
						<p className="product-categories__count">
							{ __( 'Count…', 'twork-builder' ) }
						</p>
					) }
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
						width="140"
						height="140"
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
									onClick={ open }
									variant="secondary"
									style={ {
										width: 100,
										height: 100,
										flexShrink: 0,
									} }
								>
									{ __( 'Image', 'twork-builder' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				) }
			</div>
		</>
	);
}
