import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/category-card' ];
const TEMPLATE = [
	[
		'twork/category-card',
		{
			itemId: 'cat_butter',
			title: 'Butter',
			count: '3 Sizes',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_ghee',
			title: 'Ghee',
			count: '2 Sizes',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_bulk',
			title: 'Bulk (10 Viss)',
			count: '1 Item',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_retail',
			title: 'Retail Packs',
			count: '2 Items',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_cooking',
			title: 'Cooking Essentials',
			count: '4 Items',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_dairy',
			title: 'Dairy Products',
			count: '3 Items',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_gift',
			title: 'Gift Sets',
			count: '2 Items',
			href: '/shop/',
		},
	],
	[
		'twork/category-card',
		{
			itemId: 'cat_wholesale',
			title: 'Wholesale',
			count: 'Contact Us',
			href: '/wholesale/',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title, ctaLabel, ctaHref } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'product-categories',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ style: { display: 'contents' } },
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
					<TextControl
						label={ __( 'CTA Label', 'twork-builder' ) }
						value={ ctaLabel }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
					/>
					<TextControl
						label={ __( 'CTA URL', 'twork-builder' ) }
						value={ ctaHref }
						onChange={ ( v ) => setAttributes( { ctaHref: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } aria-label="Product categories">
				<div className="product-categories__inner l-section">
					<header className="section-head">
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						{ title ? (
							<h2 className="section-head__title">{ title }</h2>
						) : null }
					</header>
					<div className="product-categories__grid" data-list="items">
						<div { ...innerBlocksProps } />
						{ ctaLabel ? (
							<a
								className="product-categories__card product-categories__card--cta"
								href={ ctaHref || '/shop/' }
								onClick={ ( e ) => e.preventDefault() }
							>
								<span>{ ctaLabel }</span>
								<span
									className="product-categories__cta-arrow"
									aria-hidden="true"
								>
									→
								</span>
							</a>
						) : null }
					</div>
				</div>
			</section>
		</>
	);
}
