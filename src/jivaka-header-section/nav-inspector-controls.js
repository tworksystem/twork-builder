import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { DEFAULT_NAV_ITEMS, resolveNavItems } from './nav-data';

const NAV_TYPE_OPTIONS = [
	{ label: __( 'Simple Link', 'twork-builder' ), value: 'link' },
	{ label: __( 'Dropdown Menu', 'twork-builder' ), value: 'dropdown' },
	{ label: __( 'Mega Menu', 'twork-builder' ), value: 'mega' },
];

function cloneNavItems( items ) {
	return items.map( ( item ) => {
		if ( item.type === 'mega' ) {
			return {
				...item,
				children: ( item.children || [] ).map( ( group ) => ( {
					...group,
					links: ( group.links || [] ).map( ( link ) => ( {
						...link,
					} ) ),
				} ) ),
			};
		}

		if ( item.type === 'dropdown' ) {
			return {
				...item,
				children: ( item.children || [] ).map( ( child ) => ( {
					...child,
				} ) ),
			};
		}

		return { ...item };
	} );
}

function createNavItem( type = 'link' ) {
	if ( type === 'dropdown' ) {
		return {
			label: __( 'New Menu', 'twork-builder' ),
			url: '#',
			type: 'dropdown',
			children: [
				{
					label: __( 'New Link', 'twork-builder' ),
					url: '#',
				},
			],
		};
	}

	if ( type === 'mega' ) {
		return {
			label: __( 'New Mega Menu', 'twork-builder' ),
			url: '#',
			type: 'mega',
			children: [
				{
					groupTitle: __( 'New Group', 'twork-builder' ),
					links: [
						{
							label: __( 'New Link', 'twork-builder' ),
							url: '#',
						},
					],
				},
			],
		};
	}

	return {
		label: __( 'New Link', 'twork-builder' ),
		url: '#',
		type: 'link',
	};
}

function normalizeItemForType( item, nextType ) {
	const base = {
		label: item.label || '',
		url: item.url || '#',
		type: nextType,
	};

	if ( nextType === 'dropdown' ) {
		return {
			...base,
			url: '#',
			children:
				item.type === 'dropdown' && Array.isArray( item.children )
					? item.children
					: [
							{
								label: __( 'New Link', 'twork-builder' ),
								url: '#',
							},
					  ],
		};
	}

	if ( nextType === 'mega' ) {
		return {
			...base,
			url: '#',
			children:
				item.type === 'mega' && Array.isArray( item.children )
					? item.children
					: [
							{
								groupTitle: __( 'New Group', 'twork-builder' ),
								links: [
									{
										label: __( 'New Link', 'twork-builder' ),
										url: '#',
									},
								],
							},
					  ],
		};
	}

	return base;
}

function cardStyle() {
	return {
		border: '1px solid #ddd',
		borderRadius: '4px',
		padding: '12px',
		marginBottom: '12px',
		background: '#fff',
	};
}

function rowStyle() {
	return {
		display: 'flex',
		gap: '8px',
		flexWrap: 'wrap',
		marginTop: '8px',
	};
}

function DropdownChildrenEditor( { item, onChange } ) {
	const children = item.children || [];

	function updateChild( index, field, value ) {
		const nextChildren = children.map( ( child, childIndex ) =>
			childIndex === index ? { ...child, [ field ]: value } : child
		);
		onChange( { ...item, children: nextChildren } );
	}

	function addChild() {
		onChange( {
			...item,
			children: [
				...children,
				{
					label: __( 'New Link', 'twork-builder' ),
					url: '#',
				},
			],
		} );
	}

	function removeChild( index ) {
		onChange( {
			...item,
			children: children.filter( ( _, childIndex ) => childIndex !== index ),
		} );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<p style={ { margin: '0 0 8px', fontWeight: 600 } }>
				{ __( 'Dropdown Links', 'twork-builder' ) }
			</p>
			{ children.map( ( child, index ) => (
				<div key={ `dropdown-child-${ index }` } style={ cardStyle() }>
					<TextControl
						label={ __( 'Label', 'twork-builder' ) }
						value={ child.label || '' }
						onChange={ ( value ) =>
							updateChild( index, 'label', value )
						}
					/>
					<TextControl
						label={ __( 'URL', 'twork-builder' ) }
						value={ child.url || '' }
						onChange={ ( value ) =>
							updateChild( index, 'url', value )
						}
					/>
					<Button
						variant="secondary"
						isDestructive
						onClick={ () => removeChild( index ) }
					>
						{ __( 'Remove Link', 'twork-builder' ) }
					</Button>
				</div>
			) ) }
			<Button variant="secondary" onClick={ addChild }>
				{ __( 'Add Dropdown Link', 'twork-builder' ) }
			</Button>
		</div>
	);
}

function MegaChildrenEditor( { item, onChange } ) {
	const groups = item.children || [];

	function updateGroup( groupIndex, nextGroup ) {
		onChange( {
			...item,
			children: groups.map( ( group, index ) =>
				index === groupIndex ? nextGroup : group
			),
		} );
	}

	function addGroup() {
		onChange( {
			...item,
			children: [
				...groups,
				{
					groupTitle: __( 'New Group', 'twork-builder' ),
					links: [
						{
							label: __( 'New Link', 'twork-builder' ),
							url: '#',
						},
					],
				},
			],
		} );
	}

	function removeGroup( groupIndex ) {
		onChange( {
			...item,
			children: groups.filter( ( _, index ) => index !== groupIndex ),
		} );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<p style={ { margin: '0 0 8px', fontWeight: 600 } }>
				{ __( 'Mega Menu Groups', 'twork-builder' ) }
			</p>
			{ groups.map( ( group, groupIndex ) => {
				const links = group.links || [];

				function updateLink( linkIndex, field, value ) {
					updateGroup( groupIndex, {
						...group,
						links: links.map( ( link, index ) =>
							index === linkIndex
								? { ...link, [ field ]: value }
								: link
						),
					} );
				}

				function addLink() {
					updateGroup( groupIndex, {
						...group,
						links: [
							...links,
							{
								label: __( 'New Link', 'twork-builder' ),
								url: '#',
							},
						],
					} );
				}

				function removeLink( linkIndex ) {
					updateGroup( groupIndex, {
						...group,
						links: links.filter(
							( _, index ) => index !== linkIndex
						),
					} );
				}

				return (
					<div
						key={ `mega-group-${ groupIndex }` }
						style={ cardStyle() }
					>
						<TextControl
							label={ __( 'Group Title', 'twork-builder' ) }
							value={ group.groupTitle || '' }
							onChange={ ( value ) =>
								updateGroup( groupIndex, {
									...group,
									groupTitle: value,
								} )
							}
						/>
						{ links.map( ( link, linkIndex ) => (
							<div
								key={ `mega-link-${ groupIndex }-${ linkIndex }` }
								style={ {
									...cardStyle(),
									marginBottom: '8px',
									background: '#f9f9f9',
								} }
							>
								<TextControl
									label={ __( 'Link Label', 'twork-builder' ) }
									value={ link.label || '' }
									onChange={ ( value ) =>
										updateLink( linkIndex, 'label', value )
									}
								/>
								<TextControl
									label={ __( 'Link URL', 'twork-builder' ) }
									value={ link.url || '' }
									onChange={ ( value ) =>
										updateLink( linkIndex, 'url', value )
									}
								/>
								<Button
									variant="secondary"
									isDestructive
									onClick={ () => removeLink( linkIndex ) }
								>
									{ __( 'Remove Link', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<div style={ rowStyle() }>
							<Button variant="secondary" onClick={ addLink }>
								{ __( 'Add Link', 'twork-builder' ) }
							</Button>
							<Button
								variant="secondary"
								isDestructive
								onClick={ () => removeGroup( groupIndex ) }
							>
								{ __( 'Remove Group', 'twork-builder' ) }
							</Button>
						</div>
					</div>
				);
			} ) }
			<Button variant="secondary" onClick={ addGroup }>
				{ __( 'Add Mega Group', 'twork-builder' ) }
			</Button>
		</div>
	);
}

function NavItemEditor( { item, index, total, onChange, onRemove, onMove } ) {
	return (
		<div style={ cardStyle() }>
			<SelectControl
				label={ __( 'Menu Type', 'twork-builder' ) }
				value={ item.type || 'link' }
				options={ NAV_TYPE_OPTIONS }
				onChange={ ( value ) =>
					onChange( normalizeItemForType( item, value ) )
				}
			/>
			<TextControl
				label={ __( 'Menu Label', 'twork-builder' ) }
				value={ item.label || '' }
				onChange={ ( value ) => onChange( { ...item, label: value } ) }
			/>
			{ item.type === 'link' ? (
				<TextControl
					label={ __( 'URL', 'twork-builder' ) }
					value={ item.url || '' }
					onChange={ ( value ) => onChange( { ...item, url: value } ) }
				/>
			) : null }

			{ item.type === 'dropdown' ? (
				<DropdownChildrenEditor item={ item } onChange={ onChange } />
			) : null }

			{ item.type === 'mega' ? (
				<MegaChildrenEditor item={ item } onChange={ onChange } />
			) : null }

			<div style={ rowStyle() }>
				<Button
					variant="secondary"
					disabled={ index === 0 }
					onClick={ () => onMove( index, index - 1 ) }
				>
					{ __( 'Move Up', 'twork-builder' ) }
				</Button>
				<Button
					variant="secondary"
					disabled={ index >= total - 1 }
					onClick={ () => onMove( index, index + 1 ) }
				>
					{ __( 'Move Down', 'twork-builder' ) }
				</Button>
				<Button variant="secondary" isDestructive onClick={ onRemove }>
					{ __( 'Delete Menu Item', 'twork-builder' ) }
				</Button>
			</div>
		</div>
	);
}

export default function NavInspectorControls( { navItems, setAttributes } ) {
	const [ addType, setAddType ] = useState( 'link' );
	const [ openIndex, setOpenIndex ] = useState( 0 );
	const items = cloneNavItems( resolveNavItems( navItems ) );

	function commitItems( nextItems ) {
		setAttributes( { navItems: nextItems } );
	}

	function updateItem( index, nextItem ) {
		const nextItems = [ ...items ];
		nextItems[ index ] = nextItem;
		commitItems( nextItems );
	}

	function removeItem( index ) {
		const nextItems = items.filter( ( _, itemIndex ) => itemIndex !== index );
		commitItems( nextItems );
		setOpenIndex( Math.max( 0, index - 1 ) );
	}

	function moveItem( fromIndex, toIndex ) {
		if ( toIndex < 0 || toIndex >= items.length ) {
			return;
		}

		const nextItems = [ ...items ];
		const [ moved ] = nextItems.splice( fromIndex, 1 );
		nextItems.splice( toIndex, 0, moved );
		commitItems( nextItems );
		setOpenIndex( toIndex );
	}

	function addItem() {
		const nextItems = [ ...items, createNavItem( addType ) ];
		commitItems( nextItems );
		setOpenIndex( nextItems.length - 1 );
	}

	function resetItems() {
		commitItems( cloneNavItems( DEFAULT_NAV_ITEMS ) );
		setOpenIndex( 0 );
	}

	return (
		<PanelBody
			title={ __( 'Navigation', 'twork-builder' ) }
			initialOpen={ true }
		>
			<p style={ { marginTop: 0 } }>
				{ __(
					'Add, edit, reorder, or delete header menu items.',
					'twork-builder'
				) }
			</p>

			{ items.map( ( item, index ) => {
				const title = `${ index + 1 }. ${
					item.label || __( 'Menu Item', 'twork-builder' )
				}`;

				return (
					<PanelBody
						key={ `nav-item-panel-${ index }-${ item.label }` }
						title={ title }
						opened={ openIndex === index }
						onToggle={ ( isOpen ) => {
							if ( isOpen ) {
								setOpenIndex( index );
							}
						} }
					>
						<NavItemEditor
							item={ item }
							index={ index }
							total={ items.length }
							onChange={ ( nextItem ) =>
								updateItem( index, nextItem )
							}
							onRemove={ () => removeItem( index ) }
							onMove={ moveItem }
						/>
					</PanelBody>
				);
			} ) }

			<div style={ cardStyle() }>
				<SelectControl
					label={ __( 'Add Menu Type', 'twork-builder' ) }
					value={ addType }
					options={ NAV_TYPE_OPTIONS }
					onChange={ setAddType }
				/>
				<div style={ rowStyle() }>
					<Button variant="primary" onClick={ addItem }>
						{ __( 'Add Menu Item', 'twork-builder' ) }
					</Button>
					<Button variant="secondary" onClick={ resetItems }>
						{ __( 'Reset Default Navigation', 'twork-builder' ) }
					</Button>
				</div>
			</div>
		</PanelBody>
	);
}
