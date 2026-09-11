import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-technology',
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
				<div className="lp-tech-grid">
					<div className="lp-tech-sticky">
						<div className="lp-tech-stage" data-laparo-stage="">
							<span
								className="lp-tech-grid-lines"
								aria-hidden="true"
							/>
							<div className="lp-tech-hud">
								<span data-laparo-hud-label="" />
								<span data-laparo-hud-index="" />
							</div>
						</div>
					</div>
					<div className="lp-tech-list">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
