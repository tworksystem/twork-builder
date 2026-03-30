import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		jobTitle,
		jobTitleColor,
		jobTitleFontSize,
		jobTitleFontWeight,
		location,
		employmentType,
		departmentIcon,
		department,
		metaColor,
		metaFontSize,
		metaIconColor,
		applyUrl,
		applyText,
		applyTarget,
		applyButtonStyle,
		cardPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-job-card-item-editor job-card',
			style: {
				padding: `${ cardPadding }px 30px`,
				background: '#fff',
				border: '2px dashed #e0e0e0',
				borderRadius: '10px',
				marginBottom: '20px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			},
		} ),
		[ cardPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Job Details', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Location', 'twork-builder' ) }
							value={ location }
							onChange={ ( val ) =>
								setAttributes( { location: val } )
							}
						/>

						<TextControl
							label={ __( 'Employment Type', 'twork-builder' ) }
							value={ employmentType }
							onChange={ ( val ) =>
								setAttributes( { employmentType: val } )
							}
							help={ __(
								'e.g. Full Time, Part Time, Rotational Shift',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Department Icon', 'twork-builder' ) }
							value={ departmentIcon }
							onChange={ ( val ) =>
								setAttributes( { departmentIcon: val } )
							}
							help={ __(
								'Font Awesome class. e.g. fas fa-stethoscope, fas fa-briefcase',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Department', 'twork-builder' ) }
							value={ department }
							onChange={ ( val ) =>
								setAttributes( { department: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Job Title', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: jobTitleColor,
									onChange: ( val ) =>
										setAttributes( { jobTitleColor: val } ),
									label: __( 'Title Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ jobTitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { jobTitleFontSize: val } )
							}
							min={ 1 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ jobTitleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { jobTitleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Meta Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Meta Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: metaColor,
									onChange: ( val ) =>
										setAttributes( { metaColor: val } ),
									label: __( 'Text Color', 'twork-builder' ),
								},
								{
									value: metaIconColor,
									onChange: ( val ) =>
										setAttributes( { metaIconColor: val } ),
									label: __( 'Icon Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Meta Font Size (rem)',
								'twork-builder'
							) }
							value={ metaFontSize }
							onChange={ ( val ) =>
								setAttributes( { metaFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Apply Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button Text', 'twork-builder' ) }
							value={ applyText }
							onChange={ ( val ) =>
								setAttributes( { applyText: val } )
							}
						/>

						<TextControl
							label={ __( 'Apply URL', 'twork-builder' ) }
							value={ applyUrl }
							onChange={ ( val ) =>
								setAttributes( { applyUrl: val } )
							}
							help={ __(
								'Link for Apply button (e.g. application form URL)',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Open in new tab', 'twork-builder' ) }
							checked={ applyTarget }
							onChange={ ( val ) =>
								setAttributes( { applyTarget: val } )
							}
						/>

						<SelectControl
							label={ __( 'Button Style', 'twork-builder' ) }
							value={ applyButtonStyle }
							options={ [
								{
									label: __(
										'Primary (Orange)',
										'twork-builder'
									),
									value: 'primary',
								},
								{
									label: __(
										'Outline Dark',
										'twork-builder'
									),
									value: 'outline',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { applyButtonStyle: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Card Padding (px)', 'twork-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 16 }
							max={ 40 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="job-info">
					<RichText
						tagName="h3"
						value={ jobTitle }
						onChange={ ( val ) =>
							setAttributes( { jobTitle: val } )
						}
						placeholder={ __( 'Job title...', 'twork-builder' ) }
						style={ {
							margin: '0 0 8px 0',
							fontSize: `${ jobTitleFontSize }rem`,
							fontWeight: jobTitleFontWeight,
							color: jobTitleColor,
						} }
					/>

					<div
						className="job-meta"
						style={ {
							display: 'flex',
							gap: '20px',
							fontSize: `${ metaFontSize }rem`,
							color: metaColor,
						} }
					>
						{ location && (
							<span>
								<i
									className="fas fa-map-marker-alt"
									style={ {
										color: metaIconColor,
										marginRight: '5px',
									} }
									aria-hidden="true"
								/>

								{ location }
							</span>
						) }
						{ employmentType && (
							<span>
								<i
									className="fas fa-clock"
									style={ {
										color: metaIconColor,
										marginRight: '5px',
									} }
									aria-hidden="true"
								/>

								{ employmentType }
							</span>
						) }
						{ department && (
							<span>
								<i
									className={ departmentIcon }
									style={ {
										color: metaIconColor,
										marginRight: '5px',
									} }
									aria-hidden="true"
								/>

								{ department }
							</span>
						) }
					</div>
				</div>
				<div className="job-action" contentEditable={ false }>
					<a
						href={ applyUrl || '#' }
						className={ `jivaka-btn btn-${ applyButtonStyle }` }
						target={ applyTarget ? '_blank' : undefined }
						rel={ applyTarget ? 'noopener noreferrer' : undefined }
					>
						{ applyText }
					</a>
				</div>
			</div>
		</>
	);
}
