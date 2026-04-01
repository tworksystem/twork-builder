import { useBlockProps, RichText } from '@wordpress/block-editor';
import { AboutFeatureIcon } from './icons';

export default function save( { attributes } ) {
	const { title, description, iconVariant } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'agrezer-about-feature',
	} );

	return (
		<article { ...blockProps }>
			<AboutFeatureIcon variant={ iconVariant } />
			<RichText.Content
				tagName="h3"
				className="agrezer-about-feature__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="agrezer-about-feature__desc"
				value={ description }
			/>
		</article>
	);
}
