import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingY,
		containerMaxWidth,
		containerPadding,
		title,
		description,
		showChecklist,
		checklistItems = [],
		buttonLabel,
		buttonUrl,
		imageUrl,
		imageAlt,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-ph-upload-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingY }px`,
			paddingBottom: `${ paddingY }px`,
		},
	} );

	const visibleItems = Array.isArray( checklistItems )
		? checklistItems.filter( ( item ) => item && item.trim() !== '' )
		: [];

	return (
		<div { ...blockProps }>
			<div
				className="ph-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div className="ph-upload-section fade-up">
					<div className="ph-upload-grid">
						<div className="ph-upload-content">
							<RichText.Content
								tagName="h2"
								value={ title }
								style={ {
									color: '#fff',
									fontSize: '2.5rem',
									marginBottom: '20px',
								} }
							/>
							{ description && (
								<RichText.Content
									tagName="p"
									value={ description }
									style={ {
										fontSize: '1.1rem',
										opacity: 0.9,
										marginBottom: '20px',
									} }
								/>
							) }

							{ showChecklist && visibleItems.length > 0 && (
								<ul
									style={ {
										listStyle: 'none',
										padding: 0,
										opacity: 0.8,
										marginBottom: '30px',
									} }
								>
									{ visibleItems.map( ( item, index ) => (
										<li
											key={ index }
											style={ { marginBottom: '10px' } }
										>
											<i
												className="fas fa-check"
												style={ {
													color: 'var(--ph-primary)',
												} }
												aria-hidden="true"
											/>{ ' ' }
											{ item }
										</li>
									) ) }
								</ul>
							) }

							{ buttonLabel && (
								<a
									className="ph-upload-btn"
									href={ buttonUrl || '#' }
								>
									<i
										className="fas fa-camera"
										aria-hidden="true"
									/>{ ' ' }
									{ buttonLabel }
								</a>
							) }
						</div>
						<div>
							{ imageUrl && (
								<img
									src={ imageUrl }
									alt={ imageAlt }
									className="ph-upload-img"
								/>
							) }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
