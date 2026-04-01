import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { slot, badgeText, pointText } = attributes;
	const safeSlot = Math.min( 5, Math.max( 1, slot || 1 ) );

	const blockProps = useBlockProps.save( {
		className: `twork-why-choose__point twork-why-choose__point--${ safeSlot }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="twork-why-choose__point-icon">{ badgeText }</div>
			<RichText.Content
				tagName="p"
				className="twork-why-choose__point-text"
				value={ pointText }
			/>
		</div>
	);
}
