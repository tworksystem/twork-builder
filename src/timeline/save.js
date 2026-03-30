import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionCategory,
		sectionTitle,
		timelineItems,
		timelineBg,
		activeIndex,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'timeline-section',
	} );

	return (
		<section { ...blockProps }>
			<div className="service-blue-text-wrapper">
				<RichText.Content
					tagName="div"
					className="category-title"
					value={ sectionCategory }
				/>
				<RichText.Content
					tagName="div"
					className="main-title"
					value={ sectionTitle }
				/>
			</div>

			<div
				className="timeline-wrapper"
				style={
					timelineBg
						? { backgroundImage: `url(${ timelineBg })` }
						: {}
				}
			>
				<div className="timeline">
					<div className="accordion">
						{ timelineItems.map( ( item, index ) => (
							<div
								key={ index }
								className={ `accordion-item ${
									index === activeIndex ? 'active' : ''
								}` }
							>
								<button
									className={ `accordion-header ${
										index === activeIndex ? 'active' : ''
									}` }
									type="button"
									aria-expanded={
										index === activeIndex ? 'true' : 'false'
									}
								>
									<div className="number">
										{ item.year }
										<span className="mobile-arrow-icon">
											<svg
												width="8"
												height="10"
												viewBox="0 0 8 10"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M1.53857 8.6698L6.46147 5.03804"
													stroke="#003594"
													strokeWidth="2"
													strokeMiterlimit="10"
													strokeLinecap="round"
												/>
												<path
													d="M1.53857 1.33729L6.46147 4.97595"
													stroke="#003594"
													strokeWidth="2"
													strokeMiterlimit="10"
													strokeLinecap="round"
												/>
											</svg>
										</span>
									</div>
									<span className="dot"></span>
								</button>

								<div
									className="accordion-content"
									style={ {
										maxHeight:
											index === activeIndex
												? '2000px'
												: '0',
										opacity:
											index === activeIndex ? '1' : '0',
									} }
								>
									<div className="wrapper">
										<div className="left-content">
											{ item.imgUrl && (
												<img
													src={ item.imgUrl }
													alt={
														item.heading ||
														'Timeline image'
													}
													className="timeline-img"
												/>
											) }
											<div className="caption">
												{ item.address && (
													<span className="address">
														{ item.address }
													</span>
												) }
												{ item.years && (
													<span className="years">
														{ item.years }
													</span>
												) }
											</div>
										</div>

										<div className="right-content">
											{ item.heading && (
												<div className="heading">
													{ item.heading }
												</div>
											) }
											{ item.description && (
												<div className="desc">
													{ item.description }
												</div>
											) }
										</div>
									</div>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</section>
	);
}
