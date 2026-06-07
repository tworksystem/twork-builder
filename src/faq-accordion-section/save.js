import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		contactText,
		contactLinkLabel,
		contactHref,
		backgroundColor,
		padding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-faq-accordion-section faq',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingBlock: `${ padding }px`,
		},
		'data-block': 'twork/faq-accordion-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="faq__inner l-section">
				<header className="section-head">
					{ eyebrow && (
						<RichText.Content
							tagName="p"
							className="section-head__eyebrow"
							value={ eyebrow }
						/>
					) }
					{ title && (
						<RichText.Content
							tagName="h2"
							className="section-head__title"
							value={ title }
						/>
					) }
				</header>
				<div className="faq__list" data-list="items">
					<InnerBlocks.Content />
				</div>
				{ ( contactText || contactLinkLabel ) && (
					<p className="faq__contact">
						{ contactText && (
							<RichText.Content
								tagName="span"
								value={ contactText }
							/>
						) }
						{ contactText && contactLinkLabel ? ' ' : null }
						{ contactLinkLabel && (
							<a href={ contactHref || '#' }>
								{ contactLinkLabel }
							</a>
						) }
					</p>
				) }
			</div>
		</section>
	);
}
