import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

export default function save( { attributes } ) {
	const {
		showItem,
		showIcon,
		showTime,
		timeLabel,
		showTitle,
		title,
		showDescription,
		description,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'step stagger-step mk-endo-journey-step',
	} );

	return (
		<div { ...blockProps }>
			{ showIcon !== false &&
				hasIconValue( mapIconAttrs( attributes ) ) && (
					<div className="step-dot">
						<EndoFlexibleIcon attributes={ attributes } />
					</div>
				) }
			{ showTime !== false && timeLabel && (
				<RichText.Content
					tagName="span"
					className="step-time"
					value={ timeLabel }
				/>
			) }
			{ showTitle !== false && title && (
				<RichText.Content tagName="h3" value={ title } />
			) }
			{ showDescription !== false && description && (
				<RichText.Content tagName="p" value={ description } />
			) }
		</div>
	);
}
