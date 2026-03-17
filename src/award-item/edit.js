import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaPlaceholder,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    RangeControl,
    SelectControl,
    Button,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        imageUrl,
        imageId,
        imageAlt,
        imageHeight,
        imageObjectFit,
        imageObjectPosition,
        awardYear,
        awardTitle,
        awardDescription,
        yearColor,
        yearFontSize,
        yearFontWeight,
        titleColor,
        titleFontSize,
        titleFontWeight,
        descriptionColor,
        descriptionFontSize,
        descriptionLineHeight,
        contentPadding,
        cardBgColor,
        cardBorderRadius
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-award-item-editor award-item stagger-up',
        style: {
            borderRadius: `${cardBorderRadius}px`,
            overflow: 'hidden',
            background: cardBgColor,
            border: '2px dashed #e0e0e0',
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column'
        }
    });

    const objectFitOptions = [
        { label: __('Cover', 'twork-builder'), value: 'cover' },
        { label: __('Contain', 'twork-builder'), value: 'contain' },
        { label: __('Fill', 'twork-builder'), value: 'fill' },
        { label: __('None', 'twork-builder'), value: 'none' }
    ];

    const objectPositionOptions = [
        { label: __('Top Center', 'twork-builder'), value: 'top center' },
        { label: __('Center', 'twork-builder'), value: 'center' },
        { label: __('Bottom', 'twork-builder'), value: 'bottom center' },
        { label: __('Top Left', 'twork-builder'), value: 'top left' },
        { label: __('Top Right', 'twork-builder'), value: 'top right' }
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Image', 'twork-builder')} initialOpen={true}>
                    {!imageUrl ? (
                        <MediaPlaceholder
                            onSelect={(media) => setAttributes({
                                imageUrl: media.url,
                                imageId: media.id,
                                imageAlt: media.alt || ''
                            })}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Award Image', 'twork-builder') }}
                        />
                    ) : (
                        <div>
                            <img
                                src={imageUrl}
                                alt=""
                                style={{ width: '100%', height: 'auto', marginBottom: '10px', borderRadius: '4px' }}
                            />
                            <TextControl
                                label={__('Alt Text', 'twork-builder')}
                                value={imageAlt}
                                onChange={(val) => setAttributes({ imageAlt: val })}
                                help={__('For accessibility', 'twork-builder')}
                            />
                            <Button
                                isSecondary
                                isSmall
                                onClick={() => setAttributes({ imageUrl: '', imageId: null, imageAlt: '' })}
                                style={{ marginTop: '10px' }}
                            >
                                {__('Change Image', 'twork-builder')}
                            </Button>
                        </div>
                    )}
                    <Divider />
                    <RangeControl
                        label={__('Image Height (px)', 'twork-builder')}
                        value={imageHeight}
                        onChange={(val) => setAttributes({ imageHeight: val })}
                        min={120}
                        max={400}
                        step={10}
                    />
                    <SelectControl
                        label={__('Object Fit', 'twork-builder')}
                        value={imageObjectFit}
                        options={objectFitOptions}
                        onChange={(val) => setAttributes({ imageObjectFit: val })}
                    />
                    <SelectControl
                        label={__('Object Position', 'twork-builder')}
                        value={imageObjectPosition}
                        options={objectPositionOptions}
                        onChange={(val) => setAttributes({ imageObjectPosition: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Year', 'twork-builder')}
                        value={awardYear}
                        onChange={(val) => setAttributes({ awardYear: val })}
                        help={__('e.g., 2024', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Award Title', 'twork-builder')}
                        value={awardTitle}
                        onChange={(val) => setAttributes({ awardTitle: val })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={awardDescription}
                        onChange={(val) => setAttributes({ awardDescription: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Typography', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Year Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: yearColor,
                                onChange: (val) => setAttributes({ yearColor: val }),
                                label: __('Year', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Year Font Size (rem)', 'twork-builder')}
                        value={yearFontSize}
                        onChange={(val) => setAttributes({ yearFontSize: val })}
                        min={0.7}
                        max={1.5}
                        step={0.05}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (val) => setAttributes({ titleColor: val }),
                                label: __('Title', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1}
                        max={1.8}
                        step={0.1}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Description Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: descriptionColor,
                                onChange: (val) => setAttributes({ descriptionColor: val }),
                                label: __('Description', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Description Font Size (rem)', 'twork-builder')}
                        value={descriptionFontSize}
                        onChange={(val) => setAttributes({ descriptionFontSize: val })}
                        min={0.8}
                        max={1.3}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Description Line Height', 'twork-builder')}
                        value={descriptionLineHeight}
                        onChange={(val) => setAttributes({ descriptionLineHeight: val })}
                        min={1.2}
                        max={2}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody title={__('Card Styling', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background', 'twork-builder')}
                        colorSettings={[
                            {
                                value: cardBgColor,
                                onChange: (val) => setAttributes({ cardBgColor: val }),
                                label: __('Card Background', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Content Padding (px)', 'twork-builder')}
                        value={contentPadding}
                        onChange={(val) => setAttributes({ contentPadding: val })}
                        min={15}
                        max={50}
                        step={5}
                    />
                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={cardBorderRadius}
                        onChange={(val) => setAttributes({ cardBorderRadius: val })}
                        min={0}
                        max={24}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!imageUrl ? (
                    <div
                        style={{
                            height: `${imageHeight}px`,
                            background: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            fontSize: '0.9rem'
                        }}
                    >
                        {__('Add image from sidebar', 'twork-builder')}
                    </div>
                ) : (
                    <div
                        className="award-img-wrap"
                        style={{
                            height: `${imageHeight}px`,
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={imageAlt || awardTitle || ''}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: imageObjectFit,
                                objectPosition: imageObjectPosition,
                                display: 'block'
                            }}
                        />
                    </div>
                )}

                <div
                    className="award-content"
                    style={{
                        padding: `${contentPadding}px`,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <RichText
                        tagName="span"
                        className="award-year"
                        value={awardYear}
                        onChange={(val) => setAttributes({ awardYear: val })}
                        placeholder={__('Year...', 'twork-builder')}
                        style={{
                            color: yearColor,
                            fontWeight: yearFontWeight,
                            fontSize: `${yearFontSize}rem`,
                            marginBottom: '5px',
                            display: 'block'
                        }}
                    />
                    <RichText
                        tagName="h4"
                        value={awardTitle}
                        onChange={(val) => setAttributes({ awardTitle: val })}
                        placeholder={__('Award title...', 'twork-builder')}
                        style={{
                            margin: '0 0 10px',
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor
                        }}
                    />
                    <RichText
                        tagName="p"
                        value={awardDescription}
                        onChange={(val) => setAttributes({ awardDescription: val })}
                        placeholder={__('Description...', 'twork-builder')}
                        style={{
                            margin: 0,
                            fontSize: `${descriptionFontSize}rem`,
                            color: descriptionColor,
                            lineHeight: descriptionLineHeight
                        }}
                    />
                </div>
            </div>
        </>
    );
}
