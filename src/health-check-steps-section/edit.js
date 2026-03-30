import { __ } from '@wordpress/i18n';
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
	ToggleControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/health-check-step-item' ];
const TEMPLATE = [
	[
		'twork/health-check-step-item',
		{
			icon: 'fas fa-ban',
			title: '1. Fasting',
			description:
				'Do not eat for 8-10 hours before the test. Water is allowed.',
		},
	],

	[
		'twork/health-check-step-item',
		{
			icon: 'fas fa-calendar-check',
			title: '2. Appointment',
			description: 'Book your slot in advance to avoid waiting.',
		},
	],

	[
		'twork/health-check-step-item',
		{
			icon: 'fas fa-vial',
			title: '3. Sample',
			description: 'Provide blood/urine samples and undergo scans.',
		},
	],

	[
		'twork/health-check-step-item',
		{
			icon: 'fas fa-file-medical-alt',
			title: '4. Review',
			description: 'Consult with the doctor to understand your report.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		headerMarginBottom,
		primaryColor,
		iconColor,
		titleColor,
		descriptionColor,
		connectorLineColor,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'chk-section twork-health-check-steps-section-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				'--chk-primary': primaryColor || '#f48b2a',
				'--chk-step-icon-color': iconColor || primaryColor || '#f48b2a',
				'--chk-step-title-color': titleColor || '#212121',
				'--chk-step-desc-color': descriptionColor || '#666666',
				'--chk-step-connector': connectorLineColor || '#ddd',
			},
		} ),
		[
			backgroundColor,
			connectorLineColor,
			descriptionColor,
			iconColor,
			paddingBottom,
			paddingTop,
			primaryColor,
			titleColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
		textAlign: 'center',
		marginTop: 0,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Title', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'twork-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Title Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( v ) =>
												setAttributes( {
													sectionTitleColor: v,
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
									onChange={ ( v ) =>
										setAttributes( {
											sectionTitleFontSize: v,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
										'twork-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( v ) =>
										setAttributes( {
											sectionTitleFontWeight: v,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Title Alignment',
										'twork-builder'
									) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'twork-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'twork-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'twork-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( v ) =>
										setAttributes( {
											sectionTitleAlignment: v,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Header Margin Bottom (px)',
										'twork-builder'
									) }
									value={ headerMarginBottom }
									onChange={ ( v ) =>
										setAttributes( {
											headerMarginBottom: v,
										} )
									}
									min={ 20 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( v ) =>
								setAttributes( { columns: v } )
							}
							min={ 2 }
							max={ 6 }
							step={ 1 }
							help={ __(
								'Number of step columns on desktop.',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( v ) =>
								setAttributes( { columnsTablet: v } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'twork-builder' ) }
							value={ columnsMobile }
							onChange={ ( v ) =>
								setAttributes( { columnsMobile: v } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Gap Between Steps (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
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
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'twork-builder'
							) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Section & Steps', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( v ) =>
										setAttributes( { backgroundColor: v } ),
									label: __(
										'Section background',
										'twork-builder'
									),
								},
								{
									value: iconColor,
									onChange: ( v ) =>
										setAttributes( { iconColor: v } ),
									label: __( 'Icon color', 'twork-builder' ),
								},
								{
									value: titleColor,
									onChange: ( v ) =>
										setAttributes( { titleColor: v } ),
									label: __(
										'Step title color',
										'twork-builder'
									),
								},
								{
									value: descriptionColor,
									onChange: ( v ) =>
										setAttributes( {
											descriptionColor: v,
										} ),
									label: __(
										'Step description color',
										'twork-builder'
									),
								},
								{
									value: connectorLineColor,
									onChange: ( v ) =>
										setAttributes( {
											connectorLineColor: v,
										} ),
									label: __(
										'Connector line (between steps)',
										'twork-builder'
									),
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
								'Enable scroll animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( v ) =>
								setAttributes( { animationOnScroll: v } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation type',
										'twork-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Stagger up',
												'twork-builder'
											),
											value: 'stagger-up',
										},
										{
											label: __(
												'Fade up',
												'twork-builder'
											),
											value: 'fade-up',
										},
									] }
									onChange={ ( v ) =>
										setAttributes( { animationType: v } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation delay (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( v ) =>
										setAttributes( { animationDelay: v } )
									}
									min={ 0 }
									max={ 400 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="chk-container" style={ containerStyle }>
					<div
						className="editor-label"
						style={ {
							textAlign: 'center',
							padding: '10px',
							background: '#2271b1',
							color: '#fff',
							fontWeight: 600,
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: '20px',
							borderRadius: '4px',
						} }
					>
						{ __(
							'Health Check Steps Section (Editor View)',
							'twork-builder'
						) }
					</div>
					{ showSectionTitle && (
						<div
							className="chk-header fade-up"
							style={ {
								textAlign: sectionTitleAlignment,
								marginBottom: `${ headerMarginBottom }px`,
								marginTop: 0,
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( v ) =>
									setAttributes( { sectionTitle: v } )
								}
								placeholder={ __(
									'How to Prepare',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									margin: 0,
								} }
							/>
						</div>
					) }
					<div
						className="chk-steps-grid twork-chk-steps-grid-editor"
						style={ {
							...gridStyle,
							marginTop: showSectionTitle
								? undefined
								: `${ headerMarginBottom }px`,
						} }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
