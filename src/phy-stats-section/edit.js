import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/phy-stat-card' ];
const TEMPLATE = [
	[ 'twork/phy-stat-card', { statNumber: '5k+', label: 'Happy Patients' } ],
	[
		'twork/phy-stat-card',
		{ statNumber: '10+', label: 'Expert Therapists' },
	],

	[ 'twork/phy-stat-card', { statNumber: '98%', label: 'Recovery Rate' } ],
	[ 'twork/phy-stat-card', { statNumber: '15', label: 'Years Experience' } ],
];

const DEFAULT_ATTS = {
	backgroundColor: 'transparent',
	paddingTop: 0,
	paddingBottom: 60,
	marginTop: -50,
	containerMaxWidth: 1280,
	containerPadding: 24,
	columns: 4,
	gap: 30,
	cardPadding: 30,
	cardBorderRadius: 20,
	cardBorderBottomWidth: 5,
	primaryColor: '#f48b2a',
	animationOnScroll: true,
	staggerClass: 'stagger-up',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		marginTop,
		containerMaxWidth,
		containerPadding,
		columns,
		gap,
		cardPadding,
		cardBorderRadius,
		cardBorderBottomWidth,
		primaryColor,
		animationOnScroll,
		staggerClass,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-phy-stats-section-editor',
			style: {
				backgroundColor: backgroundColor || 'transparent',
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				marginTop: `${ Number( marginTop ) }px`,
				position: 'relative',
				zIndex: 3,
				'--phy-primary': primaryColor || DEFAULT_ATTS.primaryColor,
				'--phy-stat-gap': `${ Number( gap ) }px`,
				'--phy-stat-columns': columns,
			},
		} ),
		[
			DEFAULT_ATTS,
			backgroundColor,
			columns,
			gap,
			marginTop,
			paddingBottom,
			paddingTop,
			primaryColor,
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
		gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))`,
		gap: `${ gap }px`,
		width: '100%',
		minWidth: 0,
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
							max={ 120 }
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
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Margin top (px)', 'twork-builder' ) }
							value={ marginTop }
							onChange={ ( val ) =>
								setAttributes( { marginTop: val } )
							}
							min={ -150 }
							max={ 50 }
							step={ 5 }
							help={ __(
								'Negative values pull the stats up (e.g. over hero). Default -50.',
								'twork-builder'
							) }
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
								'Container padding (px)',
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
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Columns', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>

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
						title={ __( 'Card style', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Accent (number & border)',
								'twork-builder'
							) }
							colorSettings={ [
								{
									value: primaryColor,
									onChange: ( val ) =>
										setAttributes( { primaryColor: val } ),
									label: __(
										'Primary color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Card padding (px)', 'twork-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
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
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Bottom border width (px)',
								'twork-builder'
							) }
							value={ cardBorderBottomWidth }
							onChange={ ( val ) =>
								setAttributes( { cardBorderBottomWidth: val } )
							}
							min={ 0 }
							max={ 20 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Stagger animation on scroll',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
							help={ __(
								'Adds stagger-up class for scroll-triggered animation.',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="phy-container" style={ containerStyle }>
					<div
						className="phy-stats-grid phy-stats-grid-editor"
						style={ gridStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
