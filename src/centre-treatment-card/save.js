import { useBlockProps } from '@wordpress/block-editor';

function CentreTreatmentIconOutput({ iconType, faClass, dashicon, imageUrl, videoUrl, className = '' }) {
    const wrap = (content) => (
        <span className={`centre-icon-wrap ${className}`.trim()} aria-hidden="true">
            {content}
        </span>
    );
    if (iconType === 'image' && imageUrl) return wrap(<img src={imageUrl} alt="" className="centre-icon-img" />);
    if (iconType === 'video' && videoUrl) return wrap(<video src={videoUrl} className="centre-icon-video" muted loop playsInline autoPlay aria-hidden="true" />);
    if (iconType === 'dashicon' && dashicon) return wrap(<span className={`dashicons ${dashicon}`} />);
    if (faClass) return wrap(<i className={faClass} />);
    return null;
}

export default function save({ attributes }) {
    const { iconClass, iconType, iconDashicon, iconImageUrl, iconVideoUrl, title, description } = attributes;
    const blockProps = useBlockProps.save({ className: 'treatment-card stagger-card' });

    return (
        <div {...blockProps}>
            <CentreTreatmentIconOutput
                iconType={iconType || 'fontawesome'}
                faClass={iconClass || 'fas fa-brain'}
                dashicon={iconDashicon}
                imageUrl={iconImageUrl}
                videoUrl={iconVideoUrl}
                className="treatment-card-icon"
            />
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}
