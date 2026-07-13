export const DEFAULT_DEPARTMENTS = [
	{ value: 'heart', label: 'Heart Centre' },
	{ value: 'neuro', label: 'Neuro Centre' },
	{ value: 'cancer', label: 'Cancer Centre' },
	{ value: 'peds', label: 'Paediatrics' },
	{ value: 'general', label: 'General Medicine' },
	{ value: 'ent', label: 'ENT' },
	{ value: 'dental', label: 'Dental' },
];

export const DEFAULT_GENDERS = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

export function normalizeDepartments( list ) {
	return Array.isArray( list ) && list.length ? list : DEFAULT_DEPARTMENTS;
}

export function normalizeGenders( list ) {
	return Array.isArray( list ) && list.length ? list : DEFAULT_GENDERS;
}

export function cloneFilterList( list ) {
	return list.map( ( item ) => ( { ...item } ) );
}

export function listsAreEqual( a, b ) {
	const left = normalizeDepartments( a );
	const right = normalizeDepartments( b );
	if ( left.length !== right.length ) {
		return false;
	}
	return left.every(
		( item, index ) =>
			item.value === right[ index ].value &&
			item.label === right[ index ].label
	);
}

export function gendersAreEqual( a, b ) {
	const left = normalizeGenders( a );
	const right = normalizeGenders( b );
	if ( left.length !== right.length ) {
		return false;
	}
	return left.every(
		( item, index ) =>
			item.value === right[ index ].value &&
			item.label === right[ index ].label
	);
}

export function getDepartmentLabelFromList( slug, list ) {
	const found = normalizeDepartments( list ).find(
		( item ) => item.value === slug
	);
	return found ? found.label : slug;
}

export function toSelectOptions( list ) {
	return list.map( ( item ) => ( {
		label: item.label,
		value: item.value,
	} ) );
}
