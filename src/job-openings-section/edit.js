import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontSizeMobile,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleMaxWidth,
		showHeaderLine,
		headerLineColor,
		headerMarginBottom,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		animationOnScroll,
		animationDelay,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/job-category-item' ];
	const TEMPLATE = [
		[
			'twork/job-category-item',
			{
				categoryTitle: 'Medical & Nursing',
				categoryTitleColor: '#212121',
			},
			[
				[
					'twork/job-card-item',
					{
						jobTitle: 'Senior Staff Nurse (ICU)',
						location: 'Mandalay',
						employmentType: 'Full Time',
						departmentIcon: 'fas fa-stethoscope',
						department: 'Nursing Dept',
					},
				],

				[
					'twork/job-card-item',
					{
						jobTitle: 'Resident Medical Officer (RMO)',
						location: 'Mandalay',
						employmentType: 'Rotational Shift',
						departmentIcon: 'fas fa-user-md',
						department: 'Emergency Dept',
					},
				],

				[
					'twork/job-card-item',
					{
						jobTitle: 'Radiology Technician',
						location: 'Mandalay',
						employmentType: 'Full Time',
						departmentIcon: 'fas fa-x-ray',
						department: 'Imaging Dept',
					},
				],
			],
		],

		[
			'twork/job-category-item',
			{
				categoryTitle: 'Administration & Support',
				categoryTitleColor: '#212121',
			},
			[
				[
					'twork/job-card-item',
					{
						jobTitle: 'Human Resources Manager',
						location: 'Mandalay',
						employmentType: 'Full Time',
						departmentIcon: 'fas fa-briefcase',
						department: 'HR Dept',
					},
				],

				[
					'twork/job-card-item',
					{
						jobTitle: 'Customer Service Executive',
						location: 'Mandalay',
						employmentType: 'Full Time',
						departmentIcon: 'fas fa-headset',
						department: 'Front Office',
					},
				],
			],
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-job-openings-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Header',
								'twork-builder'
							) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<TextControl
									label={ __( 'Title', 'twork-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title Font Size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 3 }
									step={ 0.1 }
								/>

								<Divider />
								<TextControl
									label={ __( 'Subtitle', 'twork-builder' ) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionSubtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionSubtitleColor: val,
												} ),
											label: __(
												'Subtitle Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Subtitle Max Width (px)',
										'twork-builder'
									) }
									value={ sectionSubtitleMaxWidth }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMaxWidth: val,
										} )
									}
									min={ 400 }
									max={ 800 }
									step={ 50 }
								/>

								<Divider />
								<ToggleControl
									label={ __(
										'Show Decorative Line',
										'twork-builder'
									) }
									checked={ showHeaderLine }
									onChange={ ( val ) =>
										setAttributes( { showHeaderLine: val } )
									}
								/>

								{ showHeaderLine && (
									<PanelColorSettings
										title={ __(
											'Line Color',
											'twork-builder'
										) }
										colorSettings={ [
											{
												value: headerLineColor,
												onChange: ( val ) =>
													setAttributes( {
														headerLineColor: val,
													} ),
												label: __(
													'Line Color',
													'twork-builder'
												),
											},
										] }
									/>
								) }
								<RangeControl
									label={ __(
										'Header Margin Bottom (px)',
										'twork-builder'
									) }
									value={ headerMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											headerMarginBottom: val,
										} )
									}
									min={ 30 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Section Padding', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 150 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 150 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 40 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 40 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'twork-builder' ) }
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
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 16 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<RangeControl
								label={ __(
									'Animation Delay (ms)',
									'twork-builder'
								) }
								value={ animationDelay }
								onChange={ ( val ) =>
									setAttributes( { animationDelay: val } )
								}
								min={ 0 }
								max={ 300 }
								step={ 20 }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className="section-header fade-up"
							style={ {
								textAlign: 'center',
								marginBottom: `${ headerMarginBottom }px`,
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title...',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									margin: '0 0 15px 0',
									color: sectionTitleColor,
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'Subtitle...',
									'twork-builder'
								) }
								style={ {
									color: sectionSubtitleColor,
									fontSize: `${ sectionSubtitleFontSize }rem`,
									maxWidth: `${ sectionSubtitleMaxWidth }px`,
									margin: '0 auto',
								} }
							/>

							{ showHeaderLine && (
								<div
									className="line"
									style={ {
										width: '60px',
										height: '4px',
										background: headerLineColor,
										margin: '20px auto 0',
										borderRadius: '2px',
									} }
								/>
							) }
						</div>
					) }

					<div className="twork-job-openings-categories">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
