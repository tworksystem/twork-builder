import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/centre-faq-item' ];
const TEMPLATE = [
	[
		'twork/centre-faq-item',
		{
			question: 'What are the signs of a Stroke (FAST)?',
			answer: 'Face drooping, Arm weakness, Speech difficulty, Time to call 09-789 101 101 immediately. Immediate treatment is crucial.',
		},
	],

	[
		'twork/centre-faq-item',
		{
			question: 'When should I see a doctor for a headache?',
			answer: 'You should seek medical attention if headaches are sudden and severe, accompanied by fever, stiff neck, confusion, vision loss, or after a head injury.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section fade-up twork-centre-faq-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Section', 'twork-builder' ) }>
						<TextControl
							label={ __( 'Section ID', 'twork-builder' ) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( { sectionId: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps } id={ sectionId }>
				<RichText
					tagName="h2"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Section title...', 'twork-builder' ) }
				/>

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ false }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}
