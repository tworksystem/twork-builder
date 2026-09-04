export const DEFAULT_DEPARTMENTS = [
	{ id: 1, value: 'heart', label: 'Heart Centre' },
	{ id: 2, value: 'neuro', label: 'Neuro Centre' },
	{ id: 3, value: 'cancer', label: 'Cancer Centre' },
	{ id: 4, value: 'general', label: 'General Medicine' },
	{ id: 5, value: 'paeds', label: 'Paediatrics' },
	{ id: 6, value: 'checkup', label: 'Health Packages' },
];

export const DEFAULT_DOCTORS = [
	{ id: 1, deptValue: 'heart', name: 'Dr. Kyaw Swar' },
	{ id: 2, deptValue: 'heart', name: 'Dr. Aung Myo' },
	{ id: 3, deptValue: 'neuro', name: 'Dr. Susan May' },
	{ id: 4, deptValue: 'neuro', name: 'Dr. Nilar' },
	{ id: 5, deptValue: 'cancer', name: 'Dr. Hlaing Min' },
	{ id: 6, deptValue: 'general', name: 'Dr. Thida Win' },
	{ id: 7, deptValue: 'general', name: 'Medical Officer' },
	{ id: 8, deptValue: 'paeds', name: 'Dr. Thida Win' },
	{ id: 9, deptValue: 'paeds', name: 'Dr. Baby Care' },
	{ id: 10, deptValue: 'checkup', name: 'Wellness Officer' },
];

export const DEFAULT_TIME_SLOTS = [
	{ id: 1, value: 'morning', label: 'Morning (9AM - 12PM)' },
	{ id: 2, value: 'afternoon', label: 'Afternoon (1PM - 4PM)' },
	{ id: 3, value: 'evening', label: 'Evening (5PM - 8PM)' },
];

/**
 * Font Awesome Free ZIP ships solid (+ brands) only — normalize regular classes.
 *
 * @param {string} iconClass
 * @return {string}
 */
export function normalizeFaClass( iconClass ) {
	if ( ! iconClass || typeof iconClass !== 'string' ) {
		return 'fas fa-check';
	}
	return iconClass
		.replace( /\bfar\b/g, 'fas' )
		.replace( /\bfa-regular\b/g, 'fa-solid' )
		.replace( /\bfa-phone-alt\b/g, 'fa-phone' )
		.trim();
}

function nextId( items ) {
	if ( ! items?.length ) {
		return 1;
	}
	return Math.max( ...items.map( ( i ) => Number( i.id ) || 0 ) ) + 1;
}

export function parsePipeOptions( raw ) {
	return ( raw || '' )
		.split( '\n' )
		.map( ( line ) => line.trim() )
		.filter( Boolean )
		.map( ( line, index ) => {
			const idx = line.indexOf( '|' );
			if ( idx === -1 ) {
				return { id: index + 1, value: line, label: line };
			}
			return {
				id: index + 1,
				value: line.slice( 0, idx ).trim(),
				label: line.slice( idx + 1 ).trim(),
			};
		} );
}

export function parseDoctorsMapString( raw ) {
	let map = {};
	try {
		map = JSON.parse( raw || '{}' ) || {};
	} catch ( e ) {
		return [];
	}
	const rows = [];
	let id = 1;
	Object.keys( map ).forEach( ( deptValue ) => {
		const names = Array.isArray( map[ deptValue ] ) ? map[ deptValue ] : [];
		names.forEach( ( name ) => {
			rows.push( { id: id++, deptValue, name } );
		} );
	} );
	return rows;
}

export function resolveDepartments( attributes ) {
	const { departments, departmentOptions } = attributes;
	if ( Array.isArray( departments ) && departments.length ) {
		return departments;
	}
	const migrated = parsePipeOptions( departmentOptions );
	return migrated.length ? migrated : DEFAULT_DEPARTMENTS;
}

export function resolveDoctors( attributes ) {
	const { doctors, doctorsMap } = attributes;
	if ( Array.isArray( doctors ) && doctors.length ) {
		return doctors;
	}
	const migrated = parseDoctorsMapString( doctorsMap );
	return migrated.length ? migrated : DEFAULT_DOCTORS;
}

export function resolveTimeSlots( attributes ) {
	const { timeSlots, timeOptions } = attributes;
	if ( Array.isArray( timeSlots ) && timeSlots.length ) {
		return timeSlots;
	}
	const migrated = parsePipeOptions( timeOptions );
	return migrated.length ? migrated : DEFAULT_TIME_SLOTS;
}

export function doctorsToMap( doctors ) {
	const map = {};
	( doctors || [] ).forEach( ( row ) => {
		if ( ! row?.deptValue || ! row?.name ) {
			return;
		}
		if ( ! map[ row.deptValue ] ) {
			map[ row.deptValue ] = [];
		}
		map[ row.deptValue ].push( row.name );
	} );
	return map;
}

export const DOCTOR_CARD_BLOCK = 'twork/doctor-card-item';

/**
 * @param {string} slug
 * @return {string}
 */
export function normalizeDeptSlug( slug ) {
	return String( slug || '' )
		.trim()
		.toLowerCase();
}

/**
 * Build booking `doctors[]` rows from doctor-card-item blocks / attrs.
 *
 * @param {Array} cards Block objects or attribute objects.
 * @return {Array<{ id: number, deptValue: string, name: string }>}
 */
export function doctorsFromDoctorCards( cards ) {
	const rows = [];
	const seen = new Set();
	let id = 1;

	( cards || [] ).forEach( ( card ) => {
		const attrs = card?.attributes || card || {};
		const name = String( attrs.doctorName || '' ).trim();
		const deptValue =
			String( attrs.departmentSlug || '' ).trim() || 'general';
		if ( ! name ) {
			return;
		}
		const key = `${ normalizeDeptSlug(
			deptValue
		) }::${ name.toLowerCase() }`;
		if ( seen.has( key ) ) {
			return;
		}
		seen.add( key );
		rows.push( { id: id++, deptValue, name } );
	} );

	return rows;
}

/**
 * Build booking `departments[]` from doctor cards (replace source of truth).
 *
 * @param {Array} cards
 * @return {Array<{ id: number, value: string, label: string }>}
 */
export function departmentsFromDoctorCards( cards ) {
	const rows = [];
	const byNorm = new Map();

	( cards || [] ).forEach( ( card ) => {
		const attrs = card?.attributes || card || {};
		const value = String( attrs.departmentSlug || '' ).trim();
		if ( ! value ) {
			return;
		}
		const norm = normalizeDeptSlug( value );
		if ( byNorm.has( norm ) ) {
			const existing = byNorm.get( norm );
			if ( ! existing.label || existing.label === existing.value ) {
				const label =
					String( attrs.departmentLabel || '' ).trim() ||
					existing.label;
				if ( label ) {
					existing.label = label;
				}
			}
			return;
		}
		const label = String( attrs.departmentLabel || '' ).trim() || value;
		const row = {
			id: rows.length + 1,
			value,
			label,
		};
		rows.push( row );
		byNorm.set( norm, row );
	} );

	return rows;
}

/**
 * Ensure booking departments include slugs used by doctor cards.
 *
 * @param {Array} cards
 * @param {Array} existingDepartments
 * @return {Array}
 */
export function mergeDepartmentsFromDoctorCards(
	cards,
	existingDepartments = []
) {
	const fromCards = departmentsFromDoctorCards( cards );
	if ( ! fromCards.length ) {
		return Array.isArray( existingDepartments )
			? existingDepartments.map( ( row ) => ( { ...row } ) )
			: [];
	}

	const next = Array.isArray( existingDepartments )
		? existingDepartments.map( ( row ) => ( { ...row } ) )
		: [];
	const byNorm = new Map();
	next.forEach( ( row ) => {
		byNorm.set( normalizeDeptSlug( row.value ), row );
	} );

	fromCards.forEach( ( row ) => {
		const norm = normalizeDeptSlug( row.value );
		if ( byNorm.has( norm ) ) {
			return;
		}
		const added = {
			id: nextId( next ),
			value: row.value,
			label: row.label,
		};
		next.push( added );
		byNorm.set( norm, added );
	} );

	return next;
}

/**
 * Compare doctor rows by dept + name (ignore id).
 *
 * @param {Array} a
 * @param {Array} b
 * @return {boolean}
 */
export function doctorsListsEqual( a, b ) {
	if ( ! Array.isArray( a ) || ! Array.isArray( b ) ) {
		return false;
	}
	if ( a.length !== b.length ) {
		return false;
	}
	const serialize = ( rows ) =>
		rows
			.map(
				( row ) =>
					`${ normalizeDeptSlug( row.deptValue ) }::${ String(
						row.name || ''
					)
						.trim()
						.toLowerCase() }`
			)
			.sort()
			.join( '|' );
	return serialize( a ) === serialize( b );
}

export function createDepartmentRow( items ) {
	return {
		id: nextId( items ),
		value: 'new-dept',
		label: 'New Department',
	};
}

export function createDoctorRow( items, deptValue = 'heart' ) {
	return {
		id: nextId( items ),
		deptValue,
		name: 'New Doctor',
	};
}

export function createTimeSlotRow( items ) {
	return {
		id: nextId( items ),
		value: 'new-slot',
		label: 'New Time Slot',
	};
}

const ALLOWED_SHORTCODE_TAGS = [
	'contact-form-7',
	'formidable',
	'wpforms',
	'fluentform',
	'fluentform_modal',
];

/**
 * Allowlist WP form shortcodes only.
 *
 * @param {string} shortcode
 * @return {string}
 */
export function sanitizeFormShortcode( shortcode ) {
	const raw = ( shortcode || '' ).trim();
	if ( ! raw || raw.includes( '<' ) ) {
		return '';
	}
	const match = raw.match( /^\[([a-z0-9_-]+)\b/i );
	if ( ! match ) {
		return '';
	}
	const tag = match[ 1 ].toLowerCase();
	if ( ! ALLOWED_SHORTCODE_TAGS.includes( tag ) ) {
		return '';
	}
	if ( /on\w+\s*=|javascript:/i.test( raw ) ) {
		return '';
	}
	return raw;
}

const ALLOWED_FIELD_TYPES = new Set( [
	'text',
	'tel',
	'email',
	'date',
	'number',
	'textarea',
	'select',
	'checkbox',
	'radio',
	'hidden',
] );

/**
 * Walk a dotted / bracket path: "data.form.fields" or "data[fields]".
 *
 * @param {unknown} root
 * @param {string}  path
 * @return {unknown}
 */
export function getByPath( root, path ) {
	if ( ! path || typeof path !== 'string' ) {
		return root;
	}
	const parts = path
		.replace( /\[(\w+)\]/g, '.$1' )
		.split( '.' )
		.filter( Boolean );
	let cur = root;
	for ( const part of parts ) {
		if ( cur == null || typeof cur !== 'object' ) {
			return undefined;
		}
		cur = cur[ part ];
	}
	return cur;
}

/**
 * @param {unknown} value
 * @return {string}
 */
function safeText( value ) {
	return String( value == null ? '' : value )
		.replace( /<[^>]*>/g, '' )
		.trim();
}

/**
 * @param {unknown} opt
 * @param {number}  index
 * @return {{ value: string, label: string }|null}
 */
function normalizeOption( opt, index ) {
	if ( opt == null ) {
		return null;
	}
	if ( typeof opt === 'string' || typeof opt === 'number' ) {
		const text = safeText( opt );
		return text ? { value: text, label: text } : null;
	}
	if ( typeof opt !== 'object' ) {
		return null;
	}
	const value = safeText(
		opt.value ?? opt.id ?? opt.key ?? opt.slug ?? opt.name ?? index
	);
	const label = safeText(
		opt.label ?? opt.title ?? opt.name ?? opt.text ?? value
	);
	if ( ! value && ! label ) {
		return null;
	}
	return { value: value || label, label: label || value };
}

/**
 * Normalize one field from arbitrary backend shapes.
 *
 * @param {unknown} raw
 * @param {number}  index
 * @return {object|null}
 */
export function normalizeApiField( raw, index = 0 ) {
	if ( raw == null ) {
		return null;
	}
	if ( typeof raw === 'string' ) {
		const name = safeText( raw )
			.toLowerCase()
			.replace( /[^a-z0-9_]+/g, '_' );
		if ( ! name ) {
			return null;
		}
		return {
			name,
			label: safeText( raw ),
			type: 'text',
			required: false,
			placeholder: '',
			options: [],
			fullWidth: false,
		};
	}
	if ( typeof raw !== 'object' ) {
		return null;
	}

	const name = safeText(
		raw.name ??
			raw.key ??
			raw.id ??
			raw.field ??
			raw.fieldName ??
			raw.slug ??
			`field_${ index + 1 }`
	)
		.toLowerCase()
		.replace( /[^a-z0-9_]+/g, '_' );
	if ( ! name ) {
		return null;
	}

	let type = safeText(
		raw.type ?? raw.inputType ?? raw.fieldType ?? raw.component ?? 'text'
	).toLowerCase();
	const typeMap = {
		phone: 'tel',
		mobile: 'tel',
		telephone: 'tel',
		textbox: 'text',
		string: 'text',
		longtext: 'textarea',
		multiline: 'textarea',
		dropdown: 'select',
		list: 'select',
		choice: 'select',
		boolean: 'checkbox',
		check: 'checkbox',
		datetime: 'date',
	};
	type = typeMap[ type ] || type;
	if ( ! ALLOWED_FIELD_TYPES.has( type ) ) {
		type = 'text';
	}

	const optionsRaw =
		raw.options ?? raw.choices ?? raw.values ?? raw.items ?? raw.enum ?? [];
	const options = ( Array.isArray( optionsRaw ) ? optionsRaw : [] )
		.map( normalizeOption )
		.filter( Boolean );

	const required = Boolean(
		raw.required ?? raw.isRequired ?? raw.mandatory ?? raw.rules?.required
	);

	return {
		name,
		label: safeText(
			raw.label ?? raw.title ?? raw.caption ?? raw.placeholder ?? name
		),
		type,
		required,
		placeholder: safeText( raw.placeholder ?? raw.hint ?? '' ),
		options,
		fullWidth: Boolean(
			raw.fullWidth ?? raw.full_width ?? type === 'textarea'
		),
		section: safeText( raw.section ?? raw.group ?? '' ),
	};
}

/**
 * Extract a fields array from common backend envelopes.
 *
 * @param {unknown} payload
 * @param {string}  [fieldsPath]
 * @return {unknown[]}
 */
export function extractApiFieldsArray( payload, fieldsPath = '' ) {
	if ( fieldsPath ) {
		const atPath = getByPath( payload, fieldsPath );
		if ( Array.isArray( atPath ) ) {
			return atPath;
		}
		if (
			atPath &&
			typeof atPath === 'object' &&
			Array.isArray( atPath.fields )
		) {
			return atPath.fields;
		}
	}

	if ( Array.isArray( payload ) ) {
		return payload;
	}
	if ( ! payload || typeof payload !== 'object' ) {
		return [];
	}

	const candidates = [
		payload.fields,
		payload.items,
		payload.formFields,
		payload.form_fields,
		payload.schema,
		payload.data?.fields,
		payload.data?.items,
		payload.data?.formFields,
		payload.data?.form?.fields,
		payload.form?.fields,
		payload.form?.items,
		payload.result?.fields,
		payload.payload?.fields,
	];

	for ( const c of candidates ) {
		if ( Array.isArray( c ) && c.length ) {
			return c;
		}
	}

	return [];
}

/**
 * Normalize departments / doctors / time slots if backends send booking lists.
 *
 * @param {unknown} payload
 * @return {{ departments: Array, doctors: Array, timeSlots: Array }}
 */
function extractBookingLists( payload ) {
	const root = payload && typeof payload === 'object' ? payload : {};
	const data = root.data && typeof root.data === 'object' ? root.data : root;

	const departmentsRaw =
		data.departments || data.department || data.depts || [];
	const doctorsRaw = data.doctors || data.physician || data.staff || [];
	const timeRaw =
		data.timeSlots || data.time_slots || data.times || data.slots || [];

	const departments = (
		Array.isArray( departmentsRaw ) ? departmentsRaw : []
	)
		.map( ( row, i ) => {
			if ( typeof row === 'string' ) {
				const v = safeText( row );
				return v ? { id: i + 1, value: v, label: v } : null;
			}
			if ( ! row || typeof row !== 'object' ) {
				return null;
			}
			const value = safeText(
				row.value ?? row.slug ?? row.id ?? row.key ?? ''
			);
			const label = safeText(
				row.label ?? row.title ?? row.name ?? value
			);
			if ( ! value && ! label ) {
				return null;
			}
			return {
				id: i + 1,
				value: value || label,
				label: label || value,
			};
		} )
		.filter( Boolean );

	const doctors = ( Array.isArray( doctorsRaw ) ? doctorsRaw : [] )
		.map( ( row, i ) => {
			if ( typeof row === 'string' ) {
				const name = safeText( row );
				return name ? { id: i + 1, deptValue: 'general', name } : null;
			}
			if ( ! row || typeof row !== 'object' ) {
				return null;
			}
			const name = safeText(
				row.name ?? row.doctorName ?? row.title ?? row.label ?? ''
			);
			if ( ! name ) {
				return null;
			}
			return {
				id: i + 1,
				deptValue: safeText(
					row.deptValue ??
						row.department ??
						row.departmentSlug ??
						row.dept ??
						'general'
				),
				name,
			};
		} )
		.filter( Boolean );

	const timeSlots = ( Array.isArray( timeRaw ) ? timeRaw : [] )
		.map( ( row, i ) => {
			if ( typeof row === 'string' ) {
				const v = safeText( row );
				return v ? { id: i + 1, value: v, label: v } : null;
			}
			if ( ! row || typeof row !== 'object' ) {
				return null;
			}
			const value = safeText(
				row.value ?? row.id ?? row.key ?? row.slug ?? ''
			);
			const label = safeText(
				row.label ?? row.title ?? row.name ?? value
			);
			if ( ! value && ! label ) {
				return null;
			}
			return {
				id: i + 1,
				value: value || label,
				label: label || value,
			};
		} )
		.filter( Boolean );

	return { departments, doctors, timeSlots };
}

/**
 * Build a stable booking form schema from any backend JSON shape.
 *
 * @param {unknown}                 payload
 * @param {{ fieldsPath?: string }} [opts]
 * @return {{
 *   fields: Array,
 *   departments: Array,
 *   doctors: Array,
 *   timeSlots: Array,
 *   submitUrl: string,
 *   ok: boolean
 * }}
 */
export function normalizeApiFormSchema( payload, opts = {} ) {
	const fieldsPath = opts.fieldsPath || '';
	const lists = extractBookingLists( payload );
	let fields = extractApiFieldsArray( payload, fieldsPath )
		.map( ( row, i ) => normalizeApiField( row, i ) )
		.filter( Boolean );

	// Deduplicate by name.
	const seen = new Set();
	fields = fields.filter( ( f ) => {
		if ( seen.has( f.name ) ) {
			return false;
		}
		seen.add( f.name );
		return true;
	} );

	// If backend only sent booking lists, synthesize select fields.
	if (
		! fields.length &&
		( lists.departments.length || lists.timeSlots.length )
	) {
		if ( lists.departments.length ) {
			fields.push( {
				name: 'department',
				label: 'Department',
				type: 'select',
				required: true,
				placeholder: '',
				options: lists.departments.map( ( d ) => ( {
					value: d.value,
					label: d.label,
				} ) ),
				fullWidth: false,
				section: 'appointment',
			} );
		}
		if ( lists.doctors.length ) {
			fields.push( {
				name: 'doctor',
				label: 'Doctor',
				type: 'select',
				required: false,
				placeholder: '',
				options: lists.doctors.map( ( d ) => ( {
					value: d.name,
					label: d.name,
				} ) ),
				fullWidth: false,
				section: 'appointment',
			} );
		}
		if ( lists.timeSlots.length ) {
			fields.push( {
				name: 'preferred_time',
				label: 'Preferred Time',
				type: 'select',
				required: false,
				placeholder: '',
				options: lists.timeSlots.map( ( t ) => ( {
					value: t.value,
					label: t.label,
				} ) ),
				fullWidth: false,
				section: 'appointment',
			} );
		}
	}

	const root = payload && typeof payload === 'object' ? payload : {};
	const submitUrl = safeText(
		root.submitUrl ??
			root.submit_url ??
			root.action ??
			root.data?.submitUrl ??
			root.data?.submit_url ??
			root.form?.action ??
			''
	);

	return {
		fields,
		departments: lists.departments,
		doctors: lists.doctors,
		timeSlots: lists.timeSlots,
		submitUrl,
		ok: fields.length > 0,
	};
}
