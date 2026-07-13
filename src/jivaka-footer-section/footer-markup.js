import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import {
	resolveLinkList,
	resolveSocialLinks,
	cloneLinkList,
	updateLinkListItem,
	DEFAULT_QUICK_LINKS,
	DEFAULT_DEPARTMENT_LINKS,
	DEFAULT_LEGAL_LINKS,
} from './footer-data';
import {
	FooterShell,
	resolveOrder,
	reorderArray,
	reorderIds,
	reorderVisibleIndices,
	DEFAULT_SECTION_ORDER,
	DEFAULT_COLUMN_ORDER,
	DEFAULT_CONTACT_ITEM_ORDER,
	DEFAULT_CTA_BUTTON_ORDER,
	DEFAULT_BRAND_BLOCK_ORDER,
	DEFAULT_BOTTOM_BAR_ORDER,
} from './footer-dnd';

function EditableText( {
	tagName: Tag = 'span',
	className,
	value,
	attribute,
	setAttributes,
	isEditor,
	placeholder,
	multiline = false,
} ) {
	if ( isEditor && setAttributes && attribute ) {
		const effectiveMultiline =
			multiline && String( Tag ) !== String( multiline )
				? multiline
				: false;

		return (
			<RichText
				tagName={ Tag }
				className={ className }
				value={ value || '' }
				onChange={ ( nextValue ) =>
					setAttributes( { [ attribute ]: nextValue } )
				}
				placeholder={ placeholder }
				allowedFormats={ [] }
				multiline={ effectiveMultiline }
				disableInteractiveFormatting
			/>
		);
	}

	if ( ! value ) {
		return null;
	}

	return <Tag className={ className }>{ value }</Tag>;
}

function getSourceLinks( links, fallbackLinks ) {
	if ( Array.isArray( links ) && links.length > 0 ) {
		return cloneLinkList( links );
	}

	return cloneLinkList( fallbackLinks );
}

function FooterLinkList( {
	links,
	linkClassName,
	isEditor,
	legacySave = false,
	setAttributes,
	linksAttribute,
	fallbackLinks,
} ) {
	const sourceLinks = getSourceLinks( links, fallbackLinks );
	const visibleEntries = sourceLinks
		.map( ( link, index ) => ( { link, index } ) )
		.filter( ( entry ) => entry.link.enabled !== false );

	if ( visibleEntries.length === 0 ) {
		return null;
	}

	function reorderLinks( fromVisibleIndex, toVisibleIndex ) {
		setAttributes( {
			[ linksAttribute ]: reorderVisibleIndices(
				sourceLinks,
				fromVisibleIndex,
				toVisibleIndex,
				( item ) => item.enabled !== false
			),
		} );
	}

	return (
		<ul className="jivaka-footer__list">
			{ visibleEntries.map( ( { link, index }, visibleIndex ) => (
				<FooterShell
					key={ `${ linksAttribute }-${ index }` }
					isEditor={ isEditor }
					legacySave={ legacySave }
					editorTagName="li"
					saveTagName="li"
					editorClassName="jivaka-footer__list-item"
					saveClassName="jivaka-footer__list-item"
					dragType={ `footer-link-${ linksAttribute }` }
					index={ visibleIndex }
					onReorder={ reorderLinks }
					label={ __( 'Drag link item', 'twork-builder' ) }
				>
					{ isEditor && setAttributes && linksAttribute ? (
						<span className={ linkClassName }>
							<i
								className="fas fa-chevron-right"
								aria-hidden="true"
							></i>{ ' ' }
							<RichText
								tagName="span"
								value={ link.label || '' }
								onChange={ ( label ) =>
									setAttributes( {
										[ linksAttribute ]: updateLinkListItem(
											sourceLinks,
											index,
											{ label }
										),
									} )
								}
								placeholder={ __( 'Link label', 'twork-builder' ) }
								allowedFormats={ [] }
								disableInteractiveFormatting
							/>
						</span>
					) : (
						<a href={ link.url || '#' } className={ linkClassName }>
							<i
								className="fas fa-chevron-right"
								aria-hidden="true"
							></i>{ ' ' }
							{ link.label }
						</a>
					) }
				</FooterShell>
			) ) }
		</ul>
	);
}

export default function FooterMarkup( props ) {
	const {
		isEditor = false,
		legacySave = false,
		setAttributes,
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
		footerMarginTop,
		footerPaddingTop,
		sectionOrder,
		columnOrder,
		contactItemOrder,
		ctaButtonOrder,
		brandBlockOrder,
		bottomBarOrder,
	} = props;

	const resolvedQuickLinks = resolveLinkList( quickLinks, DEFAULT_QUICK_LINKS );
	const resolvedDepartmentLinks = resolveLinkList(
		departmentLinks,
		DEFAULT_DEPARTMENT_LINKS
	);
	const resolvedLegalLinks = resolveLinkList( legalLinks, DEFAULT_LEGAL_LINKS );
	const sourceLegalLinks = getSourceLinks( legalLinks, DEFAULT_LEGAL_LINKS );
	const sourceSocialLinks = getSourceLinks( socialLinks, resolveSocialLinks( socialLinks ) );

	const orderedSections = resolveOrder( sectionOrder, DEFAULT_SECTION_ORDER );
	const orderedColumns = resolveOrder( columnOrder, DEFAULT_COLUMN_ORDER );
	const orderedContactItems = resolveOrder(
		contactItemOrder,
		DEFAULT_CONTACT_ITEM_ORDER
	);
	const orderedCtaButtons = resolveOrder(
		ctaButtonOrder,
		DEFAULT_CTA_BUTTON_ORDER
	);
	const orderedBrandBlocks = resolveOrder(
		brandBlockOrder,
		DEFAULT_BRAND_BLOCK_ORDER
	);
	const orderedBottomBarItems = resolveOrder(
		bottomBarOrder,
		DEFAULT_BOTTOM_BAR_ORDER
	);

	const hasMainGrid =
		showBrandColumn !== false ||
		showQuickLinksColumn !== false ||
		showDepartmentsColumn !== false ||
		showContactColumn !== false;

	const showCtaActions =
		showCallButton !== false || showAppointmentButton !== false;

	const showCtaContent =
		showCtaTitle !== false || showCtaDesc !== false;

	const footerStyle = {
		marginTop:
			footerMarginTop != null ? `${ footerMarginTop }px` : undefined,
		paddingTop:
			footerPaddingTop != null ? `${ footerPaddingTop }px` : undefined,
	};

	const legalVisibleEntries = sourceLegalLinks
		.map( ( link, index ) => ( { link, index } ) )
		.filter( ( entry ) => entry.link.enabled !== false );

	function reorderSections( fromIndex, toIndex ) {
		const visibleSections = orderedSections.filter( ( id ) =>
			isSectionVisible( id )
		);
		const fromId = visibleSections[ fromIndex ];
		const toId = visibleSections[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			sectionOrder: reorderIds( orderedSections, fromId, toId ),
		} );
	}

	function reorderColumns( fromIndex, toIndex ) {
		const visibleColumns = orderedColumns.filter( ( id ) =>
			isColumnVisible( id )
		);
		const fromId = visibleColumns[ fromIndex ];
		const toId = visibleColumns[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			columnOrder: reorderIds( orderedColumns, fromId, toId ),
		} );
	}

	function reorderContactItems( fromIndex, toIndex ) {
		const visibleItems = orderedContactItems.filter( ( id ) =>
			isContactItemVisible( id )
		);
		const fromId = visibleItems[ fromIndex ];
		const toId = visibleItems[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			contactItemOrder: reorderIds( orderedContactItems, fromId, toId ),
		} );
	}

	function reorderCtaButtons( fromIndex, toIndex ) {
		const visibleButtons = orderedCtaButtons.filter( ( id ) =>
			isCtaButtonVisible( id )
		);
		const fromId = visibleButtons[ fromIndex ];
		const toId = visibleButtons[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			ctaButtonOrder: reorderIds( orderedCtaButtons, fromId, toId ),
		} );
	}

	function reorderBrandBlocks( fromIndex, toIndex ) {
		const visibleBlocks = orderedBrandBlocks.filter( ( id ) =>
			isBrandBlockVisible( id )
		);
		const fromId = visibleBlocks[ fromIndex ];
		const toId = visibleBlocks[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			brandBlockOrder: reorderIds( orderedBrandBlocks, fromId, toId ),
		} );
	}

	function reorderBottomBarItems( fromIndex, toIndex ) {
		const visibleItems = orderedBottomBarItems.filter( ( id ) =>
			isBottomBarItemVisible( id )
		);
		const fromId = visibleItems[ fromIndex ];
		const toId = visibleItems[ toIndex ];

		if ( ! fromId || ! toId ) {
			return;
		}

		setAttributes( {
			bottomBarOrder: reorderIds( orderedBottomBarItems, fromId, toId ),
		} );
	}

	function reorderSocialLinks( fromIndex, toIndex ) {
		setAttributes( {
			socialLinks: reorderVisibleIndices(
				sourceSocialLinks,
				fromIndex,
				toIndex,
				( item ) => item.enabled !== false
			),
		} );
	}

	function reorderLegalLinks( fromVisibleIndex, toVisibleIndex ) {
		setAttributes( {
			legalLinks: reorderVisibleIndices(
				sourceLegalLinks,
				fromVisibleIndex,
				toVisibleIndex,
				( item ) => item.enabled !== false
			),
		} );
	}

	function isSectionVisible( id ) {
		if ( id === 'cta' ) {
			return showCtaSection !== false;
		}
		if ( id === 'main' ) {
			return hasMainGrid;
		}
		if ( id === 'bottom' ) {
			return showBottomBar !== false;
		}
		return false;
	}

	function isColumnVisible( id ) {
		if ( id === 'brand' ) {
			return showBrandColumn !== false;
		}
		if ( id === 'quickLinks' ) {
			return showQuickLinksColumn !== false;
		}
		if ( id === 'departments' ) {
			return showDepartmentsColumn !== false;
		}
		if ( id === 'contact' ) {
			return showContactColumn !== false;
		}
		return false;
	}

	function isContactItemVisible( id ) {
		if ( id === 'address' ) {
			return showAddress !== false;
		}
		if ( id === 'emergency' ) {
			return showEmergencyPhone !== false;
		}
		if ( id === 'email' ) {
			return showEmail !== false;
		}
		return false;
	}

	function isCtaButtonVisible( id ) {
		if ( id === 'call' ) {
			return showCallButton !== false;
		}
		if ( id === 'appointment' ) {
			return showAppointmentButton !== false;
		}
		return false;
	}

	function isBrandBlockVisible( id ) {
		if ( id === 'logo' ) {
			return showLogo !== false && !! logoImage;
		}
		if ( id === 'text' ) {
			return showBrandText !== false;
		}
		if ( id === 'social' ) {
			return (
				showSocialLinks !== false &&
				sourceSocialLinks.some( ( link ) => link.enabled !== false )
			);
		}
		return false;
	}

	function isBottomBarItemVisible( id ) {
		if ( id === 'copyright' ) {
			return showCopyright !== false;
		}
		if ( id === 'legal' ) {
			return legalVisibleEntries.length > 0;
		}
		return false;
	}

	function renderCtaButton( id, buttonIndex ) {
		if ( id === 'call' && showCallButton !== false ) {
			return (
				<FooterShell
					key="call"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-cta-button"
					index={ buttonIndex }
					onReorder={ reorderCtaButtons }
					editorClassName="jivaka-footer__cta-button-wrap"
					savePassthrough
					label={ __( 'Drag call button', 'twork-builder' ) }
				>
					{ isEditor ? (
						<span className="jivaka-btn jivaka-btn--white">
							<i
								className="fas fa-phone-alt"
								aria-hidden="true"
							></i>{ ' ' }
							<RichText
								tagName="span"
								value={ callButtonText || '' }
								onChange={ ( nextValue ) =>
									setAttributes( {
										callButtonText: nextValue,
									} )
								}
								placeholder={ __(
									'Call 09-789 101 101',
									'twork-builder'
								) }
								allowedFormats={ [] }
								disableInteractiveFormatting
							/>
						</span>
					) : callButtonText ? (
						<a
							href={ callButtonUrl || 'tel:09789101101' }
							className="jivaka-btn jivaka-btn--white"
						>
							<i
								className="fas fa-phone-alt"
								aria-hidden="true"
							></i>{ ' ' }
							{ callButtonText }
						</a>
					) : null }
				</FooterShell>
			);
		}

		if ( id === 'appointment' && showAppointmentButton !== false ) {
			return (
				<FooterShell
					key="appointment"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-cta-button"
					index={ buttonIndex }
					onReorder={ reorderCtaButtons }
					editorClassName="jivaka-footer__cta-button-wrap"
					savePassthrough
					label={ __( 'Drag appointment button', 'twork-builder' ) }
				>
					{ isEditor ? (
						<span className="jivaka-btn jivaka-btn--outline">
							<RichText
								tagName="span"
								value={ appointmentButtonText || '' }
								onChange={ ( nextValue ) =>
									setAttributes( {
										appointmentButtonText: nextValue,
									} )
								}
								placeholder={ __(
									'Book Appointment',
									'twork-builder'
								) }
								allowedFormats={ [] }
								disableInteractiveFormatting
							/>
						</span>
					) : appointmentButtonText ? (
						<a
							href={ appointmentButtonUrl || 'appointment' }
							className="jivaka-btn jivaka-btn--outline"
						>
							{ appointmentButtonText }
						</a>
					) : null }
				</FooterShell>
			);
		}

		return null;
	}

	function renderBrandBlock( id, blockIndex ) {
		if ( id === 'logo' && showLogo !== false && logoImage ) {
			return (
				<FooterShell
					key="logo"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-brand-block"
					index={ blockIndex }
					onReorder={ reorderBrandBlocks }
					editorClassName="jivaka-footer__brand-block"
					savePassthrough
					label={ __( 'Drag logo block', 'twork-builder' ) }
				>
					<a
						href={ logoUrl || 'index.html' }
						className="jivaka-footer__brand-link"
						onClick={
							isEditor
								? ( event ) => event.preventDefault()
								: undefined
						}
					>
						<img
							src={ logoImage }
							alt={ logoAlt || 'Jivaka Logo' }
							className="jivaka-footer__logo"
						/>
					</a>
				</FooterShell>
			);
		}

		if ( id === 'text' && showBrandText !== false ) {
			return (
				<FooterShell
					key="text"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-brand-block"
					index={ blockIndex }
					onReorder={ reorderBrandBlocks }
					editorClassName="jivaka-footer__brand-block"
					savePassthrough
					label={ __( 'Drag brand text', 'twork-builder' ) }
				>
					<EditableText
						tagName="p"
						className="jivaka-footer__text"
						value={ brandText }
						attribute="brandText"
						setAttributes={ setAttributes }
						isEditor={ isEditor }
						placeholder={ __(
							'Jivaka Hospital is committed to providing world-class healthcare with compassion.',
							'twork-builder'
						) }
						multiline="p"
					/>
				</FooterShell>
			);
		}

		if ( id === 'social' && showSocialLinks !== false ) {
			const visibleSocial = sourceSocialLinks.filter(
				( link ) => link.enabled !== false
			);

			if ( visibleSocial.length === 0 ) {
				return null;
			}

			return (
				<FooterShell
					key="social"
					isEditor={ isEditor }
					legacySave={ legacySave && ! isEditor }
					dragType="footer-brand-block"
					index={ blockIndex }
					onReorder={ reorderBrandBlocks }
					editorClassName="jivaka-footer__brand-block"
					saveClassName={
						! isEditor && ! legacySave
							? 'jivaka-footer__social'
							: undefined
					}
					savePassthrough={ isEditor || legacySave }
					label={ __( 'Drag social links block', 'twork-builder' ) }
				>
					{ isEditor || legacySave ? (
						<div className="jivaka-footer__social">
							{ visibleSocial.map( ( link, socialIndex ) => (
								<FooterShell
									key={ `${ link.platform }-${ socialIndex }` }
									isEditor={ isEditor }
									legacySave={ legacySave && ! isEditor }
									dragType="footer-social-link"
									index={ socialIndex }
									onReorder={ reorderSocialLinks }
									editorClassName="jivaka-footer__social-item"
									savePassthrough={ ! legacySave }
									label={ __(
										'Drag social icon',
										'twork-builder'
									) }
								>
									<a
										href={ link.url || '#' }
										className="jivaka-footer__social-link"
										target="_blank"
										rel="noopener noreferrer"
										aria-label={ link.ariaLabel }
										onClick={
											isEditor
												? ( event ) =>
														event.preventDefault()
												: undefined
										}
									>
										<i
											className={ link.iconClass }
											aria-hidden="true"
										></i>
									</a>
								</FooterShell>
							) ) }
						</div>
					) : (
						visibleSocial.map( ( link, socialIndex ) => (
							<a
								key={ `${ link.platform }-${ socialIndex }` }
								href={ link.url || '#' }
								className="jivaka-footer__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={ link.ariaLabel }
							>
								<i
									className={ link.iconClass }
									aria-hidden="true"
								></i>
							</a>
						) )
					) }
				</FooterShell>
			);
		}

		return null;
	}

	function renderContactItem( id, itemIndex ) {
		if ( id === 'address' && showAddress !== false ) {
			return (
				<FooterShell
					key="address"
					isEditor={ isEditor }
					legacySave={ legacySave }
					editorTagName="li"
					saveTagName="li"
					dragType="footer-contact-item"
					index={ itemIndex }
					onReorder={ reorderContactItems }
					editorClassName="jivaka-footer__contact-item jivaka-footer__draggable-contact"
					saveClassName="jivaka-footer__contact-item"
					label={ __( 'Drag address item', 'twork-builder' ) }
				>
					<i
						className="fas fa-map-marker-alt"
						aria-hidden="true"
					></i>
					<div>
						<EditableText
							tagName="span"
							className="jivaka-footer__contact-label"
							value={ addressLabel }
							attribute="addressLabel"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __( 'Address', 'twork-builder' ) }
						/>
						<EditableText
							tagName="p"
							className="jivaka-footer__contact-value"
							value={ addressValue }
							attribute="addressValue"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __(
								'Corner of 101st Street & 57th St, Mandalay.',
								'twork-builder'
							) }
							multiline="p"
						/>
					</div>
				</FooterShell>
			);
		}

		if ( id === 'emergency' && showEmergencyPhone !== false ) {
			return (
				<FooterShell
					key="emergency"
					isEditor={ isEditor }
					legacySave={ legacySave }
					editorTagName="li"
					saveTagName="li"
					dragType="footer-contact-item"
					index={ itemIndex }
					onReorder={ reorderContactItems }
					editorClassName="jivaka-footer__contact-item jivaka-footer__draggable-contact"
					saveClassName="jivaka-footer__contact-item"
					label={ __( 'Drag emergency phone item', 'twork-builder' ) }
				>
					<i className="fas fa-phone-volume" aria-hidden="true"></i>
					<div>
						<EditableText
							tagName="span"
							className="jivaka-footer__contact-label"
							value={ emergencyLabel }
							attribute="emergencyLabel"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __(
								'Emergency (24/7)',
								'twork-builder'
							) }
						/>
						<EditableText
							tagName="p"
							className="jivaka-footer__contact-value"
							value={ emergencyPhone }
							attribute="emergencyPhone"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __( '09-789 101 101', 'twork-builder' ) }
						/>
					</div>
				</FooterShell>
			);
		}

		if ( id === 'email' && showEmail !== false ) {
			return (
				<FooterShell
					key="email"
					isEditor={ isEditor }
					legacySave={ legacySave }
					editorTagName="li"
					saveTagName="li"
					dragType="footer-contact-item"
					index={ itemIndex }
					onReorder={ reorderContactItems }
					editorClassName="jivaka-footer__contact-item jivaka-footer__draggable-contact"
					saveClassName="jivaka-footer__contact-item"
					label={ __( 'Drag email item', 'twork-builder' ) }
				>
					<i className="fas fa-envelope" aria-hidden="true"></i>
					<div>
						<EditableText
							tagName="span"
							className="jivaka-footer__contact-label"
							value={ emailLabel }
							attribute="emailLabel"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __( 'Email Us', 'twork-builder' ) }
						/>
						<EditableText
							tagName="p"
							className="jivaka-footer__contact-value"
							value={ emailValue }
							attribute="emailValue"
							setAttributes={ setAttributes }
							isEditor={ isEditor }
							placeholder={ __(
								'hello@jivakahospital.com',
								'twork-builder'
							) }
						/>
					</div>
				</FooterShell>
			);
		}

		return null;
	}

	function renderColumn( id, columnIndex ) {
		if ( id === 'brand' && showBrandColumn !== false ) {
			const visibleBrandBlocks = orderedBrandBlocks.filter( ( blockId ) =>
				isBrandBlockVisible( blockId )
			);

			return (
				<FooterShell
					key="brand"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-column"
					index={ columnIndex }
					onReorder={ reorderColumns }
					editorClassName="jivaka-footer__col jivaka-footer__col--brand"
					saveClassName="jivaka-footer__col jivaka-footer__col--brand"
					label={ __( 'Drag brand column', 'twork-builder' ) }
				>
					{ visibleBrandBlocks.map( ( blockId, blockIndex ) =>
						renderBrandBlock( blockId, blockIndex )
					) }
				</FooterShell>
			);
		}

		if ( id === 'quickLinks' && showQuickLinksColumn !== false ) {
			return (
				<FooterShell
					key="quickLinks"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-column"
					index={ columnIndex }
					onReorder={ reorderColumns }
					editorClassName="jivaka-footer__col"
					saveClassName="jivaka-footer__col"
					label={ __( 'Drag quick links column', 'twork-builder' ) }
				>
					<EditableText
						tagName="h4"
						className="jivaka-footer__heading"
						value={ quickLinksHeading }
						attribute="quickLinksHeading"
						setAttributes={ setAttributes }
						isEditor={ isEditor }
						placeholder={ __( 'Quick Links', 'twork-builder' ) }
					/>
					<FooterLinkList
						links={ isEditor ? quickLinks : resolvedQuickLinks }
						linkClassName="jivaka-footer__link"
						isEditor={ isEditor }
						legacySave={ legacySave }
						setAttributes={ setAttributes }
						linksAttribute="quickLinks"
						fallbackLinks={ DEFAULT_QUICK_LINKS }
					/>
				</FooterShell>
			);
		}

		if ( id === 'departments' && showDepartmentsColumn !== false ) {
			return (
				<FooterShell
					key="departments"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-column"
					index={ columnIndex }
					onReorder={ reorderColumns }
					editorClassName="jivaka-footer__col"
					saveClassName="jivaka-footer__col"
					label={ __( 'Drag departments column', 'twork-builder' ) }
				>
					<EditableText
						tagName="h4"
						className="jivaka-footer__heading"
						value={ departmentsHeading }
						attribute="departmentsHeading"
						setAttributes={ setAttributes }
						isEditor={ isEditor }
						placeholder={ __( 'Departments', 'twork-builder' ) }
					/>
					<FooterLinkList
						links={
							isEditor ? departmentLinks : resolvedDepartmentLinks
						}
						linkClassName="jivaka-footer__link"
						isEditor={ isEditor }
						legacySave={ legacySave }
						setAttributes={ setAttributes }
						linksAttribute="departmentLinks"
						fallbackLinks={ DEFAULT_DEPARTMENT_LINKS }
					/>
				</FooterShell>
			);
		}

		if ( id === 'contact' && showContactColumn !== false ) {
			const visibleContactItems = orderedContactItems.filter( ( itemId ) =>
				isContactItemVisible( itemId )
			);

			return (
				<FooterShell
					key="contact"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-column"
					index={ columnIndex }
					onReorder={ reorderColumns }
					editorClassName="jivaka-footer__col"
					saveClassName="jivaka-footer__col"
					label={ __( 'Drag contact column', 'twork-builder' ) }
				>
					<EditableText
						tagName="h4"
						className="jivaka-footer__heading"
						value={ contactHeading }
						attribute="contactHeading"
						setAttributes={ setAttributes }
						isEditor={ isEditor }
						placeholder={ __( 'Contact Us', 'twork-builder' ) }
					/>
					<ul className="jivaka-footer__contact">
						{ visibleContactItems.map( ( itemId, itemIndex ) =>
							renderContactItem( itemId, itemIndex )
						) }
					</ul>
				</FooterShell>
			);
		}

		return null;
	}

	function renderBottomBarItem( id, itemIndex ) {
		if ( id === 'copyright' && showCopyright !== false ) {
			return (
				<FooterShell
					key="copyright"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-bottom-item"
					index={ itemIndex }
					onReorder={ reorderBottomBarItems }
					editorClassName="jivaka-footer__bottom-item"
					savePassthrough
					label={ __( 'Drag copyright block', 'twork-builder' ) }
				>
					<EditableText
						tagName="div"
						className="jivaka-footer__copyright"
						value={ copyrightText }
						attribute="copyrightText"
						setAttributes={ setAttributes }
						isEditor={ isEditor }
						placeholder={ __(
							'© 2025 Jivaka Hospital. All Rights Reserved.',
							'twork-builder'
						) }
					/>
				</FooterShell>
			);
		}

		if ( id === 'legal' && legalVisibleEntries.length > 0 ) {
			return (
				<FooterShell
					key="legal"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-bottom-item"
					index={ itemIndex }
					onReorder={ reorderBottomBarItems }
					editorClassName="jivaka-footer__bottom-item"
					savePassthrough
					label={ __( 'Drag legal links block', 'twork-builder' ) }
				>
					<div className="jivaka-footer__legal">
						{ isEditor
							? legalVisibleEntries.map(
									( { link, index }, visibleIndex ) => (
										<FooterShell
											key={ `legal-${ index }` }
											isEditor={ isEditor }
											legacySave={ legacySave }
											dragType="footer-legal-link"
											index={ visibleIndex }
											onReorder={ reorderLegalLinks }
											editorClassName="jivaka-footer__legal-item"
											savePassthrough
											label={ __(
												'Drag legal link',
												'twork-builder'
											) }
										>
											<span className="jivaka-footer__legal-link">
												<RichText
													tagName="span"
													value={ link.label || '' }
													onChange={ ( label ) =>
														setAttributes( {
															legalLinks:
																updateLinkListItem(
																	sourceLegalLinks,
																	index,
																	{ label }
																),
														} )
													}
													placeholder={ __(
														'Legal link',
														'twork-builder'
													) }
													allowedFormats={ [] }
													disableInteractiveFormatting
												/>
											</span>
										</FooterShell>
									)
							  )
							: resolvedLegalLinks
									.filter(
										( link ) => link.enabled !== false
									)
									.map( ( link, renderIndex ) => (
										<a
											key={ `${ link.label }-${ renderIndex }` }
											href={ link.url || '#' }
											className="jivaka-footer__legal-link"
										>
											{ link.label }
										</a>
									) ) }
					</div>
				</FooterShell>
			);
		}

		return null;
	}

	function renderSection( id, sectionIndex ) {
		if ( id === 'cta' && showCtaSection !== false ) {
			if ( ! showCtaContent && ! showCtaActions ) {
				return null;
			}

			const visibleButtons = orderedCtaButtons.filter( ( buttonId ) =>
				isCtaButtonVisible( buttonId )
			);

			return (
				<FooterShell
					key="cta"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-section"
					index={ sectionIndex }
					onReorder={ reorderSections }
					editorClassName="jivaka-footer__cta-wrapper"
					saveClassName="jivaka-footer__cta-wrapper"
					label={ __( 'Drag CTA section', 'twork-builder' ) }
				>
					<div className="jivaka-footer__cta">
						{ showCtaContent ? (
							<div className="jivaka-footer__cta-content">
								{ showCtaTitle !== false ? (
									<EditableText
										tagName="h3"
										className="jivaka-footer__cta-title"
										value={ ctaTitle }
										attribute="ctaTitle"
										setAttributes={ setAttributes }
										isEditor={ isEditor }
										placeholder={ __(
											'Need Emergency Care?',
											'twork-builder'
										) }
									/>
								) : null }
								{ showCtaDesc !== false ? (
									<EditableText
										tagName="p"
										className="jivaka-footer__cta-desc"
										value={ ctaDesc }
										attribute="ctaDesc"
										setAttributes={ setAttributes }
										isEditor={ isEditor }
										placeholder={ __(
											'Our Ambulance and Emergency Department is available 24/7.',
											'twork-builder'
										) }
										multiline="p"
									/>
								) : null }
							</div>
						) : null }
						{ showCtaActions ? (
							<div className="jivaka-footer__cta-actions">
								{ visibleButtons.map( ( buttonId, buttonIndex ) =>
									renderCtaButton( buttonId, buttonIndex )
								) }
							</div>
						) : null }
					</div>
				</FooterShell>
			);
		}

		if ( id === 'main' && hasMainGrid ) {
			const visibleColumns = orderedColumns.filter( ( columnId ) =>
				isColumnVisible( columnId )
			);

			return (
				<FooterShell
					key="main"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-section"
					index={ sectionIndex }
					onReorder={ reorderSections }
					editorClassName="jivaka-footer__main-wrap"
					savePassthrough
					label={ __( 'Drag main footer section', 'twork-builder' ) }
				>
					<div className="jivaka-footer__main">
						<div className="jivaka-footer__grid">
							{ visibleColumns.map( ( columnId, columnIndex ) =>
								renderColumn( columnId, columnIndex )
							) }
						</div>
					</div>
				</FooterShell>
			);
		}

		if ( id === 'bottom' && showBottomBar !== false ) {
			const visibleBottomItems = orderedBottomBarItems.filter( ( itemId ) =>
				isBottomBarItemVisible( itemId )
			);

			return (
				<FooterShell
					key="bottom"
					isEditor={ isEditor }
					legacySave={ legacySave }
					dragType="footer-section"
					index={ sectionIndex }
					onReorder={ reorderSections }
					editorClassName="jivaka-footer__bottom-wrap"
					savePassthrough
					label={ __( 'Drag bottom bar section', 'twork-builder' ) }
				>
					<div className="jivaka-footer__bottom">
						<div className="jivaka-footer__bottom-container">
							{ visibleBottomItems.map( ( itemId, itemIndex ) =>
								renderBottomBarItem( itemId, itemIndex )
							) }
						</div>
					</div>
				</FooterShell>
			);
		}

		return null;
	}

	const visibleSections = orderedSections.filter( ( id ) =>
		isSectionVisible( id )
	);

	return (
		<footer
			className={ `jivaka-footer${
				isEditor ? ' jivaka-footer--editor' : ''
			}` }
			style={ footerStyle }
		>
			{ visibleSections.map( ( sectionId, sectionIndex ) =>
				renderSection( sectionId, sectionIndex )
			) }
		</footer>
	);
}
