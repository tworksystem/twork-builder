import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { title, placeholder, buttonLabel } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'newsletter subscribe-bar-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Form', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Placeholder', 'twork-builder' ) }
						value={ placeholder }
						onChange={ ( v ) =>
							setAttributes( { placeholder: v } )
						}
					/>
					<TextControl
						label={ __( 'Button label', 'twork-builder' ) }
						value={ buttonLabel }
						onChange={ ( v ) =>
							setAttributes( { buttonLabel: v } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } data-block="twork/subscribe-bar">
				<div className="newsletter__banner">
					<div className="newsletter__inner l-section">
						<div className="newsletter__cta">
							<RichText
								tagName="p"
								className="newsletter__title"
								value={ title }
								onChange={ ( v ) =>
									setAttributes( { title: v } )
								}
							/>
						</div>
						<form
							className="newsletter__form"
							onSubmit={ ( e ) => e.preventDefault() }
						>
							<input
								className="newsletter__input"
								type="email"
								placeholder={ placeholder }
								disabled
							/>
							<button
								className="newsletter__button btn btn--dark"
								type="button"
							>
								{ buttonLabel }
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
