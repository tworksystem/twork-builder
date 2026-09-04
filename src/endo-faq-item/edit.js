import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		showQuestion,
		question,
		showAnswer,
		answer,
		showToggleIcon,
		toggleIconClass,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'faq mk-endo-faq-item is-open',
		} ),
		[]
	);

	if ( showItem === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'FAQ Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Item', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Question', 'twork-builder' ) }
							checked={ showQuestion !== false }
							onChange={ ( value ) =>
								setAttributes( { showQuestion: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Answer', 'twork-builder' ) }
							checked={ showAnswer !== false }
							onChange={ ( value ) =>
								setAttributes( { showAnswer: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Toggle Icon', 'twork-builder' ) }
							checked={ showToggleIcon !== false }
							onChange={ ( value ) =>
								setAttributes( { showToggleIcon: value } )
							}
						/>
						{ showToggleIcon !== false && (
							<TextControl
								label={ __( 'Toggle Icon', 'twork-builder' ) }
								value={ toggleIconClass }
								onChange={ ( value ) =>
									setAttributes( { toggleIconClass: value } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showQuestion !== false && (
					<button type="button" className="faq-q" disabled>
						<RichText
							tagName="span"
							value={ question }
							onChange={ ( value ) =>
								setAttributes( { question: value } )
							}
							placeholder={ __( 'Question', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
						{ showToggleIcon !== false && toggleIconClass && (
							<i
								className={ toggleIconClass }
								aria-hidden="true"
							/>
						) }
					</button>
				) }
				{ showAnswer !== false && (
					<div className="faq-a" style={ { height: 'auto' } }>
						<RichText
							tagName="div"
							className="faq-a-inner"
							value={ answer }
							onChange={ ( value ) =>
								setAttributes( { answer: value } )
							}
							placeholder={ __( 'Answer', 'twork-builder' ) }
						/>
					</div>
				) }
			</div>
		</>
	);
}
