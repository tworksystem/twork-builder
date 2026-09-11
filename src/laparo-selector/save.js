import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

function sectionStyle( attributes ) {
	const { paddingTop, paddingBottom, containerMaxWidth } = attributes;
	return {
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		'--lp-container': `${ containerMaxWidth }px`,
	};
}

export default function save( { attributes } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		prompt,
		intro,
		showingLabel,
		allLabel,
		resetLabel,
		note,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-selector',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
		'data-laparo-selector': '',
	} );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-sel-head">
					<div>
						{ eyebrow && (
							<span className="lp-eyebrow">
								{ eyebrowIcon && (
									<i
										className={ eyebrowIcon }
										aria-hidden="true"
									/>
								) }
								{ eyebrow }
							</span>
						) }
						{ prompt && (
							<RichText.Content tagName="h2" value={ prompt } />
						) }
					</div>
					{ intro && (
						<RichText.Content tagName="p" value={ intro } />
					) }
				</div>
				<div className="lp-sel-chips">
					<InnerBlocks.Content />
				</div>
				<div className="lp-sel-status">
					<span>
						{ showingLabel }{ ' ' }
						<strong data-laparo-label={ allLabel }>
							{ allLabel }
						</strong>
					</span>
					<button
						type="button"
						className="lp-sel-reset"
						data-laparo-reset=""
						hidden
					>
						{ resetLabel }
					</button>
					{ note && (
						<RichText.Content
							tagName="span"
							className="lp-note"
							value={ note }
						/>
					) }
				</div>
			</div>
		</section>
	);
}
