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
	const { text, name, location, avatarUrl, avatarId, avatarAlt } =
		attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'testimonials__card twork-review-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Customer', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Location', 'twork-builder' ) }
							value={ location || '' }
							onChange={ ( val ) =>
								setAttributes( { location: val } )
							}
						/>
						<TextControl
							label={ __( 'Avatar alt text', 'twork-builder' ) }
							value={ avatarAlt || '' }
							onChange={ ( val ) =>
								setAttributes( { avatarAlt: val } )
							}
						/>
						<MediaUploadCheck>
							{ ! avatarUrl ? (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											avatarId: media.id,
											avatarUrl: media.url || '',
											avatarAlt:
												media.alt ||
												avatarAlt ||
												name,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ avatarId }
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
												'Choose avatar',
												'twork-builder'
											) }
										</Button>
									) }
								/>
							) : (
								<div style={ { marginTop: 8 } }>
									<img
										src={ avatarUrl }
										alt=""
										style={ {
											width: 48,
											height: 48,
											borderRadius: '50%',
											objectFit: 'cover',
											marginBottom: 8,
										} }
									/>
									<div style={ { display: 'flex', gap: 8 } }>
										<MediaUpload
											onSelect={ ( media ) =>
												setAttributes( {
													avatarId: media.id,
													avatarUrl: media.url || '',
													avatarAlt:
														media.alt || avatarAlt,
												} )
											}
											allowedTypes={ [ 'image' ] }
											value={ avatarId }
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
													avatarId: 0,
													avatarUrl: '',
													avatarAlt: '',
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
				<span className="testimonials__quote" aria-hidden="true">
					"
				</span>
				<RichText
					tagName="blockquote"
					className="testimonials__text"
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __( 'Review text…', 'twork-builder' ) }
				/>
				<footer className="testimonials__footer">
					{ avatarUrl && (
						<img
							className="testimonials__avatar"
							src={ avatarUrl }
							alt={ avatarAlt || name || '' }
							width="48"
							height="48"
						/>
					) }
					<div>
						<RichText
							tagName="cite"
							className="testimonials__name"
							value={ name }
							onChange={ ( val ) =>
								setAttributes( { name: val } )
							}
							placeholder={ __( 'Name', 'twork-builder' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="p"
							className="testimonials__location"
							value={ location }
							onChange={ ( val ) =>
								setAttributes( { location: val } )
							}
							placeholder={ __( 'Location', 'twork-builder' ) }
							allowedFormats={ [] }
						/>
					</div>
				</footer>
			</article>
		</>
	);
}
