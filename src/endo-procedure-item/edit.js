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
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const LAYOUT_OPTIONS = [
	{ label: __( 'Normal (1/3)', 'twork-builder' ), value: 'normal' },
	{ label: __( 'Wide (1/2)', 'twork-builder' ), value: 'wide' },
];

function ChipsInspector( { chips, onChange } ) {
	const list = Array.isArray( chips ) ? chips : [];

	function updateChip( index, patch ) {
		const next = list.map( ( chip, i ) =>
			i === index ? { ...chip, ...patch } : chip
		);
		onChange( next );
	}

	function addChip() {
		onChange( [
			...list,
			{
				showChip: true,
				iconType: 'fontawesome',
				iconClass: 'fas fa-check',
				iconDashicon: '',
				iconImageUrl: '',
				iconImageId: 0,
				iconVideoUrl: '',
				iconVideoId: 0,
				text: '',
			},
		] );
	}

	function removeChip( index ) {
		onChange( list.filter( ( _, i ) => i !== index ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ __( 'Chips', 'twork-builder' ) }</strong>
			{ list.map( ( chip, index ) => (
				<div
					key={ `chip-${ index }` }
					style={ {
						marginTop: '10px',
						padding: '10px',
						border: '1px solid #ddd',
						borderRadius: '6px',
					} }
				>
					<ToggleControl
						label={ __( 'Show Chip', 'twork-builder' ) }
						checked={ chip.showChip !== false }
						onChange={ ( value ) =>
							updateChip( index, { showChip: value } )
						}
					/>
					{ chip.showChip !== false && (
						<>
							<EndoIconPicker
								label={ __( 'Chip icon', 'twork-builder' ) }
								attributes={ {
									iconType: chip.iconType || 'fontawesome',
									iconClass: chip.iconClass || '',
									iconDashicon: chip.iconDashicon || '',
									iconImageUrl: chip.iconImageUrl || '',
									iconImageId: chip.iconImageId || 0,
									iconVideoUrl: chip.iconVideoUrl || '',
									iconVideoId: chip.iconVideoId || 0,
								} }
								setAttributes={ ( patch ) =>
									updateChip( index, patch )
								}
							/>
							<TextControl
								label={ __( 'Text', 'twork-builder' ) }
								value={ chip.text || '' }
								onChange={ ( value ) =>
									updateChip( index, { text: value } )
								}
							/>
						</>
					) }
					<Button
						variant="secondary"
						isDestructive
						onClick={ () => removeChip( index ) }
					>
						{ __( 'Remove Chip', 'twork-builder' ) }
					</Button>
				</div>
			) ) }
			<Button
				variant="secondary"
				onClick={ addChip }
				style={ { marginTop: '8px' } }
			>
				{ __( 'Add Chip', 'twork-builder' ) }
			</Button>
		</div>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		cardLayout,
		showIcon,
		iconBgColor,
		iconColor,
		showTitle,
		title,
		showDescription,
		description,
		showChips,
		chips,
		showLink,
		linkText,
		linkUrl,
	} = attributes;

	const wideClass = cardLayout === 'wide' ? 'p-card--wide' : '';
	const blockProps = useStableBlockProps(
		() => ( {
			className: `p-card tilt mk-endo-procedure-item ${ wideClass }`,
		} ),
		[ cardLayout ]
	);

	if ( showItem === false ) {
		return null;
	}

	const visibleChips = ( chips || [] ).filter(
		( chip ) => chip.showChip !== false && chip.text
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Procedure Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Card', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<SelectControl
							label={ __( 'Card Layout', 'twork-builder' ) }
							value={ cardLayout }
							options={ LAYOUT_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { cardLayout: value } )
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
							<>
								<EndoIconPicker
									label={ __( 'Icon', 'twork-builder' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								<TextControl
									label={ __(
										'Icon Background',
										'twork-builder'
									) }
									value={ iconBgColor }
									onChange={ ( value ) =>
										setAttributes( {
											iconBgColor: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Icon Color',
										'twork-builder'
									) }
									value={ iconColor }
									onChange={ ( value ) =>
										setAttributes( { iconColor: value } )
									}
								/>
							</>
						) }
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Description', 'twork-builder' ) }
							checked={ showDescription !== false }
							onChange={ ( value ) =>
								setAttributes( { showDescription: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Chips', 'twork-builder' ) }
							checked={ showChips !== false }
							onChange={ ( value ) =>
								setAttributes( { showChips: value } )
							}
						/>
						{ showChips !== false && (
							<ChipsInspector
								chips={ chips }
								onChange={ ( value ) =>
									setAttributes( { chips: value } )
								}
							/>
						) }
						<ToggleControl
							label={ __( 'Show Link', 'twork-builder' ) }
							checked={ showLink !== false }
							onChange={ ( value ) =>
								setAttributes( { showLink: value } )
							}
						/>
						{ showLink !== false && (
							<TextControl
								label={ __( 'Link URL', 'twork-builder' ) }
								value={ linkUrl }
								onChange={ ( value ) =>
									setAttributes( { linkUrl: value } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ showIcon !== false &&
					hasIconValue( mapIconAttrs( attributes ) ) && (
						<div
							className="p-icon"
							style={ {
								background: iconBgColor,
								color: iconColor,
							} }
						>
							<EndoFlexibleIcon attributes={ attributes } />
						</div>
					) }
				{ showTitle !== false && (
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Procedure title', 'twork-builder' ) }
					/>
				) }
				{ showDescription !== false && (
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __( 'Description', 'twork-builder' ) }
					/>
				) }
				{ showChips !== false && visibleChips.length > 0 && (
					<div className="p-meta">
						{ visibleChips.map( ( chip, index ) => (
							<span key={ `chip-${ index }` } className="chip">
								{ hasIconValue( mapIconAttrs( chip ) ) && (
									<EndoFlexibleIcon attributes={ chip } />
								) }
								{ chip.text }
							</span>
						) ) }
					</div>
				) }
				{ showLink !== false && (
					<span className="p-link">
						<RichText
							tagName="span"
							value={ linkText }
							onChange={ ( value ) =>
								setAttributes( { linkText: value } )
							}
							placeholder={ __( 'Link text', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
						<i className="fas fa-arrow-right" aria-hidden="true" />
					</span>
				) }
			</article>
		</>
	);
}
