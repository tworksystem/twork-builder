import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const DEFAULT_ATTS = {
	backgroundColor: '#f8f9fa',
	paddingTop: 40,
	paddingBottom: 40,
	paddingHorizontal: 40,
	columns: 4,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 30,
	borderRadius: 12,
	boxShadow: true,
	boxShadowColor: 'rgba(0, 0, 0, 0.08)',
	boxShadowBlur: 30,
	boxShadowSpread: 0,
	boxShadowOffsetX: 0,
	boxShadowOffsetY: 10,
	sectionMaxWidth: 1100,
	marginTop: -60,
	containerMaxWidth: 1200,
	containerPadding: 20,
	animationOnScroll: true,
	animationType: 'fadeInUp',
	animationDelay: 100,
};

const ANIMATION_CLASS_MAP = {
	fadeInUp: 'fade-up',
	fadeIn: 'fade-in',
	slideInLeft: 'slide-in-left',
	slideInRight: 'slide-in-right',
	zoomIn: 'zoom-in',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingHorizontal,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		borderRadius,
		boxShadow,
		boxShadowColor,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowOffsetX,
		boxShadowOffsetY,
		sectionMaxWidth,
		marginTop,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const ALLOWED_BLOCKS = [ 'twork/stat-item', 'mk/stat-item' ];
	const TEMPLATE = [
		[
			'twork/stat-item',
			{ statNumber: '50+', statLabel: 'Rural Medical Camps' },
		],

		[
			'twork/stat-item',
			{ statNumber: '10k+', statLabel: 'Patients Screened' },
		],

		[
			'twork/stat-item',
			{ statNumber: '200+', statLabel: 'Free Surgeries' },
		],

		[
			'twork/stat-item',
			{ statNumber: '1.5k', statLabel: 'Units of Blood Donated' },
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-csr-stats-section-editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				zIndex: 10,
				isolation: 'isolate',
				pointerEvents: 'auto',
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	const sectionStyle = {
		backgroundColor,
		marginTop: `${ marginTop }px`,
		maxWidth: `${ sectionMaxWidth }px`,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: `${ paddingTop }px ${ paddingHorizontal }px ${ paddingBottom }px`,
		borderRadius: `${ borderRadius }px`,
		boxShadow: boxShadow
			? `${ boxShadowOffsetX }px ${ boxShadowOffsetY }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: 'none',
		position: 'relative',
		zIndex: 5,
	};

	// Negative margin overlaps hero on frontend; keep editor clickable (no overlap).
	const editorSectionStyle = {
		...sectionStyle,
		marginTop: '0px',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
		textAlign: 'center',
		'--csr-stats-columns': columns,
		'--csr-stats-columns-tablet': columnsTablet,
		'--csr-stats-columns-mobile': columnsMobile,
		'--csr-stat-gap': `${ gap }px`,
	};

	const animationClass =
		animationOnScroll && animationType
			? ANIMATION_CLASS_MAP[ animationType ] || 'fade-up'
			: '';

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'stats-grid',
			style: gridStyle,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Section Appearance', 'twork-builder' ) }
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

					<Divider />

					<RangeControl
						label={ __( 'Padding Top (px)', 'twork-builder' ) }
						value={ paddingTop }
						onChange={ ( val ) =>
							setAttributes( { paddingTop: val } )
						}
						min={ 0 }
						max={ 120 }
						step={ 5 }
					/>

					<RangeControl
						label={ __( 'Padding Bottom (px)', 'twork-builder' ) }
						value={ paddingBottom }
						onChange={ ( val ) =>
							setAttributes( { paddingBottom: val } )
						}
						min={ 0 }
						max={ 120 }
						step={ 5 }
					/>

					<RangeControl
						label={ __(
							'Padding Horizontal (px)',
							'twork-builder'
						) }
						value={ paddingHorizontal }
						onChange={ ( val ) =>
							setAttributes( { paddingHorizontal: val } )
						}
						min={ 20 }
						max={ 80 }
						step={ 5 }
					/>

					<Divider />

					<RangeControl
						label={ __(
							'Section Max Width (px)',
							'twork-builder'
						) }
						value={ sectionMaxWidth }
						onChange={ ( val ) =>
							setAttributes( { sectionMaxWidth: val } )
						}
						min={ 800 }
						max={ 1400 }
						step={ 10 }
						help={ __(
							'Max width of the stats card',
							'twork-builder'
						) }
					/>

					<RangeControl
						label={ __( 'Margin Top (px)', 'twork-builder' ) }
						value={ marginTop }
						onChange={ ( val ) =>
							setAttributes( { marginTop: val } )
						}
						min={ -120 }
						max={ 0 }
						step={ 5 }
						help={ __(
							'Negative value overlaps hero (e.g. -60)',
							'twork-builder'
						) }
					/>

					<RangeControl
						label={ __( 'Border Radius (px)', 'twork-builder' ) }
						value={ borderRadius }
						onChange={ ( val ) =>
							setAttributes( { borderRadius: val } )
						}
						min={ 0 }
						max={ 50 }
						step={ 1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Layout Settings', 'twork-builder' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Columns (Desktop)', 'twork-builder' ) }
						value={ columns }
						onChange={ ( val ) =>
							setAttributes( { columns: val } )
						}
						min={ 1 }
						max={ 6 }
						step={ 1 }
						help={ __(
							'Number of stat columns on desktop',
							'twork-builder'
						) }
					/>

					<RangeControl
						label={ __( 'Columns (Tablet)', 'twork-builder' ) }
						value={ columnsTablet }
						onChange={ ( val ) =>
							setAttributes( { columnsTablet: val } )
						}
						min={ 1 }
						max={ 4 }
						step={ 1 }
						help={ __(
							'Columns at max-width 992px',
							'twork-builder'
						) }
					/>

					<RangeControl
						label={ __( 'Columns (Mobile)', 'twork-builder' ) }
						value={ columnsMobile }
						onChange={ ( val ) =>
							setAttributes( { columnsMobile: val } )
						}
						min={ 1 }
						max={ 2 }
						step={ 1 }
						help={ __(
							'Columns at max-width 768px',
							'twork-builder'
						) }
					/>

					<Divider />

					<RangeControl
						label={ __(
							'Gap Between Items (px)',
							'twork-builder'
						) }
						value={ gap }
						onChange={ ( val ) => setAttributes( { gap: val } ) }
						min={ 0 }
						max={ 60 }
						step={ 5 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Container Settings', 'twork-builder' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Container Max Width (px)',
							'twork-builder'
						) }
						value={ containerMaxWidth }
						onChange={ ( val ) =>
							setAttributes( { containerMaxWidth: val } )
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
						onChange={ ( val ) =>
							setAttributes( { containerPadding: val } )
						}
						min={ 0 }
						max={ 60 }
						step={ 5 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Box Shadow', 'twork-builder' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable Box Shadow', 'twork-builder' ) }
						checked={ boxShadow }
						onChange={ ( val ) =>
							setAttributes( { boxShadow: val } )
						}
					/>

					{ boxShadow && (
						<>
							<PanelColorSettings
								title={ __( 'Shadow Color', 'twork-builder' ) }
								colorSettings={ [
									{
										value: boxShadowColor,
										onChange: ( val ) =>
											setAttributes( {
												boxShadowColor: val,
											} ),
										label: __(
											'Shadow Color',
											'twork-builder'
										),
									},
								] }
							/>

							<RangeControl
								label={ __( 'Blur (px)', 'twork-builder' ) }
								value={ boxShadowBlur }
								onChange={ ( val ) =>
									setAttributes( { boxShadowBlur: val } )
								}
								min={ 0 }
								max={ 80 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Spread (px)', 'twork-builder' ) }
								value={ boxShadowSpread }
								onChange={ ( val ) =>
									setAttributes( {
										boxShadowSpread: val,
									} )
								}
								min={ -20 }
								max={ 20 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Offset X (px)', 'twork-builder' ) }
								value={ boxShadowOffsetX }
								onChange={ ( val ) =>
									setAttributes( {
										boxShadowOffsetX: val,
									} )
								}
								min={ -20 }
								max={ 20 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Offset Y (px)', 'twork-builder' ) }
								value={ boxShadowOffsetY }
								onChange={ ( val ) =>
									setAttributes( {
										boxShadowOffsetY: val,
									} )
								}
								min={ -20 }
								max={ 20 }
								step={ 1 }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Animation Settings', 'twork-builder' ) }
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
						<>
							<SelectControl
								label={ __(
									'Animation Type',
									'twork-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __(
											'Fade In Up',
											'twork-builder'
										),
										value: 'fadeInUp',
									},
									{
										label: __( 'Fade In', 'twork-builder' ),
										value: 'fadeIn',
									},
									{
										label: __(
											'Slide In Left',
											'twork-builder'
										),
										value: 'slideInLeft',
									},
									{
										label: __(
											'Slide In Right',
											'twork-builder'
										),
										value: 'slideInRight',
									},
									{
										label: __( 'Zoom In', 'twork-builder' ),
										value: 'zoomIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>

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
								max={ 500 }
								step={ 50 }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					<div
						className={ `stats-section mk-csr-stats-grid-container${
							animationClass ? ` ${ animationClass }` : ''
						}` }
						style={ editorSectionStyle }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
						data-animation={ animationOnScroll }
						data-animation-type={ animationType }
						data-animation-delay={ animationDelay }
					>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
