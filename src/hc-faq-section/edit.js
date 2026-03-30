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

const ALLOWED_BLOCKS = [ 'twork/hc-faq-item' ];
const TEMPLATE = [
	[
		'twork/hc-faq-item',
		{
			question: 'Is the service available 24/7?',
			answer: 'Yes, our nursing and doctor visit services can be arranged for any time of the day, depending on availability.',
		},
	],

	[
		'twork/hc-faq-item',
		{
			question: 'Do you bring your own equipment?',
			answer: 'Yes, our team comes equipped with basic diagnostic tools (BP machine, Oximeter, etc.). For specialized equipment like Oxygen concentrators, we offer rental services.',
		},
	],

	[
		'twork/hc-faq-item',
		{
			question: 'How do I pay?',
			answer: 'We accept cash, KPay, WavePay, and major credit cards upon completion of the service or via advance booking.',
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
		contentMaxWidth,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-section twork-hc-faq-section-editor',
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

	const innerStyle = {
		maxWidth: `${ contentMaxWidth }px`,
		margin: '0 auto',
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

						<RangeControl
							label={ __(
								'FAQ list max width (px)',
								'twork-builder'
							) }
							value={ contentMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { contentMaxWidth: val } )
							}
							min={ 400 }
							max={ 1000 }
							step={ 20 }
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
								title={ __( 'Title color', 'twork-builder' ) }
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
								] }
							/>
						) }
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
							style={ { textAlign: 'center', marginBottom: 30 } }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Frequently Asked Questions',
									'twork-builder'
								) }
								style={ {
									color: sectionTitleColor || '#212121',
								} }
							/>
						</div>
					) }
					<div style={ innerStyle }>
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
