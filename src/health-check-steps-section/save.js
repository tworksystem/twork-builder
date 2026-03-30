import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		headerMarginBottom,
		primaryColor,
		iconColor,
		titleColor,
		descriptionColor,
		connectorLineColor,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'chk-section twork-health-check-steps-section',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			'--chk-primary': primaryColor || '#f48b2a',
			'--chk-step-icon-color': iconColor || primaryColor || '#f48b2a',
			'--chk-step-title-color': titleColor || '#212121',
			'--chk-step-desc-color': descriptionColor || '#666666',
			'--chk-step-connector': connectorLineColor || '#ddd',
		},
		'data-columns': columns,
		'data-columns-tablet': columnsTablet,
		'data-columns-mobile': columnsMobile,
		'data-animation': animationOnScroll ? 'true' : 'false',
		'data-animation-type': animationType || 'stagger-up',
		'data-animation-delay': String( animationDelay ?? 100 ),
	} );

	return (
		<section { ...blockProps }>
			<div
				className="chk-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
				} }
			>
				{ showSectionTitle && (
					<div
						className="chk-header fade-up"
						style={ {
							textAlign: sectionTitleAlignment,
							marginBottom: `${ headerMarginBottom }px`,
							marginTop: 0,
						} }
					>
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
					</div>
				) }
				<div
					className="chk-steps-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						gap: `${ gap }px`,
						textAlign: 'center',
						marginTop: showSectionTitle
							? 0
							: `${ headerMarginBottom }px`,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
