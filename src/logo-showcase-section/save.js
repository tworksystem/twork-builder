import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		descriptionBold,
		description,
		readMoreLabel,
		readMoreHref,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'partners twork-logo-showcase-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="partners__inner l-section">
				<div className="partners__top">
					<header className="partners__head">
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
					<div className="partners__desc">
						{ ( descriptionBold || description ) && (
							<p>
								{ descriptionBold && (
									<RichText.Content
										tagName="strong"
										value={ descriptionBold }
									/>
								) }
								{ description && (
									<RichText.Content
										tagName="span"
										value={ description }
									/>
								) }
							</p>
						) }
						{ readMoreLabel && (
							<p className="partners__more">
								For more information about brands.{ ' ' }
								<RichText.Content
									tagName="a"
									value={ readMoreLabel }
									href={ readMoreHref || '#' }
								/>
							</p>
						) }
					</div>
				</div>
				<div className="partners__logos">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
