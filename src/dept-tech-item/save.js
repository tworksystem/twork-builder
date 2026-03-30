import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { imageUrl, caption } = attributes;
	const blockProps = useBlockProps.save( { className: 'tech-item' } );

	return (
		<div { ...blockProps }>
			{ imageUrl ? (
				<img decoding="async" src={ imageUrl } alt={ caption || '' } />
			) : (
				<div className="tech-placeholder" aria-hidden="true" />
			) }
			<div className="tech-caption">{ caption }</div>
		</div>
	);
}
