import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        overlayColor,
        overlayOpacity,
        backgroundAttachment,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showIcon,
        iconClass,
        iconColor,
        iconSize,
        iconSizeMobile,
        iconMarginBottom,
        title,
        titleColor,
        titleFontSize,
        titleFontSizeMobile,
        titleFontWeight,
        titleMarginBottom,
        subtitle,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeMobile,
        subtitleOpacity,
        subtitleMarginBottom,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonBgColor,
        buttonTextColor,
        buttonHoverBgColor,
        buttonFontSize,
        buttonFontWeight,
        buttonPaddingVertical,
        buttonPaddingHorizontal,
        buttonBorderRadius,
        containerMaxWidth,
        containerPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-tour-section-editor',
        style: {
            position: 'relative',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            color: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: backgroundAttachment === 'fixed' ? 'fixed' : 'scroll'
        }
    });

    const containerStyle = {
        position: 'relative',
        zIndex: 2,
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('Background Image', 'twork-builder')}>
                        {!backgroundImage ? (
                            <MediaPlaceholder
                                onSelect={(media) =>
                                    setAttributes({
                                        backgroundImage: media.url,
                                        backgroundImageId: media.id
                                    })
                                }
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Background Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img
                                    src={backgroundImage}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginBottom: '10px',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Button
                                    isSecondary
                                    isSmall
                                    onClick={() =>
                                        setAttributes({
                                            backgroundImage: '',
                                            backgroundImageId: null
                                        })
                                    }
                                >
                                    {__('Remove Image', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>

                    {!backgroundImage && (
                        <>
                            <Divider />
                            <PanelColorSettings
                                title={__('Background Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: backgroundColor,
                                        onChange: (val) =>
                                            setAttributes({ backgroundColor: val }),
                                        label: __('Background Color', 'twork-builder')
                                    }
                                ]}
                            />
                        </>
                    )}

                    {backgroundImage && (
                        <>
                            <Divider />
                            <ToggleControl
                                label={__('Show Overlay', 'twork-builder')}
                                checked={backgroundOverlay}
                                onChange={(val) =>
                                    setAttributes({ backgroundOverlay: val })
                                }
                                help={__(
                                    'Dark overlay over the background image for better text contrast.',
                                    'twork-builder'
                                )}
                            />
                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[
                                            {
                                                value: overlayColor,
                                                onChange: (val) =>
                                                    setAttributes({ overlayColor: val }),
                                                label: __('Overlay Color', 'twork-builder')
                                            }
                                        ]}
                                    />
                                    <RangeControl
                                        label={__('Overlay Opacity', 'twork-builder')}
                                        value={overlayOpacity}
                                        onChange={(val) =>
                                            setAttributes({ overlayOpacity: val })
                                        }
                                        min={0}
                                        max={1}
                                        step={0.1}
                                    />
                                </>
                            )}
                            <Divider />
                            <SelectControl
                                label={__('Background Attachment', 'twork-builder')}
                                value={backgroundAttachment}
                                options={[
                                    {
                                        label: __('Fixed (parallax)', 'twork-builder'),
                                        value: 'fixed'
                                    },
                                    {
                                        label: __('Scroll', 'twork-builder'),
                                        value: 'scroll'
                                    }
                                ]}
                                onChange={(val) =>
                                    setAttributes({ backgroundAttachment: val })
                                }
                                help={__(
                                    'Fixed creates a parallax effect on scroll.',
                                    'twork-builder'
                                )}
                            />
                        </>
                    )}

                    <Divider />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Top (Mobile, px)', 'twork-builder')}
                        value={paddingTopMobile}
                        onChange={(val) =>
                            setAttributes({ paddingTopMobile: val })
                        }
                        min={40}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (Mobile, px)', 'twork-builder')}
                        value={paddingBottomMobile}
                        onChange={(val) =>
                            setAttributes({ paddingBottomMobile: val })
                        }
                        min={40}
                        max={120}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Title & Subtitle', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (val) =>
                                    setAttributes({ titleColor: val }),
                                label: __('Title Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) =>
                            setAttributes({ titleFontSize: val })
                        }
                        min={1.5}
                        max={4}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Title Font Size Mobile (rem)', 'twork-builder')}
                        value={titleFontSizeMobile}
                        onChange={(val) =>
                            setAttributes({ titleFontSizeMobile: val })
                        }
                        min={1.2}
                        max={3}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Title Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) =>
                            setAttributes({ titleFontWeight: val })
                        }
                        min={400}
                        max={900}
                        step={100}
                    />
                    <RangeControl
                        label={__('Title Margin Bottom (px)', 'twork-builder')}
                        value={titleMarginBottom}
                        onChange={(val) =>
                            setAttributes({ titleMarginBottom: val })
                        }
                        min={0}
                        max={40}
                        step={5}
                    />

                    <Divider />

                    <PanelColorSettings
                        title={__('Subtitle Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: subtitleColor,
                                onChange: (val) =>
                                    setAttributes({ subtitleColor: val }),
                                label: __('Subtitle Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Subtitle Font Size (rem)', 'twork-builder')}
                        value={subtitleFontSize}
                        onChange={(val) =>
                            setAttributes({ subtitleFontSize: val })
                        }
                        min={0.9}
                        max={1.5}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Subtitle Font Size Mobile (rem)', 'twork-builder')}
                        value={subtitleFontSizeMobile}
                        onChange={(val) =>
                            setAttributes({ subtitleFontSizeMobile: val })
                        }
                        min={0.9}
                        max={1.3}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Subtitle Opacity', 'twork-builder')}
                        value={subtitleOpacity}
                        onChange={(val) =>
                            setAttributes({ subtitleOpacity: val })
                        }
                        min={0.5}
                        max={1}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Subtitle Margin Bottom (px)', 'twork-builder')}
                        value={subtitleMarginBottom}
                        onChange={(val) =>
                            setAttributes({ subtitleMarginBottom: val })
                        }
                        min={10}
                        max={50}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Icon', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Icon', 'twork-builder')}
                        checked={showIcon}
                        onChange={(val) => setAttributes({ showIcon: val })}
                    />
                    {showIcon && (
                        <>
                            <TextControl
                                label={__('Icon Class', 'twork-builder')}
                                value={iconClass}
                                onChange={(val) =>
                                    setAttributes({ iconClass: val })
                                }
                                help={__(
                                    'Font Awesome class, e.g. fas fa-play-circle',
                                    'twork-builder'
                                )}
                            />
                            <PanelColorSettings
                                title={__('Icon Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: iconColor,
                                        onChange: (val) =>
                                            setAttributes({ iconColor: val }),
                                        label: __('Icon Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Icon Size (rem)', 'twork-builder')}
                                value={iconSize}
                                onChange={(val) =>
                                    setAttributes({ iconSize: val })
                                }
                                min={2}
                                max={6}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Icon Size Mobile (rem)', 'twork-builder')}
                                value={iconSizeMobile}
                                onChange={(val) =>
                                    setAttributes({ iconSizeMobile: val })
                                }
                                min={1.5}
                                max={5}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Icon Margin Bottom (px)', 'twork-builder')}
                                value={iconMarginBottom}
                                onChange={(val) =>
                                    setAttributes({ iconMarginBottom: val })
                                }
                                min={0}
                                max={40}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Button', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Button', 'twork-builder')}
                        checked={showButton}
                        onChange={(val) => setAttributes({ showButton: val })}
                    />
                    {showButton && (
                        <>
                            <TextControl
                                label={__('Button Text', 'twork-builder')}
                                value={buttonText}
                                onChange={(val) =>
                                    setAttributes({ buttonText: val })
                                }
                            />
                            <TextControl
                                label={__('Button URL', 'twork-builder')}
                                value={buttonUrl}
                                onChange={(val) =>
                                    setAttributes({ buttonUrl: val })
                                }
                                type="url"
                            />
                            <ToggleControl
                                label={__('Open in New Tab', 'twork-builder')}
                                checked={buttonTarget}
                                onChange={(val) =>
                                    setAttributes({ buttonTarget: val })
                                }
                            />
                            <TextControl
                                label={__('Rel', 'twork-builder')}
                                value={buttonRel}
                                onChange={(val) =>
                                    setAttributes({ buttonRel: val })
                                }
                                help={__(
                                    'e.g. noopener noreferrer for external links',
                                    'twork-builder'
                                )}
                            />
                            <Divider />
                            <PanelColorSettings
                                title={__('Button Colors', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: buttonBgColor,
                                        onChange: (val) =>
                                            setAttributes({ buttonBgColor: val }),
                                        label: __('Background', 'twork-builder')
                                    },
                                    {
                                        value: buttonTextColor,
                                        onChange: (val) =>
                                            setAttributes({
                                                buttonTextColor: val
                                            }),
                                        label: __('Text', 'twork-builder')
                                    },
                                    {
                                        value: buttonHoverBgColor,
                                        onChange: (val) =>
                                            setAttributes({
                                                buttonHoverBgColor: val
                                            }),
                                        label: __('Hover Background', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={buttonFontSize}
                                onChange={(val) =>
                                    setAttributes({ buttonFontSize: val })
                                }
                                min={0.7}
                                max={1.2}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={buttonFontWeight}
                                onChange={(val) =>
                                    setAttributes({ buttonFontWeight: val })
                                }
                                min={400}
                                max={900}
                                step={100}
                            />
                            <RangeControl
                                label={__('Padding Vertical (px)', 'twork-builder')}
                                value={buttonPaddingVertical}
                                onChange={(val) =>
                                    setAttributes({
                                        buttonPaddingVertical: val
                                    })
                                }
                                min={8}
                                max={24}
                                step={1}
                            />
                            <RangeControl
                                label={__('Padding Horizontal (px)', 'twork-builder')}
                                value={buttonPaddingHorizontal}
                                onChange={(val) =>
                                    setAttributes({
                                        buttonPaddingHorizontal: val
                                    })
                                }
                                min={20}
                                max={60}
                                step={5}
                            />
                            <RangeControl
                                label={__('Border Radius (px)', 'twork-builder')}
                                value={buttonBorderRadius}
                                onChange={(val) =>
                                    setAttributes({ buttonBorderRadius: val })
                                }
                                min={0}
                                max={30}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) =>
                            setAttributes({ containerMaxWidth: val })
                        }
                        min={800}
                        max={1920}
                        step={10}
                        help={__(
                            'Maximum width of the content container.',
                            'twork-builder'
                        )}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) =>
                            setAttributes({ containerPadding: val })
                        }
                        min={0}
                        max={60}
                        step={5}
                        help={__(
                            'Horizontal padding inside the container.',
                            'twork-builder'
                        )}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && backgroundOverlay && (
                    <div
                        className="background-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: overlayColor,
                            opacity: overlayOpacity,
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                )}

                <div
                    className="twork-tour-section-inner jivaka-container fade-up"
                    style={containerStyle}
                >
                    <div
                        className="editor-label"
                        style={{
                            textAlign: 'center',
                            padding: '8px 12px',
                            background: '#2271b1',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            marginBottom: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        {__('Tour Section (Editor View)', 'twork-builder')}
                    </div>

                    {showIcon && iconClass && (
                        <div
                            className="tour-icon"
                            style={{
                                fontSize: `${iconSize}rem`,
                                marginBottom: `${iconMarginBottom}px`,
                                color: iconColor,
                                display: 'inline-block'
                            }}
                            aria-hidden="true"
                        >
                            <i className={iconClass} aria-hidden="true" />
                        </div>
                    )}
                    <RichText
                        tagName="h2"
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Title...', 'twork-builder')}
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor,
                            marginBottom: `${titleMarginBottom}px`
                        }}
                    />
                    <RichText
                        tagName="p"
                        value={subtitle}
                        onChange={(val) =>
                            setAttributes({ subtitle: val })
                        }
                        placeholder={__('Subtitle...', 'twork-builder')}
                        style={{
                            fontSize: `${subtitleFontSize}rem`,
                            color: subtitleColor,
                            opacity: subtitleOpacity,
                            marginBottom: `${subtitleMarginBottom}px`
                        }}
                    />
                    {showButton && (
                        <a
                            href={buttonUrl || '#'}
                            className="jivaka-btn btn-primary tour-section-btn"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
                                borderRadius: `${buttonBorderRadius}px`,
                                fontWeight: buttonFontWeight,
                                fontSize: `${buttonFontSize}rem`,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                backgroundColor: buttonBgColor,
                                color: buttonTextColor,
                                textDecoration: 'none',
                                border: '2px solid transparent',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => e.preventDefault()}
                            aria-disabled="true"
                        >
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
