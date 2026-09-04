import { useCallback, useEffect, useRef } from '@wordpress/element';
import { select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	DEFAULT_DEPARTMENTS,
	DEFAULT_GENDERS,
	cloneFilterList,
	normalizeDepartments,
	normalizeGenders,
} from '@twork-builder/shared/doctor-filter-data';
import {
	DIRECTORY_BLOCK,
	FILTER_BLOCK,
	hasExplicitList,
	syncDoctorFilterLists,
} from '@twork-builder/shared/doctor-filter-sync';

function getSiblingBlock( clientId, blockName ) {
	const blockEditorSelect = select( blockEditorStore );
	if ( ! blockEditorSelect ) {
		return null;
	}

	const siblingName =
		blockName === FILTER_BLOCK ? DIRECTORY_BLOCK : FILTER_BLOCK;
	const blocks = blockEditorSelect.getBlocks();
	const stack = [ ...blocks ];

	while ( stack.length ) {
		const block = stack.shift();
		if ( block.name === siblingName && block.clientId !== clientId ) {
			return block;
		}
		stack.push( ...( block.innerBlocks || [] ) );
	}

	return null;
}

export function useDoctorFilterLists( {
	attributes,
	setAttributes,
	clientId,
	blockName,
} ) {
	const departments = normalizeDepartments( attributes.departments );
	const genders = normalizeGenders( attributes.genders );
	const didMountSync = useRef( false );

	const runSync = useCallback(
		( nextDepartments, nextGenders ) => {
			window.requestAnimationFrame( () => {
				syncDoctorFilterLists( {
					sourceClientId: clientId,
					departments: nextDepartments,
					genders: nextGenders,
				} );
			} );
		},
		[ clientId ]
	);

	const applyLists = useCallback(
		( patch ) => {
			const nextDepartments = normalizeDepartments(
				patch.departments ?? departments
			);
			const nextGenders = normalizeGenders( patch.genders ?? genders );

			setAttributes( {
				...patch,
				departments: cloneFilterList( nextDepartments ),
				genders: cloneFilterList( nextGenders ),
			} );

			runSync( nextDepartments, nextGenders );
		},
		[ departments, genders, runSync, setAttributes ]
	);

	useEffect( () => {
		if ( didMountSync.current || ! clientId ) {
			return;
		}
		didMountSync.current = true;

		const sibling = getSiblingBlock( clientId, blockName );
		const patches = {};

		if ( ! hasExplicitList( attributes.departments ) ) {
			patches.departments = hasExplicitList(
				sibling?.attributes?.departments
			)
				? cloneFilterList( sibling.attributes.departments )
				: cloneFilterList( DEFAULT_DEPARTMENTS );
		}

		if ( ! hasExplicitList( attributes.genders ) ) {
			patches.genders = hasExplicitList( sibling?.attributes?.genders )
				? cloneFilterList( sibling.attributes.genders )
				: cloneFilterList( DEFAULT_GENDERS );
		}

		const nextDepartments = normalizeDepartments(
			patches.departments ?? attributes.departments
		);
		const nextGenders = normalizeGenders(
			patches.genders ?? attributes.genders
		);

		if ( Object.keys( patches ).length ) {
			setAttributes( patches );
		}

		runSync( nextDepartments, nextGenders );
	}, [
		attributes.departments,
		attributes.genders,
		blockName,
		clientId,
		runSync,
		setAttributes,
	] );

	const updateDepartment = ( index, field, value ) => {
		const next = [ ...departments ];
		next[ index ] = { ...next[ index ], [ field ]: value };
		applyLists( { departments: next } );
	};

	const removeDepartment = ( index ) => {
		applyLists( {
			departments: departments.filter( ( _, i ) => i !== index ),
		} );
	};

	const addDepartment = () => {
		applyLists( {
			departments: [
				...departments,
				{
					value: `dept-${ Date.now() }`,
					label: __( 'New Department', 'twork-builder' ),
				},
			],
		} );
	};

	const updateGender = ( index, field, value ) => {
		const next = [ ...genders ];
		next[ index ] = { ...next[ index ], [ field ]: value };
		applyLists( { genders: next } );
	};

	const removeGender = ( index ) => {
		applyLists( {
			genders: genders.filter( ( _, i ) => i !== index ),
		} );
	};

	const addGender = () => {
		applyLists( {
			genders: [
				...genders,
				{
					value: `gender-${ Date.now() }`,
					label: __( 'New Gender', 'twork-builder' ),
				},
			],
		} );
	};

	return {
		departments,
		genders,
		updateDepartment,
		removeDepartment,
		addDepartment,
		updateGender,
		removeGender,
		addGender,
	};
}
