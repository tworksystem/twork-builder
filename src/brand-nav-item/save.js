import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { label, url, hasDropdown } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-brand-header__nav-link twork-brand-nav-item',
	} );

	return (
		<a { ...blockProps } href={ url || '#' }>
			<RichText.Content tagName="span" value={ label } />
			{ hasDropdown && (
				<span className="icon-chevron" aria-hidden="true" />
			) }
		</a>
	);
}
