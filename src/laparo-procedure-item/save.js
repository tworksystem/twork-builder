import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function save( { attributes } ) {
	const {
		showItem,
		cardLayout,
		showIcon,
		iconBgColor,
		iconColor,
		showTitle,
		title,
		showDescription,
		description,
		showChips,
		chips,
		showLink,
		linkText,
		linkUrl,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const wideClass = cardLayout === 'wide' ? 'p-card--wide' : '';
	const blockProps = useBlockProps.save( {
		className: `p-card tilt mk-laparo-procedure-item ${ wideClass }`,
	} );

	const visibleChips = ( chips || [] ).filter(
		( chip ) => chip.showChip !== false && chip.text
	);

	return (
		<article { ...blockProps }>
			{ showIcon !== false &&
				hasIconValue( mapIconAttrs( attributes ) ) && (
					<div
						className="p-icon"
						style={ {
							background: iconBgColor,
							color: iconColor,
						} }
					>
						<EndoFlexibleIcon attributes={ attributes } />
					</div>
				) }
			{ showTitle !== false && title && (
				<RichText.Content tagName="h3" value={ title } />
			) }
			{ showDescription !== false && description && (
				<RichText.Content tagName="p" value={ description } />
			) }
			{ showChips !== false && visibleChips.length > 0 && (
				<div className="p-meta">
					{ visibleChips.map( ( chip, index ) => (
						<span key={ `chip-${ index }` } className="chip">
							{ hasIconValue( mapIconAttrs( chip ) ) && (
								<EndoFlexibleIcon attributes={ chip } />
							) }
							{ chip.text }
						</span>
					) ) }
				</div>
			) }
			{ showLink !== false && linkText && (
				<a href={ linkUrl || '#' } className="p-link">
					{ linkText }
					<i className="fas fa-arrow-right" aria-hidden="true" />
				</a>
			) }
		</article>
	);
}
