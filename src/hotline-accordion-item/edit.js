import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, labelText, phoneNumber, iconClass } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'acc-item',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Hotline', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Label (e.g. Direct Line)',
								'twork-builder'
							) }
							value={ labelText }
							onChange={ ( val ) =>
								setAttributes( { labelText: val } )
							}
						/>

						<TextControl
							label={ __( 'Phone Number', 'twork-builder' ) }
							value={ phoneNumber }
							onChange={ ( val ) =>
								setAttributes( { phoneNumber: val } )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
							help={ __(
								'e.g. fas fa-phone-alt',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="acc-head">
					<RichText
						tagName="span"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Department name…',
							'twork-builder'
						) }
						className="acc-head-title"
					/>

					<i
						className={ iconClass || 'fas fa-chevron-down' }
						aria-hidden="true"
					/>
				</div>
				<div className="acc-body">
					<div className="acc-content-wrapper">
						<div className="acc-icon">
							<i
								className={ iconClass || 'fas fa-phone-alt' }
								aria-hidden="true"
							/>
						</div>
						<div className="acc-text">
							<span>{ labelText }</span>
							<strong>{ phoneNumber }</strong>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
