import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, alt, statValue, statLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-stats-card',
	} );

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					className="agrezer-stats-card__image"
					src={ image }
					alt={ alt || '' }
				/>
			) }
			<div className="agrezer-stats-card__meta">
				<RichText.Content
					tagName="p"
					className="agrezer-stats-card__value"
					value={ statValue }
				/>
				<RichText.Content
					tagName="p"
					className="agrezer-stats-card__label"
					value={ statLabel }
				/>
			</div>
		</article>
	);
}
