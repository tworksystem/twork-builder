import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/faq-accordion-item' ];
const TEMPLATE = [
	[
		'twork/faq-accordion-item',
		{
			itemId: 'faq_1',
			question: 'What products does Shwe Myanmar make?',
			answer: 'Premium butter and ghee.',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title, contactText, contactLinkLabel, contactHref } =
		attributes;
	const blockProps = useStableBlockProps( {
		className: 'faq-accordion-section',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'faq__list' },
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
					<TextControl
						label={ __( 'Contact text', 'twork-builder' ) }
						value={ contactText }
						onChange={ ( v ) =>
							setAttributes( { contactText: v } )
						}
					/>
					<TextControl
						label={ __( 'Contact link label', 'twork-builder' ) }
						value={ contactLinkLabel }
						onChange={ ( v ) =>
							setAttributes( { contactLinkLabel: v } )
						}
					/>
					<TextControl
						label={ __( 'Contact URL', 'twork-builder' ) }
						value={ contactHref }
						onChange={ ( v ) =>
							setAttributes( { contactHref: v } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="l-section">
					<header className="section-head">
						{ eyebrow && (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) }
						{ title && (
							<h2 className="section-head__title">{ title }</h2>
						) }
					</header>
					<div { ...innerBlocksProps } />
					{ contactText && (
						<p className="faq__contact">
							{ contactText }{ ' ' }
							<a href={ contactHref || '#' }>
								{ contactLinkLabel }
							</a>
						</p>
					) }
				</div>
			</div>
		</>
	);
}
