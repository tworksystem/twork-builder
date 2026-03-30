import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		dateDay,
		dateMonth,
		title,
		location,
		time,
		buttonText,
		buttonUrl,
		buttonOpensInNewTab,
		dateBgColor,
		dateTextColor,
		titleColor,
		infoColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'event-card stagger-event animate-on-scroll',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="event-date"
				style={ {
					background: dateBgColor,
					color: dateTextColor,
				} }
			>
				<span className="date-day">{ dateDay }</span>
				<span className="date-month">{ dateMonth }</span>
			</div>
			<div className="event-details">
				<div className="event-info">
					{ title && (
						<RichText.Content
							tagName="h4"
							value={ title }
							style={ {
								margin: '0 0 5px 0',
								fontSize: '1.2rem',
								color: titleColor,
							} }
						/>
					) }
					{ ( location || time ) && (
						<p
							style={ {
								margin: 0,
								color: infoColor,
								fontSize: '0.95rem',
							} }
						>
							{ location && (
								<>
									<i
										className="fas fa-map-marker-alt"
										aria-hidden="true"
									/>{ ' ' }
									{ location }
								</>
							) }
							{ location && time && ' \u00A0|\u00A0 ' }
							{ time && (
								<>
									<i
										className="fas fa-clock"
										aria-hidden="true"
									/>{ ' ' }
									{ time }
								</>
							) }
						</p>
					) }
				</div>
				{ buttonText && (
					<a
						href={ buttonUrl || '#' }
						className="jivaka-btn btn-primary"
						target={ buttonOpensInNewTab ? '_blank' : '_self' }
						rel={
							buttonOpensInNewTab
								? 'noopener noreferrer'
								: undefined
						}
						style={ { fontSize: '0.75rem', padding: '10px 20px' } }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</div>
	);
}
