import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

const badgeMediaStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: '50%',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		position,
		badgeNum,
		mediaType,
		mediaUrl,
		stepTitle,
		stepText,
		showCta,
		ctaText,
		ctaUrl,
	} = attributes;

	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );
	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-process__step twork-process__step--${ position }`,
		} ),
		[ position ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column alignment', 'twork-builder' ) }
							value={ position }
							options={ [
								{
									label: __( 'Left column', 'twork-builder' ),
									value: 'left',
								},
								{
									label: __(
										'Right column',
										'twork-builder'
									),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { position: val } )
							}
							help={ __(
								'Should match block order: left step, center, right step.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Badge number', 'twork-builder' ) }
							value={ badgeNum }
							onChange={ ( val ) =>
								setAttributes( { badgeNum: val } )
							}
						/>

						<SelectControl
							label={ __( 'Badge Type', 'twork-builder' ) }
							value={ mediaType }
							options={ [
								{ label: __( 'Text Number', 'twork-builder' ), value: 'text' },
								{ label: __( 'Custom Image/Video', 'twork-builder' ), value: 'media' },
							] }
							onChange={ ( val ) => setAttributes( { mediaType: val } ) }
						/>

						{ mediaType === 'media' && (
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image', 'video' ] }
									onSelect={ ( media ) =>
										setAttributes( { mediaUrl: media?.url || '' } )
									}
									value={ mediaUrl }
									render={ ( { open } ) => (
										<div>
											<Button variant="secondary" onClick={ open }>
												{ mediaUrl
													? __( 'Replace media', 'twork-builder' )
													: __( 'Upload media', 'twork-builder' ) }
											</Button>
											{ !! mediaUrl && (
												<Button
													variant="link"
													isDestructive
													onClick={ () =>
														setAttributes( { mediaUrl: '' } )
													}
												>
													{ __( 'Remove media', 'twork-builder' ) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						) }

						<ToggleControl
							label={ __( 'Show CTA button', 'twork-builder' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						{ showCta && (
							<>
								<TextControl
									label={ __(
										'Button URL',
										'twork-builder'
									) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="twork-process__badge-wrapper">
					<div className="twork-process__badge">
						{ mediaType === 'media' && mediaUrl ? (
							isVideo ? (
								<video
									src={ mediaUrl }
									autoPlay
									loop
									muted
									playsInline
									style={ badgeMediaStyle }
								/>
							) : (
								<img src={ mediaUrl } alt="" style={ badgeMediaStyle } />
							)
						) : (
							<span className="twork-process__badge-num">{ badgeNum }</span>
						) }
					</div>
				</div>
				<RichText
					tagName="h3"
					className="twork-process__step-title"
					value={ stepTitle }
					onChange={ ( val ) => setAttributes( { stepTitle: val } ) }
					placeholder={ __( 'Step title', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="twork-process__step-text"
					value={ stepText }
					onChange={ ( val ) => setAttributes( { stepText: val } ) }
					placeholder={ __( 'Description…', 'twork-builder' ) }
				/>

				{ showCta && (
					<div className="twork-process__btn twork-process__btn--editor">
						<RichText
							tagName="span"
							value={ ctaText }
							onChange={ ( val ) =>
								setAttributes( { ctaText: val } )
							}
							placeholder={ __(
								'More Details',
								'twork-builder'
							) }
						/>

						<span aria-hidden="true">↗</span>
					</div>
				) }
			</div>
		</>
	);
}
