import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_SPEC_ITEMS = [
	{
		id: 1,
		iconClass: 'fas fa-graduation-cap',
		text: 'MBBS, M.Med.Sc, MRCP (UK)',
	},
	{ id: 2, iconClass: 'fas fa-briefcase', text: '15+ Years Experience' },
	{ id: 3, iconClass: 'fas fa-language', text: 'English, Myanmar' },
];

export default function save( { attributes } ) {
	const {
		paddingTop = 60,
		paddingBottom = 60,
		containerMaxWidth = 1200,
		containerPadding = 20,
		profileImage = '',
		profileImageAlt = '',
		showBadge = true,
		badgeText = 'Available Today',
		badgeIcon = 'fas fa-check-circle',
		doctorName = '',
		designation = '',
		specItems = DEFAULT_SPEC_ITEMS,
		profileBio = '',
		primaryButtonText = 'Book Appointment',
		primaryButtonUrl = '#book',
		primaryButtonTarget = false,
		secondaryButtonText = 'Share Profile',
		secondaryButtonUrl = '#',
		secondaryButtonTarget = false,
		backgroundGradientStart = '#fff8f2',
		backgroundGradientEnd = '#ffffff',
	} = attributes;

	const safeSpecItems = Array.isArray( specItems )
		? specItems
		: DEFAULT_SPEC_ITEMS;

	const blockProps = useBlockProps.save( {
		className: 'profile-hero',
		style: {
			background: `linear-gradient(135deg, ${ backgroundGradientStart } 0%, ${ backgroundGradientEnd } 100%)`,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			borderBottom: '1px solid #eee',
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="jivaka-container profile-grid"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
				} }
			>
				<div className="profile-img-box animate-item">
					{ profileImage && (
						<img
							decoding="async"
							src={ profileImage }
							alt={ profileImageAlt || doctorName || '' }
							className="profile-hero-image"
						/>
					) }
					{ showBadge && badgeText && (
						<span className="profile-badge">
							<i className={ badgeIcon } aria-hidden="true" />{ ' ' }
							{ badgeText }
						</span>
					) }
				</div>

				<div className="profile-info animate-item">
					<RichText.Content
						tagName="h1"
						value={ doctorName || '' }
						className="profile-hero-name"
					/>
					<RichText.Content
						tagName="span"
						value={ designation || '' }
						className="designation"
					/>

					{ safeSpecItems.length > 0 && (
						<div className="profile-specs">
							{ safeSpecItems.map( ( item ) => (
								<div key={ item.id } className="spec-item">
									<i
										className={
											item.iconClass || 'fas fa-check'
										}
										aria-hidden="true"
									/>{ ' ' }
									{ item.text || '' }
								</div>
							) ) }
						</div>
					) }

					{ ( profileBio || '' ).trim() !== '' && (
						<RichText.Content
							tagName="p"
							value={ profileBio || '' }
							className="profile-bio"
						/>
					) }

					<div className="profile-actions">
						{ primaryButtonText && (
							<a
								href={ primaryButtonUrl || '#' }
								className="jivaka-btn btn-primary"
								target={
									primaryButtonTarget ? '_blank' : undefined
								}
								rel={
									primaryButtonTarget
										? 'noopener noreferrer'
										: undefined
								}
							>
								{ primaryButtonText }
							</a>
						) }
						{ secondaryButtonText && (
							<a
								href={ secondaryButtonUrl || '#' }
								className="jivaka-btn btn-outline"
								target={
									secondaryButtonTarget ? '_blank' : undefined
								}
								rel={
									secondaryButtonTarget
										? 'noopener noreferrer'
										: undefined
								}
							>
								{ secondaryButtonText }
							</a>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
