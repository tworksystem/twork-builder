import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { getFeatureIcon, ICON_OPTIONS } from './icons';

export default function Edit( { attributes, setAttributes } ) {
	const { itemId, number, title, text, icon } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'why-choose-us__item',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Item', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Item ID', 'twork-builder' ) }
						value={ itemId }
						onChange={ ( v ) => setAttributes( { itemId: v } ) }
					/>
					<TextControl
						label={ __( 'Number', 'twork-builder' ) }
						value={ number }
						onChange={ ( v ) => setAttributes( { number: v } ) }
					/>
					<SelectControl
						label={ __( 'Icon', 'twork-builder' ) }
						value={ icon || 'cube' }
						options={ ICON_OPTIONS }
						onChange={ ( v ) => setAttributes( { icon: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<article { ...blockProps } data-item-id={ itemId || 'why_1' }>
				{ number ? (
					<span className="why-choose-us__number" aria-hidden="true">
						{ number }
					</span>
				) : null }
				<div className="why-choose-us__icon" aria-hidden="true">
					{ getFeatureIcon( icon ) }
				</div>
				<RichText
					tagName="h3"
					className="why-choose-us__title"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Title', 'twork-builder' ) }
				/>
				<RichText
					tagName="p"
					className="why-choose-us__text"
					value={ text }
					onChange={ ( v ) => setAttributes( { text: v } ) }
					placeholder={ __( 'Text', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
