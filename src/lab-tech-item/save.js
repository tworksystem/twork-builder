import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		imageUrl,
		imageAlt,
		tag,
		title,
		description,
		bullets = [],
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'lab-tech-row fade-up',
	} );

	return (
		<div { ...blockProps }>
			<div className="lab-tech-image-col">
				{ imageUrl ? (
					<img
						src={ imageUrl }
						alt={ imageAlt || title || '' }
						className="lab-tech-img"
						decoding="async"
					/>
				) : (
					<div
						className="lab-tech-img lab-tech-img-placeholder"
						aria-hidden="true"
					/>
				) }
			</div>

			<div className="lab-tech-content">
				{ tag && <span className="lab-tech-tag">{ tag }</span> }

				{ title && (
					<RichText.Content
						tagName="h3"
						value={ title }
						className="lab-tech-title"
					/>
				) }

				{ description && (
					<RichText.Content
						tagName="p"
						value={ description }
						className="lab-tech-description"
					/>
				) }

				{ bullets && bullets.length > 0 && (
					<ul className="lab-check-list">
						{ bullets.map( ( item, index ) =>
							item ? (
								<li key={ index }>
									<i
										className="fas fa-check"
										aria-hidden="true"
									/>
									<span>{ item }</span>
								</li>
							) : null
						) }
					</ul>
				) }
			</div>
		</div>
	);
}
