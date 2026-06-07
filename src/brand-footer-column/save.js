import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, links } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'footer__column',
	} );

	return (
		<div { ...blockProps }>
			{ title && (
				<RichText.Content
					tagName="h3"
					className="footer__column-title"
					value={ title }
				/>
			) }
			{ ( links || [] ).length > 0 && (
				<nav className="footer__links">
					{ ( links || [] ).map( ( link ) =>
						link.label ? (
							<a
								key={ link.id || link.label }
								className="footer__link"
								href={ link.href || '#' }
								data-item-id={ link.id || undefined }
							>
								{ link.label }
							</a>
						) : null
					) }
				</nav>
			) }
		</div>
	);
}
