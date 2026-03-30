import { __, sprintf } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingY,
		containerMaxWidth,
		containerPadding,
		title,
		description,
		showChecklist,
		checklistItems = [],
		buttonLabel,
		buttonUrl,
		imageUrl,
		imageId,
		imageAlt,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-ph-upload-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingY }px`,
				paddingBottom: `${ paddingY }px`,
			},
		} ),
		[ backgroundColor, paddingY ]
	);

	const updateChecklistItem = ( index, value ) => {
		const items = Array.isArray( checklistItems )
			? [ ...checklistItems ]
			: [];
		items[ index ] = value;
		setAttributes( { checklistItems: items } );
	};

	const addChecklistItem = () => {
		const items = Array.isArray( checklistItems )
			? [ ...checklistItems ]
			: [];
		items.push( '' );
		setAttributes( { checklistItems: items } );
	};

	const removeChecklistItem = ( index ) => {
		const items = Array.isArray( checklistItems )
			? [ ...checklistItems ]
			: [];
		items.splice( index, 1 );
		setAttributes( { checklistItems: items } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __(
								'Vertical padding (px)',
								'twork-builder'
							) }
							value={ paddingY }
							onChange={ ( val ) =>
								setAttributes( { paddingY: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RichText
							tagName="h2"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								"Have a Doctor's Prescription?",
								'twork-builder'
							) }
						/>

						<RichText
							tagName="p"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Skip the search. Simply upload your prescription photo…',
								'twork-builder'
							) }
						/>

						<Divider />

						<ToggleControl
							label={ __(
								'Show checklist items',
								'twork-builder'
							) }
							checked={ showChecklist }
							onChange={ ( val ) =>
								setAttributes( { showChecklist: val } )
							}
						/>

						{ showChecklist && (
							<>
								{ ( Array.isArray( checklistItems )
									? checklistItems
									: []
								).map( ( item, index ) => (
									<div
										key={ index }
										style={ {
											display: 'flex',
											gap: '8px',
											marginBottom: '8px',
										} }
									>
										<TextControl
											label={ sprintf(
												/* translators: %d: item index */
												__(
													'Item %d',
													'twork-builder'
												),
												index + 1
											) }
											value={ item }
											onChange={ ( val ) =>
												updateChecklistItem(
													index,
													val
												)
											}
										/>

										<button
											type="button"
											className="components-button is-link is-destructive"
											onClick={ () =>
												removeChecklistItem( index )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</button>
									</div>
								) ) }
								<button
									type="button"
									className="components-button is-secondary is-small"
									onClick={ addChecklistItem }
								>
									{ __( 'Add item', 'twork-builder' ) }
								</button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button label', 'twork-builder' ) }
							value={ buttonLabel }
							onChange={ ( val ) =>
								setAttributes( { buttonLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Button URL (optional)',
								'twork-builder'
							) }
							help={ __(
								'Optional link for the button. Leave empty to handle via JS.',
								'twork-builder'
							) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Right-side image', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ imageUrl ? (
							<>
								<img
									src={ imageUrl }
									alt={ imageAlt }
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: '10px',
									} }
								/>

								<TextControl
									label={ __( 'Alt text', 'twork-builder' ) }
									value={ imageAlt }
									onChange={ ( val ) =>
										setAttributes( { imageAlt: val } )
									}
								/>

								<button
									type="button"
									className="components-button is-secondary is-small"
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: undefined,
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</button>
							</>
						) : (
							<MediaPlaceholder
								onSelect={ ( media ) => {
									if ( ! media ) return;
									setAttributes( {
										imageUrl: media.url || '',
										imageId: media.id || 0,
										imageAlt:
											media.alt || media.title || '',
									} );
								} }
								onSelectURL={ ( url ) =>
									setAttributes( {
										imageUrl: url || '',
										imageId: 0,
									} )
								}
								accept="image/*"
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Prescription image',
										'twork-builder'
									),
								} }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="ph-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div className="ph-upload-section fade-up">
						<div className="ph-upload-grid">
							<div className="ph-upload-content">
								<RichText
									tagName="h2"
									value={ title }
									onChange={ ( val ) =>
										setAttributes( { title: val } )
									}
									placeholder={ __(
										"Have a Doctor's Prescription?",
										'twork-builder'
									) }
									style={ {
										color: '#fff',
										fontSize: '2.5rem',
										marginBottom: '20px',
									} }
								/>

								<RichText
									tagName="p"
									value={ description }
									onChange={ ( val ) =>
										setAttributes( { description: val } )
									}
									placeholder={ __(
										'Skip the search. Simply upload your prescription photo, and our pharmacists will prepare your cart for you.',
										'twork-builder'
									) }
									style={ {
										fontSize: '1.1rem',
										opacity: 0.9,
										marginBottom: '20px',
									} }
								/>

								{ showChecklist &&
									Array.isArray( checklistItems ) && (
										<ul
											style={ {
												listStyle: 'none',
												padding: 0,
												opacity: 0.8,
												marginBottom: '30px',
											} }
										>
											{ checklistItems
												.filter(
													( item ) =>
														item &&
														item.trim() !== ''
												)
												.map( ( item, index ) => (
													<li
														key={ index }
														style={ {
															marginBottom:
																'10px',
														} }
													>
														<i
															className="fas fa-check"
															style={ {
																color: 'var(--ph-primary)',
															} }
															aria-hidden="true"
														/>{ ' ' }
														{ item }
													</li>
												) ) }
										</ul>
									) }

								{ buttonLabel && (
									<a
										className="ph-upload-btn"
										href={ buttonUrl || '#' }
										onClick={ ( e ) => {
											if (
												! buttonUrl ||
												buttonUrl === '#'
											) {
												e.preventDefault();
											}
										} }
									>
										<i
											className="fas fa-camera"
											aria-hidden="true"
										/>{ ' ' }
										{ buttonLabel }
									</a>
								) }
							</div>
							<div>
								{ imageUrl && (
									<img
										src={ imageUrl }
										alt={ imageAlt }
										className="ph-upload-img"
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
