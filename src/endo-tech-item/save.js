import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		stageIndex,
		hudLabel,
		showImage,
		imageUrl,
		imageAlt,
		showNumber,
		itemNumber,
		showTitle,
		title,
		showDescription,
		description,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'tech-item mk-endo-tech-item',
		'data-stage': stageIndex,
		'data-label': hudLabel || '',
		'data-image-url': showImage !== false && imageUrl ? imageUrl : '',
		'data-image-alt': imageAlt || '',
	} );

	return (
		<div { ...blockProps }>
			<div className="tech-item-head">
				{ showNumber !== false && itemNumber && (
					<span className="tech-num">{ itemNumber }</span>
				) }
				{ showTitle !== false && title && (
					<RichText.Content tagName="h3" value={ title } />
				) }
			</div>
			{ showDescription !== false && description && (
				<RichText.Content tagName="p" value={ description } />
			) }
		</div>
	);
}
