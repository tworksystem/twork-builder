import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import InspectorOptionTable from '@twork-builder/shared/inspector-option-table';

export default function FilterListsInspectorPanel( {
	departments,
	genders,
	updateDepartment,
	removeDepartment,
	addDepartment,
	updateGender,
	removeGender,
	addGender,
	introText,
} ) {
	return (
		<PanelBody
			title={ __( 'Filter Dropdown Lists', 'twork-builder' ) }
			initialOpen={ true }
		>
			<p className="mk-filter-option-table__intro">
				{ introText ||
					__(
						'Shared with Doctor Search Filter and Doctor Card department/gender fields.',
						'twork-builder'
					) }
			</p>

			<h4 className="mk-filter-option-table__section-title">
				{ __( 'Departments', 'twork-builder' ) }
			</h4>
			<InspectorOptionTable
				items={ departments }
				onUpdate={ updateDepartment }
				onRemove={ removeDepartment }
				onAdd={ addDepartment }
				addLabel={ __( '+ Add', 'twork-builder' ) }
				slugHint={ __(
					'Slug must match doctor card data-dept.',
					'twork-builder'
				) }
			/>

			<h4 className="mk-filter-option-table__section-title">
				{ __( 'Genders', 'twork-builder' ) }
			</h4>
			<InspectorOptionTable
				items={ genders }
				onUpdate={ updateGender }
				onRemove={ removeGender }
				onAdd={ addGender }
				addLabel={ __( '+ Add', 'twork-builder' ) }
				slugHint={ __(
					'Slug must match doctor card data-gender.',
					'twork-builder'
				) }
			/>
		</PanelBody>
	);
}
