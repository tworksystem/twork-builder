import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaUploadCheck,
	MediaUpload,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionCategory,
		sectionTitle,
		timelineItems,
		timelineBg,
		activeIndex, // Add activeIndex to attributes
	} = attributes;

	const openIndex = typeof activeIndex === 'number' ? activeIndex : 0;

	const updateItem = useCallback(
		( value, index, field ) => {
			const newItems = [ ...timelineItems ];
			newItems[ index ] = { ...newItems[ index ], [ field ]: value };
			setAttributes( { timelineItems: newItems } );
		},
		[ timelineItems, setAttributes ]
	);

	const addItem = useCallback( () => {
		const newItems = [
			...timelineItems,
			{
				year: '0000',
				heading: 'heading',
				description: 'description',
				imgUrl: 'https://placehold.co/600x400',
				address: 'address',
				years: 'years....',
			},
		];
		setAttributes( {
			timelineItems: newItems,
			activeIndex: newItems.length - 1,
		} );
	}, [ timelineItems, setAttributes ] );

	const removeItem = useCallback(
		( index ) => {
			const newItems = timelineItems.filter( ( _, i ) => i !== index );
			const cur = typeof activeIndex === 'number' ? activeIndex : 0;
			let nextActive = cur;
			if ( cur === index ) {
				nextActive =
					newItems.length > 0 ? Math.max( 0, index - 1 ) : -1;
			} else if ( cur > index ) {
				nextActive = cur - 1;
			}
			setAttributes( {
				timelineItems: newItems,
				activeIndex: nextActive,
			} );
		},
		[ timelineItems, activeIndex, setAttributes ]
	);

	const toggleAccordion = useCallback(
		( index ) => {
			const next = openIndex === index ? -1 : index;
			setAttributes( { activeIndex: next } );
		},
		[ openIndex, setAttributes ]
	);

	const changeSectionCategory = useCallback(
		( val ) => {
			setAttributes( { sectionCategory: val } );
		},
		[ setAttributes ]
	);

	const changeSectionTitle = useCallback(
		( val ) => {
			setAttributes( { sectionTitle: val } );
		},
		[ setAttributes ]
	);

	const blockProps = useStableBlockProps( () => ( {} ), [] );

	return (
		<div { ...blockProps }>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title="Timeline Section Controls"
						initialOpen={ true }
					>
						<TextControl
							label="Section Category Name"
							value={ sectionCategory }
							onChange={ changeSectionCategory }
						/>
						<TextControl
							label="Section Main Title"
							value={ sectionTitle }
							onChange={ changeSectionTitle }
						/>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										timelineBg: media.url,
										timelineBgId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ attributes.timelineBgId }
								render={ ( { open } ) => (
									<div>
										{ timelineBg && (
											<img
												src={ timelineBg }
												alt=""
												style={ {
													width: '100%',
													marginBottom: '10px',
												} }
											/>
										) }
										<Button
											variant="primary"
											onClick={ open }
											icon="upload"
											style={ {
												width: '100%',
												marginBottom: '10px',
											} }
										>
											{ timelineBg
												? __(
														'Change Background Image',
														'twork-builder'
												  )
												: __(
														'Upload Background Image',
														'twork-builder'
												  ) }
										</Button>
										{ timelineBg && (
											<Button
												isDestructive
												onClick={ () =>
													setAttributes( {
														timelineBg: '',
														timelineBgId: null,
													} )
												}
												icon="trash"
												variant="secondary"
												style={ { width: '100%' } }
											>
												{ __(
													'Remove Background',
													'twork-builder'
												) }
											</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>
						<Button
							variant="primary"
							onClick={ addItem }
							icon="insert"
							style={ { marginBottom: '20px' } }
						>
							Add New Timeline
						</Button>
						{ timelineItems.map( ( item, index ) => (
							<div key={ index }>
								<PanelBody
									title={ item.year }
									initialOpen={ openIndex === index }
								>
									<TextControl
										label="Year Title"
										value={ item.year }
										onChange={ ( value ) =>
											updateItem( value, index, 'year' )
										}
										placeholder="Enter Title Year"
									/>
									<TextControl
										label="Address"
										value={ item.address }
										onChange={ ( value ) =>
											updateItem(
												value,
												index,
												'address'
											)
										}
										placeholder="Enter Address"
									/>
									<TextControl
										label="Year - Year"
										value={ item.years }
										onChange={ ( value ) =>
											updateItem( value, index, 'years' )
										}
										placeholder="Enter Year - Year"
									/>
									<TextControl
										label="title"
										value={ item.heading }
										onChange={ ( value ) =>
											updateItem(
												value,
												index,
												'heading'
											)
										}
										placeholder="Enter Heading"
									/>
									<TextareaControl
										label="Description"
										value={ item.description }
										onChange={ ( value ) =>
											updateItem(
												value,
												index,
												'description'
											)
										}
										placeholder="Enter Description"
									/>
									{ item.imgUrl && (
										<img
											src={ item.imgUrl }
											alt={ __(
												'Timeline item image',
												'twork-builder'
											) }
											style={ {
												width: '100%',
												marginBottom: '10px',
											} }
										/>
									) }
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( media ) =>
												updateItem(
													media.url,
													index,
													'imgUrl'
												)
											}
											allowedTypes={ [ 'image' ] }
											render={ ( { open } ) => (
												<Button
													variant="primary"
													onClick={ open }
													style={ {
														marginTop: '5px',
														width: '100%',
													} }
													icon="upload"
													size="small"
												>
													{ item.imgUrl
														? __(
																'Change Image',
																'twork-builder'
														  )
														: __(
																'Upload Image',
																'twork-builder'
														  ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									<Button
										isDestructive
										onClick={ () => removeItem( index ) }
										icon="trash"
										variant="secondary"
										style={ {
											marginTop: '15x',
											width: '100%',
										} }
										size="small"
									>
										Remove Item
									</Button>
								</PanelBody>
							</div>
						) ) }
					</PanelBody>
				</InspectorControls>
			) }

			<section className="timeline-section">
				<div className="service-blue-text-wrapper">
					<RichText
						tagName="div"
						className="category-title"
						value={ sectionCategory }
						onChange={ changeSectionCategory }
					/>
					<RichText
						tagName="div"
						className="main-title"
						value={ sectionTitle }
						onChange={ changeSectionTitle }
					/>
				</div>

				<div
					className="timeline-wrapper"
					style={ { backgroundImage: `url(${ timelineBg })` } }
				>
					<div className="timeline">
						<div className="accordion">
							{ timelineItems.map( ( item, index ) => (
								<div key={ index } className="accordion-item">
									<div
										className={ `accordion-header ${
											openIndex === index ? 'active' : ''
										}` }
										onClick={ () =>
											toggleAccordion( index )
										}
									>
										{ /* <RichText
											tagName="div"
											value={item.year}
											onChange={(value) => updateItem(value, index, 'year')}
											placeholder="Enter Year"
										/> */ }
										<div className="number">
											{ item.year }
											<span className="mobile-arrow-icon">
												<svg
													width="8"
													height="10"
													viewBox="0 0 8 10"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M1.53857 8.6698L6.46147 5.03804"
														stroke="#003594"
														stroke-width="2"
														stroke-miterlimit="10"
														stroke-linecap="round"
													/>
													<path
														d="M1.53857 1.33729L6.46147 4.97595"
														stroke="#003594"
														stroke-width="2"
														stroke-miterlimit="10"
														stroke-linecap="round"
													/>
												</svg>
											</span>
										</div>
										<span className="dot"></span>
									</div>
									<div
										className="accordion-content"
										style={ {
											maxHeight:
												openIndex === index
													? '500px'
													: '0',
											opacity:
												openIndex === index ? '1' : '0',
											transition:
												'max-height 0.3s ease, opacity 0.3s ease',
											overflow: 'hidden',
										} }
									>
										<div className="wrapper">
											<div className="left-content">
												{ item.imgUrl && (
													<img
														src={ item.imgUrl }
														alt={ __(
															'Timeline item image',
															'twork-builder'
														) }
														style={ {
															width: '100%',
														} }
														className="timeline-img"
													/>
												) }

												{ /* <div style={{backgroundImage: `url(${item.imgUrl ? item.imgUrl : 'https://placehold.co/600x400'})`}} className="timeline-img"></div> */ }
												<div className="caption">
													<RichText
														tagName="div"
														value={ item.address }
														onChange={ ( value ) =>
															updateItem(
																value,
																index,
																'address'
															)
														}
														placeholder="Enter Address"
														className="address"
													/>
													<RichText
														tagName="div"
														value={ item.years }
														onChange={ ( value ) =>
															updateItem(
																value,
																index,
																'years'
															)
														}
														placeholder="Enter Years"
														className="years"
													/>
												</div>
											</div>
											<div className="right-content">
												<RichText
													tagName="div"
													value={ item.heading }
													onChange={ ( value ) =>
														updateItem(
															value,
															index,
															'heading'
														)
													}
													placeholder="Enter Heading"
													className="heading"
												/>
												<RichText
													tagName="p"
													value={ item.description }
													onChange={ ( value ) =>
														updateItem(
															value,
															index,
															'description'
														)
													}
													placeholder="Enter Description"
													className="desc"
												/>
											</div>
										</div>
									</div>
								</div>
							) ) }
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
