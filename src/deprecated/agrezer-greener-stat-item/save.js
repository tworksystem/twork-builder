import { useBlockProps, RichText } from '@wordpress/block-editor';
import { GreenerStatIcon } from './icons';

export default function save( { attributes } ) {
	const { iconVariant, title, description } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'agrezer-greener-stat',
	} );

	return (
		<article { ...blockProps }>
			<GreenerStatIcon variant={ iconVariant } />
			<RichText.Content
				tagName="h3"
				className="agrezer-greener-stat__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="agrezer-greener-stat__text"
				value={ description }
			/>
		</article>
	);
}
