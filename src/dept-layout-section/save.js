import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		navItems,
		sidebarTitle,
		sidebarDesc,
		sidebarButtonText,
		sidebarButtonUrl,
		sidebarPhone,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		sidebarWidth,
		gap,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-dept-layout-section',
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--dept-sidebar-width': `${ sidebarWidth }px`,
			'--dept-gap': `${ gap }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="dept-layout"
				style={ {
					'--dept-container-max': `${ containerMaxWidth }px`,
					'--dept-container-padding': `${ containerPadding }px`,
				} }
			>
				<div className="jivaka-container dept-grid">
					<aside className="dept-sidebar">
						<nav className="sidebar-nav">
							{ ( navItems || [] ).map( ( item, i ) => (
								<a key={ i } href={ item?.href || '#' }>
									{ item?.label || '' }{ ' ' }
									<i className="fas fa-chevron-right" />
								</a>
							) ) }
						</nav>
						<div className="sidebar-widget desktop-only">
							<h4>{ sidebarTitle }</h4>
							<p>{ sidebarDesc }</p>
							<a
								href={ sidebarButtonUrl || '#' }
								className="jivaka-btn btn-primary"
							>
								{ sidebarButtonText }
							</a>
							<div className="sidebar-widget-phone">
								<i className="fas fa-phone-alt" />{ ' ' }
								{ sidebarPhone }
							</div>
						</div>
					</aside>
					<div className="content-area">
						<InnerBlocks.Content />
						<div className="sidebar-widget mobile-only">
							<h4>{ sidebarTitle }</h4>
							<p>{ sidebarDesc }</p>
							<a
								href={ sidebarButtonUrl || '#' }
								className="jivaka-btn btn-primary"
							>
								{ sidebarButtonText }
							</a>
							<div className="sidebar-widget-phone">
								<i className="fas fa-phone-alt" />{ ' ' }
								{ sidebarPhone }
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
