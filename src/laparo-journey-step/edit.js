import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

function ConditionsControl( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Shows for conditions', 'twork-builder' ) }
			value={ value || '' }
			onChange={ onChange }
			help={ __(
				'Comma-separated keys from the selector. Leave empty to always show.',
				'twork-builder'
			) }
		/>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, when, title, body, conditions } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-jr-step is-on',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this step', 'twork-builder' ) }
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
			<article { ...blockProps }>
				<RichText
					tagName="span"
					className="lp-jr-when"
					value={ when }
					onChange={ ( value ) => setAttributes( { when: value } ) }
					placeholder={ __( 'Step and timing', 'twork-builder' ) }
				/>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder={ __( 'What happens', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					value={ body }
					onChange={ ( value ) => setAttributes( { body: value } ) }
					placeholder={ __( 'Detail', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
