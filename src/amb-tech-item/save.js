import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		icon,
		title,
		description,
		iconColor,
		iconSize,
		iconMarginBottom,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		itemPadding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'amb-tech-item twork-amb-tech-item',
	} );

	return (
		<div { ...blockProps } style={ { padding: `${ itemPadding }px` } }>
			{ icon && (
				<i
					className={ `fas ${ icon } amb-tech-icon` }
					style={ {
						fontSize: `${ iconSize }rem`,
						color: iconColor,
						marginBottom: `${ iconMarginBottom }px`,
						display: 'block',
					} }
					aria-hidden="true"
				/>
			) }
			{ title && (
				<RichText.Content
					tagName="h3"
					value={ title }
					style={ {
						color: titleColor,
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						marginBottom: `${ titleMarginBottom }px`,
						marginTop: 0,
					} }
				/>
			) }
			{ description && (
				<RichText.Content
					tagName="p"
					value={ description }
					style={ {
						color: descriptionColor,
						fontSize: `${ descriptionFontSize }rem`,
						margin: 0,
					} }
				/>
			) }
		</div>
	);
}
