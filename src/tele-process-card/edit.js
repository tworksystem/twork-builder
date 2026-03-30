import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'User MD (Choose Doctor)', 'twork-builder' ),
		value: 'fas fa-user-md',
	},
	{
		label: __( 'Calendar Check (Book Slot)', 'twork-builder' ),
		value: 'fas fa-calendar-check',
	},
	{ label: __( 'Link (Get Link)', 'twork-builder' ), value: 'fas fa-link' },
	{
		label: __( 'File Prescription (Consultation)', 'twork-builder' ),
		value: 'fas fa-file-prescription',
	},
	{
		label: __( 'Stethoscope', 'twork-builder' ),
		value: 'fas fa-stethoscope',
	},
	{ label: __( 'Video', 'twork-builder' ), value: 'fas fa-video' },
	{ label: __( 'Comments', 'twork-builder' ), value: 'fas fa-comments' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { stepNumber, iconClass, title, description } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-tele-process-card-editor process-card stagger-card',
		} ),
		[]
	);

	const titleValue = title ?? '';
	const descriptionValue = description ?? '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Process Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<p
							style={ {
								margin: '0 0 10px 0',
								fontSize: '12px',
								color: '#757575',
							} }
						>
							{ __(
								'Click the title or description in the card to edit directly.',
								'twork-builder'
							) }
						</p>
						<RangeControl
							label={ __( 'Step number', 'twork-builder' ) }
							value={ stepNumber ?? 1 }
							onChange={ ( val ) =>
								setAttributes( { stepNumber: val } )
							}
							min={ 1 }
							max={ 99 }
							step={ 1 }
							help={ __(
								'Shown in badge on icon (data-step).',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Icon', 'twork-builder' ) }
							value={ iconClass ?? 'fas fa-user-md' }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
						/>

						<TextControl
							label={ __(
								'Icon Class (Font Awesome)',
								'twork-builder'
							) }
							value={ iconClass ?? '' }
							onChange={ ( val ) =>
								setAttributes( {
									iconClass: val || 'fas fa-user-md',
								} )
							}
							help={ __(
								'Override: e.g. fas fa-user-md',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Title (or edit in card)',
								'twork-builder'
							) }
							value={ titleValue }
							onChange={ ( val ) =>
								setAttributes( { title: val ?? '' } )
							}
							placeholder={ __( 'Step title…', 'twork-builder' ) }
						/>

						<TextControl
							label={ __(
								'Description (or edit in card)',
								'twork-builder'
							) }
							value={ descriptionValue }
							onChange={ ( val ) =>
								setAttributes( { description: val ?? '' } )
							}
							placeholder={ __(
								'Step description…',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="step-icon"
					data-step={ String( stepNumber ?? 1 ) }
				>
					<i
						className={ iconClass || 'fas fa-user-md' }
						aria-hidden="true"
					/>
				</div>
				<RichText
					tagName="h4"
					value={ titleValue }
					onChange={ ( val ) =>
						setAttributes( { title: val ?? '' } )
					}
					placeholder={ __( 'Step title…', 'twork-builder' ) }
					allowedFormats={ [] }
				/>

				<RichText
					tagName="p"
					value={ descriptionValue }
					onChange={ ( val ) =>
						setAttributes( { description: val ?? '' } )
					}
					placeholder={ __( 'Step description…', 'twork-builder' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			</div>
		</>
	);
}
