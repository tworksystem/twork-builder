import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import {
	resolveDepartments,
	resolveDoctors,
	resolveTimeSlots,
	doctorsToMap,
	sanitizeFormShortcode,
	normalizeFaClass,
} from './data-helpers';

export default function save( { attributes } ) {
	const {
		infoTitle,
		infoDescription,
		showEmergencyBox,
		emergencyTitle,
		emergencyText,
		emergencyPhone,
		emergencyPhoneHref,
		emergencyIconClass,
		formSource = 'builtin',
		wpFormShortcode,
		apiFormUrl,
		apiFormMethod,
		apiSubmitUrl,
		apiFieldsPath,
		apiUseProxy = true,
		formId,
		formAction,
		formMethod,
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
		submitIconClass,
		successTitle,
		successMessage,
		successButtonText,
		successIconClass,
		layoutGap,
		containerMaxWidth,
		containerPadding,
		paddingBottom,
		formPadding,
		primaryColor,
		animationOnScroll,
	} = attributes;

	const departmentList = resolveDepartments( attributes );
	const timeList = resolveTimeSlots( attributes );
	const doctorsMapJson = JSON.stringify(
		doctorsToMap( resolveDoctors( attributes ) )
	);
	const resolvedFormId = formId || 'bookingForm';
	const safeShortcode = sanitizeFormShortcode( wpFormShortcode );
	const isWpForm = formSource === 'wp' && !! safeShortcode;
	const isApiForm = formSource === 'api' && !! ( apiFormUrl || '' ).trim();
	const resolvedFormSource = isWpForm ? 'wp' : isApiForm ? 'api' : 'builtin';

	const emergencyIcon = normalizeFaClass(
		emergencyIconClass || 'fas fa-truck-medical'
	);
	const submitIcon = normalizeFaClass(
		submitIconClass || 'fas fa-arrow-right'
	);
	const successIcon = normalizeFaClass(
		successIconClass || 'fas fa-circle-check'
	);

	const blockProps = useBlockProps.save( {
		className: 'mk-booking-layout-section jivaka-booking-module',
		style: {
			paddingBottom: `${ paddingBottom }px`,
			'--primary-orange': primaryColor,
			'--booking-layout-gap': `${ layoutGap }px`,
			'--booking-form-padding': `${ formPadding }px`,
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
		'data-doctors-map': isWpForm || isApiForm ? '{}' : doctorsMapJson,
		'data-form-source': resolvedFormSource,
		...( isApiForm
			? {
					'data-api-url': ( apiFormUrl || '' ).trim(),
					'data-api-method': ( apiFormMethod || 'GET' ).toUpperCase(),
					'data-api-submit-url': ( apiSubmitUrl || '' ).trim(),
					'data-api-fields-path': ( apiFieldsPath || '' ).trim(),
					'data-api-use-proxy': apiUseProxy !== false ? '1' : '0',
			  }
			: {} ),
	} );

	const layoutStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		padding: `0 ${ containerPadding }px`,
	};

	const effectiveAction =
		isApiForm && ( apiSubmitUrl || '' ).trim()
			? ( apiSubmitUrl || '' ).trim()
			: formAction;

	const formProps = {
		id: resolvedFormId,
		className: isApiForm
			? 'booking-form booking-form--api'
			: 'booking-form',
		method: formMethod || 'post',
	};
	if ( effectiveAction ) {
		formProps.action = effectiveAction;
	}

	const renderBuiltinFields = ( opts = {} ) => {
		const { disabled = false, asFallback = false } = opts;
		const wrapClass = asFallback ? 'booking-form-fallback' : undefined;
		const content = (
			<>
				{ patientDetailsTitle && (
					<RichText.Content
						tagName="h3"
						className="form-section-title"
						value={ patientDetailsTitle }
					/>
				) }
				<div className="form-grid">
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-name` }
						>
							{ fullNameLabel }
						</label>
						<input
							type="text"
							id={ `${ resolvedFormId }-name` }
							name="full_name"
							className="form-control"
							required
							placeholder={ fullNamePlaceholder }
							disabled={ disabled }
						/>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-phone` }
						>
							{ phoneLabel }
						</label>
						<input
							type="tel"
							id={ `${ resolvedFormId }-phone` }
							name="phone"
							className="form-control"
							required
							placeholder={ phonePlaceholder }
							disabled={ disabled }
						/>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-email` }
						>
							{ emailLabel }
						</label>
						<input
							type="email"
							id={ `${ resolvedFormId }-email` }
							name="email"
							className="form-control"
							placeholder={ emailPlaceholder }
							disabled={ disabled }
						/>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-dob` }
						>
							{ dobLabel }
						</label>
						<input
							type="date"
							id={ `${ resolvedFormId }-dob` }
							name="date_of_birth"
							className="form-control"
							disabled={ disabled }
						/>
					</div>
				</div>

				{ appointmentDetailsTitle && (
					<RichText.Content
						tagName="h3"
						className="form-section-title form-section-title--spaced"
						value={ appointmentDetailsTitle }
					/>
				) }
				<div className="form-grid">
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-dept` }
						>
							{ departmentLabel }
						</label>
						<select
							id={ `${ resolvedFormId }-dept` }
							name="department"
							className="form-control dept-select"
							required
							disabled={ disabled }
						>
							<option value="">-- Select Department --</option>
							{ departmentList.map( ( opt ) => (
								<option
									key={ opt.id || opt.value }
									value={ opt.value }
								>
									{ opt.label }
								</option>
							) ) }
						</select>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-doctor` }
						>
							{ doctorLabel }
						</label>
						<select
							id={ `${ resolvedFormId }-doctor` }
							name="doctor"
							className="form-control doc-select"
							disabled={ disabled }
						>
							<option value="">-- Any Available Doctor --</option>
						</select>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-date` }
						>
							{ dateLabel }
						</label>
						<input
							type="date"
							id={ `${ resolvedFormId }-date` }
							name="preferred_date"
							className="form-control"
							required
							disabled={ disabled }
						/>
					</div>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-time` }
						>
							{ timeLabel }
						</label>
						<select
							id={ `${ resolvedFormId }-time` }
							name="preferred_time"
							className="form-control"
							disabled={ disabled }
						>
							{ timeList.map( ( opt ) => (
								<option
									key={ opt.id || opt.value }
									value={ opt.value }
								>
									{ opt.label }
								</option>
							) ) }
						</select>
					</div>
					<div className="form-group full-width">
						<label
							className="form-label"
							htmlFor={ `${ resolvedFormId }-reason` }
						>
							{ reasonLabel }
						</label>
						<textarea
							id={ `${ resolvedFormId }-reason` }
							name="reason"
							className="form-control"
							rows={ 4 }
							placeholder={ reasonPlaceholder }
							disabled={ disabled }
						/>
					</div>
				</div>
			</>
		);

		if ( asFallback ) {
			return <div className={ wrapClass }>{ content }</div>;
		}
		return content;
	};

	const successOverlay = (
		<div
			className="success-overlay"
			id={ `${ resolvedFormId }-success` }
			hidden
		>
			<div className="success-icon">
				<i className={ successIcon } aria-hidden="true" />
			</div>
			{ successTitle && (
				<RichText.Content tagName="h3" value={ successTitle } />
			) }
			{ successMessage && (
				<RichText.Content tagName="p" value={ successMessage } />
			) }
			<button
				type="button"
				className="jivaka-btn btn-primary success-reload-btn"
				style={ { marginTop: '20px', width: 'auto' } }
			>
				{ successButtonText }
			</button>
		</div>
	);

	const submitButton = (
		<button
			type="submit"
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
	);

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container booking-layout"
				style={ layoutStyle }
			>
				<div className="booking-info animate-left">
					{ infoTitle && (
						<RichText.Content tagName="h2" value={ infoTitle } />
					) }
					{ infoDescription && (
						<RichText.Content
							tagName="p"
							className="booking-info-desc"
							value={ infoDescription }
						/>
					) }
					<div className="booking-info-cards">
						<InnerBlocks.Content />
					</div>
					{ showEmergencyBox && (
						<div className="emergency-box">
							{ emergencyTitle && (
								<h4>
									<i
										className={ emergencyIcon }
										aria-hidden="true"
									/>{ ' ' }
									<RichText.Content
										tagName="span"
										value={ emergencyTitle }
									/>
								</h4>
							) }
							{ emergencyText && (
								<RichText.Content
									tagName="p"
									value={ emergencyText }
								/>
							) }
							{ emergencyPhone && (
								<a href={ emergencyPhoneHref || '#' }>
									{ emergencyPhone }
								</a>
							) }
						</div>
					) }
				</div>

				<div className="form-wrapper animate-up">
					{ isWpForm ? (
						<div className="booking-wp-form">{ safeShortcode }</div>
					) : isApiForm ? (
						<>
							<form
								{ ...formProps }
								noValidate={ ! effectiveAction }
							>
								<div
									className="booking-api-mount"
									data-booking-api-mount
									aria-live="polite"
								>
									<p className="booking-api-loading">
										Loading form…
									</p>
								</div>
								{ renderBuiltinFields( {
									disabled: true,
									asFallback: true,
								} ) }
								{ submitButton }
							</form>
							{ successOverlay }
						</>
					) : (
						<>
							<form { ...formProps } noValidate={ ! formAction }>
								{ renderBuiltinFields() }
								{ submitButton }
							</form>
							{ successOverlay }
						</>
					) }
				</div>
			</div>
		</section>
	);
}
