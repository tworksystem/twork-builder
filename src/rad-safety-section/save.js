import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerPadding,
    showSectionTitle,
    sectionTitle,
    sectionTitleColor,
    sectionTitleFontSize,
    showSectionSubtitle,
    sectionSubtitle,
    sectionSubtitleColor,
    sectionSubtitleFontSize,
    imageUrl,
    imageAlt,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-section twork-rad-safety-section',
    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
    },
    'data-animation': animationOnScroll,
    'data-animation-type': animationType,
    'data-animation-delay': animationDelay,
  });

  return (
    <section {...blockProps}>
      <div
        className="rad-container"
        style={{
          maxWidth: `${containerMaxWidth}px`,
          margin: '0 auto',
          padding: `0 ${containerPadding}px`,
        }}
      >
        <div className="rad-safety-grid">
          <div className="rad-safety-image fade-up">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={imageAlt}
                style={{
                  borderRadius: 'var(--rad-radius)',
                  boxShadow: 'var(--rad-shadow)',
                  width: '100%',
                }}
              />
            )}
          </div>

          <div className="rad-safety-content fade-up">
            {(showSectionTitle || showSectionSubtitle) && (
              <>
                {showSectionTitle && (
                  <RichText.Content
                    tagName="h2"
                    value={sectionTitle}
                    style={{
                      fontSize: `${sectionTitleFontSize}rem`,
                      marginBottom: '20px',
                      color: sectionTitleColor,
                    }}
                  />
                )}
                {showSectionSubtitle && (
                  <RichText.Content
                    tagName="p"
                    value={sectionSubtitle}
                    style={{
                      color: sectionSubtitleColor,
                      marginBottom: '30px',
                      fontSize: `${sectionSubtitleFontSize}rem`,
                    }}
                  />
                )}
              </>
            )}

            <div className="rad-safety-cards">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

