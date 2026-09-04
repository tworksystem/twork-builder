import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		title,
		ctaLabel,
		ctaHref,
		imageUrl,
		imageAlt,
		timelineEyebrow,
		timelineTitle,
		valuesEyebrow,
		valuesTitle,
	} = attributes;

	const blockProps = useStableBlockProps( { className: 'about-story' } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Intro', 'twork-builder' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow || '' }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ title || '' }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
					<TextControl
						label={ __( 'CTA label', 'twork-builder' ) }
						value={ ctaLabel || '' }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
					/>
					<TextControl
						label={ __( 'CTA URL', 'twork-builder' ) }
						value={ ctaHref || '' }
						onChange={ ( v ) => setAttributes( { ctaHref: v } ) }
					/>
					<TextControl
						label={ __( 'Image URL', 'twork-builder' ) }
						value={ imageUrl || '' }
						onChange={ ( v ) => setAttributes( { imageUrl: v } ) }
					/>
					<TextControl
						label={ __( 'Image alt', 'twork-builder' ) }
						value={ imageAlt || '' }
						onChange={ ( v ) => setAttributes( { imageAlt: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Milestones', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ timelineEyebrow || '' }
						onChange={ ( v ) =>
							setAttributes( { timelineEyebrow: v } )
						}
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ timelineTitle || '' }
						onChange={ ( v ) =>
							setAttributes( { timelineTitle: v } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Values', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ valuesEyebrow || '' }
						onChange={ ( v ) =>
							setAttributes( { valuesEyebrow: v } )
						}
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ valuesTitle || '' }
						onChange={ ( v ) =>
							setAttributes( { valuesTitle: v } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-block="twork/about-story-section">
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
