import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { quoteIcon, reviewText, reviewerName, reviewerLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'jivaka-gm-review-card gm-anim-stagger',
	} );

	return (
		<div { ...blockProps }>
			<i
				className={ `${
					quoteIcon || 'fas fa-quote-left'
				} jivaka-gm-quote-icon` }
				aria-hidden
			/>
			<RichText.Content
				tagName="p"
				className="jivaka-gm-review-text"
				value={ reviewText }
			/>
			<div className="jivaka-gm-reviewer">
				<RichText.Content tagName="h5" value={ reviewerName } />
				<RichText.Content tagName="span" value={ reviewerLabel } />
			</div>
		</div>
	);
}
