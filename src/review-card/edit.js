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
	const { itemId, text, name, location, avatarUrl, avatarAlt } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'testimonials__card',
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
					<TextareaControl
						label={ __( 'Review', 'twork-builder' ) }
						value={ text }
						onChange={ ( v ) => setAttributes( { text: v } ) }
					/>
					<TextControl
						label={ __( 'Name', 'twork-builder' ) }
						value={ name }
						onChange={ ( v ) => setAttributes( { name: v } ) }
					/>
					<TextControl
						label={ __( 'Location', 'twork-builder' ) }
						value={ location }
						onChange={ ( v ) => setAttributes( { location: v } ) }
					/>
					<TextControl
						label={ __( 'Avatar alt', 'twork-builder' ) }
						value={ avatarAlt }
						onChange={ ( v ) => setAttributes( { avatarAlt: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									avatarUrl: media.url,
									avatarAlt:
										media.alt ||
										avatarAlt ||
										media.title ||
										'',
								} )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ avatarUrl
										? __( 'Change avatar', 'twork-builder' )
										: __(
												'Select avatar',
												'twork-builder'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<article { ...blockProps } data-item-id={ itemId || 't_1' }>
				<span className="testimonials__quote" aria-hidden="true">
					"
				</span>
				<RichText
					tagName="blockquote"
					className="testimonials__text"
					value={ text }
					onChange={ ( v ) => setAttributes( { text: v } ) }
					placeholder={ __( 'Review…', 'twork-builder' ) }
				/>
				<footer className="testimonials__footer">
					{ avatarUrl ? (
						<img
							className="testimonials__avatar"
							src={ avatarUrl }
							alt={ avatarAlt || name || '' }
							width="48"
							height="48"
						/>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										avatarUrl: media.url,
										avatarAlt:
											media.alt ||
											avatarAlt ||
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
											width: 48,
											height: 48,
											borderRadius: '50%',
											padding: 0,
											minWidth: 48,
										} }
									>
										+
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }
					<div>
						<RichText
							tagName="cite"
							className="testimonials__name"
							value={ name }
							onChange={ ( v ) => setAttributes( { name: v } ) }
							placeholder={ __( 'Name', 'twork-builder' ) }
						/>
						<RichText
							tagName="p"
							className="testimonials__location"
							value={ location }
							onChange={ ( v ) =>
								setAttributes( { location: v } )
							}
							placeholder={ __( 'Location', 'twork-builder' ) }
						/>
					</div>
				</footer>
			</article>
		</>
	);
}
