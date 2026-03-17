import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

// Deprecated version to keep existing content valid after save.js changes
const deprecated = [
  {
    attributes: metadata.attributes,
    save({ attributes }) {
      const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        columns,
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

            <div
              className="rad-why-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`,
              }}
            >
              <InnerBlocks.Content />
            </div>
          </div>
        </section>
      );
    },
  },
];

registerBlockType(metadata.name, {
  edit: Edit,
  save,
  deprecated,
});

