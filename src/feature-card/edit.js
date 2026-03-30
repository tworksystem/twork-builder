import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ICON_SUGGESTIONS = [
	'fas fa-microscope',
	'fas fa-user-md',
	'fas fa-heart-pulse',
	'fas fa-procedures',
	'fas fa-stethoscope',
	'fas fa-hospital',
	'fas fa-award',
	'fas fa-shield-alt',
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconClass, title, description } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'feature-card twork-feature-card-editor stagger-up',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Feature Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Icon class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass || 'fas fa-microscope' }
							onChange={ ( v ) =>
								setAttributes( {
									iconClass: v || 'fas fa-microscope',
								} )
							}
							help={ __(
								'e.g. fas fa-microscope, fas fa-user-md',
								'twork-builder'
							) }
						/>

						<p
							style={ {
								fontSize: '11px',
								color: '#757575',
								marginTop: 4,
							} }
						>
							{ __( 'Suggestions:', 'twork-builder' ) }{ ' ' }
							{ ICON_SUGGESTIONS.join( ', ' ) }
						</p>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="feature-icon" aria-hidden="true">
					<i className={ iconClass || 'fas fa-microscope' } />
				</div>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Feature title…', 'twork-builder' ) }
					className="feature-card-title"
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( v ) => setAttributes( { description: v } ) }
					placeholder={ __(
						'Feature description…',
						'twork-builder'
					) }
					className="feature-card-description"
					style={ { color: '#64748b', fontSize: '0.95rem' } }
				/>
			</div>
		</>
	);
}
