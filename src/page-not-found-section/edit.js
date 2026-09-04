import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { code, title, text, links } = attributes;
	const blockProps = useStableBlockProps( { className: 'page-not-found' } );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( '404', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Code', 'twork-builder' ) }
						value={ code }
						onChange={ ( v ) => setAttributes( { code: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="page-not-found__inner l-section">
					<p className="page-not-found__code">{ code }</p>
					<RichText
						tagName="h1"
						className="page-not-found__title"
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
					<RichText
						tagName="p"
						className="page-not-found__text"
						value={ text }
						onChange={ ( v ) => setAttributes( { text: v } ) }
					/>
					<div className="page-not-found__links">
						{ ( links || [] ).map( ( link ) => (
							<a
								key={ link.id }
								className="btn btn--outline"
								href={ link.href }
							>
								{ link.label }
							</a>
						) ) }
					</div>
				</div>
			</section>
		</>
	);
}
