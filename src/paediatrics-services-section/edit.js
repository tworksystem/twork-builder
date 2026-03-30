import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/paediatrics-service-card' ];
const TEMPLATE = [
	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-baby-carriage',
			title: 'Neonatal ICU (NICU)',
			description:
				'State-of-the-art intensive care for premature and critically ill newborns, staffed by expert neonatologists.',
			listItems: [
				'Ventilator Support',
				'Phototherapy',
				'24/7 Monitoring',
			],
		},
	],

	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-syringe',
			title: 'Vaccination Clinic',
			description:
				'Comprehensive immunization programs following WHO and national guidelines to protect your child.',
			listItems: [
				'Routine Immunizations',
				'Travel Vaccines',
				'Growth Monitoring',
			],
		},
	],

	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-heartbeat',
			title: 'Paediatric Surgery',
			description:
				'Advanced surgical care for congenital defects and acute conditions, with minimally invasive options.',
			listItems: [
				'Hernia Repair',
				'Appendicitis',
				'Urological Surgeries',
			],
		},
	],

	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-brain',
			title: 'Child Development',
			description:
				'Assessment and therapy for developmental delays, behavioral issues, and learning difficulties.',
			listItems: [
				'Autism Screening',
				'Speech Therapy',
				'Behavioral Counseling',
			],
		},
	],

	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-stethoscope',
			title: 'General Paediatrics',
			description:
				'Diagnosis and treatment of common childhood illnesses, infections, and chronic conditions.',
			listItems: [ 'Check-ups', 'Infection Control', 'Wellness Advice' ],
		},
	],

	[
		'twork/paediatrics-service-card',
		{
			iconClass: 'fas fa-tooth',
			title: 'Paediatric Dentistry',
			description:
				"Specialized dental care focused on children's oral health, from first teeth to adolescence.",
			listItems: [
				'Preventive Checkups',
				'Cavity Treatment',
				'Braces Assessment',
			],
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		minColumnWidth,
		gap,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'paed-section paed-services-section twork-paed-services-section-editor',
			style: {
				backgroundColor: backgroundColor || '#f8f9fa',
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ Number(
			minColumnWidth
		) }px, 1fr))`,
		gap: `${ Number( gap ) }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section header',
								'twork-builder'
							) }
							checked={ !! showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<PanelColorSettings
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( v ) =>
												setAttributes( {
													sectionTitleColor:
														v ?? undefined,
												} ),
											label: __(
												'Title color',
												'twork-builder'
											),
										},
										{
											value: sectionSubtitleColor,
											onChange: ( v ) =>
												setAttributes( {
													sectionSubtitleColor:
														v ?? undefined,
												} ),
											label: __(
												'Subtitle color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title font size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( v ) =>
										setAttributes( {
											sectionTitleFontSize: v,
										} )
									}
									min={ 1.5 }
									max={ 3.5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle font size (rem)',
										'twork-builder'
									) }
									value={ sectionSubtitleFontSize }
									onChange={ ( v ) =>
										setAttributes( {
											sectionSubtitleFontSize: v,
										} )
									}
									min={ 0.9 }
									max={ 1.4 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Colors', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( v ) =>
										setAttributes( {
											backgroundColor: v ?? undefined,
										} ),
									label: __(
										'Section background',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
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

						<RangeControl
							label={ __(
								'Min column width (px)',
								'twork-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( v ) =>
								setAttributes( { minColumnWidth: v } )
							}
							min={ 260 }
							max={ 500 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Gap between cards (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 10 }
							max={ 50 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Animation on scroll',
								'twork-builder'
							) }
							checked={ !! animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } id="services">
				<div className="paed-container" style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className="paed-header paed-fade-up"
							style={ { marginBottom: '60px' } }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Our Services',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									color: sectionTitleColor,
									marginBottom: '15px',
									marginTop: 0,
									textAlign: 'center',
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'We offer specialized services…',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
									textAlign: 'center',
								} }
							/>
						</div>
					) }
					<div className="paed-services-grid" style={ gridStyle }>
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
