import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes = {} }) {
    const {
        backgroundImage,
        badgeText,
        title,
        description,
        showButton1,
        button1Text,
        button1Url,
        button1Pulse,
        showButton2,
        button2Text,
        button2Url,
        containerMaxWidth,
        containerPadding,
        heroHeight
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'em-hero page-hero page-hero-emergency',
        style: heroHeight ? { height: `${heroHeight}px` } : undefined
    });

    const containerStyle = {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: containerMaxWidth || 1280,
        margin: '0 auto',
        padding: `0 ${containerPadding || 20}px`,
        textAlign: 'center'
    };

    return (
        <header {...blockProps}>
            {backgroundImage && (
                <img src={backgroundImage} alt="" className="em-hero-bg" />
            )}
            <div className="em-container" style={containerStyle}>
                <div className="em-hero-content em-animate-hero">
                    {badgeText && <RichText.Content tagName="span" value={badgeText} className="em-hero-badge" />}
                    {title && <RichText.Content tagName="h1" value={title} className="em-hero-title" />}
                    {description && <RichText.Content tagName="p" value={description} className="em-hero-desc" />}
                    <div className="em-hero-buttons">
                        {showButton1 !== false && button1Text && (
                            <a href={button1Url || '#'} className={`em-btn em-btn-primary ${button1Pulse !== false ? 'em-btn-pulse' : ''}`}>
                                <i className="fas fa-phone-alt" aria-hidden="true" /> {button1Text}
                            </a>
                        )}
                        {showButton2 !== false && button2Text && (
                            <a href={button2Url || '#'} className="em-btn em-btn-glass">{button2Text}</a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
