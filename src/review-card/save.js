import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, text, name, location, avatarUrl, avatarAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'testimonials__card',
		'data-item-id': itemId || undefined,
	} );

	return (
		<article { ...blockProps }>
			<span className="testimonials__quote" aria-hidden="true">
				"
			</span>
			<RichText.Content
				tagName="blockquote"
				className="testimonials__text"
				value={ text }
			/>
			<footer className="testimonials__footer">
				{ avatarUrl ? (
					<img
						className="testimonials__avatar"
						src={ avatarUrl }
						alt={ avatarAlt || name || '' }
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
					/>
				) : null }
				<div>
					{ name ? (
						<cite className="testimonials__name">{ name }</cite>
					) : null }
					{ location ? (
						<p className="testimonials__location">{ location }</p>
					) : null }
				</div>
			</footer>
		</article>
	);
}
