import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    TextareaControl,
    Button,
    BaseControl,
    RangeControl,
    ColorPalette
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './editor.css';

/**
 * Edit component for Team Intro block
 * Professional editor interface with comprehensive controls
 * Matches the exact structure from the original design
 * 
 * @param {Object} props Component props
 * @param {Object} props.attributes Block attributes
 * @param {Function} props.setAttributes Function to update block attributes
 * @returns {JSX.Element} The editor interface
 */
export default function Edit({ attributes, setAttributes }) {
    const { 
        metaTitle = 'Introducing our Team',
        title = 'passion\nfor healing',
        highlightText = 'Great',
        description = 'Some up and coming trends are healthcare consolidation for independent healthcare centers that see a cut in unforeseen payouts. High deductible health plans are also expected to transpire along with a growth of independent practices.',
        backgroundImage = '',
        imageMinHeight = '600',
        contentPadding = { top: '80', bottom: '80', left: '80', right: '80' },
        contentBackground = '#fff',
        authorName = 'CHASE FRANKLIN',
        authorTitle = 'Founder & CEO',
        authorSignature = '',
        showAuthorSection = true,
        features = []
    } = attributes;

    const blockProps = useBlockProps({
        className: 'team-intro-block-wrapper',
    });

    /**
     * Updates a specific feature field
     * @param {number} index Feature index
     * @param {string} field Field name to update
     * @param {*} value New field value
     */
    const updateFeature = (index, field, value) => {
        if (!Array.isArray(features) || index < 0 || index >= features.length) {
            return;
        }
        
        const newFeatures = [...features];
        newFeatures[index] = { 
            ...newFeatures[index], 
            [field]: value 
        };
        setAttributes({ features: newFeatures });
    };

    /**
     * Adds a new feature item
     */
    const addFeature = () => {
        const newFeature = {
            icon: 'fas fa-star',
                    title: 'NEW FEATURE',
            text: ''
        };
        setAttributes({ features: [...features, newFeature] });
    };

    /**
     * Removes a feature item
     * @param {number} index Feature index
     */
    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setAttributes({ features: newFeatures });
    };

    /**
     * Moves a feature item up
     * @param {number} index Feature index
     */
    const moveFeatureUp = (index) => {
        if (index === 0) return;
        const newFeatures = [...features];
        [newFeatures[index - 1], newFeatures[index]] = [newFeatures[index], newFeatures[index - 1]];
        setAttributes({ features: newFeatures });
    };

    /**
     * Moves a feature item down
     * @param {number} index Feature index
     */
    const moveFeatureDown = (index) => {
        if (index === features.length - 1) return;
        const newFeatures = [...features];
        [newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]];
        setAttributes({ features: newFeatures });
    };

    /**
     * Updates content padding
     * @param {string} side Padding side (top, bottom, left, right)
     * @param {string} value New padding value
     */
    const updateContentPadding = (side, value) => {
        setAttributes({
            contentPadding: {
                ...contentPadding,
                [side]: value
            }
        });
    };

    // Calculate inline styles
    // Professional image handling: optimized positioning to keep face visible
    // Uses left top positioning to prioritize face area, CSS media queries handle responsive adjustments
    const imageStyle = {
        backgroundImage: backgroundImage 
            ? `url(${backgroundImage})` 
            : 'url(https://jivakahospital.vercel.app/assets/images/bgn-team-members.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'left top',
        minHeight: `${imageMinHeight}px`
    };

    const contentStyle = {
        paddingTop: `${contentPadding.top}px`,
        paddingBottom: `${contentPadding.bottom}px`,
        paddingLeft: `${contentPadding.left}px`,
        paddingRight: `${contentPadding.right}px`,
        backgroundColor: contentBackground
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Meta Title', 'twork-builder')}
                        value={metaTitle}
                        onChange={(value) => setAttributes({ metaTitle: value })}
                        help={__('Small uppercase title above main heading', 'twork-builder')}
                    />
                    <TextareaControl
                        label={__('Title', 'twork-builder')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        help={__('Main title (use \\n for line breaks)', 'twork-builder')}
                        rows={2}
                    />
                    <TextControl
                        label={__('Highlight Text', 'twork-builder')}
                        value={highlightText}
                        onChange={(value) => setAttributes({ highlightText: value })}
                        help={__('Text to highlight in orange', 'twork-builder')}
                    />
                    <TextareaControl
                        label={__('Description', 'twork-builder')}
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        rows={3}
                    />
                </PanelBody>

                <PanelBody title={__('Image Settings', 'twork-builder')} initialOpen={false}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                            allowedTypes={['image']}
                            value={backgroundImage}
                            render={({ open }) => (
                                <div>
                                    {backgroundImage && (
                                        <img
                                            src={backgroundImage}
                                            alt="Team intro background"
                                            style={{ 
                                                width: '100%', 
                                                height: 'auto',
                                                marginBottom: '15px',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    )}
                                    <Button 
                                        isPrimary 
                                        onClick={open}
                                        style={{ marginBottom: '10px', display: 'block', width: '100%' }}
                                    >
                                        {backgroundImage
                                            ? __('Change Image', 'twork-builder')
                                            : __('Select Image', 'twork-builder')}
                                    </Button>
                                    {backgroundImage && (
                                        <Button
                                            isDestructive
                                            onClick={() => setAttributes({ backgroundImage: '' })}
                                            style={{ width: '100%' }}
                                        >
                                            {__('Remove Image', 'twork-builder')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    <BaseControl>
                    <TextControl
                        label={__('Or enter image URL', 'twork-builder')}
                        value={backgroundImage}
                        onChange={(value) => setAttributes({ backgroundImage: value })}
                            placeholder="https://example.com/image.jpg"
                        />
                    </BaseControl>
                    <RangeControl
                        label={__('Image Min Height (px)', 'twork-builder')}
                        value={parseInt(imageMinHeight)}
                        onChange={(value) => setAttributes({ imageMinHeight: value.toString() })}
                        min={300}
                        max={1000}
                    />
                </PanelBody>

                <PanelBody title={__('Author Section', 'twork-builder')} initialOpen={false}>
                    <BaseControl>
                        <TextControl
                            label={__('Author Name', 'twork-builder')}
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}
                            help={__('Author name (e.g., CHASE FRANKLIN)', 'twork-builder')}
                        />
                    </BaseControl>
                    <BaseControl>
                        <TextControl
                            label={__('Author Title', 'twork-builder')}
                            value={authorTitle}
                            onChange={(value) => setAttributes({ authorTitle: value })}
                            help={__('Author title (e.g., Founder & CEO)', 'twork-builder')}
                        />
                    </BaseControl>
                    <BaseControl>
                        <TextControl
                            label={__('Signature Image URL', 'twork-builder')}
                            value={authorSignature}
                            onChange={(value) => setAttributes({ authorSignature: value })}
                            placeholder="https://example.com/signature.png"
                            help={__('URL to signature image (optional)', 'twork-builder')}
                        />
                    </BaseControl>
                </PanelBody>

                <PanelBody title={__('Content Styling', 'twork-builder')} initialOpen={false}>
                    <BaseControl label={__('Content Background Color', 'twork-builder')}>
                        <ColorPalette
                            value={contentBackground}
                            onChange={(value) => setAttributes({ contentBackground: value })}
                            colors={[
                                { name: 'White', color: '#fff' },
                                { name: 'Light Gray', color: '#f8f9fa' },
                                { name: 'Gray', color: '#f5f5f5' },
                                { name: 'Dark', color: '#212121' },
                            ]}
                        />
                        <TextControl
                            value={contentBackground}
                            onChange={(value) => setAttributes({ contentBackground: value })}
                            placeholder="#fff"
                            style={{ marginTop: '12px' }}
                            help={__('Enter hex color code', 'twork-builder')}
                        />
                    </BaseControl>
                    <RangeControl
                        label={__('Top Padding (px)', 'twork-builder')}
                        value={parseInt(contentPadding.top)}
                        onChange={(value) => updateContentPadding('top', value.toString())}
                        min={20}
                        max={200}
                    />
                    <RangeControl
                        label={__('Bottom Padding (px)', 'twork-builder')}
                        value={parseInt(contentPadding.bottom)}
                        onChange={(value) => updateContentPadding('bottom', value.toString())}
                        min={20}
                        max={200}
                    />
                    <RangeControl
                        label={__('Left Padding (px)', 'twork-builder')}
                        value={parseInt(contentPadding.left)}
                        onChange={(value) => updateContentPadding('left', value.toString())}
                        min={20}
                        max={200}
                    />
                    <RangeControl
                        label={__('Right Padding (px)', 'twork-builder')}
                        value={parseInt(contentPadding.right)}
                        onChange={(value) => updateContentPadding('right', value.toString())}
                        min={20}
                        max={200}
                    />
                </PanelBody>

                <PanelBody title={__('Features', 'twork-builder')} initialOpen={false}>
                    <div style={{ marginBottom: '15px' }}>
                        <Button 
                            onClick={addFeature} 
                            isPrimary
                        >
                            {__('Add Feature', 'twork-builder')}
                        </Button>
                    </div>

                    {Array.isArray(features) && features.map((feature, index) => (
                        <PanelBody 
                            key={index}
                            title={__('Feature', 'twork-builder') + ' ' + (index + 1)}
                            initialOpen={index === 0}
                        >
                            <div style={{ 
                                display: 'flex', 
                                gap: '10px', 
                                marginBottom: '15px',
                                flexWrap: 'wrap'
                            }}>
                                <Button 
                                    onClick={() => removeFeature(index)} 
                                    isDestructive 
                                    isSmall
                                >
                                    {__('Remove', 'twork-builder')}
                                </Button>
                                {index > 0 && (
                                    <Button 
                                        onClick={() => moveFeatureUp(index)} 
                                        isSecondary 
                                        isSmall
                                    >
                                        {__('↑ Move Up', 'twork-builder')}
                                    </Button>
                                )}
                                {index < features.length - 1 && (
                                    <Button 
                                        onClick={() => moveFeatureDown(index)} 
                                        isSecondary 
                                        isSmall
                                    >
                                        {__('↓ Move Down', 'twork-builder')}
                                    </Button>
                                )}
                            </div>

                            <BaseControl>
                            <TextControl
                                    label={__('Icon Class', 'twork-builder')}
                                    value={feature.icon || 'fas fa-star'}
                                onChange={(value) => updateFeature(index, 'icon', value)}
                                    help={__('Font Awesome icon class (e.g., fas fa-user-md)', 'twork-builder')}
                                    placeholder="fas fa-star"
                            />
                            </BaseControl>
                            <BaseControl>
                            <TextControl
                                label={__('Title', 'twork-builder')}
                                    value={feature.title || ''}
                                onChange={(value) => updateFeature(index, 'title', value)}
                                    placeholder={__('Feature Title', 'twork-builder')}
                            />
                            </BaseControl>
                            <BaseControl>
                                <TextareaControl
                                    label={__('Description', 'twork-builder')}
                                    value={feature.text || ''}
                                onChange={(value) => updateFeature(index, 'text', value)}
                                    rows={3}
                                    placeholder={__('Feature description', 'twork-builder')}
                            />
                            </BaseControl>
                        </PanelBody>
                    ))}

                    {(!Array.isArray(features) || features.length === 0) && (
                        <div style={{ 
                            padding: '20px', 
                            textAlign: 'center', 
                            color: '#666',
                            fontStyle: 'italic'
                        }}>
                            {__('No features added yet. Click "Add Feature" to get started.', 'twork-builder')}
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <section className="team-intro">
                <div
                    className="team-intro__image"
                        style={imageStyle}
                ></div>
                    <div className="team-intro__content" style={contentStyle}>
                    <div>
                            {metaTitle && (
                                <p className="meta-title">{metaTitle}</p>
                            )}
                        {title && (
                            <h2 className="team-intro__title">
                                {highlightText && (
                                <span className="text-highlight">{highlightText} </span>
                                )}
                                {title.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < title.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </h2>
                        )}
                        {description && (
                                <p className="team-intro__description" style={{ color: '#666' }}>
                                    {description}
                                </p>
                        )}
                            {/* Author Section - Always render if showAuthorSection is true and has any author data */}
                            {showAuthorSection !== false && (authorName || authorTitle || authorSignature) && (
                                <div className="team-intro__author">
                                    {(authorName || authorTitle) && (
                                        <div className="team-intro__author-info">
                                            {authorName && authorName.trim() && (
                                                <div className="team-intro__author-name">
                                                    {authorName}
                                                </div>
                                            )}
                                            {authorTitle && authorTitle.trim() && (
                                                <div className="team-intro__author-title">
                                                    {authorTitle}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {authorSignature && authorSignature.trim() && (
                                        <img 
                                            src={authorSignature} 
                                            alt="Signature" 
                                            className="team-intro__signature"
                                        />
                                    )}
                                </div>
                            )}
                            {Array.isArray(features) && features.length > 0 && (
                        <div className="team-intro__list">
                            {features.map((feature, index) => (
                                <div key={index} className="team-feature">
                                    <div className="team-feature__icon">
                                                {feature.icon && (
                                        <i className={feature.icon}></i>
                                                )}
                                    </div>
                                    <div>
                                                {feature.title && (
                                                    <h4 className="team-feature__title" style={{ margin: '0 0 5px' }}>
                                                        {feature.title}
                                                    </h4>
                                                )}
                                        {feature.text && (
                                                    <p className="team-feature__text" style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                                {feature.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                                </div>
                            )}
                            {(!Array.isArray(features) || features.length === 0) && (
                                <div style={{ 
                                    padding: '30px', 
                                    textAlign: 'center', 
                                    color: '#999',
                                    fontStyle: 'italic',
                                    border: '2px dashed #ddd',
                                    borderRadius: '4px',
                                    marginTop: '40px'
                                }}>
                                    {__('No features added yet. Use the sidebar to add features.', 'twork-builder')}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                </div>
        </Fragment>
    );
}
