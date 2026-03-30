import { useBlockProps } from '@wordpress/block-editor';

function TechItemMediaOutput( {
	mediaType,
	imageUrl,
	imageAlt,
	videoUrl,
	iconClass,
	dashicon,
	caption,
} ) {
	const captionEl = caption ? (
		<div className="tech-caption">{ caption }</div>
	) : null;
	if ( mediaType === 'image' && imageUrl ) {
		return (
			<>
				<img
					src={ imageUrl }
					alt={ imageAlt || caption || '' }
					className="tech-item-media"
					decoding="async"
				/>
				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'video' && videoUrl ) {
		return (
			<>
				<video
					src={ videoUrl }
					className="tech-item-media"
					muted
					loop
					playsInline
					autoPlay
					aria-hidden="true"
				/>
				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'dashicon' && dashicon ) {
		return (
			<>
				<span
					className={ `tech-item-icon dashicons ${ dashicon }` }
					aria-hidden="true"
				/>
				{ captionEl }
			</>
		);
	}
	if ( mediaType === 'fontawesome' && iconClass ) {
		return (
			<>
				<i
					className={ `tech-item-icon ${ iconClass }` }
					aria-hidden="true"
				/>
				{ captionEl }
			</>
		);
	}
	return (
		<>
			<div className="tech-item-placeholder" aria-hidden="true" />
			{ captionEl }
		</>
	);
}

export default function save( { attributes } ) {
	const {
		mediaType,
		imageUrl,
		imageAlt,
		videoUrl,
		iconClass,
		dashicon,
		caption,
	} = attributes;
	const blockProps = useBlockProps.save( { className: 'tech-item' } );

	return (
		<div { ...blockProps }>
			<TechItemMediaOutput
				mediaType={ mediaType || 'image' }
				imageUrl={ imageUrl }
				imageAlt={ imageAlt }
				videoUrl={ videoUrl }
				iconClass={ iconClass }
				dashicon={ dashicon }
				caption={ caption }
			/>
		</div>
	);
}
