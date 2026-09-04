import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title, contactText, contactLinkLabel, contactHref } =
		attributes;
	const blockProps = useBlockProps.save( {
		className: 'faq faq-accordion-section',
		'data-block': 'twork/faq-accordion-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="FAQ">
			<div className="faq__inner l-section">
				<header className="section-head">
					{ eyebrow && (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) }
					{ title && (
						<h2 className="section-head__title">{ title }</h2>
					) }
				</header>
				<div className="faq__list" data-list="items">
					<InnerBlocks.Content />
				</div>
				{ contactText && (
					<p className="faq__contact">
						{ contactText }{ ' ' }
						<a href={ contactHref || '#' }>
							{ contactLinkLabel || 'Contact us' }
						</a>
					</p>
				) }
			</div>
		</section>
	);
}
