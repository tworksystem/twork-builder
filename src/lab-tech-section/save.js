import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_COLORS = {
	primaryColor: '#f48b2a',
	itemTagBgColor: '#f0f4f8',
	itemTagColor: '#f48b2a',
	itemTitleColor: '#000000',
	itemDescriptionColor: '#666666',
	itemBulletColor: '#444444',
	itemBulletIconColor: '#f48b2a',
};

export default function save( { attributes } ) {
	const attrs = { ...DEFAULT_COLORS, ...attributes };
	const {
		backgroundColor,
		primaryColor,
		itemTagBgColor,
		itemTagColor,
		itemTitleColor,
		itemDescriptionColor,
		itemBulletColor,
		itemBulletIconColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
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
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'lab-section twork-lab-tech-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--lab-primary': primaryColor,
			'--lab-item-tag-bg': itemTagBgColor,
			'--lab-item-tag-color': itemTagColor,
			'--lab-item-title': itemTitleColor,
			'--lab-item-description': itemDescriptionColor,
			'--lab-item-bullet': itemBulletColor,
			'--lab-item-bullet-icon': itemBulletIconColor,
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="lab-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				{ ( showSectionTitle || showSectionSubtitle ) && (
					<div
						className="lab-header fade-up"
						style={ {
							textAlign: sectionTitleAlignment,
							marginBottom: '40px',
						} }
					>
						{ showSectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									margin: 0,
								} }
							/>
						) }
						{ showSectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									marginTop: '10px',
									marginBottom: 0,
								} }
							/>
						) }
					</div>
				) }

				<InnerBlocks.Content />
			</div>
		</section>
	);
}
