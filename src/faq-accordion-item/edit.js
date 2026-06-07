import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { question, answer, isOpenByDefault } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `faq__item twork-faq-accordion-item-editor${
				isOpenByDefault ? ' is-open' : ''
			}`,
		} ),
		[ isOpenByDefault ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'FAQ Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Open by default',
								'twork-builder'
							) }
							checked={ !! isOpenByDefault }
							onChange={ ( val ) =>
								setAttributes( { isOpenByDefault: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps } data-accordion-item>
				<div className="faq__trigger faq__trigger--editor">
					<RichText
						tagName="span"
						className="faq__question"
						value={ question }
						onChange={ ( val ) =>
							setAttributes( { question: val } )
						}
						placeholder={ __( 'Question…', 'twork-builder' ) }
					/>
					<span className="faq__icon" aria-hidden="true" />
				</div>
				<div className="faq__panel">
					<RichText
						tagName="p"
						value={ answer }
						onChange={ ( val ) => setAttributes( { answer: val } ) }
						placeholder={ __( 'Answer…', 'twork-builder' ) }
					/>
				</div>
			</div>
		</>
	);
}
