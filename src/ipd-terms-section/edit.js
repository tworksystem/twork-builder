import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
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
	BaseControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleFontSizeMobile,
		sectionHeaderMaxWidth,
		sectionHeaderMarginBottom,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		pdfUrl,
		pdfId,
		pdfFileName,
		viewButtonLabel,
		downloadButtonLabel,
		sectionAnchor,
		cardBgColor,
		cardBorderRadius,
		cardPadding,
		primaryButtonColor,
		primaryButtonHoverColor,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-ipd-terms-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const sectionHeaderStyle = {
		textAlign: sectionTitleAlignment,
		maxWidth: `${ sectionHeaderMaxWidth }px`,
		margin: `0 auto ${ sectionHeaderMarginBottom }px`,
	};

	const hasPdf = Boolean( pdfUrl );

	const handlePdfSelect = ( media ) => {
		const fileName =
			media?.title ||
			media?.filename?.replace( /\.pdf$/i, '' ) ||
			'Inpatient Terms & Conditions';

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

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'PDF Document', 'twork-builder' ) }
						initialOpen={ true }
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
							value={ pdfUrl }
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
							value={ pdfFileName }
							onChange={ ( val ) =>
								setAttributes( { pdfFileName: val } )
							}
						/>

						<TextControl
							label={ __( 'View Button Label', 'twork-builder' ) }
							value={ viewButtonLabel }
							onChange={ ( val ) =>
								setAttributes( { viewButtonLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Download Button Label',
								'twork-builder'
							) }
							value={ downloadButtonLabel }
							onChange={ ( val ) =>
								setAttributes( { downloadButtonLabel: val } )
							}
						/>

						<TextControl
							label={ __( 'Section Anchor ID', 'twork-builder' ) }
							value={ sectionAnchor }
							onChange={ ( val ) =>
								setAttributes( { sectionAnchor: val } )
							}
							help={ __(
								'Used for #terms deep links.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Content', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Subtitle', 'twork-builder' ) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>
						<SelectControl
							label={ __( 'Title Alignment', 'twork-builder' ) }
							value={ sectionTitleAlignment }
							options={ [
								{
									label: __( 'Center', 'twork-builder' ),
									value: 'center',
								},
								{
									label: __( 'Left', 'twork-builder' ),
									value: 'left',
								},
								{
									label: __( 'Right', 'twork-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { sectionTitleAlignment: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'twork-builder'
									),
								},
								{
									value: cardBgColor,
									onChange: ( val ) =>
										setAttributes( { cardBgColor: val } ),
									label: __(
										'Card Background',
										'twork-builder'
									),
								},
								{
									value: sectionTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionTitleColor: val,
										} ),
									label: __(
										'Title Color',
										'twork-builder'
									),
								},
								{
									value: sectionSubtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionSubtitleColor: val,
										} ),
									label: __(
										'Subtitle Color',
										'twork-builder'
									),
								},
								{
									value: primaryButtonColor,
									onChange: ( val ) =>
										setAttributes( {
											primaryButtonColor: val,
										} ),
									label: __(
										'Primary Button',
										'twork-builder'
									),
								},
								{
									value: primaryButtonHoverColor,
									onChange: ( val ) =>
										setAttributes( {
											primaryButtonHoverColor: val,
										} ),
									label: __(
										'Primary Button Hover',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout & Spacing', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 150 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 150 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
						/>
						<RangeControl
							label={ __(
								'Card Border Radius (px)',
								'twork-builder'
							) }
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 40 }
						/>
						<RangeControl
							label={ __( 'Card Padding (px)', 'twork-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
						<ToggleControl
							label={ __(
								'Scroll Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } id={ sectionAnchor || undefined }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="section-header"
							style={ sectionHeaderStyle }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									className="section-title"
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? '15px'
											: '0',
									} }
									placeholder={ __(
										'Section title…',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							) }
							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									className="section-subtitle"
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										color: sectionSubtitleColor,
										margin: 0,
									} }
									placeholder={ __(
										'Section subtitle…',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							) }
						</div>
					) }

					<div
						className={ `ipd-terms-card fade-up${ hasPdf ? '' : ' is-empty' }` }
						style={ {
							backgroundColor: cardBgColor,
							borderRadius: `${ cardBorderRadius }px`,
							padding: `${ cardPadding }px`,
						} }
					>
						<div className="ipd-terms-card-inner">
							<div
								className="ipd-terms-icon"
								aria-hidden="true"
							>
								<i className="fas fa-file-pdf"></i>
							</div>

							<div className="ipd-terms-info">
								<h3 className="ipd-terms-filename">
									{ pdfFileName ||
										__(
											'Inpatient Terms & Conditions',
											'twork-builder'
										) }
								</h3>
								<p className="ipd-terms-hint">
									{ hasPdf
										? __(
												'PDF document — view online or download for your records.',
												'twork-builder'
										  )
										: __(
												'Upload a PDF in the block sidebar (PDF Document panel).',
												'twork-builder'
										  ) }
								</p>
							</div>

							<div className="ipd-terms-actions">
								<span
									className={ `ipd-terms-btn ipd-terms-btn--primary${
										hasPdf ? '' : ' is-disabled'
									}` }
									aria-disabled={ ! hasPdf }
								>
									<i
										className="fas fa-external-link-alt"
										aria-hidden="true"
									></i>
									{ viewButtonLabel }
								</span>
								<span
									className={ `ipd-terms-btn ipd-terms-btn--secondary${
										hasPdf ? '' : ' is-disabled'
									}` }
									aria-disabled={ ! hasPdf }
								>
									<i
										className="fas fa-download"
										aria-hidden="true"
									></i>
									{ downloadButtonLabel }
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
