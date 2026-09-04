import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/numbered-feature-item' ];
const TEMPLATE = [
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_1',
			number: '01',
			icon: 'cube',
			title: 'Natural Ingredients',
			text: 'သဘာဝ အနံ့ သဘာဝ အရသာ — we use carefully selected natural ingredients to deliver authentic butter and ghee flavor.',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_2',
			number: '02',
			icon: 'star',
			title: 'Consistent Quality',
			text: 'Every batch from our Mandalay facility meets strict quality standards so your family gets the same great taste every time.',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_3',
			number: '03',
			icon: 'truck',
			title: 'Trusted Brand',
			text: 'Shwe Myanmar (ရွှေမြန်မာ) is a registered trademark — a name households across Myanmar recognize and trust.',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_4',
			number: '04',
			icon: 'tag',
			title: 'Fair Pricing',
			text: 'Premium quality butter and ghee at prices that make everyday cooking accessible for families and businesses alike.',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_5',
			number: '05',
			icon: 'cherry',
			title: 'Multiple Pack Sizes',
			text: 'From 1 Viss retail packs to our flagship 10 Viss bulk size — options for home kitchens and commercial use.',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			itemId: 'why_6',
			number: '06',
			icon: 'cert',
			title: 'Mandalay Origin',
			text: 'Proudly produced in Mandalay, Myanmar — bringing the heritage and craftsmanship of our region to every product.',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'why-choose-us',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'why-choose-us__grid', 'data-list': 'items' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } aria-label="Why choose us">
				<div className="why-choose-us__inner l-section">
					<header className="section-head">
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						{ title ? (
							<h2 className="section-head__title">{ title }</h2>
						) : null }
					</header>
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
