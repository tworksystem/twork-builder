import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getFeatureIcon } from './icons';

export default function save( { attributes } ) {
	const { itemId, number, title, text, icon } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'why-choose-us__item',
		'data-item-id': itemId || undefined,
	} );

	return (
		<article { ...blockProps }>
			{ number ? (
				<span className="why-choose-us__number" aria-hidden="true">
					{ number }
				</span>
			) : null }
			<div className="why-choose-us__icon" aria-hidden="true">
				{ getFeatureIcon( icon ) }
			</div>
			<RichText.Content
				tagName="h3"
				className="why-choose-us__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="why-choose-us__text"
				value={ text }
			/>
		</article>
	);
}
