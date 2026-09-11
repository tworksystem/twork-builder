import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		intro,
		calloutTitle,
		calloutText,
		sourceNote,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-risks',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-risk-layout">
					<aside className="lp-risk-aside">
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
						{ intro && (
							<RichText.Content tagName="p" value={ intro } />
						) }
						{ ( calloutTitle || calloutText ) && (
							<div className="lp-risk-callout">
								{ calloutTitle && (
									<RichText.Content
										tagName="h3"
										value={ calloutTitle }
									/>
								) }
								{ calloutText && (
									<RichText.Content
										tagName="p"
										value={ calloutText }
									/>
								) }
							</div>
						) }
					</aside>
					<div className="lp-risk-table" role="table">
						<InnerBlocks.Content />
						{ sourceNote && (
							<RichText.Content
								tagName="p"
								className="lp-note lp-note--flag"
								value={ sourceNote }
							/>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
