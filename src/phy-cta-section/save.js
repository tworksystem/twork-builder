import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundMode: 'color',
    backgroundColor: 'var(--phy-secondary)',
    backgroundImageUrl: '',
    backgroundVideoUrl: '',
    backgroundVideoPoster: '',
    backgroundOverlayColor: 'rgba(0, 0, 0, 0.4)',
    backgroundOverlayOpacity: 0.4,
    padding: 60,
    borderRadius: 30,
    textColor: '#ffffff',
    marginBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    title: 'Start Your Recovery Journey Today',
    subtitle: "Don\'t let pain hold you back.",
    showSubtitle: true,
    buttonText: 'Book Appointment Now',
    buttonUrl: 'tel:0912345678',
    buttonAriaLabel: 'Book a physiotherapy appointment',
    centerAlign: true,
    animationOnScroll: true,
    animationType: 'fade-up',
    animationDelay: 100,
};

export default function save({ attributes = {} }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundMode,
        backgroundColor,
        backgroundImageUrl,
        backgroundVideoUrl,
        backgroundVideoPoster,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        padding,
        borderRadius,
        textColor,
        marginBottom,
        containerMaxWidth,
        containerPadding,
        title,
        subtitle,
        showSubtitle,
        buttonText,
        buttonUrl,
        buttonAriaLabel,
        centerAlign,
        animationOnScroll,
        animationType,
        animationDelay,
    } = attrs;

    const hasMediaBackground = backgroundMode === 'image' || backgroundMode === 'video';

    const blockProps = useBlockProps.save({
        className: 'twork-phy-cta-section',
        style: {
            marginBottom: `${Number(marginBottom)}px`,
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
        'data-animation-type': animationType,
        'data-animation-delay': Number(animationDelay),
    });

    const innerStyle = {
        position: 'relative',
        overflow: 'hidden',
        padding: `${Number(padding)}px`,
        borderRadius: `${Number(borderRadius)}px`,
        textAlign: centerAlign ? 'center' : 'left',
        color: textColor,
        backgroundColor:
            backgroundMode === 'color' || (!hasMediaBackground && backgroundColor)
                ? backgroundColor
                : 'transparent',
    };

    if (backgroundMode === 'image' && backgroundImageUrl) {
        innerStyle.backgroundImage = `url(${backgroundImageUrl})`;
        innerStyle.backgroundSize = 'cover';
        innerStyle.backgroundPosition = 'center';
    }

    return (
        <div {...blockProps}>
            <div
                className="phy-container"
                style={{
                    maxWidth: `${Number(containerMaxWidth)}px`,
                    margin: '0 auto',
                    padding: `0 ${Number(containerPadding)}px`,
                }}
            >
                <div className={`phy-cta-inner ${animationOnScroll ? 'fade-up' : ''}`} style={innerStyle}>
                    {backgroundMode === 'video' && backgroundVideoUrl && (
                        <video
                            className="phy-cta-bg-video"
                            src={backgroundVideoUrl}
                            poster={backgroundVideoPoster || undefined}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    )}

                    {hasMediaBackground && backgroundOverlayOpacity > 0 && (
                        <div
                            className="phy-cta-overlay"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: backgroundOverlayColor,
                                opacity: backgroundOverlayOpacity,
                            }}
                        />
                    )}

                    <div className="phy-cta-content">
                        {title && (
                            <RichText.Content
                                tagName="h2"
                                value={title}
                            />
                        )}

                        {showSubtitle && subtitle && (
                            <RichText.Content
                                tagName="p"
                                value={subtitle}
                                style={{ marginBottom: 30, opacity: 0.8 }}
                            />
                        )}

                        {buttonText && (
                            <a
                                href={buttonUrl || undefined}
                                className="phy-btn"
                                aria-label={buttonAriaLabel || undefined}
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

