import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		ariaLabel,
		marqueePaddingY,
		borderColor,
		trackGap,
		animationDuration,
		enableMarquee,
		pauseOnHover,
	} = attributes;

	const gapHalf = `${ trackGap / 2 }px`;

	const blockProps = useBlockProps.save( {
		className: 'twork-partners twork-partners-section',
		style: {
			backgroundColor,
			'--twork-partners-py': `${ marqueePaddingY }px`,
			'--twork-partners-border': borderColor,
			'--twork-partners-gap': `${ trackGap }px`,
			'--twork-partners-gap-half': gapHalf,
			'--twork-partners-duration': `${ animationDuration }s`,
		},
		'data-marquee': enableMarquee ? 'true' : 'false',
		'data-pause-hover': pauseOnHover ? 'true' : 'false',
		'aria-label': ariaLabel || undefined,
	} );

	return (
		<section { ...blockProps }>
			<div className="twork-partners__marquee">
				<div className="twork-partners__track">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
