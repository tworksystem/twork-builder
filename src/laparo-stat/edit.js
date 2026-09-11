import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, value, suffix, countUp, label, sub } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'lp-stat' } ),
		[]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Figure', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this stat', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( next ) =>
								setAttributes( { showItem: next } )
							}
						/>
						<TextControl
							label={ __( 'Value', 'twork-builder' ) }
							type="number"
							value={ value }
							onChange={ ( next ) =>
								setAttributes( { value: Number( next ) || 0 } )
							}
						/>
						<TextControl
							label={ __( 'Suffix', 'twork-builder' ) }
							help={ __(
								'Printed straight after the number, e.g. h or /7.',
								'twork-builder'
							) }
							value={ suffix }
							onChange={ ( next ) =>
								setAttributes( { suffix: next } )
							}
						/>
						<ToggleControl
							label={ __(
								'Count up on scroll',
								'twork-builder'
							) }
							checked={ countUp }
							onChange={ ( next ) =>
								setAttributes( { countUp: next } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="lp-figure">
					{ value }
					{ suffix }
				</div>
				<RichText
					tagName="span"
					className="lp-stat-label"
					value={ label }
					onChange={ ( next ) => setAttributes( { label: next } ) }
					placeholder={ __( 'Label', 'twork-builder' ) }
				/>
				<RichText
					tagName="span"
					className="lp-stat-sub"
					value={ sub }
					onChange={ ( next ) => setAttributes( { sub: next } ) }
					placeholder={ __( 'Qualifier', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
