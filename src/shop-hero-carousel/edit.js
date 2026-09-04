import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	RangeControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { slides, autoplayMs } = attributes;
	const slide = ( slides || [] )[ 0 ] || {};
	const blockProps = useStableBlockProps( { className: 'shop-hero' } );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Slides (JSON)', 'twork-builder' ) }>
					<TextareaControl
						value={ JSON.stringify( slides, null, 2 ) }
						onChange={ ( v ) => {
							try {
								setAttributes( { slides: JSON.parse( v ) } );
							} catch ( e ) {}
						} }
						rows={ 8 }
					/>
					<RangeControl
						label={ __( 'Autoplay ms', 'twork-builder' ) }
						value={ autoplayMs }
						onChange={ ( v ) => setAttributes( { autoplayMs: v } ) }
						min={ 0 }
						max={ 12000 }
						step={ 500 }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps } data-block="twork/shop-hero-carousel">
				<div className="shop-hero__wrap">
					<h1>{ slide.title }</h1>
					<p>{ slide.subtitle }</p>
				</div>
			</section>
		</>
	);
}
