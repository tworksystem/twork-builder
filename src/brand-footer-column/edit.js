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
	const blockProps = useStableBlockProps( { className: 'footer__column' } );
	const { columnTitle } = attributes;
	const { linksJson } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Column Title', 'twork-builder' ) }
						value={ columnTitle }
						onChange={ ( v ) =>
							setAttributes( { columnTitle: v } )
						}
					/>
					<TextControl
						label={ __( 'Links JSON', 'twork-builder' ) }
						value={ linksJson }
						onChange={ ( v ) => setAttributes( { linksJson: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-item-id="{ itemId || 'col_help' }">
				<RichText
					tagName="h4"
					value={ columnTitle }
					onChange={ ( v ) => setAttributes( { columnTitle: v } ) }
					placeholder={ __( 'Column Title', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
