import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showTab, tabLabel, panelKey, isDefaultActive } = attributes;

	if ( showTab === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'endo-prep-tab mk-endo-prep-tab',
		'data-tab-key': panelKey || '',
		'data-tab-label': tabLabel || '',
		'data-show-tab': showTab !== false ? '1' : '0',
	} );

	return (
		<div { ...blockProps }>
			<div
				className={
					isDefaultActive === true ? 'panel is-active' : 'panel'
				}
				id={ panelKey ? `panel-${ panelKey }` : undefined }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
