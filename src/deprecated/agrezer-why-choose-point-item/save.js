import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { slot, badgeText, pointText } = attributes;
	const safeSlot = Math.min( 5, Math.max( 1, slot || 1 ) );

	const blockProps = useBlockProps.save( {
		className: `agrezer-why-choose__point agrezer-why-choose__point--${ safeSlot }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="agrezer-why-choose__point-icon">{ badgeText }</div>
			<RichText.Content
				tagName="p"
				className="agrezer-why-choose__point-text"
				value={ pointText }
			/>
		</div>
	);
}
