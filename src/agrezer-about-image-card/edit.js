import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
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
		image,
		alt,
		overlayText,
		overlayButtonText,
		overlayButtonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				variant === 'overlay'
					? 'twork-about-card twork-about-card--overlay'
					: 'twork-about-card',
		} ),
		[ variant ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card', 'twork-builder' ) }
						initialOpen={ true }
					>
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
							label={ __( 'Image alt text', 'twork-builder' ) }
							value={ alt }
							onChange={ ( val ) =>
								setAttributes( { alt: val } )
							}
						/>

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
				{ ! image ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								alt: media.alt || alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Card image', 'twork-builder' ),
						} }
						className="twork-about-card__placeholder"
					/>
				) : (
					<>
						<img src={ image } alt="" />
						<div className="twork-about-card__editor-tools">
							<Button
								isSecondary
								isSmall
								onClick={ () =>
									setAttributes( {
										image: '',
										imageId: null,
									} )
								}
							>
								{ __( 'Remove image', 'twork-builder' ) }
							</Button>
						</div>
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
