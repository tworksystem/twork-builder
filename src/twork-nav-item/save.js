import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		label,
		url,
		openInNewTab,
		hasDropdown,
		linkColor,
		linkHoverColor,
		fontSize,
		fontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-nav-item',
		style: {
			'--twork-nav-item-color': linkColor || undefined,
			'--twork-nav-item-hover': linkHoverColor || undefined,
			'--twork-nav-item-size': `${ fontSize }px`,
			'--twork-nav-item-weight': fontWeight,
		},
	} );

	return (
		<div { ...blockProps }>
			<a
				href={ url || '#' }
				className="twork-nav-item__link"
				target={ openInNewTab ? '_blank' : undefined }
				rel={ openInNewTab ? 'noopener noreferrer' : undefined }
			>
				<RichText.Content tagName="span" value={ label } />
				{ hasDropdown && (
					<span className="twork-nav-item__chevron" aria-hidden="true">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.25"
							strokeLinecap="round"
							strokeLinejoin="round"
							focusable="false"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				) }
			</a>
		</div>
	);
}
