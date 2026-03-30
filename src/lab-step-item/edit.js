import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { stepNumber, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lab-step-row stagger-up twork-lab-step-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Step number', 'twork-builder' ) }
							value={ stepNumber }
							onChange={ ( val ) =>
								setAttributes( { stepNumber: val } )
							}
							help={ __(
								'Shown in the circle (e.g. 1, 2, 3, 4).',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="lab-step-num">{ stepNumber }</div>
				<div className="lab-step-content">
					<RichText
						tagName="h4"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Step title', 'twork-builder' ) }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Step description…',
							'twork-builder'
						) }
					/>
				</div>
			</div>
		</>
	);
}
