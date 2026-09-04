import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useStableBlockProps( {
		className: 'footer__info-card',
	} );
	const { label } = attributes;
	const { lines } = attributes;
	const { icon } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Label', 'twork-builder' ) }
						value={ label }
						onChange={ ( v ) => setAttributes( { label: v } ) }
					/>
					<TextControl
						label={ __(
							'Lines (comma-separated)',
							'twork-builder'
						) }
						value={ lines }
						onChange={ ( v ) => setAttributes( { lines: v } ) }
					/>
					<TextControl
						label={ __( 'Icon', 'twork-builder' ) }
						value={ icon }
						onChange={ ( v ) => setAttributes( { icon: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-item-id="{ itemId || 'info_phone' }">
				<p>Item</p>
			</div>
		</>
	);
}
