import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { GreenerStatIcon } from './icons';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { iconVariant, title, description } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'agrezer-greener-stat' } ),
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
				<GreenerStatIcon variant={ iconVariant } />
				<RichText
					tagName="h3"
					className="agrezer-greener-stat__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Stat title', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="agrezer-greener-stat__text"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description…', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
