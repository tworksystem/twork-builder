import { useBlockProps, RichText } from '@wordpress/block-editor';
import { INFO_ICONS } from './icons';

export default function save( { attributes } ) {
	const { label, lines, icon } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'footer__info-card',
	} );

	return (
		<div { ...blockProps }>
			<div className="footer__info-text">
				{ label && (
					<RichText.Content
						tagName="p"
						className="footer__info-label"
						value={ label }
					/>
				) }
				{ ( lines || [] ).length > 0 && (
					<div className="footer__info-lines">
						{ ( lines || [] ).map( ( line, index ) =>
							line ? <span key={ index }>{ line }</span> : null
						) }
					</div>
				) }
			</div>
			<span className="footer__info-icon" aria-hidden="true">
				{ INFO_ICONS[ icon ] || INFO_ICONS.phone }
			</span>
		</div>
	);
}
