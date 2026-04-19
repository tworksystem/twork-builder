import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		image,
		imageAlt,
		name,
		showName,
		imageWidth,
		imageHeight,
		imageObjectFit,
		nameColor,
		nameFontSize,
		nameFontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-partners__item',
	} );

	return (
		<div { ...blockProps }>
			{ image && (
				<img
					src={ image }
					className="twork-partners__icon"
					alt={ imageAlt || '' }
					style={ {
						width: `${ imageWidth }px`,
						height: imageHeight > 0 ? `${ imageHeight }px` : 'auto',
						objectFit: imageObjectFit,
					} }
				/>
			) }
			{ showName && (
				<RichText.Content
					tagName="span"
					className="twork-partners__name"
					value={ name }
					style={ {
						color: nameColor,
						fontSize: `${ nameFontSize }rem`,
						fontWeight: nameFontWeight,
					} }
				/>
			) }
		</div>
	);
}
