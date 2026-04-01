import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelColorSettings, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { name, role, accentColor } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-team-member',
			style: {
				'--twork-team-member-accent': accentColor || undefined,
			},
		} ),
		[ accentColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Team member', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Name', 'twork-builder' ) }
							value={ name || '' }
							onChange={ ( val ) => setAttributes( { name: val } ) }
						/>

						<TextControl
							label={ __( 'Role', 'twork-builder' ) }
							value={ role || '' }
							onChange={ ( val ) => setAttributes( { role: val } ) }
						/>

						<PanelColorSettings
							title={ __( 'Accent color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: accentColor,
									onChange: ( val ) =>
										setAttributes( { accentColor: val } ),
									label: __( 'Accent', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="p"
					className="twork-team-member__name"
					value={ name }
					onChange={ ( val ) => setAttributes( { name: val } ) }
					placeholder={ __( 'Name', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
				<RichText
					tagName="span"
					className="twork-team-member__role"
					value={ role }
					onChange={ ( val ) => setAttributes( { role: val } ) }
					placeholder={ __( 'Role', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}

