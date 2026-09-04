import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/about-staff-meal-gallery-item' ];
const TEMPLATE = [
	[
		'twork/about-staff-meal-gallery-item',
		{ imageRole: 'featured', showBadge: false },
	],
	[
		'twork/about-staff-meal-gallery-item',
		{
			imageRole: 'secondary',
			showBadge: true,
			badgeText: 'Meal',
		},
	],
	[
		'twork/about-staff-meal-gallery-item',
		{ imageRole: 'secondary', showBadge: false },
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps( () => ( {
		className: 'twork-about-staff-meal-gallery',
	} ) );

	return (
		<div { ...blockProps }>
			<p className="twork-about-staff-meal-gallery__label">
				{ __( 'Gallery', 'twork-builder' ) }
			</p>
			<p className="twork-about-staff-meal-gallery__hint">
				{ __(
					'Add more images with the + control below.',
					'twork-builder'
				) }
			</p>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
