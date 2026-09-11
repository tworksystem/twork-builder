import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, value, suffix, countUp, label, sub } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( { className: 'lp-stat' } );
	const figure = String( value ) + ( suffix || '' );

	return (
		<div { ...blockProps }>
			<div
				className="lp-figure"
				data-count={ countUp ? String( value ) : undefined }
				data-suffix={ countUp ? suffix || '' : undefined }
			>
				{ figure }
			</div>
			<RichText.Content
				tagName="span"
				className="lp-stat-label"
				value={ label }
			/>
			{ sub && (
				<RichText.Content
					tagName="span"
					className="lp-stat-sub"
					value={ sub }
				/>
			) }
		</div>
	);
}
