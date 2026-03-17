import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imageUrl, imageAlt, category, overlayIcon } = attributes;

    const blockProps = useBlockProps.save({
        className: 'gallery-item fade-up',
        'data-category': category
    });

    if (!imageUrl) return null;

    return (
        <div {...blockProps}>
            <img src={imageUrl} alt={imageAlt || 'Gallery'} decoding="async" />
            <div className="gallery-overlay">
                {overlayIcon && <i className={overlayIcon} aria-hidden="true" />}
            </div>
        </div>
    );
}
