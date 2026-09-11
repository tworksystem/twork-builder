import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, label, conditionKey, icon } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-opt',
			'data-condition': ( conditionKey || '' ).toLowerCase(),
		} ),
		[ conditionKey ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Option', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this option', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<TextControl
							label={ __( 'Condition key', 'twork-builder' ) }
							help={ __(
								'Lowercase, no spaces. Blocks elsewhere match this key in their "Shows for conditions" field.',
								'twork-builder'
							) }
							value={ conditionKey }
							onChange={ ( value ) =>
								setAttributes( { conditionKey: value } )
							}
						/>
						<TextControl
							label={ __( 'Icon', 'twork-builder' ) }
							help={ __(
								'Font Awesome classes, e.g. fas fa-circle-dot.',
								'twork-builder'
							) }
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ icon && <i className={ icon } aria-hidden="true" /> }
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
					placeholder={ __( 'Condition', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
