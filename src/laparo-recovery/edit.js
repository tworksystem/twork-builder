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

const ALLOWED_BLOCKS = [ 'twork/laparo-recovery-mark' ];

const TEMPLATE = [
	[ 'twork/laparo-recovery-mark', {} ],
	[
		'twork/laparo-recovery-mark',
		{
			timeLabel: 'Day 1',
			figure: 'Home',
			detail: 'Discharge for most cases, with oral analgesia and a wound-care sheet.',
		},
	],
	[
		'twork/laparo-recovery-mark',
		{
			timeLabel: 'Week 2',
			figure: 'Desk',
			detail: 'Most people are back at sedentary work and driving once off opioid analgesia.',
		},
	],
	[
		'twork/laparo-recovery-mark',
		{
			timeLabel: 'Week 4-6',
			figure: 'Full',
			detail: 'Heavy lifting, gym and manual work resume after your review appointment.',
			conditions: 'gallbladder, hernia, bowel',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-recovery',
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
							value={ eyebrowIcon }
							onChange={ ( value ) =>
								setAttributes( { eyebrowIcon: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-head">
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
					<div className="lp-rec-rail">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
