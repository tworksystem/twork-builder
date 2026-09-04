import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
} from '@wordpress/components';
import { normalizeFaClass } from '../booking-layout-section/data-helpers';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, iconClass, itemIconClass, listItems = [] } = attributes;

	const headerIcon = normalizeFaClass(
		iconClass || 'fas fa-clipboard-check'
	);
	const defaultItemIcon = normalizeFaClass( itemIconClass || 'fas fa-check' );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'info-card',
		} ),
		[]
	);

	const addListItem = () => {
		const nextId = listItems.length
			? Math.max( ...listItems.map( ( i ) => i.id ) ) + 1
			: 1;
		setAttributes( {
			listItems: [
				...listItems,
				{
					id: nextId,
					text: __( 'New item', 'twork-builder' ),
					iconClass: '',
				},
			],
		} );
	};

	const updateListItem = ( id, fields ) => {
		setAttributes( {
			listItems: listItems.map( ( item ) =>
				item.id === id ? { ...item, ...fields } : item
			),
		} );
	};

	const removeListItem = ( id ) => {
		setAttributes( {
			listItems: listItems.filter( ( item ) => item.id !== id ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Header Icon Class (use fas …)',
								'twork-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: normalizeFaClass( val ),
								} )
							}
							help={ __(
								'ZIP includes solid icons only (fas). far will auto-convert.',
								'twork-builder'
							) }
						/>
						<TextControl
							label={ __(
								'Default List Item Icon',
								'twork-builder'
							) }
							value={ itemIconClass }
							onChange={ ( val ) =>
								setAttributes( {
									itemIconClass: normalizeFaClass( val ),
								} )
							}
						/>
						<BaseControl
							label={ __( 'List Items', 'twork-builder' ) }
						>
							{ listItems.map( ( item ) => (
								<div
									key={ item.id }
									style={ {
										marginBottom: '12px',
										paddingBottom: '8px',
										borderBottom: '1px solid #eee',
									} }
								>
									<TextControl
										label={ __( 'Text', 'twork-builder' ) }
										value={ item.text }
										onChange={ ( text ) =>
											updateListItem( item.id, {
												text,
											} )
										}
									/>
									<TextControl
										label={ __(
											'Icon override (optional, fas …)',
											'twork-builder'
										) }
										value={ item.iconClass || '' }
										onChange={ ( icon ) =>
											updateListItem( item.id, {
												iconClass: icon
													? normalizeFaClass( icon )
													: '',
											} )
										}
									/>
									<Button
										isDestructive
										variant="link"
										onClick={ () =>
											removeListItem( item.id )
										}
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) ) }
							<Button variant="secondary" onClick={ addListItem }>
								{ __( 'Add Item', 'twork-builder' ) }
							</Button>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<h4>
					<i className={ headerIcon } aria-hidden="true" />{ ' ' }
					<RichText
						tagName="span"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Card title…', 'twork-builder' ) }
					/>
				</h4>
				<ul className="info-list">
					{ listItems.map( ( item ) => (
						<li key={ item.id }>
							<i
								className={ normalizeFaClass(
									item.iconClass || defaultItemIcon
								) }
								aria-hidden="true"
							/>
							<RichText
								tagName="span"
								value={ item.text }
								onChange={ ( text ) =>
									updateListItem( item.id, { text } )
								}
								placeholder={ __(
									'List item…',
									'twork-builder'
								) }
							/>
						</li>
					) ) }
				</ul>
			</div>
		</>
	);
}
