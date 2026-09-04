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
	const { itemId, name, imageUrl, imageAlt } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'partners__logo-cell',
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
					{ imageUrl ? (
						<Button
							variant="link"
							isDestructive
							onClick={ () =>
								setAttributes( { imageUrl: '', imageAlt: '' } )
							}
						>
							{ __( 'Remove image', 'twork-builder' ) }
						</Button>
					) : null }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-item-id={ itemId || 'logo_1' }>
				{ imageUrl ? (
					<>
						<img
							className="partners__logo-img"
							src={ imageUrl }
							alt={
								imageAlt ||
								( name ? `${ name } — Shwe Myanmar` : '' )
							}
							width="120"
							height="48"
						/>
						<RichText
							tagName="span"
							className="partners__logo-name"
							value={ name }
							onChange={ ( v ) => setAttributes( { name: v } ) }
							placeholder={ __( 'Name', 'twork-builder' ) }
						/>
					</>
				) : (
					<RichText
						tagName="span"
						className="partners__logo-text"
						value={ name }
						onChange={ ( v ) => setAttributes( { name: v } ) }
						placeholder={ __( 'Name', 'twork-builder' ) }
					/>
				) }
			</div>
		</>
	);
}
