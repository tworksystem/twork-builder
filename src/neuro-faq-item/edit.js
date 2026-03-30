import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const { question = '', answer = '' } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'faq-item twork-neuro-faq-item-editor',
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
							help={ __(
								'Plain text question shown in the accordion header.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Answer', 'twork-builder' ) }
							value={ answer }
							onChange={ ( v ) => setAttributes( { answer: v } ) }
							multiline
							help={ __(
								'Supports HTML (e.g. <strong>). For rich formatting, edit in the block below.',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<button type="button" className="faq-btn" disabled>
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( v ) => setAttributes( { question: v } ) }
						placeholder={ __( 'Question…', 'twork-builder' ) }
						withoutInteractiveFormatting
					/>

					<i className="fas fa-chevron-down" aria-hidden />
				</button>
				<div className="faq-content faq-content--open">
					<RichText
						tagName="div"
						value={ answer }
						onChange={ ( v ) => setAttributes( { answer: v } ) }
						placeholder={ __( 'Answer…', 'twork-builder' ) }
						multiline
					/>
				</div>
			</div>
		</>
	);
}
