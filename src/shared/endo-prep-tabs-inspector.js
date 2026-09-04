/**
 * Section Inspector — Prep tabs CRUD via InnerBlocks ops.
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import {
	createPrepTabBlock,
	slugifyPanelKey,
	uniquePanelKey,
} from '@twork-builder/shared/endo-prep-tab-ops';
import { setEndoPrepActivePanel } from '@twork-builder/shared/endo-prep-ui';

/**
 * @param {Object}   props
 * @param {string}   props.sectionClientId Section block clientId.
 * @param {Array}    props.allTabs         All prep-tab children (incl. hidden).
 * @param {Function} props.onActivatePanel Parent sets local activePanelKey.
 * @return {JSX.Element} Inspector panel.
 */
export default function EndoPrepTabsInspector( {
	sectionClientId,
	allTabs,
	onActivatePanel,
} ) {
	const {
		insertBlock,
		updateBlockAttributes,
		moveBlockToPosition,
		removeBlock,
		selectBlock,
	} = useDispatch( 'core/block-editor' );
	const { createNotice } = useDispatch( 'core/notices' );

	const blockIndexById = useSelect(
		( select ) => {
			const { getBlockIndex } = select( 'core/block-editor' );
			const map = {};
			( allTabs || [] ).forEach( ( tab ) => {
				map[ tab.clientId ] = getBlockIndex(
					tab.clientId,
					sectionClientId
				);
			} );
			return map;
		},
		[ allTabs, sectionClientId ]
	);

	const takenKeys = ( allTabs || [] ).map( ( t ) => t.panelKey );

	function ensureSingleDefault( preferClientId, list = allTabs ) {
		const visible = ( list || [] ).filter( ( t ) => t.showTab !== false );
		if ( ! visible.length ) {
			return;
		}
		const preferred =
			visible.find( ( t ) => t.clientId === preferClientId ) ||
			visible.find( ( t ) => t.isDefaultActive ) ||
			visible[ 0 ];
		visible.forEach( ( t ) => {
			const next = t.clientId === preferred.clientId;
			if ( t.isDefaultActive !== next ) {
				updateBlockAttributes( t.clientId, {
					isDefaultActive: next,
				} );
			}
		} );
	}

	function openTab( tab ) {
		selectBlock( tab.clientId );
		onActivatePanel( tab.panelKey );
		setEndoPrepActivePanel( sectionClientId, tab.panelKey );
	}

	function addTab() {
		const n = ( allTabs || [] ).length + 1;
		const label = `Tab ${ n }`;
		const panelKey = uniquePanelKey( `tab-${ n }`, takenKeys );
		const block = createPrepTabBlock( {
			tabLabel: label,
			panelKey,
			isDefaultActive: false,
		} );
		const index = ( allTabs || [] ).length;
		insertBlock( block, index, sectionClientId );
		onActivatePanel( panelKey );
		setEndoPrepActivePanel( sectionClientId, panelKey );
		selectBlock( block.clientId );
	}

	function moveTab( tab, direction ) {
		const from = blockIndexById[ tab.clientId ];
		if ( typeof from !== 'number' || from < 0 ) {
			return;
		}
		const to = from + direction;
		if ( to < 0 || to >= ( allTabs || [] ).length ) {
			return;
		}
		moveBlockToPosition(
			tab.clientId,
			sectionClientId,
			sectionClientId,
			to
		);
	}

	function deleteTab( tab ) {
		if ( ( allTabs || [] ).length <= 1 ) {
			createNotice(
				'warning',
				__( 'At least one prep tab is required.', 'twork-builder' ),
				{ type: 'snackbar', isDismissible: true }
			);
			return;
		}
		const confirmed =
			// eslint-disable-next-line no-alert -- destructive confirm per spec
			window.confirm(
				__(
					'Delete this prep tab and its checklists?',
					'twork-builder'
				)
			);
		if ( ! confirmed ) {
			return;
		}
		const remaining = ( allTabs || [] ).filter(
			( t ) => t.clientId !== tab.clientId
		);
		removeBlock( tab.clientId, false );
		const next = remaining[ 0 ];
		if ( next ) {
			ensureSingleDefault( next.clientId, remaining );
			onActivatePanel( next.panelKey );
			setEndoPrepActivePanel( sectionClientId, next.panelKey );
		}
	}

	function setDefault( tab, value ) {
		if ( value ) {
			( allTabs || [] ).forEach( ( t ) => {
				updateBlockAttributes( t.clientId, {
					isDefaultActive: t.clientId === tab.clientId,
				} );
			} );
			onActivatePanel( tab.panelKey );
			setEndoPrepActivePanel( sectionClientId, tab.panelKey );
		} else {
			updateBlockAttributes( tab.clientId, {
				isDefaultActive: false,
			} );
			const without = ( allTabs || [] ).map( ( t ) =>
				t.clientId === tab.clientId
					? { ...t, isDefaultActive: false }
					: t
			);
			ensureSingleDefault( null, without );
		}
	}

	function commitPanelKey( tab, raw ) {
		const next = uniquePanelKey(
			slugifyPanelKey( raw ),
			takenKeys,
			tab.panelKey
		);
		if ( next === tab.panelKey ) {
			return;
		}
		updateBlockAttributes( tab.clientId, { panelKey: next } );
		onActivatePanel( next );
		setEndoPrepActivePanel( sectionClientId, next );
	}

	return (
		<PanelBody title={ __( 'Tabs', 'twork-builder' ) } initialOpen={ true }>
			<p style={ { marginTop: 0, color: '#666', fontSize: 12 } }>
				{ __(
					'Add, rename, reorder, or delete preparation tabs.',
					'twork-builder'
				) }
			</p>
			{ ( allTabs || [] ).map( ( tab, index ) => (
				<div
					key={ tab.clientId }
					style={ {
						marginBottom: 12,
						padding: 10,
						border: '1px solid #ddd',
						borderRadius: 6,
					} }
				>
					<strong>
						{ index + 1 }. { tab.tabLabel || tab.panelKey }
					</strong>
					<TextControl
						label={ __( 'Tab Label', 'twork-builder' ) }
						value={ tab.tabLabel || '' }
						onChange={ ( value ) =>
							updateBlockAttributes( tab.clientId, {
								tabLabel: value,
							} )
						}
					/>
					<TextControl
						label={ __( 'Panel Key', 'twork-builder' ) }
						value={ tab.panelKey || '' }
						onChange={ ( value ) =>
							updateBlockAttributes( tab.clientId, {
								panelKey: value,
							} )
						}
						onBlur={ ( event ) =>
							commitPanelKey( tab, event.target.value )
						}
						help={ __(
							'Sanitized on blur. Must be unique.',
							'twork-builder'
						) }
					/>
					<ToggleControl
						label={ __( 'Show Tab', 'twork-builder' ) }
						checked={ tab.showTab !== false }
						onChange={ ( value ) => {
							updateBlockAttributes( tab.clientId, {
								showTab: value,
							} );
							if ( ! value ) {
								const without = ( allTabs || [] ).map( ( t ) =>
									t.clientId === tab.clientId
										? { ...t, showTab: false }
										: t
								);
								ensureSingleDefault( null, without );
							}
						} }
					/>
					<ToggleControl
						label={ __( 'Default Active', 'twork-builder' ) }
						checked={ tab.isDefaultActive === true }
						onChange={ ( value ) => setDefault( tab, value ) }
					/>
					<div
						style={ {
							display: 'flex',
							flexWrap: 'wrap',
							gap: 8,
							marginTop: 8,
						} }
					>
						<Button
							variant="secondary"
							onClick={ () => moveTab( tab, -1 ) }
							disabled={ index === 0 }
						>
							{ __( 'Up', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => moveTab( tab, 1 ) }
							disabled={ index >= ( allTabs || [] ).length - 1 }
						>
							{ __( 'Down', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => openTab( tab ) }
						>
							{ __( 'Open', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							isDestructive
							onClick={ () => deleteTab( tab ) }
							disabled={ ( allTabs || [] ).length <= 1 }
						>
							{ __( 'Delete', 'twork-builder' ) }
						</Button>
					</div>
				</div>
			) ) }
			<Button variant="primary" onClick={ addTab }>
				{ __( 'Add Tab', 'twork-builder' ) }
			</Button>
		</PanelBody>
	);
}
