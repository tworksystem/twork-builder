import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, icon, title, caption, position } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-hero-card lp-hero-card--' + ( position || 'top-left' ),
	} );

	return (
		<div { ...blockProps }>
			{ icon && (
				<span className="lp-hero-card-icon">
					<i className={ icon } aria-hidden="true" />
				</span>
			) }
			<span>
				<RichText.Content tagName="strong" value={ title } />
				<RichText.Content tagName="span" value={ caption } />
			</span>
		</div>
	);
}
