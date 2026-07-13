import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		category,
		isRecommended,
		ribbonText,
		packageName,
		packageNameColor,
		packageNameFontSize,
		packageNameFontWeight,
		currency,
		amount,
		priceColor,
		amountFontSize,
		description,
		descriptionColor,
		descriptionFontSize,
		features,
		featureTextColor,
		featureUnavailableColor,
		featureIconColor,
		featureFontSize,
		featureMarkerType,
		featureMarkerImageUrl,
		itemDisplayType,
		itemImageUrl,
		itemImageAlt,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonStyle,
		buttonBgColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderRadius,
		buttonFontSize,
		buttonFontWeight,
	} = attributes;

	const isImageDisplayType =
		itemDisplayType === 'image' || itemDisplayType === 'image-only';
	const shouldUseImageCard = isImageDisplayType && !! itemImageUrl;
	const isImageOnly = itemDisplayType === 'image-only' && !! itemImageUrl;
	const showHeader = ! isImageOnly;
	const showFooterButton = showButton && ! isImageOnly;

	const classes = [ 'package-card', 'lab-price-card', 'fade-up' ];

	if ( isRecommended ) {
		classes.push( 'recommended', 'featured' );
	}

	if ( shouldUseImageCard ) {
		classes.push( 'is-image-card' );
	}

	if ( isImageOnly ) {
		classes.push( 'is-image-only' );
	}

	const blockProps = useBlockProps.save( {
		className: classes.join( ' ' ),
		'data-category': category,
	} );
	const shouldUseImageMarker =
		featureMarkerType === 'image' && !! featureMarkerImageUrl;

	return (
		<div { ...blockProps }>
			{ isRecommended && ribbonText && (
				<div className="ribbon">{ ribbonText }</div>
			) }

			{ showHeader && (
				<div className="pkg-header lab-price-header">
					<RichText.Content
						tagName="span"
						className="pkg-name lab-price-title"
						value={ packageName }
						style={ {
							fontSize: `${ packageNameFontSize }rem`,
							fontWeight: packageNameFontWeight,
							color: packageNameColor,
						} }
					/>
					<div className="pkg-price">
						<div
							className="lab-price-amount"
							style={ {
								color: priceColor,
								fontSize: `${ amountFontSize }rem`,
							} }
						>
							{ amount }
						</div>
						<span className="lab-price-currency">{ currency }</span>
					</div>
					{ description && (
						<RichText.Content
							tagName="p"
							className="pkg-desc"
							value={ description }
							style={ {
								fontSize: `${ descriptionFontSize }rem`,
								color: descriptionColor,
							} }
						/>
					) }
				</div>
			) }

			<div className="pkg-body lab-price-body">
				{ shouldUseImageCard ? (
					<div className="pkg-display-image">
						<img
							src={ itemImageUrl }
							alt={ itemImageAlt || packageName || '' }
							loading="lazy"
							decoding="async"
						/>
					</div>
				) : (
					<ul className="pkg-features lab-features">
						{ features &&
							features.map( ( feat, index ) => (
								<li
									key={ index }
									className={
										feat.available ? '' : 'unavailable'
									}
									style={ {
										fontSize: `${ featureFontSize }rem`,
										color: feat.available
											? featureTextColor
											: featureUnavailableColor,
									} }
								>
									{ shouldUseImageMarker ? (
										<img
											src={ featureMarkerImageUrl }
											alt=""
											style={ {
												width: '18px',
												height: '18px',
												marginRight: '10px',
												objectFit: 'contain',
												flexShrink: 0,
											} }
											aria-hidden
										/>
									) : (
										<i
											className={
												feat.available
													? 'fas fa-check'
													: 'fas fa-times'
											}
											style={ {
												color: feat.available
													? featureIconColor
													: '#ccc',
											} }
											aria-hidden
										/>
									) }
									{ feat.text }
								</li>
							) ) }
					</ul>
				) }

				{ showFooterButton && buttonText && (
					<a
						href={ buttonUrl || '#' }
						className={ `jivaka-btn lab-btn ${
							buttonStyle === 'primary' ? '' : 'lab-btn-outline'
						}` }
						target={ buttonTarget ? '_blank' : '_self' }
						rel={
							buttonRel ||
							( buttonTarget ? 'noopener noreferrer' : undefined )
						}
						style={ {
							backgroundColor:
								buttonStyle === 'primary'
									? '#0284c7'
									: buttonBgColor,
							color: buttonTextColor,
							borderColor: buttonBorderColor,
							borderRadius: `${ buttonBorderRadius }px`,
							fontSize: `${ buttonFontSize }rem`,
							fontWeight: buttonFontWeight,
							marginTop: '20px',
							width: '100%',
						} }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</div>
	);
}
