import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-why-item rad-why-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon & Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Icon Class', 'twork-builder' ) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
							help={ __(
								'Font Awesome class, e.g. "fas fa-bolt"',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="rad-why-icon">
					{ iconClass && (
						<i className={ iconClass } aria-hidden="true" />
					) }
				</div>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Card title...', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="rad-why-description"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __(
						'Short description...',
						'twork-builder'
					) }
				/>
			</div>
		</>
	);
}
