/**
 * Editor-only active prep tab key, keyed by section clientId.
 * Avoids serializing preview state into post content.
 */

import { useEffect, useState } from '@wordpress/element';

const activeBySection = new Map();
const listeners = new Set();

function emit() {
	listeners.forEach( ( listener ) => listener() );
}

/**
 * @param {string} sectionClientId Section block clientId.
 * @param {string} panelKey        Active panel key.
 */
export function setEndoPrepActivePanel( sectionClientId, panelKey ) {
	if ( ! sectionClientId ) {
		return;
	}
	activeBySection.set( sectionClientId, panelKey || '' );
	emit();
}

/**
 * @param {string} sectionClientId Section block clientId.
 * @return {string} Active panel key or empty string.
 */
export function getEndoPrepActivePanel( sectionClientId ) {
	if ( ! sectionClientId ) {
		return '';
	}
	return activeBySection.get( sectionClientId ) || '';
}

/**
 * @param {Function} listener Callback on change.
 * @return {Function} Unsubscribe.
 */
export function subscribeEndoPrepActive( listener ) {
	listeners.add( listener );
	return () => {
		listeners.delete( listener );
	};
}

/**
 * @param {string} sectionClientId Section block clientId.
 * @return {string} Active panel key.
 */
export function useEndoPrepActivePanel( sectionClientId ) {
	const [ panelKey, setPanelKey ] = useState( () =>
		getEndoPrepActivePanel( sectionClientId )
	);

	useEffect( () => {
		setPanelKey( getEndoPrepActivePanel( sectionClientId ) );
		return subscribeEndoPrepActive( () => {
			setPanelKey( getEndoPrepActivePanel( sectionClientId ) );
		} );
	}, [ sectionClientId ] );

	return panelKey;
}
