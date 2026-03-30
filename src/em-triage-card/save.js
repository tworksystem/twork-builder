import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, cardTitle, listItems } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'em-triage-card',
	} );

	const raw = ( iconClass || 'fas fa-heartbeat' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	const items = Array.isArray( listItems ) ? listItems : [];

	return (
		<div { ...blockProps }>
			<div className="em-triage-head">
				<div className="em-triage-icon">
					<i className={ iconClassResolved } aria-hidden="true" />
				</div>
				<RichText.Content tagName="h4" value={ cardTitle } />
			</div>
			{ items.length > 0 && (
				<ul className="em-triage-list">
					{ items.map( ( item ) => (
						<li key={ item.id }>{ item.text }</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
