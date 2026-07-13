import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		clauseNumber,
		clauseTitle,
		clauseParagraphs,
		clauseItems,
		showClause,
	} = attributes;

	const paragraphs = Array.isArray( clauseParagraphs )
		? clauseParagraphs
		: [];
	const items = Array.isArray( clauseItems ) ? clauseItems : [];

	const blockProps = useStableBlockProps(
		() => ( {
			className: `ipd-consent-clause mk-ipd-consent-clause-editor${
				showClause === false ? ' is-clause-hidden' : ''
			}`,
		} ),
		[ showClause ]
	);

	const updateParagraph = ( index, value ) => {
		const next = [ ...paragraphs ];
		next[ index ] = value;
		setAttributes( { clauseParagraphs: next } );
	};

	const addParagraph = () => {
		setAttributes( {
			clauseParagraphs: [ ...paragraphs, '' ],
		} );
	};

	const updateItem = ( index, field, value ) => {
		const next = items.map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { clauseItems: next } );
	};

	const addItem = () => {
		setAttributes( {
			clauseItems: [
				...items,
				{
					id: Date.now(),
					number: '',
					text: '',
				},
			],
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Clause Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Clause', 'twork-builder' ) }
							checked={ showClause !== false }
							onChange={ ( val ) =>
								setAttributes( { showClause: val } )
							}
							help={ __(
								'Turn off to hide this clause on the frontend.',
								'twork-builder'
							) }
						/>
						<TextControl
							label={ __( 'Clause Number', 'twork-builder' ) }
							value={ clauseNumber || '' }
							onChange={ ( val ) =>
								setAttributes( { clauseNumber: val } )
							}
						/>
						<Button variant="secondary" onClick={ addParagraph }>
							{ __( 'Add Paragraph', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ addItem }
							style={ { marginLeft: '8px' } }
						>
							{ __( 'Add Sub-clause', 'twork-builder' ) }
						</Button>
					</PanelBody>
					{ paragraphs.map( ( paragraph, index ) => (
						<PanelBody
							key={ `para-${ index }` }
							title={ `${ __( 'Paragraph', 'twork-builder' ) } ${ index + 1 }` }
							initialOpen={ false }
						>
							<TextareaControl
								value={ paragraph }
								onChange={ ( val ) =>
									updateParagraph( index, val )
								}
								rows={ 4 }
							/>
						</PanelBody>
					) ) }
					{ items.map( ( item, index ) => (
						<PanelBody
							key={ item.id || index }
							title={ `${ __( 'Sub-clause', 'twork-builder' ) } ${ item.number || index + 1 }` }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'Number', 'twork-builder' ) }
								value={ item.number || '' }
								onChange={ ( val ) =>
									updateItem( index, 'number', val )
								}
							/>
							<TextareaControl
								label={ __( 'Text', 'twork-builder' ) }
								value={ item.text || '' }
								onChange={ ( val ) =>
									updateItem( index, 'text', val )
								}
								rows={ 5 }
							/>
						</PanelBody>
					) ) }
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ showClause === false && ! isSelected && (
					<p className="ipd-consent-clause__hidden-label">
						{ __( 'Clause hidden on frontend', 'twork-builder' ) }
					</p>
				) }
				<header className="ipd-consent-clause__header">
					<span className="ipd-consent-clause__number">
						{ clauseNumber }
					</span>
					<RichText
						tagName="h3"
						className="ipd-consent-clause__title"
						value={ clauseTitle }
						onChange={ ( val ) =>
							setAttributes( { clauseTitle: val } )
						}
						placeholder={ __( 'Clause title…', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				</header>

				{ paragraphs.map( ( paragraph, index ) => (
					<RichText
						key={ `p-${ index }` }
						tagName="p"
						className="ipd-consent-clause__paragraph"
						value={ paragraph }
						onChange={ ( val ) => updateParagraph( index, val ) }
						placeholder={ __( 'Paragraph…', 'twork-builder' ) }
					/>
				) ) }

				{ items.length > 0 && (
					<ol className="ipd-consent-clause__items">
						{ items.map( ( item, index ) => (
							<li
								key={ item.id || index }
								className="ipd-consent-clause__item"
							>
								<TextControl
									className="ipd-consent-clause__item-number-input"
									value={ item.number || '' }
									onChange={ ( val ) =>
										updateItem( index, 'number', val )
									}
									placeholder="၁.၁"
								/>
								<RichText
									tagName="span"
									className="ipd-consent-clause__item-text"
									value={ item.text }
									onChange={ ( val ) =>
										updateItem( index, 'text', val )
									}
									placeholder={ __(
										'Sub-clause text…',
										'twork-builder'
									) }
								/>
							</li>
						) ) }
					</ol>
				) }
			</article>
		</>
	);
}
