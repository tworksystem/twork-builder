import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		buttonText,
		buttonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
		responsiveOrder = 'default',
		hideOnMobile = false,
		mobileAlign = '',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];
	const responsiveClasses = [
		responsiveOrder === 'first' ? 'is-order-first-mobile' : '',
		responsiveOrder === 'last' ? 'is-order-last-mobile' : '',
		hideOnMobile ? 'is-hidden-mobile' : '',
		mobileAlign === 'left' ? 'is-mobile-align-left' : '',
		mobileAlign === 'center' ? 'is-mobile-align-center' : '',
		mobileAlign === 'right' ? 'is-mobile-align-right' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	// Use native useBlockProps directly so Gutenberg spacing supports
	// (margin/padding from block.json) are applied to the wrapper in editor.
	const blockProps = useBlockProps( {
		className: [ 'twork-stats__btn-wrap', responsiveClasses ]
			.filter( Boolean )
			.join( ' ' ),
	} );

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

						<ToggleControl
							label={ __( 'Show button icon', 'twork-builder' ) }
							checked={ showButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { showButtonIcon: val } )
							}
						/>

						<SelectControl
							label={ __( 'Button icon type', 'twork-builder' ) }
							value={ buttonIconType }
							options={ [
								{
									label: __(
										'Diagonal arrow',
										'twork-builder'
									),
									value: 'diagonal-arrow',
								},
								{
									label: __( 'Arrow right', 'twork-builder' ),
									value: 'arrow-right',
								},
								{
									label: __(
										'External link',
										'twork-builder'
									),
									value: 'external',
								},
								{
									label: __( 'Plus', 'twork-builder' ),
									value: 'plus',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { buttonIconType: val } )
							}
							disabled={ ! showButtonIcon }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Responsive Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Mobile Order', 'twork-builder' ) }
							value={ responsiveOrder }
							options={ [
								{
									label: __( 'Default', 'twork-builder' ),
									value: 'default',
								},
								{
									label: __( 'Move to Top', 'twork-builder' ),
									value: 'first',
								},
								{
									label: __( 'Move to Bottom', 'twork-builder' ),
									value: 'last',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { responsiveOrder: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Hide on Mobile', 'twork-builder' ) }
							checked={ hideOnMobile }
							onChange={ ( val ) =>
								setAttributes( { hideOnMobile: val } )
							}
						/>
						<SelectControl
							label={ __( 'Mobile Alignment', 'twork-builder' ) }
							value={ mobileAlign }
							options={ [
								{
									label: __( 'Default', 'twork-builder' ),
									value: '',
								},
								{
									label: __( 'Left', 'twork-builder' ),
									value: 'left',
								},
								{
									label: __( 'Center', 'twork-builder' ),
									value: 'center',
								},
								{
									label: __( 'Right', 'twork-builder' ),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { mobileAlign: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<span className="twork-stats__btn twork-stats__btn--editor">
					<RichText
						tagName="span"
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
						placeholder={ __( 'Get In Touch', 'twork-builder' ) }
					/>

					{ showButtonIcon && (
						<span
							className="twork-stats__btn-icon"
							aria-hidden="true"
						>
							{ actionIcon }
						</span>
					) }
				</span>
			</div>
		</>
	);
}
