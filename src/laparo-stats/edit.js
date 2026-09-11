import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	SectionPanel,
	sectionStyle,
} from '@twork-builder/shared/laparo-legacy-section';

const ALLOWED_BLOCKS = [ 'twork/laparo-stat' ];
const TEMPLATE = [
	[ 'twork/laparo-stat', {} ],
	[
		'twork/laparo-stat',
		{
			value: 24,
			suffix: 'h',
			label: 'Usual stay',
			sub: 'Day-case to one night',
		},
	],
	[
		'twork/laparo-stat',
		{
			value: 14,
			suffix: ' days',
			label: 'Back to desk work',
			sub: 'Guide only - case dependent',
		},
	],
	[
		'twork/laparo-stat',
		{
			value: 7,
			suffix: '/7',
			label: 'Emergency theatre',
			sub: 'Acute appendicitis cover',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { showSection, sectionId } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-stats',
			id: sectionId || undefined,
			style: sectionStyle( attributes ),
		} ),
		[
			sectionId,
			attributes.paddingTop,
			attributes.paddingBottom,
			attributes.containerMaxWidth,
		]
	);

	return showSection === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<SectionPanel
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-stats-band">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
