import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { iconClass, text } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'hc-check-list-item-editor',
		} ),
		[]
	);

	const raw = ( iconClass || 'fas fa-check-circle' ).trim();
	const parts = raw.split( /\s+/ ).filter( Boolean );
	const hasFa = parts.some(
		( p ) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
	);
	const iconClassResolved = hasFa ? raw : 'fas ' + raw;

	return (
		<>
			<PanelBody
				title={ __( 'List Item', 'twork-builder' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Icon class (Font Awesome)', 'twork-builder' ) }
					value={ iconClass || '' }
					onChange={ ( val ) =>
						setAttributes( {
							iconClass: val || 'fas fa-check-circle',
						} )
					}
					help={ __(
						'e.g. fas fa-check-circle, fas fa-check',
						'twork-builder'
					) }
				/>
			</PanelBody>
			<li { ...blockProps }>
				<i className={ iconClassResolved } aria-hidden="true" />
				<RichText
					tagName="span"
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __( 'List item text…', 'twork-builder' ) }
				/>
			</li>
		</>
	);
}
