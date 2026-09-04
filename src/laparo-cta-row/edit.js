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
	const { showItem, showIcon, showTitle, title, showSubtitle, subtitle } =
		attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'cta-row mk-laparo-cta-row',
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
						title={ __( 'CTA Row', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Row', 'twork-builder' ) }
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
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Subtitle', 'twork-builder' ) }
							checked={ showSubtitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showSubtitle: value } )
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
				<div>
					{ showTitle !== false && (
						<RichText
							tagName="strong"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder={ __( 'Title', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
					) }
					{ showSubtitle !== false && (
						<RichText
							tagName="span"
							value={ subtitle }
							onChange={ ( value ) =>
								setAttributes( { subtitle: value } )
							}
							placeholder={ __( 'Subtitle', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
					) }
				</div>
			</div>
		</>
	);
}
