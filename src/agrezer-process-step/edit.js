import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		position,
		badgeNum,
		stepTitle,
		stepText,
		showCta,
		ctaText,
		ctaUrl,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-process__step twork-process__step--${ position }`,
		} ),
		[ position ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column alignment', 'twork-builder' ) }
							value={ position }
							options={ [
								{
									label: __( 'Left column', 'twork-builder' ),
									value: 'left',
								},
								{
									label: __(
										'Right column',
										'twork-builder'
									),
									value: 'right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { position: val } )
							}
							help={ __(
								'Should match block order: left step, center, right step.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Badge number', 'twork-builder' ) }
							value={ badgeNum }
							onChange={ ( val ) =>
								setAttributes( { badgeNum: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show CTA button', 'twork-builder' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>

						{ showCta && (
							<>
								<TextControl
									label={ __(
										'Button URL',
										'twork-builder'
									) }
									value={ ctaUrl }
									onChange={ ( val ) =>
										setAttributes( { ctaUrl: val } )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="twork-process__badge-wrapper">
					<div className="twork-process__badge">
						<span className="twork-process__badge-num">
							{ badgeNum }
						</span>
					</div>
				</div>
				<RichText
					tagName="h3"
					className="twork-process__step-title"
					value={ stepTitle }
					onChange={ ( val ) => setAttributes( { stepTitle: val } ) }
					placeholder={ __( 'Step title', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="twork-process__step-text"
					value={ stepText }
					onChange={ ( val ) => setAttributes( { stepText: val } ) }
					placeholder={ __( 'Description…', 'twork-builder' ) }
				/>

				{ showCta && (
					<div className="twork-process__btn twork-process__btn--editor">
						<RichText
							tagName="span"
							value={ ctaText }
							onChange={ ( val ) =>
								setAttributes( { ctaText: val } )
							}
							placeholder={ __(
								'More Details',
								'twork-builder'
							) }
						/>

						<span aria-hidden="true">↗</span>
					</div>
				) }
			</div>
		</>
	);
}
