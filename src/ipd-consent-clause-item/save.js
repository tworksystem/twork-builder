import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { clauseNumber, clauseTitle, clauseParagraphs, clauseItems, showClause } =
		attributes;

	if ( showClause === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'ipd-consent-clause',
	} );

	const paragraphs = Array.isArray( clauseParagraphs ) ? clauseParagraphs : [];
	const items = Array.isArray( clauseItems ) ? clauseItems : [];

	return (
		<article { ...blockProps }>
			<header className="ipd-consent-clause__header">
				<span className="ipd-consent-clause__number">
					{ clauseNumber }
				</span>
				<RichText.Content
					tagName="h3"
					className="ipd-consent-clause__title"
					value={ clauseTitle }
				/>
			</header>

			{ paragraphs.length > 0 && (
				<div className="ipd-consent-clause__paragraphs">
					{ paragraphs.map( ( paragraph, index ) => (
						<RichText.Content
							key={ `p-${ index }` }
							tagName="p"
							className="ipd-consent-clause__paragraph"
							value={ paragraph }
						/>
					) ) }
				</div>
			) }

			{ items.length > 0 && (
				<ol className="ipd-consent-clause__items">
					{ items.map( ( item ) => (
						<li
							key={ item.id || item.number }
							className="ipd-consent-clause__item"
						>
							{ item.number && (
								<span className="ipd-consent-clause__item-number">
									{ item.number }
								</span>
							) }
							<RichText.Content
								tagName="span"
								className="ipd-consent-clause__item-text"
								value={ item.text }
							/>
						</li>
					) ) }
				</ol>
			) }
		</article>
	);
}
