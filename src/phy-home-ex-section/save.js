import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
	backgroundColor: '#fdfdfd',
	paddingTop: 60,
	paddingBottom: 80,
	containerMaxWidth: 1280,
	containerPadding: 24,
	badgeText: 'Long Term Wellness',
	title: 'Continue Healing at Home',
	description:
		"Recovery doesn't stop at the clinic. We provide you with a digital home exercise plan including video guides to ensure you continue progressing every day.",
	items: [
		'Personalized Video Instructions',
		'Progress Tracking App',
		'Daily Reminders',
	],
	imageUrl:
		'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
	imageAlt: 'Home Exercise',
};

export default function save( { attributes = {} } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		badgeText,
		title,
		description,
		items = [],
		imageUrl,
		imageAlt,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'phy-section twork-phy-home-ex-section',
		style: {
			backgroundColor,
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			position: 'relative',
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="phy-container"
				style={ {
					maxWidth: `${ Number( containerMaxWidth ) }px`,
					margin: '0 auto',
					padding: `0 ${ Number( containerPadding ) }px`,
				} }
			>
				<div className="phy-home-ex-grid">
					<div className="phy-home-ex-content fade-up">
						{ badgeText && (
							<span className="phy-hero-badge">
								{ badgeText }
							</span>
						) }
						<RichText.Content tagName="h2" value={ title } />
						<RichText.Content
							tagName="p"
							value={ description }
							style={ { color: '#666', marginBottom: 30 } }
						/>
						<ul className="phy-home-ex-list">
							{ ( items && items.length
								? items
								: DEFAULT_ATTRS.items
							).map( ( item, index ) => (
								<li key={ index }>
									<i
										className="fas fa-check-circle"
										aria-hidden="true"
									/>{ ' ' }
									<span>{ item }</span>
								</li>
							) ) }
						</ul>
					</div>
					<div className="fade-up">
						{ imageUrl && (
							<img
								src={ imageUrl }
								alt={ imageAlt || '' }
								style={ {
									borderRadius: 'var(--phy-radius, 20px)',
									boxShadow:
										'var(--phy-shadow, 0 15px 35px rgba(0,0,0,0.06))',
								} }
							/>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
