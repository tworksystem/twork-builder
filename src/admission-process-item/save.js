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
		listItems,
		listItemColor,
		listItemFontSize,
		iconColor,
		stepNumberBgColor,
		stepNumberTextColor,
		stepNumberSize,
		cardPadding,
		cardPaddingMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'process-card fade-up',
		style: {
			padding: `${ cardPadding }px 30px`,
			'--step-number-size': `${ stepNumberSize }px`,
			'--step-number-bg': stepNumberBgColor,
			'--step-number-color': stepNumberTextColor,
			'--list-icon-color': iconColor,
			'--list-text-color': listItemColor,
			'--list-font-size': `${ listItemFontSize }rem`,
			'--card-padding-mobile': `${ cardPaddingMobile }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="step-number"
				style={ {
					width: `${ stepNumberSize }px`,
					height: `${ stepNumberSize }px`,
					background: stepNumberBgColor,
					color: stepNumberTextColor,
					borderRadius: '50%',
					fontSize: `${ Math.min( stepNumberSize * 0.4, 28 ) }px`,
					fontWeight: 900,
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
					tagName="h3"
					value={ title }
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
						margin: '0 0 15px',
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
						marginBottom: '20px',
					} }
				/>
			) }

			{ listItems && listItems.length > 0 && (
				<ul
					className="process-list"
					style={ {
						textAlign: 'left',
						padding: 0,
						margin: 0,
						listStyle: 'none',
					} }
				>
					{ listItems.map( ( item ) => (
						<li
							key={ item.id }
							style={ {
								marginBottom: '12px',
								display: 'flex',
								alignItems: 'flex-start',
								fontSize: `${ listItemFontSize }rem`,
								color: listItemColor,
							} }
						>
							<i
								className="fas fa-check-circle"
								style={ {
									color: iconColor,
									marginRight: '10px',
									marginTop: '4px',
									flexShrink: 0,
								} }
								aria-hidden="true"
							/>
							<span>{ item.text }</span>
						</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
