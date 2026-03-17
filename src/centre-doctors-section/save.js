import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function ViewAllIconOutput({ iconType, faClass, dashicon, imageUrl, videoUrl }) {
    const wrap = (content) => <span className="centre-icon-wrap centre-view-all-icon" aria-hidden="true">{content}</span>;
    if (iconType === 'image' && imageUrl) return wrap(<img src={imageUrl} alt="" className="centre-icon-img" />);
    if (iconType === 'video' && videoUrl) return wrap(<video src={videoUrl} className="centre-icon-video" muted loop playsInline autoPlay aria-hidden="true" />);
    if (iconType === 'dashicon' && dashicon) return wrap(<span className={`dashicons ${dashicon}`} />);
    if (faClass) return wrap(<i className={faClass} />);
    return null;
}

export default function save({ attributes }) {
    const { sectionId, title, viewAllText, viewAllUrl, viewAllIconType, viewAllIcon, viewAllDashicon, viewAllIconImageUrl, viewAllIconVideoUrl } = attributes;
    const blockProps = useBlockProps.save({
        className: 'content-section fade-up',
        id: sectionId || undefined,
    });

    return (
        <div {...blockProps}>
            <div className="centre-doctors-header">
                <RichText.Content tagName="h2" value={title} className="centre-doctors-title" />
                <a href={viewAllUrl || '#'} className="centre-view-all-link">
                    {viewAllText || 'View All'}{' '}
                <ViewAllIconOutput
                    iconType={viewAllIconType || 'fontawesome'}
                    faClass={viewAllIcon || 'fas fa-arrow-right'}
                    dashicon={viewAllDashicon}
                    imageUrl={viewAllIconImageUrl}
                    videoUrl={viewAllIconVideoUrl}
                />
                </a>
            </div>
            <div className="dept-doctors">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
