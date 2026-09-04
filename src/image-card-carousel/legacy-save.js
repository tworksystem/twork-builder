import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (no stage / inner wrapper).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'services-carousel',
		'data-block': 'twork/image-card-carousel',
		'data-version': '1',
		'data-brand-carousel': '1',
		'data-autoplay-ms': '6000',
	} );

	return (
		<section { ...blockProps } aria-label="Services">
			<div className="l-section">
				<header className="section-head">
					{ eyebrow && (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) }
					{ title && (
						<h2 className="section-head__title">{ title }</h2>
					) }
				</header>
				<div className="services-carousel__track" data-list="items">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
