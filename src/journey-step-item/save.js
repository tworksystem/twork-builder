import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		stepNumber,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		stepNumberBgColor,
		stepNumberTextColor,
		stepNumberSize,
		cardPadding,
		cardPaddingMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'step-card stagger-card',
		style: {
			padding: `${ cardPadding }px`,
			'--step-number-size': `${ stepNumberSize }px`,
			'--step-number-bg': stepNumberBgColor,
			'--step-number-color': stepNumberTextColor,
			'--card-padding-mobile': `${ cardPaddingMobile }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="step-num"
				style={ {
					width: `${ stepNumberSize }px`,
					height: `${ stepNumberSize }px`,
					background: stepNumberBgColor,
					color: stepNumberTextColor,
					borderRadius: '50%',
					fontSize: `${ Math.min( stepNumberSize * 0.3, 28 ) }px`,
					fontWeight: 700,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '0 auto 20px',
				} }
			>
				{ stepNumber }
			</div>

			{ title && (
				<RichText.Content
					tagName="h4"
					value={ title }
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
						margin: '0 0 10px',
					} }
				/>
			) }

			{ description && (
				<RichText.Content
					tagName="p"
					value={ description }
					style={ {
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						margin: 0,
					} }
				/>
			) }
		</div>
	);
}
