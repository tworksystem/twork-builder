import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	SectionPanel,
	sectionStyle,
} from '@twork-builder/shared/laparo-legacy-section';

const ALLOWED_BLOCKS = [ 'twork/laparo-compare-row' ];
const TEMPLATE = [
	[ 'twork/laparo-compare-row', {} ],
	[
		'twork/laparo-compare-row',
		{
			metric: 'Hospital stay',
			metricNote: 'Uncomplicated case',
			valueA: 'Same day - 1 night',
			valueB: '3-5 nights',
			scaleA: 0.2,
		},
	],
	[
		'twork/laparo-compare-row',
		{
			metric: 'Return to desk work',
			metricNote: 'Guide, not a promise',
			valueA: '1-2 weeks',
			valueB: '4-6 weeks',
			scaleA: 0.33,
		},
	],
	[
		'twork/laparo-compare-row',
		{
			metric: 'Post-operative pain',
			metricNote: 'Opioid requirement',
			valueA: 'Usually oral analgesia only',
			valueB: 'Often injectable for 24-72 h',
			showBars: false,
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		subtitle,
		colMetric,
		colA,
		colB,
		note,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-compare',
			id: sectionId || undefined,
			style: sectionStyle( attributes ),
		} ),
		[
			sectionId,
			attributes.paddingTop,
			attributes.paddingBottom,
			attributes.containerMaxWidth,
		]
	);

	return showSection === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<SectionPanel
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<PanelBody
						title={ __( 'Head', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Eyebrow icon', 'twork-builder' ) }
							help={ __(
								'Font Awesome classes, e.g. fas fa-scale-balanced.',
								'twork-builder'
							) }
							value={ eyebrowIcon }
							onChange={ ( value ) =>
								setAttributes( { eyebrowIcon: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Columns', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Measure column', 'twork-builder' ) }
							value={ colMetric }
							onChange={ ( value ) =>
								setAttributes( { colMetric: value } )
							}
						/>
						<TextControl
							label={ __( 'Column A', 'twork-builder' ) }
							value={ colA }
							onChange={ ( value ) =>
								setAttributes( { colA: value } )
							}
						/>
						<TextControl
							label={ __( 'Column B', 'twork-builder' ) }
							value={ colB }
							onChange={ ( value ) =>
								setAttributes( { colB: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-head lp-head--left">
						<RichText
							tagName="span"
							className="lp-eyebrow"
							value={ eyebrow }
							onChange={ ( value ) =>
								setAttributes( { eyebrow: value } )
							}
							placeholder={ __( 'Eyebrow', 'twork-builder' ) }
						/>
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __( 'Heading', 'twork-builder' ) }
						/>
						<RichText
							tagName="p"
							value={ subtitle }
							onChange={ ( value ) =>
								setAttributes( { subtitle: value } )
							}
							placeholder={ __( 'Subtitle', 'twork-builder' ) }
						/>
					</div>
					<div className="lp-cmp-table">
						<div className="lp-cmp-row lp-cmp-row--head">
							<span className="lp-cmp-key">{ colMetric }</span>
							<span className="lp-cmp-a">{ colA }</span>
							<span>{ colB }</span>
						</div>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
						/>
					</div>
					<RichText
						tagName="p"
						className="lp-note lp-note--flag"
						value={ note }
						onChange={ ( value ) =>
							setAttributes( { note: value } )
						}
						placeholder={ __(
							'Caveat about these figures',
							'twork-builder'
						) }
					/>
				</div>
			</section>
		</>
	);
}
