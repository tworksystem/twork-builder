import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		showPhoto,
		imageUrl,
		imageAlt,
		showTag,
		tagText,
		showSocial,
		showBookLink,
		bookUrl,
		bookAriaLabel,
		showProfileLink,
		profileUrl,
		profileAriaLabel,
		showName,
		name,
		showRole,
		role,
		showExperience,
		experienceText,
		showLanguages,
		languagesText,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'doc mk-endo-doctor-item',
	} );

	return (
		<article { ...blockProps }>
			{ showPhoto !== false && imageUrl && (
				<div className="doc-photo">
					<img
						src={ imageUrl }
						alt={ imageAlt || name || '' }
						loading="lazy"
					/>
					{ showTag !== false && tagText && (
						<RichText.Content
							tagName="span"
							className="doc-tag"
							value={ tagText }
						/>
					) }
					{ showSocial !== false &&
						( showBookLink !== false ||
							showProfileLink !== false ) && (
							<div className="doc-social">
								{ showBookLink !== false && (
									<a
										href={ bookUrl || '#book' }
										aria-label={ bookAriaLabel || 'Book' }
									>
										<i
											className="fas fa-calendar-check"
											aria-hidden="true"
										/>
									</a>
								) }
								{ showProfileLink !== false && (
									<a
										href={ profileUrl || '#' }
										aria-label={
											profileAriaLabel || 'Profile'
										}
									>
										<i
											className="fas fa-user"
											aria-hidden="true"
										/>
									</a>
								) }
							</div>
						) }
				</div>
			) }
			<div className="doc-body">
				{ showName !== false && name && (
					<RichText.Content tagName="h3" value={ name } />
				) }
				{ showRole !== false && role && (
					<RichText.Content
						tagName="span"
						className="doc-role"
						value={ role }
					/>
				) }
				{ ( showExperience !== false || showLanguages !== false ) &&
					( experienceText || languagesText ) && (
						<div className="doc-meta">
							{ showExperience !== false && experienceText && (
								<span>
									<i
										className="fas fa-briefcase-medical"
										aria-hidden="true"
									/>
									{ experienceText }
								</span>
							) }
							{ showLanguages !== false && languagesText && (
								<span>
									<i
										className="fas fa-language"
										aria-hidden="true"
									/>
									{ languagesText }
								</span>
							) }
						</div>
					) }
			</div>
		</article>
	);
}
