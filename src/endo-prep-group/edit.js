import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { select, useDispatch, useSelect } from '@wordpress/data';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';
import { setEndoPrepActivePanel } from '@twork-builder/shared/endo-prep-ui';

function ItemsInspector( { items, onChange } ) {
	const list = Array.isArray( items ) ? items : [];

	function updateItem( index, patch ) {
		onChange(
			list.map( ( item, i ) =>
				i === index ? { ...item, ...patch } : item
			)
		);
	}

	function addItem() {
		onChange( [
			...list,
			{ showItem: true, text: '', listStyle: 'check' },
		] );
	}

	function removeItem( index ) {
		onChange( list.filter( ( _, i ) => i !== index ) );
	}

	return (
		<div style={ { marginTop: 12 } }>
			<strong>{ __( 'Checklist Items', 'twork-builder' ) }</strong>
			{ list.map( ( item, index ) => (
				<div
					key={ `prep-item-${ index }` }
					style={ {
						marginTop: 10,
						padding: 10,
						border: '1px solid #ddd',
						borderRadius: 6,
					} }
				>
					<ToggleControl
						label={ __( 'Show Item', 'twork-builder' ) }
						checked={ item.showItem !== false }
						onChange={ ( value ) =>
							updateItem( index, { showItem: value } )
						}
					/>
					{ item.showItem !== false && (
						<>
							<SelectControl
								label={ __( 'Icon Style', 'twork-builder' ) }
								value={ item.listStyle || 'check' }
								options={ [
									{
										label: __( 'Check', 'twork-builder' ),
										value: 'check',
									},
									{
										label: __( 'Cross', 'twork-builder' ),
										value: 'xmark',
									},
								] }
								onChange={ ( value ) =>
									updateItem( index, { listStyle: value } )
								}
							/>
							<TextControl
								label={ __( 'Text', 'twork-builder' ) }
								value={ item.text || '' }
								onChange={ ( value ) =>
									updateItem( index, { text: value } )
								}
							/>
						</>
					) }
					<Button
						variant="secondary"
						isDestructive
						onClick={ () => removeItem( index ) }
					>
						{ __( 'Remove Item', 'twork-builder' ) }
					</Button>
				</div>
			) ) }
			<Button
				variant="secondary"
				onClick={ addItem }
				style={ { marginTop: 8 } }
			>
				{ __( 'Add Item', 'twork-builder' ) }
			</Button>
		</div>
	);
}

function itemIconClass( listStyle ) {
	return listStyle === 'xmark' ? 'fas fa-xmark' : 'fas fa-check';
}

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const { showGroup, showTitle, groupTitle, showIcon, variant, items } =
		attributes;

	const { moveBlockToPosition, selectBlock } =
		useDispatch( 'core/block-editor' );
	const { createNotice } = useDispatch( 'core/notices' );

	const { parentTabId, sectionId, tabOptions, tabsById } = useSelect(
		( selectStore ) => {
			const { getBlockRootClientId, getBlocks } =
				selectStore( 'core/block-editor' );
			const parentId = getBlockRootClientId( clientId ) || '';
			const sectionClientId = parentId
				? getBlockRootClientId( parentId ) || ''
				: '';
			const siblings = sectionClientId
				? getBlocks( sectionClientId ).filter(
						( block ) => block.name === 'twork/endo-prep-tab'
				  )
				: [];
			const byId = {};
			const options = siblings.map( ( tab ) => {
				const attrs = tab.attributes || {};
				const base =
					attrs.tabLabel ||
					attrs.panelKey ||
					__( 'Tab', 'twork-builder' );
				const label =
					attrs.showTab === false
						? `${ base } (${ __( 'hidden', 'twork-builder' ) })`
						: base;
				byId[ tab.clientId ] = {
					panelKey: attrs.panelKey || '',
				};
				return { label, value: tab.clientId };
			} );
			return {
				parentTabId: parentId,
				sectionId: sectionClientId,
				tabOptions: options,
				tabsById: byId,
			};
		},
		[ clientId ]
	);

	const warnClass = variant === 'warn' ? 'prep--warn' : '';
	const blockProps = useStableBlockProps(
		() => ( {
			className: `prep mk-endo-prep-group ${ warnClass }`,
		} ),
		[ variant ]
	);

	function moveGroupToTab( nextTabId ) {
		if ( ! nextTabId || nextTabId === parentTabId ) {
			return;
		}
		if ( ! parentTabId || ! tabsById[ nextTabId ] ) {
			createNotice(
				'warning',
				__(
					'Could not move checklist group to that tab.',
					'twork-builder'
				),
				{ type: 'snackbar', isDismissible: true }
			);
			return;
		}
		try {
			const index =
				select( 'core/block-editor' ).getBlockCount( nextTabId );
			moveBlockToPosition( clientId, parentTabId, nextTabId, index );
			const panelKey = tabsById[ nextTabId ].panelKey || '';
			if ( sectionId && panelKey ) {
				setEndoPrepActivePanel( sectionId, panelKey );
			}
			selectBlock( clientId );
		} catch ( err ) {
			createNotice(
				'warning',
				__(
					'Could not move checklist group to that tab.',
					'twork-builder'
				),
				{ type: 'snackbar', isDismissible: true }
			);
		}
	}

	if ( showGroup === false ) {
		return null;
	}

	const visibleItems = ( Array.isArray( items ) ? items : [] ).filter(
		( item ) => item.showItem !== false && item.text
	);
	const showTabSelect = tabOptions.length > 0 && parentTabId;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Prep Group', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ showTabSelect ? (
							<SelectControl
								label={ __( 'Tab', 'twork-builder' ) }
								value={ parentTabId }
								options={ tabOptions }
								onChange={ moveGroupToTab }
								disabled={ tabOptions.length < 2 }
								help={
									tabOptions.length < 2
										? __(
												'Add another prep tab on the section to move this group.',
												'twork-builder'
										  )
										: __(
												'Moves this checklist group under the selected tab.',
												'twork-builder'
										  )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Group', 'twork-builder' ) }
							checked={ showGroup !== false }
							onChange={ ( value ) =>
								setAttributes( { showGroup: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Icon', 'twork-builder' ) }
							checked={ showIcon !== false }
							onChange={ ( value ) =>
								setAttributes( { showIcon: value } )
							}
						/>
						{ showIcon !== false && (
							<EndoIconPicker
								label={ __( 'Icon', 'twork-builder' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						) }
						<SelectControl
							label={ __( 'Variant', 'twork-builder' ) }
							value={ variant || 'default' }
							options={ [
								{
									label: __( 'Default', 'twork-builder' ),
									value: 'default',
								},
								{
									label: __( 'Warning', 'twork-builder' ),
									value: 'warn',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { variant: value } )
							}
						/>
						<ItemsInspector
							items={ items }
							onChange={ ( value ) =>
								setAttributes( { items: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showTitle !== false && (
					<h4>
						{ showIcon !== false &&
							hasIconValue( mapIconAttrs( attributes ) ) && (
								<EndoFlexibleIcon attributes={ attributes } />
							) }
						<RichText
							tagName="span"
							value={ groupTitle }
							onChange={ ( value ) =>
								setAttributes( { groupTitle: value } )
							}
							placeholder={ __( 'Group title', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
					</h4>
				) }
				{ visibleItems.length > 0 && (
					<ul>
						{ visibleItems.map( ( item, index ) => (
							<li key={ `li-${ index }` }>
								<i
									className={ itemIconClass(
										item.listStyle
									) }
									aria-hidden="true"
								/>
								<span>{ item.text }</span>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
