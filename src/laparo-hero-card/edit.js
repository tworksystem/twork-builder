import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

const POSITION_OPTIONS = [
	{ label: __( 'Top left', 'twork-builder' ), value: 'top-left' },
	{ label: __( 'Bottom right', 'twork-builder' ), value: 'bottom-right' },
	{ label: __( 'Bottom left', 'twork-builder' ), value: 'bottom-left' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, icon, title, caption, position } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'lp-hero-card lp-hero-card--' + ( position || 'top-left' ),
		} ),
		[ position ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this card', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<TextControl
							label={ __( 'Icon', 'twork-builder' ) }
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
						/>
						<SelectControl
							label={ __( 'Position', 'twork-builder' ) }
							value={ position }
							options={ POSITION_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { position: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ icon && (
					<span className="lp-hero-card-icon">
						<i className={ icon } aria-hidden="true" />
					</span>
				) }
				<span>
					<RichText
						tagName="strong"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Fact', 'twork-builder' ) }
					/>
					<RichText
						tagName="span"
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
						placeholder={ __( 'Caption', 'twork-builder' ) }
					/>
				</span>
			</div>
		</>
	);
}
