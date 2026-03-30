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

// Theme: divider uses black with low opacity
const Divider =
	StableDivider ||
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid rgba(0,0,0,0.12)',
				} }
			/>
		);
	};

const ALLOWED_BLOCKS = [ 'twork/lab-dept-card' ];
const TEMPLATE = [
	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-flask', title: 'Biochemistry' },
	],

	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-tint', title: 'Hematology' },
	],

	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-dna', title: 'Molecular Bio' },
	],

	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-bacterium', title: 'Microbiology' },
	],

	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-microscope', title: 'Histopathology' },
	],

	[
		'twork/lab-dept-card',
		{ iconClass: 'fas fa-vial', title: 'Clinical Path' },
	],
];

const DEFAULT_ATTRS = {
	backgroundColor: '#ffffff',
	primaryColor: '#f48b2a',
	headingColor: '#000000',
	subtitleColor: '#666666',
	cardBackgroundColor: '#ffffff',
	hexIconBgColor: '#f2f2f2',
	paddingTop: 100,
	paddingBottom: 100,
	containerMaxWidth: 1200,
	containerPadding: 20,
	showSectionHeader: true,
	sectionTitle: 'Our Departments',
	sectionSubtitle: 'We cover the full spectrum of diagnostic pathology.',
	headerAlign: 'center',
	headerMaxWidth: 700,
	gap: 30,
	minColumnWidth: 300,
	animationOnScroll: true,
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		primaryColor,
		headingColor,
		subtitleColor,
		cardBackgroundColor,
		hexIconBgColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		headerAlign,
		headerMaxWidth,
		gap,
		minColumnWidth,
		animationOnScroll,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lab-section twork-lab-depts-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
				'--lab-primary': primaryColor,
				'--lab-text': headingColor,
				'--lab-text-muted': subtitleColor,
				'--lab-bg': cardBackgroundColor,
				'--lab-hex-bg': hexIconBgColor,
			},
		} ),
		[
			backgroundColor,
			cardBackgroundColor,
			headingColor,
			hexIconBgColor,
			paddingBottom,
			paddingTop,
			primaryColor,
			subtitleColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ Number(
			minColumnWidth
		) }px, 1fr))`,
		gap: `${ Number( gap ) }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Colors', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Section & cards', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val ?? undefined,
										} ),
									label: __(
										'Section background',
										'twork-builder'
									),
								},
								{
									value: cardBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBackgroundColor:
												val ?? undefined,
										} ),
									label: __(
										'Card background',
										'twork-builder'
									),
								},
								{
									value: hexIconBgColor,
									onChange: ( val ) =>
										setAttributes( {
											hexIconBgColor: val ?? undefined,
										} ),
									label: __(
										'Hex icon background',
										'twork-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Text & accent', 'twork-builder' ) }
							colorSettings={ [
								{
									value: headingColor,
									onChange: ( val ) =>
										setAttributes( {
											headingColor: val ?? undefined,
										} ),
									label: __(
										'Heading (H2, H3)',
										'twork-builder'
									),
								},
								{
									value: subtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											subtitleColor: val ?? undefined,
										} ),
									label: __( 'Subtitle', 'twork-builder' ),
								},
								{
									value: primaryColor,
									onChange: ( val ) =>
										setAttributes( {
											primaryColor: val ?? undefined,
										} ),
									label: __(
										'Primary / accent (icon, hover)',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Section layout', 'twork-builder' ) }
						initialOpen={ true }
					>
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

						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
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
							label={ __( 'Show header', 'twork-builder' ) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						<RangeControl
							label={ __(
								'Header max width (px)',
								'twork-builder'
							) }
							value={ headerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { headerMaxWidth: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 20 }
						/>

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
							min={ 10 }
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Min column width (px)',
								'twork-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( val ) =>
								setAttributes( { minColumnWidth: val } )
							}
							min={ 200 }
							max={ 400 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable fade-up header/cards classes',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="lab-container" style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className={ `lab-header ${
								animationOnScroll ? 'fade-up' : ''
							}` }
							style={ {
								textAlign: headerAlign,
								maxWidth: `${ Number( headerMaxWidth ) }px`,
								margin: '0 auto 30px',
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Our Departments',
									'twork-builder'
								) }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'We cover the full spectrum of diagnostic pathology.',
									'twork-builder'
								) }
							/>
						</div>
					) }

					<div className="lab-dept-grid" style={ gridStyle }>
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
