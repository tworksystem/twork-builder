import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getDepartmentLabelFromList } from '@twork-builder/shared/doctor-filter-data';

export default function save( { attributes } ) {
	const {
		doctorImage,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showImage = true,
		contentVerticalAlign = 'top',
		showBadge,
		badgeText,
		departmentSlug,
		departmentLabel,
		doctorName,
		qualifications,
		gender,
		profileUrl,
		profileOpenInNewTab,
		bookUrl,
		bookOpenInNewTab,
		profileButtonText,
		bookButtonText,
		showButtons = true,
		showProfileButton = true,
		showBookButton = true,
	} = attributes;

	const verticalAlign =
		contentVerticalAlign === 'top' || contentVerticalAlign === 'bottom'
			? contentVerticalAlign
			: 'center';
	const showProfile = showButtons && showProfileButton;
	const showBook = showButtons && showBookButton;
	const hasActions = showProfile || showBook;
	const isSingleAction = hasActions && showProfile !== showBook;

	const cardClassName = [
		'doctor-card',
		showImage ? '' : 'doctor-card--no-image',
		! showImage ? `doctor-card--align-${ verticalAlign }` : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: cardClassName,
		'data-dept':
			( departmentSlug && String( departmentSlug ).trim() ) || 'general',
		'data-gender': ( gender && String( gender ).trim() ) || 'male',
		'data-name': ( doctorName && String( doctorName ).trim() ) || '',
	} );

	const resolvedDeptLabel =
		departmentLabel ||
		getDepartmentLabelFromList( departmentSlug ) ||
		departmentSlug;

	const actionsClassName = [
		'doc-actions',
		isSingleAction ? 'doc-actions--single' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div { ...blockProps }>
			{ showImage && (
				<div
					className="doc-img-wrapper"
					style={ {
						position: 'relative',
						height: `${ Number( imageHeight ) || 260 }px`,
						overflow: 'hidden',
						background: '#f0f0f0',
					} }
				>
					{ doctorImage && (
						<img
							src={ doctorImage }
							alt={ doctorName || '' }
							decoding="async"
							loading="lazy"
							style={ {
								width: '100%',
								height: '100%',
								objectFit: imageObjectFit,
								objectPosition: imageObjectPosition,
								display: 'block',
							} }
						/>
					) }
					{ showBadge && badgeText && (
						<span className="doc-badge">{ badgeText }</span>
					) }
				</div>
			) }

			<div className="doc-content">
				<div className="doc-body">
					<span className="doc-dept">{ resolvedDeptLabel }</span>
					<RichText.Content
						tagName="h4"
						value={ doctorName }
						className="doc-name"
					/>
					<RichText.Content
						tagName="p"
						value={ qualifications }
						className="doc-qual"
					/>
				</div>
				{ hasActions && (
					<div className={ actionsClassName }>
						{ showProfile && (
							<a
								href={ profileUrl || '#' }
								className="jivaka-btn btn-outline"
								target={
									profileOpenInNewTab ? '_blank' : undefined
								}
								rel={
									profileOpenInNewTab
										? 'noopener noreferrer'
										: undefined
								}
							>
								{ profileButtonText || 'Profile' }
							</a>
						) }
						{ showBook && (
							<a
								href={ bookUrl || '#' }
								className="jivaka-btn btn-primary"
								target={
									bookOpenInNewTab ? '_blank' : undefined
								}
								rel={
									bookOpenInNewTab
										? 'noopener noreferrer'
										: undefined
								}
							>
								{ bookButtonText || 'Book' }
							</a>
						) }
					</div>
				) }
			</div>
		</div>
	);
}
