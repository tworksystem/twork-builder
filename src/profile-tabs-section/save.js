import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingBottom,
		sectionMarginTop,
		sectionMarginBottom,
		containerMaxWidth,
		containerPadding,
		tab1Id,
		tab1Label,
		tab2Id,
		tab2Label,
		scheduleTitle,
		scheduleRows = [],
		experienceTitle,
		experienceItems = [],
		bookingSidebarId,
		bookingTitle,
		consultationFeeLabel,
		consultationFeeAmount,
		formDateLabel,
		formNameLabel,
		formNamePlaceholder,
		formButtonText,
		hotlineText,
	} = attributes;

	const safeScheduleRows = Array.isArray( scheduleRows ) ? scheduleRows : [];
	const safeExperienceItems = Array.isArray( experienceItems )
		? experienceItems
		: [];

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div
				className="profile-tabs-section"
				style={ {
					paddingBottom: `${ sectionPaddingBottom }px`,
					marginTop: `${ sectionMarginTop }px`,
					marginBottom: `${ sectionMarginBottom }px`,
				} }
			>
				<div
					className="jivaka-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
						position: 'relative',
					} }
				>
					<div className="profile-grid">
						<div className="main-content animate-item">
							<div className="tabs-nav" role="tablist">
								<button
									type="button"
									className="tab-btn active"
									id={ `tab-${ tab1Id }` }
									data-tab={ tab1Id }
									aria-selected="true"
									aria-controls={ tab1Id }
									role="tab"
								>
									{ tab1Label }
								</button>
								<button
									type="button"
									className="tab-btn"
									id={ `tab-${ tab2Id }` }
									data-tab={ tab2Id }
									aria-selected="false"
									aria-controls={ tab2Id }
									role="tab"
								>
									{ tab2Label }
								</button>
							</div>

							<div
								id={ tab1Id }
								className="tab-content active"
								role="tabpanel"
								aria-labelledby={ `tab-${ tab1Id }` }
							>
								<h3 className="schedule-title">
									{ scheduleTitle }
								</h3>
								<table className="schedule-table">
									<tbody>
										{ safeScheduleRows.map( ( row ) => (
											<tr key={ row.id }>
												<th>{ row.day }</th>
												<td>
													{ row.time }
													{ row.showAvailableTag &&
														row.availableTagText && (
															<span className="available-tag">
																{
																	row.availableTagText
																}
															</span>
														) }
												</td>
											</tr>
										) ) }
									</tbody>
								</table>
							</div>

							<div
								id={ tab2Id }
								className="tab-content"
								role="tabpanel"
								aria-labelledby={ `tab-${ tab2Id }` }
								hidden
							>
								<h3 className="experience-title">
									{ experienceTitle }
								</h3>
								<ul className="experience-list">
									{ safeExperienceItems.map( ( item ) => (
										<li key={ item.id }>
											<strong>{ item.year }:</strong>{ ' ' }
											{ item.description }
										</li>
									) ) }
								</ul>
							</div>
						</div>

						<div
							className="booking-sidebar animate-item"
							id={ bookingSidebarId }
						>
							<h3 className="booking-title">{ bookingTitle }</h3>
							<p className="consultation-fee">
								{ consultationFeeLabel }{ ' ' }
								<strong>{ consultationFeeAmount }</strong>
							</p>
							<form
								className="booking-form"
								onSubmit={ ( e ) => e.preventDefault() }
							>
								<div className="form-group">
									<label
										htmlFor={ `booking-date-${ bookingSidebarId }` }
									>
										{ formDateLabel }
									</label>
									<input
										type="date"
										id={ `booking-date-${ bookingSidebarId }` }
										name="booking-date"
										className="booking-input"
										required
									/>
								</div>
								<div className="form-group">
									<label
										htmlFor={ `booking-name-${ bookingSidebarId }` }
									>
										{ formNameLabel }
									</label>
									<input
										type="text"
										id={ `booking-name-${ bookingSidebarId }` }
										name="booking-name"
										className="booking-input"
										placeholder={ formNamePlaceholder }
										required
									/>
								</div>
								<button
									type="submit"
									className="jivaka-btn btn-primary booking-submit"
								>
									{ formButtonText }
								</button>
							</form>
							<p className="hotline-text">
								Hotline: { hotlineText }
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
