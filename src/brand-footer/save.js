import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		brandPrefix,
		brandSuffix,
		description,
		copyright,
		pastureImageUrl,
		pastureImageAlt,
		infoCards,
		columns,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'footer',
		id: 'footer',
		'data-block': 'twork/brand-footer',
		'data-version': '1',
	} );

	return (
		<footer { ...blockProps }>
			<div className="l-section">
				<div className="footer__info-grid" data-list="infoCards">
					{ ( infoCards || [] ).map( ( card ) => (
						<div
							key={ card.id }
							className="footer__info-card"
							data-item-id={ card.id }
						>
							<div>
								<p className="footer__info-label">
									{ card.label }
								</p>
								<div className="footer__info-lines">
									{ ( card.lines || [] ).map( ( line, i ) => (
										<span key={ i }>{ line }</span>
									) ) }
								</div>
							</div>
						</div>
					) ) }
				</div>
				<div className="footer__main">
					<div className="footer__about">
						<p className="footer__brand">
							{ brandPrefix }{ ' ' }
							<span className="footer__brand-suffix">
								{ brandSuffix }
							</span>
						</p>
						<RichText.Content
							tagName="p"
							className="footer__desc"
							value={ description }
						/>
					</div>
					<div className="footer__columns" data-list="columns">
						{ ( columns || [] ).map( ( col ) => (
							<div
								key={ col.id }
								className="footer__column"
								data-item-id={ col.id }
							>
								<h4 className="footer__column-title">
									{ col.title }
								</h4>
								<ul className="footer__links">
									{ ( col.links || [] ).map( ( link ) => (
										<li
											key={ link.id }
											data-item-id={ link.id }
										>
											<a href={ link.href || '#' }>
												{ link.label }
											</a>
										</li>
									) ) }
								</ul>
							</div>
						) ) }
					</div>
				</div>
				<RichText.Content
					tagName="p"
					className="footer__copyright"
					value={ copyright }
				/>
			</div>
			{ pastureImageUrl && (
				<div className="footer__pasture">
					<img
						src={ pastureImageUrl }
						alt={ pastureImageAlt || '' }
						loading="lazy"
						decoding="async"
					/>
				</div>
			) }
		</footer>
	);
}
