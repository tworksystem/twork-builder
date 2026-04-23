import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	RichText,
	MediaPlaceholder,
	MediaReplaceFlow,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
	BaseControl,
	ColorPalette,
} from '@wordpress/components';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		variant,
		mediaType = 'image',
		mediaUrl,
		mediaAlt,
		videoAutoplay = true,
		videoLoop = true,
		videoMuted = true,
		videoControls = false,
		backgroundColor = '#9db37a',
		objectFit = 'cover',
		overlayText,
		overlayButtonText,
		overlayButtonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];
	const acceptsMedia = mediaType === 'image' || mediaType === 'video';

	const handleMediaSelect = ( media ) => {
		const nextType =
			media?.type === 'video' || media?.mime?.startsWith( 'video/' )
				? 'video'
				: 'image';

		setAttributes( {
			mediaType: nextType,
			mediaUrl: media?.url || '',
			mediaId: media?.id || undefined,
			mediaAlt: media?.alt || '',
		} );
	};

	const blockProps = useBlockProps( {
		className: [
			'twork-about-card',
			variant === 'overlay' ? 'twork-about-card--overlay' : '',
			`is-media-${ mediaType }`,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<>
			{ acceptsMedia && (
				<BlockControls group="block">
					<MediaReplaceFlow
						mediaId={ attributes.mediaId }
						mediaURL={ mediaUrl }
						allowedTypes={ [ 'image', 'video' ] }
						accept="image/*,video/*"
						onSelect={ handleMediaSelect }
						name={ __( 'Replace media', 'twork-builder' ) }
					/>
				</BlockControls>
			) }

			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Media Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Media type', 'twork-builder' ) }
							value={ mediaType }
							options={ [
								{
									label: __( 'Image', 'twork-builder' ),
									value: 'image',
								},
								{
									label: __( 'Video', 'twork-builder' ),
									value: 'video',
								},
								{
									label: __( 'Solid color', 'twork-builder' ),
									value: 'color',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { mediaType: val } )
							}
						/>

						<SelectControl
							label={ __( 'Layout', 'twork-builder' ) }
							value={ variant }
							options={ [
								{
									label: __( 'Image only', 'twork-builder' ),
									value: 'simple',
								},
								{
									label: __(
										'Image with overlay',
										'twork-builder'
									),
									value: 'overlay',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { variant: val } )
							}
						/>

						<TextControl
							label={ __( 'Media alt text', 'twork-builder' ) }
							value={ mediaAlt }
							onChange={ ( val ) =>
								setAttributes( { mediaAlt: val } )
							}
						/>

						{ mediaType === 'color' && (
							<BaseControl
								label={ __(
									'Background color',
									'twork-builder'
								) }
							>
								<ColorPalette
									value={ backgroundColor }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundColor:
												val || '#9db37a',
										} )
									}
								/>
							</BaseControl>
						) }

						{ acceptsMedia && (
							<Button
								isSecondary
								onClick={ () =>
									setAttributes( {
										mediaUrl: '',
										mediaId: undefined,
										mediaAlt: '',
									} )
								}
							>
								{ __( 'Remove media', 'twork-builder' ) }
							</Button>
						) }
					</PanelBody>

					{ mediaType === 'video' && (
						<PanelBody
							title={ __( 'Video Options', 'twork-builder' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Autoplay', 'twork-builder' ) }
								checked={ videoAutoplay }
								onChange={ ( val ) =>
									setAttributes( {
										videoAutoplay: val,
									} )
								}
							/>
							<ToggleControl
								label={ __( 'Loop', 'twork-builder' ) }
								checked={ videoLoop }
								onChange={ ( val ) =>
									setAttributes( { videoLoop: val } )
								}
							/>
							<ToggleControl
								label={ __( 'Muted', 'twork-builder' ) }
								checked={ videoMuted }
								onChange={ ( val ) =>
									setAttributes( { videoMuted: val } )
								}
							/>
							<ToggleControl
								label={ __( 'Show controls', 'twork-builder' ) }
								checked={ videoControls }
								onChange={ ( val ) =>
									setAttributes( {
										videoControls: val,
									} )
								}
							/>
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Design Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ acceptsMedia && (
							<SelectControl
								label={ __( 'Object fit', 'twork-builder' ) }
								value={ objectFit }
								options={ [
									{
										label: __( 'Cover', 'twork-builder' ),
										value: 'cover',
									},
									{
										label: __(
											'Contain',
											'twork-builder'
										),
										value: 'contain',
									},
									{
										label: __( 'Fill', 'twork-builder' ),
										value: 'fill',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { objectFit: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Overlay Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ variant === 'overlay' && (
							<>
								<TextControl
									label={ __( 'Button URL', 'twork-builder' ) }
									value={ overlayButtonUrl }
									onChange={ ( val ) =>
										setAttributes( { overlayButtonUrl: val } )
									}
								/>

								<ToggleControl
									label={ __(
										'Show overlay button icon',
										'twork-builder'
									) }
									checked={ showButtonIcon }
									onChange={ ( val ) =>
										setAttributes( { showButtonIcon: val } )
									}
								/>

								<SelectControl
									label={ __( 'Button icon type', 'twork-builder' ) }
									value={ buttonIconType }
									options={ [
										{
											label: __(
												'Diagonal arrow',
												'twork-builder'
											),
											value: 'diagonal-arrow',
										},
										{
											label: __(
												'Arrow right',
												'twork-builder'
											),
											value: 'arrow-right',
										},
										{
											label: __(
												'External link',
												'twork-builder'
											),
											value: 'external',
										},
										{
											label: __( 'Plus', 'twork-builder' ),
											value: 'plus',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { buttonIconType: val } )
									}
									disabled={ ! showButtonIcon }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ mediaType !== 'color' && ! mediaUrl ? (
					<MediaPlaceholder
						onSelect={ handleMediaSelect }
						allowedTypes={ [ 'image', 'video' ] }
						accept="image/*,video/*"
						multiple={ false }
						labels={ {
							title: __(
								'Card image or video',
								'twork-builder'
							),
						} }
						className="twork-about-card__placeholder"
					/>
				) : (
					<>
						{ mediaType === 'image' && mediaUrl && (
							<img
								src={ mediaUrl }
								alt={ mediaAlt || '' }
								style={ { objectFit } }
							/>
						) }
						{ mediaType === 'video' && mediaUrl && (
							<video
								src={ mediaUrl }
								autoPlay={ videoAutoplay }
								loop={ videoLoop }
								muted={ videoMuted }
								controls={ videoControls }
								playsInline
								style={ { objectFit } }
							/>
						) }
						{ mediaType === 'color' && (
							<div
								className="twork-about-card__color-bg"
								style={ { backgroundColor } }
								aria-hidden="true"
							/>
						) }

						{ variant === 'overlay' && (
							<div className="twork-about-card__overlay">
								<RichText
									tagName="p"
									className="twork-about-card__overlay-text"
									value={ overlayText }
									onChange={ ( val ) =>
										setAttributes( { overlayText: val } )
									}
									placeholder={ __(
										'Overlay text…',
										'twork-builder'
									) }
								/>

								<div className="twork-about-card__overlay-btn">
									<RichText
										tagName="span"
										value={ overlayButtonText }
										onChange={ ( val ) =>
											setAttributes( {
												overlayButtonText: val,
											} )
										}
										placeholder={ __(
											'Button',
											'twork-builder'
										) }
									/>

									{ showButtonIcon && (
										<span
											className="twork-about-card__overlay-btn-icon"
											aria-hidden="true"
										>
											{ actionIcon }
										</span>
									) }
								</div>
							</div>
						) }
					</>
				) }
			</article>
		</>
	);
}
