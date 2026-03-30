import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { stepNumber, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'em-step twork-em-process-step-editor',
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
								'Shown inside the numbered circle (e.g. 1, 2, 3, 4).',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="em-step-num">{ stepNumber }</div>
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
					placeholder={ __( 'Step description…', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
