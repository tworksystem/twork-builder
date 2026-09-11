/**
 * Shared pieces for the laparoscopy legacy (pre-Wave 1) blocks.
 *
 * The shipped bundles inlined a copy of each of these into every block, which is
 * how they survived the loss of the original source. They are identical in every
 * copy, so they live here rather than in 19 block folders.
 */
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Wrapper style for a legacy section: vertical rhythm plus the container width
 * the inner grid reads off `--lp-container`.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Inline style object for the section wrapper.
 */
export function sectionStyle( attributes ) {
	const { paddingTop, paddingBottom, containerMaxWidth } = attributes;
	return {
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		'--lp-container': `${ containerMaxWidth }px`,
	};
}

/**
 * The "Section" inspector panel every legacy section block shares.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 */
export function SectionPanel( { attributes, setAttributes } ) {
	const {
		showSection,
		sectionId,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Section', 'twork-builder' ) }
			initialOpen={ true }
		>
			<ToggleControl
				label={ __( 'Show Section', 'twork-builder' ) }
				checked={ showSection !== false }
				onChange={ ( value ) =>
					setAttributes( { showSection: value } )
				}
			/>
			<TextControl
				label={ __( 'Section ID (anchor)', 'twork-builder' ) }
				value={ sectionId }
				onChange={ ( value ) => setAttributes( { sectionId: value } ) }
			/>
			<RangeControl
				label={ __( 'Padding Top (px)', 'twork-builder' ) }
				value={ paddingTop }
				onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
				min={ 0 }
				max={ 200 }
			/>
			<RangeControl
				label={ __( 'Padding Bottom (px)', 'twork-builder' ) }
				value={ paddingBottom }
				onChange={ ( value ) =>
					setAttributes( { paddingBottom: value } )
				}
				min={ 0 }
				max={ 200 }
			/>
			<RangeControl
				label={ __( 'Container Max Width (px)', 'twork-builder' ) }
				value={ containerMaxWidth }
				onChange={ ( value ) =>
					setAttributes( { containerMaxWidth: value } )
				}
				min={ 720 }
				max={ 1400 }
				step={ 20 }
			/>
		</PanelBody>
	);
}

/**
 * Condition keys that gate whether a child block shows for the selector's
 * current choice.
 *
 * @param {Object}   props
 * @param {string}   props.value    Current comma-separated keys.
 * @param {Function} props.onChange Change handler.
 */
export function ConditionsControl( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Shows for conditions', 'twork-builder' ) }
			value={ value || '' }
			onChange={ onChange }
			help={ __(
				'Comma-separated keys from the selector. Leave empty to always show.',
				'twork-builder'
			) }
		/>
	);
}
