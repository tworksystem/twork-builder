import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export function sectionStyle( attributes ) {
	const { paddingTop, paddingBottom, containerMaxWidth } = attributes;

	return {
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		'--lp-container': `${ containerMaxWidth }px`,
	};
}

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		subtitle,
		colMetric,
		colA,
		colB,
		note,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-compare',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-head lp-head--left">
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
					{ subtitle && (
						<RichText.Content tagName="p" value={ subtitle } />
					) }
				</div>
				<div className="lp-cmp-table" role="table">
					<div className="lp-cmp-row lp-cmp-row--head" role="row">
						<span className="lp-cmp-key" role="columnheader">
							{ colMetric }
						</span>
						<span className="lp-cmp-a" role="columnheader">
							{ colA }
						</span>
						<span role="columnheader">{ colB }</span>
					</div>
					<InnerBlocks.Content />
				</div>
				{ note && (
					<RichText.Content
						tagName="p"
						className="lp-note lp-note--flag"
						value={ note }
					/>
				) }
			</div>
		</section>
	);
}
