import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		price,
		priceUnit,
		features = [],
		buttonText,
		buttonUrl,
		buttonStyle,
		headBackground,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hc-pkg-card stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="hc-pkg-head"
				style={
					headBackground ? { background: headBackground } : undefined
				}
			>
				{ title && <RichText.Content tagName="h4" value={ title } /> }
				<div className="hc-price">
					{ price } <span>{ priceUnit }</span>
				</div>
			</div>
			<div className="hc-pkg-body">
				<ul className="hc-pkg-list">
					{ features.map( ( feature, index ) => (
						<li key={ index }>{ feature }</li>
					) ) }
				</ul>
				{ buttonText && (
					<a
						href={ buttonUrl || '#' }
						className={ `hc-btn ${
							buttonStyle === 'primary'
								? 'hc-btn-primary'
								: 'hc-btn-outline'
						}` }
						style={ { width: '100%', marginTop: 'auto' } }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</div>
	);
}
