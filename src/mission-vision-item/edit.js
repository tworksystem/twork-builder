import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { iconClass, title, description } = attributes;

	const blockProps = useBlockProps({
		className: 'twork-mv-item-editor'
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Card Content', 'twork-builder')}
					initialOpen={true}
				>
					<TextControl
						label={__('Icon Class (Font Awesome)', 'twork-builder')}
						help={__('Example: fas fa-bullseye, fas fa-eye, fas fa-heart', 'twork-builder')}
						value={iconClass}
						onChange={(val) => setAttributes({ iconClass: val })}
					/>

					<TextControl
						label={__('Title', 'twork-builder')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>

					<TextareaControl
						label={__('Description', 'twork-builder')}
						value={description}
						onChange={(val) => setAttributes({ description: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="mv-card">
				<div className="mv-icon">
					<i className={iconClass} aria-hidden="true" />
				</div>

				<RichText
					tagName="h3"
					className="mv-title"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder={__('Card title…', 'twork-builder')}
				/>

				<RichText
					tagName="p"
					className="mv-text"
					value={description}
					onChange={(val) => setAttributes({ description: val })}
					placeholder={__('Card description…', 'twork-builder')}
				/>
			</div>
		</div>
	);
}

