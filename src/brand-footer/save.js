import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function renderSocialLink( item ) {
	const href = ( item.href || '' ).trim();
	const label = item.label || '';
	const initial = ( item.label || '?' ).charAt( 0 );

	if ( ! href || href === '#' ) {
		return (
			<span
				key={ item.id || label }
				className="footer__social-link footer__social-link--disabled"
				aria-label={ `${ label } (coming soon)` }
				title="Coming soon"
			>
				{ initial }
			</span>
		);
	}

	return (
		<a
			key={ item.id || label }
			className="footer__social-link"
			href={ href }
			aria-label={ label }
			rel="noopener noreferrer"
			target="_blank"
		>
			{ initial }
		</a>
	);
}

export default function save( { attributes } ) {
	const {
		brandPrefix,
		brandSuffix,
		description,
		copyright,
		pastureImageUrl,
		pastureImageAlt,
		social,
		showBackToTop,
		backgroundColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-brand-footer footer',
		style: {
			backgroundColor: backgroundColor || '#f7fcff',
		},
		'data-block': 'footer',
		'data-show-back-to-top':
			showBackToTop !== false ? 'true' : 'false',
	} );

	return (
		<footer { ...blockProps }>
			<div className="footer__top l-section">
				<div
					className="footer__info-grid"
					data-list="infoCards"
				/>
			</div>
			<div className="footer__main l-section">
				<div className="footer__brand-col">
					<a className="footer__brand" href="/">
						<span>{ brandPrefix }</span>
						<span className="footer__brand-suffix">
							{ brandSuffix }
						</span>
					</a>
					{ description && (
						<RichText.Content
							tagName="p"
							className="footer__desc"
							value={ description }
						/>
					) }
					{ ( social || [] ).length > 0 && (
						<div className="footer__social">
							{ ( social || [] ).map( renderSocialLink ) }
						</div>
					) }
				</div>
				<div
					className="footer__columns"
					data-list="columns"
				/>
			</div>
			<div className="footer__bottom l-section">
				{ copyright && (
					<RichText.Content
						tagName="p"
						className="footer__copyright"
						value={ copyright }
					/>
				) }
			</div>
			{ pastureImageUrl && (
				<div className="footer__pasture">
					<img
						src={ pastureImageUrl }
						alt={ pastureImageAlt || '' }
						width="1600"
						height="400"
						loading="lazy"
						decoding="async"
					/>
				</div>
			) }
			<div className="brand-footer__blocks" data-list="items">
				<InnerBlocks.Content />
			</div>
		</footer>
	);
}
