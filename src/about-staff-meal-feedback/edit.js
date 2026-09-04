import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/about-staff-meal-feedback-item' ];
const TEMPLATE = [];

export default function Edit() {
	const blockProps = useStableBlockProps( () => ( {
		className: 'twork-about-staff-meal-feedback',
	} ) );

	return (
		<div { ...blockProps }>
			<p className="twork-about-staff-meal-feedback__label">
				{ __( 'Feedback', 'twork-builder' ) }
			</p>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
