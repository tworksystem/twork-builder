import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (brand-carousel fade track only).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'testimonials',
		'data-block': 'twork/review-carousel',
		'data-version': '1',
		'data-brand-carousel': '1',
		'data-autoplay-ms': '8000',
	} );

	return (
		<section { ...blockProps } aria-label="Testimonials">
			<div className="l-section">
				<header className="section-head">
					{ eyebrow && (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) }
					{ title && (
						<h2 className="section-head__title">{ title }</h2>
					) }
				</header>
				<div className="testimonials__track" data-list="items">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
