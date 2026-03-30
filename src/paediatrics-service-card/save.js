import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title, description, listItems } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'paed-service-card paed-stagger',
	} );

	const items = Array.isArray( listItems ) ? listItems : [];

	return (
		<div { ...blockProps }>
			<div className="paed-svc-icon">
				{ iconClass && (
					<i className={ iconClass } aria-hidden="true" />
				) }
			</div>
			{ title && <RichText.Content tagName="h3" value={ title } /> }
			{ description && (
				<RichText.Content tagName="p" value={ description } />
			) }
			{ items.length > 0 && (
				<ul className="paed-svc-list">
					{ items.map( ( item, index ) => (
						<li key={ index }>{ item }</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
