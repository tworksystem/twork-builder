import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

function sectionStyle( attributes ) {
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
		colProcedure,
		colStay,
		colCost,
		emptyText,
		disclaimer,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-estimate',
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
				<div className="lp-est-table" role="table">
					<div className="lp-est-row lp-est-row--head" role="row">
						<span role="columnheader">{ colProcedure }</span>
						<span role="columnheader">{ colStay }</span>
						<span role="columnheader">{ colCost }</span>
						<span role="columnheader" />
					</div>
					<InnerBlocks.Content />
					<p className="lp-est-empty" data-laparo-empty="" hidden>
						{ emptyText }
					</p>
				</div>
				{ disclaimer && (
					<RichText.Content
						tagName="p"
						className="lp-note lp-note--flag"
						value={ disclaimer }
					/>
				) }
			</div>
		</section>
	);
}
