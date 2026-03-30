import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const DEFAULT_ATTS = {
	nameLabel: "Doctor's Name",
	searchPlaceholder: 'Type name e.g. Kyaw',
	departmentLabel: 'Department',
	departmentAllLabel: 'All Departments',
	genderLabel: 'Gender',
	genderAllLabel: 'All Genders',
	resetButtonText: 'Reset',
	containerMaxWidth: 1200,
	containerPadding: 30,
	sectionMarginTop: -80,
	sectionMarginBottom: 60,
	boxPadding: 30,
	boxBorderRadius: 8,
	boxBackgroundColor: '#ffffff',
	boxBorderTopColor: '#f48b2a',
	boxBorderTopWidth: 4,
	labelColor: '#666666',
	inputBorderColor: '#dddddd',
	inputFocusBorderColor: '#f48b2a',
	resetButtonBg: '#f0f0f0',
	resetButtonColor: '#666666',
	resetButtonHoverBg: '#e0e0e0',
	resetButtonHoverColor: '#212121',
	addAnimationClass: true,
};

const DEPT_OPTIONS = [
	{ value: 'heart', label: 'Heart Centre' },
	{ value: 'neuro', label: 'Neuro Centre' },
	{ value: 'cancer', label: 'Cancer Centre' },
	{ value: 'peds', label: 'Paediatrics' },
	{ value: 'general', label: 'General Medicine' },
	{ value: 'ent', label: 'ENT' },
	{ value: 'dental', label: 'Dental' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
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
		addAnimationClass,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-doctor-search-filter-editor',
			style: {
				marginTop: `${ sectionMarginTop }px`,
				marginBottom: `${ sectionMarginBottom }px`,
				position: 'relative',
				zIndex: 10,
			},
		} ),
		[ sectionMarginBottom, sectionMarginTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const searchBoxStyle = {
		background: boxBackgroundColor,
		padding: `${ boxPadding }px`,
		borderRadius: `${ boxBorderRadius }px`,
		boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
		display: 'flex',
		flexWrap: 'wrap',
		gap: '20px',
		alignItems: 'center',
		borderTop: `${ boxBorderTopWidth }px solid ${ boxBorderTopColor }`,
	};

	const labelStyle = {
		fontSize: '0.8rem',
		fontWeight: 700,
		textTransform: 'uppercase',
		color: labelColor,
	};

	const inputStyle = {
		width: '100%',
		padding: '12px 15px',
		border: `1px solid ${ inputBorderColor }`,
		borderRadius: 5,
		fontSize: '0.95rem',
		outline: 'none',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Labels & Placeholder', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Name field label', 'twork-builder' ) }
							value={ attrs.nameLabel }
							onChange={ ( val ) =>
								setAttributes( { nameLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Search placeholder',
								'twork-builder'
							) }
							value={ attrs.searchPlaceholder }
							onChange={ ( val ) =>
								setAttributes( { searchPlaceholder: val } )
							}
						/>

						<TextControl
							label={ __( 'Department label', 'twork-builder' ) }
							value={ attrs.departmentLabel }
							onChange={ ( val ) =>
								setAttributes( { departmentLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Department "All" option',
								'twork-builder'
							) }
							value={ attrs.departmentAllLabel }
							onChange={ ( val ) =>
								setAttributes( { departmentAllLabel: val } )
							}
						/>

						<TextControl
							label={ __( 'Gender label', 'twork-builder' ) }
							value={ attrs.genderLabel }
							onChange={ ( val ) =>
								setAttributes( { genderLabel: val } )
							}
						/>

						<TextControl
							label={ __(
								'Gender "All" option',
								'twork-builder'
							) }
							value={ attrs.genderAllLabel }
							onChange={ ( val ) =>
								setAttributes( { genderAllLabel: val } )
							}
						/>

						<TextControl
							label={ __( 'Reset button text', 'twork-builder' ) }
							value={ attrs.resetButtonText }
							onChange={ ( val ) =>
								setAttributes( { resetButtonText: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ attrs.containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ attrs.containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section margin top (px)',
								'twork-builder'
							) }
							value={ attrs.sectionMarginTop }
							onChange={ ( val ) =>
								setAttributes( { sectionMarginTop: val } )
							}
							min={ -150 }
							max={ 50 }
							step={ 5 }
							help={ __(
								'Negative values pull the filter up over the hero. Default -80.',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Section margin bottom (px)',
								'twork-builder'
							) }
							value={ attrs.sectionMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { sectionMarginBottom: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Search box styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Box padding (px)', 'twork-builder' ) }
							value={ attrs.boxPadding }
							onChange={ ( val ) =>
								setAttributes( { boxPadding: val } )
							}
							min={ 16 }
							max={ 60 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Border radius (px)',
								'twork-builder'
							) }
							value={ attrs.boxBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { boxBorderRadius: val } )
							}
							min={ 0 }
							max={ 24 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Top border width (px)',
								'twork-builder'
							) }
							value={ attrs.boxBorderTopWidth }
							onChange={ ( val ) =>
								setAttributes( { boxBorderTopWidth: val } )
							}
							min={ 0 }
							max={ 12 }
							step={ 1 }
						/>

						<PanelColorSettings
							title={ __( 'Box colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: attrs.boxBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											boxBackgroundColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: attrs.boxBorderTopColor,
									onChange: ( val ) =>
										setAttributes( {
											boxBorderTopColor: val,
										} ),
									label: __( 'Top border', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Labels & inputs', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Label color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: attrs.labelColor,
									onChange: ( val ) =>
										setAttributes( { labelColor: val } ),
									label: __( 'Label color', 'twork-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Input border', 'twork-builder' ) }
							colorSettings={ [
								{
									value: attrs.inputBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											inputBorderColor: val,
										} ),
									label: __( 'Border', 'twork-builder' ),
								},
								{
									value: attrs.inputFocusBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											inputFocusBorderColor: val,
										} ),
									label: __(
										'Focus border',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Reset button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Button colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: attrs.resetButtonBg,
									onChange: ( val ) =>
										setAttributes( { resetButtonBg: val } ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: attrs.resetButtonColor,
									onChange: ( val ) =>
										setAttributes( {
											resetButtonColor: val,
										} ),
									label: __( 'Text', 'twork-builder' ),
								},
								{
									value: attrs.resetButtonHoverBg,
									onChange: ( val ) =>
										setAttributes( {
											resetButtonHoverBg: val,
										} ),
									label: __(
										'Hover background',
										'twork-builder'
									),
								},
								{
									value: attrs.resetButtonHoverColor,
									onChange: ( val ) =>
										setAttributes( {
											resetButtonHoverColor: val,
										} ),
									label: __( 'Hover text', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Add animate-hero class',
								'twork-builder'
							) }
							checked={ attrs.addAnimationClass }
							onChange={ ( val ) =>
								setAttributes( { addAnimationClass: val } )
							}
							help={ __(
								'Adds class for hero entrance animation if your theme uses it.',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div
						className="search-section"
						style={ {
							marginTop: `${ sectionMarginTop }px`,
							marginBottom: `${ sectionMarginBottom }px`,
						} }
					>
						<div className="search-box" style={ searchBoxStyle }>
							<div
								className="filter-group"
								style={ {
									flex: 1,
									minWidth: 200,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
								} }
							>
								<label style={ labelStyle }>
									{ nameLabel }
								</label>
								<input
									type="text"
									className="filter-input"
									placeholder={ searchPlaceholder }
									readOnly
									disabled
									style={ inputStyle }
									aria-hidden
								/>
							</div>
							<div
								className="filter-group"
								style={ {
									flex: 1,
									minWidth: 200,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
								} }
							>
								<label style={ labelStyle }>
									{ departmentLabel }
								</label>
								<select
									className="filter-input"
									disabled
									style={ inputStyle }
									aria-hidden
								>
									<option>{ departmentAllLabel }</option>
								</select>
							</div>
							<div
								className="filter-group"
								style={ {
									flex: 1,
									minWidth: 200,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
								} }
							>
								<label style={ labelStyle }>
									{ genderLabel }
								</label>
								<select
									className="filter-input"
									disabled
									style={ inputStyle }
									aria-hidden
								>
									<option>{ genderAllLabel }</option>
								</select>
							</div>
							<div
								className="search-btn-wrapper"
								style={ { alignSelf: 'flex-end' } }
							>
								<button
									type="button"
									className="btn-reset"
									disabled
									style={ {
										padding: '12px 20px',
										borderRadius: 5,
										fontWeight: 700,
										cursor: 'default',
										background: attrs.resetButtonBg,
										color: attrs.resetButtonColor,
										border: 'none',
									} }
								>
									<i className="fas fa-undo" aria-hidden />{ ' ' }
									{ resetButtonText }
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
