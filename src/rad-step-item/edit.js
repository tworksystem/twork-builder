import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-step twork-rad-step-item-editor',
		} ),
		[]
	);

	const raw = ( iconClass || 'far fa-calendar-check' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Process Step', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'far fa-calendar-check',
								} )
							}
							help={ __(
								'e.g. far fa-calendar-check, fas fa-user-nurse, fas fa-radiation, fas fa-file-medical-alt',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="rad-step-icon">
					<i className={ iconClassResolved } aria-hidden="true" />
				</div>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Book', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __(
						'Schedule via phone or app.',
						'twork-builder'
					) }
					style={ {
						fontSize: '0.9rem',
						color: '#666666',
					} }
				/>
			</div>
		</>
	);
}
