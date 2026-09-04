import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		title,
		intro,
		formTitle,
		submitLabel,
		lastUpdated,
		paragraphs,
	} = attributes;
	const blockProps = useStableBlockProps( { className: 'where-to-buy' } );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'twork-builder' ) }>
					{ eyebrow !== undefined && (
						<TextControl
							label={ __( 'Eyebrow', 'twork-builder' ) }
							value={ eyebrow || '' }
							onChange={ ( v ) =>
								setAttributes( { eyebrow: v } )
							}
						/>
					) }
					{ title !== undefined && (
						<TextControl
							label={ __( 'Title', 'twork-builder' ) }
							value={ title || '' }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					) }
					{ intro !== undefined && (
						<TextareaControl
							label={ __( 'Intro', 'twork-builder' ) }
							value={ intro || '' }
							onChange={ ( v ) => setAttributes( { intro: v } ) }
						/>
					) }
					{ formTitle !== undefined && (
						<TextControl
							label={ __( 'Form title', 'twork-builder' ) }
							value={ formTitle || '' }
							onChange={ ( v ) =>
								setAttributes( { formTitle: v } )
							}
						/>
					) }
					{ lastUpdated !== undefined && (
						<TextControl
							label={ __( 'Last updated', 'twork-builder' ) }
							value={ lastUpdated || '' }
							onChange={ ( v ) =>
								setAttributes( { lastUpdated: v } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } data-block="twork/where-to-buy-section">
				<div className="l-section">
					{ eyebrow && (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) }
					{ title && (
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					) }
					{ intro && <p>{ intro }</p> }
					{ formTitle && <h3>{ formTitle }</h3> }
					{ Array.isArray( paragraphs ) &&
						paragraphs.map( ( p, i ) => <p key={ i }>{ p }</p> ) }
					<p className="editor-hint">
						{ __(
							'Configure arrays via block attributes / patterns.',
							'twork-builder'
						) }
					</p>
				</div>
			</section>
		</>
	);
}
