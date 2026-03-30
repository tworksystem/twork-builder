import { __, sprintf } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const DEFAULT_FEATURES = [ '', '', '' ];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionBackground,
		paddingTop,
		paddingBottom,
		sectionTitle,
		sectionSubtitle,
		activeTabId,
		tabs = [],
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-section twork-rad-diagnostic-tabs',
			style: {
				background: sectionBackground,
				paddingTop,
				paddingBottom,
			},
		} ),
		[ paddingBottom, paddingTop, sectionBackground ]
	);

	const [ localActiveTab, setLocalActiveTab ] = useState(
		activeTabId || ( tabs[ 0 ] && tabs[ 0 ].id ) || ''
	);

	const updateTabs = ( newTabs ) => {
		setAttributes( { tabs: newTabs } );
	};

	const updateTabField = ( index, field, value ) => {
		const newTabs = [ ...tabs ];
		newTabs[ index ] = {
			...newTabs[ index ],
			[ field ]: value,
		};
		updateTabs( newTabs );
	};

	const updateTabFeature = ( tabIndex, featureIndex, value ) => {
		const newTabs = [ ...tabs ];
		const existingFeatures =
			newTabs[ tabIndex ]?.features &&
			Array.isArray( newTabs[ tabIndex ].features )
				? [ ...newTabs[ tabIndex ].features ]
				: [ ...DEFAULT_FEATURES ];

		existingFeatures[ featureIndex ] = value;
		newTabs[ tabIndex ] = {
			...newTabs[ tabIndex ],
			features: existingFeatures,
		};
		updateTabs( newTabs );
	};

	const addTab = () => {
		const idBase = 'tab';
		let counter = tabs.length + 1;
		let newId = `${ idBase }-${ counter }`;
		const existingIds = new Set( tabs.map( ( t ) => t.id ) );
		while ( existingIds.has( newId ) ) {
			counter += 1;
			newId = `${ idBase }-${ counter }`;
		}

		const newTab = {
			id: newId,
			label: __( 'New Tab', 'twork-builder' ),
			iconClass: 'fas fa-chevron-right',
			imageUrl: '',
			imageId: 0,
			imageAlt: '',
			paneTitle: __( 'New Modality', 'twork-builder' ),
			description: '',
			features: [ ...DEFAULT_FEATURES ],
		};

		const newTabs = [ ...tabs, newTab ];
		updateTabs( newTabs );

		if ( ! localActiveTab ) {
			setLocalActiveTab( newId );
			setAttributes( { activeTabId: newId } );
		}
	};

	const removeTab = ( index ) => {
		const newTabs = tabs.filter( ( _, i ) => i !== index );
		updateTabs( newTabs );

		if ( newTabs.length === 0 ) {
			setLocalActiveTab( '' );
			setAttributes( { activeTabId: '' } );
			return;
		}

		if (
			! localActiveTab ||
			! newTabs.some( ( t ) => t.id === localActiveTab )
		) {
			const fallbackId = newTabs[ 0 ].id;
			setLocalActiveTab( fallbackId );
			setAttributes( { activeTabId: fallbackId } );
		}
	};

	const handleTabClick = ( tabId ) => {
		setLocalActiveTab( tabId );
		setAttributes( { activeTabId: tabId } );
	};

	const currentActiveId =
		localActiveTab || activeTabId || ( tabs[ 0 ] && tabs[ 0 ].id ) || '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Background Color', 'twork-builder' ) }
							help={ __(
								'CSS color value. Example: #fafafa or rgba(0,0,0,0.05).',
								'twork-builder'
							) }
							value={ sectionBackground }
							onChange={ ( val ) =>
								setAttributes( { sectionBackground: val } )
							}
						/>

						<TextControl
							label={ __( 'Padding Top', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
						/>

						<TextControl
							label={ __( 'Padding Bottom', 'twork-builder' ) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Tabs Configuration', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ tabs && tabs.length > 0 ? (
							tabs.map( ( tab, index ) => (
								<BaseControl
									key={ tab.id || index }
									label={ sprintf(
										/* translators: %d: Tab index */
										__( 'Tab %d', 'twork-builder' ),
										index + 1
									) }
									className="twork-rad-tabs-tab-panel"
								>
									<TextControl
										label={ __(
											'Tab ID (slug)',
											'twork-builder'
										) }
										help={ __(
											'Used for linking button to content. Keep unique and lowercase.',
											'twork-builder'
										) }
										value={ tab.id }
										onChange={ ( val ) =>
											updateTabField(
												index,
												'id',
												val || ''
											)
										}
									/>

									<TextControl
										label={ __(
											'Button Label',
											'twork-builder'
										) }
										value={ tab.label }
										onChange={ ( val ) =>
											updateTabField(
												index,
												'label',
												val
											)
										}
									/>

									<TextControl
										label={ __(
											'Button Icon Class',
											'twork-builder'
										) }
										help={ __(
											'Font Awesome class, e.g. "fas fa-chevron-right".',
											'twork-builder'
										) }
										value={ tab.iconClass }
										onChange={ ( val ) =>
											updateTabField(
												index,
												'iconClass',
												val
											)
										}
									/>

									<TextControl
										label={ __(
											'Pane Title',
											'twork-builder'
										) }
										value={ tab.paneTitle }
										onChange={ ( val ) =>
											updateTabField(
												index,
												'paneTitle',
												val
											)
										}
									/>

									<TextControl
										label={ __(
											'Short Description',
											'twork-builder'
										) }
										value={ tab.description }
										onChange={ ( val ) =>
											updateTabField(
												index,
												'description',
												val
											)
										}
									/>

									<BaseControl
										label={ __(
											'Pane Image',
											'twork-builder'
										) }
										help={ __(
											'Upload or select an image for this modality.',
											'twork-builder'
										) }
									>
										<MediaPlaceholder
											onSelect={ ( media ) => {
												if ( ! media ) return;
												updateTabField(
													index,
													'imageUrl',
													media.url || ''
												);
												updateTabField(
													index,
													'imageId',
													media.id || 0
												);
												updateTabField(
													index,
													'imageAlt',
													media.alt ||
														media.title ||
														''
												);
											} }
											onSelectURL={ ( url ) =>
												updateTabField(
													index,
													'imageUrl',
													url || ''
												)
											}
											accept="image/*"
											allowedTypes={ [ 'image' ] }
											mediaId={ tab.imageId }
											mediaURL={ tab.imageUrl }
											labels={ {
												title: __(
													'Select or upload tab image',
													'twork-builder'
												),
											} }
										/>
									</BaseControl>

									<BaseControl
										label={ __(
											'Feature List Items',
											'twork-builder'
										) }
										help={ __(
											'Up to 3 bullet points shown below the description.',
											'twork-builder'
										) }
									>
										{ ( tab.features && tab.features.length
											? tab.features
											: DEFAULT_FEATURES
										).map( ( feature, featureIndex ) => (
											<TextControl
												key={ featureIndex }
												label={ sprintf(
													/* translators: %d: Feature index */
													__(
														'Feature %d',
														'twork-builder'
													),
													featureIndex + 1
												) }
												value={ feature }
												onChange={ ( val ) =>
													updateTabFeature(
														index,
														featureIndex,
														val
													)
												}
											/>
										) ) }
									</BaseControl>

									<div style={ { marginTop: '10px' } }>
										<Button
											variant="link"
											isDestructive
											onClick={ () => removeTab( index ) }
										>
											{ __(
												'Remove this tab',
												'twork-builder'
											) }
										</Button>
									</div>
								</BaseControl>
							) )
						) : (
							<p>
								{ __(
									'No tabs configured yet. Use "Add Tab" below to create one.',
									'twork-builder'
								) }
							</p>
						) }

						<Button variant="primary" onClick={ addTab }>
							{ __( 'Add Tab', 'twork-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="rad-container">
					<div className="rad-header fade-up">
						<RichText
							tagName="h2"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'Diagnostic Services',
								'twork-builder'
							) }
						/>

						<RichText
							tagName="p"
							value={ sectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { sectionSubtitle: val } )
							}
							placeholder={ __(
								'Select a modality to learn more about our capabilities.',
								'twork-builder'
							) }
						/>
					</div>

					<div className="rad-tabs-container">
						<div className="rad-tab-menu stagger-up">
							{ tabs &&
								tabs.map( ( tab ) => (
									<button
										key={ tab.id }
										type="button"
										className={
											'rad-tab-btn' +
											( tab.id === currentActiveId
												? ' active'
												: '' )
										}
										onClick={ () =>
											handleTabClick( tab.id )
										}
									>
										<span>{ tab.label }</span>
										<i
											className={
												tab.iconClass ||
												'fas fa-chevron-right'
											}
										/>
									</button>
								) ) }
						</div>

						<div className="rad-tab-content-area stagger-up">
							{ tabs &&
								tabs.map( ( tab ) => {
									const featuresToShow =
										tab.features && tab.features.length
											? tab.features.filter(
													( item ) =>
														item &&
														item.trim() !== ''
											  )
											: [];

									return (
										<div
											key={ tab.id }
											className={
												'rad-tab-pane' +
												( tab.id === currentActiveId
													? ' active'
													: '' )
											}
										>
											{ tab.imageUrl && (
												<img
													src={ tab.imageUrl }
													alt={ tab.imageAlt || '' }
													className="rad-pane-img"
												/>
											) }
											<h3 className="rad-pane-title">
												{ tab.paneTitle }
											</h3>
											{ tab.description && (
												<p>{ tab.description }</p>
											) }
											{ featuresToShow.length > 0 && (
												<ul className="rad-pane-list">
													{ featuresToShow.map(
														( item, idx ) => (
															<li key={ idx }>
																{ item }
															</li>
														)
													) }
												</ul>
											) }
										</div>
									);
								} ) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
