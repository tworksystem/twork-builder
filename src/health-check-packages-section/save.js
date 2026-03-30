import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		tabs,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		primaryColor,
		secondaryColor,
		tabActiveBg,
		tabActiveText,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'chk-section twork-health-check-packages-section',
		id: 'packages',
		style: {
			backgroundColor: backgroundColor || '#fff',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--chk-primary': primaryColor || '#f48b2a',
			'--chk-secondary': secondaryColor || '#005f73',
			'--chk-tab-active-bg': tabActiveBg || '#005f73',
			'--chk-tab-active-text': tabActiveText || '#ffffff',
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="chk-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div className="chk-header fade-up">
					{ sectionTitle && (
						<RichText.Content
							tagName="h2"
							value={ sectionTitle }
							style={ {
								color: sectionTitleColor,
								marginBottom: 15,
								marginTop: 0,
							} }
						/>
					) }
					{ sectionSubtitle && (
						<RichText.Content
							tagName="p"
							value={ sectionSubtitle }
							style={ { color: sectionSubtitleColor, margin: 0 } }
						/>
					) }
				</div>
				<div className="chk-tabs-wrapper fade-up">
					{ tabs &&
						tabs.map( ( tab, index ) => (
							<button
								key={ index }
								type="button"
								className={ `chk-tab-btn ${
									index === 0 ? 'active' : ''
								}` }
								data-tab={ tab.value }
								aria-pressed={ index === 0 }
								aria-label={ tab.label }
							>
								{ tab.label }
							</button>
						) ) }
				</div>
				<div className="chk-pkg-grid active" data-active="basic">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
