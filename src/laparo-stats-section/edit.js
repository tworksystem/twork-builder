import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/laparo-stat-item' ];
const TEMPLATE = [
	[
		'twork/laparo-stat-item',
		{
			countValue: 18500,
			countSuffix: '+',
			statLabel: 'Procedures completed',
		},
	],
	[
		'twork/laparo-stat-item',
		{
			countValue: 99,
			suffixHighlight: '.4%',
			statLabel: 'Diagnostic accuracy',
		},
	],
	[
		'twork/laparo-stat-item',
		{
			countValue: 12,
			statLabel: 'Consultant surgeons',
		},
	],
	[
		'twork/laparo-stat-item',
		{
			countValue: 30,
			suffixHighlight: ' min',
			statLabel: 'Average report time',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		backgroundColor,
		borderColor,
		paddingTop,
		paddingBottom,
		marginTop,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		cardRadius,
		enableCounterAnimation,
		animationOnScroll,
		respectReducedMotion,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-laparo-stats-section mk-laparo-stats-section trust',
			style: {
				marginTop: `${ marginTop }px`,
				'--laparo-stats-margin-top': `${ marginTop }px`,
				'--laparo-stats-columns-desktop': columns,
				'--laparo-stats-columns-tablet': columnsTablet,
				'--laparo-stats-columns-mobile': columnsMobile,
				'--laparo-stats-gap': `${ gap }px`,
				'--laparo-stats-card-radius': `${ cardRadius }px`,
				'--laparo-container': `${ containerMaxWidth }px`,
			},
			'data-counter-animation': enableCounterAnimation ? '1' : '0',
			'data-animation': animationOnScroll ? '1' : '0',
			'data-reduced-motion': respectReducedMotion ? '1' : '0',
		} ),
		[
			marginTop,
			columns,
			columnsTablet,
			columnsMobile,
			gap,
			cardRadius,
			containerMaxWidth,
			enableCounterAnimation,
			animationOnScroll,
			respectReducedMotion,
		]
	);

	const cardClassName = animationOnScroll
		? 'trust-card reveal'
		: 'trust-card';

	/* FE SoT padding lives in style.scss / critical.css (clamp all sides).
	   Editor keeps attr T/B for inspector preview only — FE critical locks SoT. */
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: cardClassName,
			style: {
				backgroundColor,
				borderColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				borderRadius: `${ cardRadius }px`,
				display: 'grid',
				gridTemplateColumns: `repeat(${
					columns || 4
				}, minmax(0, 1fr))`,
				gap: `${ gap || 20 }px`,
				width: '100%',
			},
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	if ( showSection === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Section', 'twork-builder' ) }
							checked={ showSection !== false }
							onChange={ ( value ) =>
								setAttributes( { showSection: value } )
							}
						/>
						<RangeControl
							label={ __( 'Margin Top (px)', 'twork-builder' ) }
							value={ marginTop }
							onChange={ ( value ) =>
								setAttributes( { marginTop: value } )
							}
							min={ -120 }
							max={ 40 }
							step={ 5 }
							help={ __(
								'Negative overlaps hero (e.g. -60).',
								'twork-builder'
							) }
						/>
						<ToggleControl
							label={ __(
								'Animate Counters on Scroll',
								'twork-builder'
							) }
							checked={ enableCounterAnimation !== false }
							onChange={ ( value ) =>
								setAttributes( {
									enableCounterAnimation: value,
								} )
							}
						/>
						<ToggleControl
							label={ __( 'Scroll Reveal', 'twork-builder' ) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Respect Reduced Motion',
								'twork-builder'
							) }
							checked={ respectReducedMotion !== false }
							onChange={ ( value ) =>
								setAttributes( {
									respectReducedMotion: value,
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Appearance', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( value ) =>
										setAttributes( {
											backgroundColor: value,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: borderColor,
									onChange: ( value ) =>
										setAttributes( {
											borderColor: value,
										} ),
									label: __( 'Border', 'twork-builder' ),
								},
							] }
						/>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( value ) =>
								setAttributes( { paddingTop: value } )
							}
							min={ 20 }
							max={ 80 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( value ) =>
								setAttributes( { paddingBottom: value } )
							}
							min={ 20 }
							max={ 80 }
						/>
						<RangeControl
							label={ __(
								'Border Radius (px)',
								'twork-builder'
							) }
							value={ cardRadius }
							onChange={ ( value ) =>
								setAttributes( { cardRadius: value } )
							}
							min={ 0 }
							max={ 48 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Grid Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( value ) =>
								setAttributes( { columns: value } )
							}
							min={ 1 }
							max={ 6 }
						/>
						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( value ) =>
								setAttributes( { columnsTablet: value } )
							}
							min={ 1 }
							max={ 4 }
						/>
						<RangeControl
							label={ __( 'Columns (Mobile)', 'twork-builder' ) }
							value={ columnsMobile }
							onChange={ ( value ) =>
								setAttributes( { columnsMobile: value } )
							}
							min={ 1 }
							max={ 2 }
						/>
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( value ) =>
								setAttributes( { gap: value } )
							}
							min={ 8 }
							max={ 40 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { containerMaxWidth: value } )
							}
							min={ 900 }
							max={ 1400 }
							step={ 20 }
						/>
						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( value ) =>
								setAttributes( { containerPadding: value } )
							}
							min={ 12 }
							max={ 48 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="laparo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
