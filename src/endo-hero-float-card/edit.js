import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const POSITION_OPTIONS = [
	{ label: __( 'Top left', 'twork-builder' ), value: 'fc-1' },
	{ label: __( 'Bottom right', 'twork-builder' ), value: 'fc-2' },
	{ label: __( 'Bottom center', 'twork-builder' ), value: 'fc-3' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		positionSlot,
		showIcon,
		iconBgColor,
		iconColor,
		showTitle,
		title,
		showSubtitle,
		subtitle,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `float-card ${
				positionSlot || 'fc-1'
			} mk-endo-hero-float-card`,
		} ),
		[ positionSlot ]
	);

	if ( showItem === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Float Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Card', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<SelectControl
							label={ __( 'Position', 'twork-builder' ) }
							value={ positionSlot }
							options={ POSITION_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { positionSlot: value } )
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
						<TextControl
							label={ __( 'Icon Background', 'twork-builder' ) }
							value={ iconBgColor }
							onChange={ ( value ) =>
								setAttributes( { iconBgColor: value } )
							}
						/>
						<TextControl
							label={ __( 'Icon Color', 'twork-builder' ) }
							value={ iconColor }
							onChange={ ( value ) =>
								setAttributes( { iconColor: value } )
							}
						/>
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
						<div
							className="fc-icon"
							style={ {
								background: iconBgColor,
								color: iconColor,
							} }
						>
							<EndoFlexibleIcon attributes={ attributes } />
						</div>
					) }
				<div>
					{ showTitle !== false && (
						<RichText
							tagName="h4"
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
