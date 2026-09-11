import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		icon,
		title,
		description,
		wide,
		meta1Value,
		meta1Label,
		meta2Value,
		meta2Label,
		meta3Value,
		meta3Label,
		conditions,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: wide ? 'lp-proc lp-proc--wide' : 'lp-proc',
		'data-conditions': conditions || '',
	} );

	const facts = [
		[ meta1Value, meta1Label ],
		[ meta2Value, meta2Label ],
		[ meta3Value, meta3Label ],
	].filter( ( fact ) => fact[ 0 ] );

	return (
		<article { ...blockProps }>
			{ icon && (
				<span className="lp-proc-icon">
					<i className={ icon } aria-hidden="true" />
				</span>
			) }
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content tagName="p" value={ description } />
			{ facts.length > 0 && (
				<div className="lp-proc-meta">
					{ facts.map( ( fact ) => (
						<div key={ fact[ 0 ] }>
							<b>{ fact[ 0 ] }</b>
							{ fact[ 1 ] }
						</div>
					) ) }
				</div>
			) }
		</article>
	);
}
