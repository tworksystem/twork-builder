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
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';

function StarsDisplay( { rating } ) {
	const full = Math.floor( rating );
	const half = rating % 1 >= 0.5;
	const stars = [];
	for ( let i = 0; i < full; i++ )
		stars.push(
			<i key={ i } className="fas fa-star" aria-hidden="true" />
		);
	if ( half )
		stars.push(
			<i key="half" className="fas fa-star-half-alt" aria-hidden="true" />
		);
	return <div className="hc-stars">{ stars }</div>;
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		starRating,
		review,
		clientImageId,
		clientImageUrl,
		clientImageAlt,
		clientName,
		clientLocation,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-testi-card twork-hc-testimonial-card-editor',
		} ),
		[]
	);

	const rating = Math.min( 5, Math.max( 0, Number( starRating ) || 5 ) );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Rating', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Stars (0.5 - 5)', 'twork-builder' ) }
							value={ rating }
							onChange={ ( val ) =>
								setAttributes( { starRating: val } )
							}
							min={ 0.5 }
							max={ 5 }
							step={ 0.5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Client', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Name', 'twork-builder' ) }
							value={ clientName || '' }
							onChange={ ( val ) =>
								setAttributes( { clientName: val } )
							}
						/>

						<TextControl
							label={ __( 'Location', 'twork-builder' ) }
							value={ clientLocation || '' }
							onChange={ ( val ) =>
								setAttributes( { clientLocation: val } )
							}
						/>

						<MediaUploadCheck>
							{ ! clientImageUrl ? (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											clientImageId: media.id,
											clientImageUrl:
												media.url ||
												media.sizes?.thumbnail?.url ||
												'',
											clientImageAlt:
												media.alt || clientImageAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ clientImageId }
									render={ ( { open } ) => (
										<Button
											variant="secondary"
											onClick={ open }
											style={ {
												width: '100%',
												marginTop: 8,
											} }
										>
											{ __(
												'Choose image',
												'twork-builder'
											) }
										</Button>
									) }
								/>
							) : (
								<div style={ { marginTop: 8 } }>
									<img
										src={ clientImageUrl }
										alt=""
										style={ {
											width: 50,
											height: 50,
											borderRadius: '50%',
											objectFit: 'cover',
											display: 'block',
											marginBottom: 8,
										} }
									/>

									<div style={ { display: 'flex', gap: 8 } }>
										<MediaUpload
											onSelect={ ( media ) =>
												setAttributes( {
													clientImageId: media.id,
													clientImageUrl:
														media.url ||
														media.sizes?.thumbnail
															?.url ||
														'',
													clientImageAlt:
														media.alt ||
														clientImageAlt,
												} )
											}
											allowedTypes={ [ 'image' ] }
											value={ clientImageId }
											render={ ( { open } ) => (
												<Button
													variant="secondary"
													isSmall
													onClick={ open }
												>
													{ __(
														'Replace',
														'twork-builder'
													) }
												</Button>
											) }
										/>

										<Button
											variant="secondary"
											isDestructive
											isSmall
											onClick={ () =>
												setAttributes( {
													clientImageId: 0,
													clientImageUrl: '',
													clientImageAlt: 'Client',
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
									<TextControl
										label={ __(
											'Alt text',
											'twork-builder'
										) }
										value={ clientImageAlt || '' }
										onChange={ ( val ) =>
											setAttributes( {
												clientImageAlt: val,
											} )
										}
									/>
								</div>
							) }
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<StarsDisplay rating={ rating } />
				<RichText
					tagName="p"
					className="hc-review"
					value={ review }
					onChange={ ( val ) => setAttributes( { review: val } ) }
					placeholder={ __( 'Testimonial quote…', 'twork-builder' ) }
				/>

				<div className="hc-client">
					{ clientImageUrl ? (
						<img
							src={ clientImageUrl }
							alt={ clientImageAlt || 'Client' }
							className="hc-client-img"
						/>
					) : (
						<div
							className="hc-client-img-placeholder"
							style={ {
								width: 50,
								height: 50,
								borderRadius: '50%',
								background: '#eee',
								flexShrink: 0,
							} }
						/>
					) }
					<div>
						<RichText
							tagName="h5"
							value={ clientName }
							onChange={ ( val ) =>
								setAttributes( { clientName: val } )
							}
							placeholder={ __( 'Name', 'twork-builder' ) }
						/>

						<RichText
							tagName="span"
							value={ clientLocation }
							onChange={ ( val ) =>
								setAttributes( { clientLocation: val } )
							}
							placeholder={ __( 'Location', 'twork-builder' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
