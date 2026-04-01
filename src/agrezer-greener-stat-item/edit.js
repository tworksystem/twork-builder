import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { GreenerStatIcon } from './icons';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		// Icon-based schema (agrezer-derived variant)
		iconVariant,
		title,
		description,
		// Number-based schema (CSR-derived variant)
		statNumber,
		statLabel,
	} = attributes;

	const safeIconVariant = iconVariant ?? 'growth';
	const safeTitle = title ?? statLabel ?? ( statNumber ? String( statNumber ) : '' );
	const safeDescription = description ?? '';
	const blockProps = useStableBlockProps(
		() => ( { className: 'twork-greener-stat' } ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon style', 'twork-builder' ) }
							value={ iconVariant }
							options={ [
								{
									label: __(
										'Growth / leaf',
										'twork-builder'
									),
									value: 'growth',
								},
								{
									label: __(
										'Organic globe',
										'twork-builder'
									),
									value: 'organic',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconVariant: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<GreenerStatIcon variant={ safeIconVariant } />
				<RichText
					tagName="h3"
					className="twork-greener-stat__title"
					value={ safeTitle }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Stat title', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="twork-greener-stat__text"
					value={ safeDescription }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description…', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
