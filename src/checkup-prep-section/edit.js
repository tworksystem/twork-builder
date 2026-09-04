import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import {
	pickPrep,
	makePrepSetter,
	CheckupPrepInspector,
	CheckupPrepEditorBody,
} from '@twork-builder/shared/checkup-prep-panel';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
	} = attributes;

	const prep = pickPrep( attributes );
	const setPrep = makePrepSetter( setAttributes );

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-checkup-prep mk-checkup-prep-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingTop, paddingBottom ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val || '#f8f9fa',
										} ),
									label: __(
										'Section Background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							__nextHasNoMarginBottom
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
						/>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __( 'Padding Bottom (px)', 'twork-builder' ) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
						/>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 4 }
						/>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 120 }
							step={ 4 }
						/>

						<hr className="mk-prep-panel-rule" />

						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1400 }
							step={ 20 }
						/>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 2 }
						/>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __(
								'Container Padding Mobile (px)',
								'twork-builder'
							) }
							value={ containerPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingMobile: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 2 }
						/>
					</PanelBody>

					<CheckupPrepInspector prep={ prep } setPrep={ setPrep } />
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="prep-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<CheckupPrepEditorBody prep={ prep } setPrep={ setPrep } />
				</div>
			</section>
		</>
	);
}
