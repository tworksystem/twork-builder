import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		jobTitle,
		jobTitleColor,
		jobTitleFontSize,
		jobTitleFontWeight,
		location,
		employmentType,
		departmentIcon,
		department,
		metaColor,
		metaFontSize,
		metaIconColor,
		applyUrl,
		applyText,
		applyTarget,
		applyButtonStyle,
		cardPadding,
		cardPaddingMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'job-card stagger-job',
		style: {
			padding: `${ cardPadding }px 30px`,
			'--card-padding-mobile': `${ cardPaddingMobile }px`,
		},
	} );

	const btnClass =
		applyButtonStyle === 'outline'
			? 'jivaka-btn btn-outline-dark'
			: 'jivaka-btn btn-primary';

	return (
		<div { ...blockProps }>
			<div className="job-info">
				{ jobTitle && (
					<RichText.Content
						tagName="h3"
						value={ jobTitle }
						style={ {
							margin: '0 0 8px 0',
							fontSize: `${ jobTitleFontSize }rem`,
							fontWeight: jobTitleFontWeight,
							color: jobTitleColor,
						} }
					/>
				) }
				<div
					className="job-meta"
					style={ {
						display: 'flex',
						gap: '20px',
						fontSize: `${ metaFontSize }rem`,
						color: metaColor,
					} }
				>
					{ location && (
						<span>
							<i
								className="fas fa-map-marker-alt"
								style={ {
									color: metaIconColor,
									marginRight: '5px',
								} }
								aria-hidden="true"
							/>
							{ location }
						</span>
					) }
					{ employmentType && (
						<span>
							<i
								className="fas fa-clock"
								style={ {
									color: metaIconColor,
									marginRight: '5px',
								} }
								aria-hidden="true"
							/>
							{ employmentType }
						</span>
					) }
					{ department && (
						<span>
							<i
								className={ departmentIcon }
								style={ {
									color: metaIconColor,
									marginRight: '5px',
								} }
								aria-hidden="true"
							/>
							{ department }
						</span>
					) }
				</div>
			</div>
			<div className="job-action">
				<a
					href={ applyUrl || '#' }
					className={ btnClass }
					target={ applyTarget ? '_blank' : undefined }
					rel={ applyTarget ? 'noopener noreferrer' : undefined }
				>
					{ applyText }
				</a>
			</div>
		</div>
	);
}
