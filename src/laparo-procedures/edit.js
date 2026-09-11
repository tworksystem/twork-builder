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

import { sectionStyle } from './save';

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

const ALLOWED_BLOCKS = [ 'twork/laparo-procedure' ];

const TEMPLATE = [
	[ 'twork/laparo-procedure', {} ],
	[
		'twork/laparo-procedure',
		{
			icon: 'fas fa-shield-halved',
			title: 'Hernia repair - TEP / TAPP',
			description:
				'Inguinal, umbilical and incisional hernias repaired with mesh from behind the defect, which spares the groin nerves an open repair has to cross.',
			meta1Value: '3',
			meta1Label: 'ports',
			meta2Value: 'Mesh',
			meta2Label: 'tension-free',
			meta3Value: 'Bilateral',
			meta3Label: 'same sitting',
			conditions: 'hernia',
		},
	],
	[
		'twork/laparo-procedure',
		{
			icon: 'fas fa-triangle-exclamation',
			title: 'Appendicectomy',
			description:
				'Emergency keyhole removal, theatre available around the clock.',
			wide: false,
			meta1Value: '24/7',
			meta1Label: 'on call',
			meta2Value: '1 night',
			meta2Label: 'usual stay',
			meta3Value: '',
			meta3Label: '',
			conditions: 'appendix',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-procedures',
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
					<div className="lp-proc-grid">
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
