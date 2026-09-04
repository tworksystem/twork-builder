import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

function itemIconClass( listStyle ) {
	return listStyle === 'xmark' ? 'fas fa-xmark' : 'fas fa-check';
}

export default function save( { attributes } ) {
	const { showGroup, showTitle, groupTitle, showIcon, variant, items } =
		attributes;

	if ( showGroup === false ) {
		return null;
	}

	const warnClass = variant === 'warn' ? 'prep--warn' : '';
	const blockProps = useBlockProps.save( {
		className: `prep mk-endo-prep-group ${ warnClass }`,
	} );

	const visibleItems = ( Array.isArray( items ) ? items : [] ).filter(
		( item ) => item.showItem !== false && item.text
	);

	return (
		<div { ...blockProps }>
			{ showTitle !== false && groupTitle && (
				<h4>
					{ showIcon !== false &&
						hasIconValue( mapIconAttrs( attributes ) ) && (
							<EndoFlexibleIcon attributes={ attributes } />
						) }
					<RichText.Content tagName="span" value={ groupTitle } />
				</h4>
			) }
			{ visibleItems.length > 0 && (
				<ul>
					{ visibleItems.map( ( item, index ) => (
						<li key={ `prep-li-${ index }` }>
							<i
								className={ itemIconClass( item.listStyle ) }
								aria-hidden="true"
							/>
							<span>{ item.text }</span>
						</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
