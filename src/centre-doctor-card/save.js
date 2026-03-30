import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		imageUrl,
		imageAlt,
		name,
		specialization,
		profileUrl,
		profileLinkText,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'doctor-card-mini stagger-doc',
	} );
	const alt = imageAlt || name || '';

	return (
		<div { ...blockProps }>
			<div className="doc-img-wrap">
				{ imageUrl ? (
					<img decoding="async" src={ imageUrl } alt={ alt } />
				) : (
					<div className="doc-img-placeholder" aria-hidden="true" />
				) }
			</div>
			<div className="doc-info">
				<h4>{ name }</h4>
				<span>{ specialization }</span>
				<br />
				<a href={ profileUrl || '#' } className="btn-outline-dark">
					{ profileLinkText || 'View Profile' }
				</a>
			</div>
		</div>
	);
}
