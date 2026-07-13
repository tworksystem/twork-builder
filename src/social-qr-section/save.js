import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionBgColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gridMarginTop,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionHeaderMaxWidth,
		sectionHeaderMarginBottom,
		containerMaxWidth,
		containerPadding,
		showHospitalLogo,
		hospitalLogoUrl,
		cardWatermarkUrl,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-social-qr-section section-padding',
		style: {
			backgroundColor: sectionBgColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--columns-tablet': columnsTablet,
			'--columns-mobile': columnsMobile,
		},
	} );

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
						className="section-header fade-up"
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
										? '10px'
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
					className="social-qr-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						gap: `${ gap }px`,
						marginTop: `${ gridMarginTop }px`,
						'--columns-tablet': columnsTablet,
						'--columns-mobile': columnsMobile,
						'--hospital-logo-url': hospitalLogoUrl
							? `url(${ hospitalLogoUrl })`
							: 'none',
						'--card-watermark-url': cardWatermarkUrl
							? `url(${ cardWatermarkUrl })`
							: 'none',
					} }
					data-columns={ columns }
					data-columns-tablet={ columnsTablet }
					data-columns-mobile={ columnsMobile }
					data-show-hospital-logo={ showHospitalLogo }
					data-hospital-logo={ hospitalLogoUrl || '' }
					data-card-watermark={ cardWatermarkUrl || '' }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
