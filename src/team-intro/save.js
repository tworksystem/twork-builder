import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save component for Team Intro block
 * Renders the block content for the frontend
 * Matches the exact HTML structure from the original design
 * 
 * @param {Object} props Component props
 * @param {Object} props.attributes Block attributes
 * @returns {JSX.Element} The saved block markup
 */
export default function save({ attributes }) {
    const { 
        metaTitle = 'Introducing our Team',
        title = 'passion\nfor healing',
        highlightText = 'Great',
        description = 'Some up and coming trends are healthcare consolidation for independent healthcare centers that see a cut in unforeseen payouts. High deductible health plans are also expected to transpire along with a growth of independent practices.',
        backgroundImage = '',
        imageMinHeight = '600',
        contentPadding = { top: '80', bottom: '80', left: '80', right: '80' },
        contentBackground = '#fff',
        authorName = 'CHASE FRANKLIN',
        authorTitle = 'Founder & CEO',
        authorSignature = '',
        showAuthorSection = true,
        features = []
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'team-intro-block-wrapper'
    });

    // Calculate inline styles
    // Professional image handling: optimized positioning to keep face visible
    // Uses left top positioning to prioritize face area, CSS media queries handle responsive adjustments
    const imageStyle = {
        backgroundImage: backgroundImage 
            ? `url(${backgroundImage})` 
            : 'url(https://jivakahospital.vercel.app/assets/images/bgn-team-members.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'left top',
        minHeight: `${imageMinHeight}px`
    };

    const contentStyle = {
        paddingTop: `${contentPadding.top}px`,
        paddingBottom: `${contentPadding.bottom}px`,
        paddingLeft: `${contentPadding.left}px`,
        paddingRight: `${contentPadding.right}px`,
        backgroundColor: contentBackground
    };

    /**
     * Renders a feature item
     * @param {Object} feature Feature object
     * @param {number} index Feature index
     * @returns {JSX.Element|null} Feature item markup or null
     */
    const renderFeature = (feature, index) => {
        if (!feature) return null;

        return (
            <div key={index} className="team-feature">
                <div className="team-feature__icon">
                    {feature.icon && (
                        <i className={feature.icon}></i>
                    )}
                </div>
                <div>
                    {feature.title && (
                        <h4 className="team-feature__title" style={{ margin: '0 0 5px' }}>
                            {feature.title}
                        </h4>
                    )}
                    {feature.text && (
                        <p className="team-feature__text" style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                            {feature.text}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div {...blockProps}>
            <section className="team-intro">
            <div
                className="team-intro__image"
                    style={imageStyle}
            ></div>
                <div className="team-intro__content" style={contentStyle}>
                <div>
                        {metaTitle && (
                            <p className="meta-title">{metaTitle}</p>
                        )}
                    {title && (
                        <h2 className="team-intro__title">
                            {highlightText && (
                            <span className="text-highlight">{highlightText} </span>
                            )}
                            {title.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < title.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                    )}
                    {description && (
                            <p className="team-intro__description" style={{ color: '#666' }}>
                                {description}
                            </p>
                    )}
                        {/* Author Section - Render when showAuthorSection is true and has any author data */}
                        {showAuthorSection !== false && (authorName || authorTitle || authorSignature) && (
                            <div className="team-intro__author">
                                {(authorName || authorTitle) && (
                                    <div className="team-intro__author-info">
                                        {authorName && authorName.trim() && (
                                            <div className="team-intro__author-name">
                                                {authorName}
                                            </div>
                                        )}
                                        {authorTitle && authorTitle.trim() && (
                                            <div className="team-intro__author-title">
                                                {authorTitle}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {authorSignature && authorSignature.trim() && (
                                    <img 
                                        src={authorSignature} 
                                        alt="Signature" 
                                        className="team-intro__signature"
                                    />
                                )}
                            </div>
                        )}
                        {Array.isArray(features) && features.length > 0 && (
                            <div className="team-intro__list">
                                {features.map((feature, index) => renderFeature(feature, index))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            </div>
    );
}
