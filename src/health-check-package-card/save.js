import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		category,
		title,
		price,
		currency,
		listItems,
		buttonText,
		buttonUrl,
		isPopular,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `chk-pkg-card stagger-up ${ isPopular ? 'popular' : '' }`,
		'data-category': category || 'basic',
	} );

	const items = Array.isArray( listItems ) ? listItems : [];

	return (
		<div { ...blockProps }>
			{ title && <RichText.Content tagName="h3" value={ title } /> }
			<div className="chk-price">
				{ price || '0' } <span>{ currency || 'MMK' }</span>
			</div>
			{ items.length > 0 && (
				<ul className="chk-list">
					{ items.map( ( item, index ) => (
						<li key={ index }>
							<i className="fas fa-check" aria-hidden="true" />
							{ item }
						</li>
					) ) }
				</ul>
			) }
			{ buttonText && (
				<a
					href={ buttonUrl || '#' }
					className={
						isPopular ? 'chk-btn' : 'chk-btn chk-btn-outline'
					}
				>
					{ buttonText }
				</a>
			) }
		</div>
	);
}
