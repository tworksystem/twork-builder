import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	__experimentalDivider as ExperimentalDivider,
	Divider as StableDivider,
} from '@wordpress/components';

const Divider =
	StableDivider ||
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

const ALLOWED_BLOCKS = [ 'twork/phy-faq-item' ];
const TEMPLATE = [
	[
		'twork/phy-faq-item',
		{
			question: "Do I need a doctor's referral?",
			answer: 'While a referral is helpful, you can also book a direct consultation with our physiotherapists for assessment.',
		},
	],

	[
		'twork/phy-faq-item',
		{
			question: 'How long is a session?',
			answer: 'A typical session lasts between 45 to 60 minutes, depending on the treatment plan.',
		},
	],

	[
		'twork/phy-faq-item',
		{
			question: 'What should I wear?',
			answer: 'Please wear loose, comfortable clothing that allows easy movement and access to the injured area.',
		},
	],
];

const DEFAULT_ATTRS = {
	backgroundColor: 'transparent',
	paddingTop: 60,
	paddingBottom: 80,
	containerMaxWidth: 1280,
	containerPadding: 24,
	showSectionTitle: true,
	sectionTitle: 'Common Questions',
	headerAlign: 'center',
	contentMaxWidth: 800,
	animationOnScroll: true,
	animationType: 'fade-up',
	animationDelay: 100,
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		headerAlign,
		contentMaxWidth,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-section twork-phy-faq-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				position: 'relative',
			},
			'data-animation': animationOnScroll ? 'true' : 'false',
			'data-animation-type': animationType,
			'data-animation-delay': Number( animationDelay ),
		} ),
		[
			animationDelay,
			animationOnScroll,
			animationType,
			backgroundColor,
			paddingBottom,
			paddingTop,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const faqWrapperStyle = {
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
										'Background color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
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
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
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
							max={ 80 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'FAQ content max-width (px)',
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
							label={ __( 'Show title', 'twork-builder' ) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						<Divider />
						<SelectControl
							label={ __( 'Header alignment', 'twork-builder' ) }
							value={ headerAlign }
							options={ [
								{
									value: 'left',
									label: __( 'Left', 'twork-builder' ),
								},
								{
									value: 'center',
									label: __( 'Center', 'twork-builder' ),
								},
								{
									value: 'right',
									label: __( 'Right', 'twork-builder' ),
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									headerAlign: val || 'center',
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation type',
										'twork-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade up',
												'twork-builder'
											),
											value: 'fade-up',
										},
										{
											label: __(
												'Fade in',
												'twork-builder'
											),
											value: 'fade-in',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation delay (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 25 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="phy-container" style={ containerStyle }>
					{ showSectionTitle && (
						<div
							className={ `phy-header ${
								animationOnScroll ? animationType : ''
							}` }
							style={ {
								textAlign: headerAlign,
								maxWidth: 700,
								margin: '0 auto 30px',
							} }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Common Questions',
									'twork-builder'
								) }
							/>
						</div>
					) }

					<div
						className="phy-faq-wrapper fade-up"
						style={ faqWrapperStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
