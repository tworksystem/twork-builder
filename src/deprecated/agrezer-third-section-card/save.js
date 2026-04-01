import { useBlockProps, RichText } from '@wordpress/block-editor';

const ALLOWED_ALIGN = [ 'left', 'center', 'right' ];

export default function save( { attributes } ) {
	const { image, imageAlt, stat, label, cardAlign } = attributes;
	const align = ALLOWED_ALIGN.includes( cardAlign ) ? cardAlign : 'left';

	const blockProps = useBlockProps.save( {
		className: `agrezer-third-section__card agrezer-third-section__card--${ align }`,
	} );

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					src={ image }
					alt={ imageAlt || '' }
					className="agrezer-third-section__card-img"
					loading="lazy"
					decoding="async"
				/>
			) }
			<div className="agrezer-third-section__card-content">
				{ stat && (
					<RichText.Content
						tagName="h3"
						className="agrezer-third-section__stat"
						value={ stat }
					/>
				) }
				{ label && (
					<RichText.Content
						tagName="p"
						className="agrezer-third-section__label"
						value={ label }
					/>
				) }
			</div>
		</article>
	);
}
