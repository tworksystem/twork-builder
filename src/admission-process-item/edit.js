import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		stepNumber,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		listItems,
		listItemColor,
		listItemFontSize,
		iconColor,
		stepNumberBgColor,
		stepNumberTextColor,
		stepNumberSize,
		cardPadding,
		cardPaddingMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-admission-process-item-editor process-card',
			style: {
				padding: `${ cardPadding }px 30px`,
				borderRadius: '12px',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				textAlign: 'center',
			},
		} ),
		[ cardPadding ]
	);

	const addListItem = () => {
		const newItem = {
			id: listItems.length
				? Math.max( ...listItems.map( ( i ) => i.id ) ) + 1
				: 1,
			text: __( 'New item', 'twork-builder' ),
		};
		setAttributes( { listItems: [ ...listItems, newItem ] } );
	};

	const updateListItem = ( id, text ) => {
		const updated = listItems.map( ( item ) =>
			item.id === id ? { ...item, text } : item
		);
		setAttributes( { listItems: updated } );
	};

	const removeListItem = ( id ) => {
		setAttributes( {
			listItems: listItems.filter( ( item ) => item.id !== id ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Step Number', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Step Number', 'twork-builder' ) }
							value={ stepNumber }
							onChange={ ( val ) =>
								setAttributes( { stepNumber: val } )
							}
							min={ 1 }
							max={ 99 }
							step={ 1 }
						/>

						<PanelColorSettings
							title={ __( 'Step Badge Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: stepNumberBgColor,
									onChange: ( val ) =>
										setAttributes( {
											stepNumberBgColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: stepNumberTextColor,
									onChange: ( val ) =>
										setAttributes( {
											stepNumberTextColor: val,
										} ),
									label: __( 'Text', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Badge Size (px)', 'twork-builder' ) }
							value={ stepNumberSize }
							onChange={ ( val ) =>
								setAttributes( { stepNumberSize: val } )
							}
							min={ 32 }
							max={ 80 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Checklist Items', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'List Items', 'twork-builder' ) }
						>
							{ listItems.map( ( item ) => (
								<div
									key={ item.id }
									style={ {
										marginBottom: '10px',
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
									} }
								>
									<TextControl
										value={ item.text }
										onChange={ ( val ) =>
											updateListItem( item.id, val )
										}
										style={ { flex: 1 } }
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () =>
											removeListItem( item.id )
										}
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addListItem }>
								{ __( 'Add Item', 'twork-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'List Text & Icon', 'twork-builder' ) }
							colorSettings={ [
								{
									value: listItemColor,
									onChange: ( val ) =>
										setAttributes( { listItemColor: val } ),
									label: __( 'Text Color', 'twork-builder' ),
								},
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'List Font Size (rem)',
								'twork-builder'
							) }
							value={ listItemFontSize }
							onChange={ ( val ) =>
								setAttributes( { listItemFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Padding', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Padding Desktop (px)',
								'twork-builder'
							) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Mobile (px)',
								'twork-builder'
							) }
							value={ cardPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { cardPaddingMobile: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="step-number"
					style={ {
						width: `${ stepNumberSize }px`,
						height: `${ stepNumberSize }px`,
						background: stepNumberBgColor,
						color: stepNumberTextColor,
						borderRadius: '50%',
						fontSize: `${ stepNumberSize * 0.4 }px`,
						fontWeight: 900,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '0 auto 20px',
					} }
				>
					{ stepNumber }
				</div>

				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Step title...', 'twork-builder' ) }
					style={ {
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
						margin: '0 0 15px',
					} }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __(
						'Short description...',
						'twork-builder'
					) }
					style={ {
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						marginBottom: '20px',
					} }
				/>

				{ listItems.length > 0 && (
					<ul
						className="process-list"
						style={ {
							textAlign: 'left',
							padding: 0,
							margin: 0,
							listStyle: 'none',
						} }
					>
						{ listItems.map( ( item ) => (
							<li
								key={ item.id }
								style={ {
									marginBottom: '12px',
									display: 'flex',
									alignItems: 'flex-start',
									fontSize: `${ listItemFontSize }rem`,
									color: listItemColor,
								} }
							>
								<i
									className="fas fa-check-circle"
									style={ {
										color: iconColor,
										marginRight: '10px',
										marginTop: '4px',
										flexShrink: 0,
									} }
									aria-hidden="true"
								/>

								<span>{ item.text }</span>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
