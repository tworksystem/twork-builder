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
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		variant,
		image,
		alt,
		overlayText,
		overlayButtonText,
		overlayButtonUrl,
	} = attributes;

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
							<TextControl
								label={ __( 'Button URL', 'twork-builder' ) }
								value={ overlayButtonUrl }
								onChange={ ( val ) =>
									setAttributes( { overlayButtonUrl: val } )
								}
							/>
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

									<span aria-hidden="true">↗</span>
								</div>
							</div>
						) }
					</>
				) }
			</article>
		</>
	);
}
