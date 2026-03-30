import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		paddingTop,
		paddingBottom,
		showSidebar,
		showOverview,
		showTreatments,
		showSpecialists,
		showFaq,
		showCta,
		showNearbyAccommodation,
		nearbyAccommodationTitle,
		overviewTitle,
		overviewLead,
		overviewBody,
		overviewImageUrl,
		treatmentsTitle,
		treatmentsIntro,
		specialistsTitle,
		specialistsViewAllText,
		specialistsViewAllUrl,
		doctor1Name,
		doctor1Role,
		doctor1ImageUrl,
		doctor1ProfileUrl,
		doctor2Name,
		doctor2Role,
		doctor2ImageUrl,
		doctor2ProfileUrl,
		doctor3Name,
		doctor3Role,
		doctor3ImageUrl,
		doctor3ProfileUrl,
		faqTitle,
		ctaTitle,
		ctaText,
		ctaButtonText,
		ctaButtonUrl,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-neuro-centre-section',
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			<div className="jivaka-container layout-grid">
				{ showSidebar !== false && (
					<aside className="sidebar-wrapper">
						<div className="sidebar">
							<div className="sidebar-header">
								Clinical Centres
							</div>
							<div className="sidebar-menu">
								<a href="/heart-centre/">
									Heart Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#" className="active">
									Neuro Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="/cancer-centre/">
									Cancer Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Orthopaedic &amp; Rehab{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="/general-medicine/">
									General Medicine{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Paediatrics{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Dental Clinic{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
							</div>
						</div>

						<div className="sidebar-contact">
							<i className="fas fa-headset" />
							<h3>Emergency?</h3>
							<p>Our Stroke Unit is ready 24/7.</p>
							<a
								href="tel:09789101101"
								className="jivaka-btn btn-primary"
							>
								<i className="fas fa-phone" /> 09-789 101 101
							</a>
						</div>
					</aside>
				) }

				<div className="main-content">
					{ showOverview !== false && (
						<div className="content-section fade-up">
							<RichText.Content
								tagName="h2"
								value={ overviewTitle }
							/>
							<RichText.Content
								tagName="p"
								className="lead-text"
								value={ overviewLead }
							/>
							<RichText.Content
								tagName="p"
								className="body-text"
								value={ overviewBody }
							/>
							{ overviewImageUrl && (
								<img
									src={ overviewImageUrl }
									alt=""
									className="overview-image"
								/>
							) }
						</div>
					) }

					{ showTreatments !== false && (
						<div className="content-section fade-up neuro-treatments-section">
							<RichText.Content
								tagName="h2"
								value={ treatmentsTitle }
							/>
							<RichText.Content
								tagName="p"
								className="body-text"
								value={ treatmentsIntro }
							/>
							<div className="treatment-grid">
								<InnerBlocks.Content __experimentalCaptureId="neuro-treatments" />
							</div>
						</div>
					) }

					{ showSpecialists !== false && (
						<div className="content-section fade-up">
							<div className="section-header--inline">
								<RichText.Content
									tagName="h2"
									value={ specialistsTitle }
								/>
								<a
									href={ specialistsViewAllUrl }
									className="view-all-link"
								>
									{ specialistsViewAllText }{ ' ' }
									<i className="fas fa-arrow-right" />
								</a>
							</div>

							<div className="dept-doctors">
								<div className="doctor-card-mini stagger-doc">
									<div className="doc-img-wrap">
										{ doctor1ImageUrl && (
											<img
												src={ doctor1ImageUrl }
												alt={ doctor1Name }
											/>
										) }
									</div>
									<div className="doc-info">
										<RichText.Content
											tagName="h4"
											value={ doctor1Name }
										/>
										<RichText.Content
											tagName="span"
											value={ doctor1Role }
										/>
										<br />
										<a
											href={ doctor1ProfileUrl }
											className="btn-outline-dark"
										>
											View Profile
										</a>
									</div>
								</div>

								<div className="doctor-card-mini stagger-doc">
									<div className="doc-img-wrap">
										{ doctor2ImageUrl && (
											<img
												src={ doctor2ImageUrl }
												alt={ doctor2Name }
											/>
										) }
									</div>
									<div className="doc-info">
										<RichText.Content
											tagName="h4"
											value={ doctor2Name }
										/>
										<RichText.Content
											tagName="span"
											value={ doctor2Role }
										/>
										<br />
										<a
											href={ doctor2ProfileUrl }
											className="btn-outline-dark"
										>
											View Profile
										</a>
									</div>
								</div>

								<div className="doctor-card-mini stagger-doc">
									<div className="doc-img-wrap">
										{ doctor3ImageUrl && (
											<img
												src={ doctor3ImageUrl }
												alt={ doctor3Name }
											/>
										) }
									</div>
									<div className="doc-info">
										<RichText.Content
											tagName="h4"
											value={ doctor3Name }
										/>
										<RichText.Content
											tagName="span"
											value={ doctor3Role }
										/>
										<br />
										<a
											href={ doctor3ProfileUrl }
											className="btn-outline-dark"
										>
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					) }

					{ showFaq !== false && (
						<div className="content-section fade-up neuro-faq-section">
							<RichText.Content tagName="h2" value={ faqTitle } />
							<div className="neuro-faq-list">
								<InnerBlocks.Content __experimentalCaptureId="neuro-faq" />
							</div>
						</div>
					) }

					{ showCta !== false && (
						<div className="neuro-cta fade-up">
							<RichText.Content tagName="h3" value={ ctaTitle } />
							<RichText.Content tagName="p" value={ ctaText } />
							<a
								href={ ctaButtonUrl }
								className="jivaka-btn btn-primary"
							>
								{ ctaButtonText }
							</a>
						</div>
					) }

					{ showNearbyAccommodation === true && (
						<div className="content-section fade-up nearby-accommodation-in-section">
							{ nearbyAccommodationTitle && (
								<h2 className="section-title">
									{ nearbyAccommodationTitle }
								</h2>
							) }
							<div
								className="hotel-grid"
								style={ {
									display: 'grid',
									gridTemplateColumns:
										'repeat(auto-fill, minmax(250px, 1fr))',
									gap: '20px',
									marginTop: nearbyAccommodationTitle
										? '20px'
										: 0,
								} }
							>
								<InnerBlocks.Content />
							</div>
						</div>
					) }
				</div>
			</div>
		</section>
	);
}

/**
 * Legacy save for blocks that still have faq1Question, faq1Answer, faq2Question, faq2Answer.
 * Used by the deprecation so old content continues to display correctly.
 */
export function saveWithLegacyFaq( { attributes } ) {
	const legacyAttrs = {
		...attributes,
		faq1Question: attributes.faq1Question || '',
		faq1Answer: attributes.faq1Answer || '',
		faq2Question: attributes.faq2Question || '',
		faq2Answer: attributes.faq2Answer || '',
	};
	const blockProps = useBlockProps.save( {
		className: 'twork-neuro-centre-section',
		style: {
			paddingTop: `${ legacyAttrs.paddingTop ?? 80 }px`,
			paddingBottom: `${ legacyAttrs.paddingBottom ?? 80 }px`,
		},
	} );
	return (
		<section { ...blockProps }>
			<div className="jivaka-container layout-grid">
				{ legacyAttrs.showSidebar !== false && (
					<aside className="sidebar-wrapper">
						<div className="sidebar">
							<div className="sidebar-header">
								Clinical Centres
							</div>
							<div className="sidebar-menu">
								<a href="/heart-centre/">
									Heart Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#" className="active">
									Neuro Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="/cancer-centre/">
									Cancer Centre{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Orthopaedic &amp; Rehab{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="/general-medicine/">
									General Medicine{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Paediatrics{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
								<a href="#">
									Dental Clinic{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
							</div>
						</div>
						<div className="sidebar-contact">
							<i className="fas fa-headset" />
							<h3>Emergency?</h3>
							<p>Our Stroke Unit is ready 24/7.</p>
							<a
								href="tel:09789101101"
								className="jivaka-btn btn-primary"
							>
								<i className="fas fa-phone" /> 09-789 101 101
							</a>
						</div>
					</aside>
				) }
				<div className="main-content">
					{ legacyAttrs.showOverview !== false && (
						<div className="content-section fade-up">
							<RichText.Content
								tagName="h2"
								value={ legacyAttrs.overviewTitle }
							/>
							<RichText.Content
								tagName="p"
								className="lead-text"
								value={ legacyAttrs.overviewLead }
							/>
							<RichText.Content
								tagName="p"
								className="body-text"
								value={ legacyAttrs.overviewBody }
							/>
							{ legacyAttrs.overviewImageUrl && (
								<img
									src={ legacyAttrs.overviewImageUrl }
									alt=""
									className="overview-image"
								/>
							) }
						</div>
					) }
					{ legacyAttrs.showTreatments !== false && (
						<div className="content-section fade-up">
							<RichText.Content
								tagName="h2"
								value={ legacyAttrs.treatmentsTitle }
							/>
							<RichText.Content
								tagName="p"
								className="body-text"
								value={ legacyAttrs.treatmentsIntro }
							/>
							<div className="treatment-grid">
								{ [ 1, 2, 3, 4 ].map( ( i ) => (
									<div
										key={ i }
										className="treatment-card stagger-card"
									>
										{ ( legacyAttrs[
											`treatment${ i }IconType`
										] || 'icon' ) === 'image' &&
										legacyAttrs[
											`treatment${ i }ImageUrl`
										] ? (
											<img
												src={
													legacyAttrs[
														`treatment${ i }ImageUrl`
													]
												}
												alt=""
												className="treatment-media"
											/>
										) : (
											<i
												className={
													legacyAttrs[
														`treatment${ i }Icon`
													]
												}
											/>
										) }
										<RichText.Content
											tagName="h4"
											value={
												legacyAttrs[
													`treatment${ i }Title`
												]
											}
										/>
										<RichText.Content
											tagName="p"
											value={
												legacyAttrs[
													`treatment${ i }Text`
												]
											}
										/>
									</div>
								) ) }
							</div>
						</div>
					) }
					{ legacyAttrs.showSpecialists !== false && (
						<div className="content-section fade-up">
							<div className="section-header--inline">
								<RichText.Content
									tagName="h2"
									value={ legacyAttrs.specialistsTitle }
								/>
								<a
									href={ legacyAttrs.specialistsViewAllUrl }
									className="view-all-link"
								>
									{ legacyAttrs.specialistsViewAllText }{ ' ' }
									<i className="fas fa-arrow-right" />
								</a>
							</div>
							<div className="dept-doctors">
								{ [ 1, 2, 3 ].map( ( i ) => (
									<div
										key={ i }
										className="doctor-card-mini stagger-doc"
									>
										<div className="doc-img-wrap">
											{ legacyAttrs[
												`doctor${ i }ImageUrl`
											] && (
												<img
													src={
														legacyAttrs[
															`doctor${ i }ImageUrl`
														]
													}
													alt={
														legacyAttrs[
															`doctor${ i }Name`
														]
													}
												/>
											) }
										</div>
										<div className="doc-info">
											<RichText.Content
												tagName="h4"
												value={
													legacyAttrs[
														`doctor${ i }Name`
													]
												}
											/>
											<RichText.Content
												tagName="span"
												value={
													legacyAttrs[
														`doctor${ i }Role`
													]
												}
											/>
											<br />
											<a
												href={
													legacyAttrs[
														`doctor${ i }ProfileUrl`
													]
												}
												className="btn-outline-dark"
											>
												View Profile
											</a>
										</div>
									</div>
								) ) }
							</div>
						</div>
					) }
					{ legacyAttrs.showFaq !== false && (
						<div className="content-section fade-up">
							<RichText.Content
								tagName="h2"
								value={ legacyAttrs.faqTitle }
							/>
							<div className="faq-item">
								<button type="button" className="faq-btn">
									<RichText.Content
										tagName="span"
										value={ legacyAttrs.faq1Question }
									/>
									<i className="fas fa-chevron-down" />
								</button>
								<div className="faq-content">
									<RichText.Content
										tagName="p"
										value={ legacyAttrs.faq1Answer }
									/>
								</div>
							</div>
							<div className="faq-item">
								<button type="button" className="faq-btn">
									<RichText.Content
										tagName="span"
										value={ legacyAttrs.faq2Question }
									/>
									<i className="fas fa-chevron-down" />
								</button>
								<div className="faq-content">
									<RichText.Content
										tagName="p"
										value={ legacyAttrs.faq2Answer }
									/>
								</div>
							</div>
						</div>
					) }
					{ legacyAttrs.showCta !== false && (
						<div className="neuro-cta fade-up">
							<RichText.Content
								tagName="h3"
								value={ legacyAttrs.ctaTitle }
							/>
							<RichText.Content
								tagName="p"
								value={ legacyAttrs.ctaText }
							/>
							<a
								href={ legacyAttrs.ctaButtonUrl }
								className="jivaka-btn btn-primary"
							>
								{ legacyAttrs.ctaButtonText }
							</a>
						</div>
					) }
					{ legacyAttrs.showNearbyAccommodation === true && (
						<div className="content-section fade-up nearby-accommodation-in-section">
							{ legacyAttrs.nearbyAccommodationTitle && (
								<h2 className="section-title">
									{ legacyAttrs.nearbyAccommodationTitle }
								</h2>
							) }
							<div
								className="hotel-grid"
								style={ {
									display: 'grid',
									gridTemplateColumns:
										'repeat(auto-fill, minmax(250px, 1fr))',
									gap: '20px',
									marginTop:
										legacyAttrs.nearbyAccommodationTitle
											? '20px'
											: 0,
								} }
							>
								<InnerBlocks.Content />
							</div>
						</div>
					) }
				</div>
			</div>
		</section>
	);
}
