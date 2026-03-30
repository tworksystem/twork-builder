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

const ALLOWED_BLOCKS = [ 'twork/phy-therapy-card' ];
const TEMPLATE = [
	[
		'twork/phy-therapy-card',
		{
			imageUrl:
				'https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&w=600&q=80',
			title: 'Manual Therapy',
			description:
				'Hands-on techniques to mobilize joints and soft tissues, reducing pain and increasing range of motion.',
		},
	],

	[
		'twork/phy-therapy-card',
		{
			imageUrl:
				'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
			title: 'Electrotherapy',
			description:
				'Using advanced modalities like Ultrasound, TENS, and IFT to manage pain and stimulate muscle healing.',
		},
	],

	[
		'twork/phy-therapy-card',
		{
			imageUrl:
				'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=600&q=80',
			title: 'Exercise Therapy',
			description:
				'Customized exercise plans to strengthen muscles, improve balance, and prevent re-injury.',
		},
	],

	[
		'twork/phy-therapy-card',
		{
			imageUrl:
				'https://plus.unsplash.com/premium_photo-1661281397737-9b5d75902230?auto=format&fit=crop&w=600&q=80',
			title: 'Post-Op Rehab',
			description:
				'Specialized care after surgeries like knee replacement or hip replacement to get you back on your feet.',
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
	sectionTitle: 'Our Therapies',
	showSectionSubtitle: true,
	sectionSubtitle: 'A multimodal approach to faster recovery.',
	headerAlign: 'center',
	gap: 20,
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
		showSectionSubtitle,
		sectionSubtitle,
		headerAlign,
		gap,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'phy-section twork-phy-therapies-section-editor',
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

	const gridStyle = {
		display: 'flex',
		gap: `${ gap }px`,
		minHeight: 400,
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

						<ToggleControl
							label={ __( 'Show description', 'twork-builder' ) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
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

			<section { ...blockProps } id="services">
				<div className="phy-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className={ `phy-header ${
								animationOnScroll ? animationType : ''
							}` }
							style={ {
								textAlign: headerAlign,
								maxWidth: 700,
								margin: '0 auto 50px',
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Our Therapies',
										'twork-builder'
									) }
								/>
							) }
							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'A multimodal approach to faster recovery.',
										'twork-builder'
									) }
								/>
							) }
						</div>
					) }

					<div
						className="phy-services-grid phy-services-grid-editor"
						style={ gridStyle }
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
