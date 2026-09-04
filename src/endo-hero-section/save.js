import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	eyebrowIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		showAurora,
		showEyebrow,
		eyebrowText,
		showTitle,
		titleLine1,
		titleLine2,
		titleLine3,
		titleLine3Highlight,
		showLead,
		leadText,
		showPrimaryCta,
		primaryCtaText,
		primaryCtaUrl,
		showSecondaryCta,
		secondaryCtaText,
		secondaryCtaUrl,
		showProof,
		proofAvatars,
		proofRatingText,
		proofSubtext,
		showStars,
		showVisual,
		heroImageUrl,
		heroImageAlt,
		showScanBeam,
		containerMaxWidth,
		paddingTop,
		paddingBottom,
		animationOnScroll,
		respectReducedMotion,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-endo-hero-section mk-endo-hero-section hero',
		id: sectionId || undefined,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-animation': animationOnScroll ? '1' : '0',
		'data-reduced-motion': respectReducedMotion ? '1' : '0',
	} );

	const visibleAvatars = ( proofAvatars || [] ).filter(
		( avatar ) => avatar.showAvatar !== false && avatar.url
	);

	return (
		<header { ...blockProps }>
			{ showAurora !== false && (
				<>
					<div className="aurora aurora-1" aria-hidden="true" />
					<div className="aurora aurora-2" aria-hidden="true" />
				</>
			) }
			<div className="endo-container">
				<div className="hero-grid">
					<div
						className={
							animationOnScroll
								? 'hero-content reveal'
								: 'hero-content'
						}
					>
						{ showEyebrow !== false && eyebrowText && (
							<span className="eyebrow">
								{ hasIconValue(
									mapIconAttrs( attributes, EYEBROW_KEYS )
								) && (
									<EndoFlexibleIcon
										attributes={ attributes }
										keys={ EYEBROW_KEYS }
									/>
								) }
								{ eyebrowText }
							</span>
						) }
						{ showTitle !== false && (
							<h1>
								{ titleLine1 && (
									<>
										{ titleLine1 }
										<br />
									</>
								) }
								{ titleLine2 && (
									<>
										{ titleLine2 }
										<br />
									</>
								) }
								{ titleLine3 &&
									( titleLine3Highlight ? (
										<span className="hero-title-highlight">
											{ titleLine3 }
										</span>
									) : (
										titleLine3
									) ) }
							</h1>
						) }
						{ showLead !== false && leadText && (
							<RichText.Content
								tagName="p"
								className="hero-lead"
								value={ leadText }
							/>
						) }
						{ ( showPrimaryCta !== false ||
							showSecondaryCta !== false ) && (
							<div className="hero-actions">
								{ showPrimaryCta !== false &&
									primaryCtaText && (
										<a
											href={ primaryCtaUrl || '#' }
											className="btn btn-primary"
										>
											{ primaryCtaText }
											<i
												className="fas fa-arrow-right"
												aria-hidden="true"
											/>
										</a>
									) }
								{ showSecondaryCta !== false &&
									secondaryCtaText && (
										<a
											href={ secondaryCtaUrl || '#' }
											className="btn btn-ghost"
										>
											{ secondaryCtaText }
										</a>
									) }
							</div>
						) }
						{ showProof !== false && (
							<div className="hero-proof">
								{ visibleAvatars.length > 0 && (
									<div className="avatars">
										{ visibleAvatars.map(
											( avatar, index ) => (
												<img
													key={ `avatar-${ index }` }
													src={ avatar.url }
													alt={ avatar.alt || '' }
													loading="lazy"
												/>
											)
										) }
									</div>
								) }
								<div className="proof-text">
									{ proofRatingText && (
										<strong>
											{ proofRatingText }
											{ showStars !== false && (
												<span className="stars">
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
												</span>
											) }
										</strong>
									) }
									{ proofSubtext && (
										<RichText.Content
											tagName="span"
											value={ proofSubtext }
										/>
									) }
								</div>
							</div>
						) }
					</div>
					{ showVisual !== false && (
						<div
							className={
								animationOnScroll
									? 'hero-visual reveal'
									: 'hero-visual'
							}
						>
							<div className="hero-frame">
								{ showScanBeam !== false && (
									<span
										className="scan-beam"
										aria-hidden="true"
									/>
								) }
								{ heroImageUrl && (
									<img
										src={ heroImageUrl }
										alt={ heroImageAlt || '' }
									/>
								) }
							</div>
							<InnerBlocks.Content />
						</div>
					) }
				</div>
			</div>
		</header>
	);
}
