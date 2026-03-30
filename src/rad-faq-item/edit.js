import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { question, answer } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-faq-item twork-rad-faq-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'FAQ Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Question', 'twork-builder' ) }
							value={ question }
							onChange={ ( v ) =>
								setAttributes( { question: v } )
							}
						/>

						<TextControl
							label={ __( 'Answer', 'twork-builder' ) }
							value={ answer }
							onChange={ ( v ) => setAttributes( { answer: v } ) }
							multiline
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<button type="button" className="rad-faq-q" disabled>
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( v ) => setAttributes( { question: v } ) }
						placeholder={ __( 'FAQ question…', 'twork-builder' ) }
						withoutInteractiveFormatting
					/>

					<i className="fas fa-plus" aria-hidden="true" />
				</button>
				<div className="rad-faq-a" style={ { maxHeight: 'none' } }>
					<RichText
						tagName="div"
						value={ answer }
						onChange={ ( v ) => setAttributes( { answer: v } ) }
						placeholder={ __( 'FAQ answer…', 'twork-builder' ) }
						multiline
					/>
				</div>
			</div>
		</>
	);
}
