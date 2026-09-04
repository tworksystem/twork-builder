import { useBlockProps } from '@wordpress/block-editor';
import {
	DEFAULT_DEPARTMENTS,
	normalizeDepartments,
	normalizeGenders,
	DEFAULT_GENDERS,
} from '@twork-builder/shared/doctor-filter-data';

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
		departments,
		genders,
	} = attributes;

	const departmentOptions = normalizeDepartments( departments );
	const genderOptions = normalizeGenders( genders );

	const marginTopPx = sectionMarginTop !== undefined ? sectionMarginTop : -40;
	const marginBottomPx =
		sectionMarginBottom !== undefined ? sectionMarginBottom : 60;

	const blockProps = useBlockProps.save( {
		className: 'mk-doctor-search-filter-section',
		style: {
			position: 'relative',
			'--mk-search-section-margin-top': `${ marginTopPx }px`,
			'--mk-search-section-margin-bottom': `${ marginBottomPx }px`,
			'--mk-search-label-color': labelColor || undefined,
			'--mk-search-input-border': inputBorderColor || undefined,
			'--mk-search-input-focus-border':
				inputFocusBorderColor || undefined,
			'--mk-search-reset-bg': resetButtonBg || undefined,
			'--mk-search-reset-color': resetButtonColor || undefined,
			'--mk-search-reset-hover-bg': resetButtonHoverBg || undefined,
			'--mk-search-reset-hover-color': resetButtonHoverColor || undefined,
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
		// doctors.html: flex row, vertically centered controls.
		boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
		display: 'flex',
		flexWrap: 'wrap',
		gap: '20px',
		alignItems: 'center',
		boxSizing: 'border-box',
	};

	const searchSectionStyle = {
		marginTop: `${ marginTopPx }px`,
		marginBottom: `${ marginBottomPx }px`,
		position: 'relative',
		zIndex: 10,
	};

	const sectionClass = addAnimationClass
		? 'search-section animate-hero'
		: 'search-section';

	return (
		<div { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				<div className={ sectionClass } style={ searchSectionStyle }>
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
								{ departmentOptions.map( ( opt ) => (
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
								{ genderOptions.map( ( opt ) => (
									<option
										key={ opt.value }
										value={ opt.value }
									>
										{ opt.label }
									</option>
								) ) }
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
