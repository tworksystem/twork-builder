import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { items } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'breadcrumb',
		'data-block': 'twork/breadcrumb-nav',
		'data-version': '1',
	} );
	const list = items || [];
	return (
		<nav { ...blockProps } aria-label="Breadcrumb">
			<div className="breadcrumb__inner l-section">
				<ol
					className="breadcrumb__list"
					itemScope
					itemType="https://schema.org/BreadcrumbList"
				>
					{ list.map( ( item, i ) => (
						<li
							key={ item.id }
							className="breadcrumb__item"
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
							data-item-id={ item.id }
						>
							{ i < list.length - 1 ? (
								<a href={ item.href || '#' } itemProp="item">
									<span itemProp="name">{ item.label }</span>
								</a>
							) : (
								<span
									className="breadcrumb__current"
									itemProp="name"
									aria-current="page"
								>
									{ item.label }
								</span>
							) }
							<meta
								itemProp="position"
								content={ String( i + 1 ) }
							/>
							{ i < list.length - 1 && (
								<span
									className="breadcrumb__sep"
									aria-hidden="true"
								>
									{ ' ' }
									/{ ' ' }
								</span>
							) }
						</li>
					) ) }
				</ol>
			</div>
		</nav>
	);
}
