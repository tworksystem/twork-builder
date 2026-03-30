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

	const classes = [ 'package-card', 'lab-price-card', 'fade-up' ];

	if ( isRecommended ) {
		// Match both generic and lab "featured" styles
		classes.push( 'recommended', 'featured' );
	}

	const blockProps = useBlockProps.save( {
		className: classes.join( ' ' ),
		'data-category': category,
	} );

	return (
		<div { ...blockProps }>
			{ isRecommended && ribbonText && (
				<div className="ribbon">{ ribbonText }</div>
			) }

			{ /* Lab-style header: .lab-price-header / .lab-price-title / .lab-price-amount */ }
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

			{ /* Lab-style body: .lab-price-body / .lab-features */ }
			<div className="pkg-body lab-price-body">
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
								{ feat.text }
							</li>
						) ) }
				</ul>

				{ showButton && buttonText && (
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
