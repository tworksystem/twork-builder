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
	const blockProps = useStableBlockProps( { className: 'faq__item' } );
	const { question } = attributes;
	const { answer } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Question', 'twork-builder' ) }
						value={ question }
						onChange={ ( v ) => setAttributes( { question: v } ) }
					/>
					<TextControl
						label={ __( 'Answer', 'twork-builder' ) }
						value={ answer }
						onChange={ ( v ) => setAttributes( { answer: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-item-id="{ itemId || 'faq_1' }">
				<RichText
					tagName="span"
					className="faq__question"
					value={ question }
					onChange={ ( v ) => setAttributes( { question: v } ) }
					placeholder={ __( 'Question', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					value={ answer }
					onChange={ ( v ) => setAttributes( { answer: v } ) }
					placeholder={ __( 'Answer', 'twork-builder' ) }
				/>
			</div>
		</>
	);
}
