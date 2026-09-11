import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const { showSection, sectionId, eyebrow, eyebrowIcon, heading, subtitle } =
		attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-procedures',
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
				<div className="lp-proc-grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
