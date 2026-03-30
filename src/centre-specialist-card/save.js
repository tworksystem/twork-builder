import { useBlockProps } from '@wordpress/block-editor';

function SpecialistPhotoOutput( {
	photoType,
	imageUrl,
	videoUrl,
	faClass,
	dashicon,
} ) {
	const wrap = ( content ) => (
		<span
			className="centre-icon-wrap specialist-card-photo"
			aria-hidden="true"
		>
			{ content }
		</span>
	);
	if ( photoType === 'image' && imageUrl )
		return wrap(
			<img
				src={ imageUrl }
				alt=""
				className="centre-icon-img doc-img"
				decoding="async"
			/>
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

export default function save( { attributes } ) {
	const {
		photoType,
		photoImageUrl,
		photoVideoUrl,
		photoIconClass,
		photoDashicon,
		name,
		specialization,
		qualifications,
		profileUrl,
		profileLinkText,
	} = attributes;
	const blockProps = useBlockProps.save( { className: 'doc-card' } );

	return (
		<div { ...blockProps }>
			<SpecialistPhotoOutput
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
			<a href={ profileUrl || '#' } className="doc-btn">
				{ profileLinkText || 'View Profile' }
			</a>
		</div>
	);
}
