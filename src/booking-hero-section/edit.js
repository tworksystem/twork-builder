import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundImage,
		backgroundImageId,
		imageOpacity,
		heightDesktop,
		heightMobile,
		marginBottom,
		marginBottomMobile,
		titleText,
		titleColor,
		subtitleText,
		subtitleColor,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-booking-hero-section-editor page-hero',
			style: {
				position: 'relative',
				height: `${ heightDesktop }px`,
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: '#000',
				color: '#fff',
				marginBottom: `${ marginBottom }px`,
			},
		} ),
		[ heightDesktop, marginBottom ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: media.url,
										backgroundImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ backgroundImageId }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant="secondary"
										style={ { marginBottom: '12px' } }
									>
										{ backgroundImage
											? __(
													'Replace Image',
													'twork-builder'
											  )
											: __(
													'Select Image',
													'twork-builder'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ backgroundImage && (
							<Button
								isDestructive
								variant="link"
								onClick={ () =>
									setAttributes( {
										backgroundImage: '',
										backgroundImageId: undefined,
									} )
								}
							>
								{ __( 'Remove Image', 'twork-builder' ) }
							</Button>
						) }
						<RangeControl
							label={ __( 'Image Opacity', 'twork-builder' ) }
							value={ imageOpacity }
							onChange={ ( val ) =>
								setAttributes( { imageOpacity: val } )
							}
							min={ 0.1 }
							max={ 1 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Height Desktop (px)',
								'twork-builder'
							) }
							value={ heightDesktop }
							onChange={ ( val ) =>
								setAttributes( { heightDesktop: val } )
							}
							min={ 180 }
							max={ 600 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Height Mobile (px)',
								'twork-builder'
							) }
							value={ heightMobile }
							onChange={ ( val ) =>
								setAttributes( { heightMobile: val } )
							}
							min={ 150 }
							max={ 400 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Margin Bottom (px)',
								'twork-builder'
							) }
							value={ marginBottom }
							onChange={ ( val ) =>
								setAttributes( { marginBottom: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Margin Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ marginBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { marginBottomMobile: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
						<ToggleControl
							label={ __( 'Animate on load', 'twork-builder' ) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
							{
								value: titleColor,
								onChange: ( val ) =>
									setAttributes( { titleColor: val } ),
								label: __( 'Title', 'twork-builder' ),
							},
							{
								value: subtitleColor,
								onChange: ( val ) =>
									setAttributes( { subtitleColor: val } ),
								label: __( 'Subtitle', 'twork-builder' ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				{ backgroundImage && (
					<div className="hero-bg-wrapper">
						<img
							src={ backgroundImage }
							alt=""
							className="hero-bg-img"
							style={ { opacity: imageOpacity } }
						/>
					</div>
				) }
				<div
					className="hero-container animate-hero"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<RichText
						tagName="h1"
						className="hero-title"
						value={ titleText }
						onChange={ ( val ) =>
							setAttributes( { titleText: val } )
						}
						placeholder={ __( 'Hero title…', 'twork-builder' ) }
						style={ { color: titleColor } }
					/>
					<RichText
						tagName="p"
						className="hero-subtitle"
						value={ subtitleText }
						onChange={ ( val ) =>
							setAttributes( { subtitleText: val } )
						}
						placeholder={ __( 'Subtitle…', 'twork-builder' ) }
						style={ { color: subtitleColor } }
					/>
				</div>
			</section>
		</>
	);
}
