import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function renderFormField( field ) {
	if ( field.type === 'address' ) {
		const subFields = Array.isArray( field.subFields )
			? field.subFields
			: [];
		return (
			<div
				key={ field.id }
				className="ipd-consent-form__field ipd-consent-form__field--address"
			>
				<span className="ipd-consent-form__label">{ field.label }</span>
				{ field.labelEn && (
					<span className="ipd-consent-form__label-en">
						{ field.labelEn }
					</span>
				) }
				<div className="ipd-consent-form__address-grid">
					{ subFields.map( ( sub, index ) => (
						<div
							key={ `${ field.id }-${ index }` }
							className="ipd-consent-form__address-row"
						>
							<span className="ipd-consent-form__address-label">
								{ sub }
							</span>
							<span
								className="ipd-consent-form__line"
								aria-hidden="true"
							></span>
						</div>
					) ) }
				</div>
			</div>
		);
	}

	return (
		<div key={ field.id } className="ipd-consent-form__field">
			<span className="ipd-consent-form__label">{ field.label }</span>
			{ field.labelEn && (
				<span className="ipd-consent-form__label-en">
					{ field.labelEn }
				</span>
			) }
			<span className="ipd-consent-form__line" aria-hidden="true"></span>
		</div>
	);
}

function renderSignatureColumn( title, fields ) {
	const list = Array.isArray( fields ) ? fields : [];
	return (
		<div className="ipd-consent-signature__column">
			<h4 className="ipd-consent-signature__column-title">{ title }</h4>
			{ list.map( ( label, index ) => (
				<div key={ index } className="ipd-consent-signature__field">
					<span className="ipd-consent-signature__label">
						{ label }
					</span>
					<span
						className="ipd-consent-signature__line"
						aria-hidden="true"
					></span>
				</div>
			) ) }
		</div>
	);
}

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerPadding,
		sectionAnchor,
		logoUrl,
		logoAlt,
		tagline,
		formSectionTitle,
		termsMainTitle,
		formFields,
		referralQuestion,
		referralOptions,
		signatureSectionTitle,
		patientSignatureFields,
		witnessSignatureFields,
		liabilityText,
		consentClosingText,
		footerNote,
		pageImages,
		showOriginalPages,
		defaultView,
		showDocumentHeader,
		showFormSection,
		showReferralSection,
		showTermsSection,
		showSignatureSection,
		showLiabilitySection,
		showClosingSection,
		showFooterNoteSection,
		showFooterContactSection,
		pdfUrl,
		pdfFileName,
		pdfDownloadLabel,
		pdfViewLabel,
		showPdfDownload,
		footerAddress,
		footerPhone,
		footerEmail,
		footerWebsite,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-ipd-consent-content-section section-padding',
		id: sectionAnchor || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--padding-top-mobile': `${ paddingTopMobile }px`,
			'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
		},
		'data-animation': animationOnScroll,
		'data-default-view': defaultView || 'digital',
		'data-show-original': showOriginalPages,
	} );

	const fields = Array.isArray( formFields ) ? formFields : [];
	const referrals = Array.isArray( referralOptions ) ? referralOptions : [];
	const pages = Array.isArray( pageImages ) ? pageImages : [];
	const hasPdf = Boolean( pdfUrl );
	const showOriginalPanel =
		showOriginalPages !== false &&
		( pages.length > 0 || showPdfDownload !== false );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container ipd-consent-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				{ showOriginalPanel && (
					<div
						className="ipd-consent-view-tabs"
						role="tablist"
						aria-label="Consent document views"
					>
						<button
							type="button"
							className="ipd-consent-view-tab is-active"
							data-view-tab="digital"
							role="tab"
							aria-selected="true"
						>
							Digital Document
						</button>
						<button
							type="button"
							className="ipd-consent-view-tab"
							data-view-tab="original"
							role="tab"
							aria-selected="false"
						>
							Original Pages
						</button>
					</div>
				) }

				<div className="ipd-consent-panel ipd-consent-panel--digital is-active">
					<div className="ipd-consent-document fade-up">
						{ showDocumentHeader !== false && (
							<header className="ipd-consent-document__header">
								{ logoUrl && (
									<img
										src={ logoUrl }
										alt={ logoAlt || 'Jivaka Hospital' }
										className="ipd-consent-document__logo"
										loading="lazy"
										decoding="async"
									/>
								) }
								{ tagline && (
									<p className="ipd-consent-document__tagline">
										{ tagline }
									</p>
								) }
							</header>
						) }

						{ showFormSection !== false && (
							<section className="ipd-consent-form-card">
								<RichText.Content
									tagName="h2"
									className="ipd-consent-form-card__title"
									value={ formSectionTitle }
								/>
								<div className="ipd-consent-form__grid">
									{ fields.map( renderFormField ) }
								</div>

								{ showReferralSection !== false && (
									<div className="ipd-consent-referral">
										<RichText.Content
											tagName="p"
											className="ipd-consent-referral__question"
											value={ referralQuestion }
										/>
										<div className="ipd-consent-referral__options">
											{ referrals.map(
												( option, index ) => (
													<label
														key={ index }
														className="ipd-consent-referral__option"
													>
														<span
															className="ipd-consent-referral__checkbox"
															aria-hidden="true"
														></span>
														<span>{ option }</span>
													</label>
												)
											) }
										</div>
									</div>
								) }
							</section>
						) }

						{ showTermsSection !== false && (
							<section className="ipd-consent-terms-card">
								<RichText.Content
									tagName="h2"
									className="ipd-consent-terms-card__title"
									value={ termsMainTitle }
								/>
								<div className="ipd-consent-clauses">
									<InnerBlocks.Content />
								</div>
							</section>
						) }

						{ showSignatureSection !== false && (
							<section className="ipd-consent-signature-card">
								<RichText.Content
									tagName="h3"
									className="ipd-consent-signature-card__title"
									value={ signatureSectionTitle }
								/>
								<div className="ipd-consent-signature__grid">
									{ renderSignatureColumn(
										'လူဝင်ကိုယ်တိုင် / Patient',
										patientSignatureFields
									) }
									{ renderSignatureColumn(
										'လူဝင်ရှင် / Witness',
										witnessSignatureFields
									) }
								</div>
							</section>
						) }

						{ showLiabilitySection !== false && liabilityText && (
							<div className="ipd-consent-liability">
								<RichText.Content
									tagName="p"
									value={ liabilityText }
								/>
							</div>
						) }

						{ showClosingSection !== false &&
							consentClosingText && (
								<div className="ipd-consent-closing">
									<RichText.Content
										tagName="p"
										value={ consentClosingText }
									/>
								</div>
							) }

						{ showFooterNoteSection !== false && footerNote && (
							<div className="ipd-consent-note">
								<RichText.Content
									tagName="p"
									value={ footerNote }
								/>
							</div>
						) }

						{ showFooterContactSection !== false && (
							<footer className="ipd-consent-document__footer">
								<div className="ipd-consent-document__footer-brand">
									{ logoUrl && (
										<img
											src={ logoUrl }
											alt=""
											className="ipd-consent-document__footer-logo"
											loading="lazy"
											decoding="async"
										/>
									) }
									<strong>ဇီဝက ဆေးရုံ</strong>
								</div>
								<div className="ipd-consent-document__footer-meta">
									<p>{ footerAddress }</p>
									<p>
										<strong>Call Center:</strong>{ ' ' }
										{ footerPhone }
									</p>
									<p>
										<strong>Email:</strong>{ ' ' }
										<a href={ `mailto:${ footerEmail }` }>
											{ footerEmail }
										</a>
									</p>
									<p>
										<strong>Website:</strong>{ ' ' }
										<a
											href={
												footerWebsite.startsWith(
													'http'
												)
													? footerWebsite
													: `https://${ footerWebsite }`
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											{ footerWebsite }
										</a>
									</p>
								</div>
							</footer>
						) }
					</div>
				</div>

				{ showOriginalPanel && (
					<div className="ipd-consent-panel ipd-consent-panel--original">
						{ showPdfDownload !== false && (
							<div
								className={ `ipd-terms-card ipd-consent-original-pdf-card${
									! hasPdf ? ' is-empty' : ''
								}` }
							>
								<div className="ipd-terms-card-inner ipd-consent-original-pdf-card__inner">
									<div
										className="ipd-terms-icon"
										aria-hidden="true"
									>
										<i className="fas fa-file-pdf"></i>
									</div>
									<div className="ipd-terms-info ipd-consent-original-pdf-card__info">
										<h3 className="ipd-terms-filename">
											{ pdfFileName ||
												'Inpatient Terms & Conditions (IPD)' }
										</h3>
										<p className="ipd-terms-hint">
											{ hasPdf
												? 'PDF document — view online or download for your records.'
												: 'PDF document will appear here once uploaded in the editor.' }
										</p>
										{ hasPdf && (
											<div className="ipd-consent-original-pdf__actions">
												<a
													href={ pdfUrl }
													className="ipd-consent-original-pdf__link"
													target="_blank"
													rel="noopener noreferrer"
													aria-label={ `${ pdfViewLabel || 'View PDF' }: ${ pdfFileName }` }
												>
													<i
														className="fas fa-external-link-alt"
														aria-hidden="true"
													></i>
													{ pdfViewLabel || 'View PDF' }
												</a>
												<a
													href={ pdfUrl }
													className="ipd-consent-original-pdf__link"
													download={
														pdfFileName
															? `${ pdfFileName }.pdf`
															: true
													}
													aria-label={ `${ pdfDownloadLabel || 'Download PDF' }: ${ pdfFileName }` }
												>
													<i
														className="fas fa-download"
														aria-hidden="true"
													></i>
													{ pdfDownloadLabel ||
														'Download PDF' }
												</a>
											</div>
										) }
									</div>
								</div>
							</div>
						) }

						{ pages.length > 0 && (
							<div className="ipd-consent-pages fade-up">
								{ pages.map( ( page ) => (
									<figure
										key={ page.id || page.url }
										className="ipd-consent-page-figure"
									>
										<img
											src={ page.url }
											alt={
												page.alt ||
												`Consent document page ${ page.id }`
											}
											className="ipd-consent-page-image"
											loading="lazy"
											decoding="async"
										/>
										<figcaption>
											Page { page.id }
										</figcaption>
									</figure>
								) ) }
							</div>
						) }
					</div>
				) }
			</div>
		</section>
	);
}
