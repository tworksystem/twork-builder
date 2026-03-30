import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'rad-step stagger-up',
	} );

	const raw = ( iconClass || 'far fa-calendar-check' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	return (
		<div { ...blockProps }>
			<div className="rad-step-icon">
				<i className={ iconClassResolved } aria-hidden="true" />
			</div>
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content
				tagName="p"
				value={ description }
				style={ {
					fontSize: '0.9rem',
					color: '#666666',
				} }
			/>
		</div>
	);
}
