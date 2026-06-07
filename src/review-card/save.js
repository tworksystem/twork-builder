import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, name, location, avatarUrl, avatarAlt } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'testimonials__card',
	} );

	return (
		<article { ...blockProps }>
			<span className="testimonials__quote" aria-hidden="true">
				"
			</span>
			{ text && (
				<RichText.Content
					tagName="blockquote"
					className="testimonials__text"
					value={ text }
				/>
			) }
			<footer className="testimonials__footer">
				{ avatarUrl && (
					<img
						className="testimonials__avatar"
						src={ avatarUrl }
						alt={ avatarAlt || name || '' }
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
					/>
				) }
				<div>
					{ name && (
						<RichText.Content
							tagName="cite"
							className="testimonials__name"
							value={ name }
						/>
					) }
					{ location && (
						<RichText.Content
							tagName="p"
							className="testimonials__location"
							value={ location }
						/>
					) }
				</div>
			</footer>
		</article>
	);
}
