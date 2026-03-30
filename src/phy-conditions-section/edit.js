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
	SelectControl,
	__experimentalDivider as ExperimentalDivider,
	Divider as StableDivider,
} from '@wordpress/components';

const Divider =
	StableDivider ||
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const ALLOWED_BLOCKS = [ 'twork/phy-condition-col' ];
const TEMPLATE = [
	[
		'twork/phy-condition-col',
		{
			iconClass: 'fas fa-bone',
			heading: 'Orthopedic',
			items: [
				'Back & Neck Pain',
				'Arthritis & Joint Pain',
				'Post-Fracture Stiffness',
				'Spondylosis',
			],
		},
	],

	[
		'twork/phy-condition-col',
		{
			iconClass: 'fas fa-running',
			heading: 'Sports Injury',
			items: [
				'Ligament Tears (ACL/PCL)',
				'Muscle Strains',
				'Tennis Elbow',
				'Rotator Cuff Injury',
			],
		},
	],

	[
		'twork/phy-condition-col',
		{
			iconClass: 'fas fa-brain',
			heading: 'Neurological',
			items: [
				'Stroke Rehabilitation',
				"Parkinson's Disease",
				'Nerve Injuries',
				"Bell's Palsy",
			],
		},
	],
];

const DEFAULT_ATTRS = {
	backgroundColor: '#f9f9f9',
	paddingTop: 60,
	paddingBottom: 80,
	containerMaxWidth: 1280,
	containerPadding: 24,
	showSectionTitle: true,
	sectionTitle: 'Conditions We Treat',
	showSectionSubtitle: true,
	sectionSubtitle: 'Targeted therapy for every part of your body.',
	headerAlign: 'center',
	gap: 30,
	animationOnScroll: true,
	animationType: 'fade-up',
	animationDelay: 100,
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		showSectionSubtitle,
		sectionSubtitle,
		headerAlign,
		gap,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'phy-section phy-cond-section twork-phy-conditions-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
			},
			'data-animation': animationOnScroll ? 'true' : 'false',
			'data-animation-type': animationType,
			'data-animation-delay': Number( animationDelay ),
		} ),
		[
			animationDelay,
			animationOnScroll,
			animationType,
			backgroundColor,
			paddingBottom,
			paddingTop,
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
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
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
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show title', 'twork-builder' ) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show description', 'twork-builder' ) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						<Divider />
						<SelectControl
							label={ __( 'Header alignment', 'twork-builder' ) }
							value={ headerAlign }
							options={ [
								{
									value: 'left',
									label: __( 'Left', 'twork-builder' ),
								},
								{
									value: 'center',
									label: __( 'Center', 'twork-builder' ),
								},
								{
									value: 'right',
									label: __( 'Right', 'twork-builder' ),
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									headerAlign: val || 'center',
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
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
								'Enable scroll animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
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
												'Fade up',
												'twork-builder'
											),
											value: 'fade-up',
										},
										{
											label: __(
												'Fade in',
												'twork-builder'
											),
											value: 'fade-in',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation delay (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 25 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="phy-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className={ `phy-header ${
								animationOnScroll ? animationType : ''
							}` }
							style={ {
								textAlign: headerAlign,
								maxWidth: 700,
								margin: '0 auto 50px',
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Conditions We Treat',
										'twork-builder'
									) }
								/>
							) }
							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Targeted therapy for every part of your body.',
										'twork-builder'
									) }
								/>
							) }
						</div>
					) }

					<div className="phy-cond-grid" style={ gridStyle }>
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
