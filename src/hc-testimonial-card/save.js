import { useBlockProps, RichText } from '@wordpress/block-editor';

function StarsOutput( { rating } ) {
	const full = Math.floor( rating );
	const half = rating % 1 >= 0.5;
	const stars = [];
	for ( let i = 0; i < full; i++ )
		stars.push(
			<i key={ i } className="fas fa-star" aria-hidden="true" />
		);
	if ( half )
		stars.push(
			<i key="half" className="fas fa-star-half-alt" aria-hidden="true" />
		);
	return <div className="hc-stars">{ stars }</div>;
}

export default function save( { attributes } ) {
	const {
		starRating,
		review,
		clientImageUrl,
		clientImageAlt,
		clientName,
		clientLocation,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hc-testi-card stagger-up',
	} );

	const rating = Math.min( 5, Math.max( 0, Number( starRating ) || 5 ) );

	return (
		<div { ...blockProps }>
			<StarsOutput rating={ rating } />
			{ review && (
				<RichText.Content
					tagName="p"
					className="hc-review"
					value={ review }
				/>
			) }
			<div className="hc-client">
				{ clientImageUrl && (
					<img
						src={ clientImageUrl }
						alt={ clientImageAlt || 'Client' }
						className="hc-client-img"
					/>
				) }
				<div>
					{ clientName && (
						<RichText.Content tagName="h5" value={ clientName } />
					) }
					{ clientLocation && (
						<RichText.Content
							tagName="span"
							value={ clientLocation }
						/>
					) }
				</div>
			</div>
		</div>
	);
}
