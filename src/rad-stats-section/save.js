import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    marginTop,
    containerMaxWidth,
    containerPadding,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-section twork-rad-stats-section',
    style: {
      '--rad-stats-margin-top': `${marginTop}px`,
      '--rad-stats-columns-desktop': columns,
      '--rad-stats-columns-tablet': columnsTablet,
      '--rad-stats-columns-mobile': columnsMobile,
      '--rad-stats-gap': `${gap}px`,
      '--rad-stats-padding-top': `${paddingTop}px`,
      '--rad-stats-padding-bottom': `${paddingBottom}px`,
      '--rad-stats-background': backgroundColor,
    },
    'data-animation': animationOnScroll,
    'data-animation-type': animationType,
    'data-animation-delay': animationDelay,
  });

  const statsClass = ['rad-stats'];
  if (animationOnScroll && animationType) {
    statsClass.push(animationType);
  } else {
    statsClass.push('fade-up');
  }

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
        <div className={statsClass.join(' ')}>
          <div className="rad-stats-box">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </section>
  );
}

