import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/dept-condition-item' ];
const TEMPLATE = [
	[
		'twork/dept-condition-item',
		{ icon: 'fa-heart-broken', title: 'Coronary Artery Disease' },
	],

	[ 'twork/dept-condition-item', { icon: 'fa-bolt', title: 'Arrhythmia' } ],
	[
		'twork/dept-condition-item',
		{ icon: 'fa-heartbeat', title: 'Heart Failure' },
	],

	[
		'twork/dept-condition-item',
		{ icon: 'fa-child', title: 'Congenital Defects' },
	],

	[
		'twork/dept-condition-item',
		{ icon: 'fa-procedures', title: 'Valvular Disease' },
	],

	[
		'twork/dept-condition-item',
		{ icon: 'fa-user-md', title: 'Hypertension' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { sectionId, title } = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section twork-dept-conditions-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Section', 'twork-builder' ) }>
						<TextControl
							label={ __( 'Section ID', 'twork-builder' ) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( { sectionId: v } )
							}
						/>

						<TextControl
							label={ __( 'Title', 'twork-builder' ) }
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps } id={ sectionId }>
				<h2>{ title }</h2>
				<div className="conditions-grid">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</section>
		</>
	);
}
