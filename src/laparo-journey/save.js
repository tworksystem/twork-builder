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
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-journey',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-jr-layout">
					<aside className="lp-jr-aside">
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
						<div className="lp-jr-counter" aria-hidden="true">
							<span data-laparo-step-now="">01</span>
							<small data-laparo-step-total="" />
						</div>
						{ subtitle && (
							<RichText.Content tagName="p" value={ subtitle } />
						) }
					</aside>
					<div className="lp-jr-steps" data-laparo-steps="">
						<span className="lp-jr-progress" aria-hidden="true" />
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
