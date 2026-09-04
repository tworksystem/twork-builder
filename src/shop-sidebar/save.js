import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { categoriesTitle, recommendTitle, categories } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'shop-sidebar',
		'data-block': 'twork/shop-sidebar',
		'data-version': '1',
	} );

	return (
		<aside { ...blockProps }>
			<div className="shop-sidebar__widget">
				<h3 className="shop-sidebar__widget-title">
					{ categoriesTitle }
				</h3>
				<ul className="shop-sidebar__cats" data-list="categories">
					{ ( categories || [] ).map( ( cat ) => (
						<li
							key={ cat.id }
							className="shop-sidebar__cat-item"
							data-item-id={ cat.id }
							data-accordion-item
						>
							<button
								type="button"
								className="shop-sidebar__cat-trigger"
								data-action="accordion-toggle"
								aria-expanded="false"
							>
								<span>{ cat.label }</span>
								<span
									className="shop-sidebar__cat-chevron"
									aria-hidden="true"
								/>
							</button>
							{ cat.children?.length > 0 && (
								<div
									className="shop-sidebar__panel"
									data-accordion-panel
									hidden
								>
									{ cat.children.map( ( child ) => (
										<a
											key={ child.id }
											className="shop-sidebar__child-link"
											href={ child.href || '#' }
											data-item-id={ child.id }
										>
											{ child.label }
										</a>
									) ) }
								</div>
							) }
						</li>
					) ) }
				</ul>
			</div>
			{ recommendTitle && (
				<div className="shop-sidebar__widget">
					<h3 className="shop-sidebar__widget-title">
						{ recommendTitle }
					</h3>
				</div>
			) }
		</aside>
	);
}
