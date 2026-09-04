import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title, subtitle, imageUrl } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'page-hero',
		'data-block': 'twork/brand-page-hero',
		'data-version': '1',
		style: imageUrl
			? { '--page-hero-bg': `url(${ imageUrl })` }
			: undefined,
	} );
	return (
		<section { ...blockProps } aria-label="Page hero">
			<div className="page-hero__inner l-section">
				<div className="page-hero__content">
					{ eyebrow && (
						<RichText.Content
							tagName="p"
							className="page-hero__eyebrow"
							value={ eyebrow }
						/>
					) }
					{ title && (
						<RichText.Content
							tagName="h1"
							className="page-hero__title"
							value={ title }
						/>
					) }
					{ subtitle && (
						<RichText.Content
							tagName="p"
							className="page-hero__subtitle"
							value={ subtitle }
						/>
					) }
				</div>
			</div>
		</section>
	);
}
