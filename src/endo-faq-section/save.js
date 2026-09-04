import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import {
	EndoFlexibleIcon,
	eyebrowIconKeys,
	asideButtonIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();
const ASIDE_BUTTON_KEYS = asideButtonIconKeys();

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showAside,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showIntro,
		introText,
		showAsideButton,
		asideButtonText,
		asideButtonUrl,
		showAsideButtonIcon,
		animationOnScroll,
		enableAccordion,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-endo-faq-section mk-endo-faq-section section',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-accordion': enableAccordion ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				<div className="faq-layout">
					{ showAside !== false &&
						( showEyebrow !== false ||
							showTitle !== false ||
							showIntro !== false ||
							showAsideButton !== false ) && (
							<aside
								className={
									animationOnScroll
										? 'faq-aside reveal'
										: 'faq-aside'
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
										className="faq-intro"
										value={ introText }
									/>
								) }
								{ showAsideButton !== false &&
									asideButtonText && (
										<a
											className="btn btn-primary faq-aside-btn"
											href={ asideButtonUrl || '#book' }
										>
											{ asideButtonText }
											{ showAsideButtonIcon !== false &&
												hasIconValue(
													mapIconAttrs(
														attributes,
														ASIDE_BUTTON_KEYS
													)
												) && (
													<EndoFlexibleIcon
														attributes={
															attributes
														}
														keys={
															ASIDE_BUTTON_KEYS
														}
													/>
												) }
										</a>
									) }
							</aside>
						) }

					<div
						className={
							animationOnScroll ? 'faq-list stagger' : 'faq-list'
						}
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
