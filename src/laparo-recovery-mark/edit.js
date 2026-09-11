import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { ConditionsControl } from '@twork-builder/shared/laparo-legacy-section';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showItem, timeLabel, figure, detail, conditions } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-mark is-on',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	return showItem === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Mark', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this mark', 'twork-builder' ) }
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
				<RichText
					tagName="span"
					className="lp-mark-when"
					value={ timeLabel }
					onChange={ ( value ) =>
						setAttributes( { timeLabel: value } )
					}
					placeholder={ __( 'When', 'twork-builder' ) }
				/>
				<RichText
					tagName="div"
					className="lp-figure"
					value={ figure }
					onChange={ ( value ) => setAttributes( { figure: value } ) }
					placeholder={ __( 'Marker', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					value={ detail }
					onChange={ ( value ) => setAttributes( { detail: value } ) }
					placeholder={ __( 'What happens', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
