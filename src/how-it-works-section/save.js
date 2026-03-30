import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
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
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-how-it-works-section section-padding',
		style: {
			backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			'--columns-tablet': columnsTablet,
			'--columns-mobile': columnsMobile,
			'--steps-gap': `${ gap }px`,
			'--hover-translate-y': `${ hoverTranslateY }px`,
		},
		'data-columns': columns,
		'data-columns-tablet': columnsTablet,
		'data-columns-mobile': columnsMobile,
		'data-gap': gap,
		'data-hover-effect': hoverEffect,
		'data-hover-translate-y': hoverTranslateY,
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
	} );

	return (
		<section { ...blockProps }>
			{ backgroundImage && backgroundOverlay && (
				<div
					className="background-overlay"
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: backgroundOverlayColor,
						opacity: backgroundOverlayOpacity,
						zIndex: 1,
					} }
				/>
			) }

			<div
				className="jivaka-container lab-steps-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				{ ( showSectionTitle || showSectionSubtitle ) && (
					<div
						className="section-header lab-header"
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
										? '8px'
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
					className="how-it-works-steps steps-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))`,
						gap: `${ gap }px`,
					} }
					data-columns={ columns }
					data-columns-tablet={ columnsTablet }
					data-columns-mobile={ columnsMobile }
					data-gap={ gap }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
