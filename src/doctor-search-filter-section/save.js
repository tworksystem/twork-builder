import { useBlockProps } from '@wordpress/block-editor';

const DEPT_OPTIONS = [
	{ value: 'heart', label: 'Heart Centre' },
	{ value: 'neuro', label: 'Neuro Centre' },
	{ value: 'cancer', label: 'Cancer Centre' },
	{ value: 'peds', label: 'Paediatrics' },
	{ value: 'general', label: 'General Medicine' },
	{ value: 'ent', label: 'ENT' },
	{ value: 'dental', label: 'Dental' },
];

export default function save( { attributes } ) {
	const {
		nameLabel,
		searchPlaceholder,
		departmentLabel,
		departmentAllLabel,
		genderLabel,
		genderAllLabel,
		resetButtonText,
		containerMaxWidth,
		containerPadding,
		sectionMarginTop,
		sectionMarginBottom,
		boxPadding,
		boxBorderRadius,
		boxBackgroundColor,
		boxBorderTopColor,
		boxBorderTopWidth,
		labelColor,
		inputBorderColor,
		inputFocusBorderColor,
		resetButtonBg,
		resetButtonColor,
		resetButtonHoverBg,
		resetButtonHoverColor,
		addAnimationClass,
	} = attributes;

	const marginTopPx = sectionMarginTop !== undefined ? sectionMarginTop : -80;
	const blockProps = useBlockProps.save( {
		className: 'twork-doctor-search-filter-section',
		style: {
			// Use only physical margin properties so the serialized HTML
			// from the editor matches exactly what save() generates.
			marginTop: `${ marginTopPx }px`,
			marginBottom:
				sectionMarginBottom !== undefined
					? `${ sectionMarginBottom }px`
					: undefined,
			position: 'relative',
			zIndex: 10,
			'--twork-search-section-margin-top': `${ marginTopPx }px`,
			'--twork-search-section-margin-bottom':
				sectionMarginBottom !== undefined
					? `${ sectionMarginBottom }px`
					: undefined,
			'--twork-search-label-color': labelColor || undefined,
			'--twork-search-input-border': inputBorderColor || undefined,
			'--twork-search-input-focus-border':
				inputFocusBorderColor || undefined,
			'--twork-search-reset-bg': resetButtonBg || undefined,
			'--twork-search-reset-color': resetButtonColor || undefined,
			'--twork-search-reset-hover-bg': resetButtonHoverBg || undefined,
			'--twork-search-reset-hover-color':
				resetButtonHoverColor || undefined,
		},
	} );

	const containerStyle = {
		maxWidth: containerMaxWidth ? `${ containerMaxWidth }px` : undefined,
		margin: '0 auto',
		padding:
			containerPadding !== undefined
				? `0 ${ containerPadding }px`
				: undefined,
		position: 'relative',
	};

	const searchBoxStyle = {
		background: boxBackgroundColor || undefined,
		padding: boxPadding !== undefined ? `${ boxPadding }px` : undefined,
		borderRadius:
			boxBorderRadius !== undefined
				? `${ boxBorderRadius }px`
				: undefined,
		borderTop: boxBorderTopWidth
			? `${ boxBorderTopWidth }px solid ${
					boxBorderTopColor || '#f48b2a'
			  }`
			: undefined,
	};

	const sectionClass = addAnimationClass
		? 'search-section animate-hero'
		: 'search-section';

	return (
		<div { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				<div className={ sectionClass }>
					<div className="search-box" style={ searchBoxStyle }>
						<div className="filter-group">
							<label htmlFor="searchInput">
								{ nameLabel || "Doctor's Name" }
							</label>
							<input
								type="text"
								id="searchInput"
								className="filter-input"
								placeholder={
									searchPlaceholder || 'Type name e.g. Kyaw'
								}
								autoComplete="off"
								aria-label={ nameLabel || "Doctor's Name" }
							/>
						</div>

						<div className="filter-group">
							<label htmlFor="deptFilter">
								{ departmentLabel || 'Department' }
							</label>
							<select
								id="deptFilter"
								className="filter-input"
								aria-label={ departmentLabel || 'Department' }
							>
								<option value="all">
									{ departmentAllLabel || 'All Departments' }
								</option>
								{ DEPT_OPTIONS.map( ( opt ) => (
									<option
										key={ opt.value }
										value={ opt.value }
									>
										{ opt.label }
									</option>
								) ) }
							</select>
						</div>

						<div className="filter-group">
							<label htmlFor="genderFilter">
								{ genderLabel || 'Gender' }
							</label>
							<select
								id="genderFilter"
								className="filter-input"
								aria-label={ genderLabel || 'Gender' }
							>
								<option value="all">
									{ genderAllLabel || 'All Genders' }
								</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<div className="search-btn-wrapper">
							<button
								type="button"
								className="btn-reset"
								id="resetBtn"
								aria-label={
									resetButtonText || 'Reset filters'
								}
							>
								<i className="fas fa-undo" aria-hidden="true" />
								{ resetButtonText || 'Reset' }
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
