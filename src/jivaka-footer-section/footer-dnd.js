import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export const DEFAULT_SECTION_ORDER = [ 'cta', 'main', 'bottom' ];
export const DEFAULT_COLUMN_ORDER = [
	'brand',
	'quickLinks',
	'departments',
	'contact',
];
export const DEFAULT_CONTACT_ITEM_ORDER = [ 'address', 'emergency', 'email' ];
export const DEFAULT_CTA_BUTTON_ORDER = [ 'call', 'appointment' ];
export const DEFAULT_BRAND_BLOCK_ORDER = [ 'logo', 'text', 'social' ];
export const DEFAULT_BOTTOM_BAR_ORDER = [ 'copyright', 'legal' ];

export function reorderArray( items, fromIndex, toIndex ) {
	if (
		fromIndex === toIndex ||
		fromIndex < 0 ||
		toIndex < 0 ||
		fromIndex >= items.length ||
		toIndex >= items.length
	) {
		return items;
	}

	const next = [ ...items ];
	const [ moved ] = next.splice( fromIndex, 1 );
	next.splice( toIndex, 0, moved );
	return next;
}

export function resolveOrder( order, defaults ) {
	const source =
		Array.isArray( order ) && order.length ? [ ...order ] : [ ...defaults ];
	const allowed = new Set( defaults );
	const next = source.filter( ( id ) => allowed.has( id ) );

	defaults.forEach( ( id ) => {
		if ( ! next.includes( id ) ) {
			next.push( id );
		}
	} );

	return next;
}

export function reorderVisibleIndices(
	items,
	visibleFrom,
	visibleTo,
	isVisible
) {
	const visibleIndices = items
		.map( ( item, index ) => ( { item, index } ) )
		.filter( ( entry ) => isVisible( entry.item ) )
		.map( ( entry ) => entry.index );

	if (
		visibleFrom < 0 ||
		visibleTo < 0 ||
		visibleFrom >= visibleIndices.length ||
		visibleTo >= visibleIndices.length
	) {
		return items;
	}

	return reorderArray(
		items,
		visibleIndices[ visibleFrom ],
		visibleIndices[ visibleTo ]
	);
}

export function reorderIds( order, fromId, toId ) {
	const resolved = resolveOrder( order, order );
	const fromIndex = resolved.indexOf( fromId );
	const toIndex = resolved.indexOf( toId );

	if ( fromIndex === -1 || toIndex === -1 ) {
		return resolved;
	}

	return reorderArray( resolved, fromIndex, toIndex );
}

export function FooterShell( {
	isEditor = false,
	legacySave = false,
	dragType,
	index,
	onReorder,
	editorClassName = '',
	editorTagName = 'div',
	saveClassName,
	saveTagName = 'div',
	savePassthrough = false,
	label,
	children,
	style,
} ) {
	if ( isEditor ) {
		const EditorTag = editorTagName;

		if ( ! editorClassName ) {
			return children;
		}

		return (
			<EditorTag className={ editorClassName } style={ style }>
				{ children }
			</EditorTag>
		);
	}

	if ( legacySave ) {
		return (
			<DraggableShell
				isEditor={ false }
				className={ editorClassName }
				tagName={ editorTagName }
				style={ style }
			>
				{ children }
			</DraggableShell>
		);
	}

	if ( savePassthrough ) {
		return children;
	}

	const resolvedSaveClassName = saveClassName ?? editorClassName;
	if ( ! resolvedSaveClassName ) {
		return children;
	}

	const SaveTag = saveTagName;
	return (
		<SaveTag className={ resolvedSaveClassName } style={ style }>
			{ children }
		</SaveTag>
	);
}

export function DraggableShell( {
	isEditor = false,
	dragType,
	index,
	onReorder,
	className = '',
	children,
	label,
	tagName: Tag = 'div',
	style,
} ) {
	const [ isDragOver, setIsDragOver ] = useState( false );

	if ( ! isEditor || ! onReorder || dragType == null || index == null ) {
		return (
			<Tag className={ className } style={ style }>
				{ children }
			</Tag>
		);
	}

	function handleDrop( event ) {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver( false );

		try {
			const payload = JSON.parse(
				event.dataTransfer.getData( 'application/json' )
			);

			if (
				payload?.dragType === dragType &&
				typeof payload.index === 'number' &&
				payload.index !== index
			) {
				onReorder( payload.index, index );
			}
		} catch ( error ) {
			// Ignore malformed drag payloads.
		}
	}

	const shellClassName = [
		className,
		'jivaka-footer__draggable',
		isDragOver ? 'is-drag-over' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<Tag
			className={ shellClassName }
			style={ style }
			onDragOver={ ( event ) => {
				event.preventDefault();
				setIsDragOver( true );
			} }
			onDragLeave={ () => setIsDragOver( false ) }
			onDrop={ handleDrop }
		>
			<button
				type="button"
				className="jivaka-footer__drag-handle"
				draggable
				aria-label={ label || __( 'Drag to reorder', 'twork-builder' ) }
				onDragStart={ ( event ) => {
					event.stopPropagation();
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData(
						'application/json',
						JSON.stringify( { dragType, index } )
					);
				} }
			>
				<i className="fas fa-grip-vertical" aria-hidden="true"></i>
			</button>
			<div className="jivaka-footer__draggable-content">{ children }</div>
		</Tag>
	);
}

export function DraggableInspectorCard( {
	dragType,
	index,
	onReorder,
	children,
	label,
} ) {
	const [ isDragOver, setIsDragOver ] = useState( false );

	if ( ! onReorder || dragType == null || index == null ) {
		return <div style={ inspectorCardStyle() }>{ children }</div>;
	}

	return (
		<div
			style={ {
				...inspectorCardStyle(),
				borderColor: isDragOver ? '#f6892e' : '#ddd',
			} }
			onDragOver={ ( event ) => {
				event.preventDefault();
				setIsDragOver( true );
			} }
			onDragLeave={ () => setIsDragOver( false ) }
			onDrop={ ( event ) => {
				event.preventDefault();
				setIsDragOver( false );

				try {
					const payload = JSON.parse(
						event.dataTransfer.getData( 'application/json' )
					);

					if (
						payload?.dragType === dragType &&
						typeof payload.index === 'number' &&
						payload.index !== index
					) {
						onReorder( payload.index, index );
					}
				} catch ( error ) {
					// Ignore malformed drag payloads.
				}
			} }
		>
			<button
				type="button"
				style={ inspectorHandleStyle() }
				draggable
				aria-label={ label || __( 'Drag to reorder', 'twork-builder' ) }
				onDragStart={ ( event ) => {
					event.stopPropagation();
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData(
						'application/json',
						JSON.stringify( { dragType, index } )
					);
				} }
			>
				<i className="fas fa-grip-vertical" aria-hidden="true"></i>
			</button>
			<div>{ children }</div>
		</div>
	);
}

function inspectorCardStyle() {
	return {
		border: '1px solid #ddd',
		borderRadius: '4px',
		padding: '12px',
		marginBottom: '12px',
		background: '#fff',
		display: 'grid',
		gridTemplateColumns: '28px 1fr',
		gap: '10px',
		alignItems: 'start',
	};
}

function inspectorHandleStyle() {
	return {
		border: 'none',
		background: 'transparent',
		color: '#666',
		cursor: 'grab',
		padding: '4px 0',
	};
}
