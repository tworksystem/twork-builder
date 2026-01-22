import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { iconClass, title, description } = attributes;

	const blockProps = useBlockProps.save({
		className: 'twork-mv-item'
	});

	return (
		<div {...blockProps}>
			<div className="mv-card">
				<div className="mv-icon">
					<i className={iconClass} aria-hidden="true" />
				</div>

				<RichText.Content
					tagName="h3"
					className="mv-title"
					value={title}
				/>

				<RichText.Content
					tagName="p"
					className="mv-text"
					value={description}
				/>
			</div>
		</div>
	);
}

