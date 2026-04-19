import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

function normalizeSocialItem( item = {} ) {
	return {
		type: item.type === 'image' ? 'image' : 'icon',
		iconClass: item.iconClass || 'dashicons dashicons-share',
		imageUrl: item.imageUrl || '',
		url: item.url || '#',
	};
}

export default function save( { attributes } ) {
	const {
		bgType = 'color',
		bgMediaUrl = '',
		bgColor = '#133a22',
		bgOverlay = 'rgba(19, 58, 34, 0.95)',
		columnCount = 3,
		logoText,
		description,
		col2Heading,
		col3Heading,
		col4Heading,
		col4Text,
		col5Heading,
		col5Text,
		showNewsletter = true,
		newsletterActionUrl = '#',
		socialLinks = [],
		copyrightText,
	} = attributes;

	const normalizedSocialLinks = socialLinks.map( normalizeSocialItem );

	// Strict background logic:
	// - color => background color only, no overlay
	// - image => bg image + overlay
	// - video => no bg style + video + overlay
	const sectionStyle =
		bgType === 'color'
			? { backgroundColor: bgColor }
			: bgType === 'image'
			? {
					backgroundImage: bgMediaUrl ? `url(${ bgMediaUrl })` : undefined,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
			  }
			: undefined;

	const blockProps = useBlockProps.save( {
		className: 'avocado-footer',
		style: sectionStyle,
	} );

	const topStyle = { '--footer-cols': columnCount };

	return (
		<footer { ...blockProps }>
			{ bgType === 'video' && bgMediaUrl && (
				<video
					className="avocado-footer__video-bg"
					src={ bgMediaUrl }
					autoPlay
					loop
					muted
					playsInline
				/>
			) }

			{ ( bgType === 'image' || bgType === 'video' ) && (
				<div
					className="avocado-footer__overlay"
					style={ { backgroundColor: bgOverlay } }
				/>
			) }

			<div className="avocado-footer__container">
				<div className="avocado-footer__top" style={ topStyle }>
					<div className="avocado-footer__col">
						<a className="avocado-footer__logo" href="#">
							<span className="avocado-footer__logo-mark" aria-hidden="true">
								🥑
							</span>
							<RichText.Content
								tagName="span"
								className="avocado-footer__logo-text"
								value={ logoText }
							/>
						</a>
						<RichText.Content
							tagName="p"
							className="avocado-footer__desc"
							value={ description }
						/>
					</div>

					<div className="avocado-footer__col">
						<RichText.Content
							tagName="h3"
							className="avocado-footer__heading"
							value={ col2Heading }
						/>
						<div className="avocado-footer__list">
							<InnerBlocks.Content />
						</div>
					</div>

					<div className="avocado-footer__col avocado-footer__col--newsletter">
						<h3 className="avocado-footer__heading">
							<span className="avocado-footer__dot" aria-hidden="true"></span>
							<RichText.Content tagName="span" value={ col3Heading } />
						</h3>
						{ showNewsletter && (
							<form
								className="avocado-footer__newsletter"
								action={ newsletterActionUrl || '#' }
								method="post"
							>
								<input
									type="email"
									className="avocado-footer__input"
									placeholder="Email Address"
									required
								/>
								<button type="submit" className="avocado-footer__submit">
									➤
								</button>
							</form>
						) }
						<div className="avocado-footer__socials">
							{ normalizedSocialLinks.map( ( item, index ) => (
								<a key={ index } href={ item.url || '#' }>
									{ item.type === 'image' && item.imageUrl ? (
										<img src={ item.imageUrl } alt="social" />
									) : (
										<i className={ item.iconClass } aria-hidden="true"></i>
									) }
								</a>
							) ) }
						</div>
					</div>

					{ columnCount >= 4 && (
						<div className="avocado-footer__col">
							<RichText.Content
								tagName="h3"
								className="avocado-footer__heading"
								value={ col4Heading }
							/>
							<RichText.Content
								tagName="p"
								className="avocado-footer__desc"
								value={ col4Text }
							/>
						</div>
					) }

					{ columnCount >= 5 && (
						<div className="avocado-footer__col">
							<RichText.Content
								tagName="h3"
								className="avocado-footer__heading"
								value={ col5Heading }
							/>
							<RichText.Content
								tagName="p"
								className="avocado-footer__desc"
								value={ col5Text }
							/>
						</div>
					) }
				</div>

				<div className="avocado-footer__bottom">
					<RichText.Content tagName="p" value={ copyrightText } />
					<span className="avocado-footer__flower" aria-hidden="true">
						🥑
					</span>
				</div>
			</div>
		</footer>
	);
}
