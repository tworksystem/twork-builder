import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		categoryTitle,
		categoryTitleColor,
		categoryTitleFontSize,
		categoryBorderColor,
		categoryMarginBottom,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/job-card-item' ];
	const TEMPLATE = [
		[
			'twork/job-card-item',
			{
				jobTitle: 'Senior Staff Nurse (ICU)',
				location: 'Mandalay',
				employmentType: 'Full Time',
				departmentIcon: 'fas fa-stethoscope',
				department: 'Nursing Dept',
			},
		],

		[
			'twork/job-card-item',
			{
				jobTitle: 'Resident Medical Officer (RMO)',
				location: 'Mandalay',
				employmentType: 'Rotational Shift',
				departmentIcon: 'fas fa-user-md',
				department: 'Emergency Dept',
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-job-category-item-editor job-category',
			style: {
				marginBottom: `${ categoryMarginBottom }px`,
				border: '2px dashed #e0e0e0',
				padding: '20px',
				borderRadius: '8px',
			},
		} ),
		[ categoryMarginBottom ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Category Title', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: categoryTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											categoryTitleColor: val,
										} ),
									label: __( 'Title Color', 'twork-builder' ),
								},
								{
									value: categoryBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											categoryBorderColor: val,
										} ),
									label: __(
										'Left Border Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ categoryTitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { categoryTitleFontSize: val } )
							}
							min={ 1.2 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Margin Bottom (px)',
								'twork-builder'
							) }
							value={ categoryMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { categoryMarginBottom: val } )
							}
							min={ 30 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h3"
					value={ categoryTitle }
					onChange={ ( val ) =>
						setAttributes( { categoryTitle: val } )
					}
					placeholder={ __( 'Category title...', 'twork-builder' ) }
					className="cat-title"
					style={ {
						fontSize: `${ categoryTitleFontSize }rem`,
						color: categoryTitleColor,
						marginBottom: '25px',
						borderLeft: `5px solid ${ categoryBorderColor }`,
						paddingLeft: '15px',
					} }
				/>

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}
