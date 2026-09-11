import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		autoplaySeconds,
		prevLabel,
		nextLabel,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-voices',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
		'data-autoplay': String( autoplaySeconds || 0 ),
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-head">
					{ eyebrow && (
						<span className="lp-eyebrow">
							{ eyebrowIcon && (
								<i
									className={ eyebrowIcon }
									aria-hidden="true"
								/>
							) }
							{ eyebrow }
						</span>
					) }
					{ heading && (
						<RichText.Content tagName="h2" value={ heading } />
					) }
				</div>
				<div className="lp-vc-stage" data-laparo-voices="">
					<InnerBlocks.Content />
				</div>
				<div className="lp-vc-controls">
					<button
						type="button"
						className="lp-vc-btn"
						data-laparo-prev=""
						aria-label={ prevLabel }
					>
						<i className="fas fa-arrow-left" aria-hidden="true" />
					</button>
					<div className="lp-vc-dots" data-laparo-dots="" />
					<button
						type="button"
						className="lp-vc-btn"
						data-laparo-next=""
						aria-label={ nextLabel }
					>
						<i className="fas fa-arrow-right" aria-hidden="true" />
					</button>
				</div>
			</div>
		</section>
	);
}
