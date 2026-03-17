import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    sectionBackground,
    paddingTop,
    paddingBottom,
    sectionTitle,
    sectionSubtitle,
    activeTabId,
    tabs = [],
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-section twork-rad-diagnostic-tabs',
    style: {
      background: sectionBackground,
      paddingTop,
      paddingBottom,
    },
  });

  const currentActiveId =
    activeTabId || (tabs[0] && tabs[0].id) || (tabs[0] && tabs[0].id) || '';

  return (
    <section {...blockProps}>
      <div className="rad-container">
        <div className="rad-header fade-up">
          <RichText.Content tagName="h2" value={sectionTitle} />
          {sectionSubtitle && (
            <RichText.Content tagName="p" value={sectionSubtitle} />
          )}
        </div>

        <div className="rad-tabs-container">
          <div className="rad-tab-menu stagger-up">
            {tabs &&
              tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={
                    'rad-tab-btn' +
                    (tab.id === currentActiveId ? ' active' : '')
                  }
                  data-tab={tab.id}
                  aria-selected={tab.id === currentActiveId ? 'true' : 'false'}
                  aria-controls={tab.id ? `rad-pane-${tab.id}` : undefined}
                >
                  <span>{tab.label}</span>
                  <i className={tab.iconClass || 'fas fa-chevron-right'} />
                </button>
              ))}
          </div>

          <div className="rad-tab-content-area stagger-up">
            {tabs &&
              tabs.map((tab) => {
                const featuresToShow =
                  tab.features && tab.features.length
                    ? tab.features.filter(
                        (item) => item && item.trim() !== ''
                      )
                    : [];

                const isActive = tab.id === currentActiveId;

                return (
                  <div
                    key={tab.id}
                    id={tab.id}
                    className={
                      'rad-tab-pane' + (isActive ? ' active' : '')
                    }
                    hidden={!isActive}
                  >
                    {tab.imageUrl && (
                      <img
                        src={tab.imageUrl}
                        alt={tab.imageAlt || ''}
                        className="rad-pane-img"
                      />
                    )}
                    <h3 className="rad-pane-title">{tab.paneTitle}</h3>
                    {tab.description && <p>{tab.description}</p>}
                    {featuresToShow.length > 0 && (
                      <ul className="rad-pane-list">
                        {featuresToShow.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

