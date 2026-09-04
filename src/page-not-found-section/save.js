import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { code, title, text, links } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'page-not-found',
		'data-block': 'twork/page-not-found-section',
		'data-version': '1',
	} );
	return (
		<section { ...blockProps } aria-label="Page not found">
			<div className="page-not-found__inner l-section">
				<p className="page-not-found__code">{ code }</p>
				<RichText.Content
					tagName="h1"
					className="page-not-found__title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="page-not-found__text"
					value={ text }
				/>
				<div className="page-not-found__links" data-list="links">
					{ ( links || [] ).map( ( link ) => (
						<a
							key={ link.id }
							className="btn btn--outline"
							href={ link.href || '#' }
							data-item-id={ link.id }
						>
							{ link.label }
						</a>
					) ) }
				</div>
			</div>
		</section>
	);
}
