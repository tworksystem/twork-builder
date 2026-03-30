import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	BaseControl,
	Divider as StableDivider,
	__experimentalDivider as ExperimentalDivider,
} from '@wordpress/components';

// Avoid React #130: experimental Divider may be undefined in some WP versions
const Divider =
	StableDivider ||
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const DEFAULT_SPEC_ITEMS = [
	{
		id: 1,
		iconClass: 'fas fa-graduation-cap',
		text: 'MBBS, M.Med.Sc, MRCP (UK)',
	},
	{ id: 2, iconClass: 'fas fa-briefcase', text: '15+ Years Experience' },
	{ id: 3, iconClass: 'fas fa-language', text: 'English, Myanmar' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		backgroundGradientStart = '#fff8f2',
		backgroundGradientEnd = '#ffffff',
		paddingTop = 60,
		paddingBottom = 60,
		containerMaxWidth = 1200,
		containerPadding = 20,
		profileImage = '',
		profileImageId,
		profileImageAlt = '',
		showBadge = true,
		badgeText = 'Available Today',
		badgeIcon = 'fas fa-check-circle',
		doctorName = '',
		designation = '',
		specItems = DEFAULT_SPEC_ITEMS,
		profileBio = '',
		primaryButtonText = 'Book Appointment',
		primaryButtonUrl = '#book',
		primaryButtonTarget = false,
		secondaryButtonText = 'Share Profile',
		secondaryButtonUrl = '#',
		secondaryButtonTarget = false,
	} = attributes;

	// Ensure specItems is always a valid array (guard against corrupted or legacy saved content)
	const safeSpecItems = Array.isArray( specItems )
		? specItems
		: DEFAULT_SPEC_ITEMS;

	// Coerce string attributes to prevent React error #130 (invalid React child: undefined)
	const str = ( v ) => ( typeof v === 'string' ? v : '' );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-profile-hero-editor',
			style: {
				background: `linear-gradient(135deg, ${ backgroundGradientStart } 0%, ${ backgroundGradientEnd } 100%)`,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				border: '2px dashed #e0e0e0',
				borderRadius: '8px',
			},
		} ),
		[
			backgroundGradientEnd,
			backgroundGradientStart,
			paddingBottom,
			paddingTop,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: '300px 1fr',
		gap: '50px',
		alignItems: 'start',
	};

	const addSpecItem = () => {
		const newId = safeSpecItems.length
			? Math.max( ...safeSpecItems.map( ( s ) => s.id ) ) + 1
			: 1;
		setAttributes( {
			specItems: [
				...safeSpecItems,
				{
					id: newId,
					iconClass: 'fas fa-check',
					text: __( 'New item', 'twork-builder' ),
				},
			],
		} );
	};

	const updateSpecItem = ( id, field, value ) => {
		const updated = safeSpecItems.map( ( item ) =>
			item.id === id ? { ...item, [ field ]: value } : item
		);
		setAttributes( { specItems: updated } );
	};

	const removeSpecItem = ( id ) => {
		setAttributes( {
			specItems: safeSpecItems.filter( ( item ) => item.id !== id ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __(
									'Gradient Colors',
									'twork-builder'
								) }
								colorSettings={ [
									{
										value: backgroundGradientStart,
										onChange: ( val ) =>
											setAttributes( {
												backgroundGradientStart: val,
											} ),
										label: __(
											'Start Color',
											'twork-builder'
										),
									},
									{
										value: backgroundGradientEnd,
										onChange: ( val ) =>
											setAttributes( {
												backgroundGradientEnd: val,
											} ),
										label: __(
											'End Color',
											'twork-builder'
										),
									},
								] }
							/>
						) }
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={
								typeof paddingTop === 'number' ? paddingTop : 60
							}
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={
								typeof paddingBottom === 'number'
									? paddingBottom
									: 60
							}
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'twork-builder' ) }
							value={
								typeof containerMaxWidth === 'number'
									? containerMaxWidth
									: 1200
							}
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={
								typeof containerPadding === 'number'
									? containerPadding
									: 20
							}
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Profile Image & Badge', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! profileImage ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										profileImage: media.url,
										profileImageId: media.id,
										profileImageAlt:
											profileImageAlt || media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Profile Image',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ profileImage }
									alt={ profileImageAlt }
									style={ {
										width: '100%',
										marginBottom: '10px',
										borderRadius: '8px',
									} }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											profileImage: '',
											profileImageId: null,
										} )
									}
								>
									{ __( 'Change Image', 'twork-builder' ) }
								</Button>
							</div>
						) }
						<TextControl
							label={ __( 'Image Alt Text', 'twork-builder' ) }
							value={ profileImageAlt ?? '' }
							onChange={ ( val ) =>
								setAttributes( { profileImageAlt: val } )
							}
							help={ __(
								'Accessibility description for the image',
								'twork-builder'
							) }
						/>

						{ Divider && <Divider /> }
						<ToggleControl
							label={ __( 'Show Badge', 'twork-builder' ) }
							checked={ !! showBadge }
							onChange={ ( val ) =>
								setAttributes( { showBadge: val } )
							}
						/>

						{ showBadge && (
							<>
								<TextControl
									label={ __(
										'Badge Text',
										'twork-builder'
									) }
									value={ badgeText ?? '' }
									onChange={ ( val ) =>
										setAttributes( { badgeText: val } )
									}
								/>

								<TextControl
									label={ __(
										'Badge Icon (Font Awesome class)',
										'twork-builder'
									) }
									value={ badgeIcon ?? '' }
									onChange={ ( val ) =>
										setAttributes( { badgeIcon: val } )
									}
									help={ __(
										'e.g. fas fa-check-circle',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Name & Designation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Doctor Name', 'twork-builder' ) }
							value={ doctorName ?? '' }
							onChange={ ( val ) =>
								setAttributes( { doctorName: val } )
							}
						/>

						<TextControl
							label={ __( 'Designation', 'twork-builder' ) }
							value={ designation ?? '' }
							onChange={ ( val ) =>
								setAttributes( { designation: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spec Items', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Specification items (qualifications, experience, languages)',
								'twork-builder'
							) }
						>
							{ safeSpecItems.map( ( item, index ) => (
								<div
									key={ item.id ?? index }
									style={ {
										marginBottom: '12px',
										padding: '10px',
										background: '#f9f9f9',
										borderRadius: '4px',
										border: '1px solid #e0e0e0',
									} }
								>
									<TextControl
										label={ __(
											'Icon class',
											'twork-builder'
										) }
										value={ item.iconClass ?? '' }
										onChange={ ( val ) =>
											updateSpecItem(
												item.id,
												'iconClass',
												val
											)
										}
										help={ __(
											'e.g. fas fa-graduation-cap',
											'twork-builder'
										) }
									/>

									<TextControl
										label={ __( 'Text', 'twork-builder' ) }
										value={ item.text ?? '' }
										onChange={ ( val ) =>
											updateSpecItem(
												item.id,
												'text',
												val
											)
										}
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeSpecItem( item.id )
										}
										style={ { marginTop: '8px' } }
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addSpecItem }>
								{ __( 'Add Spec Item', 'twork-builder' ) }
							</Button>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Bio', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Profile Bio', 'twork-builder' ) }
							value={ profileBio ?? '' }
							onChange={ ( val ) =>
								setAttributes( { profileBio: val } )
							}
							help={ __(
								'Short biography / description',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Buttons', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Primary Button (e.g. Book Appointment)',
								'twork-builder'
							) }
						>
							<TextControl
								label={ __( 'Text', 'twork-builder' ) }
								value={ primaryButtonText ?? '' }
								onChange={ ( val ) =>
									setAttributes( { primaryButtonText: val } )
								}
							/>

							<TextControl
								label={ __( 'URL', 'twork-builder' ) }
								value={ primaryButtonUrl ?? '' }
								onChange={ ( val ) =>
									setAttributes( { primaryButtonUrl: val } )
								}
								type="url"
							/>

							<ToggleControl
								label={ __(
									'Open in new tab',
									'twork-builder'
								) }
								checked={ !! primaryButtonTarget }
								onChange={ ( val ) =>
									setAttributes( {
										primaryButtonTarget: val,
									} )
								}
							/>
						</BaseControl>
						{ Divider && <Divider /> }
						<BaseControl
							label={ __(
								'Secondary Button (e.g. Share Profile)',
								'twork-builder'
							) }
						>
							<TextControl
								label={ __( 'Text', 'twork-builder' ) }
								value={ secondaryButtonText ?? '' }
								onChange={ ( val ) =>
									setAttributes( {
										secondaryButtonText: val,
									} )
								}
							/>

							<TextControl
								label={ __( 'URL', 'twork-builder' ) }
								value={ secondaryButtonUrl ?? '' }
								onChange={ ( val ) =>
									setAttributes( { secondaryButtonUrl: val } )
								}
								type="url"
							/>

							<ToggleControl
								label={ __(
									'Open in new tab',
									'twork-builder'
								) }
								checked={ !! secondaryButtonTarget }
								onChange={ ( val ) =>
									setAttributes( {
										secondaryButtonTarget: val,
									} )
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div className="profile-grid" style={ gridStyle }>
						<div
							className="profile-img-box"
							style={ {
								position: 'relative',
								borderRadius: '10px',
								overflow: 'hidden',
								boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
								background: '#fff',
							} }
						>
							{ profileImage ? (
								<img
									src={ profileImage }
									alt={
										str( profileImageAlt ) ||
										str( doctorName )
									}
									decoding="async"
									style={ {
										width: '100%',
										height: 'auto',
										display: 'block',
									} }
								/>
							) : (
								<div
									style={ {
										width: '100%',
										height: 300,
										background: '#f0f0f0',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#999',
										fontSize: '14px',
									} }
								>
									{ __(
										'Add profile image',
										'twork-builder'
									) }
								</div>
							) }
							{ showBadge && (
								<span
									className="profile-badge"
									style={ {
										position: 'absolute',
										top: '20px',
										right: '20px',
										background: '#fff',
										padding: '5px 12px',
										borderRadius: '20px',
										fontSize: '0.75rem',
										fontWeight: 700,
										color: '#f48b2a',
										boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
									} }
								>
									<i
										className={ str( badgeIcon ) }
										aria-hidden="true"
									/>{ ' ' }
									{ str( badgeText ) }
								</span>
							) }
						</div>

						<div className="profile-info">
							<RichText
								tagName="h1"
								value={ str( doctorName ) }
								onChange={ ( val ) =>
									setAttributes( { doctorName: val } )
								}
								placeholder={ __(
									'Doctor name...',
									'twork-builder'
								) }
								style={ {
									fontSize: '2.5rem',
									margin: '0 0 5px 0',
									color: '#212121',
								} }
							/>

							<RichText
								tagName="span"
								value={ str( designation ) }
								onChange={ ( val ) =>
									setAttributes( { designation: val } )
								}
								placeholder={ __(
									'Designation...',
									'twork-builder'
								) }
								className="designation"
								style={ {
									fontSize: '1.1rem',
									color: '#f48b2a',
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '1px',
									marginBottom: '20px',
									display: 'block',
								} }
							/>

							{ safeSpecItems.length > 0 && (
								<div
									className="profile-specs"
									style={ {
										display: 'flex',
										flexWrap: 'wrap',
										gap: '15px',
										marginBottom: '30px',
									} }
								>
									{ safeSpecItems.map( ( item, index ) => (
										<div
											key={ item.id ?? index }
											className="spec-item"
											style={ {
												background: '#fff',
												border: '1px solid #eee',
												padding: '10px 20px',
												borderRadius: '5px',
												fontSize: '0.9rem',
												color: '#666',
												display: 'flex',
												alignItems: 'center',
												gap: '10px',
											} }
										>
											<i
												className={ str(
													item.iconClass
												) }
												style={ { color: '#f48b2a' } }
												aria-hidden="true"
											/>

											{ str( item.text ) }
										</div>
									) ) }
								</div>
							) }

							<RichText
								tagName="p"
								value={ str( profileBio ) }
								onChange={ ( val ) =>
									setAttributes( { profileBio: val } )
								}
								placeholder={ __(
									'Profile bio...',
									'twork-builder'
								) }
								className="profile-bio"
								style={ {
									marginBottom: '30px',
									fontSize: '1rem',
									color: '#555',
								} }
							/>

							<div
								className="profile-actions"
								style={ { display: 'flex', gap: '15px' } }
							>
								<a
									href={ str( primaryButtonUrl ) || '#' }
									className="jivaka-btn btn-primary"
									style={ {
										display: 'inline-flex',
										alignItems: 'center',
										padding: '12px 30px',
										borderRadius: '5px',
										fontWeight: 700,
										textTransform: 'uppercase',
										fontSize: '0.85rem',
										background: '#f48b2a',
										color: '#fff',
										textDecoration: 'none',
									} }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ str( primaryButtonText ) }
								</a>
								<a
									href={ str( secondaryButtonUrl ) || '#' }
									className="jivaka-btn btn-outline"
									style={ {
										display: 'inline-flex',
										alignItems: 'center',
										padding: '12px 30px',
										borderRadius: '5px',
										fontWeight: 700,
										textTransform: 'uppercase',
										fontSize: '0.85rem',
										background: 'transparent',
										border: '1px solid #e0e0e0',
										color: '#212121',
										textDecoration: 'none',
									} }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ str( secondaryButtonText ) }
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
