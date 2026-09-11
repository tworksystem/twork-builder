import { RichText, useBlockProps } from '@wordpress/block-editor';

export function sectionStyle( attributes ) {
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
		statement,
		intro,
		formLabel,
		formUrl,
		phoneLabel,
		phoneUrl,
		line1Title,
		line1Text,
		line2Title,
		line2Text,
		line3Title,
		line3Text,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-book',
		id: sectionId || undefined,
		style: sectionStyle( attributes ),
	} );

	const lines = [
		[ line1Title, line1Text ],
		[ line2Title, line2Text ],
		[ line3Title, line3Text ],
	].filter( ( line ) => line[ 0 ] || line[ 1 ] );

	return (
		<section { ...blockProps }>
			<div className="lp-shell">
				<div className="lp-book-band">
					<div className="lp-book-in">
						<RichText.Content tagName="h2" value={ statement } />
						{ intro && (
							<RichText.Content tagName="p" value={ intro } />
						) }
						<div className="lp-book-actions">
							{ formLabel && formUrl && (
								<a
									className="lp-btn lp-btn--primary"
									href={ formUrl }
								>
									{ formLabel }
									<i
										className="fas fa-arrow-right"
										aria-hidden="true"
									/>
								</a>
							) }
							{ phoneLabel && phoneUrl && (
								<a
									className="lp-btn lp-btn--outline"
									href={ phoneUrl }
								>
									<i
										className="fas fa-phone"
										aria-hidden="true"
									/>
									{ phoneLabel }
								</a>
							) }
						</div>
						{ lines.length > 0 && (
							<div className="lp-book-lines">
								{ lines.map( ( line ) => (
									<div key={ line[ 0 ] }>
										<strong>{ line[ 0 ] }</strong>
										{ line[ 1 ] }
									</div>
								) ) }
							</div>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
