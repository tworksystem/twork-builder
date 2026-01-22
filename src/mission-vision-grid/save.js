import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'twork-mv-section',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`
		}
	});

	const containerStyle = {
		maxWidth: `${containerMaxWidth}px`,
		margin: '0 auto',
		padding: `0 ${containerPadding}px`
	};

	const gridStyle = {
		'--mv-columns-desktop': columns,
		'--mv-columns-tablet': columnsTablet,
		'--mv-columns-mobile': columnsMobile,
		'--mv-grid-gap': `${gap}px`
	};

	return (
		<section {...blockProps}>
			<div className="jivaka-container">
				<div className="mv-section-inner" style={containerStyle}>
					{(showSectionTitle || showSectionSubtitle) && (
						<div className="section-header">
							{showSectionTitle && (
								<RichText.Content
									tagName="h2"
									className="section-title"
									value={sectionTitle}
									style={{
										color: sectionTitleColor,
										fontSize: `${sectionTitleFontSize}rem`,
										fontWeight: sectionTitleFontWeight
									}}
								/>
							)}

							{showSectionSubtitle && (
								<RichText.Content
									tagName="p"
									className="section-subtitle"
									value={sectionSubtitle}
									style={{
										color: sectionSubtitleColor,
										fontSize: `${sectionSubtitleFontSize}rem`
									}}
								/>
							)}
						</div>
					)}

					<div
						className="mv-grid"
						style={gridStyle}
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}

