import { useBlockProps, RichText } from '@wordpress/block-editor';
import { FeatureIcon } from './icons';

export default function save( { attributes } ) {
	const { number, title, text, iconKey } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'why-choose-us__item',
	} );

	return (
		<article { ...blockProps }>
			{ number && (
				<span className="why-choose-us__number" aria-hidden="true">
					{ number }
				</span>
			) }
			<FeatureIcon iconKey={ iconKey } />
			{ title && (
				<RichText.Content
					tagName="h3"
					className="why-choose-us__title"
					value={ title }
				/>
			) }
			{ text && (
				<RichText.Content
					tagName="p"
					className="why-choose-us__text"
					value={ text }
				/>
			) }
		</article>
	);
}
