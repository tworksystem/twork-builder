import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		name,
		role,
		bio,
		tags,
		fig1,
		fig1Label,
		fig2,
		fig2Label,
		fig3,
		fig3Label,
		moreLabel,
		imageUrl,
		imageAlt,
		conditions,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-sg-card',
		'data-conditions': conditions || '',
	} );

	return (
		<div { ...blockProps }>
			<button type="button" className="lp-sg-open" aria-expanded="false">
				{ imageUrl && (
					<span className="lp-sg-photo">
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							loading="lazy"
							decoding="async"
						/>
					</span>
				) }
				<span className="lp-sg-body">
					<RichText.Content
						tagName="strong"
						className="lp-sg-name"
						value={ name }
					/>
					<RichText.Content
						tagName="span"
						className="lp-sg-role"
						value={ role }
					/>
					<span className="lp-sg-more">
						{ moreLabel }
						<i className="fas fa-chevron-down" aria-hidden="true" />
					</span>
				</span>
			</button>
			<div className="lp-sg-detail" hidden>
				<div className="lp-sg-detail-main">
					<h3>{ name }</h3>
					<RichText.Content tagName="p" value={ bio } />
					{ tags && (
						<div className="lp-sg-tags">
							{ tags
								.split( ',' )
								.map( ( tag ) => tag.trim() )
								.filter( Boolean )
								.map( ( tag ) => (
									<span key={ tag }>{ tag }</span>
								) ) }
						</div>
					) }
				</div>
				<div className="lp-sg-figs">
					<div>
						<span className="lp-figure">{ fig1 }</span>
						<span>{ fig1Label }</span>
					</div>
					<div>
						<span className="lp-figure">{ fig2 }</span>
						<span>{ fig2Label }</span>
					</div>
					<div>
						<span className="lp-figure">{ fig3 }</span>
						<span>{ fig3Label }</span>
					</div>
				</div>
			</div>
		</div>
	);
}
