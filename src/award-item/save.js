import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		imageUrl,
		imageAlt,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		awardYear,
		awardTitle,
		awardDescription,
		yearColor,
		yearFontSize,
		yearFontWeight,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		contentPadding,
		cardBgColor,
		cardBorderRadius,
		cardBoxShadow,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'award-item stagger-up',
		style: {
			background: cardBgColor,
			borderRadius: `${ cardBorderRadius }px`,
			overflow: 'hidden',
			boxShadow: cardBoxShadow
				? '0 5px 15px rgba(0, 0, 0, 0.05)'
				: 'none',
			transition: '0.3s',
			'--year-color': yearColor,
			'--year-size': `${ yearFontSize }rem`,
			'--year-weight': yearFontWeight,
			'--title-color': titleColor,
			'--title-size': `${ titleFontSize }rem`,
			'--title-weight': titleFontWeight,
			'--desc-color': descriptionColor,
			'--desc-size': `${ descriptionFontSize }rem`,
			'--desc-line-height': descriptionLineHeight,
		},
	} );

	return (
		<div { ...blockProps }>
			{ imageUrl && (
				<div
					className="award-img-wrap"
					style={ { height: `${ imageHeight }px` } }
				>
					<img
						src={ imageUrl }
						alt={ imageAlt || awardTitle || '' }
						className="award-image"
						style={ {
							width: '100%',
							height: `${ imageHeight }px`,
							objectFit: imageObjectFit,
							objectPosition: imageObjectPosition,
							display: 'block',
						} }
					/>
				</div>
			) }

			<div
				className="award-content"
				style={ { padding: `${ contentPadding }px` } }
			>
				{ awardYear && (
					<span className="award-year">
						<RichText.Content value={ awardYear } />
					</span>
				) }
				{ awardTitle && (
					<h4 className="award-title">
						<RichText.Content value={ awardTitle } />
					</h4>
				) }
				{ awardDescription && (
					<p className="award-description">
						<RichText.Content value={ awardDescription } />
					</p>
				) }
			</div>
		</div>
	);
}
