import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/review-card' ];
const TEMPLATE = [
	[
		'twork/review-card',
		{
			itemId: 't_1',
			text: 'Shwe Myanmar butter has been our kitchen staple for years. The natural taste is unmatched — we use it for everything from curries to baking.',
			name: 'Daw Khin M.',
			location: 'Mandalay, Myanmar',
		},
	],
	[
		'twork/review-card',
		{
			itemId: 't_2',
			text: 'We order the 10 Viss bulk pack for our restaurant. Consistent quality every delivery — our customers notice the difference in flavor.',
			name: 'U Aung K.',
			location: 'Yangon, Myanmar',
		},
	],
	[
		'twork/review-card',
		{
			itemId: 't_3',
			text: "The ghee quality is excellent for traditional Myanmar cooking. Shwe Myanmar is a brand we trust for our family's daily meals.",
			name: 'Ma Thida W.',
			location: 'Sagaing, Myanmar',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'testimonials',
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
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } aria-label="Testimonials">
				<div className="testimonials__inner l-section">
					<header className="section-head section-head--row">
						<div>
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
						</div>
						<div
							className="carousel-dots testimonials__dots"
							aria-hidden="true"
						/>
					</header>
					<div className="testimonials__stage">
						<button
							type="button"
							className="carousel-nav__btn"
							aria-label="Previous"
							disabled
						>
							‹
						</button>
						<div
							className="testimonials__track"
							data-list="items"
							tabIndex={ 0 }
						>
							<div { ...innerBlocksProps } />
						</div>
						<button
							type="button"
							className="carousel-nav__btn"
							aria-label="Next"
							disabled
						>
							›
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
