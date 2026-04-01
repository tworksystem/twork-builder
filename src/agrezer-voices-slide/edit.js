import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		quote,
		authorImage,
		authorImageAlt,
		authorName,
		authorRole,
		quoteMark,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-voices-section__slide',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Author photo', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Image alt text', 'twork-builder' ) }
							value={ authorImageAlt }
							onChange={ ( val ) =>
								setAttributes( { authorImageAlt: val } )
							}
						/>

						{ authorImage && (
							<Button
								isSecondary
								isSmall
								onClick={ () =>
									setAttributes( {
										authorImage: '',
										authorImageId: null,
									} )
								}
							>
								{ __( 'Remove photo', 'twork-builder' ) }
							</Button>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Quote mark', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Character (decorative)',
								'twork-builder'
							) }
							value={ quoteMark }
							onChange={ ( val ) =>
								setAttributes( { quoteMark: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<RichText
					tagName="p"
					className="twork-voices-section__quote"
					value={ quote }
					onChange={ ( val ) => setAttributes( { quote: val } ) }
					placeholder={ __( 'Quote…', 'twork-builder' ) }
				/>

				<div className="twork-voices-section__author-row">
					<div className="twork-voices-section__author">
						{ ! authorImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										authorImage: media.url,
										authorImageId: media.id,
										authorImageAlt:
											media.alt || authorImageAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __( 'Author', 'twork-builder' ),
								} }
							/>
						) : (
							<img
								src={ authorImage }
								alt=""
								className="twork-voices-section__author-img"
							/>
						) }
						<div>
							<RichText
								tagName="h4"
								className="twork-voices-section__author-name"
								value={ authorName }
								onChange={ ( val ) =>
									setAttributes( { authorName: val } )
								}
								placeholder={ __( 'Name', 'twork-builder' ) }
								allowedFormats={ [] }
							/>

							<RichText
								tagName="p"
								className="twork-voices-section__author-role"
								value={ authorRole }
								onChange={ ( val ) =>
									setAttributes( { authorRole: val } )
								}
								placeholder={ __( 'Role', 'twork-builder' ) }
								allowedFormats={ [] }
							/>
						</div>
					</div>
					<span
						className="twork-voices-section__quote-mark"
						aria-hidden="true"
					>
						{ quoteMark || '❝' }
					</span>
				</div>
			</article>
		</>
	);
}
