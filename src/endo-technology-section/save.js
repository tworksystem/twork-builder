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
		showStickyStage,
		showHud,
		showHudDot,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showIntro,
		introText,
		animationOnScroll,
		enableStageSync,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className:
			'twork-endo-technology-section mk-endo-technology-section section tech',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-stage-sync': enableStageSync ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				<div className="tech-grid">
					{ showStickyStage !== false && (
						<div
							className={
								animationOnScroll
									? 'tech-sticky reveal'
									: 'tech-sticky'
							}
						>
							<div className="tech-stage endo-tech-stage">
								<div
									className="endo-tech-stage-images"
									aria-hidden="true"
								/>
								{ showHud !== false && (
									<div className="tech-hud">
										<span>
											{ showHudDot !== false && (
												<span
													className="hud-dot"
													aria-hidden="true"
												/>
											) }
											<span className="endo-tech-hud-label">
												4K Ultra-HD Imaging
											</span>
										</span>
										<span className="endo-tech-hud-index">
											01 / 04
										</span>
									</div>
								) }
							</div>
						</div>
					) }

					<div>
						{ ( showEyebrow !== false ||
							showTitle !== false ||
							showIntro !== false ) && (
							<div
								className={
									animationOnScroll ? 'reveal' : undefined
								}
							>
								{ showEyebrow !== false && eyebrowText && (
									<span className="eyebrow">
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
								{ showIntro !== false && introText && (
									<RichText.Content
										tagName="p"
										className="tech-intro"
										value={ introText }
									/>
								) }
							</div>
						) }

						<div className="tech-list">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
