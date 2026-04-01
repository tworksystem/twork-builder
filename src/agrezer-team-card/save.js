import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		image,
		imageAlt,
		name,
		role,
		profileUrl,
		profileOpenInNewTab,
		actionAriaLabel,
	} = attributes;

	const url = String( profileUrl || '' ).trim();
	const hasLink = url !== '';

	const blockProps = useBlockProps.save( {
		className: 'twork-team-card',
	} );

	const actionInner = <span aria-hidden="true">↗</span>;

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					src={ image }
					alt={ imageAlt || '' }
					className="twork-team-card__img"
					loading="lazy"
					decoding="async"
				/>
			) }
			{ hasLink ? (
				<a
					href={ url }
					className="twork-team-card__action"
					aria-label={ actionAriaLabel || 'View profile' }
					{ ...( profileOpenInNewTab
						? { target: '_blank', rel: 'noopener noreferrer' }
						: {} ) }
				>
					{ actionInner }
				</a>
			) : (
				<span
					className="twork-team-card__action twork-team-card__action--static"
					aria-hidden="true"
				>
					{ actionInner }
				</span>
			) }
			<div className="twork-team-card__content">
				{ name && (
					<RichText.Content
						tagName="h3"
						className="twork-team-card__name"
						value={ name }
					/>
				) }
				{ role && (
					<RichText.Content
						tagName="p"
						className="twork-team-card__role"
						value={ role }
					/>
				) }
			</div>
		</article>
	);
}
