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

const ALLOWED_BLOCKS = [ 'twork/laparo-estimate-line' ];

const TEMPLATE = [
	[ 'twork/laparo-estimate-line', {} ],
	[
		'twork/laparo-estimate-line',
		{
			procedure: 'Inguinal hernia repair (TEP / TAPP)',
			stay: 'Day case',
			conditions: 'hernia',
		},
	],
	[
		'twork/laparo-estimate-line',
		{
			procedure: 'Laparoscopic appendicectomy',
			stay: '1-2 nights',
			conditions: 'appendix',
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
		colProcedure,
		colStay,
		colCost,
		emptyText,
		disclaimer,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-estimate',
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
						title={ __( 'Columns', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Eyebrow icon', 'twork-builder' ) }
							value={ eyebrowIcon }
							onChange={ ( value ) =>
								setAttributes( { eyebrowIcon: value } )
							}
						/>
						<TextControl
							label={ __( 'Procedure', 'twork-builder' ) }
							value={ colProcedure }
							onChange={ ( value ) =>
								setAttributes( { colProcedure: value } )
							}
						/>
						<TextControl
							label={ __( 'Stay', 'twork-builder' ) }
							value={ colStay }
							onChange={ ( value ) =>
								setAttributes( { colStay: value } )
							}
						/>
						<TextControl
							label={ __( 'Cost band', 'twork-builder' ) }
							value={ colCost }
							onChange={ ( value ) =>
								setAttributes( { colCost: value } )
							}
						/>
						<TextControl
							label={ __(
								'Message when nothing matches',
								'twork-builder'
							) }
							value={ emptyText }
							onChange={ ( value ) =>
								setAttributes( { emptyText: value } )
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
					<div className="lp-est-table">
						<div className="lp-est-row lp-est-row--head">
							<span>{ colProcedure }</span>
							<span>{ colStay }</span>
							<span>{ colCost }</span>
							<span />
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
						value={ disclaimer }
						onChange={ ( value ) =>
							setAttributes( { disclaimer: value } )
						}
						placeholder={ __(
							'How pricing actually works',
							'twork-builder'
						) }
					/>
				</div>
			</section>
		</>
	);
}
