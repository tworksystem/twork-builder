import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

function sectionStyle( attributes ) {
	const { paddingTop, paddingBottom, containerMaxWidth } = attributes;
	return {
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		'--lp-container': `${ containerMaxWidth }px`,
	};
}

function SectionPanel( { attributes, setAttributes } ) {
	const {
		showSection,
		sectionId,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
	} = attributes;

	return (
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
			<TextControl
				label={ __( 'Section ID (anchor)', 'twork-builder' ) }
				value={ sectionId }
				onChange={ ( value ) => setAttributes( { sectionId: value } ) }
			/>
			<RangeControl
				label={ __( 'Padding Top (px)', 'twork-builder' ) }
				value={ paddingTop }
				onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
				min={ 0 }
				max={ 200 }
			/>
			<RangeControl
				label={ __( 'Padding Bottom (px)', 'twork-builder' ) }
				value={ paddingBottom }
				onChange={ ( value ) =>
					setAttributes( { paddingBottom: value } )
				}
				min={ 0 }
				max={ 200 }
			/>
			<RangeControl
				label={ __( 'Container Max Width (px)', 'twork-builder' ) }
				value={ containerMaxWidth }
				onChange={ ( value ) =>
					setAttributes( { containerMaxWidth: value } )
				}
				min={ 720 }
				max={ 1400 }
				step={ 20 }
			/>
		</PanelBody>
	);
}

const ALLOWED_BLOCKS = [ 'twork/laparo-selector-option' ];

const TEMPLATE = [
	[ 'twork/laparo-selector-option', {} ],
	[
		'twork/laparo-selector-option',
		{
			label: 'Hernia',
			conditionKey: 'hernia',
			icon: 'fas fa-shield-halved',
		},
	],
	[
		'twork/laparo-selector-option',
		{
			label: 'Appendicitis',
			conditionKey: 'appendix',
			icon: 'fas fa-triangle-exclamation',
		},
	],
	[
		'twork/laparo-selector-option',
		{
			label: 'Gynaecological',
			conditionKey: 'gynae',
			icon: 'fas fa-venus',
		},
	],
	[
		'twork/laparo-selector-option',
		{
			label: 'Bowel',
			conditionKey: 'bowel',
			icon: 'fas fa-wave-square',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		prompt,
		intro,
		showingLabel,
		allLabel,
		resetLabel,
		note,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-selector',
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
						title={ __( 'Status line', 'twork-builder' ) }
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
							label={ __( 'Showing prefix', 'twork-builder' ) }
							value={ showingLabel }
							onChange={ ( value ) =>
								setAttributes( { showingLabel: value } )
							}
						/>
						<TextControl
							label={ __(
								'Label when nothing is picked',
								'twork-builder'
							) }
							value={ allLabel }
							onChange={ ( value ) =>
								setAttributes( { allLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Reset button', 'twork-builder' ) }
							value={ resetLabel }
							onChange={ ( value ) =>
								setAttributes( { resetLabel: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-sel-head">
						<div>
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
								value={ prompt }
								onChange={ ( value ) =>
									setAttributes( { prompt: value } )
								}
								placeholder={ __(
									'The question',
									'twork-builder'
								) }
							/>
						</div>
						<RichText
							tagName="p"
							value={ intro }
							onChange={ ( value ) =>
								setAttributes( { intro: value } )
							}
							placeholder={ __(
								'How the filter works',
								'twork-builder'
							) }
						/>
					</div>
					<div className="lp-sel-chips">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							orientation="horizontal"
						/>
					</div>
					<div className="lp-sel-status">
						<span>
							{ showingLabel } <strong>{ allLabel }</strong>
						</span>
						<RichText
							tagName="span"
							className="lp-note"
							value={ note }
							onChange={ ( value ) =>
								setAttributes( { note: value } )
							}
							placeholder={ __( 'Caveat', 'twork-builder' ) }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
