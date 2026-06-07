import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/review-card' ];
const TEMPLATE = [
	[
		'twork/review-card',
		{
			text: 'Shwe Myanmar butter has been our kitchen staple for years. The natural taste is unmatched — we use it for everything from curries to baking.',
			name: 'Daw Khin M.',
			location: 'Mandalay, Myanmar',
			avatarUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
			avatarAlt: 'Daw Khin M.',
		},
	],
	[
		'twork/review-card',
		{
			text: 'We order the 10 Viss bulk pack for our restaurant. Consistent quality every delivery — our customers notice the difference in flavor.',
			name: 'U Aung K.',
			location: 'Yangon, Myanmar',
			avatarUrl:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
			avatarAlt: 'U Aung K.',
		},
	],
	[
		'twork/review-card',
		{
			text: 'The ghee quality is excellent for traditional Myanmar cooking. Shwe Myanmar is a brand we trust for our family\'s daily meals.',
			name: 'Ma Thida W.',
			location: 'Sagaing, Myanmar',
			avatarUrl:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
			avatarAlt: 'Ma Thida W.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { eyebrow, title, prevLabel, nextLabel } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'testimonials twork-review-carousel twork-review-carousel-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Carousel controls', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Previous button label',
								'twork-builder'
							) }
							value={ prevLabel || '' }
							onChange={ ( val ) =>
								setAttributes( { prevLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Next button label', 'twork-builder' ) }
							value={ nextLabel || '' }
							onChange={ ( val ) =>
								setAttributes( { nextLabel: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="testimonials__inner l-section">
					<header className="section-head section-head--row">
						<div>
							<RichText
								tagName="p"
								className="section-head__eyebrow"
								value={ eyebrow }
								onChange={ ( val ) =>
									setAttributes( { eyebrow: val } )
								}
								placeholder={ __(
									'CUSTOMER REVIEWS',
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
									'What Our Customers Say.',
									'twork-builder'
								) }
							/>
						</div>
						<div
							className="carousel-dots testimonials__dots"
							data-review-dots=""
							aria-hidden="true"
						/>
					</header>
					<div className="testimonials__stage">
						<button
							type="button"
							className="carousel-nav__btn"
							data-action="review-prev"
							aria-label={ prevLabel || 'Previous' }
							disabled
						>
							‹
						</button>
						<div
							className="testimonials__track"
							data-review-track=""
							tabIndex={ 0 }
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
						<button
							type="button"
							className="carousel-nav__btn"
							data-action="review-next"
							aria-label={ nextLabel || 'Next' }
							disabled
						>
							›
						</button>
					</div>
					<p
						className="components-base-control__help"
						style={ { marginTop: 12 } }
					>
						{ __(
							'Carousel scroll and dots work on the front end.',
							'twork-builder'
						) }
					</p>
				</div>
			</section>
		</>
	);
}
