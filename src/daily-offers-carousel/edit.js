import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { sectionTitle, numberOfItems } = attributes;
	const blockProps = useStableBlockProps( { className: 'daily-offers' } );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Products', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ sectionTitle }
						onChange={ ( v ) =>
							setAttributes( { sectionTitle: v } )
						}
					/>
					<RangeControl
						label={ __( 'Items', 'twork-builder' ) }
						value={ numberOfItems }
						onChange={ ( v ) =>
							setAttributes( { numberOfItems: v } )
						}
						min={ 1 }
						max={ 12 }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="l-section">
					<h2>{ sectionTitle }</h2>
					<p>
						{ __(
							'WooCommerce products render on frontend.',
							'twork-builder'
						) }
					</p>
				</div>
			</section>
		</>
	);
}
