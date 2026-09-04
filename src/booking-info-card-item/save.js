import { useBlockProps, RichText } from '@wordpress/block-editor';
import { normalizeFaClass } from '../booking-layout-section/data-helpers';

export default function save( { attributes } ) {
	const { title, iconClass, itemIconClass, listItems = [] } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'info-card',
	} );

	const headerIcon = normalizeFaClass(
		iconClass || 'fas fa-clipboard-check'
	);
	const defaultItemIcon = normalizeFaClass( itemIconClass || 'fas fa-check' );

	return (
		<div { ...blockProps }>
			<h4>
				<i className={ headerIcon } aria-hidden="true" />{ ' ' }
				<RichText.Content tagName="span" value={ title } />
			</h4>
			<ul className="info-list">
				{ listItems.map( ( item ) => (
					<li key={ item.id }>
						<i
							className={ normalizeFaClass(
								item.iconClass || defaultItemIcon
							) }
							aria-hidden="true"
						/>
						<RichText.Content tagName="span" value={ item.text } />
					</li>
				) ) }
			</ul>
		</div>
	);
}
