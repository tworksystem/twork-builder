import { useStableBlockProps } from '@twork-builder/editor-utils';

export default function Edit( { attributes } ) {
	const { categoriesTitle, categories } = attributes;
	const blockProps = useStableBlockProps( { className: 'shop-sidebar' } );
	return (
		<aside { ...blockProps } data-block="twork/shop-sidebar">
			<h3>{ categoriesTitle }</h3>
			<ul>
				{ ( categories || [] ).map( ( cat ) => (
					<li key={ cat.id }>{ cat.label }</li>
				) ) }
			</ul>
		</aside>
	);
}
