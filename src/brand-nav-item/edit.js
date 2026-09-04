import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { itemId, label, href } = attributes;
	const blockProps = useStableBlockProps( { className: 'header__nav-link' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Nav Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Item ID', 'twork-builder' ) }
						value={ itemId }
						onChange={ ( v ) => setAttributes( { itemId: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'twork-builder' ) }
						value={ href }
						onChange={ ( v ) => setAttributes( { href: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<a { ...blockProps } href={ href || '#' } data-item-id={ itemId }>
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
					placeholder={ __( 'Link label', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
			</a>
		</>
	);
}
