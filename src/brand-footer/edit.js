import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		brandPrefix,
		brandSuffix,
		description,
		copyright,
		infoCards,
		columns,
	} = attributes;
	const blockProps = useStableBlockProps( {
		className: 'footer brand-footer-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Brand', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Prefix', 'twork-builder' ) }
						value={ brandPrefix }
						onChange={ ( v ) =>
							setAttributes( { brandPrefix: v } )
						}
					/>
					<TextControl
						label={ __( 'Suffix', 'twork-builder' ) }
						value={ brandSuffix }
						onChange={ ( v ) =>
							setAttributes( { brandSuffix: v } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<footer { ...blockProps } data-block="twork/brand-footer">
				<div className="l-section">
					<div className="footer__info-grid">
						{ ( infoCards || [] ).map( ( card ) => (
							<div
								key={ card.id }
								className="footer__info-card"
								data-item-id={ card.id }
							>
								<div>
									<p className="footer__info-label">
										{ card.label }
									</p>
									<div className="footer__info-lines">
										{ ( card.lines || [] ).map(
											( line, i ) => (
												<span key={ i }>{ line }</span>
											)
										) }
									</div>
								</div>
							</div>
						) ) }
					</div>
					<div className="footer__main">
						<div className="footer__about">
							<p className="footer__brand">
								{ brandPrefix }{ ' ' }
								<span className="footer__brand-suffix">
									{ brandSuffix }
								</span>
							</p>
							<RichText
								tagName="p"
								className="footer__desc"
								value={ description }
								onChange={ ( v ) =>
									setAttributes( { description: v } )
								}
							/>
						</div>
						<div className="footer__columns">
							{ ( columns || [] ).map( ( col ) => (
								<div
									key={ col.id }
									className="footer__column"
									data-item-id={ col.id }
								>
									<h4>{ col.title }</h4>
									<ul>
										{ ( col.links || [] ).map( ( link ) => (
											<li key={ link.id }>
												<a href={ link.href }>
													{ link.label }
												</a>
											</li>
										) ) }
									</ul>
								</div>
							) ) }
						</div>
					</div>
					<RichText
						tagName="p"
						className="footer__copyright"
						value={ copyright }
						onChange={ ( v ) => setAttributes( { copyright: v } ) }
					/>
				</div>
			</footer>
		</>
	);
}
