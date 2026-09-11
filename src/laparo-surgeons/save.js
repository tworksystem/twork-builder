import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		subtitle,
		note,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-surgeons',
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
				<div className="lp-sg-row" data-laparo-surgeons="">
					<InnerBlocks.Content />
				</div>
				<div className="lp-sg-drawer" data-laparo-drawer="" hidden>
					<div className="lp-sg-drawer-in" aria-live="polite" />
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
