import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		showStars,
		starCount,
		showQuote,
		quote,
		showAuthorImage,
		authorImageUrl,
		authorImageId,
		authorImageAlt,
		showAuthorName,
		authorName,
		showAuthorDetail,
		authorDetail,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'quote mk-endo-testimonial-item',
		} ),
		[]
	);

	if ( showItem === false ) {
		return null;
	}

	const stars = Math.max( 0, Math.min( 5, starCount || 0 ) );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Testimonial', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Quote', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Stars', 'twork-builder' ) }
							checked={ showStars !== false }
							onChange={ ( value ) =>
								setAttributes( { showStars: value } )
							}
						/>
						{ showStars !== false && (
							<RangeControl
								label={ __( 'Star Count', 'twork-builder' ) }
								value={ starCount }
								onChange={ ( value ) =>
									setAttributes( { starCount: value } )
								}
								min={ 0 }
								max={ 5 }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Quote Text', 'twork-builder' ) }
							checked={ showQuote !== false }
							onChange={ ( value ) =>
								setAttributes( { showQuote: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Author Image', 'twork-builder' ) }
							checked={ showAuthorImage !== false }
							onChange={ ( value ) =>
								setAttributes( { showAuthorImage: value } )
							}
						/>
						{ showAuthorImage !== false && (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											authorImageUrl: media.url,
											authorImageId: media.id,
											authorImageAlt:
												media.alt || authorImageAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ authorImageId }
									render={ ( { open } ) => (
										<div style={ { marginTop: 8 } }>
											{ authorImageUrl ? (
												<img
													src={ authorImageUrl }
													alt=""
													style={ {
														width: 48,
														height: 48,
														borderRadius: '50%',
														objectFit: 'cover',
														marginBottom: 8,
													} }
												/>
											) : null }
											<Button
												variant="secondary"
												onClick={ open }
											>
												{ authorImageUrl
													? __(
															'Replace Image',
															'twork-builder'
													  )
													: __(
															'Upload Image',
															'twork-builder'
													  ) }
											</Button>
										</div>
									) }
								/>
							</MediaUploadCheck>
						) }
						<ToggleControl
							label={ __( 'Show Author Name', 'twork-builder' ) }
							checked={ showAuthorName !== false }
							onChange={ ( value ) =>
								setAttributes( { showAuthorName: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show Author Detail',
								'twork-builder'
							) }
							checked={ showAuthorDetail !== false }
							onChange={ ( value ) =>
								setAttributes( { showAuthorDetail: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<figure { ...blockProps }>
				{ showStars !== false && stars > 0 && (
					<span className="stars" aria-hidden="true">
						{ Array.from( { length: stars } ).map( ( _, i ) => (
							<i key={ `star-${ i }` } className="fas fa-star" />
						) ) }
					</span>
				) }
				{ showQuote !== false && (
					<RichText
						tagName="p"
						value={ quote }
						onChange={ ( value ) =>
							setAttributes( { quote: value } )
						}
						placeholder={ __( 'Quote', 'twork-builder' ) }
					/>
				) }
				<div className="quote-by">
					{ showAuthorImage !== false && authorImageUrl && (
						<img src={ authorImageUrl } alt={ authorImageAlt } />
					) }
					<div>
						{ showAuthorName !== false && (
							<RichText
								tagName="strong"
								value={ authorName }
								onChange={ ( value ) =>
									setAttributes( { authorName: value } )
								}
								placeholder={ __(
									'Author name',
									'twork-builder'
								) }
								withoutInteractiveFormatting
							/>
						) }
						{ showAuthorDetail !== false && (
							<RichText
								tagName="span"
								value={ authorDetail }
								onChange={ ( value ) =>
									setAttributes( { authorDetail: value } )
								}
								placeholder={ __(
									'Procedure, date',
									'twork-builder'
								) }
								withoutInteractiveFormatting
							/>
						) }
					</div>
				</div>
			</figure>
		</>
	);
}
