/**
 * Booking Layout / Hero – frontend init.
 * Doctor select, form success overlay, API form hydrate, scroll animations.
 */
( function () {
	'use strict';

	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	const ALLOWED_FIELD_TYPES = {
		text: 1,
		tel: 1,
		email: 1,
		date: 1,
		number: 1,
		textarea: 1,
		select: 1,
		checkbox: 1,
		radio: 1,
		hidden: 1,
	};

	function parseDoctorsMap( raw ) {
		try {
			return JSON.parse( raw || '{}' ) || {};
		} catch ( e ) {
			return {};
		}
	}

	function normalizeDeptSlug( slug ) {
		return String( slug || '' )
			.trim()
			.toLowerCase();
	}

	function safeText( value ) {
		return String( value == null ? '' : value )
			.replace( /<[^>]*>/g, '' )
			.trim();
	}

	function getByPath( root, path ) {
		if ( ! path || typeof path !== 'string' ) {
			return root;
		}
		const parts = path
			.replace( /\[(\w+)\]/g, '.$1' )
			.split( '.' )
			.filter( Boolean );
		let cur = root;
		for ( let i = 0; i < parts.length; i++ ) {
			if ( cur == null || typeof cur !== 'object' ) {
				return undefined;
			}
			cur = cur[ parts[ i ] ];
		}
		return cur;
	}

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
			opt.value != null
				? opt.value
				: opt.id != null
				? opt.id
				: opt.key != null
				? opt.key
				: opt.slug != null
				? opt.slug
				: opt.name != null
				? opt.name
				: index
		);
		const label = safeText(
			opt.label || opt.title || opt.name || opt.text || value
		);
		if ( ! value && ! label ) {
			return null;
		}
		return { value: value || label, label: label || value };
	}

	function normalizeApiField( raw, index ) {
		if ( raw == null ) {
			return null;
		}
		if ( typeof raw === 'string' ) {
			const labelOnly = safeText( raw );
			const nameOnly = labelOnly
				.toLowerCase()
				.replace( /[^a-z0-9_]+/g, '_' );
			if ( ! nameOnly ) {
				return null;
			}
			return {
				name: nameOnly,
				label: labelOnly,
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
			raw.name ||
				raw.key ||
				raw.id ||
				raw.field ||
				raw.fieldName ||
				raw.slug ||
				'field_' + ( index + 1 )
		)
			.toLowerCase()
			.replace( /[^a-z0-9_]+/g, '_' );
		if ( ! name ) {
			return null;
		}

		let type = safeText(
			raw.type ||
				raw.inputType ||
				raw.fieldType ||
				raw.component ||
				'text'
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
		if ( ! ALLOWED_FIELD_TYPES[ type ] ) {
			type = 'text';
		}

		const optionsRaw =
			raw.options ||
			raw.choices ||
			raw.values ||
			raw.items ||
			raw.enum ||
			[];
		const options = ( Array.isArray( optionsRaw ) ? optionsRaw : [] )
			.map( normalizeOption )
			.filter( Boolean );

		const required = !! (
			raw.required ||
			raw.isRequired ||
			raw.mandatory ||
			( raw.rules && raw.rules.required )
		);

		return {
			name,
			label: safeText( raw.label || raw.title || raw.caption || name ),
			type,
			required,
			placeholder: safeText( raw.placeholder || raw.hint || '' ),
			options,
			fullWidth: !! (
				raw.fullWidth ||
				raw.full_width ||
				type === 'textarea'
			),
		};
	}

	function extractApiFieldsArray( payload, fieldsPath ) {
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
			payload.data && payload.data.fields,
			payload.data && payload.data.items,
			payload.data && payload.data.formFields,
			payload.data && payload.data.form && payload.data.form.fields,
			payload.form && payload.form.fields,
			payload.form && payload.form.items,
			payload.result && payload.result.fields,
			payload.payload && payload.payload.fields,
		];
		for ( let i = 0; i < candidates.length; i++ ) {
			if ( Array.isArray( candidates[ i ] ) && candidates[ i ].length ) {
				return candidates[ i ];
			}
		}
		return [];
	}

	function normalizeApiFormSchema( payload, fieldsPath ) {
		if (
			payload &&
			Array.isArray( payload.fields ) &&
			payload.ok !== false
		) {
			// Already normalized by WP proxy.
			const pre = [];
			const seenPre = {};
			( payload.fields || [] ).forEach( function ( row, i ) {
				const f = normalizeApiField( row, i );
				if ( f && ! seenPre[ f.name ] ) {
					seenPre[ f.name ] = true;
					pre.push( f );
				}
			} );
			return {
				fields: pre,
				submitUrl: safeText( payload.submitUrl || '' ),
				ok: pre.length > 0,
			};
		}

		let fields = extractApiFieldsArray( payload, fieldsPath || '' )
			.map( normalizeApiField )
			.filter( Boolean );
		const seen = {};
		fields = fields.filter( function ( f ) {
			if ( seen[ f.name ] ) {
				return false;
			}
			seen[ f.name ] = true;
			return true;
		} );

		const root = payload && typeof payload === 'object' ? payload : {};
		const data =
			root.data && typeof root.data === 'object' ? root.data : root;
		const departments = Array.isArray( data.departments )
			? data.departments
			: [];
		const doctors = Array.isArray( data.doctors ) ? data.doctors : [];
		const timeSlots = Array.isArray( data.timeSlots )
			? data.timeSlots
			: Array.isArray( data.time_slots )
			? data.time_slots
			: [];

		if ( ! fields.length && ( departments.length || timeSlots.length ) ) {
			if ( departments.length ) {
				fields.push( {
					name: 'department',
					label: 'Department',
					type: 'select',
					required: true,
					placeholder: '',
					options: departments
						.map( normalizeOption )
						.filter( Boolean ),
					fullWidth: false,
				} );
			}
			if ( doctors.length ) {
				fields.push( {
					name: 'doctor',
					label: 'Doctor',
					type: 'select',
					required: false,
					placeholder: '',
					options: doctors
						.map( function ( row, i ) {
							if ( typeof row === 'string' ) {
								return normalizeOption( row, i );
							}
							const name = safeText(
								( row &&
									( row.name ||
										row.doctorName ||
										row.title ||
										row.label ) ) ||
									''
							);
							return name ? { value: name, label: name } : null;
						} )
						.filter( Boolean ),
					fullWidth: false,
				} );
			}
			if ( timeSlots.length ) {
				fields.push( {
					name: 'preferred_time',
					label: 'Preferred Time',
					type: 'select',
					required: false,
					placeholder: '',
					options: timeSlots.map( normalizeOption ).filter( Boolean ),
					fullWidth: false,
				} );
			}
		}

		return {
			fields,
			submitUrl: safeText(
				root.submitUrl ||
					root.submit_url ||
					root.action ||
					( data && ( data.submitUrl || data.submit_url ) ) ||
					''
			),
			ok: fields.length > 0,
		};
	}

	function escapeAttr( value ) {
		return String( value || '' )
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' );
	}

	function renderApiFields( mount, fields, formId ) {
		let html = '<div class="form-grid booking-api-fields">';
		fields.forEach( function ( field, index ) {
			const id =
				( formId || 'bookingForm' ) +
				'-api-' +
				field.name +
				'-' +
				index;
			const wrapClass =
				'form-group' + ( field.fullWidth ? ' full-width' : '' );
			const required = field.required ? ' required' : '';
			const placeholder = escapeAttr( field.placeholder || '' );
			const label = escapeAttr( field.label || field.name );

			if ( field.type === 'hidden' ) {
				html +=
					'<input type="hidden" name="' +
					escapeAttr( field.name ) +
					'" value="' +
					placeholder +
					'" />';
				return;
			}

			html += '<div class="' + wrapClass + '">';
			html +=
				'<label class="form-label" for="' +
				escapeAttr( id ) +
				'">' +
				label +
				'</label>';

			if ( field.type === 'textarea' ) {
				html +=
					'<textarea id="' +
					escapeAttr( id ) +
					'" name="' +
					escapeAttr( field.name ) +
					'" class="form-control" rows="4" placeholder="' +
					placeholder +
					'"' +
					required +
					'></textarea>';
			} else if ( field.type === 'select' ) {
				html +=
					'<select id="' +
					escapeAttr( id ) +
					'" name="' +
					escapeAttr( field.name ) +
					'" class="form-control' +
					( field.name === 'department' ? ' dept-select' : '' ) +
					( field.name === 'doctor' ? ' doc-select' : '' ) +
					'"' +
					required +
					'>';
				html += '<option value="">-- Select --</option>';
				( field.options || [] ).forEach( function ( opt ) {
					html +=
						'<option value="' +
						escapeAttr( opt.value ) +
						'">' +
						escapeAttr( opt.label ) +
						'</option>';
				} );
				html += '</select>';
			} else if ( field.type === 'checkbox' ) {
				html +=
					'<label class="booking-api-check"><input type="checkbox" id="' +
					escapeAttr( id ) +
					'" name="' +
					escapeAttr( field.name ) +
					'" value="1"' +
					required +
					' /> ' +
					label +
					'</label>';
			} else if ( field.type === 'radio' ) {
				( field.options || [] ).forEach( function ( opt, oi ) {
					const rid = id + '-' + oi;
					html +=
						'<label class="booking-api-radio"><input type="radio" id="' +
						escapeAttr( rid ) +
						'" name="' +
						escapeAttr( field.name ) +
						'" value="' +
						escapeAttr( opt.value ) +
						'"' +
						( field.required && oi === 0 ? ' required' : '' ) +
						' /> ' +
						escapeAttr( opt.label ) +
						'</label>';
				} );
			} else {
				html +=
					'<input type="' +
					escapeAttr( field.type ) +
					'" id="' +
					escapeAttr( id ) +
					'" name="' +
					escapeAttr( field.name ) +
					'" class="form-control" placeholder="' +
					placeholder +
					'"' +
					required +
					' />';
			}
			html += '</div>';
		} );
		html += '</div>';
		mount.innerHTML = html;
	}

	/**
	 * Prefer live doctor cards (data-dept + data-name) over saved map.
	 */
	function collectDoctorsMapFromCards() {
		const map = {};
		document
			.querySelectorAll( '.doctor-card[data-name]' )
			.forEach( function ( card ) {
				const name = ( card.getAttribute( 'data-name' ) || '' ).trim();
				const dept = (
					card.getAttribute( 'data-dept' ) || 'general'
				).trim();
				if ( ! name || ! dept ) {
					return;
				}
				if ( ! map[ dept ] ) {
					map[ dept ] = [];
				}
				if ( map[ dept ].indexOf( name ) === -1 ) {
					map[ dept ].push( name );
				}
			} );
		return map;
	}

	function mapHasDoctors( map ) {
		return Object.keys( map || {} ).some( function ( key ) {
			return Array.isArray( map[ key ] ) && map[ key ].length > 0;
		} );
	}

	function resolveDoctorsForDept( map, selected ) {
		if ( ! selected || ! map ) {
			return [];
		}
		if ( Array.isArray( map[ selected ] ) && map[ selected ].length ) {
			return map[ selected ];
		}
		const norm = normalizeDeptSlug( selected );
		const keys = Object.keys( map );
		for ( let i = 0; i < keys.length; i++ ) {
			if ( normalizeDeptSlug( keys[ i ] ) === norm ) {
				return map[ keys[ i ] ] || [];
			}
		}
		return [];
	}

	function resolveDoctorsMap( section ) {
		const fromAttr = parseDoctorsMap(
			section.getAttribute( 'data-doctors-map' )
		);
		if ( mapHasDoctors( fromAttr ) ) {
			return fromAttr;
		}
		return collectDoctorsMapFromCards();
	}

	function fillDoctorOptions( docSelect, doctorsMap, deptValue ) {
		docSelect.innerHTML =
			'<option value="">-- Any Available Doctor --</option>';
		const list = resolveDoctorsForDept( doctorsMap, deptValue );
		list.forEach( function ( doc ) {
			const option = document.createElement( 'option' );
			option.value = doc;
			option.textContent = doc;
			docSelect.appendChild( option );
		} );
	}

	function initDoctorSelect( section ) {
		const deptSelect = section.querySelector( '.dept-select' );
		const docSelect = section.querySelector( '.doc-select' );
		if ( ! deptSelect || ! docSelect ) {
			return;
		}

		let doctors = resolveDoctorsMap( section );

		if ( deptSelect.dataset.bookingBound ) {
			return;
		}
		deptSelect.dataset.bookingBound = '1';

		if ( deptSelect.value ) {
			fillDoctorOptions( docSelect, doctors, deptSelect.value );
		}

		deptSelect.addEventListener( 'change', function () {
			doctors = resolveDoctorsMap( section );
			fillDoctorOptions( docSelect, doctors, this.value );
		} );
	}

	function showSuccess( section, form ) {
		const success =
			section.querySelector( '.success-overlay' ) ||
			document.getElementById( form.id + '-success' );
		if ( ! success ) {
			return;
		}
		success.removeAttribute( 'hidden' );
		success.classList.add( 'is-visible' );
		const icon = success.querySelector( '.success-icon' );
		if ( icon ) {
			icon.classList.add( 'is-pop' );
		}
	}

	function initForm( section ) {
		const source = section.getAttribute( 'data-form-source' ) || 'builtin';
		if ( source === 'wp' ) {
			return;
		}
		// API forms bind after hydrate (see initApiForm).
		if (
			source === 'api' &&
			! section.classList.contains( 'is-api-ready' ) &&
			! section.classList.contains( 'is-api-fallback' )
		) {
			return;
		}

		const form = section.querySelector( '.booking-form' );
		if ( ! form || form.dataset.bookingBound ) {
			return;
		}
		form.dataset.bookingBound = '1';

		const reloadBtn = section.querySelector( '.success-reload-btn' );
		if ( reloadBtn && ! reloadBtn.dataset.bookingBound ) {
			reloadBtn.dataset.bookingBound = '1';
			reloadBtn.addEventListener( 'click', function () {
				window.location.reload();
			} );
		}

		form.addEventListener( 'submit', function ( e ) {
			// Real action URL → browser native submit.
			if ( form.getAttribute( 'action' ) ) {
				return;
			}

			e.preventDefault();

			if ( ! form.checkValidity() ) {
				form.reportValidity();
				return;
			}

			const btn = form.querySelector( 'button[type="submit"]' );
			const originalHtml = btn ? btn.innerHTML : '';
			if ( btn ) {
				btn.innerHTML =
					'<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Processing...';
				btn.style.opacity = '0.7';
				btn.disabled = true;
			}

			window.setTimeout( function () {
				showSuccess( section, form );
				if ( btn ) {
					btn.innerHTML = originalHtml;
					btn.style.opacity = '';
					btn.disabled = false;
				}
			}, 1200 );
		} );
	}

	function restBase() {
		if ( window.wpApiSettings && window.wpApiSettings.root ) {
			return window.wpApiSettings.root;
		}
		return '/wp-json/';
	}

	function fetchApiSchema( section ) {
		const url = ( section.getAttribute( 'data-api-url' ) || '' ).trim();
		const method = (
			section.getAttribute( 'data-api-method' ) || 'GET'
		).toUpperCase();
		const fieldsPath = (
			section.getAttribute( 'data-api-fields-path' ) || ''
		).trim();
		const useProxy = section.getAttribute( 'data-api-use-proxy' ) !== '0';

		if ( ! url ) {
			return Promise.reject( new Error( 'missing-url' ) );
		}

		if ( useProxy ) {
			const proxy =
				restBase() +
				'twork/v1/booking-form-schema?url=' +
				encodeURIComponent( url ) +
				'&fields_path=' +
				encodeURIComponent( fieldsPath ) +
				'&method=' +
				encodeURIComponent( method );
			return fetch( proxy, {
				credentials: 'same-origin',
				headers: { Accept: 'application/json' },
			} ).then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'proxy-failed' );
				}
				return res.json();
			} );
		}

		return fetch( url, {
			method: method === 'POST' ? 'POST' : 'GET',
			headers: { Accept: 'application/json' },
		} )
			.then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'upstream-failed' );
				}
				return res.json();
			} )
			.then( function ( raw ) {
				return normalizeApiFormSchema( raw, fieldsPath );
			} );
	}

	function initApiForm( section ) {
		if ( section.getAttribute( 'data-form-source' ) !== 'api' ) {
			return;
		}
		if ( section.dataset.apiHydrated ) {
			return;
		}
		section.dataset.apiHydrated = '1';

		const form = section.querySelector( '.booking-form--api' );
		const mount = section.querySelector( '[data-booking-api-mount]' );
		const fallback = section.querySelector( '.booking-form-fallback' );
		if ( ! form || ! mount ) {
			return;
		}

		fetchApiSchema( section )
			.then( function ( schema ) {
				const normalized = normalizeApiFormSchema( schema );
				if ( ! normalized.ok ) {
					throw new Error( 'empty-schema' );
				}

				renderApiFields( mount, normalized.fields, form.id );

				const submitUrl =
					(
						section.getAttribute( 'data-api-submit-url' ) || ''
					).trim() ||
					normalized.submitUrl ||
					'';
				if ( submitUrl ) {
					form.setAttribute( 'action', submitUrl );
				}

				section.classList.add( 'is-api-ready' );
				if ( fallback ) {
					fallback.setAttribute( 'hidden', 'hidden' );
					fallback
						.querySelectorAll( 'input,select,textarea' )
						.forEach( function ( el ) {
							el.disabled = true;
							el.removeAttribute( 'required' );
						} );
				}

				initDoctorSelect( section );
				initForm( section );
			} )
			.catch( function () {
				section.classList.add( 'is-api-fallback' );
				mount.innerHTML =
					'<p class="booking-api-fallback-msg">Could not load API form. Using built-in fields.</p>';
				if ( fallback ) {
					fallback.removeAttribute( 'hidden' );
					fallback
						.querySelectorAll( 'input,select,textarea' )
						.forEach( function ( el ) {
							el.disabled = false;
						} );
				}
				initDoctorSelect( section );
				initForm( section );
			} );
	}

	function observeAnimate( el ) {
		if ( ! el || el.dataset.animation !== 'true' || prefersReducedMotion ) {
			if ( el ) {
				el.classList.add( 'is-animated' );
			}
			return;
		}

		if ( ! ( 'IntersectionObserver' in window ) ) {
			el.classList.add( 'is-animated' );
			return;
		}

		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-animated' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
		);

		observer.observe( el );
	}

	function initHero( section ) {
		if ( ! section || section.dataset.bookingBound ) {
			return;
		}
		section.dataset.bookingBound = '1';

		if ( section.dataset.animation !== 'true' || prefersReducedMotion ) {
			section.classList.add( 'is-animated' );
			return;
		}

		window.requestAnimationFrame( function () {
			section.classList.add( 'is-animated' );
		} );
	}

	function initAll() {
		document
			.querySelectorAll( '.mk-booking-layout-section' )
			.forEach( function ( section ) {
				initApiForm( section );
				initDoctorSelect( section );
				initForm( section );
				observeAnimate( section );
			} );

		document
			.querySelectorAll( '.mk-booking-hero-section' )
			.forEach( initHero );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
