/**
 * Shared editor performance helpers for Twork blocks.
 *
 * Patterns for hundreds of blocks on one canvas:
 * - useStableBlockProps: avoid new object identity to useBlockProps every render.
 * - useBatchSetAttributes / useDebouncedAttribute: fewer store writes.
 * - useAttributeSetter: stable onChange for Inspector controls.
 * - memo: wrap pure child components that receive stable props.
 *
 * Import: import { ... } from '@twork-builder/editor-utils';
 */

import {
	useMemo,
	useCallback,
	useRef,
	useEffect,
	memo,
} from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

export { memo };

/**
 * @template T
 * @param {() => T} factory
 * @param {import('react').DependencyList} deps
 * @returns {T}
 */
export function useStableJson( factory, deps ) {
	return useMemo( factory, deps );
}

/**
 * Merges block wrapper props in one memoized object, then passes to useBlockProps.
 * Fixes the anti-pattern: useBlockProps({ className, style: useMemo(...) }) where the
 * outer object is still new every render.
 *
 * @param {() => Record<string, unknown>} propsFactory
 * @param {import('react').DependencyList} deps
 */
export function useStableBlockProps( propsFactory, deps ) {
	const props = useMemo( propsFactory, deps );
	return useBlockProps( props );
}

/**
 * Stable onChange for a single attribute key (Inspector TextControl, Toggle, etc.).
 *
 * @param {import('@wordpress/blocks').BlockEditProps<Record<string, unknown>>['setAttributes']} setAttributes
 * @param {string} key
 */
export function useAttributeSetter( setAttributes, key ) {
	return useCallback(
		( value ) => {
			setAttributes( { [ key ]: value } );
		},
		[ setAttributes, key ]
	);
}

/**
 * Returns a stable callback that calls setAttributes once with a partial patch.
 * @param {import('@wordpress/blocks').BlockEditProps<Record<string, unknown>>['setAttributes']} setAttributes
 */
export function useBatchSetAttributes( setAttributes ) {
	return useCallback(
		( patch ) => {
			if ( patch && typeof patch === 'object' ) {
				setAttributes( patch );
			}
		},
		[ setAttributes ]
	);
}

/**
 * Debounced attribute writer for search/query fields that trigger server work (e.g. ServerSideRender).
 * @param {import('@wordpress/blocks').BlockEditProps<Record<string, unknown>>['setAttributes']} setAttributes
 * @param {string} attributeKey
 * @param {number} [delayMs=300]
 */
export function useDebouncedAttribute(
	setAttributes,
	attributeKey,
	delayMs = 300
) {
	const timeoutRef = useRef( null );
	const latestRef = useRef( '' );

	useEffect(
		() => () => {
			if ( timeoutRef.current ) {
				clearTimeout( timeoutRef.current );
			}
		},
		[]
	);

	return useCallback(
		( value ) => {
			latestRef.current = value;
			if ( timeoutRef.current ) {
				clearTimeout( timeoutRef.current );
			}
			timeoutRef.current = setTimeout( () => {
				timeoutRef.current = null;
				setAttributes( { [ attributeKey ]: latestRef.current } );
			}, delayMs );
		},
		[ setAttributes, attributeKey, delayMs ]
	);
}
