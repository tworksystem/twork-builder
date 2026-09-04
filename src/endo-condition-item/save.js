import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function save( { attributes } ) {
	const { showItem, showIcon, showLabel, label } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'cond mk-endo-condition-item',
	} );

	return (
		<div { ...blockProps }>
			{ showIcon !== false &&
				hasIconValue( mapIconAttrs( attributes ) ) && (
					<EndoFlexibleIcon attributes={ attributes } />
				) }
			{ showLabel !== false && label && (
				<RichText.Content tagName="span" value={ label } />
			) }
		</div>
	);
}
