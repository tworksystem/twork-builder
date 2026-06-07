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
	ToggleControl,
	TextControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/category-card' ];
const TEMPLATE = [
	[
		'twork/category-card',
		{
			title: 'Butter',
			count: '3 Sizes',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Shwe Myanmar Butter',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Ghee',
			count: '2 Sizes',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Shwe Myanmar Ghee',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Bulk (10 Viss)',
			count: '1 Item',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop&q=75',
			imageAlt: '10 Viss bulk butter pack',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Retail Packs',
			count: '2 Items',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Retail butter packs',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Cooking Essentials',
			count: '4 Items',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Cooking essentials',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Dairy Products',
			count: '3 Items',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Dairy products',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Gift Sets',
			count: '2 Items',
			href: '/pages/shop.html',
			imageUrl:
				'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Gift set packaging',
		},
	],
	[
		'twork/category-card',
		{
			title: 'Wholesale',
			count: 'Contact Us',
			href: '/pages/wholesale.html',
			imageUrl:
				'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop&q=75',
			imageAlt: 'Wholesale orders',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		eyebrow,
		title,
		ctaLabel,
		ctaHref,
		showCtaCard,
		columns,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'product-categories twork-category-card-grid-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ padding }px`,
				paddingBottom: `${ padding }px`,
				'--category-columns': columns,
			},
		} ),
		[ backgroundColor, columns, padding ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
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
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'CTA Card', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show CTA card',
								'twork-builder'
							) }
							checked={ showCtaCard }
							onChange={ ( val ) =>
								setAttributes( { showCtaCard: val } )
							}
						/>
						{ showCtaCard && (
							<>
								<TextControl
									label={ __(
										'CTA label',
										'twork-builder'
									) }
									value={ ctaLabel || '' }
									onChange={ ( val ) =>
										setAttributes( { ctaLabel: val } )
									}
								/>
								<TextControl
									label={ __( 'CTA URL', 'twork-builder' ) }
									value={ ctaHref || '' }
									onChange={ ( val ) =>
										setAttributes( { ctaHref: val } )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="product-categories__inner l-section"
					style={ containerStyle }
				>
					<header className="section-head">
						<RichText
							tagName="p"
							className="section-head__eyebrow"
							value={ eyebrow }
							onChange={ ( val ) =>
								setAttributes( { eyebrow: val } )
							}
							placeholder={ __(
								'Section eyebrow…',
								'twork-builder'
							) }
						/>
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								'Section title…',
								'twork-builder'
							) }
						/>
					</header>

					<div
						className="product-categories__grid"
						data-list="items"
						style={ gridStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={
								InnerBlocks.ButtonBlockAppender
							}
						/>
						{ showCtaCard && (
							<a
								className="product-categories__card product-categories__card--cta"
								href={ ctaHref || '#' }
								onClick={ ( e ) => e.preventDefault() }
							>
								<span>{ ctaLabel || 'See all products' }</span>
								<span
									className="product-categories__cta-arrow"
									aria-hidden="true"
								>
									→
								</span>
							</a>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
