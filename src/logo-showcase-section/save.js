import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
		className: 'partners',
		'data-block': 'twork/logo-showcase-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Partners">
			<div className="partners__inner l-section">
				<div className="partners__top">
					<header className="partners__head">
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						{ title ? (
							<h2 className="section-head__title">{ title }</h2>
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
								<a href={ readMoreHref || '#' }>
									{ readMoreLabel }
								</a>
							</p>
						) : null }
					</div>
				</div>
				<div className="partners__logos" data-list="logos">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
