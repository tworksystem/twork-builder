import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function save( { attributes } ) {
	const { showItem, showIcon, showTitle, title, showSubtitle, subtitle } =
		attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'cta-row mk-endo-cta-row',
	} );

	return (
		<div { ...blockProps }>
			{ showIcon !== false &&
				hasIconValue( mapIconAttrs( attributes ) ) && (
					<EndoFlexibleIcon attributes={ attributes } />
				) }
			<div>
				{ showTitle !== false && title && (
					<RichText.Content tagName="strong" value={ title } />
				) }
				{ showSubtitle !== false && subtitle && (
					<RichText.Content tagName="span" value={ subtitle } />
				) }
			</div>
		</div>
	);
}
