import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		columnHeaders,
		rows,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		secondaryColor,
		checkColor,
		crossColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'chk-section chk-compare-section twork-health-check-compare-section',
		style: {
			backgroundColor: backgroundColor || '#f4f8fb',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--chk-secondary': secondaryColor || '#005f73',
			'--chk-check-color': checkColor || '#2ecc71',
			'--chk-cross-color': crossColor || '#e74c3c',
		},
	} );

	const cols = Array.isArray( columnHeaders ) ? columnHeaders : [];
	const dataRows = Array.isArray( rows ) ? rows : [];
	const valueCount = Math.max( 0, cols.length - 1 );

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
				<div className="chk-table-wrap fade-up">
					<table className="chk-table">
						<thead>
							<tr>
								{ cols.map( ( h, i ) => (
									<th key={ i }>
										{ h ||
											( i === 0
												? 'Test / Service'
												: 'Column' ) }
									</th>
								) ) }
							</tr>
						</thead>
						<tbody>
							{ dataRows.map( ( row, rowIndex ) => {
								const vals = Array.from(
									{ length: valueCount },
									( _, i ) =>
										( row.values || [] )[ i ] ?? false
								);
								return (
									<tr key={ rowIndex }>
										<td>{ row.feature || '—' }</td>
										{ vals.map( ( val, colIndex ) => (
											<td key={ colIndex }>
												{ val ? (
													<i
														className="fas fa-check chk-check"
														aria-hidden="true"
													/>
												) : (
													<i
														className="fas fa-times chk-cross"
														aria-hidden="true"
													/>
												) }
											</td>
										) ) }
									</tr>
								);
							} ) }
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
