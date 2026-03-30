import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { sectionId, title, showSection } = attributes;

	const blockProps = useBlockProps.save( {
		className: [
			'content-section',
			'fade-up',
			showSection === false ? 'centre-specialists-section--hidden' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		id: sectionId || undefined,
	} );

	return (
		<section { ...blockProps }>
			<RichText.Content tagName="h2" value={ title } />
			<div className="specialists-doc-list">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
