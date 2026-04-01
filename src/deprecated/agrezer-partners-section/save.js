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
		className: 'agrezer-partners twork-agrezer-partners-section',
		style: {
			backgroundColor,
			'--agrezer-partners-py': `${ marqueePaddingY }px`,
			'--agrezer-partners-border': borderColor,
			'--agrezer-partners-gap': `${ trackGap }px`,
			'--agrezer-partners-gap-half': gapHalf,
			'--agrezer-partners-duration': `${ animationDuration }s`,
		},
		'data-marquee': enableMarquee ? 'true' : 'false',
		'data-pause-hover': pauseOnHover ? 'true' : 'false',
		'aria-label': ariaLabel || undefined,
	} );

	return (
		<section { ...blockProps }>
			<div className="agrezer-partners__marquee">
				<div className="agrezer-partners__track">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
