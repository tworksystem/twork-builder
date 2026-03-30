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
		paddingTopMobile,
		paddingBottomMobile,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gapMobile,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionTitleFontWeight,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionTitleAlignment,
		sectionHeaderMaxWidth,
		sectionHeaderMarginBottom,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-accommodation-options-section section-padding',
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
			'--gap-mobile': `${ gapMobile }px`,
			'--padding-top-mobile': `${ paddingTopMobile }px`,
			'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--container-padding-mobile': `${ containerPaddingMobile }px`,
			'--title-font-size-mobile': `${ sectionTitleFontSizeMobile }rem`,
		},
		'data-columns': columns,
		'data-columns-tablet': columnsTablet,
		'data-columns-mobile': columnsMobile,
		'data-gap': gap,
		'data-gap-mobile': gapMobile,
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
				className="jivaka-container"
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
					className="rooms-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						gap: `${ gap }px`,
					} }
					data-columns={ columns }
					data-columns-tablet={ columnsTablet }
					data-columns-mobile={ columnsMobile }
					data-gap={ gap }
					data-gap-mobile={ gapMobile }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
