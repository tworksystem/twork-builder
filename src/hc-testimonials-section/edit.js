import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/hc-testimonial-card' ];
const TEMPLATE = [
	[
		'twork/hc-testimonial-card',
		{
			starRating: 5,
			review: '"The home nursing team was incredible. They took care of my father like their own family. Highly recommended!"',
			clientName: 'U Kyaw Swar',
			clientLocation: 'Mandalay',
		},
	],

	[
		'twork/hc-testimonial-card',
		{
			starRating: 5,
			review: '"Very professional physiotherapy service. My recovery after surgery was much faster thanks to their home visits."',
			clientName: 'Daw Hla Hla',
			clientLocation: 'Chanmyathazi',
		},
	],

	[
		'twork/hc-testimonial-card',
		{
			starRating: 4.5,
			review: '"Convenient and reliable. The doctor arrived on time and was very thorough with the checkup."',
			clientName: 'Ko Aung',
			clientLocation: 'Amarapura',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		gap,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-section twork-hc-testimonials-section-editor',
			style: {
				backgroundColor: backgroundColor || '#fafafa',
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Background', 'twork-builder' ) }
								colorSettings={ [
									{
										value: backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Background Color',
											'twork-builder'
										),
									},
								] }
							/>
						) }
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 20 }
							max={ 120 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section title',
								'twork-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && PanelColorSettings && (
							<PanelColorSettings
								title={ __( 'Header colors', 'twork-builder' ) }
								colorSettings={ [
									{
										value: sectionTitleColor,
										onChange: ( val ) =>
											setAttributes( {
												sectionTitleColor: val,
											} ),
										label: __(
											'Title color',
											'twork-builder'
										),
									},
									{
										value: sectionSubtitleColor,
										onChange: ( val ) =>
											setAttributes( {
												sectionSubtitleColor: val,
											} ),
										label: __(
											'Subtitle color',
											'twork-builder'
										),
									},
								] }
							/>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Animation on scroll',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<TextControl
								label={ __(
									'Animation class',
									'twork-builder'
								) }
								value={ animationType }
								onChange={ ( val ) =>
									setAttributes( {
										animationType: val || 'fade-up',
									} )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="hc-container" style={ containerStyle }>
					{ showSectionTitle && (
						<div
							className={ `hc-header ${
								animationOnScroll ? animationType : ''
							}` }
							style={ {
								textAlign: 'center',
								maxWidth: 700,
								margin: '0 auto 50px',
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'What Families Say',
									'twork-builder'
								) }
								style={ {
									color: sectionTitleColor || '#212121',
									marginBottom: 15,
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'Real stories from our patients.',
									'twork-builder'
								) }
								style={ {
									color: sectionSubtitleColor || '#555',
									margin: 0,
								} }
							/>
						</div>
					) }
					<div className="hc-testi-grid" style={ gridStyle }>
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
