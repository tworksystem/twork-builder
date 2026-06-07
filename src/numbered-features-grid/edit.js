import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/numbered-feature-item' ];
const TEMPLATE = [
	[
		'twork/numbered-feature-item',
		{
			number: '01',
			title: 'Natural Ingredients',
			text: 'သဘာဝ အနံ့ သဘာဝ အရသာ — we use carefully selected natural ingredients to deliver authentic butter and ghee flavor.',
			iconKey: 'cube',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			number: '02',
			title: 'Consistent Quality',
			text: 'Every batch from our Mandalay facility meets strict quality standards so your family gets the same great taste every time.',
			iconKey: 'star',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			number: '03',
			title: 'Trusted Brand',
			text: 'Shwe Myanmar (ရွှေမြန်မာ) is a registered trademark — a name households across Myanmar recognize and trust.',
			iconKey: 'truck',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			number: '04',
			title: 'Fair Pricing',
			text: 'Premium quality butter and ghee at prices that make everyday cooking accessible for families and businesses alike.',
			iconKey: 'tag',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			number: '05',
			title: 'Multiple Pack Sizes',
			text: 'From 1 Viss retail packs to our flagship 10 Viss bulk size — options for home kitchens and commercial use.',
			iconKey: 'cherry',
		},
	],
	[
		'twork/numbered-feature-item',
		{
			number: '06',
			title: 'Mandalay Origin',
			text: 'Proudly produced in Mandalay, Myanmar — bringing the heritage and craftsmanship of our region to every product.',
			iconKey: 'cert',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionEyebrow,
		sectionTitle,
		columns,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'why-choose-us twork-numbered-features-grid-editor',
			style: {
				backgroundColor: backgroundColor || '#ffffff',
				paddingTop: `${ padding }px`,
				paddingBottom: `${ padding }px`,
				'--why-choose-columns': columns,
			},
		} ),
		[ backgroundColor, columns, padding ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
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
							label={ __( 'Padding (px)', 'twork-builder' ) }
							value={ padding }
							onChange={ ( val ) =>
								setAttributes( { padding: val } )
							}
							min={ 20 }
							max={ 160 }
							step={ 5 }
						/>
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
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="why-choose-us__inner l-section"
					style={ containerStyle }
				>
					<header className="section-head">
						<RichText
							tagName="p"
							className="section-head__eyebrow"
							value={ sectionEyebrow }
							onChange={ ( val ) =>
								setAttributes( { sectionEyebrow: val } )
							}
							placeholder={ __(
								'Section eyebrow…',
								'twork-builder'
							) }
						/>
						<RichText
							tagName="h2"
							className="section-head__title"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'Section title…',
								'twork-builder'
							) }
						/>
					</header>

					<div
						className="why-choose-us__grid"
						data-list="items"
						style={ gridStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={
								InnerBlocks.ButtonBlockAppender
							}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
