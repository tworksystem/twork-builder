import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
	__experimentalDivider as Divider
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		sectionAlignment,
		categoryTitle,
		categoryColor,
		categoryFontSize,
		categoryLetterSpacing,
		showCategory,
		mainTitle,
		mainTitleColor,
		mainTitleFontSize,
		mainTitleFontWeight,
		mainTitleLineHeight,
		description,
		descriptionColor,
		descriptionFontSize,
		descriptionMaxWidth
	} = attributes;

	const blockProps = useBlockProps({
		className: 'twork-text-heading-and-content-editor',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`
		}
	});

	const containerStyle = {
		maxWidth: `${containerMaxWidth}px`,
		margin: '0 auto',
		padding: `0 ${containerPadding}px`,
		textAlign: sectionAlignment
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Section Background & Spacing', 'twork-builder')}
					initialOpen={true}
				>
					<PanelColorSettings
						title={__('Background Color', 'twork-builder')}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (val) => setAttributes({ backgroundColor: val }),
								label: __('Background Color', 'twork-builder')
							}
						]}
					/>

					<Divider />

					<RangeControl
						label={__('Padding Top (px)', 'twork-builder')}
						value={paddingTop}
						onChange={(val) => setAttributes({ paddingTop: val })}
						min={0}
						max={200}
						step={5}
					/>

					<RangeControl
						label={__('Padding Bottom (px)', 'twork-builder')}
						value={paddingBottom}
						onChange={(val) => setAttributes({ paddingBottom: val })}
						min={0}
						max={200}
						step={5}
					/>
				</PanelBody>

				<PanelBody
					title={__('Container Settings', 'twork-builder')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Max Width (px)', 'twork-builder')}
						value={containerMaxWidth}
						onChange={(val) => setAttributes({ containerMaxWidth: val })}
						min={800}
						max={1920}
						step={10}
					/>

					<RangeControl
						label={__('Horizontal Padding (px)', 'twork-builder')}
						value={containerPadding}
						onChange={(val) => setAttributes({ containerPadding: val })}
						min={0}
						max={100}
						step={5}
					/>

					<SelectControl
						label={__('Text Alignment', 'twork-builder')}
						value={sectionAlignment}
						options={[
							{ label: __('Left', 'twork-builder'), value: 'left' },
							{ label: __('Center', 'twork-builder'), value: 'center' },
							{ label: __('Right', 'twork-builder'), value: 'right' }
						]}
						onChange={(val) => setAttributes({ sectionAlignment: val })}
					/>
				</PanelBody>

				<PanelBody
					title={__('Category Label', 'twork-builder')}
					initialOpen={false}
				>
					<SelectControl
						label={__('Show Category', 'twork-builder')}
						value={showCategory ? 'yes' : 'no'}
						options={[
							{ label: __('Show', 'twork-builder'), value: 'yes' },
							{ label: __('Hide', 'twork-builder'), value: 'no' }
						]}
						onChange={(val) => setAttributes({ showCategory: val === 'yes' })}
					/>

					{showCategory && (
						<>
							<TextControl
								label={__('Category Title', 'twork-builder')}
								value={categoryTitle}
								onChange={(val) => setAttributes({ categoryTitle: val })}
							/>

							<PanelColorSettings
								title={__('Category Color', 'twork-builder')}
								colorSettings={[
									{
										value: categoryColor,
										onChange: (val) => setAttributes({ categoryColor: val }),
										label: __('Category Color', 'twork-builder')
									}
								]}
							/>

							<RangeControl
								label={__('Font Size (rem)', 'twork-builder')}
								value={categoryFontSize}
								onChange={(val) => setAttributes({ categoryFontSize: val })}
								min={0.8}
								max={2}
								step={0.05}
							/>

							<RangeControl
								label={__('Letter Spacing (px)', 'twork-builder')}
								value={categoryLetterSpacing}
								onChange={(val) => setAttributes({ categoryLetterSpacing: val })}
								min={0}
								max={10}
								step={0.5}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody
					title={__('Main Title', 'twork-builder')}
					initialOpen={false}
				>
					<TextControl
						label={__('Main Title', 'twork-builder')}
						value={mainTitle}
						onChange={(val) => setAttributes({ mainTitle: val })}
					/>

					<PanelColorSettings
						title={__('Title Color', 'twork-builder')}
						colorSettings={[
							{
								value: mainTitleColor,
								onChange: (val) => setAttributes({ mainTitleColor: val }),
								label: __('Title Color', 'twork-builder')
							}
						]}
					/>

					<RangeControl
						label={__('Font Size (rem)', 'twork-builder')}
						value={mainTitleFontSize}
						onChange={(val) => setAttributes({ mainTitleFontSize: val })}
						min={1.5}
						max={4}
						step={0.1}
					/>

					<RangeControl
						label={__('Font Weight', 'twork-builder')}
						value={mainTitleFontWeight}
						onChange={(val) => setAttributes({ mainTitleFontWeight: val })}
						min={100}
						max={900}
						step={100}
					/>

					<RangeControl
						label={__('Line Height', 'twork-builder')}
						value={mainTitleLineHeight}
						onChange={(val) => setAttributes({ mainTitleLineHeight: val })}
						min={1}
						max={2}
						step={0.1}
					/>
				</PanelBody>

				<PanelBody
					title={__('Description', 'twork-builder')}
					initialOpen={false}
				>
					<TextareaControl
						label={__('Description', 'twork-builder')}
						value={description}
						onChange={(val) => setAttributes({ description: val })}
					/>

					<PanelColorSettings
						title={__('Description Color', 'twork-builder')}
						colorSettings={[
							{
								value: descriptionColor,
								onChange: (val) => setAttributes({ descriptionColor: val }),
								label: __('Description Color', 'twork-builder')
							}
						]}
					/>

					<RangeControl
						label={__('Font Size (rem)', 'twork-builder')}
						value={descriptionFontSize}
						onChange={(val) => setAttributes({ descriptionFontSize: val })}
						min={0.9}
						max={2}
						step={0.05}
					/>

					<RangeControl
						label={__('Max Width (px)', 'twork-builder')}
						value={descriptionMaxWidth}
						onChange={(val) => setAttributes({ descriptionMaxWidth: val })}
						min={400}
						max={1200}
						step={20}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="service-blue-text-wrapper career-text" style={{ backgroundColor }}>
				<div className="uk-container" style={containerStyle}>
					{showCategory && categoryTitle && (
						<RichText
							tagName="div"
							className="category-title"
							value={categoryTitle}
							onChange={(val) => setAttributes({ categoryTitle: val })}
							style={{
								color: categoryColor,
								fontSize: `${categoryFontSize}rem`,
								letterSpacing: `${categoryLetterSpacing}px`
							}}
						/>
					)}

					{mainTitle && (
						<RichText
							tagName="div"
							className="main-title"
							value={mainTitle}
							onChange={(val) => setAttributes({ mainTitle: val })}
							style={{
								color: mainTitleColor,
								fontSize: `${mainTitleFontSize}rem`,
								fontWeight: mainTitleFontWeight,
								lineHeight: mainTitleLineHeight
							}}
						/>
					)}

					{description && (
						<RichText
							tagName="div"
							className="desc-title"
							value={description}
							onChange={(val) => setAttributes({ description: val })}
							style={{
								color: descriptionColor,
								fontSize: `${descriptionFontSize}rem`,
								maxWidth: `${descriptionMaxWidth}px`,
								marginLeft: 'auto',
								marginRight: 'auto'
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

