import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { sectionStyle } from '@twork-builder/shared/laparo-legacy-section';

export default function save( { attributes } ) {
	const { showSection, sectionId } = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-stats',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-stats-band">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
