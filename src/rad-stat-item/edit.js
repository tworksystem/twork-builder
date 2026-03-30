import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { statNumber, statLabel } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'rad-stat-item twork-rad-stat-item-editor',
			style: {
				textAlign: 'center',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Stat Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ /* Text is edited inline; no extra controls needed for now */ }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="span"
					className="rad-stat-num"
					value={ statNumber }
					onChange={ ( val ) => setAttributes( { statNumber: val } ) }
					placeholder={ __( '24/7', 'twork-builder' ) }
					withoutInteractiveFormatting
				/>

				<RichText
					tagName="span"
					className="rad-stat-label"
					value={ statLabel }
					onChange={ ( val ) => setAttributes( { statLabel: val } ) }
					placeholder={ __( 'Operating Hours', 'twork-builder' ) }
					withoutInteractiveFormatting
				/>
			</div>
		</>
	);
}
