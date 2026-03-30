import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, text } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hc-check-list-item',
	} );

	const raw = ( iconClass || 'fas fa-check-circle' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	return (
		<li { ...blockProps }>
			<i className={ iconClassResolved } aria-hidden="true" />
			<RichText.Content tagName="span" value={ text } />
		</li>
	);
}
