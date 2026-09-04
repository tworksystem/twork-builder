import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/logo-showcase-item' ];
const TEMPLATE = [
	[
		'twork/logo-showcase-item',
		{
			itemId: 'logo_1',
			name: 'Mandalay Region',
			imageUrl:
				'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Mandalay Region — Shwe Myanmar',
		},
	],
	[
		'twork/logo-showcase-item',
		{
			itemId: 'logo_2',
			name: 'Yangon Region',
			imageUrl:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Yangon Region — Shwe Myanmar',
		},
	],
	[
		'twork/logo-showcase-item',
		{
			itemId: 'logo_3',
			name: 'Sagaing Region',
			imageUrl:
				'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Sagaing Region — Shwe Myanmar',
		},
	],
	[
		'twork/logo-showcase-item',
		{
			itemId: 'logo_4',
			name: 'Shan State',
			imageUrl:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Shan State — Shwe Myanmar',
		},
	],
	[
		'twork/logo-showcase-item',
		{
			itemId: 'logo_5',
			name: 'Magway Region',
			imageUrl:
				'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=120&fit=crop&q=75',
			imageAlt: 'Magway Region — Shwe Myanmar',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		title,
		descriptionBold,
		description,
		readMoreLabel,
		readMoreHref,
	} = attributes;
	const blockProps = useStableBlockProps( { className: 'partners' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'partners__logos', 'data-list': 'logos' },
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
						label={ __( 'Description bold', 'twork-builder' ) }
						value={ descriptionBold }
						onChange={ ( v ) =>
							setAttributes( { descriptionBold: v } )
						}
					/>
					<TextareaControl
						label={ __( 'Description', 'twork-builder' ) }
						value={ description }
						onChange={ ( v ) =>
							setAttributes( { description: v } )
						}
					/>
					<TextControl
						label={ __( 'Read more label', 'twork-builder' ) }
						value={ readMoreLabel }
						onChange={ ( v ) =>
							setAttributes( { readMoreLabel: v } )
						}
					/>
					<TextControl
						label={ __( 'Read more URL', 'twork-builder' ) }
						value={ readMoreHref }
						onChange={ ( v ) =>
							setAttributes( { readMoreHref: v } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } aria-label="Partners">
				<div className="partners__inner l-section">
					<div className="partners__top">
						<header className="partners__head">
							{ eyebrow ? (
								<p className="section-head__eyebrow">
									{ eyebrow }
								</p>
							) : null }
							{ title ? (
								<h2 className="section-head__title">
									{ title }
								</h2>
							) : null }
						</header>
						<div className="partners__desc">
							{ descriptionBold || description ? (
								<p>
									{ descriptionBold ? (
										<strong>{ descriptionBold }</strong>
									) : null }
									{ description || null }
								</p>
							) : null }
							{ readMoreLabel ? (
								<p className="partners__more">
									{ 'For more information about brands. ' }
									<a
										href={ readMoreHref || '#' }
										onClick={ ( e ) => e.preventDefault() }
									>
										{ readMoreLabel }
									</a>
								</p>
							) : null }
						</div>
					</div>
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
