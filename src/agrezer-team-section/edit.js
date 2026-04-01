import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/team-member' ];
const TEMPLATE = [
	[
		'twork/team-member',
		{
			name: 'Harry Black',
			role: 'Chief Executive Officer',
		},
	],

	[
		'twork/team-member',
		{
			name: 'Marry Olson',
			role: 'Shop Keeper',
		},
	],

	[
		'twork/team-member',
		{
			name: 'Arun Patel',
			role: 'Chief Agronomist',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		gridGap,
		columns,
		headerMarginBottom,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-team-section twork-team-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--twork-team-max': `${ containerMaxWidth }px`,
				'--twork-team-width-pct': `${ containerWidthPct }%`,
				'--twork-team-gap': `${ gridGap }px`,
				'--twork-team-cols': String(
					Math.min( 4, Math.max( 1, columns || 3 ) )
				),
				'--twork-team-header-mb': `${ headerMarginBottom }px`,
			},
		} ),
		[
			backgroundColor,
			columns,
			containerMaxWidth,
			containerWidthPct,
			gridGap,
			headerMarginBottom,
			paddingBottom,
			paddingTop,
		]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Tagline icon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						{ ! tagIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										tagIcon: media.url,
										tagIconId: media.id,
										tagIconAlt: media.alt || tagIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								labels={ {
									title: __(
										'Small tagline icon',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									className="twork-team-section__tag-icon"
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											tagIcon: '',
											tagIconId: null,
										} )
									}
								>
									{ __( 'Remove icon', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Columns (large screens)',
								'twork-builder'
							) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 8 }
							max={ 40 }
						/>

						<RangeControl
							label={ __(
								'Space below heading (px)',
								'twork-builder'
							) }
							value={ headerMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { headerMarginBottom: val } )
							}
							min={ 16 }
							max={ 80 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container width (%)',
								'twork-builder'
							) }
							value={ containerWidthPct }
							onChange={ ( val ) =>
								setAttributes( { containerWidthPct: val } )
							}
							min={ 70 }
							max={ 100 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'twork-builder'
								),
							},
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="twork-team-section__container">
					<div className="twork-team-section__header">
						<div className="twork-team-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt=""
									className="twork-team-section__tag-icon"
								/>
							) }
							<RichText
								tagName="span"
								value={ tagline }
								onChange={ ( val ) =>
									setAttributes( { tagline: val } )
								}
								placeholder={ __( 'Tagline', 'twork-builder' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
							/>
						</div>
						<RichText
							tagName="h2"
							className="twork-team-section__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								'Section title',
								'twork-builder'
							) }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/underline',
							] }
							multiline="br"
						/>
					</div>

					<div className="twork-team-section__grid twork-team-section__grid--editor">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
