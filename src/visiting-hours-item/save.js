import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		wardName,
		timeSlot,
		iconClass,
		wardNameColor,
		wardNameFontSize,
		wardNameFontWeight,
		timeSlotColor,
		timeSlotFontSize,
		timeSlotBgColor,
		iconColor,
		rowPaddingVertical,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hours-row',
		style: {
			padding: `${ rowPaddingVertical }px 0`,
		},
	} );

	return (
		<div { ...blockProps }>
			<span
				className="ward-name"
				style={ {
					fontWeight: wardNameFontWeight,
					fontSize: `${ wardNameFontSize }rem`,
					color: wardNameColor,
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					flex: 1,
					minWidth: 0,
				} }
			>
				{ iconClass && (
					<i
						className={ iconClass }
						style={ { color: iconColor, flexShrink: 0 } }
						aria-hidden="true"
					/>
				) }
				<RichText.Content tagName="span" value={ wardName } />
			</span>
			<span
				className="time-slot"
				style={ {
					fontWeight: 500,
					color: timeSlotColor,
					background: timeSlotBgColor,
					padding: '5px 15px',
					borderRadius: '20px',
					fontSize: `${ timeSlotFontSize }rem`,
					flexShrink: 0,
				} }
			>
				<RichText.Content tagName="span" value={ timeSlot } />
			</span>
		</div>
	);
}
