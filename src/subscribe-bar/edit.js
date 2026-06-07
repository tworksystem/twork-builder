import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, placeholder, buttonLabel, honeypotName, backgroundColor } =
		attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-subscribe-bar newsletter twork-subscribe-bar-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Form', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Placeholder', 'twork-builder' ) }
							value={ placeholder }
							onChange={ ( val ) =>
								setAttributes( { placeholder: val } )
							}
						/>
						<TextControl
							label={ __( 'Button Label', 'twork-builder' ) }
							value={ buttonLabel }
							onChange={ ( val ) =>
								setAttributes( { buttonLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Honeypot Field Name', 'twork-builder' ) }
							value={ honeypotName }
							onChange={ ( val ) =>
								setAttributes( { honeypotName: val } )
							}
							help={ __(
								'Hidden field name used for spam protection.',
								'twork-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Banner Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } data-block="newsletter">
				<div
					className="newsletter__banner"
					style={ {
						backgroundColor: backgroundColor || '#ffff00',
					} }
				>
					<div className="newsletter__inner l-section">
						<div className="newsletter__cta">
							<span
								className="newsletter__icon"
								aria-hidden="true"
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
								>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
									<polyline points="22,6 12,13 2,6" />
								</svg>
							</span>
							<RichText
								tagName="p"
								className="newsletter__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Title…', 'twork-builder' ) }
							/>
						</div>
						<div className="newsletter__form">
							<input
								className="newsletter__input"
								type="email"
								placeholder={ placeholder }
								disabled
							/>
							<span className="newsletter__button btn btn--dark">
								{ buttonLabel }
							</span>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
