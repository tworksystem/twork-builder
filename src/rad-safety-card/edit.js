import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-safety-card twork-rad-safety-card-editor',
		} ),
		[]
	);

	const raw = ( iconClass || 'fas fa-shield-alt' ).trim();
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
						title={ __( 'Safety Card', 'twork-builder' ) }
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
									iconClass: val || 'fas fa-shield-alt',
								} )
							}
							help={ __(
								'e.g. fas fa-shield-alt, fas fa-child, fas fa-pump-medical',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<i
					className={ `rad-safety-icon ${ iconClassResolved }` }
					aria-hidden="true"
				/>

				<div>
					<RichText
						tagName="h4"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Dose Management', 'twork-builder' ) }
					/>

					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Automated dose tracking for every patient to prevent overexposure.',
							'twork-builder'
						) }
					/>
				</div>
			</div>
		</>
	);
}
