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

const ALLOWED_BLOCKS = [ 'twork/laparo-voice' ];

const TEMPLATE = [
	[ 'twork/laparo-voice', {} ],
	[
		'twork/laparo-voice',
		{
			quote: 'My surgeon told me straight that she might have to convert to open if the scarring was bad, and why that would be the safer call.',
			name: 'Zaw M.',
			context: 'Hernia repair · TEP',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-voices',
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
					<div className="lp-vc-stage">
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
