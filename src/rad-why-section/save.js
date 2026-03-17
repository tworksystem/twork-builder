import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerPadding,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    showSectionTitle,
    sectionTitle,
    sectionTitleColor,
    sectionTitleFontSize,
    sectionTitleFontWeight,
    sectionTitleAlignment,
    showSectionSubtitle,
    sectionSubtitle,
    sectionSubtitleColor,
    sectionSubtitleFontSize,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-section twork-rad-why-section',
    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      '--rad-columns-desktop': columns,
      '--rad-columns-tablet': columnsTablet,
      '--rad-columns-mobile': columnsMobile,
      '--rad-grid-gap': `${gap}px`,
    },
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
        {(showSectionTitle || showSectionSubtitle) && (
          <div
            className="rad-header fade-up"
            style={{
              textAlign: sectionTitleAlignment,
              marginBottom: '50px',
            }}
          >
            {showSectionTitle && (
              <RichText.Content
                tagName="h2"
                value={sectionTitle}
                style={{
                  fontSize: `${sectionTitleFontSize}rem`,
                  fontWeight: sectionTitleFontWeight,
                  color: sectionTitleColor,
                  marginBottom: showSectionSubtitle ? '10px' : '0',
                }}
              />
            )}
            {showSectionSubtitle && (
              <RichText.Content
                tagName="p"
                value={sectionSubtitle}
                style={{
                  fontSize: `${sectionSubtitleFontSize}rem`,
                  color: sectionSubtitleColor,
                  margin: 0,
                }}
              />
            )}
          </div>
        )}

        <div className="rad-why-grid">
          <InnerBlocks.Content />
        </div>
      </div>
    </section>
  );
}

