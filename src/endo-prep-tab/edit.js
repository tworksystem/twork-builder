import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEndoPrepActivePanel } from '@twork-builder/shared/endo-prep-ui';

const ALLOWED_BLOCKS = [ 'twork/endo-prep-group' ];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const { showTab, tabLabel, panelKey, isDefaultActive } = attributes;

	const sectionClientId = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockRootClientId( clientId ),
		[ clientId ]
	);
	const activePanelKey = useEndoPrepActivePanel( sectionClientId );
	const isActive = activePanelKey
		? activePanelKey === ( panelKey || 'tab' )
		: isDefaultActive === true;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'endo-prep-tab mk-endo-prep-tab',
			'data-tab-key': panelKey || 'tab',
			'data-tab-label': tabLabel || '',
			'data-show-tab': showTab !== false ? '1' : '0',
			'data-editor-active': isActive ? '1' : '0',
		} ),
		[ panelKey, tabLabel, showTab, isActive ]
	);

	const panelClassName = isActive ? 'panel is-active' : 'panel';
	const { children: panelChildren, ...panelProps } = useInnerBlocksProps(
		{
			className: panelClassName,
			id: panelKey ? `panel-${ panelKey }` : undefined,
			'data-default-active': isDefaultActive === true ? '1' : '0',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	if ( showTab === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Prep Tab', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Tab', 'twork-builder' ) }
							checked={ showTab !== false }
							onChange={ ( value ) =>
								setAttributes( { showTab: value } )
							}
						/>
						<TextControl
							label={ __( 'Tab Label', 'twork-builder' ) }
							value={ tabLabel }
							onChange={ ( value ) =>
								setAttributes( { tabLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Panel Key', 'twork-builder' ) }
							value={ panelKey }
							onChange={ ( value ) =>
								setAttributes( { panelKey: value } )
							}
							help={ __(
								'Used for panel ID and tab data-panel (e.g. before).',
								'twork-builder'
							) }
						/>
						<ToggleControl
							label={ __( 'Default Active', 'twork-builder' ) }
							checked={ isDefaultActive === true }
							onChange={ ( value ) =>
								setAttributes( { isDefaultActive: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div { ...panelProps }>{ panelChildren }</div>
			</div>
		</>
	);
}
