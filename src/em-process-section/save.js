import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerPadding,
    gap,
    columns,
    showSectionHeader,
    sectionTitle,
    sectionTitleColor,
    sectionTitleFontSize,
    sectionTitleFontWeight,
    sectionSubtitle,
    sectionSubtitleColor,
    sectionSubtitleFontSize,
    headerMaxWidth,
    headerMarginBottom,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'em-section twork-em-process-section',
  });

  const sectionStyle = {
    backgroundColor,
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    position: 'relative',
  };

  const containerStyle = {
    maxWidth: `${containerMaxWidth}px`,
    margin: '0 auto',
    padding: `0 ${containerPadding}px`,
    position: 'relative',
  };

  const headerStyle = {
    textAlign: 'center',
    maxWidth: `${headerMaxWidth}px`,
    margin: `0 auto ${headerMarginBottom}px`,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    textAlign: 'center',
    position: 'relative',
  };

  const headerClass = ['em-header'];
  if (animationOnScroll && animationType) {
    headerClass.push(animationType);
  }

  const gridClass = ['em-process-grid'];
  if (animationOnScroll && animationType) {
    gridClass.push(animationType);
  }

  return (
    <section
      {...blockProps}
      style={sectionStyle}
      data-animation={animationOnScroll ? 'true' : 'false'}
      data-animation-type={animationType}
      data-animation-delay={animationDelay}
    >
      <div className="em-container" style={containerStyle}>
        {showSectionHeader && (
          <div className={headerClass.join(' ')} style={headerStyle}>
            <RichText.Content
              tagName="h2"
              value={sectionTitle}
              style={{
                fontSize: `${sectionTitleFontSize}rem`,
                fontWeight: sectionTitleFontWeight,
                color: sectionTitleColor,
                marginBottom: 15,
                marginTop: 0,
              }}
            />
            <RichText.Content
              tagName="p"
              value={sectionSubtitle}
              style={{
                fontSize: `${sectionSubtitleFontSize}rem`,
                color: sectionSubtitleColor,
                margin: 0,
              }}
            />
          </div>
        )}
        <div className={gridClass.join(' ')} style={gridStyle}>
          <InnerBlocks.Content />
        </div>
      </div>
    </section>
  );
}

