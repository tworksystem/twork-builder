import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function save( { attributes } ) {
	const {
		showItem,
		positionSlot,
		showIcon,
		iconBgColor,
		iconColor,
		showTitle,
		title,
		showSubtitle,
		subtitle,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: `float-card ${
			positionSlot || 'fc-1'
		} mk-endo-hero-float-card`,
	} );

	return (
		<div { ...blockProps }>
			{ showIcon !== false &&
				hasIconValue( mapIconAttrs( attributes ) ) && (
					<div
						className="fc-icon"
						style={ {
							background: iconBgColor,
							color: iconColor,
						} }
					>
						<EndoFlexibleIcon attributes={ attributes } />
					</div>
				) }
			<div>
				{ showTitle !== false && title && (
					<RichText.Content tagName="h4" value={ title } />
				) }
				{ showSubtitle !== false && subtitle && (
					<RichText.Content tagName="span" value={ subtitle } />
				) }
			</div>
		</div>
	);
}
