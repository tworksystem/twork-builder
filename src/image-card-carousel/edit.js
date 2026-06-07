import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/image-card-slide' ];
const TEMPLATE = [
	[
		'twork/image-card-slide',
		{
			title: 'Butter & Ghee Production',
			ctaLabel: 'Learn more',
			href: '#categories',
			imageUrl:
				'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Premium butter production',
		},
	],
	[
		'twork/image-card-slide',
		{
			title: 'Quality Control',
			ctaLabel: 'Learn more',
			href: '/pages/quality.html',
			imageUrl:
				'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Quality inspection of dairy products',
		},
	],
	[
		'twork/image-card-slide',
		{
			title: 'Nationwide Distribution',
			ctaLabel: 'Learn more',
			href: '/pages/where-to-buy.html',
			imageUrl:
				'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Product distribution and logistics',
		},
	],
	[
		'twork/image-card-slide',
		{
			title: 'Traditional Craft',
			ctaLabel: 'Learn more',
			href: '/pages/about.html#story',
			imageUrl:
				'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Traditional butter making craft',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionEyebrow,
		sectionTitle,
		autoplayMs,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'image-card-carousel twork-image-card-carousel-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ padding }px`,
				paddingBottom: `${ padding }px`,
			},
		} ),
		[ backgroundColor, padding ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Background', 'twork-builder' ) }
								colorSettings={ [
									{
										value: backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'twork-builder'
										),
									},
								] }
							/>
						) }
						<RangeControl
							label={ __( 'Padding (px)', 'twork-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 20 }
							max={ 160 }
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
							max={ 1400 }
							step={ 20 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Carousel', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Autoplay (ms)', 'twork-builder' ) }
							value={ autoplayMs }
							onChange={ ( val ) =>
								setAttributes( { autoplayMs: val } )
							}
							min={ 0 }
							max={ 15000 }
							step={ 500 }
							help={ __(
								'Set to 0 to disable autoplay.',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="image-card-carousel__inner l-section"
					style={ containerStyle }
				>
					<header className="section-head">
						<RichText
							tagName="p"
							className="section-head__eyebrow"
							value={ sectionEyebrow }
							onChange={ ( val ) =>
								setAttributes( { sectionEyebrow: val } )
							}
							placeholder={ __(
								'Section eyebrow…',
								'twork-builder'
							) }
						/>
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'Section title…',
								'twork-builder'
							) }
						/>
					</header>

					<div
						className="image-card-carousel__stage"
						role="region"
						aria-label={ sectionTitle || __( 'Services', 'twork-builder' ) }
					>
						<div
							className="image-card-carousel__track"
							data-list="items"
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
								renderAppender={
									InnerBlocks.ButtonBlockAppender
								}
							/>
						</div>
					</div>

					<div className="carousel-nav" aria-hidden="true">
						<div className="carousel-dots image-card-carousel__dots" />
					</div>
				</div>
			</section>
		</>
	);
}
