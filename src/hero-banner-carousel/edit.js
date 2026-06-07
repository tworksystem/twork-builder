import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/hero-banner-slide' ];

const SLIDE_TEMPLATE = [
	[
		'twork/hero-banner-slide',
		{
			eyebrow: 'SHWE MYANMAR FOODSTUFF INDUSTRY',
			title: 'သဘာဝ အနံ့ သဘာဝ အရသာ...',
			subtitle:
				'Natural scent, natural taste — premium butter and ghee crafted in Mandalay, Myanmar for families who value authentic quality.',
			ctaLabel: 'VIEW PRODUCTS',
			ctaHref: '#categories',
			imageAlt: 'Premium golden butter and ghee',
			imageUrl:
				'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1400&h=800&fit=crop&q=80',
			backgroundPosition: 'right center',
			headingLevel: 'h1',
		},
	],
	[
		'twork/hero-banner-slide',
		{
			eyebrow: 'PREMIUM BUTTER & GHEE',
			title: 'ရွှေမြန်မာ ထောပတ် — Trusted Across Myanmar.',
			subtitle:
				'Shwe Myanmar delivers consistent quality butter and ghee from our Mandalay production facility to kitchens nationwide.',
			ctaLabel: 'SHOP NOW',
			ctaHref: '/shop',
			imageAlt: 'Fresh dairy butter on wooden board',
			imageUrl:
				'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1400&h=800&fit=crop&q=80',
			backgroundPosition: 'center right',
		},
	],
	[
		'twork/hero-banner-slide',
		{
			eyebrow: 'MANDALAY HERITAGE',
			title: 'Quality You Can Taste Every Day.',
			subtitle:
				"From traditional recipes to modern quality standards — Shwe Myanmar Foodstuff Industry brings Mandalay's finest to your table.",
			ctaLabel: 'LEARN MORE',
			ctaHref: '#services',
			imageAlt: 'Golden ghee in traditional kitchen setting',
			imageUrl:
				'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1400&h=800&fit=crop&q=80',
			backgroundPosition: 'center right',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { autoplayMs, paddingTop, paddingBottom } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-hero-banner-carousel twork-hero-banner-carousel--editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Carousel Settings', 'twork-builder' ) }
						initialOpen={ true }
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
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 4 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="twork-hero-banner-carousel__wrap"
					role="region"
					aria-roledescription="carousel"
					aria-label={ __( 'Hero', 'twork-builder' ) }
				>
					<div
						className="twork-hero-banner-carousel__track"
						data-list="slides"
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ SLIDE_TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
					<button
						type="button"
						className="twork-hero-banner-carousel__arrow twork-hero-banner-carousel__arrow--prev"
						data-action="carousel-prev"
						aria-label={ __( 'Previous slide', 'twork-builder' ) }
					>
						‹
					</button>
					<button
						type="button"
						className="twork-hero-banner-carousel__arrow twork-hero-banner-carousel__arrow--next"
						data-action="carousel-next"
						aria-label={ __( 'Next slide', 'twork-builder' ) }
					>
						›
					</button>
					<div
						className="twork-hero-banner-carousel__dots carousel-dots"
						role="tablist"
						aria-hidden="true"
					/>
				</div>
			</section>
		</>
	);
}
