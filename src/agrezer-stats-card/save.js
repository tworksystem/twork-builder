import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, alt, statValue, statLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-stats-card',
	} );

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					className="twork-stats-card__image"
					src={ image }
					alt={ alt || '' }
				/>
			) }
			<div className="twork-stats-card__meta">
				<RichText.Content
					tagName="p"
					className="twork-stats-card__value"
					value={ statValue }
				/>
				<RichText.Content
					tagName="p"
					className="twork-stats-card__label"
					value={ statLabel }
				/>
			</div>
		</article>
	);
}
