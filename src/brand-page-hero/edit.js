import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title, subtitle, imageUrl } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'page-hero',
		style: imageUrl ? { '--page-hero-bg': `url(${ imageUrl })` } : {},
	} );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Background', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Image URL', 'twork-builder' ) }
						value={ imageUrl }
						onChange={ ( v ) => setAttributes( { imageUrl: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } data-block="twork/brand-page-hero">
				<div className="page-hero__inner l-section">
					<div className="page-hero__content">
						<RichText
							tagName="p"
							className="page-hero__eyebrow"
							value={ eyebrow }
							onChange={ ( v ) =>
								setAttributes( { eyebrow: v } )
							}
						/>
						<RichText
							tagName="h1"
							className="page-hero__title"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
						<RichText
							tagName="p"
							className="page-hero__subtitle"
							value={ subtitle }
							onChange={ ( v ) =>
								setAttributes( { subtitle: v } )
							}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
