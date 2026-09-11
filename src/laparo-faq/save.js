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
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-faq',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
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
					{ subtitle && (
						<RichText.Content tagName="p" value={ subtitle } />
					) }
				</div>
				<div className="lp-faq-grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
