import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	RangeControl,
} from '@wordpress/components';
import {
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { cloneLinkList, createFooterLink } from './footer-data';
import {
	DraggableInspectorCard,
	reorderArray,
	resolveOrder,
	DEFAULT_SECTION_ORDER,
	DEFAULT_COLUMN_ORDER,
} from './footer-dnd';

const SECTION_LABELS = {
	cta: __( 'Emergency CTA', 'twork-builder' ),
	main: __( 'Main Columns', 'twork-builder' ),
	bottom: __( 'Bottom Bar', 'twork-builder' ),
};

const COLUMN_LABELS = {
	brand: __( 'Brand Column', 'twork-builder' ),
	quickLinks: __( 'Quick Links Column', 'twork-builder' ),
	departments: __( 'Departments Column', 'twork-builder' ),
	contact: __( 'Contact Column', 'twork-builder' ),
};

function rowStyle() {
	return {
		display: 'flex',
		gap: '8px',
		flexWrap: 'wrap',
		marginTop: '8px',
	};
}

function LinkListInspector( {
	title,
	items,
	onChange,
	addLabel,
	dragType,
} ) {
	const links = cloneLinkList( items );

	function updateLink( index, patch ) {
		const next = cloneLinkList( links );
		next[ index ] = { ...next[ index ], ...patch };
		onChange( next );
	}

	function addLink() {
		onChange( [ ...links, createFooterLink() ] );
	}

	function removeLink( index ) {
		onChange( links.filter( ( _, itemIndex ) => itemIndex !== index ) );
	}

	function reorderLinks( fromIndex, toIndex ) {
		onChange( reorderArray( links, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ title }</strong>
			<p style={ { margin: '8px 0', color: '#666', fontSize: '12px' } }>
				{ __( 'Drag items to reorder.', 'twork-builder' ) }
			</p>
			{ links.map( ( link, index ) => (
				<DraggableInspectorCard
					key={ `footer-link-${ index }` }
					dragType={ dragType || 'footer-inspector-link' }
					index={ index }
					onReorder={ reorderLinks }
					label={ __( 'Drag link item', 'twork-builder' ) }
				>
					<ToggleControl
						label={ __( 'Show Item', 'twork-builder' ) }
						checked={ link.enabled !== false }
						onChange={ ( value ) =>
							updateLink( index, { enabled: value } )
						}
					/>
					{ link.enabled !== false ? (
						<>
							<TextControl
								label={ __( 'Link Label', 'twork-builder' ) }
								value={ link.label || '' }
								onChange={ ( value ) =>
									updateLink( index, { label: value } )
								}
							/>
							<TextControl
								label={ __( 'Link URL', 'twork-builder' ) }
								value={ link.url || '' }
								onChange={ ( value ) =>
									updateLink( index, { url: value } )
								}
							/>
						</>
					) : null }
					<Button
						variant="secondary"
						isDestructive
						onClick={ () => removeLink( index ) }
					>
						{ __( 'Remove Link', 'twork-builder' ) }
					</Button>
				</DraggableInspectorCard>
			) ) }
			<Button variant="secondary" onClick={ addLink }>
				{ addLabel || __( 'Add Link', 'twork-builder' ) }
			</Button>
		</div>
	);
}

function SocialLinksInspector( { items, onChange } ) {
	const links = cloneLinkList( items );

	function updateLink( index, patch ) {
		const next = links.map( ( item ) => ( { ...item } ) );
		next[ index ] = { ...next[ index ], ...patch };
		onChange( next );
	}

	function reorderLinks( fromIndex, toIndex ) {
		onChange( reorderArray( links, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<p style={ { margin: '0 0 8px', color: '#666', fontSize: '12px' } }>
				{ __( 'Drag social platforms to reorder.', 'twork-builder' ) }
			</p>
			{ links.map( ( link, index ) => (
				<DraggableInspectorCard
					key={ `social-link-${ index }` }
					dragType="footer-inspector-social"
					index={ index }
					onReorder={ reorderLinks }
					label={ __( 'Drag social item', 'twork-builder' ) }
				>
					<ToggleControl
						label={
							link.ariaLabel ||
							link.platform ||
							__( 'Social Link', 'twork-builder' )
						}
						checked={ link.enabled !== false }
						onChange={ ( value ) =>
							updateLink( index, { enabled: value } )
						}
					/>
					{ link.enabled !== false ? (
						<>
							<TextControl
								label={ __( 'Platform URL', 'twork-builder' ) }
								value={ link.url || '' }
								onChange={ ( value ) =>
									updateLink( index, { url: value } )
								}
							/>
							<TextControl
								label={ __( 'Aria Label', 'twork-builder' ) }
								value={ link.ariaLabel || '' }
								onChange={ ( value ) =>
									updateLink( index, { ariaLabel: value } )
								}
							/>
							<TextControl
								label={ __( 'Icon Class', 'twork-builder' ) }
								value={ link.iconClass || '' }
								onChange={ ( value ) =>
									updateLink( index, { iconClass: value } )
								}
								help={ __(
									'Font Awesome icon class, e.g. fab fa-facebook-f',
									'twork-builder'
								) }
							/>
						</>
					) : null }
				</DraggableInspectorCard>
			) ) }
		</div>
	);
}

function OrderListInspector( {
	title,
	help,
	order,
	defaultOrder,
	labels,
	onChange,
	dragType,
} ) {
	const resolvedOrder = resolveOrder( order, defaultOrder );

	function reorderItems( fromIndex, toIndex ) {
		onChange( reorderArray( resolvedOrder, fromIndex, toIndex ) );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ title }</strong>
			{ help ? (
				<p style={ { margin: '8px 0', color: '#666', fontSize: '12px' } }>
					{ help }
				</p>
			) : null }
			{ resolvedOrder.map( ( id, index ) => (
				<DraggableInspectorCard
					key={ `${ dragType }-${ id }` }
					dragType={ dragType }
					index={ index }
					onReorder={ reorderItems }
					label={ labels[ id ] || id }
				>
					<strong style={ { fontSize: '13px' } }>
						{ labels[ id ] || id }
					</strong>
				</DraggableInspectorCard>
			) ) }
		</div>
	);
}

export default function FooterInspectorControls( {
	attributes,
	setAttributes,
} ) {
	const {
		showCtaSection,
		showCtaTitle,
		ctaTitle,
		showCtaDesc,
		ctaDesc,
		showCallButton,
		callButtonText,
		callButtonUrl,
		showAppointmentButton,
		appointmentButtonText,
		appointmentButtonUrl,
		showBrandColumn,
		showLogo,
		logoUrl,
		logoImage,
		logoImageId,
		logoAlt,
		showBrandText,
		brandText,
		showSocialLinks,
		socialLinks,
		showQuickLinksColumn,
		quickLinksHeading,
		quickLinks,
		showDepartmentsColumn,
		departmentsHeading,
		departmentLinks,
		showContactColumn,
		contactHeading,
		showAddress,
		addressLabel,
		addressValue,
		showEmergencyPhone,
		emergencyLabel,
		emergencyPhone,
		showEmail,
		emailLabel,
		emailValue,
		showBottomBar,
		showCopyright,
		copyrightText,
		legalLinks,
		containerMaxWidth,
		footerMarginTop,
		footerPaddingTop,
		sectionOrder,
		columnOrder,
		contactItemOrder,
		ctaButtonOrder,
		brandBlockOrder,
		bottomBarOrder,
	} = attributes;

	function onSelectLogo( media ) {
		if ( ! media || ! media.url ) {
			return;
		}

		setAttributes( {
			logoImage: media.url,
			logoImageId: media.id,
			logoAlt: media.alt || logoAlt,
		} );
	}

	function onRemoveLogo() {
		setAttributes( {
			logoImage: '',
			logoImageId: undefined,
		} );
	}

	return (
		<>
			<PanelBody
				title={ __( 'Drag & Drop Order', 'twork-builder' ) }
				initialOpen={ true }
			>
				<p style={ { marginTop: 0, color: '#666', fontSize: '12px' } }>
					{ __(
						'Drag sections and columns here, or use the grip handles directly in the footer preview.',
						'twork-builder'
					) }
				</p>
				<OrderListInspector
					title={ __( 'Footer Sections', 'twork-builder' ) }
					order={ sectionOrder }
					defaultOrder={ DEFAULT_SECTION_ORDER }
					labels={ SECTION_LABELS }
					onChange={ ( value ) => setAttributes( { sectionOrder: value } ) }
					dragType="footer-inspector-section"
				/>
				<OrderListInspector
					title={ __( 'Main Columns', 'twork-builder' ) }
					order={ columnOrder }
					defaultOrder={ DEFAULT_COLUMN_ORDER }
					labels={ COLUMN_LABELS }
					onChange={ ( value ) => setAttributes( { columnOrder: value } ) }
					dragType="footer-inspector-column"
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Emergency CTA', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show CTA Section', 'twork-builder' ) }
					checked={ showCtaSection !== false }
					onChange={ ( value ) =>
						setAttributes( { showCtaSection: value } )
					}
				/>
				{ showCtaSection !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showCtaTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showCtaTitle: value } )
							}
						/>
						{ showCtaTitle !== false ? (
							<TextControl
								label={ __( 'CTA Title', 'twork-builder' ) }
								value={ ctaTitle }
								onChange={ ( value ) =>
									setAttributes( { ctaTitle: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Description', 'twork-builder' ) }
							checked={ showCtaDesc !== false }
							onChange={ ( value ) =>
								setAttributes( { showCtaDesc: value } )
							}
						/>
						{ showCtaDesc !== false ? (
							<TextControl
								label={ __( 'CTA Description', 'twork-builder' ) }
								value={ ctaDesc }
								onChange={ ( value ) =>
									setAttributes( { ctaDesc: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Call Button', 'twork-builder' ) }
							checked={ showCallButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showCallButton: value } )
							}
						/>
						{ showCallButton !== false ? (
							<>
								<TextControl
									label={ __( 'Call Button Text', 'twork-builder' ) }
									value={ callButtonText }
									onChange={ ( value ) =>
										setAttributes( { callButtonText: value } )
									}
								/>
								<TextControl
									label={ __( 'Call Button URL', 'twork-builder' ) }
									value={ callButtonUrl }
									onChange={ ( value ) =>
										setAttributes( { callButtonUrl: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Appointment Button', 'twork-builder' ) }
							checked={ showAppointmentButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showAppointmentButton: value } )
							}
						/>
						{ showAppointmentButton !== false ? (
							<>
								<TextControl
									label={ __(
										'Appointment Button Text',
										'twork-builder'
									) }
									value={ appointmentButtonText }
									onChange={ ( value ) =>
										setAttributes( {
											appointmentButtonText: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Appointment Button URL',
										'twork-builder'
									) }
									value={ appointmentButtonUrl }
									onChange={ ( value ) =>
										setAttributes( {
											appointmentButtonUrl: value,
										} )
									}
								/>
							</>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Brand Column', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Brand Column', 'twork-builder' ) }
					checked={ showBrandColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showBrandColumn: value } )
					}
				/>
				{ showBrandColumn !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Logo', 'twork-builder' ) }
							checked={ showLogo !== false }
							onChange={ ( value ) =>
								setAttributes( { showLogo: value } )
							}
						/>
						{ showLogo !== false ? (
							<>
								<TextControl
									label={ __( 'Logo Link URL', 'twork-builder' ) }
									value={ logoUrl }
									onChange={ ( value ) =>
										setAttributes( { logoUrl: value } )
									}
								/>
								<TextControl
									label={ __( 'Logo Alt Text', 'twork-builder' ) }
									value={ logoAlt }
									onChange={ ( value ) =>
										setAttributes( { logoAlt: value } )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ onSelectLogo }
										allowedTypes={ [ 'image' ] }
										value={ logoImageId }
										render={ ( { open } ) => (
											<div style={ { marginTop: '12px' } }>
												{ logoImage ? (
													<img
														src={ logoImage }
														alt={ logoAlt }
														style={ {
															maxWidth: '160px',
															marginBottom: '12px',
															display: 'block',
														} }
													/>
												) : null }
												<div style={ rowStyle() }>
													<Button
														variant="secondary"
														onClick={ open }
													>
														{ logoImage
															? __(
																	'Replace Logo',
																	'twork-builder'
															  )
															: __(
																	'Upload Logo',
																	'twork-builder'
															  ) }
													</Button>
													{ logoImage ? (
														<Button
															variant="link"
															isDestructive
															onClick={ onRemoveLogo }
														>
															{ __(
																'Remove Logo',
																'twork-builder'
															) }
														</Button>
													) : null }
												</div>
											</div>
										) }
									/>
								</MediaUploadCheck>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Brand Text', 'twork-builder' ) }
							checked={ showBrandText !== false }
							onChange={ ( value ) =>
								setAttributes( { showBrandText: value } )
							}
						/>
						{ showBrandText !== false ? (
							<TextControl
								label={ __( 'Brand Description', 'twork-builder' ) }
								value={ brandText }
								onChange={ ( value ) =>
									setAttributes( { brandText: value } )
								}
							/>
						) : null }
						<ToggleControl
							label={ __( 'Show Social Links', 'twork-builder' ) }
							checked={ showSocialLinks !== false }
							onChange={ ( value ) =>
								setAttributes( { showSocialLinks: value } )
							}
						/>
						{ showSocialLinks !== false ? (
							<SocialLinksInspector
								items={ socialLinks }
								onChange={ ( value ) =>
									setAttributes( { socialLinks: value } )
								}
							/>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Quick Links', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Quick Links Column', 'twork-builder' ) }
					checked={ showQuickLinksColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showQuickLinksColumn: value } )
					}
				/>
				{ showQuickLinksColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'twork-builder' ) }
							value={ quickLinksHeading }
							onChange={ ( value ) =>
								setAttributes( { quickLinksHeading: value } )
							}
						/>
						<LinkListInspector
							title={ __( 'Quick Link Items', 'twork-builder' ) }
							items={ quickLinks }
							onChange={ ( value ) =>
								setAttributes( { quickLinks: value } )
							}
							dragType="footer-inspector-quick-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Departments', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Departments Column', 'twork-builder' ) }
					checked={ showDepartmentsColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showDepartmentsColumn: value } )
					}
				/>
				{ showDepartmentsColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'twork-builder' ) }
							value={ departmentsHeading }
							onChange={ ( value ) =>
								setAttributes( { departmentsHeading: value } )
							}
						/>
						<LinkListInspector
							title={ __( 'Department Link Items', 'twork-builder' ) }
							items={ departmentLinks }
							onChange={ ( value ) =>
								setAttributes( { departmentLinks: value } )
							}
							dragType="footer-inspector-department-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Contact Column', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Contact Column', 'twork-builder' ) }
					checked={ showContactColumn !== false }
					onChange={ ( value ) =>
						setAttributes( { showContactColumn: value } )
					}
				/>
				{ showContactColumn !== false ? (
					<>
						<TextControl
							label={ __( 'Column Heading', 'twork-builder' ) }
							value={ contactHeading }
							onChange={ ( value ) =>
								setAttributes( { contactHeading: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Address', 'twork-builder' ) }
							checked={ showAddress !== false }
							onChange={ ( value ) =>
								setAttributes( { showAddress: value } )
							}
						/>
						{ showAddress !== false ? (
							<>
								<TextControl
									label={ __( 'Address Label', 'twork-builder' ) }
									value={ addressLabel }
									onChange={ ( value ) =>
										setAttributes( { addressLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Address', 'twork-builder' ) }
									value={ addressValue }
									onChange={ ( value ) =>
										setAttributes( { addressValue: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Emergency Phone', 'twork-builder' ) }
							checked={ showEmergencyPhone !== false }
							onChange={ ( value ) =>
								setAttributes( { showEmergencyPhone: value } )
							}
						/>
						{ showEmergencyPhone !== false ? (
							<>
								<TextControl
									label={ __( 'Emergency Label', 'twork-builder' ) }
									value={ emergencyLabel }
									onChange={ ( value ) =>
										setAttributes( { emergencyLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Emergency Phone', 'twork-builder' ) }
									value={ emergencyPhone }
									onChange={ ( value ) =>
										setAttributes( { emergencyPhone: value } )
									}
								/>
							</>
						) : null }
						<ToggleControl
							label={ __( 'Show Email', 'twork-builder' ) }
							checked={ showEmail !== false }
							onChange={ ( value ) =>
								setAttributes( { showEmail: value } )
							}
						/>
						{ showEmail !== false ? (
							<>
								<TextControl
									label={ __( 'Email Label', 'twork-builder' ) }
									value={ emailLabel }
									onChange={ ( value ) =>
										setAttributes( { emailLabel: value } )
									}
								/>
								<TextControl
									label={ __( 'Email Address', 'twork-builder' ) }
									value={ emailValue }
									onChange={ ( value ) =>
										setAttributes( { emailValue: value } )
									}
								/>
							</>
						) : null }
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Bottom Bar', 'twork-builder' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Bottom Bar', 'twork-builder' ) }
					checked={ showBottomBar !== false }
					onChange={ ( value ) =>
						setAttributes( { showBottomBar: value } )
					}
				/>
				{ showBottomBar !== false ? (
					<>
						<ToggleControl
							label={ __( 'Show Copyright', 'twork-builder' ) }
							checked={ showCopyright !== false }
							onChange={ ( value ) =>
								setAttributes( { showCopyright: value } )
							}
						/>
						{ showCopyright !== false ? (
							<TextControl
								label={ __( 'Copyright Text', 'twork-builder' ) }
								value={ copyrightText }
								onChange={ ( value ) =>
									setAttributes( { copyrightText: value } )
								}
							/>
						) : null }
						<LinkListInspector
							title={ __( 'Legal Links', 'twork-builder' ) }
							items={ legalLinks }
							onChange={ ( value ) =>
								setAttributes( { legalLinks: value } )
							}
							addLabel={ __( 'Add Legal Link', 'twork-builder' ) }
							dragType="footer-inspector-legal-link"
						/>
					</>
				) : null }
			</PanelBody>

			<PanelBody
				title={ __( 'Layout', 'twork-builder' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Container Max Width (px)', 'twork-builder' ) }
					value={ containerMaxWidth }
					onChange={ ( value ) =>
						setAttributes( { containerMaxWidth: value } )
					}
					min={ 960 }
					max={ 1440 }
				/>
				<RangeControl
					label={ __( 'Footer Margin Top (px)', 'twork-builder' ) }
					value={ footerMarginTop }
					onChange={ ( value ) =>
						setAttributes( { footerMarginTop: value } )
					}
					min={ 0 }
					max={ 200 }
					help={ __(
						'Increase if floating CTA overlaps content above.',
						'twork-builder'
					) }
				/>
				<RangeControl
					label={ __( 'Footer Padding Top (px)', 'twork-builder' ) }
					value={ footerPaddingTop }
					onChange={ ( value ) =>
						setAttributes( { footerPaddingTop: value } )
					}
					min={ 0 }
					max={ 220 }
				/>
			</PanelBody>
		</>
	);
}
