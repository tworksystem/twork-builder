import { useBlockProps } from '@wordpress/block-editor';

function FaqAccordionIconOutput({ iconType, faClass, dashicon, imageUrl, videoUrl }) {
    const wrap = (content) => <span className="centre-icon-wrap faq-accordion-icon" aria-hidden="true">{content}</span>;
    if (iconType === 'image' && imageUrl) return wrap(<img src={imageUrl} alt="" className="centre-icon-img" />);
    if (iconType === 'video' && videoUrl) return wrap(<video src={videoUrl} className="centre-icon-video" muted loop playsInline autoPlay aria-hidden="true" />);
    if (iconType === 'dashicon' && dashicon) return wrap(<span className={`dashicons ${dashicon}`} />);
    if (faClass) return wrap(<i className={faClass} />);
    return null;
}

export default function save({ attributes }) {
    const { question, answer, accordionIconType, accordionIcon, accordionDashicon, accordionIconImageUrl, accordionIconVideoUrl } = attributes;
    const blockProps = useBlockProps.save({ className: 'faq-item' });

    return (
        <div {...blockProps}>
            <button type="button" className="faq-btn">
                {question}{' '}
                <FaqAccordionIconOutput
                    iconType={accordionIconType || 'fontawesome'}
                    faClass={accordionIcon || 'fas fa-chevron-down'}
                    dashicon={accordionDashicon}
                    imageUrl={accordionIconImageUrl}
                    videoUrl={accordionIconVideoUrl}
                />
            </button>
            <div className="faq-content">
                <p>{answer}</p>
            </div>
        </div>
    );
}
