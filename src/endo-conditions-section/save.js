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
		showIntro,
		introText,
		showUrgentNote,
		urgentNoteIcon,
		urgentNoteText,
		animationOnScroll,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className:
			'twork-endo-conditions-section mk-endo-conditions-section section',
		id: sectionId || undefined,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-animation': animationOnScroll ? '1' : '0',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				<div className="cond-layout">
					<div className={ animationOnScroll ? 'reveal' : undefined }>
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
						{ showIntro !== false && introText && (
							<RichText.Content
								tagName="p"
								className="cond-intro"
								value={ introText }
							/>
						) }
						{ showUrgentNote !== false && urgentNoteText && (
							<div className="cond-note">
								{ urgentNoteIcon && (
									<i
										className={ urgentNoteIcon }
										aria-hidden="true"
									/>
								) }
								<RichText.Content
									tagName="div"
									value={ urgentNoteText }
								/>
							</div>
						) }
					</div>

					<div
						className={
							animationOnScroll
								? 'cond-grid stagger'
								: 'cond-grid'
						}
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
