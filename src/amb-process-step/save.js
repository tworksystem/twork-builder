import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		description,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		stepPadding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'amb-step twork-amb-process-step',
	} );

	return (
		<div { ...blockProps } style={ { padding: `${ stepPadding }px` } }>
			{ title && (
				<RichText.Content
					tagName="h4"
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
