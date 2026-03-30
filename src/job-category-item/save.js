import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		categoryTitle,
		categoryTitleColor,
		categoryTitleFontSize,
		categoryBorderColor,
		categoryMarginBottom,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'job-category',
		style: {
			marginBottom: `${ categoryMarginBottom }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			{ categoryTitle && (
				<RichText.Content
					tagName="h3"
					value={ categoryTitle }
					className="cat-title"
					style={ {
						fontSize: `${ categoryTitleFontSize }rem`,
						color: categoryTitleColor,
						marginBottom: '25px',
						borderLeft: `5px solid ${ categoryBorderColor }`,
						paddingLeft: '15px',
					} }
				/>
			) }
			<InnerBlocks.Content />
		</div>
	);
}
