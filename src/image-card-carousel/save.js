import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'services-carousel',
		'data-block': 'twork/image-card-carousel',
		'data-version': '1',
		'data-brand-carousel': '1',
		'data-autoplay-ms': '6000',
	} );

	return (
		<section { ...blockProps } aria-label="Our services">
			<div className="services-carousel__inner l-section">
				<header className="section-head">
					{ eyebrow ? (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) : null }
					{ title ? (
						<h2 className="section-head__title">{ title }</h2>
					) : null }
				</header>
				<div
					className="services-carousel__stage"
					role="region"
					aria-label="Core services"
				>
					<div className="services-carousel__track" data-list="items">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
