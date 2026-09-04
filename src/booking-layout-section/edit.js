import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
	SelectControl,
	Notice,
	Spinner,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import InspectorOptionTable from '@twork-builder/shared/inspector-option-table';
import {
	resolveDepartments,
	resolveDoctors,
	resolveTimeSlots,
	createDepartmentRow,
	createDoctorRow,
	createTimeSlotRow,
	parsePipeOptions,
	parseDoctorsMapString,
	sanitizeFormShortcode,
	normalizeFaClass,
	normalizeDeptSlug,
	normalizeApiFormSchema,
	doctorsFromDoctorCards,
	departmentsFromDoctorCards,
} from './data-helpers';
const ALLOWED_BLOCKS = [ 'twork/booking-info-card-item' ];
const TEMPLATE = [
	[
		'twork/booking-info-card-item',
		{
			title: 'What to Bring',
			iconClass: 'fas fa-clipboard-check',
			itemIconClass: 'fas fa-check',
			listItems: [
				{ id: 1, text: 'Previous Medical Reports', iconClass: '' },
				{
					id: 2,
					text: 'List of Current Medications',
					iconClass: '',
				},
				{ id: 3, text: 'NRC Card / ID Proof', iconClass: '' },
				{ id: 4, text: 'Insurance Card (if any)', iconClass: '' },
			],
		},
	],
	[
		'twork/booking-info-card-item',
		{
			title: 'OPD Hours',
			iconClass: 'fas fa-clock',
			itemIconClass: 'fas fa-clock',
			listItems: [
				{
					id: 1,
					text: 'Mon - Sat: 8:00 AM - 8:00 PM',
					iconClass: 'fas fa-clock',
				},
				{
					id: 2,
					text: 'Sunday: 9:00 AM - 1:00 PM',
					iconClass: 'fas fa-clock',
				},
				{
					id: 3,
					text: 'Call for Booking: 09-789 101 101',
					iconClass: 'fas fa-phone',
				},
			],
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		infoTitle,
		infoDescription,
		showEmergencyBox,
		emergencyTitle,
		emergencyText,
		emergencyPhone,
		emergencyPhoneHref,
		emergencyIconClass = 'fas fa-truck-medical',
		formSource = 'builtin',
		wpFormProvider,
		wpFormId,
		wpFormTitle,
		wpFormShortcode,
		apiFormUrl = '',
		apiFormMethod = 'GET',
		apiSubmitUrl = '',
		apiFieldsPath = '',
		apiUseProxy = true,
		formId,
		formAction,
		patientDetailsTitle,
		appointmentDetailsTitle,
		fullNameLabel,
		fullNamePlaceholder,
		phoneLabel,
		phonePlaceholder,
		emailLabel,
		emailPlaceholder,
		dobLabel,
		departmentLabel,
		doctorLabel,
		dateLabel,
		timeLabel,
		reasonLabel,
		reasonPlaceholder,
		submitButtonText,
		submitIconClass = 'fas fa-arrow-right',
		successTitle,
		successMessage,
		successButtonText,
		successIconClass = 'fas fa-circle-check',
		layoutGap,
		containerMaxWidth,
		containerPadding,
		paddingBottom,
		formPadding,
		primaryColor,
		animationOnScroll,
		departments: departmentsAttr,
		doctors: doctorsAttr,
		timeSlots: timeSlotsAttr,
		departmentOptions,
		doctorsMap,
		timeOptions,
		doctorsSourcePageId = 0,
	} = attributes;

	const departments = resolveDepartments( attributes );
	const doctors = resolveDoctors( attributes );
	const timeSlots = resolveTimeSlots( attributes );
	const isWpForm = formSource === 'wp';
	const isApiForm = formSource === 'api';
	const emergencyIcon = normalizeFaClass(
		emergencyIconClass || 'fas fa-truck-medical'
	);
	const submitIcon = normalizeFaClass(
		submitIconClass || 'fas fa-arrow-right'
	);
	const successIcon = normalizeFaClass(
		successIconClass || 'fas fa-circle-check'
	);

	const pages = useSelect( ( select ) => {
		return (
			select( 'core' ).getEntityRecords( 'postType', 'page', {
				per_page: 100,
				status: 'publish,draft,private',
				orderby: 'title',
				order: 'asc',
				_fields: 'id,title',
			} ) || []
		);
	}, [] );

	const pageSelectOptions = useMemo( () => {
		const options = [
			{
				label: __( '— Select a doctors page —', 'twork-builder' ),
				value: '0',
			},
		];
		( pages || [] ).forEach( ( page ) => {
			const title =
				page?.title?.rendered || page?.title?.raw || `#${ page.id }`;
			options.push( {
				label: title.replace( /<[^>]+>/g, '' ),
				value: String( page.id ),
			} );
		} );
		return options;
	}, [ pages ] );

	const [ formsData, setFormsData ] = useState( {
		providers: [],
		forms: [],
	} );
	const [ formsLoading, setFormsLoading ] = useState( false );
	const [ formsError, setFormsError ] = useState( '' );
	const [ syncNotice, setSyncNotice ] = useState( '' );
	const [ syncNoticeStatus, setSyncNoticeStatus ] = useState( 'success' );
	const [ syncLoading, setSyncLoading ] = useState( false );
	const [ previewDept, setPreviewDept ] = useState( '' );
	const [ apiPreview, setApiPreview ] = useState( {
		loading: false,
		error: '',
		fieldCount: 0,
	} );

	const previewDoctorNames = useMemo( () => {
		if ( ! previewDept ) {
			return [];
		}
		const norm = normalizeDeptSlug( previewDept );
		return doctors
			.filter( ( row ) => normalizeDeptSlug( row.deptValue ) === norm )
			.map( ( row ) => row.name )
			.filter( Boolean );
	}, [ doctors, previewDept ] );

	useEffect( () => {
		if ( ! isSelected && ! isWpForm ) {
			return;
		}
		let cancelled = false;
		setFormsLoading( true );
		setFormsError( '' );
		apiFetch( { path: '/twork/v1/forms' } )
			.then( ( data ) => {
				if ( cancelled ) {
					return;
				}
				setFormsData( {
					providers: data?.providers || [],
					forms: data?.forms || [],
				} );
			} )
			.catch( () => {
				if ( cancelled ) {
					return;
				}
				setFormsError(
					__(
						'Could not load WP forms. Is the plugin active?',
						'twork-builder'
					)
				);
			} )
			.finally( () => {
				if ( ! cancelled ) {
					setFormsLoading( false );
				}
			} );
		return () => {
			cancelled = true;
		};
	}, [ isSelected, isWpForm ] );

	const availableProviders = useMemo(
		() => ( formsData.providers || [] ).filter( ( p ) => p.available ),
		[ formsData.providers ]
	);

	const formsForProvider = useMemo(
		() =>
			( formsData.forms || [] ).filter(
				( f ) => ! wpFormProvider || f.provider === wpFormProvider
			),
		[ formsData.forms, wpFormProvider ]
	);

	const formSelectOptions = useMemo( () => {
		const options = [
			{
				label: __( '— Select a form —', 'twork-builder' ),
				value: '',
			},
		];
		formsForProvider.forEach( ( form ) => {
			options.push( {
				label: `${ form.title } (${ form.provider })`,
				value: `${ form.provider }:${ form.id }`,
			} );
		} );
		return options;
	}, [ formsForProvider ] );

	const onSelectWpForm = ( combined ) => {
		if ( ! combined ) {
			setAttributes( {
				wpFormId: '',
				wpFormProvider: wpFormProvider || '',
				wpFormTitle: '',
				wpFormShortcode: '',
			} );
			return;
		}
		const [ provider, ...idParts ] = combined.split( ':' );
		const id = idParts.join( ':' );
		const match = ( formsData.forms || [] ).find(
			( f ) => f.provider === provider && String( f.id ) === String( id )
		);
		if ( ! match ) {
			return;
		}
		setAttributes( {
			wpFormProvider: match.provider,
			wpFormId: String( match.id ),
			wpFormTitle: match.title || '',
			wpFormShortcode: match.shortcode || '',
		} );
	};

	const testApiSchema = () => {
		const url = ( apiFormUrl || '' ).trim();
		if ( ! url ) {
			setApiPreview( {
				loading: false,
				error: __( 'Enter an API URL first.', 'twork-builder' ),
				fieldCount: 0,
			} );
			return;
		}
		setApiPreview( { loading: true, error: '', fieldCount: 0 } );
		const fieldsPath = ( apiFieldsPath || '' ).trim();
		const method = ( apiFormMethod || 'GET' ).toUpperCase();
		const path =
			`/twork/v1/booking-form-schema?url=${ encodeURIComponent( url ) }` +
			`&fields_path=${ encodeURIComponent( fieldsPath ) }` +
			`&method=${ encodeURIComponent( method ) }`;

		const run =
			apiUseProxy !== false
				? apiFetch( { path } )
				: fetch( url, {
						method,
						headers: { Accept: 'application/json' },
				  } )
						.then( ( res ) => {
							if ( ! res.ok ) {
								throw new Error( 'upstream' );
							}
							return res.json();
						} )
						.then( ( raw ) =>
							normalizeApiFormSchema( raw, { fieldsPath } )
						);

		run.then( ( schema ) => {
			const count = Array.isArray( schema?.fields )
				? schema.fields.length
				: 0;
			if ( ! count ) {
				setApiPreview( {
					loading: false,
					error: __(
						'No fields found in API response.',
						'twork-builder'
					),
					fieldCount: 0,
				} );
				return;
			}
			setApiPreview( {
				loading: false,
				error: '',
				fieldCount: count,
			} );
		} ).catch( () => {
			setApiPreview( {
				loading: false,
				error: __(
					'Could not load / normalize API schema.',
					'twork-builder'
				),
				fieldCount: 0,
			} );
		} );
	};

	// One-time migrate legacy pipe/JSON strings → editable arrays.
	useEffect( () => {
		const patch = {};
		if (
			( ! Array.isArray( departmentsAttr ) ||
				! departmentsAttr.length ) &&
			departmentOptions
		) {
			const migrated = parsePipeOptions( departmentOptions );
			if ( migrated.length ) {
				patch.departments = migrated;
				patch.departmentOptions = '';
			}
		}
		if (
			( ! Array.isArray( doctorsAttr ) || ! doctorsAttr.length ) &&
			doctorsMap
		) {
			const migrated = parseDoctorsMapString( doctorsMap );
			if ( migrated.length ) {
				patch.doctors = migrated;
				patch.doctorsMap = '';
			}
		}
		if (
			( ! Array.isArray( timeSlotsAttr ) || ! timeSlotsAttr.length ) &&
			timeOptions
		) {
			const migrated = parsePipeOptions( timeOptions );
			if ( migrated.length ) {
				patch.timeSlots = migrated;
				patch.timeOptions = '';
			}
		}
		if ( Object.keys( patch ).length ) {
			setAttributes( patch );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- migrate once on mount / legacy data
	}, [] );

	const applyCardsPayload = ( cards, apiDepartments = [] ) => {
		const fromCards = doctorsFromDoctorCards( cards );
		if ( ! fromCards.length ) {
			return false;
		}

		let nextDepartments = [];
		if ( Array.isArray( apiDepartments ) && apiDepartments.length ) {
			nextDepartments = apiDepartments
				.map( ( row, index ) => ( {
					id: index + 1,
					value: String( row.value || '' ).trim(),
					label:
						String( row.label || row.value || '' ).trim() ||
						String( row.value || '' ).trim(),
				} ) )
				.filter( ( row ) => row.value );
		}
		if ( ! nextDepartments.length ) {
			nextDepartments = departmentsFromDoctorCards( cards );
		}

		const patch = {
			doctors: fromCards,
			doctorsMap: '',
		};

		if ( nextDepartments.length ) {
			patch.departments = nextDepartments;
			patch.departmentOptions = '';
			if (
				previewDept &&
				! nextDepartments.some(
					( d ) =>
						normalizeDeptSlug( d.value ) ===
						normalizeDeptSlug( previewDept )
				)
			) {
				setPreviewDept( '' );
			}
		}

		setAttributes( patch );
		return true;
	};

	const syncDoctorsFromSourcePage = () => {
		const pageId = Number( doctorsSourcePageId ) || 0;
		if ( ! pageId ) {
			setSyncNoticeStatus( 'warning' );
			setSyncNotice(
				__( 'Select a doctors source page first.', 'twork-builder' )
			);
			return;
		}

		setSyncLoading( true );
		setSyncNotice( '' );
		apiFetch( {
			path: `/twork/v1/doctor-cards?page_id=${ pageId }`,
		} )
			.then( ( data ) => {
				const cards = data?.cards || [];
				if ( ! cards.length ) {
					setSyncNoticeStatus( 'warning' );
					setSyncNotice(
						__(
							'No doctor cards found on the selected page.',
							'twork-builder'
						)
					);
					return;
				}
				applyCardsPayload( cards, data?.departments || [] );
				setSyncNoticeStatus( 'success' );
				setSyncNotice(
					__(
						'Synced departments and doctors from the selected page.',
						'twork-builder'
					)
				);
			} )
			.catch( () => {
				setSyncNoticeStatus( 'error' );
				setSyncNotice(
					__(
						'Could not sync doctor cards from that page.',
						'twork-builder'
					)
				);
			} )
			.finally( () => {
				setSyncLoading( false );
			} );
	};

	const updateDepartment = ( index, field, value ) => {
		const next = departments.map( ( row, i ) =>
			i === index ? { ...row, [ field ]: value } : row
		);
		setAttributes( { departments: next, departmentOptions: '' } );
	};

	const updateDoctor = ( index, field, value ) => {
		const next = doctors.map( ( row, i ) =>
			i === index ? { ...row, [ field ]: value } : row
		);
		setAttributes( { doctors: next, doctorsMap: '' } );
	};

	const updateTimeSlot = ( index, field, value ) => {
		const next = timeSlots.map( ( row, i ) =>
			i === index ? { ...row, [ field ]: value } : row
		);
		setAttributes( { timeSlots: next, timeOptions: '' } );
	};

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-booking-layout-section-editor jivaka-booking-module',
			style: {
				paddingBottom: `${ paddingBottom }px`,
				'--primary-orange': primaryColor,
			},
		} ),
		[ paddingBottom, primaryColor ]
	);

	const layoutStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr 1.5fr',
		gap: `${ layoutGap }px`,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		alignItems: 'start',
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
							label={ __( 'Column gap (px)', 'twork-builder' ) }
							value={ layoutGap }
							onChange={ ( val ) =>
								setAttributes( { layoutGap: val } )
							}
							min={ 20 }
							max={ 100 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
							step={ 10 }
						/>
						<RangeControl
							label={ __(
								'Container padding (px)',
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
						<RangeControl
							label={ __(
								'Section padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
						<RangeControl
							label={ __( 'Form padding (px)', 'twork-builder' ) }
							value={ formPadding }
							onChange={ ( val ) =>
								setAttributes( { formPadding: val } )
							}
							min={ 16 }
							max={ 80 }
							step={ 4 }
						/>
						<ToggleControl
							label={ __( 'Animate on scroll', 'twork-builder' ) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Emergency Box', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show emergency box',
								'twork-builder'
							) }
							checked={ showEmergencyBox }
							onChange={ ( val ) =>
								setAttributes( { showEmergencyBox: val } )
							}
						/>
						<TextControl
							label={ __(
								'Emergency icon class (fas …)',
								'twork-builder'
							) }
							value={ emergencyIconClass }
							onChange={ ( val ) =>
								setAttributes( {
									emergencyIconClass: normalizeFaClass( val ),
								} )
							}
						/>
						<TextControl
							label={ __( 'Phone display', 'twork-builder' ) }
							value={ emergencyPhone }
							onChange={ ( val ) =>
								setAttributes( { emergencyPhone: val } )
							}
						/>
						<TextControl
							label={ __(
								'Phone href (tel:…)',
								'twork-builder'
							) }
							value={ emergencyPhoneHref }
							onChange={ ( val ) =>
								setAttributes( { emergencyPhoneHref: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Departments', 'twork-builder' ) }
						initialOpen={ false }
					>
						<p className="mk-filter-option-table__intro">
							{ __(
								'Add or remove departments. Slug must match doctor Dept values.',
								'twork-builder'
							) }
						</p>
						<InspectorOptionTable
							items={ departments }
							onUpdate={ updateDepartment }
							onRemove={ ( index ) =>
								setAttributes( {
									departments: departments.filter(
										( _, i ) => i !== index
									),
									departmentOptions: '',
								} )
							}
							onAdd={ () =>
								setAttributes( {
									departments: [
										...departments,
										createDepartmentRow( departments ),
									],
									departmentOptions: '',
								} )
							}
							addLabel={ __( 'Add department', 'twork-builder' ) }
							slugHint={ __(
								'Slug example: heart, neuro',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Doctors', 'twork-builder' ) }
						initialOpen={ false }
					>
						<p className="mk-filter-option-table__intro">
							{ __(
								'Pick any page that has Doctor Cards, then sync departments + doctor names.',
								'twork-builder'
							) }
						</p>
						<SelectControl
							label={ __(
								'Doctors source page',
								'twork-builder'
							) }
							value={ String( doctorsSourcePageId || 0 ) }
							options={ pageSelectOptions }
							onChange={ ( val ) =>
								setAttributes( {
									doctorsSourcePageId: Number( val ) || 0,
								} )
							}
							help={ __(
								'Usually your Doctors / directory page. Not limited to the booking page.',
								'twork-builder'
							) }
						/>
						{ syncNotice && (
							<Notice
								status={ syncNoticeStatus }
								isDismissible
								onRemove={ () => setSyncNotice( '' ) }
							>
								{ syncNotice }
							</Notice>
						) }
						<div className="mk-booking-doctor-table">
							<div className="mk-booking-doctor-table__head">
								<span>
									{ __( 'Dept slug', 'twork-builder' ) }
								</span>
								<span>
									{ __( 'Doctor name', 'twork-builder' ) }
								</span>
								<span aria-hidden="true" />
							</div>
							{ doctors.map( ( row, index ) => (
								<div
									className="mk-booking-doctor-table__row"
									key={ `doc-${ row.id }` }
								>
									<select
										className="mk-booking-doctor-table__select"
										value={ row.deptValue }
										onChange={ ( event ) =>
											updateDoctor(
												index,
												'deptValue',
												event.target.value
											)
										}
										aria-label={ __(
											'Department slug',
											'twork-builder'
										) }
									>
										{ departments.map( ( dept ) => (
											<option
												key={ dept.value }
												value={ dept.value }
											>
												{ dept.value }
											</option>
										) ) }
										{ ! departments.some(
											( d ) => d.value === row.deptValue
										) && (
											<option value={ row.deptValue }>
												{ row.deptValue }
											</option>
										) }
									</select>
									<input
										type="text"
										className="mk-booking-doctor-table__input"
										value={ row.name }
										onChange={ ( event ) =>
											updateDoctor(
												index,
												'name',
												event.target.value
											)
										}
										placeholder={ __(
											'Doctor name',
											'twork-builder'
										) }
									/>
									<Button
										className="mk-booking-doctor-table__delete"
										label={ __(
											'Delete',
											'twork-builder'
										) }
										isDestructive
										isSmall
										onClick={ () =>
											setAttributes( {
												doctors: doctors.filter(
													( _, i ) => i !== index
												),
												doctorsMap: '',
											} )
										}
									>
										×
									</Button>
								</div>
							) ) }
							<div className="mk-booking-doctor-table__footer">
								<Button
									variant="secondary"
									isSmall
									disabled={
										syncLoading ||
										! Number( doctorsSourcePageId )
									}
									onClick={ syncDoctorsFromSourcePage }
								>
									{ syncLoading
										? __( 'Syncing…', 'twork-builder' )
										: __(
												'Sync from doctor cards',
												'twork-builder'
										  ) }
								</Button>
								<Button
									variant="secondary"
									isSmall
									onClick={ () =>
										setAttributes( {
											doctors: [
												...doctors,
												createDoctorRow(
													doctors,
													departments[ 0 ]?.value ||
														'heart'
												),
											],
											doctorsMap: '',
										} )
									}
								>
									{ __( 'Add doctor', 'twork-builder' ) }
								</Button>
							</div>
						</div>
					</PanelBody>

					<PanelBody
						title={ __( 'Time Slots', 'twork-builder' ) }
						initialOpen={ false }
					>
						<InspectorOptionTable
							items={ timeSlots }
							onUpdate={ updateTimeSlot }
							onRemove={ ( index ) =>
								setAttributes( {
									timeSlots: timeSlots.filter(
										( _, i ) => i !== index
									),
									timeOptions: '',
								} )
							}
							onAdd={ () =>
								setAttributes( {
									timeSlots: [
										...timeSlots,
										createTimeSlotRow( timeSlots ),
									],
									timeOptions: '',
								} )
							}
							addLabel={ __( 'Add time slot', 'twork-builder' ) }
							slugHint={ __(
								'Slug example: morning, evening',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Form Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Form source', 'twork-builder' ) }
							value={ formSource || 'builtin' }
							options={ [
								{
									label: __(
										'Built-in booking form',
										'twork-builder'
									),
									value: 'builtin',
								},
								{
									label: __(
										'WordPress form (CF7 / Formidable / WPForms / Fluent)',
										'twork-builder'
									),
									value: 'wp',
								},
								{
									label: __(
										'External API (any backend JSON)',
										'twork-builder'
									),
									value: 'api',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									formSource: val || 'builtin',
								} )
							}
						/>

						{ isWpForm && (
							<>
								{ formsLoading && <Spinner /> }
								{ formsError && (
									<Notice
										status="warning"
										isDismissible={ false }
									>
										{ formsError }
									</Notice>
								) }
								{ ! formsLoading &&
									! formsError &&
									availableProviders.length === 0 && (
										<Notice
											status="info"
											isDismissible={ false }
										>
											{ __(
												'No supported form plugin detected. Install Contact Form 7, Formidable, WPForms, or Fluent Forms.',
												'twork-builder'
											) }
										</Notice>
									) }
								{ availableProviders.length > 0 && (
									<>
										<SelectControl
											label={ __(
												'Provider filter',
												'twork-builder'
											) }
											value={ wpFormProvider || '' }
											options={ [
												{
													label: __(
														'All providers',
														'twork-builder'
													),
													value: '',
												},
												...availableProviders.map(
													( p ) => ( {
														label: p.label,
														value: p.id,
													} )
												),
											] }
											onChange={ ( val ) =>
												setAttributes( {
													wpFormProvider: val,
													wpFormId: '',
													wpFormTitle: '',
													wpFormShortcode: '',
												} )
											}
										/>
										<SelectControl
											label={ __(
												'Select form',
												'twork-builder'
											) }
											value={
												wpFormProvider && wpFormId
													? `${ wpFormProvider }:${ wpFormId }`
													: ''
											}
											options={ formSelectOptions }
											onChange={ onSelectWpForm }
										/>
									</>
								) }
								<TextControl
									label={ __(
										'Or paste shortcode',
										'twork-builder'
									) }
									value={ wpFormShortcode }
									onChange={ ( val ) =>
										setAttributes( {
											wpFormShortcode:
												sanitizeFormShortcode( val ) ||
												val,
											formSource: 'wp',
										} )
									}
									help={ __(
										'Allowed: contact-form-7, formidable, wpforms, fluentform',
										'twork-builder'
									) }
								/>
								{ wpFormShortcode && (
									<p
										style={ {
											fontSize: '12px',
											color: '#646970',
										} }
									>
										{ __( 'Selected:', 'twork-builder' ) }{ ' ' }
										<code>
											{ wpFormTitle || wpFormShortcode }
										</code>
									</p>
								) }
							</>
						) }

						{ isApiForm && (
							<>
								<TextControl
									label={ __(
										'Schema API URL',
										'twork-builder'
									) }
									value={ apiFormUrl }
									onChange={ ( val ) =>
										setAttributes( {
											apiFormUrl: val,
											formSource: 'api',
										} )
									}
									help={ __(
										'Any backend JSON endpoint. Fields are normalized automatically.',
										'twork-builder'
									) }
								/>
								<SelectControl
									label={ __(
										'Schema request method',
										'twork-builder'
									) }
									value={ apiFormMethod || 'GET' }
									options={ [
										{ label: 'GET', value: 'GET' },
										{ label: 'POST', value: 'POST' },
									] }
									onChange={ ( val ) =>
										setAttributes( {
											apiFormMethod: val || 'GET',
										} )
									}
								/>
								<TextControl
									label={ __(
										'Fields path (optional)',
										'twork-builder'
									) }
									value={ apiFieldsPath }
									onChange={ ( val ) =>
										setAttributes( {
											apiFieldsPath: val,
										} )
									}
									help={ __(
										'e.g. data.form.fields — leave empty for auto-detect.',
										'twork-builder'
									) }
								/>
								<TextControl
									label={ __(
										'Submit URL (optional)',
										'twork-builder'
									) }
									value={ apiSubmitUrl }
									onChange={ ( val ) =>
										setAttributes( {
											apiSubmitUrl: val,
										} )
									}
									help={ __(
										'Form action. Empty = success overlay (no remote submit).',
										'twork-builder'
									) }
								/>
								<ToggleControl
									label={ __(
										'Use WP proxy (recommended)',
										'twork-builder'
									) }
									checked={ apiUseProxy !== false }
									onChange={ ( val ) =>
										setAttributes( { apiUseProxy: val } )
									}
									help={ __(
										'Avoids CORS and strips unsafe content.',
										'twork-builder'
									) }
								/>
								<Button
									variant="secondary"
									onClick={ testApiSchema }
									disabled={ apiPreview.loading }
								>
									{ apiPreview.loading
										? __( 'Testing…', 'twork-builder' )
										: __(
												'Test API schema',
												'twork-builder'
										  ) }
								</Button>
								{ apiPreview.error && (
									<Notice
										status="warning"
										isDismissible={ false }
									>
										{ apiPreview.error }
									</Notice>
								) }
								{ ! apiPreview.error &&
									apiPreview.fieldCount > 0 && (
										<Notice
											status="success"
											isDismissible={ false }
										>
											{ `${ apiPreview.fieldCount } ` }
											{ __(
												'fields detected. Frontend will render them (builtin fallback if API fails).',
												'twork-builder'
											) }
										</Notice>
									) }
							</>
						) }

						{ ! isWpForm && ! isApiForm && (
							<>
								<TextControl
									label={ __( 'Form ID', 'twork-builder' ) }
									value={ formId }
									onChange={ ( val ) =>
										setAttributes( { formId: val } )
									}
								/>
								<TextControl
									label={ __(
										'Form Action URL (optional)',
										'twork-builder'
									) }
									value={ formAction }
									onChange={ ( val ) =>
										setAttributes( { formAction: val } )
									}
									help={ __(
										'Leave empty for client-side success overlay.',
										'twork-builder'
									) }
								/>
								<Divider />
								<TextControl
									label={ __(
										'Full name label',
										'twork-builder'
									) }
									value={ fullNameLabel }
									onChange={ ( val ) =>
										setAttributes( {
											fullNameLabel: val,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Phone label',
										'twork-builder'
									) }
									value={ phoneLabel }
									onChange={ ( val ) =>
										setAttributes( { phoneLabel: val } )
									}
								/>
							</>
						) }

						{ ! isWpForm && (
							<>
								<Divider />
								<TextControl
									label={ __(
										'Submit button',
										'twork-builder'
									) }
									value={ submitButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											submitButtonText: val,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Submit button icon (fas …)',
										'twork-builder'
									) }
									value={ submitIconClass }
									onChange={ ( val ) =>
										setAttributes( {
											submitIconClass:
												normalizeFaClass( val ),
										} )
									}
								/>
								<TextControl
									label={ __(
										'Success title',
										'twork-builder'
									) }
									value={ successTitle }
									onChange={ ( val ) =>
										setAttributes( { successTitle: val } )
									}
								/>
								<TextareaControl
									label={ __(
										'Success description',
										'twork-builder'
									) }
									value={ successMessage }
									onChange={ ( val ) =>
										setAttributes( {
											successMessage: val,
										} )
									}
									rows={ 3 }
									help={ __(
										'Text under the success title after Booking submit.',
										'twork-builder'
									) }
								/>
								<TextControl
									label={ __(
										'Success icon (fas …)',
										'twork-builder'
									) }
									value={ successIconClass }
									onChange={ ( val ) =>
										setAttributes( {
											successIconClass:
												normalizeFaClass( val ),
										} )
									}
									help={ __(
										'e.g. fas fa-circle-check, fas fa-thumbs-up',
										'twork-builder'
									) }
								/>
								<TextControl
									label={ __(
										'Success button text',
										'twork-builder'
									) }
									value={ successButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											successButtonText: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
							{
								value: primaryColor,
								onChange: ( val ) =>
									setAttributes( {
										primaryColor: val || '#f48b2a',
									} ),
								label: __( 'Primary orange', 'twork-builder' ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="jivaka-container booking-layout"
					style={ layoutStyle }
				>
					<div className="booking-info animate-left">
						<RichText
							tagName="h2"
							value={ infoTitle }
							onChange={ ( val ) =>
								setAttributes( { infoTitle: val } )
							}
							placeholder={ __( 'Info title…', 'twork-builder' ) }
						/>
						<RichText
							tagName="p"
							className="booking-info-desc"
							value={ infoDescription }
							onChange={ ( val ) =>
								setAttributes( { infoDescription: val } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
						/>
						<div className="booking-info-cards">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>
						{ showEmergencyBox && (
							<div className="emergency-box">
								<h4>
									<i
										className={ emergencyIcon }
										aria-hidden="true"
									/>{ ' ' }
									<RichText
										tagName="span"
										value={ emergencyTitle }
										onChange={ ( val ) =>
											setAttributes( {
												emergencyTitle: val,
											} )
										}
										placeholder={ __(
											'Emergency title…',
											'twork-builder'
										) }
									/>
								</h4>
								<RichText
									tagName="p"
									value={ emergencyText }
									onChange={ ( val ) =>
										setAttributes( {
											emergencyText: val,
										} )
									}
									placeholder={ __(
										'Emergency text…',
										'twork-builder'
									) }
								/>
								<a href={ emergencyPhoneHref || '#' }>
									{ emergencyPhone }
								</a>
							</div>
						) }
					</div>

					<div
						className="form-wrapper animate-up"
						style={ { padding: `${ formPadding }px` } }
					>
						{ isWpForm ? (
							<div className="booking-wp-form-preview">
								<h3 className="form-section-title">
									{ wpFormTitle ||
										__(
											'WordPress Form',
											'twork-builder'
										) }
								</h3>
								{ wpFormShortcode ? (
									<>
										<p
											style={ {
												margin: '0 0 12px',
												color: '#666',
												fontSize: '0.95rem',
											} }
										>
											{ __(
												'This form renders on the frontend via shortcode.',
												'twork-builder'
											) }
										</p>
										<code
											style={ {
												display: 'block',
												padding: '12px',
												background: '#f6f7f7',
												borderRadius: '4px',
												fontSize: '12px',
												wordBreak: 'break-all',
											} }
										>
											{ wpFormShortcode }
										</code>
									</>
								) : (
									<Notice
										status="warning"
										isDismissible={ false }
									>
										{ __(
											'Select a WP form in the sidebar (or paste a shortcode).',
											'twork-builder'
										) }
									</Notice>
								) }
							</div>
						) : isApiForm ? (
							<div className="booking-wp-form-preview">
								<h3 className="form-section-title">
									{ __(
										'External API Form',
										'twork-builder'
									) }
								</h3>
								{ apiFormUrl ? (
									<>
										<p
											style={ {
												margin: '0 0 12px',
												color: '#666',
												fontSize: '0.95rem',
											} }
										>
											{ __(
												'Fields load from the API on the frontend. Builtin form is the fallback.',
												'twork-builder'
											) }
										</p>
										<code
											style={ {
												display: 'block',
												padding: '12px',
												background: '#f6f7f7',
												borderRadius: '4px',
												fontSize: '12px',
												wordBreak: 'break-all',
											} }
										>
											{ apiFormUrl }
										</code>
										{ apiPreview.fieldCount > 0 && (
											<p
												style={ {
													marginTop: '10px',
													fontSize: '12px',
													color: '#1e7e34',
												} }
											>
												{ `${ apiPreview.fieldCount } ` }
												{ __(
													'fields detected',
													'twork-builder'
												) }
											</p>
										) }
									</>
								) : (
									<Notice
										status="warning"
										isDismissible={ false }
									>
										{ __(
											'Set Schema API URL in the sidebar.',
											'twork-builder'
										) }
									</Notice>
								) }
								<div
									className="success-overlay"
									aria-hidden="true"
									style={ {
										position: 'relative',
										opacity: 0.9,
										marginTop: '24px',
									} }
								>
									<div className="success-icon">
										<i
											className={ successIcon }
											aria-hidden="true"
										/>
									</div>
									<RichText
										tagName="h3"
										value={ successTitle }
										onChange={ ( val ) =>
											setAttributes( {
												successTitle: val,
											} )
										}
										placeholder={ __(
											'Success title…',
											'twork-builder'
										) }
									/>
									<RichText
										tagName="p"
										value={ successMessage }
										onChange={ ( val ) =>
											setAttributes( {
												successMessage: val,
											} )
										}
										placeholder={ __(
											'Success description…',
											'twork-builder'
										) }
									/>
								</div>
							</div>
						) : (
							<>
								<form
									id={ formId || 'bookingForm' }
									onSubmit={ ( e ) => e.preventDefault() }
								>
									<RichText
										tagName="h3"
										className="form-section-title"
										value={ patientDetailsTitle }
										onChange={ ( val ) =>
											setAttributes( {
												patientDetailsTitle: val,
											} )
										}
									/>
									<div className="form-grid">
										<div className="form-group">
											<label className="form-label">
												{ fullNameLabel }
											</label>
											<input
												type="text"
												className="form-control"
												placeholder={
													fullNamePlaceholder
												}
												disabled
											/>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ phoneLabel }
											</label>
											<input
												type="tel"
												className="form-control"
												placeholder={ phonePlaceholder }
												disabled
											/>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ emailLabel }
											</label>
											<input
												type="email"
												className="form-control"
												placeholder={ emailPlaceholder }
												disabled
											/>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ dobLabel }
											</label>
											<input
												type="date"
												className="form-control"
												disabled
											/>
										</div>
									</div>

									<RichText
										tagName="h3"
										className="form-section-title form-section-title--spaced"
										value={ appointmentDetailsTitle }
										onChange={ ( val ) =>
											setAttributes( {
												appointmentDetailsTitle: val,
											} )
										}
									/>
									<div className="form-grid">
										<div className="form-group">
											<label className="form-label">
												{ departmentLabel }
											</label>
											<select
												className="form-control dept-select"
												value={ previewDept }
												onChange={ ( event ) =>
													setPreviewDept(
														event.target.value
													)
												}
											>
												<option value="">
													{ __(
														'-- Select Department --',
														'twork-builder'
													) }
												</option>
												{ departments.map( ( opt ) => (
													<option
														key={
															opt.id || opt.value
														}
														value={ opt.value }
													>
														{ opt.label }
													</option>
												) ) }
											</select>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ doctorLabel }
											</label>
											<select
												className="form-control doc-select"
												value=""
												onChange={ () => {} }
											>
												<option value="">
													{ __(
														'-- Any Available Doctor --',
														'twork-builder'
													) }
												</option>
												{ previewDoctorNames.map(
													( name ) => (
														<option
															key={ name }
															value={ name }
														>
															{ name }
														</option>
													)
												) }
											</select>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ dateLabel }
											</label>
											<input
												type="date"
												className="form-control"
												disabled
											/>
										</div>
										<div className="form-group">
											<label className="form-label">
												{ timeLabel }
											</label>
											<select
												className="form-control"
												disabled
											>
												{ timeSlots.map( ( opt ) => (
													<option
														key={
															opt.id || opt.value
														}
														value={ opt.value }
													>
														{ opt.label }
													</option>
												) ) }
											</select>
										</div>
										<div className="form-group full-width">
											<label className="form-label">
												{ reasonLabel }
											</label>
											<textarea
												className="form-control"
												rows={ 4 }
												placeholder={
													reasonPlaceholder
												}
												disabled
											/>
										</div>
									</div>
									<button
										type="button"
										className="jivaka-btn btn-primary"
										style={ { marginTop: '20px' } }
									>
										{ submitButtonText }{ ' ' }
										<i
											className={ submitIcon }
											style={ { marginLeft: '10px' } }
											aria-hidden="true"
										/>
									</button>
								</form>

								<div className="success-overlay">
									<div className="success-icon">
										<i
											className={ successIcon }
											aria-hidden="true"
										/>
									</div>
									<RichText
										tagName="h3"
										value={ successTitle }
										onChange={ ( val ) =>
											setAttributes( {
												successTitle: val,
											} )
										}
										placeholder={ __(
											'Success title…',
											'twork-builder'
										) }
									/>
									<RichText
										tagName="p"
										value={ successMessage }
										onChange={ ( val ) =>
											setAttributes( {
												successMessage: val,
											} )
										}
										placeholder={ __(
											'Success description…',
											'twork-builder'
										) }
									/>
									<button
										type="button"
										className="jivaka-btn btn-primary"
										style={ {
											marginTop: '20px',
											width: 'auto',
										} }
									>
										{ successButtonText }
									</button>
								</div>
							</>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
