import { useBlockProps } from '@wordpress/block-editor';
import {
	pickPrep,
	CheckupPrepSavedBody,
} from '@twork-builder/shared/checkup-prep-panel';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-checkup-prep',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--prep-padding-top-mobile': `${ paddingTopMobile }px`,
			'--prep-padding-bottom-mobile': `${ paddingBottomMobile }px`,
			'--prep-container-padding-mobile': `${ containerPaddingMobile }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="prep-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<CheckupPrepSavedBody prep={ pickPrep( attributes ) } />
			</div>
		</section>
	);
}
