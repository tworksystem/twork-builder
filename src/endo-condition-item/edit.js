import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, showIcon, showLabel, label } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'cond mk-endo-condition-item',
		} ),
		[]
	);

	if ( showItem === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Condition Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Item', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Icon', 'twork-builder' ) }
							checked={ showIcon !== false }
							onChange={ ( value ) =>
								setAttributes( { showIcon: value } )
							}
						/>
						{ showIcon !== false && (
							<EndoIconPicker
								label={ __( 'Icon', 'twork-builder' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Label', 'twork-builder' ) }
							checked={ showLabel !== false }
							onChange={ ( value ) =>
								setAttributes( { showLabel: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showIcon !== false &&
					hasIconValue( mapIconAttrs( attributes ) ) && (
						<EndoFlexibleIcon attributes={ attributes } />
					) }
				{ showLabel !== false && (
					<RichText
						tagName="span"
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
						placeholder={ __( 'Condition', 'twork-builder' ) }
						withoutInteractiveFormatting
					/>
				) }
			</div>
		</>
	);
}
