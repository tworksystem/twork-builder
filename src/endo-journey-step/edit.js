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
	const {
		showItem,
		showIcon,
		showTime,
		timeLabel,
		showTitle,
		title,
		showDescription,
		description,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'step stagger-step is-on mk-endo-journey-step',
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
						title={ __( 'Journey Step', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Step', 'twork-builder' ) }
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
							label={ __( 'Show Time', 'twork-builder' ) }
							checked={ showTime !== false }
							onChange={ ( value ) =>
								setAttributes( { showTime: value } )
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
							label={ __( 'Show Description', 'twork-builder' ) }
							checked={ showDescription !== false }
							onChange={ ( value ) =>
								setAttributes( { showDescription: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showIcon !== false &&
					hasIconValue( mapIconAttrs( attributes ) ) && (
						<div className="step-dot">
							<EndoFlexibleIcon attributes={ attributes } />
						</div>
					) }
				{ showTime !== false && (
					<RichText
						tagName="span"
						className="step-time"
						value={ timeLabel }
						onChange={ ( value ) =>
							setAttributes( { timeLabel: value } )
						}
						placeholder={ __( 'Time', 'twork-builder' ) }
						withoutInteractiveFormatting
					/>
				) }
				{ showTitle !== false && (
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Step title', 'twork-builder' ) }
					/>
				) }
				{ showDescription !== false && (
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __( 'Description', 'twork-builder' ) }
					/>
				) }
			</div>
		</>
	);
}
