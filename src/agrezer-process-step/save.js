import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		position,
		badgeNum,
		stepTitle,
		stepText,
		showCta,
		ctaText,
		ctaUrl,
	} = attributes;

	const side = position === 'right' ? 'right' : 'left';

	const blockProps = useBlockProps.save( {
		className: `twork-process__step twork-process__step--${ side }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="twork-process__badge-wrapper">
				<div className="twork-process__badge">
					<span className="twork-process__badge-num">
						{ badgeNum }
					</span>
				</div>
			</div>
			<RichText.Content
				tagName="h3"
				className="twork-process__step-title"
				value={ stepTitle }
			/>
			<RichText.Content
				tagName="p"
				className="twork-process__step-text"
				value={ stepText }
			/>
			{ showCta && (
				<a href={ ctaUrl || '#' } className="twork-process__btn">
					<RichText.Content tagName="span" value={ ctaText } />
					<span aria-hidden="true">↗</span>
				</a>
			) }
		</div>
	);
}
