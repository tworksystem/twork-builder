import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const attrs = attributes;
	const blockProps = useBlockProps.save( {
		className: 'about-story',
		'data-block': 'twork/about-story-section',
		'data-version': '1',
	} );

	const imageSrc = attrs.imageUrl || '';

	return (
		<section { ...blockProps }>
			<div className="about-story__inner l-section">
				<div className="about-story__intro" id="story">
					<div className="about-story__intro-text">
						<header className="section-head section-head--row">
							<div>
								{ attrs.eyebrow && (
									<p className="section-head__eyebrow">
										{ attrs.eyebrow }
									</p>
								) }
								{ attrs.title && (
									<RichText.Content
										tagName="h2"
										className="section-head__title"
										value={ attrs.title }
									/>
								) }
							</div>
						</header>
						{ Array.isArray( attrs.paragraphs ) &&
							attrs.paragraphs.map( ( p, i ) => (
								<p key={ i } className="about-story__para">
									{ p }
								</p>
							) ) }
						{ attrs.ctaLabel && (
							<a
								className="btn btn--primary"
								href={ attrs.ctaHref || '#' }
							>
								{ attrs.ctaLabel }
							</a>
						) }
					</div>
					{ imageSrc && (
						<div className="about-story__intro-media">
							<img
								className="about-story__image"
								src={ imageSrc }
								alt={ attrs.imageAlt || '' }
								width="560"
								height="400"
								loading="lazy"
								decoding="async"
							/>
						</div>
					) }
				</div>

				<div className="about-story__milestones">
					<header className="section-head">
						{ attrs.timelineEyebrow && (
							<p className="section-head__eyebrow">
								{ attrs.timelineEyebrow }
							</p>
						) }
						{ attrs.timelineTitle && (
							<RichText.Content
								tagName="h2"
								className="section-head__title"
								value={ attrs.timelineTitle }
							/>
						) }
					</header>
					{ Array.isArray( attrs.milestones ) &&
						attrs.milestones.length > 0 && (
							<div
								className="about-story__timeline"
								data-list="milestones"
							>
								{ attrs.milestones.map( ( item, i ) => (
									<div
										key={ item.id || i }
										className="about-story__milestone"
										data-item-id={ item.id || '' }
									>
										{ item.year && (
											<span className="about-story__year">
												{ item.year }
											</span>
										) }
										{ item.title && (
											<h3 className="about-story__milestone-title">
												{ item.title }
											</h3>
										) }
										{ item.text && (
											<p className="about-story__milestone-text">
												{ item.text }
											</p>
										) }
									</div>
								) ) }
							</div>
						) }
				</div>

				<div className="about-story__values">
					<header className="section-head">
						{ attrs.valuesEyebrow && (
							<p className="section-head__eyebrow">
								{ attrs.valuesEyebrow }
							</p>
						) }
						{ attrs.valuesTitle && (
							<RichText.Content
								tagName="h2"
								className="section-head__title"
								value={ attrs.valuesTitle }
							/>
						) }
					</header>
					{ Array.isArray( attrs.values ) &&
						attrs.values.length > 0 && (
							<div
								className="about-story__values-grid"
								data-list="values"
							>
								{ attrs.values.map( ( item, i ) => (
									<div
										key={ item.id || i }
										className="about-story__value"
										data-item-id={ item.id || '' }
									>
										{ item.number && (
											<span className="about-story__value-num">
												{ item.number }
											</span>
										) }
										{ item.title && (
											<h3 className="about-story__value-title">
												{ item.title }
											</h3>
										) }
										{ item.text && (
											<p className="about-story__value-text">
												{ item.text }
											</p>
										) }
									</div>
								) ) }
							</div>
						) }
				</div>
			</div>
		</section>
	);
}
