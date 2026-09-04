/**
 * Shared "checkup prep" panel — collapsible do's & don'ts card.
 *
 * Used by two host blocks:
 * - twork/checkup-prep-section  (standalone section, attribute prefix '')
 * - twork/packages-section      (built-in above the filter tabs, prefix 'prep')
 *
 * The host owns the attributes; this module only knows the *logical* key names
 * and maps them through `pickPrep()` / `makePrepSetter()`. That keeps
 * twork/packages-section free of attribute-name collisions (it already declares
 * backgroundColor, paddingTop, cardBorderRadius, columns, gap, …).
 *
 * Import: import { … } from '@twork-builder/shared/checkup-prep-panel';
 */

import { __ } from '@wordpress/i18n';
import {
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
	BaseControl,
} from '@wordpress/components';

/**
 * Logical attribute keys the panel reads. A host block must declare every one
 * of them in its block.json (prefixed when a prefix is used).
 */
export const PREP_KEYS = [
	'collapsible',
	'defaultOpen',
	'toggleLabel',
	'toggleLabelColor',
	'toggleBackgroundColor',
	'toggleFontSize',
	'toggleFontWeight',
	'showCard',
	'cardBackgroundColor',
	'cardBorderColor',
	'cardBorderRadius',
	'cardPadding',
	'cardPaddingMobile',
	'showTitle',
	'title',
	'titleColor',
	'titleFontSize',
	'titleFontSizeMobile',
	'titleFontWeight',
	'titleAlignment',
	'titleLineHeight',
	'titleMarginBottom',
	'showChecklist',
	'checklistItems',
	'checklistIcon',
	'checklistIconColor',
	'checklistTextColor',
	'checklistFontSize',
	'checklistFontSizeMobile',
	'checklistLineHeight',
	'checklistItemGap',
	'showHighlightBox',
	'highlightTitle',
	'highlightItems',
	'highlightIcon',
	'highlightBackgroundColor',
	'highlightTitleColor',
	'highlightTextColor',
	'highlightTitleFontSize',
	'highlightFontSize',
	'highlightBorderRadius',
	'highlightPadding',
	'highlightPaddingMobile',
	'showMascot',
	'mascotUrl',
	'mascotId',
	'mascotAlt',
	'mascotWidth',
	'mascotNaturalWidth',
	'mascotNaturalHeight',
	'showDecor',
	'decorUrl',
	'decorId',
	'decorMaxWidth',
	'decorNaturalWidth',
	'decorNaturalHeight',
];

/**
 * @param {string} prefix Attribute prefix ('' or e.g. 'prep').
 * @param {string} key    Logical key.
 * @return {string} Actual attribute name.
 */
function prefixKey( prefix, key ) {
	if ( ! prefix ) {
		return key;
	}
	return prefix + key.charAt( 0 ).toUpperCase() + key.slice( 1 );
}

/**
 * Reads the prep attributes out of a host block's attributes.
 *
 * @param {Object} attributes Host block attributes.
 * @param {string} prefix     Attribute prefix.
 * @return {Object} Normalized prep values keyed by logical name.
 */
export function pickPrep( attributes, prefix = '' ) {
	const out = {};
	PREP_KEYS.forEach( ( key ) => {
		out[ key ] = attributes[ prefixKey( prefix, key ) ];
	} );
	return out;
}

/**
 * Builds a setter that accepts logical keys and writes prefixed attributes.
 *
 * @param {Function} setAttributes Host setAttributes.
 * @param {string}   prefix        Attribute prefix.
 * @return {Function} setPrep( patch )
 */
export function makePrepSetter( setAttributes, prefix = '' ) {
	return ( patch ) => {
		const mapped = {};
		Object.keys( patch ).forEach( ( key ) => {
			mapped[ prefixKey( prefix, key ) ] = patch[ key ];
		} );
		setAttributes( mapped );
	};
}

/**
 * CSS custom properties that drive the mobile breakpoint. They live on the
 * panel root so a host block never has to touch its own wrapper style
 * (which would invalidate already-saved content).
 *
 * @param {Object} prep Normalized prep values.
 * @return {Object} Style object.
 */
function panelVars( prep ) {
	return {
		'--prep-card-padding-mobile': `${ prep.cardPaddingMobile }px`,
		'--prep-title-size-mobile': `${ prep.titleFontSizeMobile }rem`,
		'--prep-list-size-mobile': `${ prep.checklistFontSizeMobile }rem`,
		'--prep-highlight-padding-mobile': `${ prep.highlightPaddingMobile }px`,
		'--prep-toggle-color': prep.toggleLabelColor,
	};
}

function cardStyleOf( prep ) {
	return prep.showCard
		? {
				backgroundColor: prep.cardBackgroundColor,
				border: `1px solid ${ prep.cardBorderColor }`,
				borderRadius: `${ prep.cardBorderRadius }px`,
		  }
		: {};
}

function cardClassOf( prep ) {
	return [
		'prep-card',
		prep.showCard ? 'has-card' : null,
		prep.collapsible ? 'is-collapsible' : null,
	]
		.filter( Boolean )
		.join( ' ' );
}

function toggleStyleOf( prep ) {
	return {
		backgroundColor: prep.toggleBackgroundColor,
		color: prep.toggleLabelColor,
		fontSize: `${ prep.toggleFontSize }rem`,
		fontWeight: prep.toggleFontWeight,
		borderRadius: `${ prep.cardBorderRadius }px`,
	};
}

function bodyStyleOf( prep ) {
	return { padding: prep.showCard ? `${ prep.cardPadding }px` : '0' };
}

function titleStyleOf( prep ) {
	return {
		color: prep.titleColor,
		fontSize: `${ prep.titleFontSize }rem`,
		fontWeight: prep.titleFontWeight,
		textAlign: prep.titleAlignment,
		lineHeight: prep.titleLineHeight,
		marginBottom: `${ prep.titleMarginBottom }px`,
	};
}

function listStyleOf( prep ) {
	return {
		fontSize: `${ prep.checklistFontSize }rem`,
		lineHeight: prep.checklistLineHeight,
		color: prep.checklistTextColor,
	};
}

function highlightStyleOf( prep ) {
	return {
		backgroundColor: prep.highlightBackgroundColor,
		borderRadius: `${ prep.highlightBorderRadius }px`,
		padding: `${ prep.highlightPadding }px`,
	};
}

function highlightListStyleOf( prep ) {
	return {
		fontSize: `${ prep.highlightFontSize }rem`,
		color: prep.highlightTextColor,
		lineHeight: prep.checklistLineHeight,
	};
}

function nextId( items ) {
	return items && items.length
		? Math.max( ...items.map( ( item ) => item.id || 0 ) ) + 1
		: 1;
}

/* -------------------------------------------------------------------------- */
/* Front-end / saved markup                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Saved markup. Renders nothing structural beyond the panel root, so a host
 * block can drop it in behind a `false`-by-default toggle without changing the
 * markup of already-saved posts.
 *
 * @param {Object} props                Props.
 * @param {Object} props.prep           Normalized prep values.
 * @param {Object} [props.wrapperStyle] Extra style for the panel root.
 * @return {JSX.Element} Element.
 */
export function CheckupPrepSavedBody( { prep, wrapperStyle = {} } ) {
	const activeChecklist = ( prep.checklistItems || [] ).filter(
		( item ) => item.enabled !== false
	);
	const activeHighlight = ( prep.highlightItems || [] ).filter(
		( item ) => item.enabled !== false
	);

	const Wrapper = prep.collapsible ? 'details' : 'div';

	return (
		<div
			className="twork-checkup-prep-panel"
			style={ { ...panelVars( prep ), ...wrapperStyle } }
		>
			<Wrapper
				className={ cardClassOf( prep ) }
				style={ cardStyleOf( prep ) }
				{ ...( prep.collapsible && prep.defaultOpen
					? { open: true }
					: {} ) }
			>
				{ prep.collapsible && (
					<summary
						className="prep-toggle"
						style={ toggleStyleOf( prep ) }
					>
						<span className="prep-toggle-text">
							{ prep.toggleLabel }
						</span>
						<span className="prep-toggle-icon" aria-hidden="true" />
					</summary>
				) }

				<div className="prep-body" style={ bodyStyleOf( prep ) }>
					{ prep.showTitle && (
						<RichText.Content
							tagName="h2"
							className="prep-title"
							value={ prep.title }
							style={ titleStyleOf( prep ) }
						/>
					) }

					{ prep.showChecklist && activeChecklist.length > 0 && (
						<ul className="prep-list" style={ listStyleOf( prep ) }>
							{ activeChecklist.map( ( item ) => (
								<li
									key={ item.id }
									style={ {
										marginBottom: `${ prep.checklistItemGap }px`,
									} }
								>
									{ prep.checklistIcon && (
										<span
											className="prep-list-icon"
											aria-hidden="true"
										>
											<i
												className={ prep.checklistIcon }
												style={ {
													color: prep.checklistIconColor,
												} }
											/>
										</span>
									) }
									<RichText.Content
										tagName="span"
										className="prep-list-text"
										value={ item.text }
									/>
								</li>
							) ) }
						</ul>
					) }

					{ prep.showHighlightBox && (
						<div
							className="prep-highlight"
							style={ highlightStyleOf( prep ) }
						>
							<div className="prep-highlight-content">
								{ prep.highlightTitle && (
									<RichText.Content
										tagName="h3"
										className="prep-highlight-title"
										value={ prep.highlightTitle }
										style={ {
											color: prep.highlightTitleColor,
											fontSize: `${ prep.highlightTitleFontSize }rem`,
										} }
									/>
								) }

								{ activeHighlight.length > 0 && (
									<ul
										className="prep-highlight-list"
										style={ highlightListStyleOf( prep ) }
									>
										{ activeHighlight.map( ( item ) => (
											<li key={ item.id }>
												{ prep.highlightIcon && (
													<span
														className="prep-highlight-icon"
														aria-hidden="true"
													>
														<i
															className={
																prep.highlightIcon
															}
														/>
													</span>
												) }
												<RichText.Content
													tagName="span"
													className="prep-highlight-text"
													value={ item.text }
												/>
											</li>
										) ) }
									</ul>
								) }
							</div>

							{ prep.showMascot && prep.mascotUrl && (
								<img
									className="prep-mascot"
									src={ prep.mascotUrl }
									alt={ prep.mascotAlt || '' }
									width={
										prep.mascotNaturalWidth || undefined
									}
									height={
										prep.mascotNaturalHeight || undefined
									}
									loading="lazy"
									decoding="async"
									style={ {
										width: `${ prep.mascotWidth }px`,
									} }
								/>
							) }
						</div>
					) }

					{ prep.showDecor && prep.decorUrl && (
						<img
							className="prep-decor"
							src={ prep.decorUrl }
							alt=""
							width={ prep.decorNaturalWidth || undefined }
							height={ prep.decorNaturalHeight || undefined }
							loading="lazy"
							decoding="async"
							style={ { maxWidth: `${ prep.decorMaxWidth }%` } }
						/>
					) }
				</div>
			</Wrapper>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/* Editor canvas                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Editor markup. Always renders expanded (a real <details> would fight the
 * editing experience) and marks disabled items instead of hiding them.
 *
 * @param {Object}   props                Props.
 * @param {Object}   props.prep           Normalized prep values.
 * @param {Function} props.setPrep        Logical-key setter.
 * @param {Object}   [props.wrapperStyle] Extra style for the panel root.
 * @return {JSX.Element} Element.
 */
export function CheckupPrepEditorBody( { prep, setPrep, wrapperStyle = {} } ) {
	const checklistItems = prep.checklistItems || [];
	const highlightItems = prep.highlightItems || [];

	const updateItem = ( key, list, id, patch ) => {
		setPrep( {
			[ key ]: list.map( ( item ) =>
				item.id === id ? { ...item, ...patch } : item
			),
		} );
	};

	return (
		<div
			className="twork-checkup-prep-panel is-editor"
			style={ { ...panelVars( prep ), ...wrapperStyle } }
		>
			<div
				className={ cardClassOf( prep ) }
				style={ cardStyleOf( prep ) }
			>
				{ prep.collapsible && (
					<div
						className="prep-toggle prep-toggle--editor"
						style={ toggleStyleOf( prep ) }
					>
						<span className="prep-toggle-text">
							{ prep.toggleLabel }
						</span>
						<span className="prep-toggle-icon" aria-hidden="true" />
					</div>
				) }

				<div className="prep-body" style={ bodyStyleOf( prep ) }>
					{ prep.showTitle && (
						<RichText
							tagName="h2"
							className="prep-title"
							value={ prep.title }
							onChange={ ( val ) => setPrep( { title: val } ) }
							placeholder={ __(
								'Section title…',
								'twork-builder'
							) }
							style={ titleStyleOf( prep ) }
						/>
					) }

					{ prep.showChecklist && checklistItems.length > 0 && (
						<ul className="prep-list" style={ listStyleOf( prep ) }>
							{ checklistItems.map( ( item ) => (
								<li
									key={ item.id }
									className={
										item.enabled === false
											? 'is-item-hidden'
											: undefined
									}
									style={ {
										marginBottom: `${ prep.checklistItemGap }px`,
									} }
								>
									{ prep.checklistIcon && (
										<span
											className="prep-list-icon"
											aria-hidden="true"
										>
											<i
												className={ prep.checklistIcon }
												style={ {
													color: prep.checklistIconColor,
												} }
											/>
										</span>
									) }
									<RichText
										tagName="span"
										className="prep-list-text"
										value={ item.text }
										onChange={ ( val ) =>
											updateItem(
												'checklistItems',
												checklistItems,
												item.id,
												{ text: val }
											)
										}
										placeholder={ __(
											'Checklist point…',
											'twork-builder'
										) }
									/>
								</li>
							) ) }
						</ul>
					) }

					{ prep.showHighlightBox && (
						<div
							className="prep-highlight"
							style={ highlightStyleOf( prep ) }
						>
							<div className="prep-highlight-content">
								<RichText
									tagName="h3"
									className="prep-highlight-title"
									value={ prep.highlightTitle }
									onChange={ ( val ) =>
										setPrep( { highlightTitle: val } )
									}
									placeholder={ __(
										'Highlight title…',
										'twork-builder'
									) }
									style={ {
										color: prep.highlightTitleColor,
										fontSize: `${ prep.highlightTitleFontSize }rem`,
									} }
								/>

								{ highlightItems.length > 0 && (
									<ul
										className="prep-highlight-list"
										style={ highlightListStyleOf( prep ) }
									>
										{ highlightItems.map( ( item ) => (
											<li
												key={ item.id }
												className={
													item.enabled === false
														? 'is-item-hidden'
														: undefined
												}
											>
												{ prep.highlightIcon && (
													<span
														className="prep-highlight-icon"
														aria-hidden="true"
													>
														<i
															className={
																prep.highlightIcon
															}
														/>
													</span>
												) }
												<RichText
													tagName="span"
													className="prep-highlight-text"
													value={ item.text }
													onChange={ ( val ) =>
														updateItem(
															'highlightItems',
															highlightItems,
															item.id,
															{ text: val }
														)
													}
													placeholder={ __(
														'Service point…',
														'twork-builder'
													) }
												/>
											</li>
										) ) }
									</ul>
								) }
							</div>

							{ prep.showMascot && prep.mascotUrl && (
								<img
									className="prep-mascot"
									src={ prep.mascotUrl }
									alt={ prep.mascotAlt || '' }
									style={ {
										width: `${ prep.mascotWidth }px`,
									} }
								/>
							) }
						</div>
					) }

					{ prep.showDecor && prep.decorUrl && (
						<img
							className="prep-decor"
							src={ prep.decorUrl }
							alt=""
							style={ { maxWidth: `${ prep.decorMaxWidth }%` } }
						/>
					) }
				</div>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/* Inspector                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Inspector panels for the prep card. Returns bare PanelBody elements — the
 * host block wraps them in its own <InspectorControls>.
 *
 * @param {Object}   props         Props.
 * @param {Object}   props.prep    Normalized prep values.
 * @param {Function} props.setPrep Logical-key setter.
 * @return {JSX.Element} Element.
 */
export function CheckupPrepInspector( { prep, setPrep } ) {
	const checklistItems = prep.checklistItems || [];
	const highlightItems = prep.highlightItems || [];

	const updateItem = ( key, list, id, patch ) => {
		setPrep( {
			[ key ]: list.map( ( item ) =>
				item.id === id ? { ...item, ...patch } : item
			),
		} );
	};

	const addItem = ( key, list, placeholder ) => {
		setPrep( {
			[ key ]: [
				...list,
				{ id: nextId( list ), enabled: true, text: placeholder },
			],
		} );
	};

	const removeItem = ( key, list, id ) => {
		setPrep( { [ key ]: list.filter( ( item ) => item.id !== id ) } );
	};

	const repeater = ( key, list, placeholder ) => (
		<BaseControl __nextHasNoMarginBottom>
			{ list.map( ( item, index ) => (
				<div
					key={ item.id }
					style={ {
						marginBottom: 12,
						paddingBottom: 12,
						borderBottom: '1px solid #e0e0e0',
					} }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ `${ __( 'Item', 'twork-builder' ) } ${
							index + 1
						}` }
						help={
							item.enabled === false
								? __( 'Hidden on the page', 'twork-builder' )
								: __( 'Shown on the page', 'twork-builder' )
						}
						checked={ item.enabled !== false }
						onChange={ ( val ) =>
							updateItem( key, list, item.id, { enabled: val } )
						}
					/>
					<Button
						isDestructive
						variant="secondary"
						size="small"
						onClick={ () => removeItem( key, list, item.id ) }
					>
						{ __( 'Remove', 'twork-builder' ) }
					</Button>
				</div>
			) ) }
			<Button
				variant="primary"
				size="small"
				onClick={ () => addItem( key, list, placeholder ) }
			>
				{ __( 'Add Item', 'twork-builder' ) }
			</Button>
			<p style={ { marginTop: 8, color: '#757575', fontSize: 12 } }>
				{ __(
					'Edit the wording directly in the canvas.',
					'twork-builder'
				) }
			</p>
		</BaseControl>
	);

	return (
		<>
			<PanelBody
				title={ __( 'Prep Panel — Toggle', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Collapsible on the page', 'twork-builder' ) }
					help={ __(
						'Visitors open and close the panel. Uses native <details>, no JavaScript.',
						'twork-builder'
					) }
					checked={ !! prep.collapsible }
					onChange={ ( val ) => setPrep( { collapsible: val } ) }
				/>

				{ prep.collapsible && (
					<>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Open by default', 'twork-builder' ) }
							checked={ !! prep.defaultOpen }
							onChange={ ( val ) =>
								setPrep( { defaultOpen: val } )
							}
						/>

						<TextControl
							__nextHasNoMarginBottom
							label={ __( 'Toggle Label', 'twork-builder' ) }
							value={ prep.toggleLabel }
							onChange={ ( val ) =>
								setPrep( { toggleLabel: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Toggle Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: prep.toggleLabelColor,
									onChange: ( val ) =>
										setPrep( {
											toggleLabelColor: val || '#f48b2a',
										} ),
									label: __( 'Label Color', 'twork-builder' ),
								},
								{
									value: prep.toggleBackgroundColor,
									onChange: ( val ) =>
										setPrep( {
											toggleBackgroundColor:
												val || '#fff4e8',
										} ),
									label: __(
										'Toggle Background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Toggle Font Size (rem)',
								'twork-builder'
							) }
							value={ prep.toggleFontSize }
							onChange={ ( val ) =>
								setPrep( { toggleFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.6 }
							step={ 0.05 }
						/>

						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Toggle Font Weight',
								'twork-builder'
							) }
							value={ prep.toggleFontWeight }
							onChange={ ( val ) =>
								setPrep( { toggleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</>
				) }

				<hr className="twork-prep-panel-rule" />

				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Title', 'twork-builder' ) }
					checked={ !! prep.showTitle }
					onChange={ ( val ) => setPrep( { showTitle: val } ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Checklist', 'twork-builder' ) }
					checked={ !! prep.showChecklist }
					onChange={ ( val ) => setPrep( { showChecklist: val } ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Highlight Box', 'twork-builder' ) }
					checked={ !! prep.showHighlightBox }
					onChange={ ( val ) => setPrep( { showHighlightBox: val } ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Mascot Image', 'twork-builder' ) }
					checked={ !! prep.showMascot }
					onChange={ ( val ) => setPrep( { showMascot: val } ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Bottom Decoration', 'twork-builder' ) }
					checked={ !! prep.showDecor }
					onChange={ ( val ) => setPrep( { showDecor: val } ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show Card Frame', 'twork-builder' ) }
					checked={ !! prep.showCard }
					onChange={ ( val ) => setPrep( { showCard: val } ) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Prep Panel — Card', 'twork-builder' ) }
				initialOpen={ false }
			>
				<PanelColorSettings
					title={ __( 'Card Background & Border', 'twork-builder' ) }
					colorSettings={ [
						{
							value: prep.cardBackgroundColor,
							onChange: ( val ) =>
								setPrep( {
									cardBackgroundColor: val || '#ffffff',
								} ),
							label: __( 'Background', 'twork-builder' ),
						},
						{
							value: prep.cardBorderColor,
							onChange: ( val ) =>
								setPrep( {
									cardBorderColor: val || '#f0e0d0',
								} ),
							label: __( 'Border', 'twork-builder' ),
						},
					] }
				/>

				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Border Radius (px)', 'twork-builder' ) }
					value={ prep.cardBorderRadius }
					onChange={ ( val ) => setPrep( { cardBorderRadius: val } ) }
					min={ 0 }
					max={ 40 }
					step={ 1 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Card Padding (px)', 'twork-builder' ) }
					value={ prep.cardPadding }
					onChange={ ( val ) => setPrep( { cardPadding: val } ) }
					min={ 0 }
					max={ 80 }
					step={ 2 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Card Padding Mobile (px)', 'twork-builder' ) }
					value={ prep.cardPaddingMobile }
					onChange={ ( val ) =>
						setPrep( { cardPaddingMobile: val } )
					}
					min={ 0 }
					max={ 48 }
					step={ 2 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Prep Panel — Title', 'twork-builder' ) }
				initialOpen={ false }
			>
				<SelectControl
					__nextHasNoMarginBottom
					label={ __( 'Alignment', 'twork-builder' ) }
					value={ prep.titleAlignment }
					options={ [
						{ label: __( 'Left', 'twork-builder' ), value: 'left' },
						{
							label: __( 'Center', 'twork-builder' ),
							value: 'center',
						},
						{
							label: __( 'Right', 'twork-builder' ),
							value: 'right',
						},
					] }
					onChange={ ( val ) => setPrep( { titleAlignment: val } ) }
				/>

				<PanelColorSettings
					title={ __( 'Title Color', 'twork-builder' ) }
					colorSettings={ [
						{
							value: prep.titleColor,
							onChange: ( val ) =>
								setPrep( { titleColor: val || '#f48b2a' } ),
							label: __( 'Title Color', 'twork-builder' ),
						},
					] }
				/>

				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Font Size (rem)', 'twork-builder' ) }
					value={ prep.titleFontSize }
					onChange={ ( val ) => setPrep( { titleFontSize: val } ) }
					min={ 1 }
					max={ 2.6 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Font Size Mobile (rem)', 'twork-builder' ) }
					value={ prep.titleFontSizeMobile }
					onChange={ ( val ) =>
						setPrep( { titleFontSizeMobile: val } )
					}
					min={ 0.9 }
					max={ 2 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Font Weight', 'twork-builder' ) }
					value={ prep.titleFontWeight }
					onChange={ ( val ) => setPrep( { titleFontWeight: val } ) }
					min={ 400 }
					max={ 900 }
					step={ 100 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Line Height', 'twork-builder' ) }
					value={ prep.titleLineHeight }
					onChange={ ( val ) => setPrep( { titleLineHeight: val } ) }
					min={ 1.2 }
					max={ 2.2 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Margin Bottom (px)', 'twork-builder' ) }
					value={ prep.titleMarginBottom }
					onChange={ ( val ) =>
						setPrep( { titleMarginBottom: val } )
					}
					min={ 0 }
					max={ 60 }
					step={ 2 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Prep Panel — Checklist', 'twork-builder' ) }
				initialOpen={ false }
			>
				{ repeater(
					'checklistItems',
					checklistItems,
					__( 'New checklist point', 'twork-builder' )
				) }

				<hr className="twork-prep-panel-rule" />

				<TextControl
					__nextHasNoMarginBottom
					label={ __( 'Item Icon Class', 'twork-builder' ) }
					value={ prep.checklistIcon }
					onChange={ ( val ) => setPrep( { checklistIcon: val } ) }
					help={ __(
						'Font Awesome (fas fa-check-circle) or Dashicons (dashicons dashicons-yes-alt).',
						'twork-builder'
					) }
				/>

				<PanelColorSettings
					title={ __( 'Checklist Colors', 'twork-builder' ) }
					colorSettings={ [
						{
							value: prep.checklistIconColor,
							onChange: ( val ) =>
								setPrep( {
									checklistIconColor: val || '#f48b2a',
								} ),
							label: __( 'Icon Color', 'twork-builder' ),
						},
						{
							value: prep.checklistTextColor,
							onChange: ( val ) =>
								setPrep( {
									checklistTextColor: val || '#333333',
								} ),
							label: __( 'Text Color', 'twork-builder' ),
						},
					] }
				/>

				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Font Size (rem)', 'twork-builder' ) }
					value={ prep.checklistFontSize }
					onChange={ ( val ) =>
						setPrep( { checklistFontSize: val } )
					}
					min={ 0.8 }
					max={ 1.4 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Font Size Mobile (rem)', 'twork-builder' ) }
					value={ prep.checklistFontSizeMobile }
					onChange={ ( val ) =>
						setPrep( { checklistFontSizeMobile: val } )
					}
					min={ 0.75 }
					max={ 1.2 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __(
						'Line Height (Burmese text needs ~1.9)',
						'twork-builder'
					) }
					value={ prep.checklistLineHeight }
					onChange={ ( val ) =>
						setPrep( { checklistLineHeight: val } )
					}
					min={ 1.4 }
					max={ 2.4 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Space Between Items (px)', 'twork-builder' ) }
					value={ prep.checklistItemGap }
					onChange={ ( val ) => setPrep( { checklistItemGap: val } ) }
					min={ 0 }
					max={ 40 }
					step={ 2 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Prep Panel — Highlight Box', 'twork-builder' ) }
				initialOpen={ false }
			>
				{ repeater(
					'highlightItems',
					highlightItems,
					__( 'New service point', 'twork-builder' )
				) }

				<hr className="twork-prep-panel-rule" />

				<TextControl
					__nextHasNoMarginBottom
					label={ __( 'Item Icon Class', 'twork-builder' ) }
					value={ prep.highlightIcon }
					onChange={ ( val ) => setPrep( { highlightIcon: val } ) }
					help={ __(
						'Font Awesome, e.g. fas fa-angle-right',
						'twork-builder'
					) }
				/>

				<PanelColorSettings
					title={ __( 'Highlight Colors', 'twork-builder' ) }
					colorSettings={ [
						{
							value: prep.highlightBackgroundColor,
							onChange: ( val ) =>
								setPrep( {
									highlightBackgroundColor: val || '#f48b2a',
								} ),
							label: __( 'Background', 'twork-builder' ),
						},
						{
							value: prep.highlightTitleColor,
							onChange: ( val ) =>
								setPrep( {
									highlightTitleColor: val || '#ffffff',
								} ),
							label: __( 'Title Color', 'twork-builder' ),
						},
						{
							value: prep.highlightTextColor,
							onChange: ( val ) =>
								setPrep( {
									highlightTextColor: val || '#ffffff',
								} ),
							label: __( 'Text Color', 'twork-builder' ),
						},
					] }
				/>

				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Title Font Size (rem)', 'twork-builder' ) }
					value={ prep.highlightTitleFontSize }
					onChange={ ( val ) =>
						setPrep( { highlightTitleFontSize: val } )
					}
					min={ 0.9 }
					max={ 1.8 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'List Font Size (rem)', 'twork-builder' ) }
					value={ prep.highlightFontSize }
					onChange={ ( val ) =>
						setPrep( { highlightFontSize: val } )
					}
					min={ 0.8 }
					max={ 1.3 }
					step={ 0.05 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Border Radius (px)', 'twork-builder' ) }
					value={ prep.highlightBorderRadius }
					onChange={ ( val ) =>
						setPrep( { highlightBorderRadius: val } )
					}
					min={ 0 }
					max={ 40 }
					step={ 1 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Padding (px)', 'twork-builder' ) }
					value={ prep.highlightPadding }
					onChange={ ( val ) => setPrep( { highlightPadding: val } ) }
					min={ 8 }
					max={ 60 }
					step={ 2 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Padding Mobile (px)', 'twork-builder' ) }
					value={ prep.highlightPaddingMobile }
					onChange={ ( val ) =>
						setPrep( { highlightPaddingMobile: val } )
					}
					min={ 8 }
					max={ 40 }
					step={ 2 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Prep Panel — Mascot Image', 'twork-builder' ) }
				initialOpen={ false }
			>
				{ ! prep.mascotUrl ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setPrep( {
								mascotUrl: media.url,
								mascotId: media.id,
								mascotAlt: media.alt || '',
								mascotNaturalWidth: media.width || undefined,
								mascotNaturalHeight: media.height || undefined,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Mascot image', 'twork-builder' ),
						} }
					/>
				) : (
					<div>
						<img
							src={ prep.mascotUrl }
							alt=""
							style={ {
								width: '100%',
								height: 'auto',
								marginBottom: 10,
								borderRadius: 8,
							} }
						/>

						<TextControl
							__nextHasNoMarginBottom
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ prep.mascotAlt || '' }
							onChange={ ( val ) =>
								setPrep( { mascotAlt: val } )
							}
							help={ __(
								'Leave empty if the image is purely decorative.',
								'twork-builder'
							) }
						/>

						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Display Width (px)',
								'twork-builder'
							) }
							value={ prep.mascotWidth }
							onChange={ ( val ) =>
								setPrep( { mascotWidth: val } )
							}
							min={ 60 }
							max={ 320 }
							step={ 5 }
						/>

						<Button
							variant="secondary"
							size="small"
							onClick={ () =>
								setPrep( {
									mascotUrl: '',
									mascotId: undefined,
									mascotAlt: '',
									mascotNaturalWidth: undefined,
									mascotNaturalHeight: undefined,
								} )
							}
						>
							{ __( 'Remove image', 'twork-builder' ) }
						</Button>
					</div>
				) }
			</PanelBody>

			<PanelBody
				title={ __(
					'Prep Panel — Bottom Decoration',
					'twork-builder'
				) }
				initialOpen={ false }
			>
				{ ! prep.decorUrl ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setPrep( {
								decorUrl: media.url,
								decorId: media.id,
								decorNaturalWidth: media.width || undefined,
								decorNaturalHeight: media.height || undefined,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Decoration strip', 'twork-builder' ),
						} }
					/>
				) : (
					<div>
						<img
							src={ prep.decorUrl }
							alt=""
							style={ {
								width: '100%',
								height: 'auto',
								marginBottom: 10,
							} }
						/>

						<RangeControl
							__nextHasNoMarginBottom
							label={ __( 'Max Width (%)', 'twork-builder' ) }
							value={ prep.decorMaxWidth }
							onChange={ ( val ) =>
								setPrep( { decorMaxWidth: val } )
							}
							min={ 20 }
							max={ 100 }
							step={ 5 }
						/>

						<Button
							variant="secondary"
							size="small"
							onClick={ () =>
								setPrep( {
									decorUrl: '',
									decorId: undefined,
									decorNaturalWidth: undefined,
									decorNaturalHeight: undefined,
								} )
							}
						>
							{ __( 'Remove image', 'twork-builder' ) }
						</Button>
					</div>
				) }
			</PanelBody>
		</>
	);
}
