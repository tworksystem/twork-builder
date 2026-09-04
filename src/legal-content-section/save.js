import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { lastUpdated, sections } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'legal-content',
		'data-block': 'twork/legal-content-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Legal content">
			<div className="legal-content__inner l-section">
				{ lastUpdated && (
					<p className="legal-content__updated">
						Last updated: { lastUpdated }
					</p>
				) }
				<div className="legal-content__sections" data-list="sections">
					{ ( sections || [] ).map( ( section, index ) => (
						<div
							key={ section.id }
							className="legal-content__section"
							data-accordion-item
							data-item-id={ section.id }
							data-open={ section.open ? 'true' : undefined }
						>
							<button
								type="button"
								className="legal-content__trigger"
								data-action="accordion-toggle"
								aria-expanded={
									section.open ? 'true' : 'false'
								}
							>
								<span>{ section.title }</span>
								<span
									className="legal-content__icon"
									aria-hidden="true"
								/>
							</button>
							<div
								className="legal-content__panel"
								data-accordion-panel
								id={ `legal-panel-${ index }` }
								hidden={ section.open ? undefined : true }
							>
								{ ( section.paragraphs || [] ).map(
									( p, i ) => (
										<p key={ i }>{ p }</p>
									)
								) }
								{ section.list && (
									<ul>
										{ section.list.map( ( li, i ) => (
											<li key={ i }>{ li }</li>
										) ) }
									</ul>
								) }
							</div>
						</div>
					) ) }
				</div>
			</div>
		</section>
	);
}
