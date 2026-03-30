import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	BaseControl,
	Button,
	__experimentalDivider as ExperimentalDivider,
} from '@wordpress/components';

const Divider =
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const DEFAULT_ATTRS = {
	backgroundImageUrl:
		'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
	backgroundOverlayColor: 'rgba(0, 95, 115, 0.4)',
	backgroundOverlayOpacity: 0.4,
	minHeight: 700,
	containerMaxWidth: 1200,
	containerPadding: 20,
	badgeText: 'ISO 15189 Certified',
	title: 'Precision Science,\nAccurate Diagnosis.',
	description:
		'Advanced pathology services using world-class analyzers. Trusted by thousands for accurate and timely results.',
	primaryButtonText: 'Check Prices',
	primaryButtonUrl: '#packages',
	secondaryButtonText: 'Home Visit',
	secondaryButtonUrl: '#homecare',
	stats: [
		{ value: '500+', label: 'Tests' },
		{ value: '1 Hr', label: 'Results' },
	],

	animationOnScroll: true,
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundImageUrl,
		backgroundImageId,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		minHeight,
		containerMaxWidth,
		containerPadding,
		badgeText,
		title,
		description,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		stats = [],
		animationOnScroll,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lab-hero twork-lab-hero-section-editor',
			style: {
				minHeight: `${ Number( minHeight ) }px`,
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				width: '100%',
				backgroundImage: backgroundImageUrl
					? `url(${ backgroundImageUrl })`
					: undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				overflow: 'hidden',
			},
		} ),
		[ backgroundImageUrl, minHeight, undefined ]
	);

	const containerStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
		position: 'relative',
		zIndex: 2,
		width: '100%',
		boxSizing: 'border-box',
	};

	const updateStat = ( index, key, value ) => {
		const next = [ ...( stats || [] ) ];
		next[ index ] = {
			...( next[ index ] || {} ),
			[ key ]: value,
		};
		setAttributes( { stats: next } );
	};

	const addStat = () => {
		setAttributes( {
			stats: [
				...( stats || [] ),
				{
					value: __( '100+', 'twork-builder' ),
					label: __( 'New stat', 'twork-builder' ),
				},
			],
		} );
	};

	const removeStat = ( index ) => {
		const next = [ ...( stats || [] ) ];
		next.splice( index, 1 );
		setAttributes( { stats: next } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Hero background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Background image', 'twork-builder' ) }
						>
							{ ! backgroundImageUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											backgroundImageUrl: media.url,
											backgroundImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Hero background',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImageUrl }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												backgroundImageUrl: '',
												backgroundImageId: null,
											} )
										}
									>
										{ __(
											'Remove image',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>

						<Divider />

						<PanelColorSettings
							title={ __( 'Overlay', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundOverlayColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundOverlayColor: val,
										} ),
									label: __(
										'Overlay color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Overlay opacity', 'twork-builder' ) }
							value={ backgroundOverlayOpacity }
							onChange={ ( val ) =>
								setAttributes( {
									backgroundOverlayOpacity: val,
								} )
							}
							min={ 0 }
							max={ 0.9 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Min height (px)', 'twork-builder' ) }
							value={ minHeight }
							onChange={ ( val ) =>
								setAttributes( { minHeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 10 }
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
							min={ 800 }
							max={ 1600 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Buttons', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Primary button URL',
								'twork-builder'
							) }
							value={ primaryButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { primaryButtonUrl: val } )
							}
						/>

						<TextControl
							label={ __(
								'Secondary button URL',
								'twork-builder'
							) }
							value={ secondaryButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { secondaryButtonUrl: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Stats bubbles', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ ( stats || [] ).map( ( item, index ) => (
							<div
								key={ index }
								style={ {
									display: 'flex',
									gap: 8,
									marginBottom: 8,
								} }
							>
								<TextControl
									label={ __( 'Value', 'twork-builder' ) }
									value={ item?.value || '' }
									onChange={ ( val ) =>
										updateStat( index, 'value', val )
									}
								/>

								<TextControl
									label={ __( 'Label', 'twork-builder' ) }
									value={ item?.label || '' }
									onChange={ ( val ) =>
										updateStat( index, 'label', val )
									}
								/>

								<Button
									icon="no-alt"
									label={ __( 'Remove', 'twork-builder' ) }
									isDestructive
									isSmall
									onClick={ () => removeStat( index ) }
								/>
							</div>
						) ) }
						<Button variant="secondary" isSmall onClick={ addStat }>
							{ __( 'Add stat bubble', 'twork-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable fade-up classes',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
							help={ __(
								'Adds fade-up class to content and stats for GSAP/ScrollTrigger.',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				{ backgroundOverlayOpacity > 0 && (
					<div
						className="lab-hero-overlay"
						style={ {
							position: 'absolute',
							inset: 0,
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 1,
						} }
					/>
				) }

				<div className="lab-container" style={ containerStyle }>
					<div
						className={ `lab-hero-content ${
							animationOnScroll ? 'fade-up' : ''
						}` }
					>
						<RichText
							tagName="span"
							className="lab-hero-badge"
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
							placeholder={ __(
								'ISO 15189 Certified',
								'twork-builder'
							) }
						/>

						<RichText
							tagName="h1"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							multiline="br"
							placeholder={ __(
								'Precision Science, Accurate Diagnosis.',
								'twork-builder'
							) }
						/>

						<RichText
							tagName="p"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Advanced pathology services using world-class analyzers. Trusted by thousands for accurate and timely results.',
								'twork-builder'
							) }
						/>

						<div className="lab-hero-actions">
							<RichText
								tagName="a"
								className="lab-btn"
								value={ primaryButtonText }
								onChange={ ( val ) =>
									setAttributes( { primaryButtonText: val } )
								}
								placeholder={ __(
									'Check Prices',
									'twork-builder'
								) }
								href={ primaryButtonUrl || undefined }
							/>

							<RichText
								tagName="a"
								className="lab-btn lab-btn-outline"
								value={ secondaryButtonText }
								onChange={ ( val ) =>
									setAttributes( {
										secondaryButtonText: val,
									} )
								}
								placeholder={ __(
									'Home Visit',
									'twork-builder'
								) }
								href={ secondaryButtonUrl || undefined }
							/>
						</div>
					</div>

					<div
						className={ `lab-hero-stats ${
							animationOnScroll ? 'fade-up' : ''
						}` }
					>
						{ ( stats || [] ).map( ( item, index ) => (
							<div key={ index } className="lab-stat-bubble">
								<span>{ item?.value }</span>
								<small>{ item?.label }</small>
							</div>
						) ) }
					</div>
				</div>
			</header>
		</>
	);
}
