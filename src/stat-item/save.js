import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_TYPOGRAPHY = {
	numberColor: '#f48b2a',
	numberFontSize: 2.5,
	numberFontWeight: 900,
	labelColor: '#212121',
	labelFontSize: 0.95,
	labelFontWeight: 700,
	labelTextTransform: 'uppercase',
};

export default function save( { attributes } ) {
	const {
		statNumber,
		statLabel,
		numberColor = DEFAULT_TYPOGRAPHY.numberColor,
		numberFontSize = DEFAULT_TYPOGRAPHY.numberFontSize,
		numberFontWeight = DEFAULT_TYPOGRAPHY.numberFontWeight,
		labelColor = DEFAULT_TYPOGRAPHY.labelColor,
		labelFontSize = DEFAULT_TYPOGRAPHY.labelFontSize,
		labelFontWeight = DEFAULT_TYPOGRAPHY.labelFontWeight,
		labelTextTransform = DEFAULT_TYPOGRAPHY.labelTextTransform,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'stat-item',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h3"
				value={ statNumber }
				style={ {
					fontSize: `${ numberFontSize }rem`,
					fontWeight: numberFontWeight,
					color: numberColor,
					margin: 0,
					lineHeight: 1.2,
				} }
			/>
			<RichText.Content
				tagName="p"
				value={ statLabel }
				style={ {
					fontSize: `${ labelFontSize }rem`,
					fontWeight: labelFontWeight,
					color: labelColor,
					textTransform: labelTextTransform,
					margin: '5px 0 0 0',
					lineHeight: 1.3,
				} }
			/>
		</div>
	);
}
