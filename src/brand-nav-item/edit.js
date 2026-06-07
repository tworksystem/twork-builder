import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { label, url, hasDropdown } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-brand-header__nav-link twork-brand-nav-item',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Nav Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl label={ __( 'Link URL', 'twork-builder' ) }>
							<URLInput
								value={ url }
								onChange={ ( val ) => setAttributes( { url: val } ) }
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Show Dropdown Chevron', 'twork-builder' ) }
							checked={ hasDropdown }
							onChange={ ( val ) =>
								setAttributes( { hasDropdown: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<a
				{ ...blockProps }
				href={ url || '#' }
				onClick={ ( e ) => e.preventDefault() }
			>
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( val ) => setAttributes( { label: val } ) }
					placeholder={ __( 'Menu Item', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
				{ hasDropdown && (
					<span className="icon-chevron" aria-hidden="true" />
				) }
			</a>
		</>
	);
}
