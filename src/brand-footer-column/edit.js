import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
} from '@wordpress/components';

const DEFAULT_LINK = { id: '', label: '', href: '' };

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, links } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'footer__column twork-brand-footer-column-editor',
		} ),
		[]
	);

	const updateLink = ( index, field, value ) => {
		const next = [ ...( links || [] ) ];
		if ( ! next[ index ] ) {
			next[ index ] = { ...DEFAULT_LINK };
		}
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes( { links: next } );
	};

	const addLink = () => {
		setAttributes( {
			links: [
				...( links || [] ),
				{
					...DEFAULT_LINK,
					id: 'link_' + Date.now(),
				},
			],
		} );
	};

	const removeLink = ( index ) => {
		setAttributes( {
			links: ( links || [] ).filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Links', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ( links || [] ).map( ( link, index ) => (
							<div
								key={ link.id || index }
								style={ {
									marginBottom: 12,
									paddingBottom: 12,
									borderBottom: '1px solid #ddd',
								} }
							>
								<TextControl
									label={ `${ __(
										'Label',
										'twork-builder'
									) } ${ index + 1 }` }
									value={ link.label || '' }
									onChange={ ( val ) =>
										updateLink( index, 'label', val )
									}
								/>
								<TextControl
									label={ __( 'URL', 'twork-builder' ) }
									value={ link.href || '' }
									onChange={ ( val ) =>
										updateLink( index, 'href', val )
									}
								/>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeLink( index ) }
								>
									{ __( 'Remove link', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addLink }>
							{ __( 'Add link', 'twork-builder' ) }
						</Button>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h3"
					className="footer__column-title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Column title…', 'twork-builder' ) }
				/>
				<nav className="footer__links">
					{ ( links || [] ).map( ( link, index ) => (
						<span key={ link.id || index } className="footer__link">
							{ link.label || __( 'Link', 'twork-builder' ) }
						</span>
					) ) }
				</nav>
			</div>
		</>
	);
}
