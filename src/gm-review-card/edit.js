import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { quoteIcon, reviewText, reviewerName, reviewerLabel } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'jivaka-gm-review-card gm-anim-stagger twork-gm-review-card-editor',
			style: {
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				borderRadius: 12,
				padding: '40px 30px',
				position: 'relative',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Review Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Quote Icon Class', 'twork-builder' ) }
							value={ quoteIcon }
							onChange={ ( val ) =>
								setAttributes( { quoteIcon: val } )
							}
							help={ __(
								'e.g. fas fa-quote-left',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Reviewer Name', 'twork-builder' ) }
							value={ reviewerName }
							onChange={ ( val ) =>
								setAttributes( { reviewerName: val } )
							}
						/>

						<TextControl
							label={ __( 'Reviewer Label', 'twork-builder' ) }
							value={ reviewerLabel }
							onChange={ ( val ) =>
								setAttributes( { reviewerLabel: val } )
							}
							help={ __(
								'e.g. Diabetes Patient, Regular Check-up',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<i
					className={ `${
						quoteIcon || 'fas fa-quote-left'
					} jivaka-gm-quote-icon` }
					aria-hidden
				/>

				<RichText
					tagName="p"
					className="jivaka-gm-review-text"
					value={ reviewText }
					onChange={ ( val ) => setAttributes( { reviewText: val } ) }
					placeholder={ __(
						'Patient quote or review text...',
						'twork-builder'
					) }
					style={ {
						fontStyle: 'italic',
						color: '#555',
						marginBottom: 20,
						lineHeight: 1.8,
					} }
				/>

				<div className="jivaka-gm-reviewer">
					<RichText
						tagName="h5"
						value={ reviewerName }
						onChange={ ( val ) =>
							setAttributes( { reviewerName: val } )
						}
						placeholder={ __( 'Name', 'twork-builder' ) }
						style={ { margin: 0, fontSize: '1.1rem' } }
					/>

					<RichText
						tagName="span"
						value={ reviewerLabel }
						onChange={ ( val ) =>
							setAttributes( { reviewerLabel: val } )
						}
						placeholder={ __(
							'Label (e.g. Diabetes Patient)',
							'twork-builder'
						) }
						style={ {
							fontSize: '0.9rem',
							color: '#f48b2a',
							fontWeight: 500,
						} }
					/>
				</div>
			</div>
		</>
	);
}
