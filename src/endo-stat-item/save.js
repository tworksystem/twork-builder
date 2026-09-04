import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		showNumber,
		countValue,
		countSuffix,
		suffixHighlight,
		showLabel,
		statLabel,
		numberColor,
		highlightColor,
		labelColor,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'stat mk-endo-stat-item',
	} );

	const suffixAttr = suffixHighlight
		? `<em>${ suffixHighlight }</em>`
		: countSuffix || '';

	const displayNumber =
		typeof countValue === 'number'
			? countValue.toLocaleString()
			: String( countValue || '0' );

	return (
		<div { ...blockProps }>
			{ showNumber !== false && (
				<div
					className="num"
					data-count={ countValue }
					data-suffix={ suffixAttr }
					style={ numberColor ? { color: numberColor } : undefined }
				>
					{ displayNumber }
					{ suffixHighlight ? (
						<em
							style={
								highlightColor
									? { color: highlightColor }
									: undefined
							}
						>
							{ suffixHighlight }
						</em>
					) : (
						countSuffix || null
					) }
				</div>
			) }
			{ showLabel !== false && statLabel && (
				<RichText.Content
					tagName="span"
					className="lbl"
					value={ statLabel }
					style={ labelColor ? { color: labelColor } : undefined }
				/>
			) }
		</div>
	);
}
