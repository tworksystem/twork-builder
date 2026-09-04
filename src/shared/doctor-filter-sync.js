import { dispatch, select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	cloneFilterList,
	gendersAreEqual,
	listsAreEqual,
	normalizeDepartments,
	normalizeGenders,
} from '@twork-builder/shared/doctor-filter-data';

export const FILTER_BLOCK = 'twork/doctor-search-filter-section';
export const DIRECTORY_BLOCK = 'twork/doctor-directory-section';

export function findAllBlocksRecursive( blocks, blockName, found = [] ) {
	for ( const block of blocks ) {
		if ( block.name === blockName ) {
			found.push( block );
		}
		findAllBlocksRecursive( block.innerBlocks || [], blockName, found );
	}
	return found;
}

export function findBlockRecursive( blocks, blockName ) {
	const all = findAllBlocksRecursive( blocks, blockName );
	return all[ 0 ] || null;
}

export function hasExplicitList( list ) {
	return Array.isArray( list ) && list.length > 0;
}

export function syncDoctorFilterLists( {
	sourceClientId,
	departments,
	genders,
} ) {
	const blockEditorSelect = select( blockEditorStore );
	const blockEditorDispatch = dispatch( blockEditorStore );

	if ( ! blockEditorSelect || ! blockEditorDispatch?.updateBlockAttributes ) {
		return;
	}

	const nextDepartments = cloneFilterList(
		normalizeDepartments( departments )
	);
	const nextGenders = cloneFilterList( normalizeGenders( genders ) );
	const blocks = blockEditorSelect.getBlocks();

	[ FILTER_BLOCK, DIRECTORY_BLOCK ].forEach( ( blockName ) => {
		const targets = findAllBlocksRecursive( blocks, blockName );

		targets.forEach( ( target ) => {
			if ( ! target || target.clientId === sourceClientId ) {
				return;
			}

			const patch = {};
			if (
				! listsAreEqual(
					target.attributes.departments,
					nextDepartments
				)
			) {
				patch.departments = cloneFilterList( nextDepartments );
			}
			if ( ! gendersAreEqual( target.attributes.genders, nextGenders ) ) {
				patch.genders = cloneFilterList( nextGenders );
			}

			if ( Object.keys( patch ).length ) {
				blockEditorDispatch.updateBlockAttributes(
					target.clientId,
					patch
				);
			}
		} );
	} );
}

export function resolveDoctorFilterListsFromEditor(
	clientId,
	context = {},
	blockEditorSelect = null
) {
	const blockEditor = blockEditorSelect || select( blockEditorStore );
	if ( ! blockEditor ) {
		return {
			departments: undefined,
			genders: undefined,
		};
	}

	if ( clientId ) {
		const parents = blockEditor.getBlockParents( clientId, true );
		for ( let i = parents.length - 1; i >= 0; i-- ) {
			const parent = blockEditor.getBlock( parents[ i ] );
			if ( parent?.name === DIRECTORY_BLOCK ) {
				if (
					hasExplicitList( parent.attributes?.departments ) ||
					hasExplicitList( parent.attributes?.genders )
				) {
					return {
						departments: parent.attributes.departments,
						genders: parent.attributes.genders,
					};
				}
			}
		}
	}

	if (
		hasExplicitList( context[ 'twork/departments' ] ) ||
		hasExplicitList( context[ 'twork/genders' ] )
	) {
		return {
			departments: context[ 'twork/departments' ],
			genders: context[ 'twork/genders' ],
		};
	}

	const blocks = blockEditor.getBlocks();
	for ( const blockName of [ DIRECTORY_BLOCK, FILTER_BLOCK ] ) {
		const match = findBlockRecursive( blocks, blockName );
		if (
			match &&
			( hasExplicitList( match.attributes?.departments ) ||
				hasExplicitList( match.attributes?.genders ) )
		) {
			return {
				departments: match.attributes.departments,
				genders: match.attributes.genders,
			};
		}
	}

	return {
		departments: undefined,
		genders: undefined,
	};
}
