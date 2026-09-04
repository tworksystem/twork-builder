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
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showCtaWrap,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showSubtitle,
		subtitle,
		showPrimaryButton,
		primaryButtonText,
		primaryButtonUrl,
		primaryButtonIcon,
		showPrimaryButtonIcon,
		showSecondaryButton,
		secondaryButtonText,
		secondaryButtonUrl,
		secondaryButtonIcon,
		showSecondaryButtonIcon,
		enableMagneticButtons,
		animationOnScroll,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-endo-cta-section mk-endo-cta-section section',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-magnetic': enableMagneticButtons ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				{ showCtaWrap !== false && (
					<div
						className={
							animationOnScroll ? 'cta-wrap reveal' : 'cta-wrap'
						}
					>
						<div className="cta-grid">
							<div>
								{ showEyebrow !== false && eyebrowText && (
									<span className="eyebrow cta-eyebrow">
										{ hasIconValue(
											mapIconAttrs(
												attributes,
												EYEBROW_KEYS
											)
										) && (
											<EndoFlexibleIcon
												attributes={ attributes }
												keys={ EYEBROW_KEYS }
											/>
										) }
										{ eyebrowText }
									</span>
								) }
								{ showTitle !== false && title && (
									<RichText.Content
										tagName="h2"
										value={ title }
									/>
								) }
								{ showSubtitle !== false && subtitle && (
									<RichText.Content
										tagName="p"
										value={ subtitle }
									/>
								) }
								{ ( showPrimaryButton !== false ||
									showSecondaryButton !== false ) && (
									<div className="cta-actions">
										{ showPrimaryButton !== false &&
											primaryButtonText && (
												<a
													className="btn btn-light"
													href={
														primaryButtonUrl ||
														'tel:012345678'
													}
													data-magnetic={
														enableMagneticButtons
															? '1'
															: undefined
													}
												>
													{ showPrimaryButtonIcon !==
														false &&
														primaryButtonIcon && (
															<i
																className={
																	primaryButtonIcon
																}
																aria-hidden="true"
															/>
														) }
													{ primaryButtonText }
												</a>
											) }
										{ showSecondaryButton !== false &&
											secondaryButtonText && (
												<a
													className="btn btn-outline-light"
													href={
														secondaryButtonUrl ||
														'#'
													}
													data-magnetic={
														enableMagneticButtons
															? '1'
															: undefined
													}
												>
													{ secondaryButtonText }
													{ showSecondaryButtonIcon !==
														false &&
														secondaryButtonIcon && (
															<i
																className={
																	secondaryButtonIcon
																}
																aria-hidden="true"
															/>
														) }
												</a>
											) }
									</div>
								) }
							</div>

							<div className="cta-panel">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				) }
			</div>
		</section>
	);
}
