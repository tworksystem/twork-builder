import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		icon,
		iconColor,
		iconSize,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		cardPadding,
		cardPaddingMobile,
		cardGap,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'svc-card stagger-card',
		style: {
			display: 'flex',
			alignItems: 'flex-start',
			gap: `${ cardGap }px`,
			padding: `${ cardPadding }px`,
			'--card-padding-mobile': `${ cardPaddingMobile }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			{ icon && (
				<div className="svc-icon" style={ { flexShrink: 0 } }>
					<i
						className={ icon }
						aria-hidden="true"
						style={ {
							fontSize: `${ iconSize }rem`,
							color: iconColor,
						} }
					/>
				</div>
			) }
			<div className="svc-info" style={ { flex: 1, minWidth: 0 } }>
				{ title && (
					<RichText.Content
						tagName="h4"
						value={ title }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: titleColor,
							margin: '0 0 5px 0',
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
		</div>
	);
}
