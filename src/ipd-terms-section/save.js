import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
		className: 'mk-ipd-terms-section section-padding',
		id: sectionAnchor || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--padding-top-mobile': `${ paddingTopMobile }px`,
			'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--container-padding-mobile': `${ containerPaddingMobile }px`,
			'--title-font-size-mobile': `${ sectionTitleFontSizeMobile }rem`,
			'--subtitle-font-size-mobile': `${ sectionSubtitleFontSizeMobile }rem`,
			'--primary-btn-color': primaryButtonColor,
			'--primary-btn-hover': primaryButtonHoverColor,
		},
		'data-animation': animationOnScroll,
	} );

	const hasPdf = Boolean( pdfUrl );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				{ ( showSectionTitle || showSectionSubtitle ) && (
					<div
						className="section-header"
						style={ {
							textAlign: sectionTitleAlignment,
							maxWidth: `${ sectionHeaderMaxWidth }px`,
							margin: `0 auto ${ sectionHeaderMarginBottom }px`,
						} }
					>
						{ showSectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								className="section-title"
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									marginBottom: showSectionSubtitle
										? '15px'
										: '0',
								} }
							/>
						) }
						{ showSectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
								className="section-subtitle"
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
								} }
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
									'Inpatient Terms & Conditions' }
							</h3>
							<p className="ipd-terms-hint">
								{ hasPdf
									? 'PDF document — view online or download for your records.'
									: 'PDF document will appear here once uploaded in the editor.' }
							</p>
						</div>

						{ hasPdf && (
							<div className="ipd-terms-actions">
								<a
									href={ pdfUrl }
									className="ipd-terms-btn ipd-terms-btn--primary"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={ `${ viewButtonLabel }: ${ pdfFileName }` }
								>
									<i
										className="fas fa-external-link-alt"
										aria-hidden="true"
									></i>
									{ viewButtonLabel }
								</a>
								<a
									href={ pdfUrl }
									className="ipd-terms-btn ipd-terms-btn--secondary"
									download={
										pdfFileName
											? `${ pdfFileName }.pdf`
											: true
									}
									aria-label={ `${ downloadButtonLabel }: ${ pdfFileName }` }
								>
									<i
										className="fas fa-download"
										aria-hidden="true"
									></i>
									{ downloadButtonLabel }
								</a>
							</div>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
