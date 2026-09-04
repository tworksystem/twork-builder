import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/hero-banner-slide' ];
const TEMPLATE = [
	[
		'twork/hero-banner-slide',
		{
			itemId: 'slide_1',
			eyebrow: 'SHWE MYANMAR FOODSTUFF INDUSTRY',
			title: 'သဘာဝ အနံ့ သဘာဝ အရသာ...',
			subtitle: 'Natural scent, natural taste — premium butter and ghee.',
			ctaLabel: 'VIEW PRODUCTS',
			ctaHref: '#categories',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { autoplayMs } = attributes;
	const blockProps = useStableBlockProps( { className: 'hero hero-editor' } );
	const trackProps = useInnerBlocksProps(
		{ className: 'hero__track', 'data-list': 'slides' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Carousel', 'twork-builder' ) }>
					<RangeControl
						label={ __( 'Autoplay (ms)', 'twork-builder' ) }
						value={ autoplayMs }
						onChange={ ( v ) => setAttributes( { autoplayMs: v } ) }
						min={ 0 }
						max={ 15000 }
						step={ 500 }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } data-block="twork/hero-banner-carousel">
				<div
					className="hero__wrap"
					data-brand-carousel="1"
					data-autoplay-ms={ autoplayMs }
				>
					<div { ...trackProps } />
				</div>
			</section>
		</>
	);
}
