import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { ConditionsControl } from '@twork-builder/shared/laparo-legacy-section';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, question, answer, conditions } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-faq-item is-open',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Question', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show this question',
								'twork-builder'
							) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ConditionsControl
							value={ conditions }
							onChange={ ( value ) =>
								setAttributes( { conditions: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="lp-faq-q">
					<RichText
						tagName="span"
						value={ question }
						onChange={ ( value ) =>
							setAttributes( { question: value } )
						}
						placeholder={ __( 'Question', 'twork-builder' ) }
					/>
				</div>
				<div className="lp-faq-a">
					<RichText
						tagName="p"
						value={ answer }
						onChange={ ( value ) =>
							setAttributes( { answer: value } )
						}
						placeholder={ __( 'Answer', 'twork-builder' ) }
					/>
				</div>
			</div>
		</>
	);
}
