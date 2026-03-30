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
		containerMaxWidth,
		containerPadding,
		showFilterSection,
		filterTabs,
		filterBgColor,
		filterActiveBgColor,
		filterActiveTextColor,
		filterTextColor,
		filterBorderRadius,
		filterSectionMarginBottom,
		columns,
		gap,
		hoverEffect,
		hoverTranslateY,
		animationOnScroll,
		animationDelay,
		animationType,
		layoutStyle,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleAlignment,
		showWaveDivider,
		waveColor,
		labSectionBgColor,
		labFeatureTextColor,
		labCurrencyColor,
		primaryColor,
		cardTitleColor,
		cardPriceColor,
		cardDescColor,
		featureIconColor,
		featureTextColor,
		buttonBgColor,
		buttonTextColor,
		ribbonBgColor,
		ribbonTextColor,
		labPrimaryColor,
		labSecondaryColor,
		labHeaderBgColor,
		labHeaderTextColor,
		labCardBgColor,
		labFeatureIconColor,
		labButtonBgColor,
		labButtonTextColor,
	} = attributes;

	const sectionClassName = [
		'twork-packages-section',
		layoutStyle === 'lab' ? 'lab-section lab-price-section' : null,
		layoutStyle === 'lab' && showWaveDivider ? 'has-wave-divider' : null,
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: sectionClassName,
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
			'--filter-bg': filterBgColor || '#f1f1f1',
			'--filter-active-bg': filterActiveBgColor || '#ffffff',
			'--filter-active-color': filterActiveTextColor || '#f48b2a',
			'--filter-text-color': filterTextColor || '#666666',
			...( layoutStyle === 'lab' && showWaveDivider && waveColor
				? { '--wave-fill': waveColor }
				: {} ),
			'--primary-orange': primaryColor || '#f48b2a',
			'--dark-grey': cardTitleColor || '#212121',
			'--medium-grey': cardDescColor || '#666666',
			'--pkg-price-color': cardPriceColor || '#f48b2a',
			'--feature-icon-color': featureIconColor || '#2ecc71',
			'--feature-text-color': featureTextColor || '#555555',
			'--button-bg': buttonBgColor || '#f48b2a',
			'--button-text': buttonTextColor || '#ffffff',
			'--ribbon-bg': ribbonBgColor || '#f48b2a',
			'--ribbon-text': ribbonTextColor || '#ffffff',
			...( layoutStyle === 'lab'
				? {
						'--lab-primary': labPrimaryColor || '#0284c7',
						'--lab-secondary': labSecondaryColor || '#0f172a',
						'--lab-header-bg': labHeaderBgColor || '#0f172a',
						'--lab-header-text': labHeaderTextColor || '#ffffff',
						'--lab-white': labCardBgColor || '#ffffff',
						'--lab-light': labSectionBgColor || '#f0f9ff',
						'--lab-feature-icon': labFeatureIconColor || '#0284c7',
						'--lab-feature-text': labFeatureTextColor || '#555555',
						'--lab-currency': labCurrencyColor || '#94a3b8',
						'--lab-btn-bg': labButtonBgColor || '#0284c7',
						'--lab-btn-text': labButtonTextColor || '#ffffff',
				  }
				: {} ),
		},
		'data-hover-effect': hoverEffect,
		'data-hover-translate-y': hoverTranslateY,
		'data-animation': animationOnScroll,
		'data-animation-type': animationType,
		'data-animation-delay': animationDelay,
		'data-layout-style': layoutStyle || 'default',
	} );

	return (
		<section { ...blockProps }>
			{ layoutStyle === 'lab' && showWaveDivider && (
				<div className="wave-divider" aria-hidden="true">
					<svg
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							className="wave-fill"
							style={ { fill: waveColor || '#f0f9ff' } }
						/>
					</svg>
				</div>
			) }
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
				className={ `jivaka-container${
					layoutStyle === 'lab' ? ' lab-container' : ''
				}` }
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				{ layoutStyle === 'lab' && showSectionHeader && (
					<div
						className="lab-header fade-up"
						style={ {
							textAlign: sectionTitleAlignment,
							margin: '0 auto 40px',
							maxWidth: '700px',
						} }
					>
						<RichText.Content
							tagName="h2"
							value={ sectionTitle }
							style={ {
								fontSize: '2.5rem',
								fontWeight: 700,
								marginBottom: 0,
								color: sectionTitleColor,
							} }
						/>
					</div>
				) }
				{ showFilterSection && filterTabs && filterTabs.length > 0 && (
					<div
						className="filter-section"
						style={ {
							padding: '60px 0 40px',
							textAlign: 'center',
						} }
					>
						<div
							className="filter-tabs"
							style={ {
								display: 'inline-flex',
								flexWrap: 'wrap',
								justifyContent: 'center',
								gap: '10px',
								marginBottom: `${ filterSectionMarginBottom }px`,
								background: filterBgColor,
								padding: '5px',
								borderRadius: `${ filterBorderRadius }px`,
							} }
						>
							{ filterTabs.map( ( tab, index ) => (
								<button
									key={ index }
									type="button"
									className={ `filter-btn ${
										index === 0 ? 'active' : ''
									}` }
									data-filter={ tab.value }
									aria-pressed={ index === 0 }
									aria-label={ tab.label }
								>
									{ tab.label }
								</button>
							) ) }
						</div>
					</div>
				) }
				<div
					className={ `packages-grid${
						layoutStyle === 'lab' ? ' lab-price-grid' : ''
					}` }
					id="packagesGrid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						gap: `${ gap }px`,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
