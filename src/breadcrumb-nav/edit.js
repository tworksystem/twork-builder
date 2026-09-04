import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { items } = attributes;
	const blockProps = useStableBlockProps( { className: 'breadcrumb' } );
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Breadcrumb items (JSON)', 'twork-builder' ) }
				>
					<TextareaControl
						label={ __( 'Items', 'twork-builder' ) }
						value={ JSON.stringify( items, null, 2 ) }
						onChange={ ( v ) => {
							try {
								setAttributes( { items: JSON.parse( v ) } );
							} catch ( e ) {
								/* ignore */
							}
						} }
						rows={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
			<nav { ...blockProps } aria-label="Breadcrumb">
				<div className="breadcrumb__inner l-section">
					<ol className="breadcrumb__list">
						<li className="breadcrumb__item">
							{ ( items || [] ).map( ( item, i ) => (
								<span key={ item.id }>
									{ i > 0 && (
										<span className="breadcrumb__sep">
											{ ' ' }
											/{ ' ' }
										</span>
									) }
									{ i === items.length - 1 ? (
										<span className="breadcrumb__current">
											{ item.label }
										</span>
									) : (
										<a href={ item.href }>{ item.label }</a>
									) }
								</span>
							) ) }
						</li>
					</ol>
				</div>
			</nav>
		</>
	);
}
