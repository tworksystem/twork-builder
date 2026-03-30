import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/dept-faq-item' ];
const TEMPLATE = [
	[
		'twork/dept-faq-item',
		{
			question: 'What are the signs of a heart attack?',
			answer: 'Symptoms include chest pain, shortness of breath, pain in the arm or jaw, and cold sweats. Seek emergency care immediately.',
		},
	],

	[
		'twork/dept-faq-item',
		{
			question: 'Do I need an appointment for ECG?',
			answer: 'Routine ECGs require appointments, but emergency ECGs are available 24/7 at our Emergency Department.',
		},
	],

	[
		'twork/dept-faq-item',
		{
			question: 'Does Jivaka accept international insurance?',
			answer: 'Yes, we partner with major international insurance providers including Cigna, Aetna, and Allianz.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section twork-dept-faq-editor',
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

						<TextControl
							label={ __( 'Title', 'twork-builder' ) }
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<h2>{ title }</h2>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</section>
		</>
	);
}
