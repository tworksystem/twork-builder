import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { quote, authorName, authorRole, rating } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-testimonials__slide twork-testimonials__slide--editor',
		} ),
		[]
	);

	const r = Math.min( 5, Math.max( 1, Number( rating ) || 5 ) );
	const stars = Array.from( { length: 5 }, ( _, i ) =>
		i < r ? '★' : '☆'
	).join( ' ' );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Rating', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Stars (1–5)', 'twork-builder' ) }
							value={ rating }
							onChange={ ( val ) =>
								setAttributes( { rating: val ?? 5 } )
							}
							min={ 1 }
							max={ 5 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="twork-testimonials__content">
					<div
						className="twork-testimonials__quote-icon"
						aria-hidden="true"
					>
						&ldquo;
					</div>
					<RichText
						tagName="p"
						className="twork-testimonials__text"
						value={ quote }
						onChange={ ( val ) => setAttributes( { quote: val } ) }
						placeholder={ __(
							'Testimonial quote…',
							'twork-builder'
						) }
					/>
				</div>
				<div className="twork-testimonials__author-box">
					<RichText
						tagName="h4"
						className="twork-testimonials__author-name"
						value={ authorName }
						onChange={ ( val ) =>
							setAttributes( { authorName: val } )
						}
						placeholder={ __( 'Author name', 'twork-builder' ) }
						allowedFormats={ [] }
					/>

					<RichText
						tagName="span"
						className="twork-testimonials__author-role"
						value={ authorRole }
						onChange={ ( val ) =>
							setAttributes( { authorRole: val } )
						}
						placeholder={ __( 'Role / title', 'twork-builder' ) }
						allowedFormats={ [] }
					/>

					<div
						className="twork-testimonials__stars"
						aria-label={ __(
							'Star rating preview',
							'twork-builder'
						) }
					>
						{ stars }
					</div>
				</div>
			</div>
		</>
	);
}
