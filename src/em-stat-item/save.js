import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, statValue, statLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'em-stat-item',
	} );

	const raw = ( iconClass || 'fas fa-clock' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	return (
		<div { ...blockProps }>
			{ iconClassResolved && (
				<i className={ iconClassResolved } aria-hidden="true" />
			) }
			<RichText.Content tagName="h3" value={ statValue } />
			<RichText.Content tagName="p" value={ statLabel } />
		</div>
	);
}
