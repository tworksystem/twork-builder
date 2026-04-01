import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { slot, badgeText, pointText } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `agrezer-why-choose__point agrezer-why-choose__point--${ slot }`,
		} ),
		[ slot ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Position', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __(
								'Stage slot (layout)',
								'twork-builder'
							) }
							value={ String( slot ) }
							options={ [
								{
									label: __(
										'1 — left lower',
										'twork-builder'
									),
									value: '1',
								},
								{
									label: __(
										'2 — left upper',
										'twork-builder'
									),
									value: '2',
								},
								{
									label: __(
										'3 — top center',
										'twork-builder'
									),
									value: '3',
								},
								{
									label: __(
										'4 — right upper',
										'twork-builder'
									),
									value: '4',
								},
								{
									label: __(
										'5 — right lower',
										'twork-builder'
									),
									value: '5',
								},
							] }
							onChange={ ( val ) => {
								const n = parseInt( val, 10 );
								setAttributes( {
									slot: n,
									badgeText: String( n ).padStart( 2, '0' ),
								} );
							} }
						/>

						<TextControl
							label={ __( 'Badge text', 'twork-builder' ) }
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
							help={ __( 'Usually 01, 02, …', 'twork-builder' ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="agrezer-why-choose__point-icon">
					{ badgeText }
				</div>
				<RichText
					tagName="p"
					className="agrezer-why-choose__point-text"
					value={ pointText }
					onChange={ ( val ) => setAttributes( { pointText: val } ) }
					placeholder={ __( 'Point text…', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
