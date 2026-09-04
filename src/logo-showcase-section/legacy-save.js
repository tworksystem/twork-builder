import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (no __top / __inner).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'partners',
		'data-block': 'twork/logo-showcase-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps }>
			<div className="l-section">
				{ eyebrow && (
					<header className="section-head">
						<p className="section-head__eyebrow">{ eyebrow }</p>
						{ title && (
							<h2 className="section-head__title">{ title }</h2>
						) }
					</header>
				) }
				{ ! eyebrow && title && (
					<header className="section-head">
						<h2 className="section-head__title">{ title }</h2>
					</header>
				) }
				<div className="partners__logos" data-list="items">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
