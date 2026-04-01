import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, alt, maxWidth } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-process__center',
	} );

	return (
		<div { ...blockProps }>
			{ image && (
				<img
					src={ image }
					className="twork-process__img"
					alt={ alt || '' }
					style={ { maxWidth: `${ maxWidth }px` } }
				/>
			) }
		</div>
	);
}
