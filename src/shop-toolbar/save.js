import { useBlockProps } from '@wordpress/block-editor';
export default function save( { attributes } ) {
	const { resultsText, defaultSort, defaultPerPage, defaultLayout } =
		attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'shop-toolbar',
				'data-block': 'twork/shop-toolbar',
				'data-version': '1',
				'data-default-sort': defaultSort,
				'data-default-per-page': defaultPerPage,
				'data-default-layout': defaultLayout,
			} ) }
		>
			<p className="shop-toolbar__results" data-field="results">
				{ resultsText }
			</p>
			<div className="shop-toolbar__controls" data-list="controls">
				<label>
					<span>Sort</span>
					<select
						data-action="toolbar-sort"
						defaultValue={ defaultSort }
					>
						<option value="default">Default</option>
						<option value="price-asc">Price: Low to High</option>
						<option value="price-desc">Price: High to Low</option>
						<option value="latest">Latest</option>
					</select>
				</label>
				<label>
					<span>Show</span>
					<select
						data-action="toolbar-per-page"
						defaultValue={ String( defaultPerPage ) }
					>
						<option value="12">12</option>
						<option value="24">24</option>
						<option value="48">48</option>
					</select>
				</label>
				<div
					className="shop-toolbar__layout"
					role="group"
					aria-label="Layout"
				>
					<button
						type="button"
						data-action="toolbar-layout"
						data-layout="grid-4"
						aria-pressed="true"
					>
						Grid
					</button>
					<button
						type="button"
						data-action="toolbar-layout"
						data-layout="list"
						aria-pressed="false"
					>
						List
					</button>
				</div>
			</div>
		</div>
	);
}
