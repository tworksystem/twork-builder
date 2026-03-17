import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    backgroundImage,
    tagText,
    title,
    description,
    showSearch,
    searchPlaceholder,
    popularText,
    pill1Text,
    pill1IconClass,
    pill2Text,
    pill2IconClass,
    minHeight,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'ph-hero twork-ph-hero-section',
    style: {
      minHeight: `${minHeight}px`,
    },
  });

  return (
    <section {...blockProps}>
      <div className="ph-container">
        <div className="ph-hero-grid">
          <div className="ph-hero-text fade-up">
            {tagText && (
              <span className="ph-hero-tag">
                <i className="fas fa-check-circle" aria-hidden="true" />{' '}
                {tagText}
              </span>
            )}

            <RichText.Content tagName="h1" value={title} />

            {description && (
              <RichText.Content tagName="p" value={description} />
            )}

            {showSearch && (
              <>
                <div className="ph-search-box">
                  <input
                    type="text"
                    className="ph-search-input"
                    placeholder={searchPlaceholder}
                    readOnly
                  />
                  <button className="ph-search-btn" type="button">
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>
                {popularText && (
                  <p className="ph-popular-text">{popularText}</p>
                )}
              </>
            )}
          </div>

          <div className="ph-hero-img-wrap fade-up">
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt=""
                className="ph-hero-img"
              />
            )}

            {(pill1Text || pill1IconClass) && (
              <div className="floating-pill fp-1">
                {pill1IconClass && (
                  <i className={pill1IconClass} aria-hidden="true" />
                )}
                {pill1Text && <span>{pill1Text}</span>}
              </div>
            )}

            {(pill2Text || pill2IconClass) && (
              <div className="floating-pill fp-2">
                {pill2IconClass && (
                  <i className={pill2IconClass} aria-hidden="true" />
                )}
                {pill2Text && <span>{pill2Text}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

