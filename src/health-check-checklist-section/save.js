import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontWeight,
        sectionSubtitleMarginBottom,
        checklistItems,
        imageUrl,
        imageAlt,
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        gridGap,
        boxBorderRadius,
        boxPadding,
        checkboxAccentColor,
        animationOnScroll,
        animationDelay,
        animationType,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'chk-section chk-checklist-section twork-health-check-checklist-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : (backgroundColor || '#f4f8fb'),
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--chk-primary': checkboxAccentColor || '#f48b2a',
            '--chk-radius': `${boxBorderRadius}px`,
        },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay,
    });

    const items = Array.isArray(checklistItems) ? checklistItems : [];

    return (
        <section {...blockProps}>
            {backgroundImage && backgroundOverlay && (
                <div
                    className="background-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 1,
                    }}
                />
            )}

            <div
                className="chk-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div
                    className="chk-checklist-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: imageUrl ? '1fr 1fr' : '1fr',
                        gap: `${gridGap}px`,
                        alignItems: 'center',
                    }}
                >
                    <div className="fade-up">
                        {(showSectionTitle || showSectionSubtitle) && (
                            <div
                                className="section-header"
                                style={{
                                    textAlign: sectionTitleAlignment,
                                    marginBottom: showSectionSubtitle
                                        ? `${sectionSubtitleMarginBottom}px`
                                        : `${sectionTitleMarginBottom}px`,
                                }}
                            >
                                {showSectionTitle && (
                                    <RichText.Content
                                        tagName="h2"
                                        value={sectionTitle}
                                        className="section-title"
                                        style={{
                                            fontSize: `${sectionTitleFontSize}rem`,
                                            fontWeight: sectionTitleFontWeight,
                                            color: sectionTitleColor,
                                            marginBottom: showSectionSubtitle
                                                ? `${sectionTitleMarginBottom}px`
                                                : '0',
                                            marginTop: 0,
                                        }}
                                    />
                                )}
                                {showSectionSubtitle && (
                                    <RichText.Content
                                        tagName="p"
                                        value={sectionSubtitle}
                                        className="section-subtitle"
                                        style={{
                                            fontSize: `${sectionSubtitleFontSize}rem`,
                                            fontWeight: sectionSubtitleFontWeight,
                                            color: sectionSubtitleColor || '#666',
                                            margin: 0,
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        <div
                            className="chk-checklist-box"
                            style={{
                                background: '#fff',
                                padding: `${boxPadding}px`,
                                borderRadius: `${boxBorderRadius}px`,
                                boxShadow: '0 15px 40px rgba(0, 95, 115, 0.1)',
                            }}
                        >
                            {items.map((item, index) => (
                                <label key={index} className="chk-checklist-item">
                                    <input type="checkbox" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>
                    {imageUrl && (
                        <div className="fade-up">
                            <img
                                src={imageUrl}
                                alt={imageAlt || ''}
                                className="chk-checklist-img"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
