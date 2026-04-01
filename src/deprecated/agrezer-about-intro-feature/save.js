import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, imageAlt, label } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-about-intro__feature',
	} );

	return (
		<div { ...blockProps }>
			{ image && (
				<img
					src={ image }
					alt={ imageAlt || '' }
					className="agrezer-about-intro__feature-icon"
					loading="lazy"
					decoding="async"
				/>
			) }
			{ label && <RichText.Content tagName="span" value={ label } /> }
		</div>
	);
}
