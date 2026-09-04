import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'why-choose-us',
		'data-block': 'twork/numbered-features-grid',
		'data-version': '1',
	} );

	return (
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
				<div className="why-choose-us__grid" data-list="items">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
