import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { ConditionsControl } from '@twork-builder/shared/laparo-legacy-section';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		icon,
		title,
		description,
		wide,
		meta1Value,
		meta1Label,
		meta2Value,
		meta2Label,
		meta3Value,
		meta3Label,
		conditions,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: wide ? 'lp-proc lp-proc--wide' : 'lp-proc',
			'data-conditions': conditions || '',
		} ),
		[ wide, conditions ]
	);

	if ( showItem === false ) {
		return null;
	}

	const facts = [
		[ meta1Value, meta1Label ],
		[ meta2Value, meta2Label ],
		[ meta3Value, meta3Label ],
	].filter( ( fact ) => fact[ 0 ] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this card', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Wide card', 'twork-builder' ) }
							help={ __(
								'Wide cards span half the grid; narrow cards span a third.',
								'twork-builder'
							) }
							checked={ wide }
							onChange={ ( value ) =>
								setAttributes( { wide: value } )
							}
						/>
						<TextControl
							label={ __( 'Icon', 'twork-builder' ) }
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
						/>
						<ConditionsControl
							value={ conditions }
							onChange={ ( value ) =>
								setAttributes( { conditions: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Facts', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Fact 1', 'twork-builder' ) }
							value={ meta1Value }
							onChange={ ( value ) =>
								setAttributes( { meta1Value: value } )
							}
						/>
						<TextControl
							label={ __( 'Fact 1 label', 'twork-builder' ) }
							value={ meta1Label }
							onChange={ ( value ) =>
								setAttributes( { meta1Label: value } )
							}
						/>
						<TextControl
							label={ __( 'Fact 2', 'twork-builder' ) }
							value={ meta2Value }
							onChange={ ( value ) =>
								setAttributes( { meta2Value: value } )
							}
						/>
						<TextControl
							label={ __( 'Fact 2 label', 'twork-builder' ) }
							value={ meta2Label }
							onChange={ ( value ) =>
								setAttributes( { meta2Label: value } )
							}
						/>
						<TextControl
							label={ __( 'Fact 3', 'twork-builder' ) }
							value={ meta3Value }
							onChange={ ( value ) =>
								setAttributes( { meta3Value: value } )
							}
						/>
						<TextControl
							label={ __( 'Fact 3 label', 'twork-builder' ) }
							value={ meta3Label }
							onChange={ ( value ) =>
								setAttributes( { meta3Label: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<article { ...blockProps }>
				{ icon && (
					<span className="lp-proc-icon">
						<i className={ icon } aria-hidden="true" />
					</span>
				) }
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder={ __( 'Procedure', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					value={ description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
					placeholder={ __( 'What it involves', 'twork-builder' ) }
				/>
				{ facts.length > 0 && (
					<div className="lp-proc-meta">
						{ facts.map( ( fact ) => (
							<div key={ fact[ 0 ] }>
								<b>{ fact[ 0 ] }</b>
								{ fact[ 1 ] }
							</div>
						) ) }
					</div>
				) }
			</article>
		</>
	);
}
