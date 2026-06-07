import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';

const BG_POSITIONS = [
	{ label: 'Center', value: 'center' },
	{ label: 'Center Right', value: 'center right' },
	{ label: 'Center Left', value: 'center left' },
	{ label: 'Right Center', value: 'right center' },
	{ label: 'Left Center', value: 'left center' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		eyebrow,
		title,
		subtitle,
		ctaLabel,
		ctaHref,
		imageUrl,
		imageId,
		imageAlt,
		backgroundPosition,
		headingLevel,
	} = attributes;

	const TitleTag = headingLevel === 'h1' ? 'h1' : 'h2';

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-hero-banner-carousel__slide twork-hero-banner-slide-editor',
			style: {
				backgroundImage: imageUrl ? `url(${ imageUrl })` : undefined,
				backgroundPosition: backgroundPosition || 'center right',
			},
		} ),
		[ backgroundPosition, imageUrl ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Slide Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Background Image', 'twork-builder' ) }>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									value={ imageId }
									onSelect={ ( media ) =>
										setAttributes( {
											imageUrl: media?.url || '',
											imageId: media?.id || null,
											imageAlt: media?.alt || imageAlt,
										} )
									}
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ imageUrl
												? __( 'Replace Image', 'twork-builder' )
												: __( 'Select Image', 'twork-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ imageUrl && (
								<Button
									variant="link"
									isDestructive
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Remove Image', 'twork-builder' ) }
								</Button>
							) }
						</BaseControl>
						<TextControl
							label={ __( 'Image Alt Text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
						<SelectControl
							label={ __( 'Background Position', 'twork-builder' ) }
							value={ backgroundPosition || 'center right' }
							options={ BG_POSITIONS }
							onChange={ ( val ) =>
								setAttributes( { backgroundPosition: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Slide Content', 'twork-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Title Heading Level', 'twork-builder' ) }
							value={ headingLevel || 'h2' }
							options={ [
								{
									label: __( 'H1 (primary slide only)', 'twork-builder' ),
									value: 'h1',
								},
								{
									label: __( 'H2', 'twork-builder' ),
									value: 'h2',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { headingLevel: val } )
							}
							help={ __(
								'Use H1 on the first slide only for SEO.',
								'twork-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Call To Action', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'CTA Label', 'twork-builder' ) }
							value={ ctaLabel }
							onChange={ ( val ) =>
								setAttributes( { ctaLabel: val } )
							}
						/>
						<BaseControl label={ __( 'CTA URL', 'twork-builder' ) }>
							<URLInput
								value={ ctaHref }
								onChange={ ( val ) =>
									setAttributes( { ctaHref: val } )
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps } data-carousel-slide>
				<div className="twork-hero-banner-carousel__overlay">
					<div className="twork-hero-banner-carousel__inner l-section">
						<div className="twork-hero-banner-carousel__content">
							<RichText
								tagName="p"
								className="twork-hero-banner-carousel__eyebrow"
								value={ eyebrow }
								onChange={ ( val ) =>
									setAttributes( { eyebrow: val } )
								}
								placeholder={ __(
									'Eyebrow text…',
									'twork-builder'
								) }
							/>
							<RichText
								tagName={ TitleTag }
								className="twork-hero-banner-carousel__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Slide title…', 'twork-builder' ) }
							/>
							<RichText
								tagName="p"
								className="twork-hero-banner-carousel__subtitle"
								value={ subtitle }
								onChange={ ( val ) =>
									setAttributes( { subtitle: val } )
								}
								placeholder={ __(
									'Slide subtitle…',
									'twork-builder'
								) }
							/>
							{ ( ctaLabel || ctaHref ) && (
								<a
									className="twork-hero-banner-carousel__cta btn btn--primary"
									href={ ctaHref || '#' }
									onClick={ ( e ) => e.preventDefault() }
								>
									<RichText
										tagName="span"
										value={ ctaLabel }
										onChange={ ( val ) =>
											setAttributes( { ctaLabel: val } )
										}
										placeholder={ __(
											'CTA label…',
											'twork-builder'
										) }
										allowedFormats={ [] }
									/>
									<span
										className="twork-hero-banner-carousel__cta-icon"
										aria-hidden="true"
									>
										{' '}
										›
									</span>
								</a>
							) }
						</div>
					</div>
				</div>
			</article>
		</>
	);
}
