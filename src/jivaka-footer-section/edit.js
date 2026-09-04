import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import FooterMarkup from './footer-markup';
import FooterInspectorControls from './footer-inspector-controls';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'jivaka-footer-section-block mk-jivaka-footer-editor wp-block-twork-jivaka-footer-section',
			style: {
				'--jf-container-max-width':
					attributes.containerMaxWidth != null
						? `${ attributes.containerMaxWidth }px`
						: undefined,
				'--jf-primary': attributes.primaryColor || '#f6892e',
			},
		} ),
		[ attributes.containerMaxWidth, attributes.primaryColor ]
	);

	return (
		<>
			<InspectorControls>
				<FooterInspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<FooterMarkup
					{ ...attributes }
					isEditor
					setAttributes={ setAttributes }
				/>
			</div>
		</>
	);
}
