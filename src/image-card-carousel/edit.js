import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/image-card-slide' ];
const TEMPLATE = [
	[
		'twork/image-card-slide',
		{
			itemId: 'svc_1',
			title: 'Butter & Ghee Production',
			ctaLabel: 'Learn more',
			href: '#categories',
		},
	],
	[
		'twork/image-card-slide',
		{
			itemId: 'svc_2',
			title: 'Quality Control',
			ctaLabel: 'Learn more',
			href: '/quality/',
		},
	],
	[
		'twork/image-card-slide',
		{
			itemId: 'svc_3',
			title: 'Nationwide Distribution',
			ctaLabel: 'Learn more',
			href: '/where-to-buy/',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'services-carousel',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'services-carousel__track', 'data-list': 'items' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } aria-label="Our services">
				<div className="services-carousel__inner l-section">
					<header className="section-head">
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						{ title ? (
							<h2 className="section-head__title">{ title }</h2>
						) : null }
					</header>
					<div
						className="services-carousel__stage"
						role="region"
						aria-label="Core services"
					>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</section>
		</>
	);
}
