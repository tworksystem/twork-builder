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
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showSubtitle,
		subtitle,
		showTabGlider,
		animationOnScroll,
		enableTabGlider,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className:
			'twork-endo-prep-section mk-endo-prep-section section bg-white',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-tab-glider': enableTabGlider ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				{ ( showEyebrow !== false ||
					showTitle !== false ||
					showSubtitle !== false ) && (
					<div
						className={
							animationOnScroll
								? 'section-head reveal'
								: 'section-head'
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
						{ showTitle !== false && title && (
							<RichText.Content tagName="h2" value={ title } />
						) }
						{ showSubtitle !== false && subtitle && (
							<RichText.Content tagName="p" value={ subtitle } />
						) }
					</div>
				) }

				<div
					className={
						animationOnScroll
							? 'tabs reveal endo-prep-tablist'
							: 'tabs endo-prep-tablist'
					}
				>
					{ showTabGlider !== false && (
						<span
							className="tab-glider endo-prep-glider"
							aria-hidden="true"
						/>
					) }
				</div>

				<div className="endo-prep-panels">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
