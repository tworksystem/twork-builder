import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Previous save markup for twork/agrezer-team-card (conditional rich text nodes).
 *
 * @param {Object} props            Props passed to the deprecated save.
 * @param {Object} props.attributes Block attributes.
 */
export default function saveDeprecated( { attributes } ) {
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
		className: 'agrezer-team-card',
	} );

	const actionInner = <span aria-hidden="true">↗</span>;

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					src={ image }
					alt={ imageAlt || '' }
					className="agrezer-team-card__img"
					loading="lazy"
					decoding="async"
				/>
			) }
			{ hasLink ? (
				<a
					href={ url }
					className="agrezer-team-card__action"
					aria-label={ actionAriaLabel || 'View profile' }
					{ ...( profileOpenInNewTab
						? { target: '_blank', rel: 'noopener noreferrer' }
						: {} ) }
				>
					{ actionInner }
				</a>
			) : (
				<span
					className="agrezer-team-card__action agrezer-team-card__action--static"
					aria-hidden="true"
				>
					{ actionInner }
				</span>
			) }
			<div className="agrezer-team-card__content">
				{ name && (
					<RichText.Content
						tagName="h3"
						className="agrezer-team-card__name"
						value={ name }
					/>
				) }
				{ role && (
					<RichText.Content
						tagName="p"
						className="agrezer-team-card__role"
						value={ role }
					/>
				) }
			</div>
		</article>
	);
}
