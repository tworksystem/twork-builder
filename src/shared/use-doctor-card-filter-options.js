import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	normalizeDepartments,
	normalizeGenders,
} from '@twork-builder/shared/doctor-filter-data';
import { resolveDoctorFilterListsFromEditor } from '@twork-builder/shared/doctor-filter-sync';

export function useDoctorCardFilterOptions( clientId, context = {} ) {
	return useSelect(
		( selectStore ) => {
			const resolved = resolveDoctorFilterListsFromEditor(
				clientId,
				context,
				selectStore( blockEditorStore )
			);

			return {
				departments: normalizeDepartments( resolved.departments ),
				genders: normalizeGenders( resolved.genders ),
			};
		},
		[ clientId, context[ 'twork/departments' ], context[ 'twork/genders' ] ]
	);
}
