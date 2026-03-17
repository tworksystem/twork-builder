import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundImageUrl:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    backgroundOverlayColor: 'rgba(0, 95, 115, 0.4)',
    backgroundOverlayOpacity: 0.4,
    minHeight: 700,
    containerMaxWidth: 1200,
    containerPadding: 20,
    badgeText: 'ISO 15189 Certified',
    title: 'Precision Science,\nAccurate Diagnosis.',
    description:
        'Advanced pathology services using world-class analyzers. Trusted by thousands for accurate and timely results.',
    primaryButtonText: 'Check Prices',
    primaryButtonUrl: '#packages',
    secondaryButtonText: 'Home Visit',
    secondaryButtonUrl: '#homecare',
    stats: [
        { value: '500+', label: 'Tests' },
        { value: '1 Hr', label: 'Results' },
    ],
    animationOnScroll: true,
};

export default function save({ attributes = {} }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundImageUrl,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        minHeight,
        containerMaxWidth,
        containerPadding,
        badgeText,
        title,
        description,
        primaryButtonText,
        primaryButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        stats = [],
        animationOnScroll,
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'lab-hero twork-lab-hero-section',
        style: {
            minHeight: `${Number(minHeight)}px`,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
    });

    return (
        <header {...blockProps}>
            {backgroundOverlayOpacity > 0 && (
                <div
                    className="lab-hero-overlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 1,
                    }}
                />
            )}

            <div
                className="lab-container"
                style={{
                    maxWidth: `${Number(containerMaxWidth)}px`,
                    margin: '0 auto',
                    padding: `0 ${Number(containerPadding)}px`,
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                }}
            >
                <div className={`lab-hero-content ${animationOnScroll ? 'fade-up' : ''}`}>
                    {badgeText && (
                        <RichText.Content
                            tagName="span"
                            className="lab-hero-badge"
                            value={badgeText}
                        />
                    )}

                    {title && (
                        <RichText.Content
                            tagName="h1"
                            value={title}
                        />
                    )}

                    {description && (
                        <RichText.Content
                            tagName="p"
                            value={description}
                        />
                    )}

                    {(primaryButtonText || secondaryButtonText) && (
                        <div className="lab-hero-actions">
                            {primaryButtonText && (
                                <a
                                    href={primaryButtonUrl || '#'}
                                    className="lab-btn"
                                    target="_self"
                                    rel="noopener noreferrer"
                                >
                                    {primaryButtonText}
                                </a>
                            )}
                            {secondaryButtonText && (
                                <a
                                    href={secondaryButtonUrl || '#'}
                                    className="lab-btn lab-btn-outline"
                                    target="_self"
                                    rel="noopener noreferrer"
                                >
                                    {secondaryButtonText}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {(stats || []).length > 0 && (
                    <div className={`lab-hero-stats ${animationOnScroll ? 'fade-up' : ''}`}>
                        {(stats || []).map((item, index) => (
                            <div key={index} className="lab-stat-bubble">
                                {item?.value && <span>{item.value}</span>}
                                {item?.label && <small>{item.label}</small>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

