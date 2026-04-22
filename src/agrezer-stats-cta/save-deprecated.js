import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function saveDeprecated( { attributes } ) {
	const { buttonText, buttonUrl } = attributes;
	const blockProps = useBlockProps.save( { className: 'twork-stats__btn-wrap' } );

	return (
		<div { ...blockProps }>
			<a href={ buttonUrl || '#' } className="twork-stats__btn">
				<RichText.Content tagName="span" value={ buttonText } />
				<span aria-hidden="true">↗</span>
			</a>
		</div>
	);
}
