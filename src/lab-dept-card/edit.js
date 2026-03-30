import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lab-dept-card twork-lab-dept-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Department card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon CSS class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass || '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-flask',
								} )
							}
							help={ __(
								'e.g. fas fa-flask, fas fa-tint, fas fa-dna',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Title', 'twork-builder' ) }
							value={ title || '' }
							onChange={ ( val ) =>
								setAttributes( {
									title: val || 'Biochemistry',
								} )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="lab-hex-icon">
					{ iconClass && (
						<i className={ iconClass } aria-hidden="true" />
					) }
				</div>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Department title…', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
