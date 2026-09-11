import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

import { sectionStyle } from './save';

function SectionPanel( { attributes, setAttributes } ) {
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

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		statement,
		intro,
		formLabel,
		formUrl,
		phoneLabel,
		phoneUrl,
		line1Title,
		line1Text,
		line2Title,
		line2Text,
		line3Title,
		line3Text,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-book',
			id: sectionId || undefined,
			style: sectionStyle( attributes ),
		} ),
		[
			sectionId,
			attributes.paddingTop,
			attributes.paddingBottom,
			attributes.containerMaxWidth,
		]
	);

	if ( showSection === false ) {
		return null;
	}

	const lines = [
		[ line1Title, line1Text ],
		[ line2Title, line2Text ],
		[ line3Title, line3Text ],
	].filter( ( line ) => line[ 0 ] || line[ 1 ] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<SectionPanel
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<PanelBody
						title={ __( 'Actions', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Form label', 'twork-builder' ) }
							value={ formLabel }
							onChange={ ( value ) =>
								setAttributes( { formLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Form URL', 'twork-builder' ) }
							help={ __(
								'Leave empty to hide the button. This block links out; it does not submit anything itself.',
								'twork-builder'
							) }
							value={ formUrl }
							onChange={ ( value ) =>
								setAttributes( { formUrl: value } )
							}
						/>
						<TextControl
							label={ __( 'Phone label', 'twork-builder' ) }
							value={ phoneLabel }
							onChange={ ( value ) =>
								setAttributes( { phoneLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Phone URL', 'twork-builder' ) }
							help={ __(
								'For example tel:+95…',
								'twork-builder'
							) }
							value={ phoneUrl }
							onChange={ ( value ) =>
								setAttributes( { phoneUrl: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Footer lines', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Line 1 title', 'twork-builder' ) }
							value={ line1Title }
							onChange={ ( value ) =>
								setAttributes( { line1Title: value } )
							}
						/>
						<TextControl
							label={ __( 'Line 1 text', 'twork-builder' ) }
							value={ line1Text }
							onChange={ ( value ) =>
								setAttributes( { line1Text: value } )
							}
						/>
						<TextControl
							label={ __( 'Line 2 title', 'twork-builder' ) }
							value={ line2Title }
							onChange={ ( value ) =>
								setAttributes( { line2Title: value } )
							}
						/>
						<TextControl
							label={ __( 'Line 2 text', 'twork-builder' ) }
							value={ line2Text }
							onChange={ ( value ) =>
								setAttributes( { line2Text: value } )
							}
						/>
						<TextControl
							label={ __( 'Line 3 title', 'twork-builder' ) }
							value={ line3Title }
							onChange={ ( value ) =>
								setAttributes( { line3Title: value } )
							}
						/>
						<TextControl
							label={ __( 'Line 3 text', 'twork-builder' ) }
							value={ line3Text }
							onChange={ ( value ) =>
								setAttributes( { line3Text: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<section { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-book-band">
						<div className="lp-book-in">
							<RichText
								tagName="h2"
								value={ statement }
								onChange={ ( value ) =>
									setAttributes( { statement: value } )
								}
								placeholder={ __(
									'Closing statement',
									'twork-builder'
								) }
							/>
							<RichText
								tagName="p"
								value={ intro }
								onChange={ ( value ) =>
									setAttributes( { intro: value } )
								}
								placeholder={ __(
									'What a consultation is for',
									'twork-builder'
								) }
							/>
							<div className="lp-book-actions">
								<span className="lp-btn lp-btn--primary">
									{ formLabel }
								</span>
								<span className="lp-btn lp-btn--outline">
									{ phoneLabel }
								</span>
							</div>
							{ lines.length > 0 && (
								<div className="lp-book-lines">
									{ lines.map( ( line ) => (
										<div key={ line[ 0 ] }>
											<strong>{ line[ 0 ] }</strong>
											{ line[ 1 ] }
										</div>
									) ) }
								</div>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
