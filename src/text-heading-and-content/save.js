import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		sectionAlignment,
		categoryTitle,
		categoryColor,
		categoryFontSize,
		categoryLetterSpacing,
		showCategory,
		mainTitle,
		mainTitleColor,
		mainTitleFontSize,
		mainTitleFontWeight,
		mainTitleLineHeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionMaxWidth
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'wp-block-twork-text-heading-and-content',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`
		}
	});

	const containerStyle = {
		maxWidth: `${containerMaxWidth}px`,
		margin: '0 auto',
		padding: `0 ${containerPadding}px`,
		textAlign: sectionAlignment
	};

	return (
		<div {...blockProps}>
			<div className="service-blue-text-wrapper career-text" style={{ backgroundColor }}>
				<div className="uk-container" style={containerStyle}>
					{showCategory && categoryTitle && (
						<RichText.Content
							tagName="div"
							className="category-title"
							value={categoryTitle}
							style={{
								color: categoryColor,
								fontSize: `${categoryFontSize}rem`,
								letterSpacing: `${categoryLetterSpacing}px`
							}}
						/>
					)}

					{mainTitle && (
						<RichText.Content
							tagName="div"
							className="main-title"
							value={mainTitle}
							style={{
								color: mainTitleColor,
								fontSize: `${mainTitleFontSize}rem`,
								fontWeight: mainTitleFontWeight,
								lineHeight: mainTitleLineHeight
							}}
						/>
					)}

					{description && (
						<RichText.Content
							tagName="div"
							className="desc-title"
							value={description}
							style={{
								color: descriptionColor,
								fontSize: `${descriptionFontSize}rem`,
								maxWidth: `${descriptionMaxWidth}px`,
								marginLeft: 'auto',
								marginRight: 'auto'
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
