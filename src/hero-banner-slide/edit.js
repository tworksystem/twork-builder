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
	const blockProps = useStableBlockProps( { className: 'hero__slide' } );
	const { eyebrow } = attributes;
	const { title } = attributes;
	const { subtitle } = attributes;
	const { ctaLabel } = attributes;
	const { ctaHref } = attributes;
	const { imageUrl } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
					<TextControl
						label={ __( 'Subtitle', 'twork-builder' ) }
						value={ subtitle }
						onChange={ ( v ) => setAttributes( { subtitle: v } ) }
					/>
					<TextControl
						label={ __( 'CTA Label', 'twork-builder' ) }
						value={ ctaLabel }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
					/>
					<TextControl
						label={ __( 'CTA URL', 'twork-builder' ) }
						value={ ctaHref }
						onChange={ ( v ) => setAttributes( { ctaHref: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( { imageUrl: media.url } )
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
			<div { ...blockProps } data-item-id="{ itemId || 'slide_1' }">
				<RichText
					tagName="p"
					className="hero__eyebrow"
					value={ eyebrow }
					onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					placeholder={ __( 'Eyebrow', 'twork-builder' ) }
				/>
				<RichText
					tagName="h1"
					className="hero__title"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Title', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					className="hero__subtitle"
					value={ subtitle }
					onChange={ ( v ) => setAttributes( { subtitle: v } ) }
					placeholder={ __( 'Subtitle', 'twork-builder' ) }
				/>
				{ imageUrl && <img src={ imageUrl } alt="" /> }
			</div>
		</>
	);
}
