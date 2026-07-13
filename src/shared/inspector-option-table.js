import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export default function InspectorOptionTable( {
	items,
	onUpdate,
	onRemove,
	onAdd,
	addLabel,
	slugHint,
} ) {
	return (
		<div className="mk-filter-option-table">
			<div className="mk-filter-option-table__head">
				<span>{ __( 'Name', 'twork-builder' ) }</span>
				<span>{ __( 'Slug', 'twork-builder' ) }</span>
				<span aria-hidden="true" />
			</div>
			{ items.map( ( item, index ) => (
				<div
					className="mk-filter-option-table__row"
					key={ `option-${ index }-${ item.value }` }
				>
					<input
						type="text"
						className="mk-filter-option-table__input"
						value={ item.label }
						onChange={ ( event ) =>
							onUpdate( index, 'label', event.target.value )
						}
						placeholder={ __( 'Display name', 'twork-builder' ) }
						aria-label={ __( 'Display name', 'twork-builder' ) }
					/>
					<input
						type="text"
						className="mk-filter-option-table__input"
						value={ item.value }
						onChange={ ( event ) =>
							onUpdate( index, 'value', event.target.value )
						}
						placeholder={ __( 'Slug', 'twork-builder' ) }
						aria-label={ __( 'Filter slug', 'twork-builder' ) }
					/>
					<Button
						className="mk-filter-option-table__delete"
						label={ __( 'Delete', 'twork-builder' ) }
						isDestructive
						isSmall
						onClick={ () => onRemove( index ) }
					>
						×
					</Button>
				</div>
			) ) }
			<div className="mk-filter-option-table__footer">
				<Button variant="secondary" isSmall onClick={ onAdd }>
					{ addLabel }
				</Button>
				<p className="mk-filter-option-table__hint">{ slugHint }</p>
			</div>
		</div>
	);
}
