import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		ctaTitle,
		ctaDescription,
		ctaButtonText,
		ctaButtonUrl,
		ctaButtonIcon,
		ctaBackgroundStart,
		ctaBackgroundEnd,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-career-cta-section',
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--padding-top-mobile': `${ paddingTopMobile }px`,
			'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
		},
		'data-animation': animationOnScroll,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div
					className="career-cta fade-up"
					style={ {
						background: `linear-gradient(135deg, ${ ctaBackgroundStart } 0%, ${ ctaBackgroundEnd } 100%)`,
						borderRadius: '12px',
						padding: '60px 40px',
						textAlign: 'center',
						color: '#fff',
						position: 'relative',
						overflow: 'hidden',
					} }
				>
					<RichText.Content
						tagName="h2"
						value={ ctaTitle }
						style={ {
							margin: '0 0 15px 0',
							fontSize: '2rem',
							color: '#fff',
						} }
					/>
					<RichText.Content
						tagName="p"
						value={ ctaDescription }
						style={ {
							color: 'rgba(255, 255, 255, 0.7)',
							marginBottom: '30px',
							maxWidth: '600px',
							marginLeft: 'auto',
							marginRight: 'auto',
						} }
					/>
					<a
						href={ ctaButtonUrl }
						className="jivaka-btn btn-primary career-cta-btn"
						style={ {
							background: '#fff',
							color: 'var(--primary-orange, #f48b2a)',
						} }
					>
						{ ctaButtonIcon && (
							<i
								className={ ctaButtonIcon }
								aria-hidden="true"
								style={ { marginRight: '8px' } }
							/>
						) }
						{ ctaButtonText }
					</a>
				</div>
			</div>
		</section>
	);
}
