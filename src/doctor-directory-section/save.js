import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const DEFAULT_ATTS = {
	backgroundColor: '#ffffff',
	paddingTop: 0,
	paddingBottom: 80,
	columns: 4,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 30,
	containerMaxWidth: 1200,
	containerPadding: 30,
	noResultsHeading: 'No doctors found matching your criteria.',
	noResultsMessage: 'Please try adjusting your filters or search term.',
};

export default function save( { attributes } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		containerMaxWidth,
		containerPadding,
		noResultsHeading,
		noResultsMessage,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'doctor-directory twork-doctor-directory-section',
		style: {
			backgroundColor: backgroundColor ?? undefined,
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			position: 'relative',
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				<div
					className="doctors-grid"
					id="doctorsGrid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${
							Number( columns ) || 4
						}, 1fr)`,
						gap: `${ Number( gap ) || 30 }px`,
					} }
					data-columns={ columns }
					data-columns-tablet={ columnsTablet }
					data-columns-mobile={ columnsMobile }
				>
					<InnerBlocks.Content />
				</div>

				<div
					id="noResults"
					className="no-results"
					style={ { display: 'none' } }
					role="status"
					aria-live="polite"
				>
					<i className="far fa-frown" aria-hidden="true" />
					<h3>
						{ noResultsHeading || DEFAULT_ATTS.noResultsHeading }
					</h3>
					<p>{ noResultsMessage || DEFAULT_ATTS.noResultsMessage }</p>
				</div>
			</div>
		</section>
	);
}
