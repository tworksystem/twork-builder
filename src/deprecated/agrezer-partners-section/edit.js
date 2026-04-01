import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/agrezer-partners-item' ];
const TEMPLATE = [
	[ 'twork/agrezer-partners-item', { name: 'NatureNest' } ],
	[ 'twork/agrezer-partners-item', { name: 'Farming Co' } ],
	[ 'twork/agrezer-partners-item', { name: 'GreenLeaf' } ],
	[ 'twork/agrezer-partners-item', { name: 'PureHarvest' } ],
	[ 'twork/agrezer-partners-item', { name: 'AgroNova' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		ariaLabel,
		marqueePaddingY,
		borderColor,
		trackGap,
		animationDuration,
		enableMarquee,
		pauseOnHover,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-partners twork-agrezer-partners-section-editor',
			style: {
				backgroundColor,
				'--agrezer-partners-py': `${ marqueePaddingY }px`,
				'--agrezer-partners-border': borderColor,
				'--agrezer-partners-gap': `${ trackGap }px`,
				'--agrezer-partners-duration': `${ animationDuration }s`,
			},
			'data-marquee': enableMarquee ? 'true' : 'false',
			'data-pause-hover': pauseOnHover ? 'true' : 'false',
			'aria-label': ariaLabel || __( 'Client logos', 'twork-builder' ),
		} ),
		[
			animationDuration,
			ariaLabel,
			backgroundColor,
			borderColor,
			enableMarquee,
			marqueePaddingY,
			pauseOnHover,
			trackGap,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Accessibility', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Section label (aria-label)',
								'twork-builder'
							) }
							value={ ariaLabel }
							onChange={ ( val ) =>
								setAttributes( { ariaLabel: val } )
							}
							help={ __(
								'Describes the logo strip for screen readers.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Marquee', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Enable infinite scroll',
								'twork-builder'
							) }
							checked={ enableMarquee }
							onChange={ ( val ) =>
								setAttributes( { enableMarquee: val } )
							}
							help={ __(
								'Off: static single row. Respects prefers-reduced-motion when on.',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Pause on hover', 'twork-builder' ) }
							checked={ pauseOnHover }
							onChange={ ( val ) =>
								setAttributes( { pauseOnHover: val } )
							}
						/>

						<RangeControl
							label={ __(
								'Animation duration (seconds)',
								'twork-builder'
							) }
							value={ animationDuration }
							onChange={ ( val ) =>
								setAttributes( { animationDuration: val } )
							}
							min={ 8 }
							max={ 60 }
							step={ 1 }
							disabled={ ! enableMarquee }
						/>

						<RangeControl
							label={ __(
								'Gap between logos (px)',
								'twork-builder'
							) }
							value={ trackGap }
							onChange={ ( val ) =>
								setAttributes( { trackGap: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Style', 'twork-builder' ) }
						initialOpen={ false }
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
									label: __( 'Background', 'twork-builder' ),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Borders', 'twork-builder' ) }
							colorSettings={ [
								{
									value: borderColor,
									onChange: ( val ) =>
										setAttributes( { borderColor: val } ),
									label: __(
										'Top / bottom border',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Vertical padding (px)',
								'twork-builder'
							) }
							value={ marqueePaddingY }
							onChange={ ( val ) =>
								setAttributes( { marqueePaddingY: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="agrezer-partners__marquee">
					<div
						className="agrezer-partners__track twork-agrezer-partners__track-editor"
						style={ {
							gap: `${ trackGap }px`,
						} }
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
