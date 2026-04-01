import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { buttonText, buttonUrl } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-stats__btn-wrap',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Button', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'URL', 'twork-builder' ) }
							value={ buttonUrl }
							onChange={ ( val ) =>
								setAttributes( { buttonUrl: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<span className="agrezer-stats__btn agrezer-stats__btn--editor">
					<RichText
						tagName="span"
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
						placeholder={ __( 'Get In Touch', 'twork-builder' ) }
					/>

					<span aria-hidden="true">↗</span>
				</span>
			</div>
		</>
	);
}
