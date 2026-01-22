import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        containerMaxWidth,
        containerPadding,
        marginTop,
        marginBottom,
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
        boxShadow,
        boxShadowColor,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowOffsetX,
        boxShadowOffsetY,
        overflow,
        zIndex,
        animationOnScroll,
        animationType,
        animationDelay
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-container-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: backgroundImage ? backgroundSize : 'auto',
            backgroundPosition: backgroundImage ? backgroundPosition : 'center',
            backgroundRepeat: backgroundImage ? backgroundRepeat : 'no-repeat',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            paddingLeft: `${paddingLeft}px`,
            paddingRight: `${paddingRight}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
            borderRadius: `${borderRadius}px`,
            borderWidth: borderWidth > 0 ? `${borderWidth}px` : '0',
            borderColor: borderWidth > 0 ? borderColor : 'transparent',
            borderStyle: borderWidth > 0 ? borderStyle : 'none',
            boxShadow: boxShadow
                ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`
                : 'none',
            overflow: overflow,
            position: 'relative',
            zIndex: zIndex
        },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay
    });

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
                        pointerEvents: 'none'
                    }}
                />
            )}

            <div
                className="twork-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <InnerBlocks.Content />
            </div>
        </section>
    );
}
