import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

const PORTS = [ 'p1', 'p2', 'p3', 'p4' ];

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		headingAccent,
		lead,
		primaryLabel,
		primaryUrl,
		secondaryLabel,
		secondaryUrl,
		imageUrl,
		imageAlt,
		showPorts,
		proofTitle,
		proofText,
		showStars,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-hero',
		id: sectionId || undefined,
		style: {
			paddingTop: `${ attributes.paddingTop }px`,
			paddingBottom: `${ attributes.paddingBottom }px`,
			'--lp-container': `${ attributes.containerMaxWidth }px`,
		},
	} );

	return (
		<header { ...blockProps }>
			<span className="lp-aurora lp-aurora-1" aria-hidden="true" />
			<span className="lp-aurora lp-aurora-2" aria-hidden="true" />
			<div className="lp-shell">
				<div className="lp-hero-grid">
					<div className="lp-hero-content">
						{ eyebrow && (
							<span className="lp-eyebrow">
								{ eyebrowIcon && (
									<i
										className={ eyebrowIcon }
										aria-hidden="true"
									/>
								) }
								{ eyebrow }
							</span>
						) }
						<h1>
							<RichText.Content
								tagName="span"
								value={ heading }
							/>
							{ headingAccent && (
								<>
									<br />
									<span className="lp-hero-accent">
										{ headingAccent }
									</span>
								</>
							) }
						</h1>
						{ lead && (
							<RichText.Content
								tagName="p"
								className="lp-hero-lead"
								value={ lead }
							/>
						) }
						<div className="lp-hero-actions">
							{ primaryLabel && primaryUrl && (
								<a
									className="lp-btn lp-btn--primary"
									href={ primaryUrl }
								>
									{ primaryLabel }
									<i
										className="fas fa-arrow-right"
										aria-hidden="true"
									/>
								</a>
							) }
							{ secondaryLabel && secondaryUrl && (
								<a
									className="lp-btn lp-btn--ghost"
									href={ secondaryUrl }
								>
									{ secondaryLabel }
								</a>
							) }
						</div>
						{ ( proofTitle || proofText ) && (
							<div className="lp-hero-proof">
								<div>
									<strong>
										{ proofTitle }
										{ showStars && (
											<span
												className="lp-stars"
												aria-hidden="true"
											>
												<i className="fas fa-star" />
												<i className="fas fa-star" />
												<i className="fas fa-star" />
												<i className="fas fa-star" />
												<i className="fas fa-star" />
											</span>
										) }
									</strong>
									<RichText.Content
										tagName="span"
										value={ proofText }
									/>
								</div>
							</div>
						) }
					</div>
					<div className="lp-hero-visual">
						<div className="lp-hero-frame">
							{ showPorts &&
								PORTS.map( ( port ) => (
									<span
										key={ port }
										className={ 'lp-port lp-port--' + port }
										aria-hidden="true"
									/>
								) ) }
							{ imageUrl && (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									fetchPriority="high"
									decoding="async"
								/>
							) }
						</div>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</header>
	);
}
