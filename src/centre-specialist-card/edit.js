import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

const PHOTO_TYPE_OPTIONS = [
	{ value: 'image', label: __( 'Image / GIF', 'twork-builder' ) },
	{ value: 'video', label: __( 'Video', 'twork-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'twork-builder' ),
	},
	{ value: 'fontawesome', label: __( 'Font Awesome', 'twork-builder' ) },
];

const DASHICON_OPTIONS = [
	{ value: 'dashicons-admin-users', label: __( 'Users', 'twork-builder' ) },
	{ value: 'dashicons-groups', label: __( 'Groups', 'twork-builder' ) },
	{ value: 'dashicons-heart', label: __( 'Heart', 'twork-builder' ) },
	{ value: 'dashicons-editor-help', label: __( 'Help', 'twork-builder' ) },
	{ value: 'dashicons-awards', label: __( 'Awards', 'twork-builder' ) },
];

function SpecialistPhotoRender( {
	photoType,
	imageUrl,
	videoUrl,
	faClass,
	dashicon,
	className = '',
} ) {
	const wrap = ( content ) => (
		<span
			className={ `centre-icon-wrap specialist-card-photo ${ className }`.trim() }
			aria-hidden="true"
		>
			{ content }
		</span>
	);

	if ( photoType === 'image' && imageUrl )
		return wrap(
			<img src={ imageUrl } alt="" className="centre-icon-img doc-img" />
		);
	if ( photoType === 'video' && videoUrl )
		return wrap(
			<video
				src={ videoUrl }
				className="centre-icon-video doc-img"
				muted
				loop
				playsInline
				autoPlay
				aria-hidden="true"
			/>
		);
	if ( photoType === 'dashicon' && dashicon )
		return wrap( <span className={ `dashicons ${ dashicon }` } /> );
	if ( photoType === 'fontawesome' && faClass )
		return wrap( <i className={ faClass } /> );
	return wrap( <div className="doc-img-placeholder" aria-hidden="true" /> );
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		photoType,
		photoImageUrl,
		photoImageId,
		photoVideoUrl,
		photoVideoId,
		photoIconClass,
		photoDashicon,
		name,
		specialization,
		qualifications,
		profileUrl,
		profileLinkText,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'doc-card twork-centre-specialist-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Photo / Icon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __(
								'Photo or icon type',
								'twork-builder'
							) }
							help={ __(
								'Image/GIF, video, or WordPress/FA icon.',
								'twork-builder'
							) }
						>
							<SelectControl
								label={ __( 'Type', 'twork-builder' ) }
								value={ photoType || 'image' }
								options={ PHOTO_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { photoType: v } )
								}
							/>

							{ ( photoType || 'image' ) === 'image' &&
								( ! photoImageUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												photoImageUrl: media.url,
												photoImageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Doctor photo (image/GIF)',
												'twork-builder'
											),
										} }
									/>
								) : (
									<div>
										<img
											src={ photoImageUrl }
											alt=""
											style={ {
												maxWidth: '100%',
												height: 'auto',
												marginBottom: 8,
												borderRadius: '50%',
												width: 80,
												height: 80,
												objectFit: 'cover',
											} }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													photoImageUrl: '',
													photoImageId: undefined,
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( photoType || 'image' ) === 'video' &&
								( ! photoVideoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												photoVideoUrl: media.url,
												photoVideoId: media.id,
											} )
										}
										allowedTypes={ [ 'video' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Photo (video)',
												'twork-builder'
											),
										} }
									/>
								) : (
									<div>
										<video
											src={ photoVideoUrl }
											style={ {
												maxWidth: '100%',
												marginBottom: 8,
												borderRadius: '50%',
												width: 80,
												height: 80,
												objectFit: 'cover',
											} }
											muted
											loop
											playsInline
											width={ 80 }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													photoVideoUrl: '',
													photoVideoId: undefined,
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( photoType || 'image' ) === 'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'twork-builder'
									) }
									value={ photoIconClass || 'fas fa-user-md' }
									onChange={ ( v ) =>
										setAttributes( {
											photoIconClass:
												v || 'fas fa-user-md',
										} )
									}
									help={ __(
										'e.g. fas fa-user-md',
										'twork-builder'
									) }
								/>
							) }
							{ ( photoType || 'image' ) === 'dashicon' && (
								<SelectControl
									label={ __(
										'WordPress Dashicon',
										'twork-builder'
									) }
									value={
										photoDashicon || 'dashicons-admin-users'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( { photoDashicon: v } )
									}
								/>
							) }
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __( 'Details', 'twork-builder' ) }>
						<TextControl
							label={ __( 'Name', 'twork-builder' ) }
							value={ name }
							onChange={ ( v ) => setAttributes( { name: v } ) }
						/>

						<TextControl
							label={ __( 'Specialization', 'twork-builder' ) }
							value={ specialization }
							onChange={ ( v ) =>
								setAttributes( { specialization: v } )
							}
						/>

						<TextControl
							label={ __( 'Qualifications', 'twork-builder' ) }
							value={ qualifications }
							onChange={ ( v ) =>
								setAttributes( { qualifications: v } )
							}
							multiline
						/>

						<TextControl
							label={ __( 'Profile URL', 'twork-builder' ) }
							value={ profileUrl }
							onChange={ ( v ) =>
								setAttributes( { profileUrl: v || '#' } )
							}
						/>

						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ profileLinkText }
							onChange={ ( v ) =>
								setAttributes( { profileLinkText: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<SpecialistPhotoRender
					photoType={ photoType || 'image' }
					imageUrl={ photoImageUrl }
					videoUrl={ photoVideoUrl }
					faClass={ photoIconClass }
					dashicon={ photoDashicon }
				/>

				<div className="doc-info">
					<h4>{ name }</h4>
					<span>{ specialization }</span>
					{ qualifications && <p>{ qualifications }</p> }
				</div>
				<a
					href={ profileUrl || '#' }
					className="doc-btn"
					onClick={ ( e ) => e.preventDefault() }
					role="presentation"
					aria-label={
						profileLinkText
							? undefined
							: __( 'View profile', 'twork-builder' )
					}
				>
					{ profileLinkText || __( 'View Profile', 'twork-builder' ) }
				</a>
			</div>
		</>
	);
}
