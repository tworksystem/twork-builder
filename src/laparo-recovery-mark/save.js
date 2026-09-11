import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, timeLabel, figure, detail, conditions } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-mark',
		'data-conditions': conditions || '',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="span"
				className="lp-mark-when"
				value={ timeLabel }
			/>
			<RichText.Content
				tagName="div"
				className="lp-figure"
				value={ figure }
			/>
			<RichText.Content tagName="p" value={ detail } />
		</div>
	);
}
