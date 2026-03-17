import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Static save: inner block content is serialized into post_content.
 * Removing steps in the editor and saving updates the stored HTML;
 * front-end shows that HTML. If changes don’t appear, clear page/cache.
 */
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
    sectionTitleAlignment,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-section twork-rad-process-section',
    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      '--rad-process-columns-desktop': columns,
      '--rad-process-columns-tablet': columnsTablet,
      '--rad-process-columns-mobile': columnsMobile,
      '--rad-process-gap': `${gap}px`,
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
        {showSectionTitle && (
          <div
            className="rad-header fade-up"
            style={{ textAlign: sectionTitleAlignment || 'center' }}
          >
            <RichText.Content
              tagName="h2"
              value={sectionTitle}
              style={{
                fontSize: `${sectionTitleFontSize}rem`,
                color: sectionTitleColor,
              }}
            />
          </div>
        )}

        <div className="rad-process-grid">
          <InnerBlocks.Content />
        </div>
      </div>
    </section>
  );
}

