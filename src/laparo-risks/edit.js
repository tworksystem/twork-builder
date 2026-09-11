import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	Notice,
	PanelBody,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	SectionPanel,
	sectionStyle,
} from '@twork-builder/shared/laparo-legacy-section';

const ALLOWED_BLOCKS = [ 'twork/laparo-risk' ];

const TEMPLATE = [
	[ 'twork/laparo-risk', {} ],
	[
		'twork/laparo-risk',
		{
			label: 'Wound or port-site infection',
			note: 'Usually treated with oral antibiotics',
		},
	],
	[
		'twork/laparo-risk',
		{
			label: 'Bleeding requiring transfusion',
			note: 'From the port site or the operative field',
		},
	],
	[
		'twork/laparo-risk',
		{
			label: 'Venous thromboembolism',
			note: 'Clot in the leg or lung; prophylaxis is given routinely',
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
		intro,
		calloutTitle,
		calloutText,
		sourceNote,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-risks',
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

	if ( showSection === false ) {
		return null;
	}

	const sourceMissing = ! ( sourceNote && sourceNote.trim() );

	return (
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
								'Font Awesome classes, e.g. fas fa-circle-exclamation.',
								'twork-builder'
							) }
							value={ eyebrowIcon }
							onChange={ ( value ) =>
								setAttributes( { eyebrowIcon: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Source', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ sourceMissing && (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'These are clinical figures. Name the audit or publication they come from before this section goes live.',
									'twork-builder'
								) }
							</Notice>
						) }
						<TextareaControl
							label={ __( 'Source note', 'twork-builder' ) }
							value={ sourceNote }
							onChange={ ( value ) =>
								setAttributes( { sourceNote: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-risk-layout">
						<aside className="lp-risk-aside">
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
								value={ intro }
								onChange={ ( value ) =>
									setAttributes( { intro: value } )
								}
								placeholder={ __( 'Intro', 'twork-builder' ) }
							/>
							<div className="lp-risk-callout">
								<RichText
									tagName="h3"
									value={ calloutTitle }
									onChange={ ( value ) =>
										setAttributes( { calloutTitle: value } )
									}
									placeholder={ __(
										'Callout title',
										'twork-builder'
									) }
								/>
								<RichText
									tagName="p"
									value={ calloutText }
									onChange={ ( value ) =>
										setAttributes( { calloutText: value } )
									}
									placeholder={ __(
										'Why the rates are blank',
										'twork-builder'
									) }
								/>
							</div>
						</aside>
						<div className="lp-risk-table">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
							/>
							<RichText
								tagName="p"
								className="lp-note lp-note--flag"
								value={ sourceNote }
								onChange={ ( value ) =>
									setAttributes( { sourceNote: value } )
								}
								placeholder={ __(
									'Source: name the audit these figures come from',
									'twork-builder'
								) }
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
