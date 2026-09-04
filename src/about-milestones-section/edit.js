import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const { timelineEyebrow, timelineTitle } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'about-milestones about-story',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'About Milestones Section', 'twork-builder' ) }
					initialOpen={ true }
				>
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
			</InspectorControls>
			<div { ...blockProps } data-block="twork/about-milestones-section">
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
