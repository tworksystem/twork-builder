import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { DEFAULT_CLAUSE_TEMPLATE } from './defaults';
import {
	buildDefaultLogoUrl,
	buildDefaultPageImages,
} from './defaults';

const ALLOWED_BLOCKS = [ 'twork/ipd-consent-clause-item' ];

function renderEditorFormField( field ) {
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

function renderEditorSignatureColumn( title, fields ) {
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

function renderOriginalPdfCard( {
	hasPdf,
	pdfUrl,
	pdfFileName,
	pdfViewLabel,
	pdfDownloadLabel,
	isEditor = false,
} ) {
	const title =
		pdfFileName || 'Inpatient Terms & Conditions (IPD)';
	const hint = hasPdf
		? 'PDF document — view online or download for your records.'
		: 'PDF document will appear here once uploaded in the editor.';

	return (
		<div
			className={ `ipd-terms-card ipd-consent-original-pdf-card${
				! hasPdf ? ' is-empty' : ''
			}` }
		>
			<div className="ipd-terms-card-inner ipd-consent-original-pdf-card__inner">
				<div className="ipd-terms-icon" aria-hidden="true">
					<i className="fas fa-file-pdf"></i>
				</div>
				<div className="ipd-terms-info ipd-consent-original-pdf-card__info">
					<h3 className="ipd-terms-filename">{ title }</h3>
					<p className="ipd-terms-hint">{ hint }</p>
					{ hasPdf && (
						<div className="ipd-consent-original-pdf__actions">
							{ isEditor ? (
								<>
									<span className="ipd-consent-original-pdf__link">
										<i
											className="fas fa-external-link-alt"
											aria-hidden="true"
										></i>
										{ pdfViewLabel || 'View PDF' }
									</span>
									<span className="ipd-consent-original-pdf__link">
										<i
											className="fas fa-download"
											aria-hidden="true"
										></i>
										{ pdfDownloadLabel || 'Download PDF' }
									</span>
								</>
							) : (
								<>
									<a
										href={ pdfUrl }
										className="ipd-consent-original-pdf__link"
										target="_blank"
										rel="noopener noreferrer"
										aria-label={ `${ pdfViewLabel || 'View PDF' }: ${ title }` }
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
											pdfFileName ? `${ pdfFileName }.pdf` : true
										}
										aria-label={ `${ pdfDownloadLabel || 'Download PDF' }: ${ title }` }
									>
										<i
											className="fas fa-download"
											aria-hidden="true"
										></i>
										{ pdfDownloadLabel || 'Download PDF' }
									</a>
								</>
							) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		sectionAnchor,
		logoUrl,
		logoId,
		logoAlt,
		tagline,
		formSectionTitle,
		termsMainTitle,
		referralQuestion,
		signatureSectionTitle,
		patientSignatureFields,
		witnessSignatureFields,
		liabilityText,
		consentClosingText,
		footerNote,
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
		pdfId,
		pdfFileName,
		pdfDownloadLabel,
		pdfViewLabel,
		showPdfDownload,
		footerAddress,
		footerPhone,
		footerEmail,
		footerWebsite,
		formFields,
		referralOptions,
		pageImages,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'mk-ipd-consent-content-section mk-ipd-consent-content-section-editor section-padding',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const fields = Array.isArray( formFields ) ? formFields : [];
	const referrals = Array.isArray( referralOptions ) ? referralOptions : [];
	const pages = Array.isArray( pageImages ) ? pageImages : [];
	const hasPdf = Boolean( pdfUrl );
	const showOriginalPanel =
		showOriginalPages !== false &&
		( pages.length > 0 || showPdfDownload !== false );
	const [ activeView, setActiveView ] = useState( defaultView || 'digital' );

	useEffect( () => {
		setActiveView( defaultView || 'digital' );
	}, [ defaultView ] );

	const handlePdfSelect = ( media ) => {
		const fileName =
			media?.title ||
			media?.filename?.replace( /\.pdf$/i, '' ) ||
			'Inpatient Terms & Conditions (IPD)';

		setAttributes( {
			pdfUrl: media?.url || '',
			pdfId: media?.id || undefined,
			pdfFileName: fileName,
		} );
	};

	const clearPdf = () => {
		setAttributes( {
			pdfUrl: '',
			pdfId: undefined,
		} );
	};

	useEffect( () => {
		const pluginUrl = window.tworkBuilderData?.pluginUrl || '';
		if ( ! pluginUrl ) {
			return;
		}

		const nextLogo = buildDefaultLogoUrl( pluginUrl );
		const nextPages = buildDefaultPageImages( pluginUrl );
		const needsLogo = ! logoUrl || ! logoUrl.includes( 'ipd-consent' );
		const needsPages =
			! Array.isArray( pageImages ) ||
			pageImages.length === 0 ||
			! pageImages[ 0 ]?.url;

		if ( needsLogo || needsPages ) {
			setAttributes( {
				...( needsLogo ? { logoUrl: nextLogo } : {} ),
				...( needsPages ? { pageImages: nextPages } : {} ),
			} );
		}
	}, [] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Document Header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										logoUrl: media?.url || '',
										logoId: media?.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ logoId }
								render={ ( { open } ) => (
									<Button variant="secondary" onClick={ open }>
										{ logoUrl
											? __(
													'Change Logo',
													'twork-builder'
											  )
											: __(
													'Upload Logo',
													'twork-builder'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						<TextControl
							label={ __( 'Logo Alt', 'twork-builder' ) }
							value={ logoAlt || '' }
							onChange={ ( val ) =>
								setAttributes( { logoAlt: val } )
							}
						/>
						<TextControl
							label={ __( 'Tagline', 'twork-builder' ) }
							value={ tagline || '' }
							onChange={ ( val ) =>
								setAttributes( { tagline: val } )
							}
						/>
						<TextControl
							label={ __( 'Section Anchor', 'twork-builder' ) }
							value={ sectionAnchor || '' }
							onChange={ ( val ) =>
								setAttributes( { sectionAnchor: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Visibility', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Document Header', 'twork-builder' ) }
							checked={ showDocumentHeader !== false }
							onChange={ ( val ) =>
								setAttributes( { showDocumentHeader: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Patient Form', 'twork-builder' ) }
							checked={ showFormSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showFormSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Referral Options', 'twork-builder' ) }
							checked={ showReferralSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showReferralSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Terms & Clauses', 'twork-builder' ) }
							checked={ showTermsSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showTermsSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Signature Section', 'twork-builder' ) }
							checked={ showSignatureSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showSignatureSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Liability Text', 'twork-builder' ) }
							checked={ showLiabilitySection !== false }
							onChange={ ( val ) =>
								setAttributes( { showLiabilitySection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Closing Text', 'twork-builder' ) }
							checked={ showClosingSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showClosingSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Footer Note', 'twork-builder' ) }
							checked={ showFooterNoteSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showFooterNoteSection: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Footer Contact', 'twork-builder' ) }
							checked={ showFooterContactSection !== false }
							onChange={ ( val ) =>
								setAttributes( { showFooterContactSection: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'PDF Document', 'twork-builder' ) }
						initialOpen={ false }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ handlePdfSelect }
								allowedTypes={ [ 'application/pdf' ] }
								value={ pdfId }
								render={ ( { open } ) => (
									<div>
										{ hasPdf && (
											<div
												style={ {
													padding: '12px',
													background: '#f0f0f1',
													borderRadius: '4px',
													marginBottom: '12px',
													fontSize: '13px',
												} }
											>
												<strong>
													{ __(
														'Current PDF:',
														'twork-builder'
													) }
												</strong>
												<br />
												{ pdfFileName }
											</div>
										) }
										<Button
											variant="primary"
											onClick={ open }
											style={ {
												marginBottom: '8px',
												display: 'block',
												width: '100%',
											} }
										>
											{ hasPdf
												? __(
														'Replace PDF',
														'twork-builder'
												  )
												: __(
														'Upload PDF',
														'twork-builder'
												  ) }
										</Button>
										{ hasPdf && (
											<Button
												variant="secondary"
												isDestructive
												onClick={ clearPdf }
												style={ { width: '100%' } }
											>
												{ __(
													'Remove PDF',
													'twork-builder'
												) }
											</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>

						<Divider />

						<TextControl
							label={ __( 'PDF URL', 'twork-builder' ) }
							value={ pdfUrl || '' }
							onChange={ ( val ) =>
								setAttributes( { pdfUrl: val } )
							}
							placeholder="https://example.com/document.pdf"
							help={ __(
								'Or paste a direct PDF URL.',
								'twork-builder'
							) }
						/>
						<TextControl
							label={ __( 'Display File Name', 'twork-builder' ) }
							value={ pdfFileName || '' }
							onChange={ ( val ) =>
								setAttributes( { pdfFileName: val } )
							}
						/>
						<TextControl
							label={ __( 'View Button Label', 'twork-builder' ) }
							value={ pdfViewLabel || '' }
							onChange={ ( val ) =>
								setAttributes( { pdfViewLabel: val } )
							}
						/>
						<TextControl
							label={ __(
								'Download Button Label',
								'twork-builder'
							) }
							value={ pdfDownloadLabel || '' }
							onChange={ ( val ) =>
								setAttributes( { pdfDownloadLabel: val } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show PDF Download on Original Tab',
								'twork-builder'
							) }
							checked={ showPdfDownload !== false }
							onChange={ ( val ) =>
								setAttributes( { showPdfDownload: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'View Options', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Original PDF Pages Tab',
								'twork-builder'
							) }
							checked={ showOriginalPages }
							onChange={ ( val ) =>
								setAttributes( { showOriginalPages: val } )
							}
						/>
						<SelectControl
							label={ __(
								'Default View',
								'twork-builder'
							) }
							value={ defaultView || 'digital' }
							options={ [
								{
									label: __(
										'Digital Document',
										'twork-builder'
									),
									value: 'digital',
								},
								{
									label: __(
										'Original Pages',
										'twork-builder'
									),
									value: 'original',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { defaultView: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Footer Contact', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Address', 'twork-builder' ) }
							value={ footerAddress || '' }
							onChange={ ( val ) =>
								setAttributes( { footerAddress: val } )
							}
						/>
						<TextControl
							label={ __( 'Phone', 'twork-builder' ) }
							value={ footerPhone || '' }
							onChange={ ( val ) =>
								setAttributes( { footerPhone: val } )
							}
						/>
						<TextControl
							label={ __( 'Email', 'twork-builder' ) }
							value={ footerEmail || '' }
							onChange={ ( val ) =>
								setAttributes( { footerEmail: val } )
							}
						/>
						<TextControl
							label={ __( 'Website', 'twork-builder' ) }
							value={ footerWebsite || '' }
							onChange={ ( val ) =>
								setAttributes( { footerWebsite: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label={ __( 'Padding Bottom', 'twork-builder' ) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } id={ sectionAnchor || undefined }>
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
								className={ `ipd-consent-view-tab${
									activeView === 'digital' ? ' is-active' : ''
								}` }
								role="tab"
								aria-selected={
									activeView === 'digital' ? 'true' : 'false'
								}
								onClick={ () => setActiveView( 'digital' ) }
							>
								{ __( 'Digital Document', 'twork-builder' ) }
							</button>
							<button
								type="button"
								className={ `ipd-consent-view-tab${
									activeView === 'original' ? ' is-active' : ''
								}` }
								role="tab"
								aria-selected={
									activeView === 'original' ? 'true' : 'false'
								}
								onClick={ () => setActiveView( 'original' ) }
							>
								{ __( 'Original Pages', 'twork-builder' ) }
							</button>
						</div>
					) }

					<div
						className={ `ipd-consent-panel ipd-consent-panel--digital${
							! showOriginalPanel || activeView === 'digital'
								? ' is-active'
								: ''
						}` }
					>
						<div className="ipd-consent-document fade-up">
							{ showDocumentHeader !== false && (
								<header className="ipd-consent-document__header">
									{ logoUrl && (
										<img
											src={ logoUrl }
											alt={ logoAlt || 'Jivaka Hospital' }
											className="ipd-consent-document__logo"
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
									<RichText
										tagName="h2"
										className="ipd-consent-form-card__title"
										value={ formSectionTitle }
										onChange={ ( val ) =>
											setAttributes( {
												formSectionTitle: val,
											} )
										}
										allowedFormats={ [] }
									/>
									<div className="ipd-consent-form__grid">
										{ fields.map( renderEditorFormField ) }
									</div>
									{ showReferralSection !== false && (
										<div className="ipd-consent-referral">
											<RichText
												tagName="p"
												className="ipd-consent-referral__question"
												value={ referralQuestion }
												onChange={ ( val ) =>
													setAttributes( {
														referralQuestion: val,
													} )
												}
											/>
											<div className="ipd-consent-referral__options">
												{ referrals.map(
													( option, index ) => (
														<span
															key={ index }
															className="ipd-consent-referral__option"
														>
															<span className="ipd-consent-referral__checkbox"></span>
															{ option }
														</span>
													)
												) }
											</div>
										</div>
									) }
								</section>
							) }

							{ showTermsSection !== false && (
								<section className="ipd-consent-terms-card">
									<RichText
										tagName="h2"
										className="ipd-consent-terms-card__title"
										value={ termsMainTitle }
										onChange={ ( val ) =>
											setAttributes( {
												termsMainTitle: val,
											} )
										}
										allowedFormats={ [] }
									/>
									<div className="ipd-consent-clauses">
										<InnerBlocks
											allowedBlocks={ ALLOWED_BLOCKS }
											template={ DEFAULT_CLAUSE_TEMPLATE }
											templateLock={ false }
											renderAppender={
												InnerBlocks.ButtonBlockAppender
											}
										/>
									</div>
								</section>
							) }

							{ showSignatureSection !== false && (
								<section className="ipd-consent-signature-card">
									<RichText
										tagName="h3"
										className="ipd-consent-signature-card__title"
										value={ signatureSectionTitle }
										onChange={ ( val ) =>
											setAttributes( {
												signatureSectionTitle: val,
											} )
										}
										allowedFormats={ [] }
									/>
									<div className="ipd-consent-signature__grid">
										{ renderEditorSignatureColumn(
											'လူဝင်ကိုယ်တိုင် / Patient',
											patientSignatureFields
										) }
										{ renderEditorSignatureColumn(
											'လူဝင်ရှင် / Witness',
											witnessSignatureFields
										) }
									</div>
								</section>
							) }

							{ showLiabilitySection !== false &&
								liabilityText && (
									<div className="ipd-consent-liability">
										<RichText
											tagName="p"
											value={ liabilityText }
											onChange={ ( val ) =>
												setAttributes( {
													liabilityText: val,
												} )
											}
										/>
									</div>
								) }

							{ showClosingSection !== false &&
								consentClosingText && (
									<div className="ipd-consent-closing">
										<RichText
											tagName="p"
											value={ consentClosingText }
											onChange={ ( val ) =>
												setAttributes( {
													consentClosingText: val,
												} )
											}
										/>
									</div>
								) }

							{ showFooterNoteSection !== false && footerNote && (
								<div className="ipd-consent-note">
									<RichText
										tagName="p"
										value={ footerNote }
										onChange={ ( val ) =>
											setAttributes( { footerNote: val } )
										}
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
											{ footerEmail }
										</p>
										<p>
											<strong>Website:</strong>{ ' ' }
											{ footerWebsite }
										</p>
									</div>
								</footer>
							) }
						</div>
					</div>

					{ showOriginalPanel && (
						<div
							className={ `ipd-consent-panel ipd-consent-panel--original${
								activeView === 'original' ? ' is-active' : ''
							}` }
						>
							{ showPdfDownload !== false &&
								renderOriginalPdfCard( {
									hasPdf,
									pdfUrl,
									pdfFileName,
									pdfViewLabel,
									pdfDownloadLabel,
									isEditor: true,
								} ) }

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
		</>
	);
}
